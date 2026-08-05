import { notFound } from 'next/navigation';
import QuizResultsPreviewClient from './PreviewClient';

/**
 * Dev-only tool: preview any primary/secondary archetype combination without
 * retaking the quiz. Hard-gated to 404 in production builds — never reachable
 * on the live site.
 */
export default function QuizResultsPreviewPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return <QuizResultsPreviewClient />;
}
