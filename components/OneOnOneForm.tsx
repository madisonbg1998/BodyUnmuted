'use client';

import { useCallback, useState } from 'react';

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#faf9f5',
  border: '1px solid rgba(206,150,90,0.35)',
  borderRadius: '6px',
  padding: '13px 16px',
  color: '#2d1506',
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontSize: '15px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#a67c52',
  marginBottom: '8px',
};

type FormData = { fullName: string; email: string; instagram: string; message: string };
const emptyForm: FormData = { fullName: '', email: '', instagram: '', message: '' };

export default function OneOnOneForm() {
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
      if (!formData.message.trim()) return setError('Tell me a little about why you want to work together.');

      setIsSubmitting(true);
      setError(null);

      try {
        const response = await fetch('/api/coaching-application', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, sourceUrl: window.location.href }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Something went wrong.');
        setIsSubmitted(true);
        setFormData(emptyForm);
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
      <div
        style={{
          backgroundColor: '#faf9f5',
          border: '1px solid rgba(206,150,90,0.28)',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 4px 24px rgba(45,21,6,0.05)',
        }}
      >
        <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '24px', marginBottom: '8px' }}>
          Thank you.
        </p>
        <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '15px' }}>
          I&apos;ll be in touch soon to talk through 1:1 coaching.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: '#faf9f5',
        border: '1px solid rgba(206,150,90,0.28)',
        borderRadius: '12px',
        padding: '36px',
        boxShadow: '0 4px 24px rgba(45,21,6,0.05)',
        textAlign: 'left',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="oto-name" style={labelStyle}>Name</label>
        <input
          id="oto-name"
          type="text"
          autoComplete="name"
          value={formData.fullName}
          onChange={(e) => updateField('fullName', e.target.value)}
          placeholder="Your name"
          style={inputStyle}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="oto-email" style={labelStyle}>Email</label>
        <input
          id="oto-email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="you@example.com"
          style={inputStyle}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="oto-instagram" style={labelStyle}>
          Instagram <span style={{ textTransform: 'none', letterSpacing: 'normal', color: 'rgba(45,21,6,0.4)' }}>(optional)</span>
        </label>
        <input
          id="oto-instagram"
          type="text"
          autoComplete="off"
          value={formData.instagram}
          onChange={(e) => updateField('instagram', e.target.value)}
          placeholder="@yourhandle"
          style={inputStyle}
        />
      </div>
      <div style={{ marginBottom: '24px' }}>
        <label htmlFor="oto-message" style={labelStyle}>Why do you want to work 1:1?</label>
        <textarea
          id="oto-message"
          rows={4}
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Tell me a bit about where you're at and what you're hoping for."
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      {error && (
        <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '13px', marginBottom: '16px' }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-copper"
        style={{ opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer', width: '100%', textAlign: 'center' }}
      >
        {isSubmitting ? 'Sending…' : 'Apply for 1:1'}
      </button>
    </form>
  );
}
