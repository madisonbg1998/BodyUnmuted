import { verifySession } from '@/app/lib/dal';
import DashboardGreeting from '@/components/DashboardGreeting';
import MacroRing from '@/components/MacroRing';

const panelStyle: React.CSSProperties = {
  backgroundColor: '#faf9f5',
  border: '1px solid rgba(206,150,90,0.28)',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(45,21,6,0.05)',
};

const panelHeaderStyle: React.CSSProperties = {
  padding: '20px 24px',
  borderBottom: '1px solid rgba(45,21,6,0.1)',
};

const panelTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-instrument-serif), serif',
  color: '#2d1506',
  fontSize: '22px',
  lineHeight: '1',
  fontWeight: 400,
};

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ce965a',
};

const panelMetaStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter-sans), sans-serif',
  color: 'rgba(45,21,6,0.55)',
  fontSize: '13px',
  marginTop: '4px',
};

type BadgeTone = 'olive' | 'gold' | 'brown';

const badgeTones: Record<BadgeTone, { bg: string; fg: string }> = {
  olive: { bg: '#e8eeba', fg: '#525421' },
  gold: { bg: 'rgba(206,150,90,0.2)', fg: '#a06a2e' },
  brown: { bg: 'rgba(69,34,13,0.1)', fg: '#45220d' },
};

function rowIconStyle(tone: BadgeTone): React.CSSProperties {
  return {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: badgeTones[tone].bg,
    color: badgeTones[tone].fg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };
}

const rowLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#ce965a',
  marginBottom: '2px',
};

const rowTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-instrument-serif), serif',
  color: '#2d1506',
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: '1.3',
};

const rowSubStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter-sans), sans-serif',
  color: '#45220d',
  fontSize: '13px',
  opacity: 0.75,
  marginTop: '2px',
};

function Row({
  icon,
  tone,
  label,
  title,
  sub,
  isLast,
}: {
  icon: React.ReactNode;
  tone: BadgeTone;
  label: string;
  title: string;
  sub: string;
  isLast?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        padding: '18px 24px',
        borderBottom: isLast ? 'none' : '1px solid rgba(45,21,6,0.08)',
      }}
    >
      <div style={rowIconStyle(tone)}>{icon}</div>
      <div>
        <p style={rowLabelStyle}>{label}</p>
        <p style={rowTitleStyle}>{title}</p>
        <p style={rowSubStyle}>{sub}</p>
      </div>
    </div>
  );
}

const icons = {
  workout: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6.5 7v10M4 9v6M17.5 7v10M20 9v6M6.5 12h11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  goal: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
    </svg>
  ),
  habit: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3c3 3.5 6 7 6 10.5a6 6 0 1 1-12 0C6 10 9 6.5 12 3Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  course: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 6.5C10.5 5.3 8 4.5 4 4.5v13c4 0 6.5.8 8 2 1.5-1.2 4-2 8-2v-13c-4 0-6.5.8-8 2Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6.5v13" strokeLinecap="round" />
    </svg>
  ),
  call: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 5c0 8 7 15 15 15l3-4-6-3-2 2c-2-1-4-3-5-5l2-2-3-6-4 3Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  mention: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4" />
      <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-4 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pod: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.5 14c2.9.3 5.5 2.6 5.5 6" strokeLinecap="round" />
    </svg>
  ),
  kudos: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20s-7-4.4-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const macros = [
  { label: 'Calories', value: 1540, target: 1700, unit: '' },
  { label: 'Protein', value: 112, target: 130, unit: 'g' },
  { label: 'Carbs', value: 148, target: 160, unit: 'g' },
  { label: 'Fat', value: 48, target: 55, unit: 'g' },
];

export default async function DashboardPage() {
  const { user } = await verifySession();
  const firstName = user.name?.split(' ')[0] || 'there';

  return (
    <div style={{ padding: '48px 48px 64px' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={eyebrowStyle}>Your Dashboard</p>
        <DashboardGreeting firstName={firstName} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '1100px', marginBottom: '24px' }}>
        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <h2 style={panelTitleStyle}>To Do</h2>
            <p style={panelMetaStyle}>5 open</p>
          </div>
          <Row icon={icons.workout} tone="olive" label="Workout" title="Upper body strength" sub="4 exercises · ~40 minutes" />
          <Row icon={icons.goal} tone="gold" label="Goal" title="Lose 1% body fat this month" sub="On track · 0.4% so far" />
          <Row icon={icons.habit} tone="brown" label="Habit" title="Drink 100oz of water" sub="Logged 60oz today" />
          <Row icon={icons.course} tone="olive" label="Course" title="Watch Module 3: Mindset Reset" sub="12 minutes · not started" />
          <Row icon={icons.call} tone="olive" label="Call" title="Monthly check-in call" sub="Friday at 2:00 PM" isLast />
        </div>

        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <h2 style={panelTitleStyle}>Community</h2>
            <p style={panelMetaStyle}>6 new</p>
          </div>
          <Row icon={icons.mention} tone="gold" label="Mentions" title="2 mentions" sub="You were tagged in the #wins channel" />
          <Row icon={icons.pod} tone="brown" label="Pod" title="3 messages in your pod" sub="Accountability Pod 4" />
          <Row icon={icons.kudos} tone="gold" label="Reactions" title="1 new reaction" sub="On your check-in post" isLast />
        </div>
      </div>

      <div style={{ maxWidth: '1100px' }}>
        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <h2 style={panelTitleStyle}>Today&apos;s Macros</h2>
            <p style={panelMetaStyle}>Synced from Trainerize once that&apos;s connected.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '24px', padding: '32px 24px' }}>
            {macros.map((m) => (
              <MacroRing key={m.label} label={m.label} value={m.value} target={m.target} unit={m.unit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
