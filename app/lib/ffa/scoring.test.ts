import { describe, expect, it } from 'vitest';
import { QUESTIONS } from './config';
import { computeOutcome, computeScores, getGoal, resolveResult, resolveTie, shuffle, zeroScores } from './scoring';
import type { FfaAnswers, FfaQuestion, ResultType, ScoredQuestion } from './types';

const SCORED_QUESTIONS = QUESTIONS.filter((q): q is ScoredQuestion => q.kind === 'scored');
const GOAL_QUESTION = QUESTIONS.find((q) => q.kind === 'goal')!;

/** Finds the answer ID on a scored question whose answer maps to `result`. */
function answerIdFor(question: FfaQuestion, result: ResultType): string {
  if (question.kind !== 'scored') throw new Error(`${question.id} is not a scored question`);
  const option = question.answers.find((a) => a.result === result);
  if (!option) throw new Error(`No ${result} answer on ${question.id}`);
  return option.id;
}

/** Builds a complete 12-answer set: every scored question answers `result`, plus a fixed goal. */
function fullAnswerSetFor(result: ResultType, overrides: FfaAnswers = {}): FfaAnswers {
  const answers: FfaAnswers = { [GOAL_QUESTION.id]: GOAL_QUESTION.answers[0].id };
  for (const q of SCORED_QUESTIONS) {
    answers[q.id] = answerIdFor(q, result);
  }
  return { ...answers, ...overrides };
}

const q4 = QUESTIONS.find((q) => q.id === 'q4')!;
const q9 = QUESTIONS.find((q) => q.id === 'q9')!;
const q12 = QUESTIONS.find((q) => q.id === 'q12')!;

// --- content integrity ------------------------------------------------------

describe('question content', () => {
  it('has exactly 12 questions', () => {
    expect(QUESTIONS).toHaveLength(12);
  });

  it('has 11 scored questions (1-5, 7-12) and exactly one goal question (6)', () => {
    expect(SCORED_QUESTIONS).toHaveLength(11);
    expect(QUESTIONS.filter((q) => q.kind === 'goal')).toHaveLength(1);
    expect(GOAL_QUESTION.id).toBe('q6');
    expect(GOAL_QUESTION.number).toBe(6);
  });

  it('every scored question has exactly one answer per result type A/B/C/D', () => {
    for (const q of SCORED_QUESTIONS) {
      const results = q.answers.map((a) => a.result).sort();
      expect(results).toEqual(['A', 'B', 'C', 'D']);
    }
  });

  it('every answer ID is unique across the whole quiz', () => {
    const allIds = QUESTIONS.flatMap((q) => q.answers.map((a) => a.id));
    expect(new Set(allIds).size).toBe(allIds.length);
  });

  it('the goal question has one answer per GoalType, all five', () => {
    if (GOAL_QUESTION.kind !== 'goal') throw new Error('expected goal question');
    const goals = GOAL_QUESTION.answers.map((a) => a.goal).sort();
    expect(goals).toEqual(['body_recomposition', 'energy_wellbeing', 'fat_loss', 'muscle', 'strength_confidence'].sort());
  });
});

// --- answer -> score mapping -------------------------------------------------

describe('computeScores', () => {
  it('starts every result type at zero', () => {
    expect(zeroScores()).toEqual({ A: 0, B: 0, C: 0, D: 0 });
  });

  it('awards exactly one point per scored answer', () => {
    const answers: FfaAnswers = { q1: answerIdFor(QUESTIONS[0], 'A') };
    const scores = computeScores(QUESTIONS, answers);
    expect(scores.A).toBe(1);
    expect(scores.B).toBe(0);
  });

  it('every individual answer on every scored question maps to the correct result', () => {
    for (const q of SCORED_QUESTIONS) {
      for (const result of ['A', 'B', 'C', 'D'] as ResultType[]) {
        const answers: FfaAnswers = { [q.id]: answerIdFor(q, result) };
        const scores = computeScores(QUESTIONS, answers);
        expect(scores[result], `${q.id} -> ${result}`).toBe(1);
        for (const other of (['A', 'B', 'C', 'D'] as ResultType[]).filter((r) => r !== result)) {
          expect(scores[other], `${q.id} -> ${result} should not score ${other}`).toBe(0);
        }
      }
    }
  });

  it('sums points across multiple questions for the same result', () => {
    const answers = fullAnswerSetFor('C');
    const scores = computeScores(QUESTIONS, answers);
    expect(scores.C).toBe(11);
    expect(scores.A + scores.B + scores.D).toBe(0);
  });

  it('ignores an unanswered question rather than crashing', () => {
    expect(() => computeScores(QUESTIONS, {})).not.toThrow();
    expect(computeScores(QUESTIONS, {})).toEqual(zeroScores());
  });
});

// --- Q6 never scores ---------------------------------------------------------

describe('Question 6 (goal) never affects the diagnostic score', () => {
  it('answering every goal option leaves all scores at zero', () => {
    if (GOAL_QUESTION.kind !== 'goal') throw new Error('expected goal question');
    for (const goalAnswer of GOAL_QUESTION.answers) {
      const scores = computeScores(QUESTIONS, { [GOAL_QUESTION.id]: goalAnswer.id });
      expect(scores).toEqual(zeroScores());
    }
  });

  it('changing the Q6 answer does not change an otherwise-identical score total', () => {
    if (GOAL_QUESTION.kind !== 'goal') throw new Error('expected goal question');
    const base = fullAnswerSetFor('A');
    const scoresWithGoal1 = computeScores(QUESTIONS, { ...base, [GOAL_QUESTION.id]: GOAL_QUESTION.answers[0].id });
    const scoresWithGoal2 = computeScores(QUESTIONS, { ...base, [GOAL_QUESTION.id]: GOAL_QUESTION.answers[4].id });
    expect(scoresWithGoal1).toEqual(scoresWithGoal2);
  });

  it('getGoal reads the correct GoalType regardless of scored answers', () => {
    if (GOAL_QUESTION.kind !== 'goal') throw new Error('expected goal question');
    const answers = fullAnswerSetFor('B', { [GOAL_QUESTION.id]: GOAL_QUESTION.answers[2].id });
    expect(getGoal(QUESTIONS, answers)).toBe(GOAL_QUESTION.answers[2].goal);
  });

  it('getGoal returns undefined when Q6 is unanswered', () => {
    expect(getGoal(QUESTIONS, {})).toBeUndefined();
  });
});

// --- all four types can win --------------------------------------------------

describe('all four result types can win outright', () => {
  for (const result of ['A', 'B', 'C', 'D'] as ResultType[]) {
    it(`sweeping every question with ${result} produces primary ${result}`, () => {
      const outcome = computeOutcome(QUESTIONS, fullAnswerSetFor(result));
      expect(outcome.primaryResult).toBe(result);
      expect(outcome.scores[result]).toBe(11);
    });
  }
});

// --- tie-breaking -------------------------------------------------------------

describe('tie-breaking order: Q12, then Q9, then Q4', () => {
  it('resolves via Q12 when Q12 belongs to one of the tied types', () => {
    // Q12 itself is one of the 11 scored questions, so to make it the
    // deciding vote: 4 other questions + Q12 = 5 for A, 5 questions for B,
    // and the 1 remaining question goes to C (keeping A/B tied at the top).
    const answers: FfaAnswers = { [GOAL_QUESTION.id]: GOAL_QUESTION.answers[0].id };
    const pool = SCORED_QUESTIONS.filter((q) => q.id !== 'q12');
    const groupA = pool.slice(0, 4);
    const groupB = pool.slice(4, 9);
    const leftover = pool.slice(9, 10);
    for (const q of groupA) answers[q.id] = answerIdFor(q, 'A');
    for (const q of groupB) answers[q.id] = answerIdFor(q, 'B');
    for (const q of leftover) answers[q.id] = answerIdFor(q, 'C');
    answers[q12.id] = answerIdFor(q12, 'A');

    const result = resolveResult(QUESTIONS, answers);
    expect(result.scores.A).toBe(result.scores.B);
    expect(result.primary).toBe('A');
  });

  it('falls through to Q9 when Q12 does not belong to the tied set', () => {
    const answers: FfaAnswers = {};
    const halfA = SCORED_QUESTIONS.filter((q) => q.id !== 'q9').slice(0, 5);
    const halfB = SCORED_QUESTIONS.filter((q) => q.id !== 'q9' && !halfA.includes(q)).slice(0, 5);
    for (const q of halfA) answers[q.id] = answerIdFor(q, 'A');
    for (const q of halfB) answers[q.id] = answerIdFor(q, 'B');
    // Q12 (part of one of the halves already) — force it to a third, untied type.
    answers[q12.id] = answerIdFor(q12, 'D');
    answers[q9.id] = answerIdFor(q9, 'B');
    answers[GOAL_QUESTION.id] = GOAL_QUESTION.answers[0].id;

    const scores = computeScores(QUESTIONS, answers);
    const tied = scores.A === scores.B ? ['A', 'B'] : [];
    expect(tied.length).toBeGreaterThan(0); // sanity: the fixture really is tied

    const result = resolveResult(QUESTIONS, answers);
    expect(result.primary).toBe('B');
  });

  it('falls through to Q4 when neither Q12 nor Q9 belong to the tied set', () => {
    // 8 remaining questions (excluding q4/q9/q12): 3 -> A, 4 -> B, 1 -> C.
    // Plus q4 -> A (making A=4, tied with B=4), with q9 and q12 both parked
    // on D so neither can resolve the tie before Q4 gets a chance to.
    const answers: FfaAnswers = { [GOAL_QUESTION.id]: GOAL_QUESTION.answers[0].id };
    const pool = SCORED_QUESTIONS.filter((q) => !['q12', 'q9', 'q4'].includes(q.id));
    const groupA = pool.slice(0, 3);
    const groupB = pool.slice(3, 7);
    const leftover = pool.slice(7, 8);
    for (const q of groupA) answers[q.id] = answerIdFor(q, 'A');
    for (const q of groupB) answers[q.id] = answerIdFor(q, 'B');
    for (const q of leftover) answers[q.id] = answerIdFor(q, 'C');
    answers[q4.id] = answerIdFor(q4, 'A');
    answers[q9.id] = answerIdFor(q9, 'D');
    answers[q12.id] = answerIdFor(q12, 'D');

    const scores = computeScores(QUESTIONS, answers);
    expect(scores.A).toBe(scores.B);

    const result = resolveResult(QUESTIONS, answers);
    expect(result.primary).toBe('A');
  });

  it('falls back to stable alphabetical order when none of Q12/Q9/Q4 resolve the tie', () => {
    // Tie between C and D, using only questions other than q12/q9/q4, and
    // point q12/q9/q4 at A/B (outside the tied set) so none of them apply.
    const answers: FfaAnswers = {};
    const pool = SCORED_QUESTIONS.filter((q) => !['q12', 'q9', 'q4'].includes(q.id));
    const halfC = pool.slice(0, 4);
    const halfD = pool.slice(4, 8);
    for (const q of halfC) answers[q.id] = answerIdFor(q, 'C');
    for (const q of halfD) answers[q.id] = answerIdFor(q, 'D');
    answers[q12.id] = answerIdFor(q12, 'A');
    answers[q9.id] = answerIdFor(q9, 'B');
    answers[q4.id] = answerIdFor(q4, 'A');
    answers[GOAL_QUESTION.id] = GOAL_QUESTION.answers[0].id;

    const scores = computeScores(QUESTIONS, answers);
    expect(scores.C).toBe(scores.D);

    const result = resolveResult(QUESTIONS, answers);
    expect(result.primary).toBe('C'); // C < D alphabetically
  });

  it('resolveTie is a pure deterministic function — same input, same output, every time', () => {
    const runs = Array.from({ length: 20 }, () => resolveTie(['B', 'D'], QUESTIONS, { q12: answerIdFor(q12, 'D') }));
    expect(new Set(runs).size).toBe(1);
    expect(runs[0]).toBe('D');
  });

  it('resolveTie throws on an empty candidate set rather than guessing', () => {
    expect(() => resolveTie([], QUESTIONS, {})).toThrow();
  });
});

// --- secondary qualification --------------------------------------------------

describe('secondary result qualification', () => {
  it('sets secondary when the runner-up is exactly one point behind primary', () => {
    const pool = SCORED_QUESTIONS;
    const answers: FfaAnswers = { [GOAL_QUESTION.id]: GOAL_QUESTION.answers[0].id };
    // 6 points to A, 5 points to B -> 1-point gap.
    pool.slice(0, 6).forEach((q) => (answers[q.id] = answerIdFor(q, 'A')));
    pool.slice(6, 11).forEach((q) => (answers[q.id] = answerIdFor(q, 'B')));

    const result = resolveResult(QUESTIONS, answers);
    expect(result.primary).toBe('A');
    expect(result.scores.A - result.scores.B).toBe(1);
    expect(result.secondary).toBe('B');
  });

  it('omits secondary when the runner-up is two or more points behind', () => {
    const pool = SCORED_QUESTIONS;
    const answers: FfaAnswers = { [GOAL_QUESTION.id]: GOAL_QUESTION.answers[0].id };
    // 8 points to A, 3 points to B -> 5-point gap.
    pool.slice(0, 8).forEach((q) => (answers[q.id] = answerIdFor(q, 'A')));
    pool.slice(8, 11).forEach((q) => (answers[q.id] = answerIdFor(q, 'B')));

    const result = resolveResult(QUESTIONS, answers);
    expect(result.primary).toBe('A');
    expect(result.scores.A - result.scores.B).toBeGreaterThan(1);
    expect(result.secondary).toBeUndefined();
  });

  it('sets secondary when primary and runner-up are exactly tied (0-point gap)', () => {
    const answers = fullAnswerSetFor('A');
    // Sweep is 11-0-0-0; instead build an exact secondary tie: 6 A, 6 B is
    // impossible (only 11 questions), so use 6 A / 5 B, then bump B to 6 by
    // reassigning one A question to B — leaving 5 A / 6 B, a clean primary
    // flip. Use a genuine even split across two disjoint question sets instead.
    const pool = SCORED_QUESTIONS;
    const evenAnswers: FfaAnswers = { [GOAL_QUESTION.id]: GOAL_QUESTION.answers[0].id };
    pool.slice(0, 6).forEach((q) => (evenAnswers[q.id] = answerIdFor(q, 'A')));
    pool.slice(6, 11).forEach((q) => (evenAnswers[q.id] = answerIdFor(q, 'A')));
    // Overwrite to force a true A/B tie at 5-5 with one spare answered C.
    const tiedAnswers: FfaAnswers = { [GOAL_QUESTION.id]: GOAL_QUESTION.answers[0].id };
    pool.slice(0, 5).forEach((q) => (tiedAnswers[q.id] = answerIdFor(q, 'A')));
    pool.slice(5, 10).forEach((q) => (tiedAnswers[q.id] = answerIdFor(q, 'B')));
    tiedAnswers[pool[10].id] = answerIdFor(pool[10], 'C');

    const result = resolveResult(QUESTIONS, tiedAnswers);
    expect(result.scores.A).toBe(result.scores.B);
    expect(result.secondary).toBeDefined();
    expect(new Set(['A', 'B'])).toContain(result.primary);
    void answers;
    void evenAnswers;
  });
});

// --- editing answers recalculates --------------------------------------------

describe('editing a previous answer recalculates the outcome', () => {
  it('changing one answer updates the score without double-counting the old choice', () => {
    const answers = fullAnswerSetFor('A');
    const before = computeScores(QUESTIONS, answers);
    expect(before.A).toBe(11);

    const changed = { ...answers, q1: answerIdFor(SCORED_QUESTIONS[0], 'D') };
    const after = computeScores(QUESTIONS, changed);

    expect(after.A).toBe(10);
    expect(after.D).toBe(1);
  });

  it('changing an answer can flip the primary result entirely', () => {
    const pool = SCORED_QUESTIONS;
    const answers: FfaAnswers = { [GOAL_QUESTION.id]: GOAL_QUESTION.answers[0].id };
    pool.slice(0, 6).forEach((q) => (answers[q.id] = answerIdFor(q, 'A')));
    pool.slice(6, 11).forEach((q) => (answers[q.id] = answerIdFor(q, 'B')));
    expect(resolveResult(QUESTIONS, answers).primary).toBe('A');

    // Flip two of A's questions to B, making B the outright leader (7 vs 4).
    const revised = {
      ...answers,
      [pool[0].id]: answerIdFor(pool[0], 'B'),
      [pool[1].id]: answerIdFor(pool[1], 'B'),
    };
    expect(resolveResult(QUESTIONS, revised).primary).toBe('B');
  });
});

// --- shuffle ------------------------------------------------------------------

describe('shuffle', () => {
  it('never changes the set of items, only their order', () => {
    const items = ['q1-a', 'q1-b', 'q1-c', 'q1-d'];
    const shuffled = shuffle(items, () => 0.999);
    expect([...shuffled].sort()).toEqual([...items].sort());
  });

  it('is deterministic given an injected RNG', () => {
    const items = [1, 2, 3, 4, 5];
    const rng = () => 0.5;
    expect(shuffle(items, rng)).toEqual(shuffle(items, rng));
  });
});

// --- computeOutcome integration ------------------------------------------------

describe('computeOutcome', () => {
  it('throws if called before Q6 is answered', () => {
    const answers = fullAnswerSetFor('A');
    delete answers[GOAL_QUESTION.id];
    expect(() => computeOutcome(QUESTIONS, answers)).toThrow();
  });

  it('returns a fully-formed QuizOutcome for a complete answer set', () => {
    const outcome = computeOutcome(QUESTIONS, fullAnswerSetFor('D'));
    expect(outcome.primaryResult).toBe('D');
    expect(outcome.goal).toBe('fat_loss');
    expect(outcome.scores).toEqual({ A: 0, B: 0, C: 0, D: 11 });
  });
});
