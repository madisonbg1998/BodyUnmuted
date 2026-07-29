import { verifySession } from '@/app/lib/dal';
import ToggleSwitch from '@/components/ToggleSwitch';

const panelStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  border: '1px solid rgba(45,21,6,0.12)',
  borderRadius: '10px',
  overflow: 'hidden',
};

const panelHeaderStyle: React.CSSProperties = {
  padding: '20px 24px',
  borderBottom: '1px solid rgba(45,21,6,0.1)',
};

const panelTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-instrument-serif), serif',
  color: '#2d1506',
  fontSize: '20px',
  lineHeight: '1',
  fontWeight: 400,
};

const panelSubStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter-sans), sans-serif',
  color: '#45220d',
  fontSize: '13px',
  opacity: 0.7,
  marginTop: '4px',
};

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ce965a',
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

const notificationOptions = [
  { label: 'Workout reminders', defaultChecked: true },
  { label: 'Community mentions & replies', defaultChecked: true },
  { label: 'Weekly progress summary email', defaultChecked: false },
];

export default async function SettingsPage() {
  const { user } = await verifySession();
  const initial = (user.full_name?.[0] || user.email[0] || '?').toUpperCase();

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
        {/* Profile */}
        <div style={panelStyle}>
          <div style={{ ...panelHeaderStyle, display: 'flex', alignItems: 'center', gap: '16px' }}>
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
              <h2 style={panelTitleStyle}>Profile</h2>
              <p style={panelSubStyle}>Your personal details</p>
            </div>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Name</label>
              <input type="text" defaultValue={user.full_name} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" defaultValue={user.email} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input type="tel" placeholder="+1 (555) 123-4567" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Timezone</label>
              <input type="text" defaultValue={user.timezone || 'Not set'} style={inputStyle} />
            </div>
            <div>
              <button type="button" className="btn-primary" style={{ width: 'fit-content' }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <h2 style={panelTitleStyle}>Notifications</h2>
            <p style={panelSubStyle}>Choose what you hear from us about</p>
          </div>
          <div>
            {notificationOptions.map((option, i) => (
              <div
                key={option.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 24px',
                  borderBottom: i < notificationOptions.length - 1 ? '1px solid rgba(45,21,6,0.08)' : 'none',
                }}
              >
                <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#2d1506', fontSize: '14px' }}>
                  {option.label}
                </p>
                <ToggleSwitch defaultChecked={option.defaultChecked} label={option.label} />
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <h2 style={panelTitleStyle}>Security</h2>
            <p style={panelSubStyle}>Manage your password</p>
          </div>
          <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
            <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '14px', maxWidth: '360px' }}>
              We&apos;ll email you a secure link to reset your password.
            </p>
            <button type="button" className="btn-secondary" style={{ color: '#45220d', borderColor: '#45220d' }}>
              Change Password
            </button>
          </div>
        </div>

        {/* Membership */}
        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <h2 style={panelTitleStyle}>Membership</h2>
            <p style={panelSubStyle}>Your current plan</p>
          </div>
          <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '20px' }}>
                Body Reclaimed
              </p>
              <p style={panelSubStyle}>Active · renews Aug 20, 2026</p>
            </div>
            <a href="/work-with-me" className="btn-copper" style={{ textDecoration: 'none' }}>
              Manage Membership
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
