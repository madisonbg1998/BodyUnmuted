'use client';

// Ported verbatim from BU APP's src/components/ClientSnapshot.tsx.
import type { ClientSnapshot as ClientSnapshotData } from '@/app/lib/roadmap/types';

export function ClientSnapshot({
  snapshot,
  onChange,
  readOnly = false,
}: {
  snapshot: ClientSnapshotData;
  onChange: (updater: (s: ClientSnapshotData) => ClientSnapshotData) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-md border border-border-warm bg-paper p-4 shadow-sm sm:grid-cols-2">
      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-stone">Starting Point</span>
        <textarea
          value={snapshot.startingPoint}
          onChange={(e) => onChange((s) => ({ ...s, startingPoint: e.target.value }))}
          placeholder="Where is this client coming into this from right now?"
          rows={4}
          disabled={readOnly}
          className="w-full resize-y rounded-[4px] border border-border-warm bg-cream p-2 text-sm text-espresso-soft outline-none placeholder:text-stone focus:border-stone disabled:opacity-70"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-stone">Goals</span>
        <textarea
          value={snapshot.goals}
          onChange={(e) => onChange((s) => ({ ...s, goals: e.target.value }))}
          placeholder="What is this client working toward right now?"
          rows={4}
          disabled={readOnly}
          className="w-full resize-y rounded-[4px] border border-border-warm bg-cream p-2 text-sm text-espresso-soft outline-none placeholder:text-stone focus:border-stone disabled:opacity-70"
        />
      </label>
    </div>
  );
}
