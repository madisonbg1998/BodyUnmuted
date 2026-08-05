import Link from 'next/link';
import BrandOrb from '@/components/BrandOrb';

export default function WorkWithMe() {
  return (
    <section
      style={{
        backgroundColor: '#fbf4e9',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '96px 20px',
      }}
    >
      <div style={{ maxWidth: '600px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <BrandOrb size="md" pulse />
        </div>

        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#ce965a',
            marginBottom: '18px',
          }}
        >
          Body Reclaimed
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(36px, 5vw, 60px)',
            lineHeight: '1',
            fontWeight: 400,
            marginBottom: '24px',
          }}
        >
          Work With Me
        </h1>

        <div
          style={{
            backgroundColor: '#faf9f5',
            border: '1px solid rgba(206,150,90,0.28)',
            borderRadius: '14px',
            padding: '32px',
            marginBottom: '36px',
            boxShadow: '0 4px 24px rgba(45,21,6,0.05)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter-sans), sans-serif',
              color: '#45220d',
              fontSize: '18px',
              lineHeight: '1.6',
            }}
          >
            This page is coming soon. In the meantime, reach out to learn more about Body Reclaimed and 1:1 coaching.
          </p>
        </div>

        <Link href="/contact" className="btn-yellow-green" style={{ textDecoration: 'none' }}>
          Let&apos;s Start
        </Link>
      </div>
    </section>
  );
}
