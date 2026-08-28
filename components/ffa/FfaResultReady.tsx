import { POPUP_HEADING, POPUP_REOPEN_BUTTON } from '@/app/lib/ffa/config';

/**
 * Shown when she's answered all 12 questions and closed the email popup
 * without submitting. Per spec: "return to completed Question 12 with a
 * See my result button that reopens it" — this is that screen. Her result
 * has already been computed (see app/lib/ffa/scoring.ts) but stays hidden
 * until the popup is reopened and the mock submission succeeds.
 */
export default function FfaResultReady({ onReopen, onRestart }: { onReopen: () => void; onRestart: () => void }) {
  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }} className="quiz-fade-in">
      <h1
        style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          color: '#2d1506',
          fontSize: 'clamp(26px, 4vw, 36px)',
          lineHeight: '1.15',
          fontWeight: 400,
          marginBottom: '16px',
        }}
      >
        {POPUP_HEADING}
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-inter-sans), sans-serif',
          color: '#45220d',
          fontSize: '15px',
          lineHeight: '1.6',
          marginBottom: '28px',
        }}
      >
        You’ve finished all 12 questions. Enter your name and email to see your Freedom Fitness type.
      </p>
      <button type="button" onClick={onReopen} className="btn-primary" style={{ fontSize: '15px', padding: '14px 32px' }}>
        {POPUP_REOPEN_BUTTON}
      </button>

      <div style={{ marginTop: '20px' }}>
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
          Start over
        </button>
      </div>
    </div>
  );
}
