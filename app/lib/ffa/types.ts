/**
 * ============================================================================
 * THE FREEDOM FITNESS AUDIT — types
 * ============================================================================
 * This file is the contract. `QuizOutcome`, `LeadCapturePayload`, and
 * `LeadCaptureAdapter` are defined exactly as specified in the build brief —
 * do not change their shape casually. The future email-integration phase
 * will implement `LeadCaptureAdapter` against a real backend without needing
 * any other file in this module to change.
 * ============================================================================
 */

export type ResultType = 'A' | 'B' | 'C' | 'D';

export const RESULT_TYPES: ResultType[] = ['A', 'B', 'C', 'D'];

export type GoalType = 'fat_loss' | 'muscle' | 'body_recomposition' | 'strength_confidence' | 'energy_wellbeing';

export const GOAL_TYPES: GoalType[] = ['fat_loss', 'muscle', 'body_recomposition', 'strength_confidence', 'energy_wellbeing'];

export type QuizOutcome = {
  primaryResult: ResultType;
  secondaryResult?: ResultType;
  scores: Record<ResultType, number>;
  goal: GoalType;
};

export type LeadCapturePayload = QuizOutcome & {
  firstName: string;
  email: string;
  consent: boolean;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  referrer?: string;
  completedAt: string;
};

export interface LeadCaptureAdapter {
  submit(payload: LeadCapturePayload): Promise<{ success: true }>;
}

// --- content model ----------------------------------------------------------

/** An answer on one of the 11 scored questions (all except Q6). */
export interface ScoredAnswerOption {
  /** Stable, unique ID — never shown to the quiz taker, never re-derived from position. */
  id: string;
  text: string;
  result: ResultType;
}

export interface ScoredQuestion {
  id: string;
  /** 1-12 display order. */
  number: number;
  kind: 'scored';
  prompt: string;
  answers: ScoredAnswerOption[];
}

/** Q6 — records her goal but never contributes to the diagnostic score. */
export interface GoalAnswerOption {
  id: string;
  text: string;
  goal: GoalType;
}

export interface GoalQuestion {
  id: string;
  number: number;
  kind: 'goal';
  prompt: string;
  answers: GoalAnswerOption[];
}

export type FfaQuestion = ScoredQuestion | GoalQuestion;

/** questionId -> selected answerId. */
export type FfaAnswers = Record<string, string>;

export type FfaPhase = 'landing' | 'question' | 'calculating' | 'email-gate' | 'revealed';

/** Everything persisted to localStorage so a refresh can resume mid-quiz. */
export interface FfaState {
  version: string;
  phase: FfaPhase;
  currentQuestionIndex: number;
  answers: FfaAnswers;
  /** Shuffled answer-ID order per question, generated once and kept stable for the session. */
  answerOrder: Record<string, string[]>;
  /** Whether the email-capture popup is currently open (only meaningful during 'email-gate'). */
  modalOpen: boolean;
  /** Computed once at the end of Q12. Kept out of view until mock submission succeeds. */
  outcome?: QuizOutcome;
  startedAt: string;
  completedAt?: string;
  utm: Record<string, string>;
  referrer: string | null;
}
