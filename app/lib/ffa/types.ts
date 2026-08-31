/**
 * ============================================================================
 * THE FREEDOM FITNESS AUDIT — types
 * ============================================================================
 * `QuizOutcome`, `LeadCapturePayload`, and `LeadCaptureAdapter` are the
 * contract every other file in this module builds on — do not change their
 * shape casually. (The original build brief's `QuizOutcome` also had a
 * `goal: GoalType` field, sourced from a Q6 "what's your goal" question —
 * both were removed after launch since the goal question wasn't needed.)
 * ============================================================================
 */

export type ResultType = 'A' | 'B' | 'C' | 'D';

export const RESULT_TYPES: ResultType[] = ['A', 'B', 'C', 'D'];

export type QuizOutcome = {
  primaryResult: ResultType;
  secondaryResult?: ResultType;
  scores: Record<ResultType, number>;
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

/** An answer on one of the 11 scored questions. */
export interface ScoredAnswerOption {
  /** Stable, unique ID — never shown to the quiz taker, never re-derived from position. */
  id: string;
  text: string;
  result: ResultType;
}

export interface ScoredQuestion {
  id: string;
  /** 1-11 display order. */
  number: number;
  kind: 'scored';
  prompt: string;
  answers: ScoredAnswerOption[];
}

export type FfaQuestion = ScoredQuestion;

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
  /** Computed once at the end of the last question. Kept out of view until submission succeeds. */
  outcome?: QuizOutcome;
  startedAt: string;
  completedAt?: string;
  utm: Record<string, string>;
  referrer: string | null;
}
