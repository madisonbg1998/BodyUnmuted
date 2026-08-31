import Image from 'next/image';
import { LANDING_BODY, LANDING_BUTTON, LANDING_EYEBROW, LANDING_HEADLINE, LANDING_MICROCOPY, PRE_QUIZ_INSTRUCTIONS } from '@/app/lib/ffa/config';
import type { LandingBlock } from '@/app/lib/ffa/config';

const img = (name: string) => `/Body%20Unmuted%20Brand%20Images/${name}`;

// Breaks a section out of whatever centered/padded container it's rendered
// inside so its background can run the full width of the viewport, matching
// the alternating full-bleed sections used on the rest of the site (see
// e.g. app/(site)/page.tsx, app/(site)/work-with-me/page.tsx).
const fullBleed: React.CSSProperties = {
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  width: '100vw',
};

// Same recipe as the tinted-photo sections on app/(site)/work-with-me —
// a translucent wash over the photo so the section's own text color still
// reads clearly, instead of a flat background color.
const BgPhoto = ({ src, alt, overlay, position = '50% 50%' }: { src: string; alt: string; overlay: string; position?: string }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: position }} />
    <div style={{ position: 'absolute', inset: 0, background: overlay }} />
  </div>
);

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter-sans), sans-serif',
  color: 'rgba(45,21,6,0.8)',
  fontSize: 'clamp(15px, 1.9vw, 18px)',
  lineHeight: '1.65',
  textAlign: 'center',
  marginBottom: '18px',
};

const punchStyle: React.CSSProperties = {
  fontFamily: 'var(--font-instrument-serif), serif',
  color: '#525421',
  fontSize: 'clamp(23px, 3.4vw, 31px)',
  lineHeight: '1.3',
  fontWeight: 400,
  textAlign: 'center',
  margin: '32px 0',
};

const asideStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontStyle: 'italic',
  color: 'rgba(45,21,6,0.7)',
  fontSize: 'clamp(14px, 1.7vw, 16px)',
  lineHeight: '1.5',
  textAlign: 'center',
  marginBottom: '18px',
};

const connectorStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter-sans), sans-serif',
  color: 'rgba(251,244,233,0.85)',
  fontSize: 'clamp(14px, 1.7vw, 16px)',
  lineHeight: '1.5',
  textAlign: 'center',
  marginBottom: '14px',
};

const quoteStyle: React.CSSProperties = {
  fontFamily: 'var(--font-instrument-serif), serif',
  fontStyle: 'italic',
  color: '#e8eeba',
  fontSize: 'clamp(26px, 4.4vw, 44px)',
  lineHeight: '1.3',
  textAlign: 'center',
  margin: '0 0 36px',
};

function StartButton({ onStart, large = false }: { onStart: () => void; large?: boolean }) {
  return (
    <button
      type="button"
      onClick={onStart}
      className="btn-primary"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: large ? '16px' : '14px',
        padding: large ? '18px 40px' : '14px 32px',
      }}
    >
      {LANDING_BUTTON}
      <svg width="18" height="14" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M1 9h20M14 2l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function renderBlock(block: LandingBlock, key: number) {
  switch (block.variant) {
    case 'punch':
      return (
        <p key={key} style={punchStyle}>
          {block.text}
        </p>
      );
    case 'aside':
      return (
        <p key={key} style={asideStyle}>
          {block.text}
        </p>
      );
    case 'connector':
      return (
        <p key={key} style={connectorStyle}>
          {block.text}
        </p>
      );
    case 'quote':
      return (
        <p key={key} style={quoteStyle}>
          {block.text}
        </p>
      );
    default:
      return (
        <p key={key} style={bodyStyle}>
          {block.text}
        </p>
      );
  }
}

export default function FfaLanding({ onStart }: { onStart: () => void }) {
  const bySection = (n: 1 | 2 | 3 | 4 | 5) => LANDING_BODY.filter((b) => b.section === n);

  return (
    // Cancels out the route's own padding (app/(site)/freedom-fitness-audit/page.tsx)
    // so these full-bleed sections can control their own spacing and reach
    // the true viewport edge instead of sitting inside it.
    <div style={{ margin: '-64px -20px -96px' }}>
      {/* ── Section 1: hero ── */}
      <section style={{ ...fullBleed, backgroundColor: '#fbf4e9', padding: '72px 20px 48px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#45220d',
              backgroundColor: 'rgba(206,150,90,0.18)',
              border: '1px solid rgba(206,150,90,0.45)',
              borderRadius: '999px',
              padding: '8px 24px',
              fontSize: 'clamp(17px, 2.4vw, 24px)',
              marginBottom: '28px',
            }}
          >
            {LANDING_EYEBROW}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(36px, 6.5vw, 68px)',
              lineHeight: '1.08',
              fontWeight: 400,
              marginBottom: '28px',
            }}
          >
            {LANDING_HEADLINE}
          </h1>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>{bySection(1).map((block, i) => renderBlock(block, i))}</div>
          <div style={{ marginTop: '12px' }}>
            <StartButton onStart={onStart} />
          </div>
        </div>
      </section>

      {/* ── Section 2: the case ── */}
      <section style={{ ...fullBleed, position: 'relative', overflow: 'hidden', padding: '56px 20px' }}>
        <BgPhoto src={img('BO1A8972.jpg')} alt="Aerial view of a Moroccan tiled pool" overlay="rgba(251,244,233,0.85)" position="50% 65%" />
        <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {bySection(2).map((block, i) => renderBlock(block, i))}
        </div>
      </section>

      {/* ── Section 3: the reframe ── */}
      <section style={{ ...fullBleed, backgroundColor: '#525421', padding: '72px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>{bySection(3).map((block, i) => renderBlock(block, i))}</div>
      </section>

      {/* ── Section 4: the pattern ── */}
      <section style={{ ...fullBleed, position: 'relative', overflow: 'hidden', padding: '64px 20px' }}>
        <BgPhoto src={img('BO1A9059.jpg')} alt="Green ceramic pot with a fern on a bed" overlay="rgba(251,244,233,0.88)" />
        <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {bySection(4).map((block, i) => renderBlock(block, i))}
        </div>
      </section>

      {/* ── Section 5: the promise + CTA ── */}
      <section style={{ ...fullBleed, backgroundColor: '#e8eeba', padding: '56px 20px 88px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '8px' }}>{bySection(5).map((block, i) => renderBlock(block, i))}</div>

          <div style={{ margin: '28px 0 36px' }}>
            {PRE_QUIZ_INSTRUCTIONS.map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-inter-sans), sans-serif',
                  color: 'rgba(45,21,6,0.75)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  maxWidth: '560px',
                  margin: i === 0 ? '0 auto 8px' : '0 auto',
                }}
              >
                {para}
              </p>
            ))}
          </div>

          <StartButton onStart={onStart} large />

          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.7)', fontSize: '12px', marginTop: '16px' }}>
            {LANDING_MICROCOPY}
          </p>
        </div>
      </section>

      {/* ── Section 6: meet Madison ── */}
      <section style={{ ...fullBleed, position: 'relative', minHeight: 'clamp(360px, 42vw, 480px)', display: 'flex', alignItems: 'flex-end' }}>
        <Image
          src="/ffa/madison-courtyard.jpg"
          alt="Madison smiling over her shoulder in a sunlit Moroccan courtyard"
          fill
          unoptimized
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: '65% 30%' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(45,21,6,0.1) 0%, rgba(45,21,6,0.55) 55%, rgba(45,21,6,0.85) 100%)',
          }}
        />
        <div style={{ position: 'relative', width: '100%', padding: '48px 20px 44px', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#faf9f5',
              fontSize: 'clamp(18px, 2.6vw, 24px)',
              lineHeight: '1.5',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            Hi, I&apos;m Madison — ex-data scientist turned fitness nerd. I built this because I was done guessing about my own body, too.
          </p>
        </div>
      </section>
    </div>
  );
}
