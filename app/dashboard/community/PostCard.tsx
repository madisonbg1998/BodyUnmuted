import Link from 'next/link';
import type { CommunityPost } from '@/app/lib/adhara-portal';
import ReactionPicker from './ReactionPicker';

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function PostCard({ post, linkToDetail = true }: { post: CommunityPost; linkToDetail?: boolean }) {
  return (
    <div
      style={{
        backgroundColor: '#faf9f5',
        border: '1px solid rgba(206,150,90,0.28)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#e8eeba',
            color: '#525421',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-instrument-serif), serif',
            fontSize: '16px',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {post.author.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.author.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            post.author.name?.[0]?.toUpperCase() ?? '?'
          )}
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#2d1506', fontSize: '14px', fontWeight: 600 }}>
            {post.author.name}
            {post.author.is_team_member && (
              <span style={{ marginLeft: '6px', fontSize: '10px', color: '#ce965a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Team</span>
            )}
          </p>
          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.5)', fontSize: '12px' }}>{timeAgo(post.created_at)}</p>
        </div>
      </div>

      {post.title && (
        <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '17px', marginBottom: '6px' }}>{post.title}</p>
      )}
      <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
        {post.content}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px' }}>
        <ReactionPicker postId={post.id} currentReaction={post.reactions.user_reaction} total={post.reactions.total} />
        {linkToDetail && (
          <Link
            href={`/dashboard/community/posts/${post.id}`}
            style={{ fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '13px', color: '#ce965a', textDecoration: 'none' }}
          >
            {post.reply_count > 0 ? `${post.reply_count} ${post.reply_count === 1 ? 'reply' : 'replies'}` : 'Reply'}
          </Link>
        )}
      </div>
    </div>
  );
}
