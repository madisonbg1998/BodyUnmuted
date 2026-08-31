/**
 * ============================================================================
 * FREEDOM FITNESS AUDIT ANALYTICS — provider-agnostic event dispatcher
 * ============================================================================
 * No analytics platform is installed in this project (checked: no GA,
 * Segment, PostHog, Plausible, or Vercel Analytics — see app/lib/quiz/analytics.ts
 * for the other quiz's identical finding). Per the brief, one isn't being
 * added here without explicit approval.
 *
 * `track()` is the single choke point every FFA event flows through. Right
 * now it just logs to the console outside production. Wiring a real provider
 * later means editing the body of this one function — nothing elsewhere in
 * the quiz needs to change.
 *
 * NEVER pass firstName, email, or any free-text answer content into
 * `properties` — only result types and question IDs.
 * ============================================================================
 */

export type FfaAnalyticsEvent =
  | 'quiz_view'
  | 'quiz_start'
  | 'quiz_question_complete'
  | 'quiz_complete'
  | 'quiz_email_modal_view'
  | 'quiz_mock_submit_success'
  | 'quiz_result_reveal';

export type FfaAnalyticsProperties = Record<string, string | number | boolean>;

export function track(event: FfaAnalyticsEvent, properties: FfaAnalyticsProperties = {}): void {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[ffa analytics]', event, properties);
  }

  // Future provider call goes here, e.g.:
  //   window.gtag?.('event', event, properties)
  //   window.posthog?.capture(event, properties)
}
