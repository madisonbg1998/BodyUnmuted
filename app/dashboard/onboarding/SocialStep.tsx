'use client';

import { useActionState, useEffect } from 'react';
import DashboardPanel from '@/components/DashboardPanel';
import { submitSocialStepAction, type OnboardingActionState } from './actions';
import { labelStyle, inputStyle } from './styles';

const initialState: OnboardingActionState = { error: null, nextStep: null, completed: false };

export default function SocialStep({ onAdvance }: { onAdvance: (nextStep: string | null, completed: boolean) => void }) {
  const [state, formAction, isPending] = useActionState(submitSocialStepAction, initialState);

  useEffect(() => {
    if (state.nextStep !== null || state.completed) onAdvance(state.nextStep, state.completed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction}>
      <DashboardPanel title="Social Links" meta="Optional — add any you'd like to share">
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="social_instagram" style={labelStyle}>Instagram</label>
            <input id="social_instagram" name="social_instagram" type="text" placeholder="@handle or URL" style={inputStyle} />
          </div>
          <div>
            <label htmlFor="social_twitter" style={labelStyle}>X / Twitter</label>
            <input id="social_twitter" name="social_twitter" type="text" placeholder="@handle or URL" style={inputStyle} />
          </div>
          <div>
            <label htmlFor="social_linkedin" style={labelStyle}>LinkedIn</label>
            <input id="social_linkedin" name="social_linkedin" type="text" placeholder="URL" style={inputStyle} />
          </div>
          <div>
            <label htmlFor="social_website" style={labelStyle}>Website</label>
            <input id="social_website" name="social_website" type="text" placeholder="URL" style={inputStyle} />
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
