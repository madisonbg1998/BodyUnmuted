import { ARCHETYPE_IDS } from './types';
import type { ArchetypeId, ArchetypeScores, QuizAnswers, QuizQuestion } from './types';

/**
 * Pure, stateless scoring. Always recomputes every archetype's total from the
 * full set of answers rather than incrementally mutating a running total —
 * that way, changing a previous answer is just "update the map entry and
 * recompute," with no risk of stale points lingering from an old selection.
 */
export function computeScores(questions: QuizQuestion[], answers: QuizAnswers): ArchetypeScores {
  const scores = zeroScores();

  for (const question of questions) {
    const value = answers[question.id];
    if (value === undefined) continue;

    if (question.type === 'single') {
      if (typeof value !== 'string') continue;
      const option = question.answers.find((a) => a.id === value);
      if (option) scores[option.archetype] += question.points;
    } else {
      if (typeof value !== 'object' || value === null) continue;
      const { rank1, rank2 } = value;
      if (!rank1 || !rank2 || rank1 === rank2) continue;
      const option1 = question.answers.find((a) => a.id === rank1);
      const option2 = question.answers.find((a) => a.id === rank2);
      if (option1) scores[option1.archetype] += question.rank1Points;
      if (option2) scores[option2.archetype] += question.rank2Points;
    }
  }

  return scores;
}

export function zeroScores(): ArchetypeScores {
  return ARCHETYPE_IDS.reduce((acc, id) => {
    acc[id] = 0;
    return acc;
  }, {} as ArchetypeScores);
}

/** All archetypes (excluding any in `excluding`) tied for the highest score among them. */
export function getTiedTop(scores: ArchetypeScores, excluding: ArchetypeId[] = []): ArchetypeId[] {
  const candidates = ARCHETYPE_IDS.filter((id) => !excluding.includes(id));
  const max = Math.max(...candidates.map((id) => scores[id]));
  return candidates.filter((id) => scores[id] === max);
}

export interface ResultResolution {
  primary: ArchetypeId | null;
  secondary: ArchetypeId | null;
  needsPrimaryTiebreak: boolean;
  primaryTiedCandidates: ArchetypeId[];
  needsSecondaryTiebreak: boolean;
  secondaryTiedCandidates: ArchetypeId[];
}

/**
 * Resolves primary + secondary from scores, deterministically.
 *
 * Never guesses at a tie: if the top (or, after primary is settled, the
 * next-highest) score is shared by more than one archetype, this returns
 * `needs*Tiebreak: true` with the tied candidates so the UI can show an
 * explicit tiebreak screen and the caller can re-invoke this function with
 * the user's choice.
 */
export function resolveResult(
  scores: ArchetypeScores,
  primaryTiebreakChoice?: ArchetypeId,
  secondaryTiebreakChoice?: ArchetypeId
): ResultResolution {
  const topTied = getTiedTop(scores);

  let primary: ArchetypeId;
  if (topTied.length === 1) {
    primary = topTied[0];
  } else if (primaryTiebreakChoice && topTied.includes(primaryTiebreakChoice)) {
    primary = primaryTiebreakChoice;
  } else {
    return {
      primary: null,
      secondary: null,
      needsPrimaryTiebreak: true,
      primaryTiedCandidates: topTied,
      needsSecondaryTiebreak: false,
      secondaryTiedCandidates: [],
    };
  }

  const secondTied = getTiedTop(scores, [primary]);

  let secondary: ArchetypeId;
  if (secondTied.length === 1) {
    secondary = secondTied[0];
  } else if (secondaryTiebreakChoice && secondTied.includes(secondaryTiebreakChoice)) {
    secondary = secondaryTiebreakChoice;
  } else {
    return {
      primary,
      secondary: null,
      needsPrimaryTiebreak: false,
      primaryTiedCandidates: [],
      needsSecondaryTiebreak: true,
      secondaryTiedCandidates: secondTied,
    };
  }

  return {
    primary,
    secondary,
    needsPrimaryTiebreak: false,
    primaryTiedCandidates: [],
    needsSecondaryTiebreak: false,
    secondaryTiedCandidates: [],
  };
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
