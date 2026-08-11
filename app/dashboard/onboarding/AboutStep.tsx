'use client';

import { useActionState, useEffect } from 'react';
import DashboardPanel from '@/components/DashboardPanel';
import { submitAboutStepAction, type OnboardingActionState } from './actions';
import { labelStyle, inputStyle } from './styles';

const initialState: OnboardingActionState = { error: null, nextStep: null, completed: false };

export default function AboutStep({ onAdvance }: { onAdvance: (nextStep: string | null, completed: boolean) => void }) {
  const [state, formAction, isPending] = useActionState(submitAboutStepAction, initialState);

  useEffect(() => {
    if (state.nextStep !== null || state.completed) onAdvance(state.nextStep, state.completed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction}>
      <DashboardPanel title="About You" meta="A little context for your profile">
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="bio" style={labelStyle}>Bio</label>
            <textarea id="bio" name="bio" rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div>
            <label htmlFor="location" style={labelStyle}>Location</label>
            <input id="location" name="location" type="text" placeholder="City, Country" style={inputStyle} />
          </div>
          {state.error && <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '13px' }}>{state.error}</p>}
          <button type="submit" className="btn-primary" disabled={isPending} style={{ width: 'fit-content', opacity: isPending ? 0.6 : 1 }}>
            {isPending ? 'Saving…' : 'Continue'}
          </button>
        </div>
      </DashboardPanel>
    </form>
  );
}
