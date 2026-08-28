# The Freedom Fitness Audit — Quiz

A 12-question quiz that produces one of four Freedom Fitness types, built as a self-contained module (`app/lib/ffa/*`, `components/ffa/*`, route at `app/(site)/freedom-fitness-audit/`). It reuses this repo's existing design system and the generic pieces of the sibling quiz (`AnswerCard`, `QuizProgress`, `BrandOrb`) but has its own content, scoring, storage, and state machine.

**This build is quiz-only.** There is no email provider, no database, no CRM, and no result-report email. Submitting the end-of-quiz form calls a mock adapter that always "succeeds" without saving or sending anything. See [What's mocked](#whats-mocked) and [What the email-integration phase needs](#what-the-email-integration-phase-needs) below.

## Running it locally

```bash
npm run dev
```

Visit `http://localhost:3000/freedom-fitness-audit`. The route is not linked from nav — same pattern as `/survey`, `/workshop`, `/intake` — reachable only by direct URL.

The route only renders outside of `NODE_ENV=production` (see [Preview mode & the production safeguard](#preview-mode--the-production-safeguard)), so `npm run dev` and `npm run build && npm run start` with `NODE_ENV` unset both work; a production build (`NODE_ENV=production npm run build`) prerenders the route straight to a 404.

## Tests

```bash
npm test           # unit tests (vitest) — scoring + mock adapter privacy
npm run test:e2e   # e2e tests (playwright) — full browser flows, a11y, mobile
```

Unit tests: `app/lib/ffa/scoring.test.ts` (33 tests) and `app/lib/ffa/leadAdapter.test.ts` (6 tests). Together with the sibling quiz's existing suite, `npm test` runs 94 tests.

`scoring.test.ts` proves: every answer on every scored question maps to the right result, Q6 never affects scores under any circumstance, all four types can win outright, tie-breaking resolves in the required order (Q12 → Q9 → Q4 → alphabetical), a runner-up only qualifies as `secondaryResult` when within one point of the primary, and editing an earlier answer recalculates the outcome correctly.

`leadAdapter.test.ts` proves the mock adapter never calls `console.*`, `fetch`, or `localStorage.setItem`, and that sentinel name/email strings never appear in any spy call.

E2e tests (`e2e/*.spec.ts`, run against Chromium and a WebKit/iPhone SE profile):

| File | Covers |
|---|---|
| `ffa-result-paths.spec.ts` | All 4 result types reachable end-to-end; result never appears in the DOM before mock submission succeeds |
| `ffa-navigation.spec.ts` | Back preserves earlier answers; editing an answer changes the final result; popup close → "See my result" → reopen; Escape closes the popup; refresh mid-quiz restores progress |
| `ffa-privacy.spec.ts` | No network request ever fires; name/email never appear in console output or `localStorage`; progress clears after submission while the result is kept |
| `ffa-accessibility.spec.ts` | Zero automated (axe-core) violations on the landing, question, modal, and reveal screens; full quiz completable keyboard-only, including the modal's focus trap |
| `ffa-mobile.spec.ts` | Full quiz completes at a 320px-wide viewport with no horizontal scroll |

`e2e/capture-screenshots.spec.ts` is a manual utility (skipped by default, not part of the pass/fail gate) that regenerates the screenshots below:

```bash
CAPTURE_SCREENSHOTS=1 npx playwright test e2e/capture-screenshots.spec.ts --project=chromium
```

## Screenshots

All in `docs/freedom-fitness-audit/screenshots/`:

- `landing.png` — landing page
- `question.png` — a question screen (desktop)
- `popup.png` — the end-of-quiz name/email popup, with the dev-only preview notice
- `result-ready.png` — the screen shown if she closes the popup before submitting (has its own "Start over" link back to the landing page, in addition to reopening the popup)
- `reveal-A.png`, `reveal-B.png`, `reveal-C.png`, `reveal-D.png` — all four result reveals
- `mobile-narrow-landing.png`, `mobile-narrow-question.png` — 320px-wide mobile layout

## Scoring

Source of truth: `app/lib/ffa/scoring.ts`, content: `app/lib/ffa/config.ts`.

- Questions 1–5 and 7–12 (11 questions) are `kind: 'scored'`; each answer adds one point to result A, B, C, or D.
- Question 6 is `kind: 'goal'`; it records a `GoalType` and is never included in scoring.
- The result with the highest score is `primaryResult`.
- The runner-up becomes `secondaryResult` only if it's within one point of the primary; otherwise `secondaryResult` is omitted.
- Exact ties are broken deterministically — never randomly — by checking what she answered on Q12, then Q9, then Q4, in that order: the first of those three whose answer belongs to the tied set wins. This applies both when settling the primary and, separately, when settling which runner-up (if any) qualifies as secondary.
- Scoring binds to stable answer IDs (`q1-a`, `q6-fat-loss`, etc.), never to display position — answer order is shuffled per session for display only (`shuffle()` in `scoring.ts`, seeded from `Math.random` by default but takes an injectable RNG for deterministic tests).

## Content editing

Every string shown to the visitor lives in `app/lib/ffa/config.ts` — landing copy, all 12 questions and answers, popup copy, and all four result reveals. Nothing in `components/ffa/*` or the rest of `app/lib/ffa/*` should need to change to edit wording.

Two rules when editing:

1. **Never change an answer's `id`** once it's shipped — `scoring.ts`, `storage.ts` (in-progress sessions), and the test suite all bind to these IDs. Add new answers with new IDs; don't repurpose an old one for different content.
2. **Bump `QUIZ_VERSION`** in `config.ts` whenever you change a question, an answer's scoring/goal mapping, or the tie-break order. `storage.ts` checks this version on load and discards any in-progress session that predates it, rather than silently resuming someone into a quiz whose content has since changed under them.

`POPUP_CONSENT_LABEL_PLACEHOLDER` is explicitly marked as placeholder copy pending legal review — replace it with approved consent language before this ships to real visitors.

## Preview mode & the production safeguard

`app/lib/ffa/leadAdapter.ts` exports `MOCK_ADAPTER_ACTIVE = true`. The route (`app/(site)/freedom-fitness-audit/page.tsx`) checks this flag together with `NODE_ENV`:

```ts
if (MOCK_ADAPTER_ACTIVE && process.env.NODE_ENV === 'production') {
  notFound();
}
```

This is the same pattern already used by this repo's other dev-only route (`app/(site)/quiz/preview/`). A production build prerenders `/freedom-fitness-audit` straight to a 404 — confirmed by building with `NODE_ENV=production` and inspecting `.next/server/app/freedom-fitness-audit.html`, which contains "This page could not be found."

**Why a route-level gate instead of a build-time failure:** this repo's production build serves the whole live site — checkout, dashboard, everything — not just this quiz. A `prebuild` script that fails the entire build while the mock adapter is active would block every other deploy (including paid checkout) until the email integration ships, which is a much bigger blast radius than intended. The route gate achieves the same outcome the brief asks for — *this quiz can never go live collecting "successful" submissions that are secretly discarded* — without holding the rest of the site hostage. To remove the gate once a real adapter is wired in, see the next section.

Outside of production, question screens, the popup, and the result screen all show a visible dev-only notice (`POPUP_DEV_NOTICE`, `RESULT_DEV_NOTICE`) confirming nothing was actually saved or sent. These notices are conditioned on `process.env.NODE_ENV !== 'production'` at the component level too, as a second, independent guard.

## What's mocked

- `app/lib/ffa/leadAdapter.ts` exports `mockLeadCaptureAdapter: LeadCaptureAdapter`. Its `submit()` waits ~450ms (to make the loading state visible) and returns `{ success: true }`. It does not call `fetch`, `console.*`, or any storage API with the payload — verified by `leadAdapter.test.ts` and `e2e/ffa-privacy.spec.ts`.
- `app/lib/ffa/analytics.ts` exports a `track()` function that only `console.log`s outside production. No analytics provider is installed (confirmed: no GA, Segment, PostHog, Plausible, or Vercel Analytics anywhere in this repo, matching the sibling quiz's own finding in `app/lib/quiz/analytics.ts`).
- `firstName` and `email` are never written to `localStorage`, `console`, or any network request. `app/lib/ffa/storage.ts`'s `clearProgressKeepOutcome()` explicitly does not touch either field — it only ever sees form values passed directly into the adapter call in `components/ffa/FfaApp.tsx`.
- UTM parameters and referrer are captured into state (`captureUtmAndReferrer()` in `storage.ts`) and included in the `LeadCapturePayload` shape, but nothing currently transmits them anywhere — they're captured now so the future real adapter doesn't need a separate capture mechanism retrofitted later.

## What the email-integration phase needs

Everything below is intentionally **not** built yet:

1. **A real `LeadCaptureAdapter`.** The integration boundary is fixed and already in use — implement `interface LeadCaptureAdapter { submit(payload: LeadCapturePayload): Promise<{ success: true }> }` (see `app/lib/ffa/types.ts`) against whatever email/CRM provider gets chosen, and swap it in for `mockLeadCaptureAdapter` in `components/ffa/FfaApp.tsx`'s single `import`.
2. **Set `MOCK_ADAPTER_ACTIVE = false`** in `app/lib/ffa/leadAdapter.ts` once the real adapter is live, so the route stops 404ing in production.
3. **Remove or update the dev-only notices** (`POPUP_DEV_NOTICE`, `RESULT_DEV_NOTICE` in `config.ts`) — they're gated to non-production already, but confirm the copy still makes sense once there's a real send happening.
4. **Approved consent language** to replace `POPUP_CONSENT_LABEL_PLACEHOLDER`.
5. **The actual result-report email** — content, template, and send trigger. Nothing about that email's content exists anywhere in this build; only the quiz's own on-screen reveal does.
6. **A decision on whether to transmit UTM/referrer** to the new adapter — the data is already captured into `LeadCapturePayload`, just not sent anywhere yet.
7. **A real analytics provider**, if wanted — `track()` in `app/lib/ffa/analytics.ts` is the single choke point to wire one in; nothing else needs to change.

## Mobile & accessibility QA summary

- Verified down to a 320px-wide viewport (`e2e/ffa-mobile.spec.ts`, plus a WebKit/iPhone SE Playwright project) with no horizontal scroll at any phase and the popup fitting within the viewport width.
- Automated accessibility scan (`@axe-core/playwright`) reports zero violations on the landing, question, popup, and reveal screens.
- Full quiz completable keyboard-only: landing button, radio answers (Space to select), Next/Previous/See My Result buttons, and the popup's focus trap (Tab cycles within the dialog, Escape closes it, focus returns to the triggering element on close) — all verified in `e2e/ffa-accessibility.spec.ts`.
- One color-contrast pass was needed during this build: several small-text copper/olive/brown accents (eyebrow labels, pull-quotes, microcopy, the "Retake the audit" link) fell short of WCAG AA's 4.5:1 for normal text when checked with axe. These were darkened within the FFA-specific files; `components/quiz/QuizProgress.tsx` (shared with the sibling quiz) got an additive, backward-compatible `accentColor` prop rather than having its default color changed, so the sibling quiz's appearance is untouched. It also had a missing `aria-label` on the progress bar itself, now fixed for both quizzes.
- The shared `.btn-primary` button style measured a 4.3:1 contrast ratio in one axe run (just under the 4.5:1 threshold) — this class is used site-wide, not something introduced by this build, so it wasn't changed here; worth a look separately if the whole site wants a formal AA pass.
- `prefers-reduced-motion` is respected: the only animation used (`.quiz-fade-in`) already had a reduced-motion override in `app/globals.css`; the new calculating screen deliberately doesn't use `BrandOrb`'s `pulse` animation, since that component has no reduced-motion guard of its own (a pre-existing gap in a shared component, left alone rather than expanded in scope here).

## Content audit

Every string in `app/lib/ffa/config.ts` was diffed programmatically against the original brief document, not just re-read by eye: all 12 question prompts and all 47 scored/goal answer texts, their A/B/C/D/goal tags, the landing eyebrow/headline/13 body blocks/button/microcopy, both pre-quiz instruction lines, the popup heading/body/button/dev-notice, and all four result names/bodies/shared eyebrow/dev-notice.

Two discrepancies turned up during that diff and were corrected:

- The landing microcopy has no trailing period in the brief (`One eerily specific result`, not `...result.`) — a first draft of this README had assumed one; `config.ts` was already correct and was left alone.
- Two apostrophes (`can't` in the first pull-quote, `I'm Fine` in the Result C name) were transcribed as curly (`’`) instead of the brief's straight (`'`) — fixed in `config.ts` to match the source exactly.

Everything else — every question, every answer, every score/goal mapping, the tie-break order (Q12 → Q9 → Q4), both result type names, and all four reveal bodies — matched the brief byte-for-byte on the first pass. `scoring.test.ts`'s content-integrity tests additionally assert this structurally on every run: all 12 questions exist, 11 are scored with exactly one A/B/C/D answer each, answer IDs are unique, and Q6 has all five `GoalType` values represented — so a future content edit that breaks this shape fails the test suite, not just a manual read-through.
