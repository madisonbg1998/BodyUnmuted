// Ported near-verbatim from BU APP's src/lib/dates.ts — pure date math, no
// framework/persistence dependency. All roadmap dates are stored as ISO
// "YYYY-MM-DD" strings representing local calendar dates.

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function firstOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function addMonths(iso: string, count: number): Date {
  const d = parseISODate(iso);
  return new Date(d.getFullYear(), d.getMonth() + count, 1);
}

export function monthLabel(date: Date): string {
  return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

export function monthRangeForIndex(startDateISO: string, monthIndex: number): { start: Date; end: Date } {
  const start = addMonths(startDateISO, monthIndex);
  const end = new Date(start.getFullYear(), start.getMonth() + 1, 0); // last day of that month
  return { start, end };
}

// Returns the list of month indices (within [0, duration)) that overlap the given date range.
export function monthIndicesForRange(
  startDateISO: string,
  duration: number,
  rangeStartISO: string,
  rangeEndISO: string
): number[] {
  const rangeStart = parseISODate(rangeStartISO);
  const rangeEnd = parseISODate(rangeEndISO);
  const indices: number[] = [];
  for (let i = 0; i < duration; i++) {
    const { start, end } = monthRangeForIndex(startDateISO, i);
    if (rangeStart <= end && rangeEnd >= start) indices.push(i);
  }
  return indices;
}

export function formatDateShort(iso: string): string {
  return parseISODate(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

// Compact range for tight UI spots, e.g. "Sep 3" / "Sep 3–5" / "Sep 28 – Oct 2" (no year).
export function formatDateRangeCompact(startISO: string, endISO: string): string {
  const start = parseISODate(startISO);
  const end = parseISODate(endISO);
  const startStr = start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  if (startISO === endISO) return startStr;
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${startStr}–${end.getDate()}`;
  }
  const endStr = end.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  return `${startStr} – ${endStr}`;
}

function monthIndexForDate(startDateISO: string, date: Date): number {
  const roadmapStart = parseISODate(startDateISO);
  return (date.getFullYear() - roadmapStart.getFullYear()) * 12 + (date.getMonth() - roadmapStart.getMonth());
}

function fractionForDate(startDateISO: string, duration: number, date: Date, boundary: 'start' | 'end'): number {
  const rawIndex = monthIndexForDate(startDateISO, date);
  if (rawIndex < 0) return 0;
  if (rawIndex > duration - 1) return 1;
  const { end } = monthRangeForIndex(startDateISO, rawIndex);
  const daysInMonth = end.getDate();
  const dayFrac = boundary === 'start' ? (date.getDate() - 1) / daysInMonth : date.getDate() / daysInMonth;
  return (rawIndex + dayFrac) / duration;
}

// Position + width (as 0-100 percentages of the full duration-month grid) for a date range,
// so a bar lines up exactly with the day-of-month it covers inside each equal-width month column.
export function eventBarRect(
  startDateISO: string,
  duration: number,
  rangeStartISO: string,
  rangeEndISO: string
): { leftPct: number; widthPct: number } {
  const leftFrac = fractionForDate(startDateISO, duration, parseISODate(rangeStartISO), 'start');
  const rightFrac = fractionForDate(startDateISO, duration, parseISODate(rangeEndISO), 'end');
  const left = Math.max(0, Math.min(1, leftFrac));
  const right = Math.max(left, Math.min(1, rightFrac));
  return { leftPct: left * 100, widthPct: (right - left) * 100 };
}

// Day offset (can be negative or beyond the roadmap) of an ISO date from the roadmap's start.
export function daysFromRoadmapStart(startDateISO: string, dateISO: string): number {
  const start = parseISODate(startDateISO);
  const d = parseISODate(dateISO);
  return Math.round((d.getTime() - start.getTime()) / 86400000);
}

export function totalRoadmapDays(startDateISO: string, duration: number): number {
  const { end } = monthRangeForIndex(startDateISO, duration - 1);
  return daysFromRoadmapStart(startDateISO, toISODate(end)) + 1;
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function daysBetweenInclusive(startISO: string, endISO: string): number {
  const start = parseISODate(startISO);
  const end = parseISODate(endISO);
  return Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
}
