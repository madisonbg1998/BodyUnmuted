'use client';

import { useActionState, useState } from 'react';
import { deleteAccountAction, type SettingsActionState } from './actions';

const inputStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  border: '1px solid rgba(45,21,6,0.2)',
  borderRadius: '4px',
  padding: '10px 14px',
  color: '#2d1506',
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontSize: '14px',
  width: '160px',
};

const initialState: SettingsActionState = { error: null, success: null };

export default function DeleteAccountForm() {
  const [confirming, setConfirming] = useState(false);
  const [state, formAction, isPending] = useActionState(deleteAccountAction, initialState);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        style={{
          background: 'none',
          border: '1px solid #b3261e',
          color: '#b3261e',
          borderRadius: '3px',
          padding: '10px 16px',
          fontFamily: 'var(--font-inter-sans), sans-serif',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          cursor: 'pointer',
        }}
      >
        Delete Account
      </button>
    );
  }

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '360px' }}>
      <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#b3261e', fontSize: '13px' }}>
        This permanently deletes your account and can&apos;t be undone. Type <strong>DELETE</strong> to confirm.
      </p>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input name="confirm" type="text" placeholder="DELETE" style={inputStyle} />
        <button
          type="submit"
          disabled={isPending}
          style={{
            background: '#b3261e',
            border: 'none',
            color: '#fff',
            borderRadius: '3px',
            padding: '10px 16px',
            fontFamily: 'var(--font-inter-sans), sans-serif',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            cursor: isPending ? 'not-allowed' : 'pointer',
            opacity: isPending ? 0.6 : 1,
          }}
        >
          {isPending ? 'Deleting…' : 'Confirm Delete'}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          style={{ background: 'none', border: 'none', color: 'rgba(45,21,6,0.6)', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Cancel
        </button>
      </div>
      {state.error && <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '13px' }}>{state.error}</p>}
    </form>
  );
}
