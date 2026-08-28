import type { FfaQuestion } from '@/app/lib/ffa/types';
import AnswerCard from '@/components/quiz/AnswerCard';
import QuizProgress from '@/components/quiz/QuizProgress';

export default function FfaQuestionScreen({
  question,
  order,
  questionNumber,
  totalQuestions,
  selectedId,
  onSelect,
  onNext,
  onPrevious,
  canGoBack,
}: {
  question: FfaQuestion;
  order: string[];
  questionNumber: number;
  totalQuestions: number;
  selectedId?: string;
  onSelect: (id: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
}) {
  const orderedAnswers = order.map((id) => question.answers.find((a) => a.id === id)!).filter(Boolean);
  const isLast = questionNumber === totalQuestions;

  return (
    <div key={question.id} className="quiz-fade-in" style={{ maxWidth: '640px', margin: '0 auto' }}>
      <QuizProgress current={questionNumber} total={totalQuestions} accentColor="#525421" />

      <h1
        style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          color: '#2d1506',
          fontSize: 'clamp(22px, 3.2vw, 32px)',
          lineHeight: '1.2',
          fontWeight: 400,
          marginBottom: '28px',
        }}
      >
        {question.prompt}
      </h1>

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend className="sr-only-input">{question.prompt}</legend>
        {orderedAnswers.map((answer) => (
          <AnswerCard
            key={answer.id}
            name={question.id}
            value={answer.id}
            text={answer.text}
            checked={selectedId === answer.id}
            onSelect={onSelect}
          />
        ))}
      </fieldset>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px', gap: '12px' }}>
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canGoBack}
          className="btn-secondary"
          style={{
            color: '#45220d',
            borderColor: canGoBack ? '#45220d' : 'rgba(45,21,6,0.2)',
            opacity: canGoBack ? 1 : 0.4,
            cursor: canGoBack ? 'pointer' : 'not-allowed',
          }}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!selectedId}
          className="btn-primary"
          style={{ opacity: selectedId ? 1 : 0.5, cursor: selectedId ? 'pointer' : 'not-allowed' }}
        >
          {isLast ? 'See My Result' : 'Next'}
        </button>
      </div>
    </div>
  );
}
