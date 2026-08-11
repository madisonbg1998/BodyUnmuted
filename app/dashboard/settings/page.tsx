import Link from 'next/link';
import { verifySession } from '@/app/lib/dal';
import { getSessionToken } from '@/app/lib/adhara-auth';
import { fetchMemberships } from '@/app/lib/adhara-portal';
import DashboardPanel from '@/components/DashboardPanel';
import NotificationsForm from './NotificationsForm';
import PasswordResetButton from './PasswordResetButton';
import DeleteAccountForm from './DeleteAccountForm';

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ce965a',
};

const panelSubStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter-sans), sans-serif',
  color: '#45220d',
  fontSize: '13px',
  opacity: 0.7,
  marginTop: '4px',
};

function formatDate(iso: string | null | undefined) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default async function SettingsPage() {
  const { user } = await verifySession();
  const sessionToken = await getSessionToken();
  const initial = (user.name?.[0] || user.email[0] || '?').toUpperCase();
  const { currentTier, memberships } = sessionToken
    ? await fetchMemberships(sessionToken)
    : { currentTier: null, memberships: [] };
  const activeMembership = memberships.find((m) => m.tier.id === currentTier?.id) ?? memberships[0] ?? null;

  return (
    <div style={{ padding: '48px 48px 64px' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={eyebrowStyle}>Your Account</p>
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: '1',
            fontWeight: 400,
          }}
        >
          Account Settings
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px' }}>
        {/* Account */}
        <DashboardPanel
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: '#e8eeba',
                  color: '#525421',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontSize: '24px',
                  flexShrink: 0,
                }}
              >
                {initial}
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '20px' }}>{user.name ?? user.email}</p>
                <p style={panelSubStyle}>{user.email}</p>
              </div>
            </div>
          }
        >
          <div style={{ padding: '0 24px 24px' }}>
            <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '14px', marginBottom: '16px' }}>
              Name, bio, and other public details live on your profile.
            </p>
            <Link href="/dashboard/profile" className="btn-secondary" style={{ color: '#45220d', borderColor: '#45220d', textDecoration: 'none', display: 'inline-block' }}>
              Edit Profile
            </Link>
          </div>
        </DashboardPanel>

        {/* Notifications */}
        <DashboardPanel title="Notifications" meta="Choose what you hear from us about">
          <NotificationsForm />
        </DashboardPanel>

        {/* Security */}
        <DashboardPanel title="Security" meta="Manage your password">
          <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
            <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '14px', maxWidth: '360px' }}>
              We&apos;ll email you a secure link to reset your password.
            </p>
            <PasswordResetButton />
          </div>
        </DashboardPanel>

        {/* Membership */}
        <DashboardPanel title="Membership" meta="Your current plan">
          <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
            {activeMembership ? (
              <div>
                <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '20px' }}>
                  {activeMembership.tier.name}
                </p>
                <p style={panelSubStyle}>
                  {activeMembership.status === 'active' ? 'Active' : activeMembership.status}
                  {activeMembership.is_trial && ' · Trial'}
                  {activeMembership.expires_at && ` · renews ${formatDate(activeMembership.expires_at)}`}
                </p>
              </div>
            ) : (
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '14px' }}>
                No active membership yet.
              </p>
            )}
            <a href="/work-with-me" className="btn-copper" style={{ textDecoration: 'none' }}>
              Manage Membership
            </a>
          </div>
        </DashboardPanel>

        {/* Danger Zone */}
        <DashboardPanel title="Danger Zone" meta="Permanently delete your account">
          <div style={{ padding: '24px' }}>
            <DeleteAccountForm />
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
}
