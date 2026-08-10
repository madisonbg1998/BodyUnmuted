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

type FormData = { fullName: string; email: string; message: string };
const emptyForm: FormData = { fullName: '', email: '', message: '' };

export default function LightContactForm() {
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
      if (!formData.message.trim()) return setError('Please enter a message.');

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
        <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '22px' }}>
          Thanks — I&apos;ll be in touch soon.
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
        padding: '32px',
        boxShadow: '0 4px 24px rgba(45,21,6,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <input
        type="text"
        aria-label="Name"
        autoComplete="name"
        value={formData.fullName}
        onChange={(e) => updateField('fullName', e.target.value)}
        placeholder="Your name"
        style={inputStyle}
      />
      <input
        type="email"
        aria-label="Email"
        autoComplete="email"
        value={formData.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="you@example.com"
        style={inputStyle}
      />
      <textarea
        aria-label="Message"
        rows={3}
        value={formData.message}
        onChange={(e) => updateField('message', e.target.value)}
        placeholder="How can I help you?"
        style={{ ...inputStyle, resize: 'vertical' }}
      />

      {error && (
        <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '13px' }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-copper"
        style={{ opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
      >
        {isSubmitting ? 'Sending…' : 'Submit'}
      </button>
    </form>
  );
}
