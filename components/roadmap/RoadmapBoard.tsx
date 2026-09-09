'use client';

// Ported near-verbatim from BU APP's src/components/RoadmapBoard.tsx.
import { useState } from 'react';
import type { ClientData, Duration, RoadmapData } from '@/app/lib/roadmap/types';
import { Timeline } from './Timeline';
import { PhasePalette } from './PhasePalette';
import { SELECT_TOOL, type ActiveTool } from '@/app/lib/roadmap/tool';

const DURATIONS: Duration[] = [3, 6, 12];

export function RoadmapBoard({
  data,
  onChangeRoadmap,
  readOnly = false,
}: {
  data: ClientData;
  onChangeRoadmap: (duration: Duration, updater: (r: RoadmapData) => RoadmapData) => void;
  readOnly?: boolean;
}) {
  const [activeDuration, setActiveDuration] = useState<Duration>(3);
  const [tool, setTool] = useState<ActiveTool>(SELECT_TOOL);

  const roadmap = data.roadmaps[activeDuration];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-md bg-cream-soft/60 p-1">
          {DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDuration(d)}
              className={`rounded-[4px] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                activeDuration === d ? 'bg-olive text-cream shadow-sm' : 'text-stone-deep hover:text-espresso-soft'
              }`}
            >
              {d}-Month
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-stone-deep">
          Roadmap starts
          <input
            type="month"
            value={roadmap.startDate.slice(0, 7)}
            disabled={readOnly}
            onChange={(e) => onChangeRoadmap(activeDuration, (r) => ({ ...r, startDate: `${e.target.value}-01` }))}
            className="rounded-[4px] border border-border-warm bg-paper px-2 py-1 text-sm text-espresso-soft outline-none focus:border-stone disabled:opacity-60"
          />
        </label>
      </div>

      {!readOnly && <PhasePalette tool={tool} onToolChange={setTool} />}

      <Timeline
        duration={activeDuration}
        roadmap={roadmap}
        lifeEvents={data.lifeEvents}
        tool={readOnly ? SELECT_TOOL : tool}
        onChangeRoadmap={(updater) => onChangeRoadmap(activeDuration, updater)}
        readOnly={readOnly}
      />
    </div>
  );
}
