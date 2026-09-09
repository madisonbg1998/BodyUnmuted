'use client';

// Replaces BU APP's src/components/SyncIndicator.tsx (which reported a
// cross-tab Supabase sync state). This just reflects the pending/error state
// of the debounced autosave in RoadmapWorkspace.
export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const LABEL: Record<SaveStatus, string> = {
  idle: 'All changes saved',
  saving: 'Saving…',
  saved: 'All changes saved',
  error: 'Save failed — retrying on next change',
};

const DOT: Record<SaveStatus, string> = {
  idle: 'bg-sage',
  saving: 'bg-caramel animate-pulse',
  saved: 'bg-sage',
  error: 'bg-rust',
};

export function SaveStatusIndicator({ status }: { status: SaveStatus }) {
  return (
    <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-stone-deep">
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[status]}`} aria-hidden />
      {LABEL[status]}
    </span>
  );
}
