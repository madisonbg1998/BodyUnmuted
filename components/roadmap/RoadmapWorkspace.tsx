'use client';

// Replaces BU APP's App.tsx as the top-level state owner for one client's
// roadmap data. Keeps the exact same "local state + updater callback" shape
// BU APP used (updateRoadmap/updateLifeEvents/updateSnapshot/
// updateTrainingBounds) so Timeline/RoadmapBoard/etc. needed no rework — the
// only change is *what* persists the state: a debounced Server Action call
// instead of BU APP's debounced Supabase upsert.
import { useEffect, useRef, useState } from 'react';
import type {
  ClientData,
  ClientSnapshot as ClientSnapshotData,
  Duration,
  LifeEvent,
  RoadmapData,
  TrainingBounds as TrainingBoundsData,
} from '@/app/lib/roadmap/types';
import { saveClientDataAction } from '@/app/dashboard/roadmaps/actions';
import { ClientSnapshot } from './ClientSnapshot';
import { TrainingBounds } from './TrainingBounds';
import { RoadmapBoard } from './RoadmapBoard';
import { LifeEventsTab } from './LifeEventsTab';
import { SaveStatusIndicator, type SaveStatus } from './SaveStatus';

type MainTab = 'roadmaps' | 'life';

const SAVE_DEBOUNCE_MS = 800;

function noop() {}

export function RoadmapWorkspace({
  clientId,
  initialData,
  readOnly = false,
}: {
  clientId: string;
  initialData: ClientData;
  readOnly?: boolean;
}) {
  const [data, setData] = useState(initialData);
  const [tab, setTab] = useState<MainTab>('roadmaps');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipNextSave = useRef(true);

  // Switching clients renders a new RoadmapWorkspace instance (the coach page
  // keys this component by clientId), so there's no separate "reset on prop
  // change" effect to write — a fresh mount already starts from initialData.
  useEffect(() => {
    if (readOnly) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    setSaveStatus('saving');
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const result = await saveClientDataAction(clientId, data);
      setSaveStatus(result.ok ? 'saved' : 'error');
    }, SAVE_DEBOUNCE_MS);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [data, readOnly, clientId]);

  function updateRoadmap(duration: Duration, updater: (r: RoadmapData) => RoadmapData) {
    setData((d) => ({ ...d, roadmaps: { ...d.roadmaps, [duration]: updater(d.roadmaps[duration]) } }));
  }

  function updateLifeEvents(updater: (events: LifeEvent[]) => LifeEvent[]) {
    setData((d) => ({ ...d, lifeEvents: updater(d.lifeEvents) }));
  }

  function updateSnapshot(updater: (s: ClientSnapshotData) => ClientSnapshotData) {
    setData((d) => ({ ...d, snapshot: updater(d.snapshot) }));
  }

  function updateTrainingBounds(updater: (b: TrainingBoundsData) => TrainingBoundsData) {
    setData((d) => ({ ...d, trainingBounds: updater(d.trainingBounds) }));
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex gap-1 self-start rounded-md bg-cream-soft/60 p-1">
          <button
            onClick={() => setTab('roadmaps')}
            className={`rounded-[4px] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
              tab === 'roadmaps' ? 'bg-olive text-cream shadow-sm' : 'text-stone-deep hover:text-espresso-soft'
            }`}
          >
            Roadmaps
          </button>
          <button
            onClick={() => setTab('life')}
            className={`rounded-[4px] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
              tab === 'life' ? 'bg-olive text-cream shadow-sm' : 'text-stone-deep hover:text-espresso-soft'
            }`}
          >
            Travel &amp; Life Events
          </button>
        </nav>

        {!readOnly && <SaveStatusIndicator status={saveStatus} />}
      </div>

      <ClientSnapshot snapshot={data.snapshot} onChange={readOnly ? noop : updateSnapshot} readOnly={readOnly} />
      <TrainingBounds bounds={data.trainingBounds} onChange={readOnly ? noop : updateTrainingBounds} readOnly={readOnly} />

      {tab === 'roadmaps' ? (
        <RoadmapBoard data={data} onChangeRoadmap={readOnly ? noop : updateRoadmap} readOnly={readOnly} />
      ) : (
        <LifeEventsTab lifeEvents={data.lifeEvents} onChange={readOnly ? noop : updateLifeEvents} readOnly={readOnly} />
      )}
    </div>
  );
}
