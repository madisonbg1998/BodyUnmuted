'use client';

// Ported verbatim from BU APP's src/components/TrainingBounds.tsx.
import type { TrainingBounds as TrainingBoundsData, TrainingLevel } from '@/app/lib/roadmap/types';

function LevelFields({
  level,
  onChange,
  readOnly,
}: {
  level: TrainingLevel;
  onChange: (updater: (l: TrainingLevel) => TrainingLevel) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="flex gap-2">
      <label className="flex-1">
        <span className="text-[11px] text-stone">Days / week</span>
        <input
          value={level.daysPerWeek}
          onChange={(e) => onChange((l) => ({ ...l, daysPerWeek: e.target.value }))}
          placeholder="e.g. 4-5"
          disabled={readOnly}
          className="mt-0.5 w-full rounded-[4px] border border-border-warm bg-cream px-2 py-1.5 text-sm text-espresso-soft outline-none placeholder:text-stone focus:border-stone disabled:opacity-70"
        />
      </label>
      <label className="flex-1">
        <span className="text-[11px] text-stone">Session length</span>
        <input
          value={level.sessionLength}
          onChange={(e) => onChange((l) => ({ ...l, sessionLength: e.target.value }))}
          placeholder="e.g. 45-60 min"
          disabled={readOnly}
          className="mt-0.5 w-full rounded-[4px] border border-border-warm bg-cream px-2 py-1.5 text-sm text-espresso-soft outline-none placeholder:text-stone focus:border-stone disabled:opacity-70"
        />
      </label>
    </div>
  );
}

export function TrainingBounds({
  bounds,
  onChange,
  readOnly = false,
}: {
  bounds: TrainingBoundsData;
  onChange: (updater: (b: TrainingBoundsData) => TrainingBoundsData) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="rounded-md border border-border-warm bg-paper p-4 shadow-sm">
      <h3 className="mb-3 font-display text-lg italic text-espresso">Training Floors &amp; Ceilings</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-[4px] border border-olive-soft/30 bg-sage/20 p-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-olive-deep">Ceiling · Ideal Week</span>
          <div className="mt-2">
            <LevelFields
              level={bounds.ceiling}
              onChange={(updater) => onChange((b) => ({ ...b, ceiling: updater(b.ceiling) }))}
              readOnly={readOnly}
            />
          </div>
        </div>
        <div className="rounded-[4px] border border-caramel/30 bg-caramel/10 p-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-caramel-deep">Floor · Hectic Week Minimum</span>
          <div className="mt-2">
            <LevelFields
              level={bounds.floor}
              onChange={(updater) => onChange((b) => ({ ...b, floor: updater(b.floor) }))}
              readOnly={readOnly}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
