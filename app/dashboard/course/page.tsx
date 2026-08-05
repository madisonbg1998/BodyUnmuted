import Link from 'next/link';
import { verifySession } from '@/app/lib/dal';

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ce965a',
};

const panelStyle: React.CSSProperties = {
  backgroundColor: '#faf9f5',
  border: '1px solid rgba(206,150,90,0.28)',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(45,21,6,0.05)',
};

// Static demo state — she's in week 3, so modules 1–3 are unlocked.
const CURRENT_WEEK = 3;

const modules = [
  { title: 'Your Body Isn’t a Problem to Solve' },
  { title: 'How Your Body Actually Changes' },
  { title: 'Inside the Set' },
  { title: 'Reading Your Own Training Data' },
  { title: 'Calories 101' },
  { title: 'Macronutrients Decoded', subtitle: 'Including alcohol and social eating' },
  { title: 'The Nutrients That Support the Work', subtitle: 'Including creatine and supplements' },
  { title: 'Nutrition Through Your Training Phases', subtitle: 'Build, cut, maintenance, and why macros change' },
  { title: 'Recovery, Sleep & Stress' },
  { title: 'Knowing When to Adjust—and When to Stay the Course' },
  { title: 'Travel, Setbacks & Staying the Course' },
  { title: 'Becoming Your Own Expert' },
].map((m, i) => ({ ...m, week: i + 1 }));

const unlockedCount = modules.filter((m) => m.week <= CURRENT_WEEK).length;

function LockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M7 10V7a5 5 0 0 1 10 0v3" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4.5v15l13-7.5-13-7.5Z" />
    </svg>
  );
}

export default async function CoursePage() {
  await verifySession();

  return (
    <div style={{ padding: '48px 48px 64px' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={eyebrowStyle}>The Body Literacy Course</p>
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: '1',
            fontWeight: 400,
            marginBottom: '10px',
          }}
        >
          Your Course
        </h1>
        <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.6)', fontSize: '14px' }}>
          {unlockedCount} of {modules.length} lessons unlocked · a new one opens up each week
        </p>
      </div>

      <div style={{ maxWidth: '800px' }}>
        <div style={panelStyle}>
          {modules.map((m, i) => {
            const isUnlocked = m.week <= CURRENT_WEEK;
            const isLast = i === modules.length - 1;

            return (
              <div
                key={m.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  padding: '20px 24px',
                  borderBottom: isLast ? 'none' : '1px solid rgba(45,21,6,0.08)',
                  opacity: isUnlocked ? 1 : 0.55,
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isUnlocked ? '#e8eeba' : 'rgba(45,21,6,0.08)',
                    color: isUnlocked ? '#525421' : '#45220d',
                    fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {isUnlocked ? String(m.week).padStart(2, '0') : <LockIcon />}
                </div>

                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#ce965a',
                      marginBottom: '2px',
                    }}
                  >
                    Week {String(m.week).padStart(2, '0')}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-instrument-serif), serif',
                      color: '#2d1506',
                      fontSize: '19px',
                      lineHeight: '1.2',
                    }}
                  >
                    {m.title}
                  </p>
                  {m.subtitle && (
                    <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '13px', opacity: 0.75, marginTop: '2px' }}>
                      {m.subtitle}
                    </p>
                  )}
                </div>

                {isUnlocked ? (
                  <Link
                    href="#"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      flexShrink: 0,
                      fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: '#525421',
                      textDecoration: 'none',
                      border: '1px solid #525421',
                      borderRadius: '999px',
                      padding: '8px 16px',
                    }}
                  >
                    <PlayIcon /> Start
                  </Link>
                ) : (
                  <p
                    style={{
                      flexShrink: 0,
                      fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
                      fontSize: '12px',
                      color: 'rgba(45,21,6,0.5)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Unlocks week {m.week}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
