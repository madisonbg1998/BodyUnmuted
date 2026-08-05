import type { SingleSelectQuestion } from '@/app/lib/quiz/types';
import AnswerCard from './AnswerCard';
import QuizProgress from './QuizProgress';

export default function QuizQuestionScreen({
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
  question: SingleSelectQuestion;
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

  return (
    <div key={question.id} className="quiz-fade-in" style={{ maxWidth: '640px', margin: '0 auto' }}>
      <QuizProgress current={questionNumber} total={totalQuestions} />

      {question.helperText && (
        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'rgba(45,21,6,0.5)',
            marginBottom: '10px',
          }}
        >
          {question.helperText}
        </p>
      )}

      <h2
        style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          color: '#2d1506',
          fontSize: 'clamp(24px, 3.4vw, 34px)',
          lineHeight: '1.15',
          fontWeight: 400,
          marginBottom: '28px',
        }}
      >
        {question.prompt}
      </h2>

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

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
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
          {questionNumber === totalQuestions ? 'Continue' : 'Next'}
        </button>
      </div>
    </div>
  );
}
