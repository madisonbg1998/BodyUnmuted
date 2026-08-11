import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSessionToken } from '@/app/lib/adhara-auth';
import { fetchCertificateDetail } from '@/app/lib/adhara-portal';
import { verifySession } from '@/app/lib/dal';

export default async function CertificateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await verifySession();
  const { id } = await params;
  const sessionToken = await getSessionToken();
  const certificate = sessionToken ? await fetchCertificateDetail(sessionToken, id) : null;

  if (!certificate) notFound();

  return (
    <div style={{ padding: '48px 48px 64px' }}>
      <Link
        href="/dashboard/certificates"
        style={{ fontFamily: 'var(--font-ibm-plex-sans), sans-serif', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ce965a', textDecoration: 'none' }}
      >
        ← Certificates
      </Link>

      <div
        style={{
          maxWidth: '820px',
          margin: '32px auto 0',
          backgroundColor: certificate.background_color || '#ffffff',
          backgroundImage: certificate.background_image_url ? `url(${certificate.background_image_url})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: `2px solid ${certificate.accent_color || '#ce965a'}`,
          borderRadius: '16px',
          padding: '64px 56px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: certificate.accent_color || '#ce965a',
            marginBottom: '20px',
          }}
        >
          {certificate.subtitle_text || 'Certificate of Completion'}
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(30px, 4vw, 44px)',
            lineHeight: '1.1',
            marginBottom: '24px',
          }}
        >
          {certificate.title_text || certificate.title}
        </h1>
        <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '26px', marginBottom: '20px' }}>
          {certificate.recipient_name}
        </p>
        {certificate.body_text && (
          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '15px', lineHeight: '1.6', maxWidth: '520px', margin: '0 auto 32px' }}>
            {certificate.body_text}
          </p>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '32px', flexWrap: 'wrap' }}>
          <div>
            {certificate.signature_image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={certificate.signature_image_url} alt="" style={{ height: '40px', marginBottom: '6px' }} />
            )}
            {certificate.signatory_name && (
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '15px' }}>{certificate.signatory_name}</p>
            )}
            {certificate.signatory_title && (
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.6)', fontSize: '12px' }}>{certificate.signatory_title}</p>
            )}
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '15px' }}>
              {new Date(certificate.completion_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.6)', fontSize: '12px' }}>Date Completed</p>
          </div>
        </div>

        {certificate.footer_text && (
          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.5)', fontSize: '12px', marginTop: '32px' }}>
            {certificate.footer_text}
          </p>
        )}
      </div>

      <div style={{ maxWidth: '820px', margin: '20px auto 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.5)', fontSize: '12px' }}>
          Certificate #{certificate.certificate_number} ·{' '}
          <a href={certificate.verification_url} target="_blank" rel="noopener noreferrer" style={{ color: '#ce965a' }}>
            Verify this certificate
          </a>
        </p>
      </div>
    </div>
  );
}
