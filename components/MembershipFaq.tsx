'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Do I have to be an entrepreneur?',
    a: "No. many of the women I serve are founders because they're intentionally building freedom-first lives. But you don't need to own a business. If you're looking for a way to build the body you want without organizing your life around fitness, you'll fit right in.",
  },
  {
    q: 'Do I have to travel full-time?',
    a: "Not at all. You can be traveling constantly or simply have a life that doesn't fit traditional fitness advice. Body Unmuted adapts to your lifestyle, whatever that looks like.",
  },
  {
    q: "I've never lifted weights before. Is this for me?",
    a: "Absolutely. Whether you're brand new to strength training or you've been lifting for years, your coaching is personalized to where you're starting today.",
  },
  {
    q: "I've tried other plans and nothing has worked. Why would this be different?",
    a: "Most plans tell you what to do without helping you understand why you're doing it—or how to adapt when your body, schedule, or life changes. So when the plan stops working, it feels like you failed. You didn't. This approach is different because we use your body's data, signals, and real life to understand what works for you. You won't just follow another plan. You'll learn how to make progress, recognize when something needs to change, and adapt without starting over.",
  },
  {
    q: 'My life is too inconsistent. Will this actually work?',
    a: "That's exactly why Body Unmuted exists. Instead of pretending life never changes, I coach you through those changes. Busy seasons, travel, holidays, business launches, real life. Consistency isn't doing the exact same thing forever. It's knowing how to keep moving forward when life changes.",
  },
  {
    q: 'Is this just another twelve week program?',
    a: "No. Body Unmuted is an ongoing membership. The twelve weeks are your foundation, where you move through the body literacy curriculum and build real knowledge of your body. After that, your custom coaching continues for as long as you're a member, because twelve weeks is your new starting place, not the finish line.",
  },
  {
    q: "I've bought coaching before and didn't stick with it.",
    a: "You're not alone. Most people don't fail because they aren't capable. They struggle because the plan they were given only works under perfect conditions. Body Reclaimed is built around real life. When life changes, your coaching changes too.",
  },
  {
    q: "What if I don't want my whole life to revolve around fitness?",
    a: "Neither do I. That's exactly the point. I want fitness to support your life, not become your life.",
  },
];

export default function MembershipFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            style={{
              borderBottom: '1px solid rgba(206,150,90,0.35)',
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '26px 4px',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#2d1506',
                  fontSize: 'clamp(19px, 2.2vw, 25px)',
                  lineHeight: '1.3',
                }}
              >
                {f.q}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid #ce965a',
                  color: '#ce965a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontFamily: 'var(--font-inter-sans), sans-serif',
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.25s ease',
                }}
              >
                +
              </span>
            </button>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.3s ease',
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-inter-sans), sans-serif',
                    color: '#45220d',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    paddingBottom: '26px',
                    paddingRight: '48px',
                  }}
                >
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
