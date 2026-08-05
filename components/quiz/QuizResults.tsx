'use client';

import { ARCHETYPES } from '@/app/lib/quiz/config';
import type { ArchetypeId } from '@/app/lib/quiz/types';
import { track } from '@/app/lib/quiz/analytics';
import BrandOrb from '@/components/BrandOrb';

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ce965a',
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-instrument-serif), serif',
  color: '#2d1506',
  fontSize: '20px',
  lineHeight: '1.2',
  marginBottom: '8px',
};

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter-sans), sans-serif',
  color: '#45220d',
  fontSize: '15px',
  lineHeight: '1.55',
};

const panelStyle: React.CSSProperties = {
  backgroundColor: '#faf9f5',
  border: '1px solid rgba(206,150,90,0.28)',
  borderRadius: '12px',
  padding: '32px',
  marginBottom: '20px',
  boxShadow: '0 4px 24px rgba(45,21,6,0.05)',
};

function GoldDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', margin: '48px 0 24px' }}>
      <span style={{ height: '1px', width: '48px', backgroundColor: 'rgba(206,150,90,0.4)' }} />
      <span
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 34% 28%, #fdf9f0, #ce965a 70%, #82571f 100%)',
        }}
      />
      <span style={{ height: '1px', width: '48px', backgroundColor: 'rgba(206,150,90,0.4)' }} />
    </div>
  );
}

export default function QuizResults({
  primary,
  secondary,
  onRestart,
}: {
  primary: ArchetypeId;
  secondary: ArchetypeId;
  onRestart: () => void;
}) {
  const primaryArchetype = ARCHETYPES[primary];
  const secondaryArchetype = ARCHETYPES[secondary];

  const membershipHref = `/work-with-me?qr=${primary}&qs=${secondary}`;

  return (
    <div className="quiz-fade-in" style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <BrandOrb size="md" />
        </div>
        <p style={eyebrowStyle}>Your Primary Blind Spot</p>
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(30px, 4.6vw, 46px)',
            lineHeight: '1.1',
            fontWeight: 400,
            marginTop: '8px',
          }}
        >
          {primaryArchetype.name}
          {primaryArchetype.shortLabel && (
            <span style={{ display: 'block', fontSize: '0.45em', color: '#ce965a', fontStyle: 'italic', marginTop: '6px' }}>
              ({primaryArchetype.shortLabel})
            </span>
          )}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            fontStyle: 'italic',
            color: '#82921c',
            fontSize: 'clamp(18px, 2.4vw, 24px)',
            marginTop: '16px',
          }}
        >
          “{primaryArchetype.headline}”
        </p>
      </div>

      <div style={panelStyle}>
        <p style={bodyStyle}>{primaryArchetype.pattern}</p>
      </div>

      <div style={panelStyle}>
        <p style={{ ...eyebrowStyle, color: '#82921c' }}>What you’re already doing well</p>
        <p style={{ ...bodyStyle, marginTop: '8px' }}>{primaryArchetype.doingWell}</p>
      </div>

      <div style={panelStyle}>
        <p style={eyebrowStyle}>The real blind spot</p>
        <p style={{ ...bodyStyle, marginTop: '8px' }}>{primaryArchetype.blindSpot}</p>
      </div>

      <div style={panelStyle}>
        <p style={sectionTitleStyle}>Why this has made transformation difficult</p>
        <p style={bodyStyle}>{primaryArchetype.whyStalled}</p>
      </div>

      <div style={{ ...panelStyle, backgroundColor: '#efdfc3', border: '1px solid rgba(206,150,90,0.45)' }}>
        <p style={sectionTitleStyle}>What your body actually needs next</p>
        <p style={bodyStyle}>{primaryArchetype.whatsNext}</p>
      </div>

      {/* Secondary result */}
      <GoldDivider />
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <p style={eyebrowStyle}>Your Secondary Blind Spot</p>
        <h2
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(22px, 3vw, 30px)',
            marginTop: '8px',
          }}
        >
          {secondaryArchetype.name}
        </h2>
      </div>

      <div style={panelStyle}>
        <p style={bodyStyle}>{secondaryArchetype.pattern}</p>
        <p style={{ ...bodyStyle, marginTop: '14px' }}>
          <strong>How it quietly reinforces your primary pattern: </strong>
          {secondaryArchetype.secondaryDescription}
        </p>
        <p style={{ ...bodyStyle, marginTop: '14px', fontStyle: 'italic' }}>
          Solving your primary pattern alone may not be enough — this second one has a way of undoing progress on the
          first if it goes unaddressed.
        </p>
      </div>

      {/* Next steps */}
      <GoldDivider />
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <p style={eyebrowStyle}>Your Next Steps</p>
      </div>

      <div style={panelStyle}>
        <ol style={{ paddingLeft: '20px' }}>
          {primaryArchetype.nextSteps.map((step, i) => (
            <li key={i} style={{ ...bodyStyle, marginBottom: i < 2 ? '14px' : 0 }}>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Body Reclaimed bridge */}
      <div
        style={{
          marginTop: '48px',
          background: 'linear-gradient(160deg, #2d1506 0%, #3a1c09 100%)',
          border: '1px solid rgba(206,150,90,0.35)',
          borderRadius: '14px',
          padding: '44px 32px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(45,21,6,0.18)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <BrandOrb size="sm" />
        </div>
        <p style={{ ...eyebrowStyle, color: '#e8eeba' }}>Where This Leads</p>
        <h2
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#fbf4e9',
            fontSize: 'clamp(24px, 3.4vw, 32px)',
            margin: '12px 0 16px',
          }}
        >
          Body Reclaimed
        </h2>
        <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: '15px', lineHeight: '1.55', maxWidth: '520px', margin: '0 auto 28px' }}>
          {primaryArchetype.bridge}
        </p>
        <a
          href={membershipHref}
          onClick={() => track('quiz_body_reclaimed_cta_clicked', { primary, secondary })}
          className="btn-yellow-green"
          style={{ textDecoration: 'none' }}
        >
          Explore Body Reclaimed
        </a>
      </div>

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <button
          type="button"
          onClick={onRestart}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-inter-sans), sans-serif',
            color: 'rgba(45,21,6,0.55)',
            fontSize: '13px',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          Retake the quiz
        </button>
      </div>
    </div>
  );
}
