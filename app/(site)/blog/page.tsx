import Image from 'next/image';

const img = (name: string) => `/Body%20Unmuted%20Brand%20Images/${name}`;

export default function Blog() {
  return (
    <section style={{ background: 'linear-gradient(to bottom, #fbf4e9 0%, #e8eeba 100%)', padding: '48px 20px 120px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: '620px', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image src={img('Madison-73.jpg')} alt="Madison outdoors on a mountainside" fill sizes="100vw" style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(45,21,6,0.15)' }} />
          </div>
          <div style={{ position: 'relative', zIndex: 1, padding: '48px', maxWidth: '520px', marginLeft: 'auto' }}>
            <h1
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: '#525421',
                fontSize: 'clamp(56px, 8vw, 96px)',
                lineHeight: '0.95',
                fontWeight: 400,
                marginBottom: '24px',
              }}
            >
              The Blog
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-inter-sans), sans-serif',
                color: '#fbf4e9',
                fontSize: '17px',
                lineHeight: '1.6',
              }}
            >
              Notes on training, body literacy, and building a fitness practice that travels with a freedom-first
              life. New posts coming soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
