import Link from 'next/link';
import { getSessionToken } from '@/app/lib/adhara-auth';
import { fetchCommunitySpaces, fetchSpacePosts } from '@/app/lib/adhara-portal';
import { verifySession } from '@/app/lib/dal';
import DashboardPanel from '@/components/DashboardPanel';
import EmptyState from '@/components/EmptyState';
import SpaceTabs from './SpaceTabs';
import CreatePostForm from './CreatePostForm';
import PostCard from './PostCard';

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ce965a',
};

function PeopleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.5 14c2.9.3 5.5 2.6 5.5 6" strokeLinecap="round" />
    </svg>
  );
}

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ space?: string; cursor?: string }>;
}) {
  await verifySession();
  const { space: spaceIdParam, cursor } = await searchParams;
  const sessionToken = await getSessionToken();
  const spaces = sessionToken ? await fetchCommunitySpaces(sessionToken) : [];
  const activeSpace = spaces.find((s) => s.id === spaceIdParam) ?? spaces[0] ?? null;

  const { posts, hasMore, nextCursor } =
    activeSpace && sessionToken ? await fetchSpacePosts(sessionToken, activeSpace.id, cursor) : { posts: [], hasMore: false, nextCursor: null };

  return (
    <div style={{ padding: '48px 48px 64px' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={eyebrowStyle}>Connect</p>
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: '1',
            fontWeight: 400,
          }}
        >
          Community
        </h1>
      </div>

      {spaces.length === 0 ? (
        <div style={{ maxWidth: '700px' }}>
          <DashboardPanel>
            <EmptyState icon={<PeopleIcon />} title="No community spaces yet" description="Once spaces are set up, you'll be able to post and connect with other members here." />
          </DashboardPanel>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          <SpaceTabs spaces={spaces} activeSpaceId={activeSpace?.id} />

          <div style={{ flex: 1, maxWidth: '640px' }}>
            {activeSpace && (
              <>
                {activeSpace.can_post && <CreatePostForm spaceId={activeSpace.id} />}

                {posts.length === 0 ? (
                  <DashboardPanel>
                    <EmptyState title="No posts yet" description="Be the first to share something in this space." />
                  </DashboardPanel>
                ) : (
                  <>
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                    {hasMore && nextCursor && (
                      <div style={{ textAlign: 'center', marginTop: '8px' }}>
                        <Link
                          href={`/dashboard/community?space=${activeSpace.id}&cursor=${encodeURIComponent(nextCursor)}`}
                          className="btn-secondary"
                          style={{ color: '#45220d', borderColor: '#45220d', textDecoration: 'none' }}
                        >
                          Older Posts →
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
