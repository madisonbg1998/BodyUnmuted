import type { LeadCaptureAdapter, LeadCapturePayload } from '../types';

/**
 * Real `LeadCaptureAdapter` implementation — subscribes the visitor to Kit
 * (ConvertKit) via app/api/ffa-lead/route.ts, which holds the API key
 * server-side and forwards the quiz result/goal as custom fields. See that
 * route's doc comment for the required Kit-side setup (form + custom
 * fields).
 *
 * Throws on failure (network error, non-2xx response) rather than resolving
 * `{ success: true }` — components/ffa/FfaApp.tsx catches this and shows a
 * retry-able error in the modal instead of silently "succeeding."
 */
export const convertkitLeadAdapter: LeadCaptureAdapter = {
  async submit(payload: LeadCapturePayload): Promise<{ success: true }> {
    const response = await fetch('/api/ffa-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Lead submission failed with status ${response.status}`);
    }

    return { success: true };
  },
};
