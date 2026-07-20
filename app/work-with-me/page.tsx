import Link from 'next/link';

export default function WorkWithMe() {
  return (
    <section
      style={{ backgroundColor: '#fbf4e9', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}
    >
      <div style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: "'Instrument Serif', serif",
            color: '#2d1506',
            fontSize: 'clamp(36px, 5vw, 60px)',
            lineHeight: '1',
            fontWeight: 400,
            marginBottom: '24px',
          }}
        >
          Work With Me
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: '#45220d',
            fontSize: '18px',
            lineHeight: '1.6',
            marginBottom: '40px',
          }}
        >
          This page is coming soon. In the meantime, reach out to learn more about Body Reclaimed and 1:1 coaching.
        </p>
        <Link href="/contact" className="btn-primary">
          Let&apos;s Start
        </Link>
      </div>
    </section>
  );
}
