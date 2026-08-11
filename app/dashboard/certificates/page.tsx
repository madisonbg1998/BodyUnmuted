import Link from 'next/link';
import { getSessionToken } from '@/app/lib/adhara-auth';
import { fetchCertificates } from '@/app/lib/adhara-portal';
import { verifySession } from '@/app/lib/dal';
import EmptyState from '@/components/EmptyState';

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ce965a',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#faf9f5',
  border: '1px solid rgba(206,150,90,0.28)',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 4px 24px rgba(45,21,6,0.05)',
  textDecoration: 'none',
  display: 'block',
};

function SealIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="9" r="6" />
      <path d="M9 14.5 7.5 21l4.5-2.5 4.5 2.5-1.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function CertificatesPage() {
  await verifySession();
  const sessionToken = await getSessionToken();
  const certificates = sessionToken ? await fetchCertificates(sessionToken) : [];

  return (
    <div style={{ padding: '48px 48px 64px' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={eyebrowStyle}>Your Achievements</p>
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: '1',
            fontWeight: 400,
          }}
        >
          Certificates
        </h1>
      </div>

      {certificates.length === 0 ? (
        <div style={{ maxWidth: '700px', backgroundColor: '#faf9f5', border: '1px solid rgba(206,150,90,0.28)', borderRadius: '12px' }}>
          <EmptyState
            icon={<SealIcon />}
            title="No certificates yet"
            description="Complete a course to earn your first certificate."
            action={
              <Link href="/dashboard/courses" className="btn-primary" style={{ textDecoration: 'none' }}>
                Browse Courses
              </Link>
            }
          />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', maxWidth: '1100px' }}>
          {certificates.map((cert) => (
            <Link key={cert.id} href={`/dashboard/certificates/${cert.id}`} style={cardStyle}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(206,150,90,0.15)',
                  color: '#a06a2e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <SealIcon />
              </div>
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '18px', marginBottom: '4px' }}>
                {cert.title}
              </p>
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.55)', fontSize: '13px' }}>
                Issued {new Date(cert.issued_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
