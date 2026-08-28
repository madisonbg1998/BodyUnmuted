import type { LeadCaptureAdapter, LeadCapturePayload } from './types';
import { convertkitLeadAdapter } from './adapters/convertkitLeadAdapter';

/**
 * ============================================================================
 * LEAD CAPTURE ADAPTER — mock vs. real Kit (ConvertKit) integration
 * ============================================================================
 * `activeLeadCaptureAdapter` (bottom of this file) is what
 * components/ffa/FfaApp.tsx actually uses. It's `mockLeadCaptureAdapter`
 * while `MOCK_ADAPTER_ACTIVE` is `true`, and the real
 * `convertkitLeadAdapter` (app/lib/ffa/adapters/convertkitLeadAdapter.ts,
 * POSTing to app/api/ffa-lead/route.ts) once it's flipped to `false`.
 *
 * To go live:
 *   1. In Kit, create a form for the audit and (optionally) custom fields
 *      named `quiz_result`, `quiz_goal`, `quiz_secondary_result` — see
 *      app/api/ffa-lead/route.ts's doc comment.
 *   2. Set `CONVERTKIT_FFA_FORM_ID` in .env.local to that form's ID.
 *   3. Flip `MOCK_ADAPTER_ACTIVE` below to `false`. This also lifts the
 *      production safeguard in app/(site)/freedom-fitness-audit/page.tsx —
 *      see that file and README.md for the full explanation.
 *
 * This mock implementation is intentionally inert: it does not send,
 * persist, print, or log `payload.firstName` or `payload.email` — or any
 * other part of the payload. It never touches `fetch`, `localStorage`, or
 * `console`. See app/lib/ffa/leadAdapter.test.ts for a test that proves this
 * by spying on all three and asserting none are called.
 * ============================================================================
 */

/**
 * A single source of truth for "is the non-persisting mock still wired up."
 * The route-level production safeguard checks this — see
 * app/(site)/freedom-fitness-audit/page.tsx.
 */
export const MOCK_ADAPTER_ACTIVE = false;

export const mockLeadCaptureAdapter: LeadCaptureAdapter = {
  async submit(payload: LeadCapturePayload): Promise<{ success: true }> {
    // `payload` is deliberately never read, logged, stored, or transmitted.
    // The `void` below exists only to satisfy the "unused parameter" lint
    // rule — it is not a stand-in for actually doing something with it.
    void payload;

    // Simulated latency so the UI's loading/disabled-button state gets
    // exercised the same way it will be against a real network call.
    await new Promise((resolve) => setTimeout(resolve, 450));

    return { success: true };
  },
};

export const activeLeadCaptureAdapter: LeadCaptureAdapter = MOCK_ADAPTER_ACTIVE ? mockLeadCaptureAdapter : convertkitLeadAdapter;
