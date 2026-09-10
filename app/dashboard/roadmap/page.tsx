import { redirect } from 'next/navigation';
import { verifySession } from '@/app/lib/dal';
import { getOrCreateAppUser } from '@/app/lib/db/users';
import { getClientForMember } from '@/app/lib/roadmaps';
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

export default async function MyRoadmapPage() {
  const { user } = await verifySession();

  let dbUnavailable = false;
  let role: 'coach' | 'member' = 'member';
  let clientWithData: Awaited<ReturnType<typeof getClientForMember>> = null;

  try {
    const appUser = await getOrCreateAppUser(user);
    role = appUser.role as 'coach' | 'member';
    if (role === 'member') clientWithData = await getClientForMember(appUser.id);
  } catch (error) {
    dbUnavailable = true;
    console.error('Roadmap DB unavailable', error);
  }

  if (!dbUnavailable && role === 'coach') redirect('/dashboard/roadmaps');

  return (
    <div style={{ padding: '48px 48px 64px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={eyebrowStyle}>Your Coach&apos;s Plan For You</p>
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: '1',
            fontWeight: 400,
          }}
        >
          My Roadmap
        </h1>
        <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.55)', fontSize: '14px', marginTop: '8px' }}>
          A view-only look at the transformation roadmap your coach has built for you.
        </p>
      </div>

      {dbUnavailable ? (
        <DbUnavailable />
      ) : clientWithData ? (
        <RoadmapWorkspace clientId={clientWithData.client.id} initialData={clientWithData.data} readOnly />
      ) : (
        <p className="rounded-md border border-dashed border-border-warm p-8 text-center text-sm text-stone">
          Your coach hasn&apos;t linked a roadmap to your account yet. Once they add your email to your roster
          entry, it will show up here automatically.
        </p>
      )}
    </div>
  );
}
