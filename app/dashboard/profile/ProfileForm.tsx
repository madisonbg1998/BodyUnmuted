'use client';

import { useActionState } from 'react';
import DashboardPanel from '@/components/DashboardPanel';
import type { AdharaCustomer } from '@/app/lib/adhara-auth';
import { updateProfileAction, type ProfileActionState } from './actions';

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

const initialState: ProfileActionState = { error: null, success: false };

export default function ProfileForm({ user }: { user: AdharaCustomer }) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialState);
  const social = user.social_links ?? {};

  return (
    <form action={formAction} style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <DashboardPanel title="Public Profile" meta="Shown in the member directory, if enabled">
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="name" style={labelStyle}>Name</label>
            <input id="name" name="name" type="text" defaultValue={user.name ?? ''} style={inputStyle} />
          </div>
          <div>
            <label htmlFor="headline" style={labelStyle}>Headline</label>
            <input
              id="headline"
              name="headline"
              type="text"
              maxLength={255}
              defaultValue={user.headline ?? ''}
              placeholder="e.g. Founder at my own business"
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="avatar_url" style={labelStyle}>Avatar URL</label>
            <input
              id="avatar_url"
              name="avatar_url"
              type="url"
              defaultValue={user.avatar_url ?? ''}
              placeholder="https://…"
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="bio" style={labelStyle}>Bio</label>
            <textarea id="bio" name="bio" rows={4} defaultValue={user.bio ?? ''} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div>
            <label htmlFor="location" style={labelStyle}>Location</label>
            <input id="location" name="location" type="text" defaultValue={user.location ?? ''} style={inputStyle} />
          </div>
        </div>
      </DashboardPanel>

      <DashboardPanel title="Social Links">
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="social_instagram" style={labelStyle}>Instagram</label>
            <input id="social_instagram" name="social_instagram" type="text" defaultValue={social.instagram ?? ''} placeholder="@handle or URL" style={inputStyle} />
          </div>
          <div>
            <label htmlFor="social_twitter" style={labelStyle}>X / Twitter</label>
            <input id="social_twitter" name="social_twitter" type="text" defaultValue={social.twitter ?? ''} placeholder="@handle or URL" style={inputStyle} />
          </div>
          <div>
            <label htmlFor="social_linkedin" style={labelStyle}>LinkedIn</label>
            <input id="social_linkedin" name="social_linkedin" type="text" defaultValue={social.linkedin ?? ''} placeholder="URL" style={inputStyle} />
          </div>
          <div>
            <label htmlFor="social_website" style={labelStyle}>Website</label>
            <input id="social_website" name="social_website" type="text" defaultValue={social.website ?? ''} placeholder="URL" style={inputStyle} />
          </div>
        </div>
      </DashboardPanel>

      <DashboardPanel title="Visibility">
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="profile_visibility" style={labelStyle}>Who can see this profile</label>
            <select
              id="profile_visibility"
              name="profile_visibility"
              defaultValue={user.profile_visibility ?? 'public'}
              style={inputStyle}
            >
              <option value="public">Everyone</option>
              <option value="members">Other members only</option>
              <option value="private">Only me</option>
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '14px', color: '#2d1506' }}>
            <input
              type="checkbox"
              name="show_in_directory"
              defaultChecked={user.show_in_directory ?? true}
              style={{ width: '16px', height: '16px' }}
            />
            Show me in the member directory
          </label>
        </div>
      </DashboardPanel>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button type="submit" className="btn-primary" disabled={isPending} style={{ opacity: isPending ? 0.6 : 1, cursor: isPending ? 'not-allowed' : 'pointer' }}>
          {isPending ? 'Saving…' : 'Save Changes'}
        </button>
        {state.error && <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '14px' }}>{state.error}</p>}
        {state.success && <p style={{ color: '#525421', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '14px' }}>Saved.</p>}
      </div>
    </form>
  );
}
