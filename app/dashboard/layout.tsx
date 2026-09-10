import DashboardSidebar from '@/components/DashboardSidebar';
import { getSessionToken, isAuthBypassEnabled } from '@/app/lib/adhara-auth';
import { fetchPortalFeatures } from '@/app/lib/adhara-portal';
import { verifySession } from '@/app/lib/dal';
import { getOrCreateAppUser } from '@/app/lib/db/users';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only banner when we're actually bypassing — a real logged-in session
  // (even with AUTH_BYPASS set) should look and feel like the real thing.
  const isBypassing = isAuthBypassEnabled() && !(await getSessionToken());
  const [features, { user }] = await Promise.all([fetchPortalFeatures(), verifySession()]);

  // The roadmap tool's DB is a separate dependency from Adhara. If it's
  // unreachable or unconfigured, degrade to hiding the roadmap nav link
  // rather than breaking every other dashboard page (courses, community,
  // etc.) that has nothing to do with it.
  let role: 'coach' | 'member' = 'member';
  try {
    role = (await getOrCreateAppUser(user)).role as 'coach' | 'member';
  } catch (error) {
    console.error('Roadmap DB unavailable, hiding roadmap nav link', error);
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <DashboardSidebar features={features} role={role} />
      <main style={{ flex: 1, backgroundColor: '#fbf4e9' }}>
        {isBypassing && (
          <div
            style={{
              backgroundColor: '#b3261e',
              color: '#fff',
              textAlign: 'center',
              padding: '8px 16px',
              fontFamily: 'var(--font-inter-sans), sans-serif',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            Preview mode — viewing without a real login (AUTH_BYPASS). This is not a real account.
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
