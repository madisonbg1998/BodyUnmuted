'use client';

import { useActionState } from 'react';
import { sendPasswordResetAction, type SettingsActionState } from './actions';

const initialState: SettingsActionState = { error: null, success: null };

export default function PasswordResetButton() {
  const [state, formAction, isPending] = useActionState(sendPasswordResetAction, initialState);

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
      <button
        type="submit"
        disabled={isPending}
        className="btn-secondary"
        style={{ color: '#45220d', borderColor: '#45220d', opacity: isPending ? 0.6 : 1, cursor: isPending ? 'not-allowed' : 'pointer' }}
      >
        {isPending ? 'Sending…' : 'Change Password'}
      </button>
      {state.error && <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '13px' }}>{state.error}</p>}
      {state.success && <p style={{ color: '#525421', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '13px' }}>{state.success}</p>}
    </form>
  );
}
