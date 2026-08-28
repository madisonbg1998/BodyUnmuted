import type { ArchetypeContent, ArchetypeId, QuizQuestion } from './types';

/**
 * ============================================================================
 * QUIZ CONTENT — the one file to edit
 * ============================================================================
 * Everything about the quiz — title, description, questions, answers, point
 * values, archetype result copy, and tiebreak copy — lives here. None of it
 * is duplicated in the scoring engine or the UI components; they all read
 * from this file. Bump QUIZ_VERSION whenever you change questions or scoring
 * so old in-progress/stored quiz attempts don't get misread against new
 * logic.
 * ============================================================================
 */

export const QUIZ_VERSION = 'v1';

export const QUIZ_TITLE = 'What’s Your Body Transformation Blind Spot?';

export const QUIZ_DESCRIPTION =
  'Women struggling to transform their bodies tend to fall into one of six archetypes—and most of us have a second one quietly making the first worse. Take the quiz to uncover your primary body-transformation type, your secondary blind spot, and the smartest next move for your body.';

export const QUIZ_INSTRUCTIONS =
  'You’ll probably recognize yourself in more than one answer—that’s the point.\n\nChoose the one that feels most true for you right now, even if another is a close second. We’ll use the patterns across all your answers to uncover both your primary and secondary blind spots.';

export const SINGLE_SELECT_HELPER_TEXT = 'Choose the answer that feels most true most often.';

/** ------------------------------------------------------------------------
 * Archetype result content
 * ---------------------------------------------------------------------- */

export const ARCHETYPES: Record<ArchetypeId, ArchetypeContent> = {
  'saved-workout-collector': {
    id: 'saved-workout-collector',
    name: 'The Saved-Workout Collector',
    headline: 'You Don’t Need Another Program. You Need a Starting Line.',
    pattern:
      'You’re not undisciplined — you’re over-prepared. You’ve got the bookmarks, the apps, the screenshots, the research. What you don’t have is a single clear path you’ve committed to long enough to see it work.',
    doingWell:
      'You care enough to actually look. You’re not avoiding the problem — you’re circling it, closely, from every angle.',
    blindSpot:
      'More information was never going to be the thing that got you moving. At some point, the search itself became the safest place to stay — because as long as you’re still researching, you can’t fail at starting.',
    whyStalled:
      'Every time you get close to picking one thing, a shinier or “more optimized” option shows up, and the reset button gets hit again. Your body has never gotten the chance to respond to anything, because nothing’s stuck around long enough to ask it to.',
    whatsNext:
      'A specific starting point built for exactly where you are — not the “perfect” program, just the right next one. Enough structure that you’re not guessing, and enough simplicity that starting doesn’t feel like its own research project.',
    secondaryDescription:
      'Even once she’s technically started something else, this pattern shows up as quiet second-guessing — a suspicion that there’s a better way she hasn’t found yet, which makes it harder to fully commit to whatever she is currently doing.',
    nextSteps: [
      'Pick one clear starting point this week — not the best one, the next one — and give it a real, non-negotiable trial period before you’re allowed to compare it to anything else.',
      'Replace “more research” with “one decision” — set a hard cutoff on how much time you spend evaluating before you commit.',
      'Build a simple way to track that you actually started (and stuck with it) — because right now, “did I even begin” is the real data you’re missing.',
    ],
    bridge:
      'You need a clear place to begin and a structured path forward — not one more thing to research. Body Unmuted gives you that starting line, and a way to keep moving instead of re-deciding.',
    tiebreakDescription: 'I don’t have a clear enough path to begin and keep moving forward confidently.',
  },
  'pilates-princess': {
    id: 'pilates-princess',
    name: 'The Pilates Princess',
    headline: 'Your Movement Isn’t the Problem. It Was Never Built for This Goal.',
    pattern:
      'You show up — Pilates, yoga, barre, walking — genuinely consistent, which is rare. But the specific outcome you want — visible strength, a changed shape — was never really what that kind of movement is designed to produce.',
    doingWell:
      'Real, sustained consistency with movement you enjoy. That’s the hardest part for most women, and you’ve already solved it.',
    blindSpot:
      'Loving how you move can quietly become a reason not to add the thing that would actually change your shape — because it feels like betraying what’s working, even though nothing about strength training requires you to give up what you love.',
    whyStalled:
      'Your body has been getting a consistent signal, just not the specific one that builds visible muscle and reshapes composition. Consistency without the right stimulus can look identical to “trying and it’s just not working” — but it’s actually “doing something else entirely, correctly.”',
    whatsNext:
      'Progressive strength training layered on top of what you already do, paired with nutrition that actually matches the goal — not a replacement for your movement, an addition to it.',
    secondaryDescription:
      'As a secondary pattern, this shows up as a reluctance to add real intensity — a preference for movement that feels good over movement that creates the specific adaptation she says she wants, which softens how hard she’s willing to push in whatever her primary approach is.',
    nextSteps: [
      'Keep your movement — it’s not the enemy — but add two structured strength sessions a week aimed specifically at progression, not just effort.',
      'Get honest nutrition guidance that matches your actual goal, not just “eating well” in general.',
      'Track something beyond how a class made you feel — a number that tells you whether your body is actually being asked to change.',
    ],
    bridge:
      'You need progressive strength training and intentional nutrition that complement the movement you already enjoy — not replace it. That’s exactly what Body Unmuted is built to add.',
    tiebreakDescription:
      'I’m moving my body, but my current approach isn’t specific enough to create the physical transformation I want.',
  },
  'comfortable-lifter': {
    id: 'comfortable-lifter',
    name: 'The Comfortable Lifter',
    shortLabel: 'The Same-Weights-Since-Forever Girlie',
    headline: 'You’re Not Under-Trying. You’re Under-Progressing.',
    pattern:
      'You lift. You show up multiple times a week, you know your way around a gym — and somewhere along the way, “showing up” quietly became the whole strategy, instead of a means to an ongoing one.',
    doingWell:
      'You’ve built the habit most people never get to — training is just part of your week, no negotiation required.',
    blindSpot:
      'Your body adapted to your training a while ago, and it hasn’t had a real reason to change since. Effort and progression feel the same from the inside — tired, sore, accomplished — but only one of them actually moves the needle.',
    whyStalled:
      'Doing the same weights and rep ranges indefinitely teaches your body it doesn’t need to do anything new. You can work hard in a session and still ask nothing new of your body across months of sessions — and that gap is exactly where results quietly stall.',
    whatsNext:
      'A way to know, objectively, whether you’re progressing — and a plan that keeps giving your body a reason to keep adapting, instead of a reason to plateau comfortably.',
    secondaryDescription:
      'As a secondary pattern, this shows up as resistance to changing something that “already works” — sticking with familiar numbers and routines even after a primary issue has been addressed, which caps how much further the fix can actually go.',
    nextSteps: [
      'Get a real read on whether your current training is actually progressive — most self-assessments here are wrong.',
      'Build in a structured way to increase demand over time (load, volume, or intensity) instead of repeating what’s familiar.',
      'Pair training with nutrition that supports the specific change you want — training alone won’t finish the job.',
    ],
    bridge:
      'You need intentional programming, measurable progression, and enough intensity to give your body an actual reason to change. Body Unmuted replaces “showing up” with a plan that keeps working.',
    tiebreakDescription: 'I’m strength training, but I’m not giving my body enough progression to keep adapting.',
  },
  'fresh-start-frequent-flyer': {
    id: 'fresh-start-frequent-flyer',
    name: 'The Fresh-Start Frequent Flyer',
    headline: 'Your Consistency Isn’t Broken. It Was Just Built for a Life That Holds Still.',
    pattern:
      'When your schedule and environment stay stable, you’re consistent — genuinely. The problem shows up the moment something changes: travel, a move, a demanding season, a different gym. Then everything stops, and it feels like starting over from zero.',
    doingWell: 'You’re capable of real consistency. That’s not in question — you’ve proven it, under the right conditions.',
    blindSpot:
      'You’ve quietly defined “consistency” as “doing the identical thing in the identical place,” which means anything that changes your environment reads as failure, instead of just a variable your approach was never built to handle.',
    whyStalled:
      'Every reset costs you momentum, and constantly starting over means your body rarely gets the sustained, connected effort it needs to actually transform — even though, added up, you’ve probably put in more total effort than you give yourself credit for.',
    whatsNext:
      'A system built to flex with your actual life — one that assumes travel and disruption are the norm, not the exception, so you stop losing the thread every time something changes.',
    secondaryDescription:
      'As a secondary pattern, this shows up as fragility under disruption — even a well-matched primary plan can quietly fall apart the moment life gets unpredictable, because the underlying system was never built to bend.',
    nextSteps: [
      'Redefine consistency as “staying connected to the goal,” not “doing the exact same routine” — the version that survives real life.',
      'Build a minimum-viable version of your training and nutrition that travels with you, so disruption shrinks your effort instead of erasing it.',
      'Stop waiting for the “next trip” to pass before starting — build the system assuming disruption is coming, because it always is.',
    ],
    bridge:
      'You need a system that can adapt to travel and changing schedules — not another routine that only works when your life stays still. Body Unmuted is built to move with you.',
    tiebreakDescription: 'My approach only feels consistent when my environment and schedule cooperate.',
  },
  'pretty-healthy-girl': {
    id: 'pretty-healthy-girl',
    name: 'The “But I Eat Pretty Healthy” Girl',
    headline: 'Your Food Choices Aren’t the Issue. The Amounts and Intention Are.',
    pattern:
      'You genuinely eat well — real food, regular meals, nothing you’d call “junk.” And you’re still frustrated, because doing the “right” things hasn’t produced the specific physical change you’re after.',
    doingWell:
      'Real, consistent nutritional intention. You’re not the woman living on takeout and guilt — you’re already making thoughtful choices.',
    blindSpot:
      '“Healthy” and “structured for a specific goal” are two different things, and nobody’s ever shown you the difference. You can eat entirely nutritious food and still be meaningfully under- or mis-fueled for what you’re asking your body to do.',
    whyStalled:
      'Without a clear read on amounts, protein, and overall structure, good food choices can plateau exactly where they are — technically healthy, but not aligned with building muscle or reshaping your body. You’ve been optimizing for the wrong variable, even though the variable you picked was a perfectly reasonable one.',
    whatsNext:
      'Real nutritional clarity — not a rigid diet, but an understanding of what your specific goal actually requires, so your good choices finally add up to something.',
    secondaryDescription:
      'As a secondary pattern, this shows up as quiet confidence that nutrition isn’t the problem — which can stall progress even after a primary training issue is fixed, because the food side never gets the same scrutiny.',
    nextSteps: [
      'Get an honest, specific read on whether your current intake actually matches your goal — not a generic “eat clean” check.',
      'Learn the handful of numbers that actually matter for your body (protein especially), instead of relying on food “quality” alone.',
      'Adjust intentionally — not by eating less across the board, but by structuring what you already eat well toward the outcome you want.',
    ],
    bridge:
      'You need nutritional clarity tied to your actual goal — not just more “healthy” food. Body Unmuted helps you close that gap.',
    tiebreakDescription: 'I make healthy choices, but I don’t understand how to align my nutrition with the result I want.',
  },
  'perfect-plan-chaser': {
    id: 'perfect-plan-chaser',
    name: 'The Perfect-Plan Chaser',
    headline: 'You Don’t Need a Better Plan. You Need to Understand the One You’re On.',
    pattern:
      'You’re genuinely good at following instructions — when a plan is clear, you execute. The trouble starts when the plan meets real life: your schedule shifts, your energy dips, your cycle changes — and because you don’t understand the reasoning behind what you’re doing, you don’t know how to adjust. So you assume you’ve failed, and go looking for a new plan instead.',
    doingWell:
      'Real follow-through. When you commit to something structured, you actually do it — that’s a genuine strength, not a small one.',
    blindSpot:
      'You’ve been trained to trust the plan more than your own signals — overriding hunger, fatigue, stress, or your cycle because “the plan says so.” That’s not discipline, it’s a dependency on someone else’s judgment instead of your own.',
    whyStalled:
      'Every plan eventually meets a moment it didn’t anticipate. Without understanding why you’re doing what you’re doing, that moment reads as your failure instead of the plan’s limitation — so you restart, again, with a new expert, a new protocol, and the same missing piece.',
    whatsNext:
      'Not a better plan — body literacy. Enough understanding of your own training and nutrition that you can adjust intelligently when life doesn’t cooperate, instead of abandoning ship.',
    secondaryDescription:
      'As a secondary pattern, this shows up as discomfort with ambiguity — a pull toward rigid rule-following even within a well-matched primary approach, which can override her own signals and stall the self-trust the primary fix is trying to build.',
    nextSteps: [
      'Start asking “why” about your current plan, not just “what” — understanding a rule is what lets you bend it safely.',
      'Practice one small, intentional adjustment based on how you actually feel, instead of following the plan exactly regardless of your signals.',
      'Build a basic understanding of your own training and nutrition data, so the next disruption is a decision instead of a crisis.',
    ],
    bridge:
      'You need body literacy, understanding, and the ability to make confident decisions as your body and life change — not another plan to follow blindly. Body Unmuted is built to teach you that, not just hand you instructions.',
    tiebreakDescription:
      'I can follow instructions, but I don’t yet trust myself to understand and adjust for my own body.',
  },
};

/** ------------------------------------------------------------------------
 * Tiebreak screen copy
 * ---------------------------------------------------------------------- */

export const TIEBREAK_PRIMARY_PROMPT = 'Okay, we need one final gut check…';
export const TIEBREAK_PRIMARY_SUBPROMPT =
  'These patterns are showing up equally strongly. Which one feels more like the thing underneath everything?';

export const TIEBREAK_SECONDARY_PROMPT = 'One more gut check…';
export const TIEBREAK_SECONDARY_SUBPROMPT =
  'These are also showing up equally strongly for your secondary pattern. Which one feels closer to true?';

/** ------------------------------------------------------------------------
 * Questions 1-13
 * ---------------------------------------------------------------------- */

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'single',
    points: 2,
    prompt: 'You decide you’re ready to seriously change your body. What’s most likely to happen next?',
    helperText: SINGLE_SELECT_HELPER_TEXT,
    answers: [
      {
        id: 'q1-saved-workout-collector',
        archetype: 'saved-workout-collector',
        text: 'I open seventeen tabs, save three programs, and spend so long figuring out the best place to begin that I don’t really begin.',
      },
      {
        id: 'q1-pilates-princess',
        archetype: 'pilates-princess',
        text: 'I book a Pilates, barre, or yoga class. Moving my body in a way I enjoy feels like the most obvious place to start.',
      },
      {
        id: 'q1-comfortable-lifter',
        archetype: 'comfortable-lifter',
        text: 'I head back to the gym and return to the exercises and weights I already know.',
      },
      {
        id: 'q1-fresh-start-frequent-flyer',
        archetype: 'fresh-start-frequent-flyer',
        text: 'I look at my calendar, notice a trip or busy season coming, and decide I’ll start properly once life settles down.',
      },
      {
        id: 'q1-pretty-healthy-girl',
        archetype: 'pretty-healthy-girl',
        text: 'I clean up my groceries, order fewer indulgent meals, and start making healthier choices.',
      },
      {
        id: 'q1-perfect-plan-chaser',
        archetype: 'perfect-plan-chaser',
        text: 'I find a detailed plan and commit to following it exactly. If I’m doing this, I want to do it right.',
      },
    ],
  },
  {
    id: 'q2',
    type: 'single',
    points: 2,
    prompt: 'Which best describes your current relationship with exercise?',
    helperText: SINGLE_SELECT_HELPER_TEXT,
    answers: [
      {
        id: 'q2-saved-workout-collector',
        archetype: 'saved-workout-collector',
        text: 'I want a proper routine, but I’m still piecing together what I’m actually supposed to be doing.',
      },
      {
        id: 'q2-pilates-princess',
        archetype: 'pilates-princess',
        text: 'I’m pretty active. I love classes, walking, Pilates, yoga, or movement that makes me feel good.',
      },
      {
        id: 'q2-comfortable-lifter',
        archetype: 'comfortable-lifter',
        text: 'I already lift weights fairly regularly, but my body hasn’t changed as much as I expected.',
      },
      {
        id: 'q2-fresh-start-frequent-flyer',
        archetype: 'fresh-start-frequent-flyer',
        text: 'I’m consistent in bursts. My routine works until my location, schedule, or life changes.',
      },
      {
        id: 'q2-pretty-healthy-girl',
        archetype: 'pretty-healthy-girl',
        text: 'I try to stay active, but I tend to focus more on eating well than following structured training.',
      },
      {
        id: 'q2-perfect-plan-chaser',
        archetype: 'perfect-plan-chaser',
        text: 'I’m either following a specific plan or searching for one that tells me exactly what to do.',
      },
    ],
  },
  {
    id: 'q3',
    type: 'single',
    points: 2,
    prompt: 'Your schedule changes unexpectedly. What usually happens to your fitness routine?',
    helperText: SINGLE_SELECT_HELPER_TEXT,
    answers: [
      {
        id: 'q3-saved-workout-collector',
        archetype: 'saved-workout-collector',
        text: 'I start researching shorter workouts or new plans, but I’m not sure which alternative is actually worth doing.',
      },
      {
        id: 'q3-pilates-princess',
        archetype: 'pilates-princess',
        text: 'I look for a class or an easy form of movement I can fit in wherever I am.',
      },
      {
        id: 'q3-comfortable-lifter',
        archetype: 'comfortable-lifter',
        text: 'I do a condensed version of the exercises I normally do, usually with the weights and format I already know.',
      },
      {
        id: 'q3-fresh-start-frequent-flyer',
        archetype: 'fresh-start-frequent-flyer',
        text: 'The routine mostly disappears. I tell myself I’ll get back to it when things return to normal.',
      },
      {
        id: 'q3-pretty-healthy-girl',
        archetype: 'pretty-healthy-girl',
        text: 'Training becomes less predictable, so I try to compensate by making healthier food choices.',
      },
      {
        id: 'q3-perfect-plan-chaser',
        archetype: 'perfect-plan-chaser',
        text: 'I get frustrated because I can’t follow the plan properly, and doing an imperfect version feels almost pointless.',
      },
    ],
  },
  {
    id: 'q4',
    type: 'single',
    points: 2,
    prompt:
      'You’ve been putting in effort for six weeks, but you can’t see much physical change. What’s your instinct?',
    helperText: SINGLE_SELECT_HELPER_TEXT,
    answers: [
      {
        id: 'q4-saved-workout-collector',
        archetype: 'saved-workout-collector',
        text: 'Find a better workout, program, challenge, or expert. I’m probably missing the right strategy.',
      },
      {
        id: 'q4-pilates-princess',
        archetype: 'pilates-princess',
        text: 'Add another class, more walking, or more movement and hope the extra activity makes the difference.',
      },
      {
        id: 'q4-comfortable-lifter',
        archetype: 'comfortable-lifter',
        text: 'Keep doing what I’m doing. I’m lifting consistently, so surely the results will eventually catch up.',
      },
      {
        id: 'q4-fresh-start-frequent-flyer',
        archetype: 'fresh-start-frequent-flyer',
        text: 'Assume the last few weeks were too disrupted to count and promise myself a cleaner restart.',
      },
      {
        id: 'q4-pretty-healthy-girl',
        archetype: 'pretty-healthy-girl',
        text: 'Tighten up my food by cutting back on treats, restaurant meals, or anything that doesn’t feel “healthy.”',
      },
      {
        id: 'q4-perfect-plan-chaser',
        archetype: 'perfect-plan-chaser',
        text: 'Become stricter with the plan—or replace it with a new one I can follow more perfectly.',
      },
    ],
  },
  {
    id: 'q5',
    type: 'single',
    points: 2,
    prompt: 'Imagine walking into an unfamiliar gym while traveling. What feels most like you?',
    helperText: SINGLE_SELECT_HELPER_TEXT,
    answers: [
      {
        id: 'q5-saved-workout-collector',
        archetype: 'saved-workout-collector',
        text: 'I can see plenty of equipment, but I’m not sure how to turn it into a workout that makes sense.',
      },
      {
        id: 'q5-pilates-princess',
        archetype: 'pilates-princess',
        text: 'I’d honestly rather find a good class where someone guides me and I can enjoy the experience.',
      },
      {
        id: 'q5-comfortable-lifter',
        archetype: 'comfortable-lifter',
        text: 'I recreate the exercises I normally do and choose weights that feel familiar.',
      },
      {
        id: 'q5-fresh-start-frequent-flyer',
        archetype: 'fresh-start-frequent-flyer',
        text: 'I might do something quick, but it doesn’t feel like my real routine. I’ll properly resume when I’m home.',
      },
      {
        id: 'q5-pretty-healthy-girl',
        archetype: 'pretty-healthy-girl',
        text: 'If the gym feels complicated, I’ll prioritize walking and eating well until I’m somewhere more settled.',
      },
      {
        id: 'q5-perfect-plan-chaser',
        archetype: 'perfect-plan-chaser',
        text: 'I get annoyed if I can’t perform the exact workout written in my plan with the exact equipment it requires.',
      },
    ],
  },
  {
    id: 'q6',
    type: 'single',
    points: 2,
    prompt: 'How do you normally decide whether a workout “worked”?',
    helperText: SINGLE_SELECT_HELPER_TEXT,
    answers: [
      {
        id: 'q6-saved-workout-collector',
        archetype: 'saved-workout-collector',
        text: 'Honestly, I don’t stay with one approach long enough to confidently know what’s working.',
      },
      {
        id: 'q6-pilates-princess',
        archetype: 'pilates-princess',
        text: 'I felt my muscles burn, worked up a sweat, and left feeling like I had moved my body.',
      },
      {
        id: 'q6-comfortable-lifter',
        archetype: 'comfortable-lifter',
        text: 'I completed all the exercises and sets I normally do.',
      },
      {
        id: 'q6-fresh-start-frequent-flyer',
        archetype: 'fresh-start-frequent-flyer',
        text: 'I managed to fit something in despite everything else happening.',
      },
      {
        id: 'q6-pretty-healthy-girl',
        archetype: 'pretty-healthy-girl',
        text: 'It contributed to an overall healthy day.',
      },
      {
        id: 'q6-perfect-plan-chaser',
        archetype: 'perfect-plan-chaser',
        text: 'I completed the workout exactly as it was written.',
      },
    ],
  },
  {
    id: 'q7',
    type: 'single',
    points: 2,
    prompt: 'Which description sounds most like your approach to nutrition?',
    helperText: SINGLE_SELECT_HELPER_TEXT,
    answers: [
      {
        id: 'q7-saved-workout-collector',
        archetype: 'saved-workout-collector',
        text: 'I’ve heard so much conflicting advice that I’m never fully sure what I should be prioritizing.',
      },
      {
        id: 'q7-pilates-princess',
        archetype: 'pilates-princess',
        text: 'I try to eat balanced, nourishing meals that support an active lifestyle, but I don’t get very technical about it.',
      },
      {
        id: 'q7-comfortable-lifter',
        archetype: 'comfortable-lifter',
        text: 'I know protein matters and make a decent effort, but my nutrition isn’t necessarily planned around a specific physique goal.',
      },
      {
        id: 'q7-fresh-start-frequent-flyer',
        archetype: 'fresh-start-frequent-flyer',
        text: 'My eating changes dramatically depending on where I am, who I’m with, and what my schedule looks like.',
      },
      {
        id: 'q7-pretty-healthy-girl',
        archetype: 'pretty-healthy-girl',
        text: 'I eat pretty healthy already, which is why it’s confusing that my body isn’t changing.',
      },
      {
        id: 'q7-perfect-plan-chaser',
        archetype: 'perfect-plan-chaser',
        text: 'I do well when I have exact targets and rules, but I struggle to know what to do when I can’t follow them perfectly.',
      },
    ],
  },
  {
    id: 'q8',
    type: 'single',
    points: 2,
    prompt: 'Your body feels unusually hungry, tired, stressed, or “off.” What tends to happen?',
    helperText: SINGLE_SELECT_HELPER_TEXT,
    answers: [
      {
        id: 'q8-saved-workout-collector',
        archetype: 'saved-workout-collector',
        text: 'I search for an explanation, find ten different opinions, and end up even less certain about what my body needs.',
      },
      {
        id: 'q8-pilates-princess',
        archetype: 'pilates-princess',
        text: 'I choose gentler movement or a class that helps me feel better, but I don’t always connect the signal to my broader training or nutrition.',
      },
      {
        id: 'q8-comfortable-lifter',
        archetype: 'comfortable-lifter',
        text: 'I usually continue with my familiar routine. I don’t make many changes unless something is clearly wrong.',
      },
      {
        id: 'q8-fresh-start-frequent-flyer',
        archetype: 'fresh-start-frequent-flyer',
        text: 'One off day can easily become an off week while I wait to feel ready and settled again.',
      },
      {
        id: 'q8-pretty-healthy-girl',
        archetype: 'pretty-healthy-girl',
        text: 'I assume I need to clean things up, eat lighter, or be more disciplined.',
      },
      {
        id: 'q8-perfect-plan-chaser',
        archetype: 'perfect-plan-chaser',
        text: 'I try to override it and stick to the plan. I don’t fully trust myself to deviate from what I was told to do.',
      },
    ],
  },
  {
    id: 'q9',
    type: 'single',
    points: 2,
    prompt: 'Which sentence has spent the most time living in your head?',
    helperText: SINGLE_SELECT_HELPER_TEXT,
    answers: [
      {
        id: 'q9-saved-workout-collector',
        archetype: 'saved-workout-collector',
        text: '“Once I find the right plan, I’ll finally be able to get serious.”',
      },
      {
        id: 'q9-pilates-princess',
        archetype: 'pilates-princess',
        text: '“I move my body all the time. Why don’t I look as strong and defined as I want to?”',
      },
      {
        id: 'q9-comfortable-lifter',
        archetype: 'comfortable-lifter',
        text: '“But I already lift weights. What am I missing?”',
      },
      {
        id: 'q9-fresh-start-frequent-flyer',
        archetype: 'fresh-start-frequent-flyer',
        text: '“I’ll get properly consistent once I’m home, settled, or through this busy period.”',
      },
      {
        id: 'q9-pretty-healthy-girl',
        archetype: 'pretty-healthy-girl',
        text: '“I eat better than most people I know. Why am I not seeing more of a difference?”',
      },
      {
        id: 'q9-perfect-plan-chaser',
        archetype: 'perfect-plan-chaser',
        text: '“I know what to do. I just need to be disciplined enough to follow it perfectly.”',
      },
    ],
  },
  {
    id: 'q10',
    type: 'single',
    points: 3,
    prompt: 'What frustrates you most about trying to change your body?',
    helperText: SINGLE_SELECT_HELPER_TEXT,
    answers: [
      {
        id: 'q10-saved-workout-collector',
        archetype: 'saved-workout-collector',
        text: 'I still don’t feel confident that I know what to do or where to begin.',
      },
      {
        id: 'q10-pilates-princess',
        archetype: 'pilates-princess',
        text: 'I put real effort into being active, but it hasn’t created the visible transformation I want.',
      },
      {
        id: 'q10-comfortable-lifter',
        archetype: 'comfortable-lifter',
        text: 'I’ve been strength training, but I feel like I’ve hit a wall and don’t know how to move beyond it.',
      },
      {
        id: 'q10-fresh-start-frequent-flyer',
        archetype: 'fresh-start-frequent-flyer',
        text: 'Every interruption makes me feel like I’m rebuilding from the beginning.',
      },
      {
        id: 'q10-pretty-healthy-girl',
        archetype: 'pretty-healthy-girl',
        text: 'My habits seem healthy, but I don’t understand why they aren’t producing the result I want.',
      },
      {
        id: 'q10-perfect-plan-chaser',
        archetype: 'perfect-plan-chaser',
        text: 'I can succeed when I have a perfect plan, but I don’t trust myself when the plan stops fitting.',
      },
    ],
  },
  {
    id: 'q11',
    type: 'single',
    points: 3,
    prompt: 'What kind of support would feel most valuable right now?',
    helperText: SINGLE_SELECT_HELPER_TEXT,
    answers: [
      {
        id: 'q11-saved-workout-collector',
        archetype: 'saved-workout-collector',
        text: 'Someone cutting through the noise and showing me exactly where to start.',
      },
      {
        id: 'q11-pilates-princess',
        archetype: 'pilates-princess',
        text: 'Learning how to build muscle and transform my body without giving up the movement I genuinely enjoy.',
      },
      {
        id: 'q11-comfortable-lifter',
        archetype: 'comfortable-lifter',
        text: 'Someone looking at my training and showing me where I’m no longer progressing.',
      },
      {
        id: 'q11-fresh-start-frequent-flyer',
        archetype: 'fresh-start-frequent-flyer',
        text: 'An approach with options for travel, changing schedules, unfamiliar gyms, and real life.',
      },
      {
        id: 'q11-pretty-healthy-girl',
        archetype: 'pretty-healthy-girl',
        text: 'Understanding exactly what my body needs nutritionally—not just whether a food is considered healthy.',
      },
      {
        id: 'q11-perfect-plan-chaser',
        archetype: 'perfect-plan-chaser',
        text: 'Understanding my body well enough to adjust a plan confidently instead of always needing someone else to tell me what to do.',
      },
    ],
  },
  {
    id: 'q12',
    type: 'single',
    points: 3,
    prompt: 'If we looked honestly at the last year, which pattern would we probably find?',
    helperText: SINGLE_SELECT_HELPER_TEXT,
    answers: [
      {
        id: 'q12-saved-workout-collector',
        archetype: 'saved-workout-collector',
        text: 'A lot of saved information and good intentions, but not many months spent following one clear progression.',
      },
      {
        id: 'q12-pilates-princess',
        archetype: 'pilates-princess',
        text: 'Plenty of movement and classes, but not much progressive strength training.',
      },
      {
        id: 'q12-comfortable-lifter',
        archetype: 'comfortable-lifter',
        text: 'Plenty of strength workouts, but a lot of the same exercises, weights, and rep ranges.',
      },
      {
        id: 'q12-fresh-start-frequent-flyer',
        archetype: 'fresh-start-frequent-flyer',
        text: 'Multiple strong starts separated by travel, work, moves, visitors, or other life changes.',
      },
      {
        id: 'q12-pretty-healthy-girl',
        archetype: 'pretty-healthy-girl',
        text: 'Consistently trying to eat well without clear nutritional targets tied to the result I want.',
      },
      {
        id: 'q12-perfect-plan-chaser',
        archetype: 'perfect-plan-chaser',
        text: 'Periods of excellent compliance followed by periods where I feel completely “off plan.”',
      },
    ],
  },
  {
    id: 'q13',
    type: 'ranked-two',
    rank1Points: 4,
    rank2Points: 2,
    rank1Label: 'Most true for me',
    rank2Label: 'My close second',
    prompt: 'Final truth-serum question: which two feel most uncomfortably accurate?',
    helperText: 'Choose your most-true answer first, then pick the one that’s a close second.',
    answers: [
      {
        id: 'q13-saved-workout-collector',
        archetype: 'saved-workout-collector',
        text: 'I may be using research and preparation to avoid choosing a direction and beginning imperfectly.',
      },
      {
        id: 'q13-pilates-princess',
        archetype: 'pilates-princess',
        text: 'I may be expecting the movement I enjoy to create a result it was never specifically designed to produce.',
      },
      {
        id: 'q13-comfortable-lifter',
        archetype: 'comfortable-lifter',
        text: 'I may be confusing repeating workouts with progressively training my body.',
      },
      {
        id: 'q13-fresh-start-frequent-flyer',
        archetype: 'fresh-start-frequent-flyer',
        text: 'I may be expecting consistency to look the same in every season, city, and schedule.',
      },
      {
        id: 'q13-pretty-healthy-girl',
        archetype: 'pretty-healthy-girl',
        text: 'I may be confusing eating nutritious food with eating intentionally for the transformation I want.',
      },
      {
        id: 'q13-perfect-plan-chaser',
        archetype: 'perfect-plan-chaser',
        text: 'I may know how to follow instructions without knowing how to understand or respond to my own body.',
      },
    ],
  },
];
