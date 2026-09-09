import { redirect } from 'next/navigation';
import { verifySession } from '@/app/lib/dal';
import { getOrCreateAppUser } from '@/app/lib/db/users';
import { getClientsForCoach, getClientWithData } from '@/app/lib/roadmaps';
import { RosterBar } from '@/components/roadmap/RosterBar';
import { ClientEmailField } from '@/components/roadmap/ClientEmailField';
import { RoadmapWorkspace } from '@/components/roadmap/RoadmapWorkspace';

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
  const appUser = await getOrCreateAppUser(user);
  if (appUser.role !== 'coach') redirect('/dashboard/roadmap');

  const clients = await getClientsForCoach(appUser.id);
  const { client: clientParam } = await searchParams;
  const activeClientId = clientParam && clients.some((c) => c.id === clientParam) ? clientParam : clients[0]?.id;
  const activeClientWithData = activeClientId ? await getClientWithData(appUser.id, activeClientId) : null;

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
    </div>
  );
}
