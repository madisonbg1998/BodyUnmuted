import { describe, expect, it } from 'vitest';
import { ARCHETYPE_IDS } from './types';
import type { ArchetypeId, QuizAnswers, QuizQuestion } from './types';
import { computeScores, getTiedTop, resolveResult, shuffle, zeroScores } from './scoring';
import { QUESTIONS } from './config';

// --- helpers -----------------------------------------------------------

/** Build an answers map that scores `q1`..`upTo` for `archetype`, in order. */
function answerRunFor(archetype: ArchetypeId, questions: QuizQuestion[] = QUESTIONS) {
  const answers: QuizAnswers = {};
  for (const q of questions) {
    if (q.type === 'single') {
      const option = q.answers.find((a) => a.archetype === archetype);
      if (option) answers[q.id] = option.id;
    }
  }
  return answers;
}

function answerIdFor(question: QuizQuestion, archetype: ArchetypeId): string {
  const option = question.answers.find((a) => a.archetype === archetype);
  if (!option) throw new Error(`No answer for ${archetype} on ${question.id}`);
  return option.id;
}

const [q1, q2, , , , , , , , q10, q11, q12, q13] = QUESTIONS;

// --- weighted scoring ----------------------------------------------------

describe('computeScores — point values', () => {
  it('awards 2 points for a Q1-9 answer', () => {
    const answers: QuizAnswers = { [q1.id]: answerIdFor(q1, 'saved-workout-collector') };
    const scores = computeScores(QUESTIONS, answers);
    expect(scores['saved-workout-collector']).toBe(2);
  });

  it('awards 3 points for a Q10-12 answer', () => {
    const answers: QuizAnswers = { [q10.id]: answerIdFor(q10, 'pilates-princess') };
    const scores = computeScores(QUESTIONS, answers);
    expect(scores['pilates-princess']).toBe(3);
  });

  it('awards 4 points for Q13 rank1 and 2 points for rank2', () => {
    const answers: QuizAnswers = {
      [q13.id]: {
        rank1: answerIdFor(q13, 'comfortable-lifter'),
        rank2: answerIdFor(q13, 'fresh-start-frequent-flyer'),
      },
    };
    const scores = computeScores(QUESTIONS, answers);
    expect(scores['comfortable-lifter']).toBe(4);
    expect(scores['fresh-start-frequent-flyer']).toBe(2);
  });

  it('sums points across multiple questions for the same archetype', () => {
    const answers: QuizAnswers = {
      [q1.id]: answerIdFor(q1, 'pretty-healthy-girl'),
      [q2.id]: answerIdFor(q2, 'pretty-healthy-girl'),
      [q10.id]: answerIdFor(q10, 'pretty-healthy-girl'),
    };
    const scores = computeScores(QUESTIONS, answers);
    expect(scores['pretty-healthy-girl']).toBe(2 + 2 + 3);
  });
});

// --- every archetype can win primary and appear as secondary --------------

describe('every archetype can become the primary result', () => {
  for (const archetype of ARCHETYPE_IDS) {
    it(`${archetype} wins primary when it dominates the answers`, () => {
      const answers = answerRunFor(archetype);
      // give q13 rank1 to this archetype too, for a clean, undisputed win
      answers[q13.id] = { rank1: answerIdFor(q13, archetype), rank2: answerIdFor(q13, otherThan(archetype)) };
      const scores = computeScores(QUESTIONS, answers);
      const result = resolveResult(scores);
      expect(result.primary).toBe(archetype);
    });
  }
});

describe('every archetype can become the secondary result', () => {
  for (const primary of ARCHETYPE_IDS) {
    for (const secondary of ARCHETYPE_IDS) {
      if (primary === secondary) continue;

      it(`${secondary} is secondary when ${primary} is primary`, () => {
        const answers: QuizAnswers = {};
        // primary answers q1-q10 (9*2 + 3 = 21 points)
        const primaryQs = QUESTIONS.slice(0, 10);
        for (const q of primaryQs) {
          if (q.type === 'single') answers[q.id] = answerIdFor(q, primary);
        }
        // secondary answers q11, q12 (3 + 3 = 6 points)
        answers[q11.id] = answerIdFor(q11, secondary);
        answers[q12.id] = answerIdFor(q12, secondary);
        // q13: primary rank1 (+4 => 25 total), secondary rank2 (+2 => 8 total)
        answers[q13.id] = { rank1: answerIdFor(q13, primary), rank2: answerIdFor(q13, secondary) };

        const scores = computeScores(QUESTIONS, answers);
        const result = resolveResult(scores);
        expect(result.primary).toBe(primary);
        expect(result.secondary).toBe(secondary);
      });
    }
  }
});

function otherThan(archetype: ArchetypeId): ArchetypeId {
  return ARCHETYPE_IDS.find((id) => id !== archetype)!;
}

// --- tie-breaking ----------------------------------------------------------

describe('tie-breaking', () => {
  it('reports a primary tie and resolves it once a choice is supplied', () => {
    const scores = zeroScores();
    scores['saved-workout-collector'] = 10;
    scores['pilates-princess'] = 10;
    scores['comfortable-lifter'] = 3;

    const initial = resolveResult(scores);
    expect(initial.needsPrimaryTiebreak).toBe(true);
    expect(initial.primaryTiedCandidates.sort()).toEqual(['pilates-princess', 'saved-workout-collector'].sort());
    expect(initial.primary).toBeNull();

    const resolved = resolveResult(scores, 'pilates-princess');
    expect(resolved.primary).toBe('pilates-princess');
    expect(resolved.needsPrimaryTiebreak).toBe(false);
    // secondary should fall out naturally from the remaining scores
    expect(resolved.secondary).toBe('saved-workout-collector');
  });

  it('reports a secondary tie once primary is clear, and resolves it once a choice is supplied', () => {
    const scores = zeroScores();
    scores['perfect-plan-chaser'] = 20;
    scores['fresh-start-frequent-flyer'] = 8;
    scores['pretty-healthy-girl'] = 8;

    const initial = resolveResult(scores);
    expect(initial.primary).toBe('perfect-plan-chaser');
    expect(initial.needsSecondaryTiebreak).toBe(true);
    expect(initial.secondaryTiedCandidates.sort()).toEqual(
      ['fresh-start-frequent-flyer', 'pretty-healthy-girl'].sort()
    );

    const resolved = resolveResult(scores, undefined, 'pretty-healthy-girl');
    expect(resolved.primary).toBe('perfect-plan-chaser');
    expect(resolved.secondary).toBe('pretty-healthy-girl');
    expect(resolved.needsSecondaryTiebreak).toBe(false);
  });

  it('handles a three-way primary tie and re-derives secondary from the losers', () => {
    const scores = zeroScores();
    scores['saved-workout-collector'] = 15;
    scores['pilates-princess'] = 15;
    scores['comfortable-lifter'] = 15;

    const initial = resolveResult(scores);
    expect(initial.needsPrimaryTiebreak).toBe(true);
    expect(initial.primaryTiedCandidates.sort()).toEqual(
      ['comfortable-lifter', 'pilates-princess', 'saved-workout-collector'].sort()
    );

    // once the taker picks a primary, the other two are still tied at 15 for secondary
    const afterPrimary = resolveResult(scores, 'comfortable-lifter');
    expect(afterPrimary.primary).toBe('comfortable-lifter');
    expect(afterPrimary.needsSecondaryTiebreak).toBe(true);
    expect(afterPrimary.secondaryTiedCandidates.sort()).toEqual(
      ['pilates-princess', 'saved-workout-collector'].sort()
    );

    const final = resolveResult(scores, 'comfortable-lifter', 'saved-workout-collector');
    expect(final.primary).toBe('comfortable-lifter');
    expect(final.secondary).toBe('saved-workout-collector');
  });

  it('ignores a tiebreak choice that is not actually among the tied candidates', () => {
    const scores = zeroScores();
    scores['saved-workout-collector'] = 10;
    scores['pilates-princess'] = 10;
    scores['comfortable-lifter'] = 3;

    // 'comfortable-lifter' isn't tied for first, so this should still ask for a tiebreak
    const result = resolveResult(scores, 'comfortable-lifter');
    expect(result.needsPrimaryTiebreak).toBe(true);
    expect(result.primary).toBeNull();
  });
});

// --- shuffle invariance -----------------------------------------------------

describe('shuffling never changes scoring', () => {
  it('shuffle() returns a permutation of the same elements', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const shuffled = shuffle(input, mulberry32(42));
    expect(shuffled).not.toBe(input); // new array
    expect(shuffled.slice().sort()).toEqual(input.slice().sort());
    expect(shuffled).toHaveLength(input.length);
  });

  it('does not mutate the original array', () => {
    const input = [1, 2, 3, 4, 5];
    const copy = input.slice();
    shuffle(input, mulberry32(1));
    expect(input).toEqual(copy);
  });

  it('produces identical scores for the same selected answer IDs regardless of answer display order', () => {
    const archetype: ArchetypeId = 'fresh-start-frequent-flyer';
    const answers = answerRunFor(archetype);

    const baseline = computeScores(QUESTIONS, answers);

    // Shuffle every question's answer array (a deep-cloned copy) and recompute —
    // selection is by stable answer ID, never by position, so this must match.
    const shuffledQuestions: QuizQuestion[] = QUESTIONS.map((q, i) => ({
      ...q,
      answers: shuffle(q.answers, mulberry32(100 + i)),
    })) as QuizQuestion[];

    const afterShuffle = computeScores(shuffledQuestions, answers);
    expect(afterShuffle).toEqual(baseline);

    const resultBaseline = resolveResult(baseline);
    const resultAfterShuffle = resolveResult(afterShuffle);
    expect(resultAfterShuffle).toEqual(resultBaseline);
  });
});

// deterministic seeded RNG so shuffle tests are reproducible
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- missing / malformed data -----------------------------------------------

describe('missing or malformed answers', () => {
  it('returns all zeros for an empty answers map', () => {
    const scores = computeScores(QUESTIONS, {});
    for (const id of ARCHETYPE_IDS) expect(scores[id]).toBe(0);
  });

  it('ignores an answer ID that does not exist on the question', () => {
    const answers: QuizAnswers = { [q1.id]: 'not-a-real-answer-id' };
    const scores = computeScores(QUESTIONS, answers);
    for (const id of ARCHETYPE_IDS) expect(scores[id]).toBe(0);
  });

  it('ignores a ranked answer where rank1 and rank2 are the same', () => {
    const sameId = answerIdFor(q13, 'saved-workout-collector');
    const answers: QuizAnswers = { [q13.id]: { rank1: sameId, rank2: sameId } };
    const scores = computeScores(QUESTIONS, answers);
    expect(scores['saved-workout-collector']).toBe(0);
  });

  it('ignores a ranked answer missing rank2', () => {
    // Intentionally malformed (missing rank2) to prove computeScores guards against it at runtime.
    const answers = {
      [q13.id]: { rank1: answerIdFor(q13, 'comfortable-lifter') },
    } as unknown as QuizAnswers;
    const scores = computeScores(QUESTIONS, answers);
    expect(scores['comfortable-lifter']).toBe(0);
  });

  it('only scores questions that were actually answered (partial completion)', () => {
    const answers: QuizAnswers = { [q1.id]: answerIdFor(q1, 'perfect-plan-chaser') };
    const scores = computeScores(QUESTIONS, answers);
    expect(scores['perfect-plan-chaser']).toBe(2);
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    expect(total).toBe(2);
  });

  it('changing a previous answer replaces its points rather than adding to them', () => {
    const answers: QuizAnswers = { [q1.id]: answerIdFor(q1, 'saved-workout-collector') };
    const first = computeScores(QUESTIONS, answers);
    expect(first['saved-workout-collector']).toBe(2);

    // she goes back and changes her answer to Q1
    answers[q1.id] = answerIdFor(q1, 'comfortable-lifter');
    const second = computeScores(QUESTIONS, answers);
    expect(second['saved-workout-collector']).toBe(0);
    expect(second['comfortable-lifter']).toBe(2);
  });
});

// --- getTiedTop --------------------------------------------------------------

describe('getTiedTop', () => {
  it('returns a single archetype when there is a clear leader', () => {
    const scores = zeroScores();
    scores['comfortable-lifter'] = 5;
    expect(getTiedTop(scores)).toEqual(['comfortable-lifter']);
  });

  it('excludes archetypes passed in `excluding`', () => {
    const scores = zeroScores();
    scores['comfortable-lifter'] = 5;
    scores['pilates-princess'] = 3;
    expect(getTiedTop(scores, ['comfortable-lifter'])).toEqual(['pilates-princess']);
  });
});
