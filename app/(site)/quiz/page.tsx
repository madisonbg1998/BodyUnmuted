import type { Metadata } from 'next';
import QuizApp from '@/components/quiz/QuizApp';
import { QUIZ_DESCRIPTION, QUIZ_TITLE } from '@/app/lib/quiz/config';

export const metadata: Metadata = {
  title: `${QUIZ_TITLE} | Body Unmuted`,
  description: QUIZ_DESCRIPTION,
};

export default function QuizPage() {
  return (
    <section style={{ backgroundColor: '#fbf4e9', padding: '64px 20px 96px', minHeight: '70vh' }}>
      <QuizApp />
    </section>
  );
}
