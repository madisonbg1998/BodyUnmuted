import { getSessionToken } from '@/app/lib/adhara-auth';
import { fetchResources } from '@/app/lib/adhara-portal';
import { verifySession } from '@/app/lib/dal';
import DashboardPanel from '@/components/DashboardPanel';
import EmptyState from '@/components/EmptyState';
import DownloadButton from './DownloadButton';

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ce965a',
};

function formatFileSize(bytes: number | null | undefined): string | null {
  if (!bytes) return null;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3v6h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function ResourcesPage() {
  await verifySession();
  const sessionToken = await getSessionToken();
  const { resources } = sessionToken ? await fetchResources(sessionToken) : { resources: [] };

  return (
    <div style={{ padding: '48px 48px 64px' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={eyebrowStyle}>Downloads</p>
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: '1',
            fontWeight: 400,
          }}
        >
          Resources
        </h1>
      </div>

      <div style={{ maxWidth: '800px' }}>
        {resources.length === 0 ? (
          <DashboardPanel>
            <EmptyState
              icon={<FileIcon />}
              title="No resources yet"
              description="Guides, templates, and downloads will show up here once they're added."
            />
          </DashboardPanel>
        ) : (
          <DashboardPanel>
            {resources.map((resource, i) => (
              <div
                key={resource.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px 24px',
                  borderBottom: i < resources.length - 1 ? '1px solid rgba(45,21,6,0.08)' : 'none',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(206,150,90,0.15)',
                    color: '#a06a2e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <FileIcon />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '17px' }}>{resource.name}</p>
                  {resource.description && (
                    <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '13px', opacity: 0.75, marginTop: '2px' }}>
                      {resource.description}
                    </p>
                  )}
                  <p style={{ fontFamily: 'var(--font-ibm-plex-sans), sans-serif', color: 'rgba(45,21,6,0.5)', fontSize: '11px', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {[resource.file_type, formatFileSize(resource.file_size)].filter(Boolean).join(' · ')}
                  </p>
                </div>
                <DownloadButton resourceId={resource.id} />
              </div>
            ))}
          </DashboardPanel>
        )}
      </div>
    </div>
  );
}
