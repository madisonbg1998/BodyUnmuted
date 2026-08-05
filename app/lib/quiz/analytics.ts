/**
 * ============================================================================
 * QUIZ ANALYTICS — provider-agnostic event dispatcher
 * ============================================================================
 * No analytics platform is installed in this project yet (checked: no GA,
 * Segment, PostHog, Plausible, or Vercel Analytics). Per instructions, one
 * isn't being added here without your say-so.
 *
 * `track()` below is the single choke point every quiz event flows through.
 * Right now it just logs to the console in development. Wiring a real
 * provider later means editing the body of this one function — nothing
 * elsewhere in the quiz needs to change.
 *
 * Never pass names, emails, or free-text answer content into `properties` —
 * only archetype IDs, question IDs, and other non-identifying data.
 * ============================================================================
 */

export type QuizAnalyticsEvent =
  | 'quiz_landing_viewed'
  | 'quiz_started'
  | 'quiz_question_completed'
  | 'quiz_abandoned'
  | 'quiz_completed'
  | 'quiz_results_viewed'
  | 'quiz_body_reclaimed_cta_clicked'
  | 'quiz_membership_page_viewed';

export function track(event: QuizAnalyticsEvent, properties: Record<string, string | number | boolean> = {}): void {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[quiz analytics]', event, properties);
  }

  // Future provider call goes here, e.g.:
  //   window.gtag?.('event', event, properties)
  //   window.posthog?.capture(event, properties)
}
