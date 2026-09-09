'use client';

// Ported near-verbatim from BU APP's src/components/Timeline.tsx — the drag
// math (buildSegments/assignLanes/pointer handlers) is untouched; the only
// addition is the `readOnly` prop, which gates the three pointer-down entry
// points and hides the edit panel + resize handles for the member view.
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { Duration, LifeEvent, Phase, RoadmapData } from '@/app/lib/roadmap/types';
import {
  addMonths,
  monthLabel,
  monthIndicesForRange,
  formatDateShort,
  formatDateRangeCompact,
  eventBarRect,
  daysFromRoadmapStart,
  totalRoadmapDays,
} from '@/app/lib/roadmap/dates';
import { placePhase, resizePhaseEdge, movePhase, removePhase, updatePhaseStyle } from '@/app/lib/roadmap/phases';
import { getLifeEventPreset, CUSTOM_PHASE_COLORS } from '@/app/lib/roadmap/presets';
import type { ActiveTool } from '@/app/lib/roadmap/tool';

type Segment = { start: number; end: number; phase: Phase | null };

function buildSegments(phases: Phase[], duration: number): Segment[] {
  const sorted = [...phases].sort((a, b) => a.startMonth - b.startMonth);
  const segments: Segment[] = [];
  let cursor = 0;
  for (const p of sorted) {
    if (p.startMonth > cursor) segments.push({ start: cursor, end: p.startMonth - 1, phase: null });
    segments.push({ start: p.startMonth, end: p.endMonth, phase: p });
    cursor = p.endMonth + 1;
  }
  if (cursor <= duration - 1) segments.push({ start: cursor, end: duration - 1, phase: null });
  return segments;
}

interface LaneEvent {
  event: LifeEvent;
  lane: number;
  labelText: string;
}

const LANE_LABEL_H = 14;
const LANE_BAR_H = 6;
const LANE_GAP = 8;
// Rough allowance (px) for the color dot + gaps that precede the measured text in each label.
const LABEL_LEADING_PX = 16;
// Extra day-equivalent buffer so two labels never render edge-to-edge.
const LANE_BUFFER_DAYS = 0.6;

let measureCtx: CanvasRenderingContext2D | null | undefined;
function measureTextWidthPx(text: string): number {
  if (measureCtx === undefined) {
    measureCtx = typeof document === 'undefined' ? null : document.createElement('canvas').getContext('2d');
  }
  if (!measureCtx) return text.length * 6;
  measureCtx.font = '500 10px Inter, system-ui, sans-serif';
  return measureCtx.measureText(text).width;
}

// Packs events into vertical lanes so labels never overlap: a lane conflict is either an actual
// date overlap, or the previous label's rendered width (measured, not guessed) running into the
// next event's start once converted from pixels to day-equivalents using the real container width.
function assignLanes(events: LifeEvent[], roadmapStart: string, duration: number, containerWidthPx: number): LaneEvent[] {
  const totalDays = totalRoadmapDays(roadmapStart, duration);
  const pxPerDay = containerWidthPx > 0 ? containerWidthPx / totalDays : 0.1;

  const withLabels = events.map((event) => {
    const preset = getLifeEventPreset(event.typeId);
    const labelText = `${preset.icon} ${event.title} · ${formatDateRangeCompact(event.startDate, event.endDate)}`;
    return { event, labelText };
  });
  const sorted = withLabels.sort((a, b) => a.event.startDate.localeCompare(b.event.startDate));

  const laneEndDays: number[] = [];
  const result: LaneEvent[] = [];
  for (const { event, labelText } of sorted) {
    const startDay = daysFromRoadmapStart(roadmapStart, event.startDate);
    const endDay = daysFromRoadmapStart(roadmapStart, event.endDate) + 1;
    const labelWidthDays = (measureTextWidthPx(labelText) + LABEL_LEADING_PX) / pxPerDay;
    const effectiveEnd = Math.max(endDay, startDay + labelWidthDays) + LANE_BUFFER_DAYS;

    let lane = laneEndDays.findIndex((end) => end < startDay);
    if (lane === -1) {
      lane = laneEndDays.length;
      laneEndDays.push(effectiveEnd);
    } else {
      laneEndDays[lane] = effectiveEnd;
    }
    result.push({ event, lane, labelText });
  }
  return result;
}

interface DragState {
  kind: 'paint' | 'move' | 'resize';
  anchor: number;
  current: number;
  phaseId?: string;
  edge?: 'start' | 'end';
}

export function Timeline({
  duration,
  roadmap,
  lifeEvents,
  tool,
  onChangeRoadmap,
  readOnly = false,
}: {
  duration: Duration;
  roadmap: RoadmapData;
  lifeEvents: LifeEvent[];
  tool: ActiveTool;
  onChangeRoadmap: (updater: (r: RoadmapData) => RoadmapData) => void;
  readOnly?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const lifeRowRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);
  const [lifeRowWidth, setLifeRowWidth] = useState(0);

  const months = useMemo(
    () => Array.from({ length: duration }, (_, i) => addMonths(roadmap.startDate, i)),
    [roadmap.startDate, duration]
  );

  const relevantLifeEvents = useMemo(
    () => lifeEvents.filter((ev) => monthIndicesForRange(roadmap.startDate, duration, ev.startDate, ev.endDate).length > 0),
    [lifeEvents, roadmap.startDate, duration]
  );

  useLayoutEffect(() => {
    const el = lifeRowRef.current;
    if (!el || relevantLifeEvents.length === 0) return;
    const update = () => setLifeRowWidth(el.getBoundingClientRect().width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [relevantLifeEvents.length]);

  const laneEvents = useMemo(
    () => assignLanes(relevantLifeEvents, roadmap.startDate, duration, lifeRowWidth),
    [relevantLifeEvents, roadmap.startDate, duration, lifeRowWidth]
  );

  const laneCount = laneEvents.length ? Math.max(...laneEvents.map((le) => le.lane)) + 1 : 0;
  const lifeRowHeight = laneCount > 0 ? laneCount * (LANE_LABEL_H + LANE_BAR_H + LANE_GAP) - LANE_GAP : 0;

  const segments = useMemo(() => buildSegments(roadmap.phases, duration), [roadmap.phases, duration]);
  const selectedPhase = roadmap.phases.find((p) => p.id === selectedPhaseId) ?? null;

  function monthFromClientX(clientX: number): number {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const colWidth = rect.width / duration;
    return Math.max(0, Math.min(duration - 1, Math.floor((clientX - rect.left) / colWidth)));
  }

  function startPaint(e: React.PointerEvent) {
    if (readOnly || tool.mode !== 'paint') return;
    const anchor = monthFromClientX(e.clientX);
    setDrag({ kind: 'paint', anchor, current: anchor });

    function onMove(ev: PointerEvent) {
      setDrag((d) => (d && d.kind === 'paint' ? { ...d, current: monthFromClientX(ev.clientX) } : d));
    }
    function onUp(ev: PointerEvent) {
      window.removeEventListener('pointermove', onMove);
      const end = monthFromClientX(ev.clientX);
      onChangeRoadmap((r) => ({
        ...r,
        phases: placePhase(r.phases, anchor, end, duration, {
          id: crypto.randomUUID(),
          typeId: tool.typeId,
          label: tool.label,
          color: tool.color,
          border: tool.border,
          text: tool.text,
        }),
      }));
      setDrag(null);
    }
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp, { once: true });
  }

  function startMoveOrResize(e: React.PointerEvent, phase: Phase) {
    if (readOnly || tool.mode !== 'select') return;
    e.stopPropagation();
    setSelectedPhaseId(phase.id);
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const nearLeft = e.clientX - rect.left < 10;
    const nearRight = rect.right - e.clientX < 10;
    const kind: DragState['kind'] = nearLeft || nearRight ? 'resize' : 'move';
    const edge: 'start' | 'end' | undefined = nearLeft ? 'start' : nearRight ? 'end' : undefined;

    const startClientX = e.clientX;
    setDrag({ kind, anchor: startClientX, current: startClientX, phaseId: phase.id, edge });

    function onMove(ev: PointerEvent) {
      const rowRect = rowRef.current?.getBoundingClientRect();
      if (!rowRect) return;
      const colWidth = rowRect.width / duration;
      if (kind === 'resize' && edge) {
        const newMonth = Math.max(0, Math.min(duration - 1, Math.floor((ev.clientX - rowRect.left) / colWidth)));
        onChangeRoadmap((r) => ({ ...r, phases: resizePhaseEdge(r.phases, phase.id, edge, newMonth, duration) }));
      } else if (kind === 'move') {
        const deltaMonths = Math.round((ev.clientX - startClientX) / colWidth);
        onChangeRoadmap((r) => ({ ...r, phases: movePhase(r.phases, phase.id, deltaMonths, duration) }));
      }
    }
    function onUp() {
      window.removeEventListener('pointermove', onMove);
      setDrag(null);
    }
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp, { once: true });
  }

  const previewRange =
    drag?.kind === 'paint' ? [Math.min(drag.anchor, drag.current), Math.max(drag.anchor, drag.current)] : null;

  return (
    <div className="rounded-md border border-border-warm bg-paper p-4 shadow-sm">
      {/* Month headers */}
      <div className="grid" style={{ gridTemplateColumns: `repeat(${duration}, 1fr)` }}>
        {months.map((m, i) => (
          <div key={i} className="px-1 pb-2 text-center text-xs font-semibold uppercase tracking-wide text-stone-deep">
            {monthLabel(m)}
          </div>
        ))}
      </div>

      {/* Life events timeline */}
      {lifeRowHeight > 0 && (
        <div ref={lifeRowRef} className="relative mb-2" style={{ height: lifeRowHeight }}>
          <div className="pointer-events-none absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${duration}, 1fr)` }}>
            {months.map((_, i) => (
              <div key={i} className={i < duration - 1 ? 'border-r border-border-warm/60' : ''} />
            ))}
          </div>

          {laneEvents.map(({ event, lane, labelText }) => {
            const preset = getLifeEventPreset(event.typeId);
            const { leftPct, widthPct } = eventBarRect(roadmap.startDate, duration, event.startDate, event.endDate);
            const top = lane * (LANE_LABEL_H + LANE_BAR_H + LANE_GAP);
            return (
              <div key={event.id} title={`${event.title} · ${formatDateShort(event.startDate)} – ${formatDateShort(event.endDate)}`}>
                <span
                  className="absolute flex items-center gap-1 whitespace-nowrap text-[10px] font-medium text-espresso-soft"
                  style={{ left: `${leftPct}%`, top }}
                >
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${preset.color}`} aria-hidden />
                  {labelText}
                </span>
                <span
                  className={`absolute rounded-full ${preset.color}`}
                  style={{
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    minWidth: 6,
                    top: top + LANE_LABEL_H + 2,
                    height: LANE_BAR_H,
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Phase row */}
      <div
        ref={rowRef}
        onPointerDown={startPaint}
        className={`relative grid h-16 gap-0 rounded-[4px] border border-border-warm bg-cream ${
          !readOnly && tool.mode === 'paint' ? 'cursor-crosshair' : ''
        }`}
        style={{ gridTemplateColumns: `repeat(${duration}, 1fr)` }}
      >
        {segments.map((seg, idx) =>
          seg.phase ? (
            <div
              key={seg.phase.id}
              onPointerDown={(e) => startMoveOrResize(e, seg.phase!)}
              style={{ gridColumn: `${seg.start + 1} / ${seg.end + 2}` }}
              className={`group relative m-1 flex items-center justify-center rounded-[4px] border ${seg.phase.color} ${seg.phase.border} ${seg.phase.text} ${
                !readOnly && tool.mode === 'select' ? 'cursor-grab active:cursor-grabbing' : ''
              } ${selectedPhaseId === seg.phase.id ? 'ring-2 ring-offset-1 ring-espresso' : ''} select-none px-2 text-sm font-medium shadow-sm transition`}
            >
              <span className="truncate">{seg.phase.label}</span>
              {!readOnly && tool.mode === 'select' && (
                <>
                  <span className="absolute left-0 top-0 h-full w-2.5 cursor-ew-resize" />
                  <span className="absolute right-0 top-0 h-full w-2.5 cursor-ew-resize" />
                </>
              )}
            </div>
          ) : (
            <div
              key={`gap-${idx}`}
              style={{ gridColumn: `${seg.start + 1} / ${seg.end + 2}` }}
              className="m-1 flex items-center justify-center rounded-[4px] border border-dashed border-border-warm text-xs text-border-warm"
            >
              {!readOnly && tool.mode === 'paint' ? '+' : ''}
            </div>
          )
        )}

        {previewRange && (
          <div
            style={{ gridColumn: `${previewRange[0] + 1} / ${previewRange[1] + 2}` }}
            className={`pointer-events-none m-1 rounded-[4px] border-2 border-dashed opacity-60 ${tool.color} ${tool.border}`}
          />
        )}
      </div>

      {/* Month goal notes */}
      <div className="mt-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${duration}, 1fr)` }}>
        {months.map((_, i) => (
          <textarea
            key={i}
            value={roadmap.monthNotes[i]?.goal ?? ''}
            disabled={readOnly}
            onChange={(e) => onChangeRoadmap((r) => ({ ...r, monthNotes: { ...r.monthNotes, [i]: { goal: e.target.value } } }))}
            placeholder="Goals & focus..."
            rows={6}
            className="w-full resize-y rounded-[4px] border border-border-warm bg-cream p-2 text-xs text-espresso-soft outline-none placeholder:text-stone focus:border-stone disabled:opacity-70"
          />
        ))}
      </div>

      {/* Edit panel for selected phase */}
      {!readOnly && selectedPhase && tool.mode === 'select' && (
        <div className="mt-3 flex flex-wrap items-center gap-3 rounded-md border border-border-warm bg-cream p-3">
          <span className="text-xs font-medium uppercase tracking-wide text-stone">Editing block:</span>
          <input
            value={selectedPhase.label}
            onChange={(e) => onChangeRoadmap((r) => ({ ...r, phases: updatePhaseStyle(r.phases, selectedPhase.id, { label: e.target.value }) }))}
            className="w-40 rounded-[4px] border border-border-warm bg-paper px-2 py-1 text-sm outline-none focus:border-stone"
          />
          <div className="flex gap-1">
            {CUSTOM_PHASE_COLORS.map((c) => (
              <button
                key={c.color}
                onClick={() =>
                  onChangeRoadmap((r) => ({
                    ...r,
                    phases: updatePhaseStyle(r.phases, selectedPhase.id, { color: c.color, border: c.border, text: c.text }),
                  }))
                }
                className={`h-5 w-5 rounded-full ${c.color} ${selectedPhase.color === c.color ? 'ring-2 ring-offset-1 ring-espresso-soft' : ''}`}
              />
            ))}
          </div>
          <button
            onClick={() => {
              onChangeRoadmap((r) => ({ ...r, phases: removePhase(r.phases, selectedPhase.id) }));
              setSelectedPhaseId(null);
            }}
            className="ml-auto rounded-[4px] border border-rust/30 bg-rust/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-rust-deep hover:bg-rust/20"
          >
            Delete
          </button>
          <button
            onClick={() => setSelectedPhaseId(null)}
            className="rounded-[4px] border border-border-warm px-3 py-1 text-xs font-medium uppercase tracking-wide text-stone-deep hover:bg-cream-soft"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
