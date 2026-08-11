'use client';

import { useActionState, useEffect } from 'react';
import { skipOnboardingAction, type OnboardingActionState } from './actions';

const initialState: OnboardingActionState = { error: null, nextStep: null, completed: false };

export default function SkipOnboardingButton({ onSkip }: { onSkip: () => void }) {
  const [state, formAction, isPending] = useActionState(skipOnboardingAction, initialState);

  useEffect(() => {
    if (state.completed) onSkip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} style={{ marginTop: '16px', textAlign: 'center' }}>
      <button
        type="submit"
        disabled={isPending}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(45,21,6,0.5)',
          fontFamily: 'var(--font-inter-sans), sans-serif',
          fontSize: '13px',
          textDecoration: 'underline',
          cursor: isPending ? 'not-allowed' : 'pointer',
        }}
      >
        {isPending ? 'Skipping…' : "Skip for now"}
      </button>
      {state.error && <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '12px', marginTop: '4px' }}>{state.error}</p>}
    </form>
  );
}
