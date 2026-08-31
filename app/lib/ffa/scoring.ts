import { RESULT_TYPES, type FfaAnswers, type FfaQuestion, type QuizOutcome, type ResultType } from './types';
import { TIEBREAK_QUESTION_ORDER } from './config';

/**
 * Pure, stateless scoring — always recomputes every result type's total from
 * the full answers map rather than incrementally mutating a running total.
 * That way "she changed a previous answer" is just "update the map entry and
 * recompute," with no risk of stale points lingering from an old selection.
 */
export function zeroScores(): Record<ResultType, number> {
  return RESULT_TYPES.reduce(
    (acc, t) => {
      acc[t] = 0;
      return acc;
    },
    {} as Record<ResultType, number>
  );
}

/** Every question adds one point to its answer's result type. */
export function computeScores(questions: FfaQuestion[], answers: FfaAnswers): Record<ResultType, number> {
  const scores = zeroScores();

  for (const question of questions) {
    const answerId = answers[question.id];
    if (!answerId) continue;
    const option = question.answers.find((a) => a.id === answerId);
    if (option) scores[option.result] += 1;
  }

  return scores;
}

/** All result types (excluding any in `excluding`) tied for the highest score among them. */
export function getTiedTop(scores: Record<ResultType, number>, excluding: ResultType[] = []): ResultType[] {
  const candidates = RESULT_TYPES.filter((t) => !excluding.includes(t));
  const max = Math.max(...candidates.map((t) => scores[t]));
  return candidates.filter((t) => scores[t] === max);
}

/** Which result type her answer on a given question belongs to, if any. */
function resultForQuestion(questionId: string, questions: FfaQuestion[], answers: FfaAnswers): ResultType | undefined {
  const question = questions.find((q) => q.id === questionId);
  if (!question) return undefined;
  const answerId = answers[question.id];
  if (!answerId) return undefined;
  return question.answers.find((a) => a.id === answerId)?.result;
}

/**
 * Deterministically resolves a tied set of result types to exactly one.
 *
 * Per the spec: break exact ties using Q12, then Q9, then Q4 — the first of
 * those whose answer belongs to the tied set wins. If none of the three do
 * (possible when the tied types' points all came from other questions),
 * falls back to stable alphabetical order. This function never returns an
 * ambiguous or random result — same inputs always produce the same output.
 */
export function resolveTie(tied: ResultType[], questions: FfaQuestion[], answers: FfaAnswers): ResultType {
  if (tied.length === 0) throw new Error('resolveTie called with an empty candidate set');
  if (tied.length === 1) return tied[0];

  for (const questionId of TIEBREAK_QUESTION_ORDER) {
    const candidate = resultForQuestion(questionId, questions, answers);
    if (candidate && tied.includes(candidate)) return candidate;
  }

  return [...tied].sort()[0];
}

export interface ResolvedResult {
  primary: ResultType;
  /** Only set when the runner-up's score is within one point of the primary's. */
  secondary?: ResultType;
  scores: Record<ResultType, number>;
}

export function resolveResult(questions: FfaQuestion[], answers: FfaAnswers): ResolvedResult {
  const scores = computeScores(questions, answers);

  const primary = resolveTie(getTiedTop(scores), questions, answers);
  const secondaryCandidate = resolveTie(getTiedTop(scores, [primary]), questions, answers);

  const secondary = scores[primary] - scores[secondaryCandidate] <= 1 ? secondaryCandidate : undefined;

  return { primary, secondary, scores };
}

/** Assembles the full, privately-computed outcome once every question is answered. */
export function computeOutcome(questions: FfaQuestion[], answers: FfaAnswers): QuizOutcome {
  const { primary, secondary, scores } = resolveResult(questions, answers);
  return { primaryResult: primary, secondaryResult: secondary, scores };
}

/** Fisher-Yates. Accepts an injectable RNG so tests can be deterministic. */
export function shuffle<T>(items: T[], rng: () => number = Math.random): T[] {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
