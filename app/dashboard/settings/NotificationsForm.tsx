'use client';

import { useActionState } from 'react';
import ToggleSwitch from '@/components/ToggleSwitch';
import { updateNotificationPreferencesAction, type SettingsActionState } from './actions';

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '18px 24px',
  borderBottom: '1px solid rgba(45,21,6,0.08)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#45220d',
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: '8px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#fff',
  border: '1px solid rgba(45,21,6,0.2)',
  borderRadius: '4px',
  padding: '10px 14px',
  color: '#2d1506',
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontSize: '14px',
};

const initialState: SettingsActionState = { error: null, success: null };

// Adhara has no dedicated "read my saved preferences" endpoint — only the
// write side (onboarding/preferences). Toggles default on / digest defaults
// to weekly; the last value saved here is what takes effect going forward.
export default function NotificationsForm() {
  const [state, formAction, isPending] = useActionState(updateNotificationPreferencesAction, initialState);

  return (
    <form action={formAction}>
      <div style={rowStyle}>
        <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#2d1506', fontSize: '14px' }}>Email notifications</p>
        <ToggleSwitch defaultChecked label="Email notifications" name="email_notifications" />
      </div>
      <div style={rowStyle}>
        <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#2d1506', fontSize: '14px' }}>Push notifications</p>
        <ToggleSwitch defaultChecked label="Push notifications" name="push_notifications" />
      </div>
      <div style={{ padding: '18px 24px' }}>
        <label htmlFor="digest_frequency" style={labelStyle}>Digest email frequency</label>
        <select id="digest_frequency" name="digest_frequency" defaultValue="weekly" style={inputStyle}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="never">Never</option>
        </select>
      </div>
      <div style={{ padding: '0 24px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button type="submit" className="btn-primary" disabled={isPending} style={{ opacity: isPending ? 0.6 : 1, cursor: isPending ? 'not-allowed' : 'pointer' }}>
          {isPending ? 'Saving…' : 'Save Preferences'}
        </button>
        {state.error && <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '13px' }}>{state.error}</p>}
        {state.success && <p style={{ color: '#525421', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '13px' }}>{state.success}</p>}
      </div>
    </form>
  );
}
