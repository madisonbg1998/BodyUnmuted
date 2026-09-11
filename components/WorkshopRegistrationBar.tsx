'use client';

import { useEffect, useState } from 'react';

const LUMA_URL = 'https://luma.com/numw8n89';

/**
 * Persistent registration reminder. Watches two sentinel elements the page
 * must render (#workshop-hero-end, #workshop-final-cta) and shows only
 * between them, so it never competes with the hero CTA or the final one.
 * Desktop renders as a top bar, mobile as a bottom bar — never both, via
 * CSS media queries on the two variants below.
 */
export default function WorkshopRegistrationBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroEnd = document.getElementById('workshop-hero-end');
    const finalCta = document.getElementById('workshop-final-cta');
    if (!heroEnd || !finalCta) return;

    let pastHero = false;
    let ctaVisible = false;
    const update = () => setVisible(pastHero && !ctaVisible);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = entry.boundingClientRect.top < 0;
        update();
      },
      { threshold: 0 }
    );
    heroObserver.observe(heroEnd);

    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        ctaVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.05 }
    );
    ctaObserver.observe(finalCta);

    return () => {
      heroObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  const barContentStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
  };

  const detailStyle: React.CSSProperties = {
    fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
    fontSize: '13px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#e8eeba',
  };

  return (
    <>
      <div className={`workshop-reg-bar workshop-reg-bar--desktop${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
        <div style={barContentStyle}>
          <p style={{ ...detailStyle, margin: 0 }}>Free | September 29 to October 1 | Live Online</p>
          <a href={LUMA_URL} target="_blank" rel="noopener noreferrer" className="luxe-button" style={{ backgroundColor: '#fbf4e9', color: '#2d1506' }}>
            Save My Free Spot
          </a>
        </div>
      </div>

      <div className={`workshop-reg-bar workshop-reg-bar--mobile${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
        <div style={{ ...barContentStyle, padding: '10px 16px' }}>
          <p style={{ ...detailStyle, margin: 0, fontSize: '11px' }}>Free | Sept 29&ndash;Oct 1</p>
          <a href={LUMA_URL} target="_blank" rel="noopener noreferrer" className="luxe-button" style={{ backgroundColor: '#fbf4e9', color: '#2d1506', fontSize: '11px', padding: '0.7rem 1rem' }}>
            Save My Spot
          </a>
        </div>
      </div>
    </>
  );
}
