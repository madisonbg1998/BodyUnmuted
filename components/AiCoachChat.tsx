'use client';

import { useEffect, useRef, useState } from 'react';
import BrandOrb from './BrandOrb';

type Message = { id: string; role: 'coach' | 'user'; text: string };

const SUGGESTIONS = [
  { label: 'Log today’s workout', value: 'I want to log today’s workout' },
  { label: 'Ask a nutrition question', value: 'I have a nutrition question' },
  { label: 'I need some motivation', value: 'I need some motivation today' },
];

const RESPONSES: Record<string, string> = {
  'I want to log today’s workout':
    'Love that. Tell me what you did — the exercises, sets, and how it felt — and I’ll get it saved to your log.',
  'I have a nutrition question':
    'Go for it. Ask me anything about macros, meal timing, or how to handle a tricky situation — I’ll do my best with what you’ve told me so far.',
  'I need some motivation today':
    'You don’t need to feel motivated to keep a promise to yourself. Show up for the next 10 minutes — that’s it. You’ve done harder things than today.',
};

const FALLBACK =
  'Got it — I’m still learning, so once I’m fully connected I’ll be able to dig into your actual training and nutrition data to answer that. For now, tell me more and I’ll do my best.';

function uid() {
  return Math.random().toString(36).slice(2);
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  border: '1px solid rgba(45,21,6,0.2)',
  borderRadius: '999px',
  padding: '14px 20px',
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontSize: '15px',
  color: '#2d1506',
};

export default function AiCoachChat({ firstName }: { firstName: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasStarted = messages.length > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: uid(), role: 'user', text }]);
    setDraft('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: uid(), role: 'coach', text: RESPONSES[text] || FALLBACK }]);
    }, 900);
  }

  const inputForm = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send(draft);
      }}
      style={{ display: 'flex', gap: '10px', width: '100%' }}
    >
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Ask BRI AI anything…"
        style={inputStyle}
        autoFocus
      />
      <button
        type="submit"
        disabled={!draft.trim()}
        className="btn-primary"
        style={{ borderRadius: '999px', opacity: draft.trim() ? 1 : 0.5 }}
      >
        Send
      </button>
    </form>
  );

  if (!hasStarted) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          backgroundColor: '#fbf4e9',
        }}
      >
        <BrandOrb size="lg" />
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(36px, 5vw, 52px)',
            lineHeight: '1',
            fontWeight: 400,
            marginTop: '28px',
          }}
        >
          Ask BRI AI
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter-sans), sans-serif',
            color: 'rgba(45,21,6,0.6)',
            fontSize: '15px',
            marginTop: '10px',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          Your personal coach for workouts, nutrition, and staying on track, {firstName}.
        </p>

        <div style={{ width: '100%', maxWidth: '560px' }}>
          {inputForm}

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => send(s.value)}
                style={{
                  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  color: '#82571f',
                  backgroundColor: 'transparent',
                  border: '1px solid #ce965a',
                  borderRadius: '999px',
                  padding: '9px 16px',
                  cursor: 'pointer',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <p
            style={{
              fontFamily: 'var(--font-inter-sans), sans-serif',
              fontSize: '11px',
              color: 'rgba(45,21,6,0.4)',
              textAlign: 'center',
              marginTop: '24px',
            }}
          >
            Preview mode — responses are canned for now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#fbf4e9' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '18px 32px',
          background: 'linear-gradient(135deg, #2d1506 0%, #45220d 100%)',
          flexShrink: 0,
        }}
      >
        <BrandOrb size="xs" pulse={isTyping} />
        <p
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#f3e4c4',
            fontSize: '18px',
            letterSpacing: '0.01em',
          }}
        >
          BRI AI
        </p>
        <span
          style={{
            fontFamily: 'var(--font-inter-sans), sans-serif',
            fontSize: '11px',
            color: 'rgba(243,228,196,0.5)',
          }}
        >
          · preview
        </span>
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ maxWidth: '760px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-end',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {m.role === 'coach' && <BrandOrb size="xs" />}
              <div
                style={{
                  maxWidth: '75%',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  borderBottomRightRadius: m.role === 'user' ? '4px' : '14px',
                  borderBottomLeftRadius: m.role === 'coach' ? '4px' : '14px',
                  backgroundColor: m.role === 'user' ? '#525421' : '#efdfc3',
                  color: m.role === 'user' ? '#fbf4e9' : '#2d1506',
                  fontFamily: 'var(--font-inter-sans), sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.45',
                }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
              <BrandOrb size="xs" pulse />
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '14px',
                  borderBottomLeftRadius: '4px',
                  backgroundColor: '#efdfc3',
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#82571f',
                      opacity: 0.5,
                      animation: `ai-coach-bounce 1s ${i * 0.15}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '20px 32px', borderTop: '1px solid rgba(45,21,6,0.1)', flexShrink: 0 }}>
        <div style={{ maxWidth: '760px', width: '100%', margin: '0 auto' }}>{inputForm}</div>
      </div>

      <style>{`
        @keyframes ai-coach-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
