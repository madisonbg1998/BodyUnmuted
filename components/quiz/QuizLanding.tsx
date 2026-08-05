import { QUIZ_DESCRIPTION, QUIZ_INSTRUCTIONS, QUIZ_TITLE } from '@/app/lib/quiz/config';
import BrandOrb from '@/components/BrandOrb';

export default function QuizLanding({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <BrandOrb size="sm" />
      </div>
      <p
        className="subheading"
        style={{ color: '#ce965a', fontSize: 'clamp(12px, 1.6vw, 15px)', marginBottom: '16px' }}
      >
        A 2-Minute Quiz
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          color: '#2d1506',
          fontSize: 'clamp(34px, 5.5vw, 60px)',
          lineHeight: '1.05',
          fontWeight: 400,
          marginBottom: '24px',
        }}
      >
        {QUIZ_TITLE}
      </h1>
      <p
        className="paragraph"
        style={{ color: '#45220d', fontSize: 'clamp(15px, 2vw, 19px)', marginBottom: '32px', textAlign: 'center' }}
      >
        {QUIZ_DESCRIPTION}
      </p>

      <div
        style={{
          backgroundColor: '#faf9f5',
          border: '1px solid rgba(206,150,90,0.28)',
          borderRadius: '12px',
          padding: '28px 32px',
          marginBottom: '32px',
          textAlign: 'left',
          boxShadow: '0 4px 24px rgba(45,21,6,0.05)',
        }}
      >
        {QUIZ_INSTRUCTIONS.split('\n\n').map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: 'var(--font-inter-sans), sans-serif',
              color: '#45220d',
              fontSize: '15px',
              lineHeight: '1.5',
              marginBottom: i === 0 ? '12px' : 0,
            }}
          >
            {para}
          </p>
        ))}
      </div>

      <button type="button" onClick={onStart} className="btn-primary" style={{ fontSize: '15px', padding: '14px 32px' }}>
        Take the Quiz
      </button>

      <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.5)', fontSize: '12px', marginTop: '16px' }}>
        Takes about 2 minutes · 13 questions · your results, immediately
      </p>
    </div>
  );
}
