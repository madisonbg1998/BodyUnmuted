import type { RankedTwoQuestion } from '@/app/lib/quiz/types';
import AnswerCard from './AnswerCard';
import QuizProgress from './QuizProgress';

export default function QuizRankedQuestion({
  question,
  order,
  questionNumber,
  totalQuestions,
  rank1,
  rank2,
  onChangeRank1,
  onChangeRank2,
  onNext,
  onPrevious,
}: {
  question: RankedTwoQuestion;
  order: string[];
  questionNumber: number;
  totalQuestions: number;
  rank1?: string;
  rank2?: string;
  onChangeRank1: (id: string) => void;
  onChangeRank2: (id: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const orderedAnswers = order.map((id) => question.answers.find((a) => a.id === id)!).filter(Boolean);
  const step: 1 | 2 = !rank1 ? 1 : 2;
  const stepAnswers = step === 1 ? orderedAnswers : orderedAnswers.filter((a) => a.id !== rank1);

  return (
    <div key={`${question.id}-${step}`} className="quiz-fade-in" style={{ maxWidth: '640px', margin: '0 auto' }}>
      <QuizProgress current={questionNumber} total={totalQuestions} label={`Question ${questionNumber} of ${totalQuestions} · Step ${step} of 2`} />

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
        {step === 1 ? question.rank1Label : question.rank2Label}
      </p>

      <h2
        style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          color: '#2d1506',
          fontSize: 'clamp(24px, 3.4vw, 34px)',
          lineHeight: '1.15',
          fontWeight: 400,
          marginBottom: '10px',
        }}
      >
        {question.prompt}
      </h2>
      {question.helperText && (
        <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '14px', marginBottom: '24px' }}>
          {question.helperText}
        </p>
      )}

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend className="sr-only-input">
          {step === 1 ? question.rank1Label : question.rank2Label}: {question.prompt}
        </legend>
        {stepAnswers.map((answer) => (
          <AnswerCard
            key={answer.id}
            name={`${question.id}-step${step}`}
            value={answer.id}
            text={answer.text}
            checked={(step === 1 ? rank1 : rank2) === answer.id}
            onSelect={step === 1 ? onChangeRank1 : onChangeRank2}
          />
        ))}
      </fieldset>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
        <button
          type="button"
          onClick={step === 1 ? onPrevious : () => onChangeRank1('')}
          className="btn-secondary"
          style={{ color: '#45220d', borderColor: '#45220d' }}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={step === 1 || !rank2}
          className="btn-primary"
          style={{ opacity: step === 2 && rank2 ? 1 : 0.5, cursor: step === 2 && rank2 ? 'pointer' : 'not-allowed' }}
        >
          See My Results
        </button>
      </div>
    </div>
  );
}
