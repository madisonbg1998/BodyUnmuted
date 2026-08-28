'use client';

import { useCallback, useRef, useState } from 'react';
import { POPUP_BODY, POPUP_BUTTON, POPUP_CONSENT_LABEL_PLACEHOLDER, POPUP_DEV_NOTICE, POPUP_HEADING } from '@/app/lib/ffa/config';
import { useFocusTrap } from './useFocusTrap';

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#fff',
  border: '1px solid rgba(45,21,6,0.2)',
  borderRadius: '6px',
  padding: '12px 14px',
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

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function FfaEmailModal({
  isOpen,
  isSubmitting,
  submitError,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  isSubmitting: boolean;
  submitError?: string | null;
  onClose: () => void;
  onSubmit: (firstName: string, email: string, consent: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  useFocusTrap(containerRef, isOpen, onClose);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedName = firstName.trim();
      const trimmedEmail = email.trim();

      let hasError = false;
      if (!trimmedName) {
        setFirstNameError('Please enter your first name.');
        hasError = true;
      } else {
        setFirstNameError(null);
      }

      if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
        setEmailError('Please enter a valid email address.');
        hasError = true;
      } else {
        setEmailError(null);
      }

      if (hasError) return;

      onSubmit(trimmedName, trimmedEmail, consent);
    },
    [firstName, email, consent, onSubmit]
  );

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(45,21,6,0.55)',
        padding: '20px',
        paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
        paddingTop: 'max(20px, env(safe-area-inset-top))',
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ffa-modal-heading"
        tabIndex={-1}
        className="quiz-fade-in"
        style={{
          backgroundColor: '#fbf4e9',
          borderRadius: '14px',
          padding: '32px',
          width: '100%',
          maxWidth: '440px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(45,21,6,0.35)',
          position: 'relative',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            color: 'rgba(45,21,6,0.5)',
            fontSize: '20px',
            cursor: 'pointer',
            borderRadius: '50%',
          }}
        >
          ×
        </button>

        {process.env.NODE_ENV !== 'production' && (
          <p
            role="note"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              color: '#525421',
              backgroundColor: '#f3e4c4',
              border: '1px solid rgba(206,150,90,0.5)',
              borderRadius: '8px',
              padding: '10px 12px',
              marginBottom: '20px',
              marginRight: '28px',
            }}
          >
            {POPUP_DEV_NOTICE}
          </p>
        )}

        <h2
          id="ffa-modal-heading"
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(24px, 4vw, 30px)',
            lineHeight: '1.15',
            fontWeight: 400,
            marginBottom: '12px',
          }}
        >
          {POPUP_HEADING}
        </h2>

        {POPUP_BODY.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: 'var(--font-inter-sans), sans-serif',
              color: '#45220d',
              fontSize: '14px',
              lineHeight: '1.5',
              marginBottom: i === POPUP_BODY.length - 1 ? '24px' : '10px',
            }}
          >
            {para}
          </p>
        ))}

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label htmlFor="ffa-first-name" style={labelStyle}>
              First name <span style={{ color: '#ce965a' }}>*</span>
            </label>
            <input
              id="ffa-first-name"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (firstNameError) setFirstNameError(null);
              }}
              aria-invalid={!!firstNameError}
              aria-describedby={firstNameError ? 'ffa-first-name-error' : undefined}
              style={{ ...inputStyle, borderColor: firstNameError ? '#b3261e' : 'rgba(45,21,6,0.2)' }}
            />
            {firstNameError && (
              <p id="ffa-first-name-error" role="alert" style={{ color: '#b3261e', fontSize: '13px', marginTop: '6px' }}>
                {firstNameError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="ffa-email" style={labelStyle}>
              Email <span style={{ color: '#ce965a' }}>*</span>
            </label>
            <input
              id="ffa-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null);
              }}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'ffa-email-error' : undefined}
              style={{ ...inputStyle, borderColor: emailError ? '#b3261e' : 'rgba(45,21,6,0.2)' }}
            />
            {emailError && (
              <p id="ffa-email-error" role="alert" style={{ color: '#b3261e', fontSize: '13px', marginTop: '6px' }}>
                {emailError}
              </p>
            )}
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              style={{ marginTop: '3px', width: '16px', height: '16px', flexShrink: 0, accentColor: '#525421' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-inter-sans), sans-serif',
                fontSize: '12px',
                lineHeight: '1.5',
                color: 'rgba(45,21,6,0.65)',
                fontStyle: 'italic',
              }}
            >
              {POPUP_CONSENT_LABEL_PLACEHOLDER}
            </span>
          </label>

          {submitError && (
            <p role="alert" style={{ color: '#b3261e', fontSize: '13px', margin: 0 }}>
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{ textAlign: 'center', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
          >
            {isSubmitting ? 'Revealing…' : POPUP_BUTTON}
          </button>
        </form>
      </div>
    </div>
  );
}
