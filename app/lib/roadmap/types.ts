// Domain types for the roadmap tool. Deliberately mirrors BU APP's
// src/types.ts shape (Phase/MonthNote/RoadmapData/LifeEvent/etc.) so the
// ported Timeline/RoadmapBoard/etc. components need minimal reshaping —
// only Client gained the fields needed for coach/member linkage, and ids
// are now DB-generated uuids instead of crypto.randomUUID().

export type Duration = 3 | 6 | 12;

export type PhaseTypeId = 'build' | 'cut' | 'maintenance' | 'custom';

export interface PhasePreset {
  id: PhaseTypeId;
  label: string;
  color: string; // tailwind bg class
  border: string; // tailwind border class
  text: string; // tailwind text class
}

export interface Phase {
  id: string;
  typeId: PhaseTypeId;
  label: string;
  color: string;
  border: string;
  text: string;
  startMonth: number; // inclusive, 0-indexed
  endMonth: number; // inclusive, 0-indexed
}

export interface MonthNote {
  goal: string;
}

export interface RoadmapData {
  startDate: string; // ISO date, first day of month 0
  phases: Phase[];
  monthNotes: Record<number, MonthNote>;
}

export type RoadmapsByDuration = Record<Duration, RoadmapData>;

export type LifeEventTypeId = 'travel' | 'work' | 'other';

export interface LifeEventTypePreset {
  id: LifeEventTypeId;
  label: string;
  color: string;
  border: string;
  text: string;
  icon: string;
}

export interface LifeEvent {
  id: string;
  typeId: LifeEventTypeId;
  title: string;
  startDate: string; // ISO date
  endDate: string; // ISO date, inclusive
  notes: string;
}

export interface ClientSnapshot {
  goals: string;
  startingPoint: string;
}

export interface TrainingLevel {
  daysPerWeek: string;
  sessionLength: string;
}

export interface TrainingBounds {
  ceiling: TrainingLevel;
  floor: TrainingLevel;
}

export interface ClientData {
  roadmaps: RoadmapsByDuration;
  lifeEvents: LifeEvent[];
  snapshot: ClientSnapshot;
  trainingBounds: TrainingBounds;
}

/** A coach's roster entry. `linked` is true once a member has logged in with a matching email. */
export interface RosterClient {
  id: string;
  name: string;
  email: string | null;
  linked: boolean;
}
