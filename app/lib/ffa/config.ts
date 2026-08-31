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
// Bumped from ffa-2 after rewriting every question/answer around the
// founder-specific outcomes (life_happened / monday_rebrand /
// im_fine_founder / tab_spiral) — discards any in-progress quiz stored
// before this change instead of resuming into mismatched content.
export const QUIZ_VERSION = 'ffa-3';

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

// Answer `result` is the hidden outcome id, expressed as a ResultType letter
// rather than the raw outcome-id string — it is never rendered to the quiz
// taker (see components/ffa/*), only used by scoring.ts. Letter mapping:
// A = life_happened, B = monday_rebrand, C = im_fine_founder, D = tab_spiral.
export const QUESTIONS: FfaQuestion[] = [
  {
    id: 'q1',
    number: 1,
    kind: 'scored',
    prompt: 'Your week becomes much busier than expected. What usually happens to your fitness?',
    answers: [
      { id: 'q1-a', text: 'I try to make the original routine fit, but it becomes difficult when my schedule changes.', result: 'A' },
      { id: 'q1-b', text: 'Once I miss a few things, the week feels off track and I wait for a clean restart.', result: 'B' },
      { id: 'q1-c', text: 'I handle whatever feels most urgent and tell myself I’ll focus on fitness when work calms down.', result: 'C' },
      { id: 'q1-d', text: 'I consider several ways to adjust, but I’m not sure which option will still get me the result I want.', result: 'D' },
    ],
  },
  {
    id: 'q2',
    number: 2,
    kind: 'scored',
    prompt: 'You’re traveling for work and the gym has unfamiliar or limited equipment. What is your most likely reaction?',
    answers: [
      { id: 'q2-a', text: 'I struggle to follow the workout when the setup I normally use isn’t available.', result: 'A' },
      { id: 'q2-b', text: 'The trip starts to feel like a break from my routine, and I plan to resume properly when I get home.', result: 'B' },
      { id: 'q2-c', text: 'Between work and travel, the workout becomes the easiest thing to remove from the day.', result: 'C' },
      { id: 'q2-d', text: 'I make substitutions, but spend the workout wondering whether they’re equally effective.', result: 'D' },
    ],
  },
  {
    id: 'q3',
    number: 3,
    kind: 'scored',
    prompt: 'Your progress slows during a month when your schedule or routine has changed. What happens next?',
    answers: [
      { id: 'q3-a', text: 'I try to recreate the routine that was working before, even if it no longer fits particularly well.', result: 'A' },
      { id: 'q3-b', text: 'I feel like I’ve fallen off and start thinking about a stricter reset.', result: 'B' },
      { id: 'q3-c', text: 'I decide this probably isn’t the best month to focus on my body and move the goal to later.', result: 'C' },
      { id: 'q3-d', text: 'I review every possible explanation but struggle to decide which variable actually needs to change.', result: 'D' },
    ],
  },
  {
    id: 'q4',
    number: 4,
    kind: 'scored',
    prompt: 'Which statement sounds most like your relationship with consistency?',
    answers: [
      { id: 'q4-a', text: 'I’m consistent when my schedule, environment, and routine remain fairly stable.', result: 'A' },
      { id: 'q4-b', text: 'I’m usually following the plan properly or trying to get back to following it properly.', result: 'B' },
      { id: 'q4-c', text: 'I’m very consistent with the things other people rely on me for. Fitness is what moves when my calendar fills up.', result: 'C' },
      { id: 'q4-d', text: 'I can complete the actions, but I often second-guess whether they’re the right actions for me.', result: 'D' },
    ],
  },
  {
    id: 'q5',
    number: 5,
    kind: 'scored',
    prompt: 'Your energy has been lower than usual for several days. What do you tend to do?',
    answers: [
      { id: 'q5-a', text: 'I struggle to modify my usual routine and wait for my energy and schedule to feel normal again.', result: 'A' },
      { id: 'q5-b', text: 'A few low-energy days make me feel like I’ve lost momentum and need a fresh start.', result: 'B' },
      { id: 'q5-c', text: 'I use the energy I have for work and let fitness wait until I have more capacity.', result: 'C' },
      { id: 'q5-d', text: 'I start considering sleep, food, training, stress, hormones, and several other possibilities without knowing which one deserves my attention.', result: 'D' },
    ],
  },
  {
    id: 'q7',
    number: 6,
    kind: 'scored',
    prompt: 'You have several dinners, an event, or a weekend away coming up. What thought appears first?',
    answers: [
      { id: 'q7-a', text: 'I start trying to recreate the meals I normally eat because I’m not sure how to make progress without them.', result: 'A' },
      { id: 'q7-b', text: 'I mentally write off those days and decide I’ll become focused again afterward.', result: 'B' },
      { id: 'q7-c', text: 'I have too much else to think about that week, so nutrition becomes something I’ll deal with later.', result: 'C' },
      { id: 'q7-d', text: 'I start researching menus, tracking strategies, and different ways to handle it, but still don’t feel sure what to do.', result: 'D' },
    ],
  },
  {
    id: 'q8',
    number: 7,
    kind: 'scored',
    prompt: 'How do you usually decide that a workout was effective?',
    answers: [
      { id: 'q8-a', text: 'I completed it the way it was originally written.', result: 'A' },
      { id: 'q8-b', text: 'Finishing it made me feel like I was properly back in my routine.', result: 'B' },
      { id: 'q8-c', text: 'I managed to fit it into a day when work could easily have taken the time.', result: 'C' },
      { id: 'q8-d', text: 'I followed the sets and reps, but I’m not always sure whether the effort was productive for my goal.', result: 'D' },
    ],
  },
  {
    id: 'q9',
    number: 8,
    kind: 'scored',
    prompt: 'You miss two workouts and eat differently than planned for several days. What are you most likely to do next?',
    answers: [
      { id: 'q9-a', text: 'I try to recreate my normal routine, even when it doesn’t fit my current schedule very well.', result: 'A' },
      { id: 'q9-b', text: 'I decide the week is already off track and plan to begin again next week.', result: 'B' },
      { id: 'q9-c', text: 'I focus on everything work needs from me and tell myself I’ll return to my body goal when things settle down.', result: 'C' },
      { id: 'q9-d', text: 'I look at what happened but feel unsure whether the plan needs to change or I simply need more time.', result: 'D' },
    ],
  },
  {
    id: 'q10',
    number: 9,
    kind: 'scored',
    prompt: 'When you receive a new fitness plan, what gives you the most confidence?',
    answers: [
      { id: 'q10-a', text: 'Knowing it includes options for different schedules, locations, and equipment.', result: 'A' },
      { id: 'q10-b', text: 'Knowing exactly how to continue after a missed workout, unexpected meal, or imperfect week.', result: 'B' },
      { id: 'q10-c', text: 'Knowing it was built around my real workload and won’t disappear every time work becomes demanding.', result: 'C' },
      { id: 'q10-d', text: 'Understanding why each part is included and what information would justify changing it.', result: 'D' },
    ],
  },
  {
    id: 'q11',
    number: 10,
    kind: 'scored',
    prompt: 'What is most likely to make you abandon an approach that had been working?',
    answers: [
      { id: 'q11-a', text: 'My life changes and the plan no longer fits.', result: 'A' },
      { id: 'q11-b', text: 'I stop following it properly and feel like I’ve lost the momentum.', result: 'B' },
      { id: 'q11-c', text: 'Work becomes demanding and fitness starts feeling like something I can deal with later.', result: 'C' },
      { id: 'q11-d', text: 'My progress slows and I can’t confidently decide what to change.', result: 'D' },
    ],
  },
  {
    id: 'q12',
    number: 11,
    kind: 'scored',
    prompt: 'Six months from now, what would feel most freeing?',
    answers: [
      { id: 'q12-a', text: 'Being able to travel or enter a busy period without losing my fitness.', result: 'A' },
      { id: 'q12-b', text: 'No longer feeling like I have to start over after an imperfect week.', result: 'B' },
      { id: 'q12-c', text: 'Having built a body I feel incredible in without waiting for my business to become less demanding.', result: 'C' },
      { id: 'q12-d', text: 'Understanding my body well enough to make a confident decision whenever something changes.', result: 'D' },
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
