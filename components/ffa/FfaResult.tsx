import { RESULT_DEV_NOTICE, RESULT_EYEBROW, RESULTS } from '@/app/lib/ffa/config';
import type { ResultType } from '@/app/lib/ffa/types';

export default function FfaResult({ primaryResult, onRestart }: { primaryResult: ResultType; onRestart: () => void }) {
  const result = RESULTS[primaryResult];
  const paragraphs = result.body.split('\n\n');

  return (
    <div className="quiz-fade-in" style={{ maxWidth: '640px', margin: '0 auto' }} data-testid="ffa-result" data-result={primaryResult}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#525421',
          }}
        >
          {RESULT_EYEBROW}
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(28px, 4.4vw, 42px)',
            lineHeight: '1.15',
            fontWeight: 400,
            marginTop: '8px',
          }}
        >
          {result.name}
        </h1>
      </div>

      <div
        style={{
          backgroundColor: '#faf9f5',
          border: '1px solid rgba(206,150,90,0.28)',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 24px rgba(45,21,6,0.05)',
        }}
      >
        {paragraphs.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: 'var(--font-inter-sans), sans-serif',
              color: '#45220d',
              fontSize: '15px',
              lineHeight: '1.6',
              marginBottom: i === paragraphs.length - 1 ? 0 : '16px',
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {process.env.NODE_ENV !== 'production' && (
        <p
          role="note"
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            color: '#525421',
            backgroundColor: '#f3e4c4',
            border: '1px solid rgba(206,150,90,0.5)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginTop: '24px',
            textAlign: 'center',
          }}
        >
          {RESULT_DEV_NOTICE}
        </p>
      )}

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <button
          type="button"
          onClick={onRestart}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-inter-sans), sans-serif',
            color: 'rgba(45,21,6,0.7)',
            fontSize: '13px',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          Retake the audit
        </button>
      </div>
    </div>
  );
}
