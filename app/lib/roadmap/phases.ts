// Ported near-verbatim from BU APP's src/lib/phases.ts — pure phase
// placement/resize/move logic, no framework/persistence dependency.
import type { Phase } from './types';

export function sortPhases(phases: Phase[]): Phase[] {
  return [...phases].sort((a, b) => a.startMonth - b.startMonth);
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

// Inserts a new phase spanning [start, end], trimming or splitting any phases it overlaps.
export function placePhase(
  phases: Phase[],
  start: number,
  end: number,
  duration: number,
  newPhase: Omit<Phase, 'startMonth' | 'endMonth'>
): Phase[] {
  const s = clamp(Math.min(start, end), 0, duration - 1);
  const e = clamp(Math.max(start, end), 0, duration - 1);

  const result: Phase[] = [];
  for (const p of phases) {
    if (p.endMonth < s || p.startMonth > e) {
      result.push(p);
      continue;
    }
    if (p.startMonth < s && p.endMonth > e) {
      result.push({ ...p, endMonth: s - 1 });
      result.push({ ...p, id: `${p.id}-split`, startMonth: e + 1 });
      continue;
    }
    if (p.startMonth < s) {
      result.push({ ...p, endMonth: s - 1 });
      continue;
    }
    if (p.endMonth > e) {
      result.push({ ...p, startMonth: e + 1 });
      continue;
    }
    // fully contained in [s, e] — drop it
  }
  result.push({ ...newPhase, startMonth: s, endMonth: e });
  return sortPhases(result);
}

export function removePhase(phases: Phase[], id: string): Phase[] {
  return phases.filter((p) => p.id !== id);
}

export function updatePhaseStyle(phases: Phase[], id: string, updates: Partial<Phase>): Phase[] {
  return phases.map((p) => (p.id === id ? { ...p, ...updates } : p));
}

export function resizePhaseEdge(
  phases: Phase[],
  id: string,
  edge: 'start' | 'end',
  newMonth: number,
  duration: number
): Phase[] {
  const sorted = sortPhases(phases);
  const idx = sorted.findIndex((p) => p.id === id);
  if (idx === -1) return phases;
  const phase = sorted[idx];
  const prev = sorted[idx - 1];
  const next = sorted[idx + 1];

  if (edge === 'start') {
    const lower = prev ? prev.endMonth + 1 : 0;
    const upper = phase.endMonth;
    const clamped = clamp(newMonth, lower, upper);
    sorted[idx] = { ...phase, startMonth: clamped };
  } else {
    const lower = phase.startMonth;
    const upper = next ? next.startMonth - 1 : duration - 1;
    const clamped = clamp(newMonth, lower, upper);
    sorted[idx] = { ...phase, endMonth: clamped };
  }
  return sorted;
}

export function movePhase(phases: Phase[], id: string, deltaMonths: number, duration: number): Phase[] {
  const sorted = sortPhases(phases);
  const idx = sorted.findIndex((p) => p.id === id);
  if (idx === -1) return phases;
  const phase = sorted[idx];
  const prev = sorted[idx - 1];
  const next = sorted[idx + 1];
  const width = phase.endMonth - phase.startMonth;

  const lowerStart = prev ? prev.endMonth + 1 : 0;
  const upperStart = (next ? next.startMonth - 1 : duration - 1) - width;

  const newStart = clamp(phase.startMonth + deltaMonths, lowerStart, Math.max(lowerStart, upperStart));
  sorted[idx] = { ...phase, startMonth: newStart, endMonth: newStart + width };
  return sorted;
}
