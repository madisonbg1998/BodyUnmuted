import { QUIZ_VERSION } from './config';
import type { ArchetypeId, ArchetypeScores, QuizState } from './types';

/**
 * ============================================================================
 * FUTURE INTEGRATION POINT — quiz lead capture
 * ============================================================================
 * This is NOT wired up to anything yet. No email is collected, no request is
 * sent anywhere, nothing is stored server-side. This just defines the shape
 * the lead record will eventually take, and one function that assembles it
 * from data we already have on the client at results time.
 *
 * When email delivery is ready to build:
 *   1. Add a name/email capture step (a new QuizPhase, e.g. 'email-capture').
 *   2. Fill in `firstName`, `email`, and `marketingConsent` below.
 *   3. POST this object to a new API route (e.g. `app/api/quiz-lead/route.ts`)
 *      that proxies it to wherever leads end up (Adhara or an external ESP —
 *      see the open questions about Adhara's automation capabilities).
 *   4. That route can compute `offerExpiresAt` (now + 72h) at submit time,
 *      once a real offer exists to attach it to.
 *
 * None of the scoring/archetype/results logic needs to change to support
 * this — this file is the seam.
 * ============================================================================
 */
export interface QuizLeadPayload {
  // --- not yet collected; present so the shape is stable once they are ---
  firstName?: string;
  email?: string;
  marketingConsent?: boolean;
  offerExpiresAt?: string;

  // --- available today, computed from the completed quiz ---
  primaryArchetype: ArchetypeId;
  secondaryArchetype: ArchetypeId;
  scores: ArchetypeScores;
  completedAt: string;
  quizVersion: string;
  utm: Record<string, string>;
  referrer: string | null;
}

export function buildLeadPayload(
  state: QuizState,
  primaryArchetype: ArchetypeId,
  secondaryArchetype: ArchetypeId,
  scores: ArchetypeScores
): QuizLeadPayload {
  return {
    primaryArchetype,
    secondaryArchetype,
    scores,
    completedAt: state.completedAt ?? new Date().toISOString(),
    quizVersion: QUIZ_VERSION,
    utm: state.utm,
    referrer: state.referrer,
  };
}
