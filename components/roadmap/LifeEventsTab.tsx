'use client';

// Ported verbatim from BU APP's src/components/LifeEventsTab.tsx, except ids
// are minted client-side with crypto.randomUUID() instead of the old newId()
// helper — same thing, one fewer file to port.
import { useState } from 'react';
import type { LifeEvent, LifeEventTypeId } from '@/app/lib/roadmap/types';
import { LIFE_EVENT_TYPE_PRESETS, getLifeEventPreset } from '@/app/lib/roadmap/presets';
import { formatDateShort, todayISO, daysBetweenInclusive } from '@/app/lib/roadmap/dates';

function emptyDraft(): Omit<LifeEvent, 'id'> {
  const today = todayISO();
  return { typeId: 'travel', title: '', startDate: today, endDate: today, notes: '' };
}

export function LifeEventsTab({
  lifeEvents,
  onChange,
  readOnly = false,
}: {
  lifeEvents: LifeEvent[];
  onChange: (updater: (events: LifeEvent[]) => LifeEvent[]) => void;
  readOnly?: boolean;
}) {
  const [draft, setDraft] = useState(emptyDraft());
  const [editingId, setEditingId] = useState<string | null>(null);

  const sorted = [...lifeEvents].sort((a, b) => a.startDate.localeCompare(b.startDate));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.title.trim()) return;
    const endDate = draft.endDate < draft.startDate ? draft.startDate : draft.endDate;
    if (editingId) {
      onChange((events) => events.map((ev) => (ev.id === editingId ? { ...ev, ...draft, endDate } : ev)));
      setEditingId(null);
    } else {
      onChange((events) => [...events, { id: crypto.randomUUID(), ...draft, endDate }]);
    }
    setDraft(emptyDraft());
  }

  function edit(ev: LifeEvent) {
    setEditingId(ev.id);
    setDraft({ typeId: ev.typeId, title: ev.title, startDate: ev.startDate, endDate: ev.endDate, notes: ev.notes });
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft(emptyDraft());
  }

  return (
    <div className={`grid grid-cols-1 gap-6 ${readOnly ? '' : 'lg:grid-cols-[360px_1fr]'}`}>
      {!readOnly && (
      <form onSubmit={submit} className="flex flex-col gap-3 rounded-md border border-border-warm bg-paper p-4 shadow-sm">
        <h3 className="font-display text-lg italic text-espresso">{editingId ? 'Edit event' : 'Add travel / life event'}</h3>

        <div className="flex gap-1.5">
          {LIFE_EVENT_TYPE_PRESETS.map((p) => (
            <button
              type="button"
              key={p.id}
              onClick={() => setDraft((d) => ({ ...d, typeId: p.id as LifeEventTypeId }))}
              className={`flex-1 rounded-[4px] border px-2 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                draft.typeId === p.id ? `${p.color} ${p.border} ${p.text}` : 'border-border-warm text-stone-deep hover:border-stone'
              }`}
            >
              {p.icon} {p.label}
            </button>
          ))}
        </div>

        <label className="text-xs font-medium uppercase tracking-wide text-stone">
          Title
          <input
            required
            value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            placeholder="e.g. Cabo trip, Client's work conference"
            className="mt-1 w-full rounded-[4px] border border-border-warm px-2 py-1.5 text-sm normal-case text-espresso-soft outline-none focus:border-stone"
          />
        </label>

        <div className="flex gap-2">
          <label className="flex-1 text-xs font-medium uppercase tracking-wide text-stone">
            Start date
            <input
              type="date"
              required
              value={draft.startDate}
              onChange={(e) => setDraft((d) => ({ ...d, startDate: e.target.value }))}
              className="mt-1 w-full rounded-[4px] border border-border-warm px-2 py-1.5 text-sm normal-case text-espresso-soft outline-none focus:border-stone"
            />
          </label>
          <label className="flex-1 text-xs font-medium uppercase tracking-wide text-stone">
            End date
            <input
              type="date"
              value={draft.endDate}
              min={draft.startDate}
              onChange={(e) => setDraft((d) => ({ ...d, endDate: e.target.value }))}
              className="mt-1 w-full rounded-[4px] border border-border-warm px-2 py-1.5 text-sm normal-case text-espresso-soft outline-none focus:border-stone"
            />
          </label>
        </div>

        <label className="text-xs font-medium uppercase tracking-wide text-stone">
          Notes
          <textarea
            value={draft.notes}
            onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
            rows={4}
            placeholder="Anything to plan around..."
            className="mt-1 w-full resize-y rounded-[4px] border border-border-warm px-2 py-1.5 text-sm normal-case text-espresso-soft outline-none focus:border-stone"
          />
        </label>

        <div className="flex gap-2">
          <button type="submit" className="flex-1 rounded-[4px] bg-olive py-2 text-xs font-semibold uppercase tracking-wide text-cream">
            {editingId ? 'Save changes' : 'Add event'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="rounded-[4px] border border-border-warm px-3 text-xs font-semibold uppercase tracking-wide text-stone-deep">
              Cancel
            </button>
          )}
        </div>
      </form>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-lg italic text-espresso">Upcoming timeline</h3>
        {sorted.length === 0 && (
          <p className="rounded-md border border-dashed border-border-warm p-6 text-center text-sm text-stone">
            No travel or life events yet. Add one to see it overlaid on the roadmaps.
          </p>
        )}
        <ul className="flex flex-col gap-2">
          {sorted.map((ev) => {
            const preset = getLifeEventPreset(ev.typeId);
            const days = daysBetweenInclusive(ev.startDate, ev.endDate);
            return (
              <li key={ev.id} className="flex items-center gap-3 rounded-md border border-border-warm bg-paper p-3 shadow-sm">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${preset.color} text-base`}>
                  {preset.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-espresso-soft">{ev.title}</p>
                  <p className="text-xs text-stone-deep">
                    {formatDateShort(ev.startDate)}
                    {ev.endDate !== ev.startDate && <> – {formatDateShort(ev.endDate)}</>}
                    <span className="ml-1 text-stone">
                      ({days} day{days === 1 ? '' : 's'})
                    </span>
                  </p>
                  {ev.notes && <p className="mt-0.5 truncate text-xs text-stone">{ev.notes}</p>}
                </div>
                {!readOnly && (
                  <>
                    <button onClick={() => edit(ev)} className="rounded-[4px] px-2 py-1 text-xs uppercase tracking-wide text-stone-deep hover:bg-cream-soft">
                      Edit
                    </button>
                    <button
                      onClick={() => onChange((events) => events.filter((e) => e.id !== ev.id))}
                      className="rounded-[4px] px-2 py-1 text-xs uppercase tracking-wide text-rust-deep hover:bg-rust/10"
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
