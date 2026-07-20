'use client';
import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'about', href: '/about' },
  { label: 'method', href: '/method' },
  { label: 'work with me', href: '/work-with-me' },
  { label: 'Blog', href: '/blog' },
];

const linkStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Sans', sans-serif",
  color: '#e8eeba',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontSize: '16px',
  lineHeight: '1.8',
  textDecoration: 'none',
};

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop + Mobile bar */}
      <header
        style={{ backgroundColor: '#525421', position: 'sticky', top: 0, zIndex: 10 }}
        className="h-[43px] md:h-[80px]"
      >
        <div
          style={{ maxWidth: '1200px', margin: '0 auto', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(22px, 3vw, 36px)',
              color: '#faf9f5',
              textTransform: 'uppercase',
              lineHeight: '0.9',
              textDecoration: 'none',
              letterSpacing: '0em',
            }}
          >
            Body UnmUted
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} style={linkStyle}>
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-secondary" style={{ fontSize: '14px' }}>
              Let&apos;s Start
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <svg width="28" height="28" viewBox="0 0 512 512" fill="#e8eeba" xmlns="http://www.w3.org/2000/svg">
              <path d="M440,208H72a12,12,0,0,1,0-24H440a12,12,0,0,1,0,24Z" />
              <path d="M440,328H72a12,12,0,0,1,0-24H440a12,12,0,0,1,0,24Z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 15,
            backgroundColor: '#525421',
            padding: '20px 16px 32px',
            minHeight: '350px',
          }}
        >
          {/* Close button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <svg width="36" height="36" viewBox="0 0 512 512" fill="#e8eeba">
                <polygon points="405 121.8 390.2 107 256 241.2 121.8 107 107 121.8 241.2 256 107 390.2 121.8 405 256 270.8 390.2 405 405 390.2 270.8 256 405 121.8" />
              </svg>
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  color: '#e8eeba',
                  textTransform: 'uppercase',
                  fontSize: '54px',
                  lineHeight: '1',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
