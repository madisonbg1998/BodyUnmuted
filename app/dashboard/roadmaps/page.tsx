import { redirect } from 'next/navigation';
import { verifySession } from '@/app/lib/dal';
import { getOrCreateAppUser } from '@/app/lib/db/users';
import { getClientsForCoach, getClientWithData } from '@/app/lib/roadmaps';
import type { RosterClient } from '@/app/lib/roadmap/types';
import { RosterBar } from '@/components/roadmap/RosterBar';
import { ClientEmailField } from '@/components/roadmap/ClientEmailField';
import { RoadmapWorkspace } from '@/components/roadmap/RoadmapWorkspace';
import { DbUnavailable } from '@/components/roadmap/DbUnavailable';

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ce965a',
};

export default async function RoadmapsPage({ searchParams }: { searchParams: Promise<{ client?: string }> }) {
  const { user } = await verifySession();

  let dbUnavailable = false;
  let role: 'coach' | 'member' = 'coach';
  let clients: RosterClient[] = [];
  let activeClientId: string | undefined;
  let activeClientWithData: Awaited<ReturnType<typeof getClientWithData>> = null;

  try {
    const appUser = await getOrCreateAppUser(user);
    role = appUser.role as 'coach' | 'member';
    if (role === 'coach') {
      clients = await getClientsForCoach(appUser.id);
      const { client: clientParam } = await searchParams;
      activeClientId = clientParam && clients.some((c) => c.id === clientParam) ? clientParam : clients[0]?.id;
      activeClientWithData = activeClientId ? await getClientWithData(appUser.id, activeClientId) : null;
    }
  } catch (error) {
    dbUnavailable = true;
    console.error('Roadmap DB unavailable', error);
  }

  if (!dbUnavailable && role !== 'coach') redirect('/dashboard/roadmap');

  return (
    <div style={{ padding: '48px 48px 64px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={eyebrowStyle}>Coach Tool</p>
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: '1',
            fontWeight: 400,
          }}
        >
          Transformation Roadmaps
        </h1>
        <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.55)', fontSize: '14px', marginTop: '8px' }}>
          Plan, adjust, and visualize each client&apos;s journey alongside their life.
        </p>
      </div>

      {dbUnavailable ? (
        <DbUnavailable />
      ) : (
        <div className="flex flex-col gap-5">
          <RosterBar clients={clients} activeClientId={activeClientId ?? ''} />

          {activeClientWithData ? (
            <>
              <ClientEmailField
                key={`email-${activeClientWithData.client.id}`}
                clientId={activeClientWithData.client.id}
                email={activeClientWithData.client.email}
                linked={activeClientWithData.client.linked}
              />
              <RoadmapWorkspace
                key={`workspace-${activeClientWithData.client.id}`}
                clientId={activeClientWithData.client.id}
                initialData={activeClientWithData.data}
              />
            </>
          ) : (
            <p className="rounded-md border border-dashed border-border-warm p-8 text-center text-sm text-stone">
              Add your first client above to start building a roadmap.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
