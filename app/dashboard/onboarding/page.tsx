import { getSessionToken } from '@/app/lib/adhara-auth';
import { fetchOnboardingStatus } from '@/app/lib/adhara-portal';
import { verifySession } from '@/app/lib/dal';
import DashboardPanel from '@/components/DashboardPanel';
import OnboardingWizard from './OnboardingWizard';
import OnboardingComplete from './OnboardingComplete';

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ce965a',
};

export default async function OnboardingPage() {
  const { user } = await verifySession();
  const sessionToken = await getSessionToken();
  const status = sessionToken ? await fetchOnboardingStatus(sessionToken) : null;

  return (
    <div style={{ padding: '48px 48px 64px' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={eyebrowStyle}>Getting Started</p>
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: '1',
            fontWeight: 400,
          }}
        >
          My Onboarding
        </h1>
      </div>

      {status ? (
        <OnboardingWizard status={status} userName={user.name} />
      ) : user.onboarding_completed ? (
        <OnboardingComplete />
      ) : (
        <div style={{ maxWidth: '560px' }}>
          <DashboardPanel>
            <p style={{ padding: '24px', fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '14px' }}>
              We couldn&apos;t load your onboarding status. Try refreshing the page.
            </p>
          </DashboardPanel>
        </div>
      )}
    </div>
  );
}
