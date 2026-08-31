import type { FfaQuestion } from './types';

/**
 * ============================================================================
 * THE FREEDOM FITNESS AUDIT — content
 * ============================================================================
 * Every string in this file is content, not logic. To edit copy, edit here —
 * nothing in components/ffa/* or app/lib/ffa/*.ts (besides this file) should
 * ever need to change to update wording. See README.md for the full content
 * editing guide.
 *
 * Bump QUIZ_VERSION whenever a question, answer mapping, or scoring rule
 * changes — it invalidates any in-progress quiz stored in a visitor's
 * localStorage from before the change, instead of silently resuming her into
 * a session with content that no longer matches.
 * ============================================================================
 */
// Bumped from ffa-1 after removing the Q6 goal question — discards any
// in-progress quiz stored before this change instead of resuming into
// mismatched content.
export const QUIZ_VERSION = 'ffa-2';

export const TOTAL_QUESTIONS = 11;

// --- landing page -------------------------------------------------------

export const LANDING_EYEBROW = 'The Freedom Fitness Audit';

export const LANDING_HEADLINE = 'Why does your fitness keep falling apart every time life changes?';

export type LandingBlockVariant = 'lead' | 'punch' | 'aside' | 'connector' | 'quote';

export interface LandingBlock {
  text: string;
  /** Visual treatment hint for the landing page — see components/ffa/FfaLanding.tsx.
   * Omitted = a regular body paragraph. */
  variant?: LandingBlockVariant;
  /** Which alternating-background band this block renders in (1-5) — see
   * components/ffa/FfaLanding.tsx. */
  section: 1 | 2 | 3 | 4 | 5;
}

export const LANDING_BODY: LandingBlock[] = [
  {
    text: 'Take the two-minute audit to find out what is actually interrupting your progress—and how to build the body you want without needing your business, travel plans, social life, energy, and general personhood to stop being so inconvenient.',
    variant: 'lead',
    section: 1,
  },
  { text: 'You are capable of being consistent.', variant: 'punch', section: 2 },
  { text: 'You have probably proven that in approximately 847 other parts of your life.', variant: 'aside', section: 2 },
  {
    text: 'You have built a business. Made decisions with incomplete information. Replied calmly to an email that absolutely did not deserve your calm. Possibly moved countries with two suitcases and a vague plan.',
    section: 2,
  },
  {
    text: 'And yet, two missed workouts can somehow make you feel like a woman who has never followed through on anything in her life.',
    variant: 'punch',
    section: 2,
  },
  {
    text: 'So if your fitness keeps disappearing the moment work gets busy, you travel, your energy changes, or life stops politely following the plan, the question may not be:',
    variant: 'connector',
    section: 3,
  },
  { text: '“Why can\'t I stick to anything?”', variant: 'quote', section: 3 },
  { text: 'It might be:', variant: 'connector', section: 3 },
  { text: '“Why does my approach only work when life stays predictable?”', variant: 'quote', section: 3 },
  {
    text: 'The Freedom Fitness Audit will help you see the pattern underneath all the stopping, restarting, pushing, researching, and promising yourself that next week will be different.',
    variant: 'punch',
    section: 4,
  },
  {
    text: 'No result will tell you to want less from your life, wake up at 5 a.m., or spend Sunday putting chicken into seven identical containers.',
    section: 4,
  },
  { text: 'Promise.', variant: 'punch', section: 4 },
];

export const LANDING_BUTTON = 'Find my freedom pattern';

export const LANDING_MICROCOPY = '2 minutes • 11 questions • One eerily specific result';

export const PRE_QUIZ_INSTRUCTIONS = [
  'Choose the answer that most closely reflects what you actually do—not what you think you should do.',
  'There are no good or bad answers. Choose the response that feels most familiar, even if more than one could apply.',
];

// --- questions ------------------------------------------------------------
// IDs are stable and never change once content ships — scoring, storage,
// analytics, and tests all bind to these, never to display position.

export const QUESTIONS: FfaQuestion[] = [
  {
    id: 'q1',
    number: 1,
    kind: 'scored',
    prompt: 'Your week becomes much busier than expected. What usually happens to your fitness?',
    answers: [
      { id: 'q1-a', text: 'I struggle to make the original plan fit, so workouts or nutrition often fall away.', result: 'A' },
      { id: 'q1-b', text: 'Once I miss a few things, the week feels off track and I wait for a clean restart.', result: 'B' },
      { id: 'q1-c', text: 'I keep pushing through the plan, even when my energy or stress suggests I need to adjust.', result: 'C' },
      { id: 'q1-d', text: 'I try to adjust, but I am unsure which parts matter most and what I can safely change.', result: 'D' },
    ],
  },
  {
    id: 'q2',
    number: 2,
    kind: 'scored',
    prompt: 'You arrive at a gym with unfamiliar equipment. What is your most likely reaction?',
    answers: [
      { id: 'q2-a', text: 'I find it difficult to follow the workout when the exact equipment is unavailable.', result: 'A' },
      { id: 'q2-b', text: 'I am tempted to treat the trip as a break and resume properly when I get home.', result: 'B' },
      { id: 'q2-c', text: 'I create a hard workout so I still feel as if I have done enough.', result: 'C' },
      { id: 'q2-d', text: 'I make substitutions, but question whether they are equally effective.', result: 'D' },
    ],
  },
  {
    id: 'q3',
    number: 3,
    kind: 'scored',
    prompt: 'The scale rises unexpectedly. What happens next?',
    answers: [
      { id: 'q3-b', text: 'I tighten my food or exercise for a few days so I can feel back in control.', result: 'B' },
      { id: 'q3-a', text: 'I wonder whether my routine has stopped working because my circumstances have changed.', result: 'A' },
      { id: 'q3-c', text: 'I ignore the concern and keep following the plan, even if I feel tired, hungry, or stressed.', result: 'C' },
      { id: 'q3-d', text: 'I know several factors could explain it, but I cannot tell which explanation applies.', result: 'D' },
    ],
  },
  {
    id: 'q4',
    number: 4,
    kind: 'scored',
    prompt: 'Which statement sounds most like your relationship with consistency?',
    answers: [
      { id: 'q4-a', text: 'I am consistent when my schedule, routine, and environment remain relatively stable.', result: 'A' },
      { id: 'q4-b', text: 'I am usually following the plan properly or trying to get back to following it properly.', result: 'B' },
      { id: 'q4-c', text: 'I can stay consistent long after my body has started showing signs that something needs attention.', result: 'C' },
      { id: 'q4-d', text: 'I can complete the actions, but I am not always confident they are the right actions for me.', result: 'D' },
    ],
  },
  {
    id: 'q5',
    number: 5,
    kind: 'scored',
    prompt: 'When your energy drops for several days, what do you tend to do?',
    answers: [
      { id: 'q5-a', text: 'Wait for my normal schedule or circumstances to return before rebuilding my rhythm.', result: 'A' },
      { id: 'q5-b', text: 'Feel as if I have lost momentum and need to start fresh.', result: 'B' },
      { id: 'q5-c', text: 'Continue as planned unless my energy becomes too low to ignore.', result: 'C' },
      { id: 'q5-d', text: 'Consider several possible changes, but feel unsure which one would actually help.', result: 'D' },
    ],
  },
  {
    id: 'q7',
    number: 6,
    kind: 'scored',
    prompt: 'You have three dinners, an event, or a weekend away coming up. What thought appears first?',
    answers: [
      { id: 'q7-a', text: 'My normal nutrition routine will not work, so my progress may have to pause.', result: 'A' },
      { id: 'q7-b', text: 'I will enjoy it now and become more focused again afterward.', result: 'B' },
      { id: 'q7-c', text: 'I will try to stay as controlled as possible, even if that makes the experience less enjoyable.', result: 'C' },
      { id: 'q7-d', text: 'I know flexibility is possible, but I am unsure how to make the tradeoffs confidently.', result: 'D' },
    ],
  },
  {
    id: 'q8',
    number: 7,
    kind: 'scored',
    prompt: 'How do you decide that a workout was effective?',
    answers: [
      { id: 'q8-a', text: 'I completed the workout exactly as it was written.', result: 'A' },
      { id: 'q8-b', text: 'Completing it made me feel as if I was finally back on track.', result: 'B' },
      { id: 'q8-c', text: 'I worked hard and did not let myself ease off.', result: 'C' },
      { id: 'q8-d', text: 'I followed the sets and reps, but I am not always sure what productive effort should feel like.', result: 'D' },
    ],
  },
  {
    id: 'q9',
    number: 8,
    kind: 'scored',
    prompt: 'You miss two workouts and eat differently than planned for several days. What are you most likely to do next?',
    answers: [
      { id: 'q9-a', text: 'Try to recreate my normal routine, even if it does not fit my current schedule very well.', result: 'A' },
      { id: 'q9-b', text: 'Decide the week is already off track and plan to begin again next week.', result: 'B' },
      { id: 'q9-c', text: 'Try to make up for it by training harder, eating less, or being more disciplined.', result: 'C' },
      { id: 'q9-d', text: 'Look at what happened, but feel unsure whether anything in the plan actually needs to change.', result: 'D' },
    ],
  },
  {
    id: 'q10',
    number: 9,
    kind: 'scored',
    prompt: 'When you receive a new fitness plan, what gives you the most confidence?',
    answers: [
      { id: 'q10-a', text: 'Knowing it includes options for different schedules, locations, and equipment.', result: 'A' },
      { id: 'q10-b', text: 'Knowing one difficult week or unplanned meal cannot undo the process.', result: 'B' },
      { id: 'q10-c', text: 'Knowing it accounts for my energy, stress, hunger, and recovery.', result: 'C' },
      { id: 'q10-d', text: 'Understanding why each part is included and what evidence would justify changing it.', result: 'D' },
    ],
  },
  {
    id: 'q11',
    number: 10,
    kind: 'scored',
    prompt: 'What is most likely to make you abandon an approach that had been working?',
    answers: [
      { id: 'q11-a', text: 'My life changes and the plan no longer fits.', result: 'A' },
      { id: 'q11-b', text: 'I stop following it perfectly and feel as if I have lost the momentum.', result: 'B' },
      { id: 'q11-c', text: 'I become exhausted, disconnected, or resentful of how much the approach asks from me.', result: 'C' },
      { id: 'q11-d', text: 'My progress slows and I cannot confidently decide what to change.', result: 'D' },
    ],
  },
  {
    id: 'q12',
    number: 11,
    kind: 'scored',
    prompt: 'Six months from now, what would feel most freeing?',
    answers: [
      { id: 'q12-a', text: 'Being able to travel or enter a busy season without losing my fitness.', result: 'A' },
      { id: 'q12-b', text: 'No longer feeling as if I have to start over after an imperfect week.', result: 'B' },
      { id: 'q12-c', text: 'Knowing when to push toward my goals and when my body genuinely needs something different.', result: 'C' },
      { id: 'q12-d', text: 'Understanding my body well enough to make confident decisions when something changes.', result: 'D' },
    ],
  },
];

/**
 * Deterministic tie-break priority. When the top (or, once primary is
 * settled, the runner-up) score is shared by more than one result type,
 * scoring.ts looks at what she answered on q12, then q9, then q4 — the
 * first of these whose answer belongs to the tied set wins. See
 * app/lib/ffa/scoring.ts for the full resolution algorithm and its
 * deterministic (never random) final fallback.
 */
export const TIEBREAK_QUESTION_ORDER = ['q12', 'q9', 'q4'] as const;

// --- end-of-quiz popup ------------------------------------------------------

export const POPUP_HEADING = 'Your result is ready.';

export const POPUP_BODY = [
  'Enter your name and email to reveal your Freedom Fitness type.',
  'You will see your type immediately. The full email report will be connected in the next phase.',
];

export const POPUP_BUTTON = 'Reveal my type';

/**
 * Placeholder only — do not treat this as approved legal copy. Replace with
 * reviewed consent language before the real LeadCaptureAdapter ships.
 */
export const POPUP_CONSENT_LABEL_PLACEHOLDER =
  '[Consent copy pending legal review] I agree to receive my result and related emails from Body Unmuted.';

export const POPUP_DEV_NOTICE = 'Preview mode: this form does not save your information or send an email yet.';

export const POPUP_REOPEN_BUTTON = 'See my result';

// --- results ----------------------------------------------------------------

export const RESULT_EYEBROW = 'Your Freedom Fitness type is…';

export const RESULT_DEV_NOTICE = 'Your type reveal is working. Email delivery will be connected separately before launch.';

export interface ResultContent {
  id: 'A' | 'B' | 'C' | 'D';
  name: string;
  body: string;
}

export const RESULTS: Record<'A' | 'B' | 'C' | 'D', ResultContent> = {
  A: {
    id: 'A',
    name: 'The “This Worked Until Life Happened” Plan',
    body: 'You are not bad at consistency. Your routine may simply depend on circumstances your real life cannot promise to provide.\n\nThe full report will eventually explain why this pattern keeps appearing, what it may have been making you assume about yourself, and how to build fitness that can change shape without disappearing.',
  },
  B: {
    id: 'B',
    name: 'The Monday Morning Rebrand',
    body: 'You do not struggle to commit. You may simply have been taught how to begin perfectly—not how to continue imperfectly.\n\nThe full report will eventually explain why one disrupted week can feel so final and how to stop needing a new beginning every time life gets involved.',
  },
  C: {
    id: 'C',
    name: 'The “I\'m Fine” Founder',
    body: 'You can push through almost anything. The question is whether pushing has become the only response you fully trust.\n\nThe full report will eventually explain how to keep pursuing ambitious physical goals while learning when to push, when to respond, and how to trust the difference.',
  },
  D: {
    id: 'D',
    name: 'The 47-Tab Fitness Spiral',
    body: 'You do not need more information. You need enough context to know which information belongs to your body.\n\nThe full report will eventually explain why knowing more has not necessarily created more confidence—and how to make decisions without searching for one more answer.',
  },
};
