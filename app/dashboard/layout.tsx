import DashboardSidebar from '@/components/DashboardSidebar';
import { getSessionToken, isAuthBypassEnabled } from '@/app/lib/adhara-auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only banner when we're actually bypassing — a real logged-in session
  // (even with AUTH_BYPASS set) should look and feel like the real thing.
  const isBypassing = isAuthBypassEnabled() && !(await getSessionToken());

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <DashboardSidebar />
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
