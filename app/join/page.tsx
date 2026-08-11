'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const img = (name: string) => `/Body%20Unmuted%20Brand%20Images/${name}`;

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#fff',
  border: '1px solid rgba(45,21,6,0.16)',
  borderRadius: '6px',
  padding: '13px 16px',
  color: '#2d1506',
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontSize: '15px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#45220d',
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: '8px',
};

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#ce965a',
};

type FormData = { fullName: string; email: string; phone: string };
const emptyForm: FormData = { fullName: '', email: '', phone: '' };

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" />
    </svg>
  );
}

export default function JoinPage() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.fullName.trim()) return setError('Please enter your name.');
      if (!formData.email.trim()) return setError('Please enter your email.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return setError('Please enter a valid email address.');

      setIsSubmitting(true);
      setError(null);

      try {
        const response = await fetch('/api/join', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, sourceUrl: window.location.href }),
        });
        const data = await response.json();
        if (!response.ok || !data.checkoutUrl) throw new Error(data.error || 'Something went wrong.');
        window.location.href = data.checkoutUrl;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  return (
    <div className="flex flex-col md:flex-row" style={{ minHeight: '100vh', backgroundColor: '#fbf4e9' }}>
      {/* left: full-bleed photo panel */}
      <div className="w-full h-[260px] md:h-screen md:w-[44%] md:sticky md:top-0" style={{ position: 'relative', flexShrink: 0 }}>
        <Image
          src={img('BO1A9466.jpg')}
          alt="Madison glancing back through an ornate open door, surrounded by greenery"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 44vw"
          style={{ objectFit: 'cover', objectPosition: '50% 42%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(45,21,6,0.35) 0%, rgba(45,21,6,0) 30%, rgba(45,21,6,0) 55%, rgba(45,21,6,0.82) 100%)' }} />

        <Link
          href="/"
          style={{
            position: 'absolute',
            top: '28px',
            left: '28px',
            fontFamily: 'var(--font-instrument-serif), serif',
            fontSize: '20px',
            color: '#fbf4e9',
            textDecoration: 'none',
            letterSpacing: '0.01em',
          }}
        >
          Body Unmuted
        </Link>

        <div style={{ position: 'absolute', left: '28px', right: '28px', bottom: '32px' }} className="hidden md:block">
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#fbf4e9',
              fontSize: 'clamp(20px, 1.9vw, 26px)',
              lineHeight: '1.3',
              marginBottom: '14px',
            }}
          >
            &ldquo;You didn&rsquo;t build your life to choose between your freedom and the body you want.&rdquo;
          </p>
          <p style={{ ...eyebrow, color: '#e8eeba' }}>Founding Member Pricing &mdash; First 5 Only</p>
        </div>
      </div>

      {/* right: the form */}
      <div className="w-full md:w-[56%] flex items-center justify-center" style={{ padding: '56px 24px' }}>
        <div style={{ width: '100%', maxWidth: '440px' }} className="quiz-fade-in">
          <p style={{ ...eyebrow, marginBottom: '14px' }}>Step 1 of 2 &mdash; Your Info</p>
          <h1
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(34px, 4.2vw, 46px)',
              lineHeight: '1.08',
              fontWeight: 400,
              marginBottom: '14px',
            }}
          >
            Let&rsquo;s make it official.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter-sans), sans-serif',
              color: '#45220d',
              fontSize: '16px',
              lineHeight: '1.55',
              marginBottom: '28px',
            }}
          >
            You&rsquo;re one step from securing founding member pricing. Fill in your details and you&rsquo;ll head
            straight to secure checkout.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              paddingBottom: '20px',
              marginBottom: '28px',
              borderBottom: '1px solid rgba(45,21,6,0.12)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '34px' }}>
              $333
            </span>
            <span style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#a67c52', fontSize: '15px' }}>
              /month
            </span>
            <span
              style={{
                fontFamily: 'var(--font-inter-sans), sans-serif',
                color: 'rgba(45,21,6,0.4)',
                fontSize: '15px',
                textDecoration: 'line-through',
                marginLeft: '4px',
              }}
            >
              $555
            </span>
            <span style={{ ...eyebrow, color: '#7f8b32', marginLeft: 'auto', fontSize: '11px' }}>Locked in for life</span>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label htmlFor="fullName" style={labelStyle}>
                Name <span style={{ color: '#ce965a' }}>*</span>
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                placeholder="Your name"
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="email" style={labelStyle}>
                Email <span style={{ color: '#ce965a' }}>*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="phone" style={labelStyle}>
                Phone{' '}
                <span style={{ color: 'rgba(45,21,6,0.4)', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400 }}>
                  (optional)
                </span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                style={inputStyle}
              />
            </div>

            {error && (
              <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '14px' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                textAlign: 'center',
                padding: '16px 24px',
                fontSize: '13px',
                marginTop: '4px',
              }}
            >
              {isSubmitting ? 'Taking you to checkout…' : 'Continue to Secure Payment'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'rgba(45,21,6,0.5)' }}>
              <LockIcon />
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '12px' }}>
                Payment secured by Stripe &middot; Cancel anytime
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
