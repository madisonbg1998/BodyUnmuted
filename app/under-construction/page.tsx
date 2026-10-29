import type { Metadata } from 'next';
import Image from 'next/image';

const img = (name: string) => `/Body%20Unmuted%20Brand%20Images/${name}`;

export const metadata: Metadata = {
  title: 'Body Unmuted — Back Soon',
  description: "We're giving Body Unmuted a glow-up. Check back soon.",
  robots: { index: false, follow: false },
};

export default function UnderConstructionPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <Image
        src={img('Madison-73.jpg')}
        alt="Madison smiling with arms raised outdoors in the mountains"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: '50% 35%' }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(45,21,6,0.55) 0%, rgba(45,21,6,0.4) 45%, rgba(45,21,6,0.65) 100%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '560px', margin: '0 auto', padding: '40px 24px', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#e8eeba',
            marginBottom: '20px',
          }}
        >
          Body Unmuted
        </p>
        <p
          aria-hidden="true"
          style={{
            color: '#ce965a',
            fontSize: '20px',
            marginBottom: '20px',
          }}
        >
          &#9670;
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            fontStyle: 'italic',
            color: '#fbf4e9',
            fontSize: 'clamp(36px, 6vw, 56px)',
            lineHeight: '1.1',
            fontWeight: 400,
            marginBottom: '20px',
          }}
        >
          We&rsquo;re in the middle of a glow-up.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter-sans), sans-serif',
            color: '#f3e4c4',
            fontSize: '17px',
            lineHeight: '1.6',
            marginBottom: '14px',
          }}
        >
          The whole program is getting rebuilt from the ground up. New structure, new site, same honest coaching
          underneath it all.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-inter-sans), sans-serif',
            color: 'rgba(243,228,196,0.75)',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
        >
          Thanks for your patience while we get it just right. Back soon.
        </p>
      </div>
    </div>
  );
}
