export type ArchetypeId =
  | 'saved-workout-collector'
  | 'pilates-princess'
  | 'comfortable-lifter'
  | 'fresh-start-frequent-flyer'
  | 'pretty-healthy-girl'
  | 'perfect-plan-chaser';

export const ARCHETYPE_IDS: ArchetypeId[] = [
  'saved-workout-collector',
  'pilates-princess',
  'comfortable-lifter',
  'fresh-start-frequent-flyer',
  'pretty-healthy-girl',
  'perfect-plan-chaser',
];

export interface QuizAnswerOption {
  /** Stable, unique internal ID — never shown to the quiz taker. */
  id: string;
  /** Internal archetype this answer scores toward — never shown to the quiz taker. */
  archetype: ArchetypeId;
  text: string;
}

export interface SingleSelectQuestion {
  id: string;
  type: 'single';
  prompt: string;
  helperText?: string;
  /** Points awarded to the selected answer's archetype. */
  points: number;
  answers: QuizAnswerOption[];
}

export interface RankedTwoQuestion {
  id: string;
  type: 'ranked-two';
  prompt: string;
  helperText?: string;
  rank1Label: string;
  rank2Label: string;
  rank1Points: number;
  rank2Points: number;
  answers: QuizAnswerOption[];
}

export type QuizQuestion = SingleSelectQuestion | RankedTwoQuestion;

export interface ArchetypeContent {
  id: ArchetypeId;
  name: string;
  shortLabel?: string;
  headline: string;
  pattern: string;
  doingWell: string;
  blindSpot: string;
  whyStalled: string;
  whatsNext: string;
  /** How this archetype shows up when it's the *secondary* result. */
  secondaryDescription: string;
  nextSteps: [string, string, string];
  bridge: string;
  /** Line shown on the tiebreak screen if this archetype is among the tied candidates. */
  tiebreakDescription: string;
}

/** A single answer to question 1-12, or the ranked pair for question 13. */
export type QuizAnswerValue = string | { rank1: string; rank2: string };

export type QuizAnswers = Record<string, QuizAnswerValue>;

export type ArchetypeScores = Record<ArchetypeId, number>;

export type QuizPhase =
  | 'landing'
  | 'question'
  | 'primary-tiebreak'
  | 'secondary-tiebreak'
  | 'calculating'
  | 'results';

/** Everything persisted to localStorage so a refresh can resume mid-quiz. */
export interface QuizState {
  version: string;
  phase: QuizPhase;
  currentQuestionIndex: number;
  answers: QuizAnswers;
  /** Shuffled answer-ID order per question, generated once and kept stable for the session. */
  answerOrder: Record<string, string[]>;
  primaryTiebreakChoice?: ArchetypeId;
  secondaryTiebreakChoice?: ArchetypeId;
  primaryTiebreakOrder?: ArchetypeId[];
  secondaryTiebreakOrder?: ArchetypeId[];
  /** Set once resolved, so a refresh during 'calculating' or 'results' doesn't need to re-derive anything. */
  primary?: ArchetypeId;
  secondary?: ArchetypeId;
  startedAt: string;
  completedAt?: string;
  utm: Record<string, string>;
  referrer: string | null;
}

