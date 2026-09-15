'use client';

import { useEffect, useState } from 'react';

const LUMA_URL = 'https://luma.com/numw8n89';

/**
 * Persistent announcement bar. Visible from page load (this is the site's
 * "announcement bar" for the workshop), and hides only once the final CTA
 * section scrolls into view via the #workshop-final-cta sentinel, so it
 * never competes with that closing moment. Desktop renders as a top bar,
 * mobile as a bottom bar — never both, via CSS media queries on the two
 * variants below.
 */
export default function WorkshopRegistrationBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const finalCta = document.getElementById('workshop-final-cta');
    if (!finalCta) return;

    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    ctaObserver.observe(finalCta);

    return () => {
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
          <p style={{ ...detailStyle, margin: 0 }}>Free One-Day Live Workshop | September 30</p>
          <a href={LUMA_URL} target="_blank" rel="noopener noreferrer" className="luxe-button" style={{ backgroundColor: '#fbf4e9', color: '#2d1506' }}>
            Save My Free Spot
          </a>
        </div>
      </div>

      <div className={`workshop-reg-bar workshop-reg-bar--mobile${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
        <div style={{ ...barContentStyle, padding: '10px 16px' }}>
          <p style={{ ...detailStyle, margin: 0, fontSize: '11px' }}>Free Workshop | Sept 30</p>
          <a
            href={LUMA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="luxe-button"
            style={{ backgroundColor: '#fbf4e9', color: '#2d1506', fontSize: '11px', padding: '0.7rem 1rem' }}
          >
            Save My Free Spot
          </a>
        </div>
      </div>
    </>
  );
}
