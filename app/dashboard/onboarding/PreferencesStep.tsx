'use client';

import { useActionState, useEffect } from 'react';
import DashboardPanel from '@/components/DashboardPanel';
import ToggleSwitch from '@/components/ToggleSwitch';
import { submitPreferencesStepAction, type OnboardingActionState } from './actions';
import { labelStyle, inputStyle } from './styles';

const initialState: OnboardingActionState = { error: null, nextStep: null, completed: false };

export default function PreferencesStep({ onAdvance }: { onAdvance: (nextStep: string | null, completed: boolean) => void }) {
  const [state, formAction, isPending] = useActionState(submitPreferencesStepAction, initialState);

  useEffect(() => {
    if (state.nextStep !== null || state.completed) onAdvance(state.nextStep, state.completed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction}>
      <DashboardPanel title="Preferences" meta="Last step — how should we reach you?">
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#2d1506', fontSize: '14px' }}>Email notifications</p>
            <ToggleSwitch defaultChecked label="Email notifications" name="email_notifications" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#2d1506', fontSize: '14px' }}>Push notifications</p>
            <ToggleSwitch defaultChecked label="Push notifications" name="push_notifications" />
          </div>
          <div>
            <label htmlFor="digest_frequency" style={labelStyle}>Digest email frequency</label>
            <select id="digest_frequency" name="digest_frequency" defaultValue="weekly" style={inputStyle}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="never">Never</option>
            </select>
          </div>
          {state.error && <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '13px' }}>{state.error}</p>}
          <button type="submit" className="btn-primary" disabled={isPending} style={{ width: 'fit-content', opacity: isPending ? 0.6 : 1 }}>
            {isPending ? 'Saving…' : 'Finish'}
          </button>
        </div>
      </DashboardPanel>
    </form>
  );
}
