# The Freedom Fitness Audit — Quiz

An 11-question quiz that produces one of four Freedom Fitness types, built as a self-contained module (`app/lib/ffa/*`, `components/ffa/*`, route at `app/(site)/freedom-fitness-audit/`). It reuses this repo's existing design system and the generic pieces of the sibling quiz (`AnswerCard`, `QuizProgress`) but has its own content, scoring, storage, and state machine.

**Status: live.** Submitting the end-of-quiz form subscribes the visitor to a real Kit (ConvertKit) form and, when one's configured for her result type, enrolls her directly into a matching Kit sequence — see [Email integration (Kit/ConvertKit)](#email-integration-kitconvertkit) below. There is still no database, no CRM, and no custom-built result-report email — Kit owns delivery entirely.

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

Unit tests: `app/lib/ffa/scoring.test.ts` (26 tests), `app/lib/ffa/leadAdapter.test.ts` (6 tests), and `app/lib/ffa/adapters/convertkitLeadAdapter.test.ts` (4 tests). Together with the sibling quiz's existing suite, `npm test` runs 91 tests.

`scoring.test.ts` proves: every answer on every question maps to the right result, all four types can win outright, tie-breaking resolves in the required order (Q12 → Q9 → Q4 → alphabetical), a runner-up only qualifies as `secondaryResult` when within one point of the primary, and editing an earlier answer recalculates the outcome correctly.

`leadAdapter.test.ts` proves the mock adapter never calls `console.*`, `fetch`, or `localStorage.setItem`, and that sentinel name/email strings never appear in any spy call. `convertkitLeadAdapter.test.ts` proves the real adapter POSTs the full payload to `/api/ffa-lead` and resolves/throws correctly on success/failure responses.

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

- All 11 questions add one point to result A, B, C, or D based on the chosen answer.
- The result with the highest score is `primaryResult`.
- The runner-up becomes `secondaryResult` only if it's within one point of the primary; otherwise `secondaryResult` is omitted.
- Exact ties are broken deterministically — never randomly — by checking what she answered on Q12, then Q9, then Q4, in that order: the first of those three whose answer belongs to the tied set wins. This applies both when settling the primary and, separately, when settling which runner-up (if any) qualifies as secondary.
- Scoring binds to stable answer IDs (`q1-a`, `q7-a`, etc.), never to display position — answer order is shuffled per session for display only (`shuffle()` in `scoring.ts`, seeded from `Math.random` by default but takes an injectable RNG for deterministic tests).

> A Q6 "what's your goal" question originally sat between Q5 and Q7 (`kind: 'goal'`, never scored, contributed a `goal: GoalType` field to `QuizOutcome`). It was removed post-launch as unnecessary — Q7-Q12's question IDs were kept as-is (stable IDs, never renumbered to match display position) even though Q6's display slot is now gone.

## Content editing

Every string shown to the visitor lives in `app/lib/ffa/config.ts` — landing copy, all 11 questions and answers, popup copy, and all four result reveals. Nothing in `components/ffa/*` or the rest of `app/lib/ffa/*` should need to change to edit wording.

Two rules when editing:

1. **Never change an answer's `id`** once it's shipped — `scoring.ts`, `storage.ts` (in-progress sessions), and the test suite all bind to these IDs. Add new answers with new IDs; don't repurpose an old one for different content.
2. **Bump `QUIZ_VERSION`** in `config.ts` whenever you change a question, an answer's scoring/goal mapping, or the tie-break order. `storage.ts` checks this version on load and discards any in-progress session that predates it, rather than silently resuming someone into a quiz whose content has since changed under them.

`POPUP_CONSENT_LABEL_PLACEHOLDER` is explicitly marked as placeholder copy pending legal review — replace it with approved consent language before this ships to real visitors.

## Preview mode & the production safeguard

`app/lib/ffa/leadAdapter.ts` exports `MOCK_ADAPTER_ACTIVE`, now `false` — the real Kit adapter is active. The route (`app/(site)/freedom-fitness-audit/page.tsx`) checks this flag together with `NODE_ENV`:

```ts
if (MOCK_ADAPTER_ACTIVE && process.env.NODE_ENV === 'production') {
  notFound();
}
```

With the flag `false`, this check never fires — the route is no longer gated in production (it's still unlinked from nav, same as `/survey`, `/workshop`, `/intake`, so it's only reachable by direct URL). If `mockLeadCaptureAdapter` is ever needed again for local/offline development, flipping `MOCK_ADAPTER_ACTIVE` back to `true` restores the production gate automatically.

Outside of production, question screens, the popup, and the result screen still show a visible dev-only notice (`POPUP_DEV_NOTICE`, `RESULT_DEV_NOTICE`) — worth revisiting now that real submissions actually do save and send, since the copy still says otherwise. These notices are conditioned on `process.env.NODE_ENV !== 'production'` at the component level.

## Email integration (Kit/ConvertKit)

`app/lib/ffa/adapters/convertkitLeadAdapter.ts` is the active `LeadCaptureAdapter` (see `app/lib/ffa/leadAdapter.ts`'s `activeLeadCaptureAdapter` export, which `components/ffa/FfaApp.tsx` uses). On submit it POSTs the full payload to `app/api/ffa-lead/route.ts`, which:

1. **Subscribes to one shared Kit form** (`CONVERTKIT_FFA_FORM_ID`), sending `primaryResult` as a `quiz_result` custom field (and `quiz_secondary_result` when a secondary result qualified).
2. **Enrolls directly into a Kit sequence matching her primary result**, if one is configured (`CONVERTKIT_FFA_SEQUENCE_ID_A` / `_B` / `_C` / `_D`). Kit's API has no endpoint to create or configure a visual automation — confirmed against Kit's own API docs — so this is how per-result email content actually sends: one sequence per result type, enrolled directly by this route, no automation needed. A result without a configured sequence ID is skipped, not an error, so this works incrementally as each sequence gets built. Currently only `A` ("This Worked Until Life Happened") has a sequence.

Required env vars (`.env.local.example` documents all of these): `CONVERTKIT_API_KEY`, `CONVERTKIT_FFA_FORM_ID`, and `CONVERTKIT_FFA_SEQUENCE_ID_A` (`_B`/`_C`/`_D` once those sequences exist). `.env.local` is gitignored — production deploys need these set separately in the hosting platform's environment settings, not just locally.

Two Kit-account-side prerequisites, already done for the current setup: custom fields named exactly `quiz_result` and `quiz_secondary_result` must exist in the Kit account (Kit silently drops fields it doesn't recognize — created via `POST /v3/custom_fields`), and new subscribers land in Kit's `inactive` state if double opt-in is on for the form (confirmation-email gated) until she confirms.

If a submission fails (Kit API error, network issue), `convertkitLeadAdapter` throws rather than resolving `{ success: true }` — `FfaApp.tsx` catches this, shows a retry-able error in the modal, and keeps her answers intact rather than silently succeeding or losing her progress.

**Still not built:** a real analytics provider (`track()` in `app/lib/ffa/analytics.ts` is the single choke point to wire one in, still just `console.log`s outside production), approved consent language (`POPUP_CONSENT_LABEL_PLACEHOLDER` is still a placeholder), and transmission of UTM/referrer to Kit (captured into `LeadCapturePayload` already, just not sent — `subscribeToConvertKit`'s `fields` parameter could carry these the same way `quiz_result` does, if wanted).

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

Everything else — every question, every answer, every score mapping, the tie-break order (Q12 → Q9 → Q4), both result type names, and all four reveal bodies — matched the brief byte-for-byte on the first pass. `scoring.test.ts`'s content-integrity tests additionally assert this structurally on every run: all 11 questions exist, each with exactly one A/B/C/D answer, and answer IDs are unique — so a future content edit that breaks this shape fails the test suite, not just a manual read-through.

**Post-launch change:** the Q6 "what's your goal" question (and the `goal`/`GoalType` field it fed into `QuizOutcome`) was removed entirely, on the site owner's direct instruction, as unnecessary for this quiz. The audit above was performed against the original 12-question brief; the 11-question count and the scoring/type details throughout the rest of this README reflect the current, post-removal state.
