'use client';

import { useCallback, useState } from 'react';

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#fff',
  border: '1px solid rgba(45,21,6,0.2)',
  borderRadius: '4px',
  padding: '12px 16px',
  color: '#2d1506',
  fontFamily: "var(--font-inter-sans), sans-serif",
  fontSize: '15px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#45220d',
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: '8px',
};

type FormData = {
  fullName: string;
  email: string;
  phone: string;
};

const emptyForm: FormData = { fullName: '', email: '', phone: '' };

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, sourceUrl: window.location.href }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Something went wrong.');
        setIsSubmitted(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  if (isSubmitted) {
    return (
      <section
        style={{ backgroundColor: '#fbf4e9', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}
      >
        <div style={{ maxWidth: '480px', textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
              color: '#2d1506',
              fontSize: 'clamp(36px, 5vw, 56px)',
              lineHeight: '1',
              fontWeight: 400,
              marginBottom: '20px',
            }}
          >
            You&apos;re on the waitlist.
          </h1>
          <p className="paragraph" style={{ color: '#45220d', fontSize: '17px' }}>
            I&apos;ll reach out personally as spots open up. In the meantime, feel free to explore the site or follow along on Instagram.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: '#fbf4e9', padding: '80px 20px' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p
            className="subheading"
            style={{ color: '#ce965a', fontSize: '13px', marginBottom: '12px' }}
          >
            Body Unmuted
          </p>
          <h1
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
              color: '#2d1506',
              fontSize: 'clamp(36px, 5.5vw, 60px)',
              lineHeight: '1',
              fontWeight: 400,
              marginBottom: '16px',
            }}
          >
            Join the waitlist.
          </h1>
          <p className="paragraph" style={{ color: '#45220d', fontSize: '16px' }}>
            Drop your details and I&apos;ll be in touch as founding member spots open up.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
              Phone <span style={{ color: 'rgba(45,21,6,0.4)', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400 }}>(optional)</span>
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
            <p style={{ color: '#b3261e', fontFamily: "var(--font-inter-sans), sans-serif", fontSize: '14px' }}>{error}</p>
          )}

          <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
            {isSubmitting ? 'Sending…' : 'Join the Waitlist'}
          </button>
        </form>
      </div>
    </section>
  );
}
