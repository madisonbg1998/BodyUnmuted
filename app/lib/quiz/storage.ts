import { QUIZ_VERSION } from './config';
import type { QuizState } from './types';

const STORAGE_KEY = 'bodyunmuted_quiz_state';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

export function captureUtmAndReferrer(): { utm: Record<string, string>; referrer: string | null } {
  if (typeof window === 'undefined') return { utm: {}, referrer: null };

  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }

  return { utm, referrer: document.referrer || null };
}

export function createInitialState(): QuizState {
  const { utm, referrer } = captureUtmAndReferrer();
  return {
    version: QUIZ_VERSION,
    phase: 'landing',
    currentQuestionIndex: 0,
    answers: {},
    answerOrder: {},
    startedAt: new Date().toISOString(),
    utm,
    referrer,
  };
}

/** Reads persisted quiz state. Returns null if nothing is stored, it's corrupt, or its version is stale. */
export function loadState(): QuizState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as QuizState;
    if (!parsed || parsed.version !== QUIZ_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveState(state: QuizState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage can throw in private-browsing/quota-exceeded situations —
    // the quiz should keep working in-memory even if persistence fails.
  }
}

export function clearState(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
