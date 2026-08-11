import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSessionToken } from '@/app/lib/adhara-auth';
import { fetchPostDetail } from '@/app/lib/adhara-portal';
import { verifySession } from '@/app/lib/dal';
import PostCard from '@/app/dashboard/community/PostCard';
import ReplyForm from './ReplyForm';

export default async function PostDetailPage({ params }: { params: Promise<{ postId: string }> }) {
  await verifySession();
  const { postId } = await params;
  const sessionToken = await getSessionToken();
  const post = sessionToken ? await fetchPostDetail(sessionToken, postId) : null;

  if (!post) notFound();

  return (
    <div style={{ padding: '48px 48px 64px' }}>
      <Link
        href="/dashboard/community"
        style={{ fontFamily: 'var(--font-ibm-plex-sans), sans-serif', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ce965a', textDecoration: 'none' }}
      >
        ← Community
      </Link>

      <div style={{ maxWidth: '640px', marginTop: '20px' }}>
        <PostCard post={post} linkToDetail={false} />

        {post.replies.length > 0 && (
          <div style={{ paddingLeft: '20px', borderLeft: '2px solid rgba(206,150,90,0.28)' }}>
            {post.replies.map((reply) => (
              <PostCard key={reply.id} post={reply} linkToDetail={false} />
            ))}
          </div>
        )}

        <ReplyForm postId={post.id} />
      </div>
    </div>
  );
}
