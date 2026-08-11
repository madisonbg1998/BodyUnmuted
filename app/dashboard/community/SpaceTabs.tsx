import Link from 'next/link';
import type { CommunitySpace } from '@/app/lib/adhara-portal';

export default function SpaceTabs({ spaces, activeSpaceId }: { spaces: CommunitySpace[]; activeSpaceId?: string }) {
  return (
    <nav style={{ width: '220px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {spaces.map((space) => {
        const isActive = space.id === activeSpaceId;
        return (
          <Link
            key={space.id}
            href={`/dashboard/community?space=${space.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '6px',
              textDecoration: 'none',
              backgroundColor: isActive ? 'rgba(206,150,90,0.15)' : 'transparent',
              color: isActive ? '#2d1506' : '#45220d',
              fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
              fontSize: '13px',
              fontWeight: isActive ? 600 : 500,
            }}
          >
            <span>
              {space.emoji ? `${space.emoji} ` : ''}
              {space.name}
            </span>
            {space.post_count > 0 && (
              <span style={{ fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '11px', color: 'rgba(45,21,6,0.45)' }}>{space.post_count}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
