import { QUIZ_VERSION } from './config';
import type { FfaState } from './types';

const STORAGE_KEY = 'bodyunmuted_ffa_state';

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

export function createInitialState(): FfaState {
  const { utm, referrer } = captureUtmAndReferrer();
  return {
    version: QUIZ_VERSION,
    phase: 'landing',
    currentQuestionIndex: 0,
    answers: {},
    answerOrder: {},
    modalOpen: false,
    startedAt: new Date().toISOString(),
    utm,
    referrer,
  };
}

/** Reads persisted quiz state. Returns null if nothing is stored, it's corrupt, or its version is stale. */
export function loadState(): FfaState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FfaState;
    if (!parsed || parsed.version !== QUIZ_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveState(state: FfaState): void {
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

/**
 * Called immediately after the mock submission succeeds. Keeps only what's
 * needed to render the reveal — phase + the already-computed outcome — and
 * wipes everything else (individual answers, answer order, UTM, referrer)
 * from both the returned object and localStorage. A refresh after this point
 * still shows her result; it just can't replay or inspect how she got there.
 *
 * Never touches firstName/email — this module has no knowledge of either;
 * that data lives only in the popup's local component state and the mock
 * adapter call, and is discarded the moment that call resolves.
 */
export function clearProgressKeepOutcome(state: FfaState): FfaState {
  const trimmed: FfaState = {
    version: state.version,
    phase: 'revealed',
    currentQuestionIndex: 0,
    answers: {},
    answerOrder: {},
    modalOpen: false,
    outcome: state.outcome,
    startedAt: state.startedAt,
    completedAt: state.completedAt,
    utm: {},
    referrer: null,
  };
  saveState(trimmed);
  return trimmed;
}
