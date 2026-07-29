import Link from 'next/link';
import FooterContactForm from './FooterContactForm';

const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  color: '#fbf4e9',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontSize: '16px',
  lineHeight: '1.8',
  textDecoration: 'none',
};

const smallStyle: React.CSSProperties = {
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  color: '#fbf4e9',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontSize: '12px',
  lineHeight: '1.8',
  textDecoration: 'none',
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#525421' }} className="py-12">
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 20px' }}>
        {/* Nav links row */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8">
          <Link href="/" style={linkStyle}>Home</Link>
          <Link href="/about" style={linkStyle}>about</Link>
          <Link href="/method" style={linkStyle}>Method</Link>
          <Link href="/work-with-me" style={linkStyle}>work with me</Link>
          <Link href="/blog" style={linkStyle}>blog</Link>
        </div>

        {/* Contact form */}
        <div style={{ marginBottom: '40px' }}>
          <p
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
              color: '#e8eeba',
              fontSize: 'clamp(24px, 3vw, 32px)',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            Let&apos;s Start.
          </p>
          <FooterContactForm />
        </div>

        {/* Social */}
        <div className="flex justify-center mb-6">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg width="33" height="33" viewBox="0 0 512 512" fill="#e8eeba">
              <circle cx="255.25" cy="256.21" r="70.68" />
              <path d="M338,54.63H174c-62.72,0-114,51.31-114,114V343.33c0,62.73,51.32,114,114,114H338c62.72,0,114-51.31,114-114V168.67C452,105.94,400.68,54.63,338,54.63ZM255.77,364.07A107.95,107.95,0,1,1,363.71,256.13,107.95,107.95,0,0,1,255.77,364.07Zm109.67-192A25.56,25.56,0,1,1,391,146.5,25.56,25.56,0,0,1,365.44,172.06Z" />
            </svg>
          </a>
        </div>

        {/* Credits */}
        <div className="text-center">
          <p style={smallStyle}>© 2026 Body Unmuted</p>
        </div>
      </div>
    </footer>
  );
}
