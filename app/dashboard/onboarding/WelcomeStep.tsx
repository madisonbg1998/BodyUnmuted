'use client';

import { useActionState, useEffect } from 'react';
import DashboardPanel from '@/components/DashboardPanel';
import { submitWelcomeStepAction, type OnboardingActionState } from './actions';
import { labelStyle, inputStyle } from './styles';

const initialState: OnboardingActionState = { error: null, nextStep: null, completed: false };

export default function WelcomeStep({
  defaultName,
  onAdvance,
}: {
  defaultName: string | null;
  onAdvance: (nextStep: string | null, completed: boolean) => void;
}) {
  const [state, formAction, isPending] = useActionState(submitWelcomeStepAction, initialState);

  useEffect(() => {
    if (state.nextStep !== null || state.completed) onAdvance(state.nextStep, state.completed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction}>
      <DashboardPanel title="Welcome" meta="Let's get your account set up">
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="name" style={labelStyle}>Name</label>
            <input id="name" name="name" type="text" defaultValue={defaultName ?? ''} style={inputStyle} />
          </div>
          <div>
            <label htmlFor="headline" style={labelStyle}>Headline</label>
            <input id="headline" name="headline" type="text" maxLength={255} placeholder="How you'd like to be known" style={inputStyle} />
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
