'use client';

import { useCallback, useState } from 'react';
import AnswerCard from '@/components/quiz/AnswerCard';

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#faf9f5',
  border: '1px solid rgba(206,150,90,0.28)',
  borderRadius: '10px',
  padding: '12px 16px',
  color: '#2d1506',
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontSize: '15px',
  boxShadow: '0 2px 12px rgba(45,21,6,0.04)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#2d1506',
  fontFamily: 'var(--font-instrument-serif), serif',
  fontSize: '19px',
  lineHeight: '1.35',
  marginBottom: '10px',
};

type FormData = {
  name: string;
  email: string;
  biggestChallenge: string;
  alreadyTried: string;
  sustainableVision: string;
  topThreeHelp: string;
  supportPreferences: string;
  emailOptIn: '' | 'yes' | 'no';
};

const emptyForm: FormData = {
  name: '',
  email: '',
  biggestChallenge: '',
  alreadyTried: '',
  sustainableVision: '',
  topThreeHelp: '',
  supportPreferences: '',
  emailOptIn: '',
};

const REQUIRED_MESSAGES: Record<keyof FormData, string> = {
  name: 'Please enter your name.',
  email: 'Please enter your email.',
  biggestChallenge: 'Please answer this question.',
  alreadyTried: 'Please answer this question.',
  sustainableVision: 'Please answer this question.',
  topThreeHelp: 'Please answer this question.',
  supportPreferences: 'Please answer this question.',
  emailOptIn: 'Please choose an option.',
};

export default function SurveyPage() {
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

      for (const key of Object.keys(REQUIRED_MESSAGES) as (keyof FormData)[]) {
        if (!formData[key].trim()) return setError(REQUIRED_MESSAGES[key]);
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return setError('Please enter a valid email address.');

      setIsSubmitting(true);
      setError(null);

      try {
        const response = await fetch('/api/survey', {
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
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: '1',
              fontWeight: 400,
              marginBottom: '20px',
            }}
          >
            Thank you.
          </h1>
          <p className="paragraph" style={{ color: '#45220d', fontSize: '17px' }}>
            Your answers genuinely help shape what I build next. I appreciate you taking the time.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: '#fbf4e9', padding: '72px 20px 96px' }}>
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(32px, 5vw, 52px)',
              lineHeight: '1.05',
              fontWeight: 400,
            }}
          >
            Market Research Survey
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <label htmlFor="name" style={labelStyle}>
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Your name"
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="email" style={labelStyle}>
              Email
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
            <label htmlFor="biggestChallenge" style={labelStyle}>
              What is your biggest challenge right now when it comes to building muscle, getting stronger, and
              creating a body you feel genuinely confident in?
            </label>
            <textarea
              id="biggestChallenge"
              rows={4}
              value={formData.biggestChallenge}
              onChange={(e) => updateField('biggestChallenge', e.target.value)}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div>
            <label htmlFor="alreadyTried" style={labelStyle}>
              What have you already tried to get the results you want, and what about it didn&apos;t work — or
              simply didn&apos;t feel right — for you?
            </label>
            <textarea
              id="alreadyTried"
              rows={4}
              value={formData.alreadyTried}
              onChange={(e) => updateField('alreadyTried', e.target.value)}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div>
            <label htmlFor="sustainableVision" style={labelStyle}>
              If you could build and sustain the results you want without fitness taking over your life or having
              to start again every time your routine changes, what would that mean to you?
            </label>
            <textarea
              id="sustainableVision"
              rows={4}
              value={formData.sustainableVision}
              onChange={(e) => updateField('sustainableVision', e.target.value)}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div>
            <label htmlFor="topThreeHelp" style={labelStyle}>
              What are the three things you would most like help with right now?
            </label>
            <textarea
              id="topThreeHelp"
              rows={4}
              value={formData.topThreeHelp}
              onChange={(e) => updateField('topThreeHelp', e.target.value)}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div>
            <label htmlFor="supportPreferences" style={labelStyle}>
              When it comes to receiving support with your body and fitness goals, what matters most to you?
            </label>
            <textarea
              id="supportPreferences"
              rows={4}
              value={formData.supportPreferences}
              onChange={(e) => updateField('supportPreferences', e.target.value)}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend style={{ ...labelStyle, marginBottom: '14px' }}>
              Based on your answers, I may create resources or offers to help with these challenges. Would you like
              me to email you if I do?
            </legend>
            <AnswerCard
              name="emailOptIn"
              value="yes"
              text="Yes, keep me in the loop"
              checked={formData.emailOptIn === 'yes'}
              onSelect={(v) => updateField('emailOptIn', v)}
            />
            <AnswerCard
              name="emailOptIn"
              value="no"
              text="No, I’m just participating in the survey"
              checked={formData.emailOptIn === 'no'}
              onSelect={(v) => updateField('emailOptIn', v)}
            />
          </fieldset>

          {error && (
            <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '14px' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-yellow-green"
            style={{ opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
          >
            {isSubmitting ? 'Sending…' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
}
