'use client';

import { useEffect, useState } from 'react';

// End of day, August 24 — interpreted in each visitor's own local timezone.
const DEADLINE = new Date(2026, 7, 24, 23, 59, 59).getTime();

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, DEADLINE - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};

function Unit({ value, label, numColor, labelColor }: { value: number; label: string; numColor: string; labelColor: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p
        style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          color: numColor,
          fontSize: 'clamp(28px, 4vw, 40px)',
          lineHeight: '1',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {String(value).padStart(2, '0')}
      </p>
      <p style={{ ...eyebrow, color: labelColor, fontSize: '10px', marginTop: '6px' }}>{label}</p>
    </div>
  );
}

export default function CountdownTimer({
  variant = 'dark',
  label = 'Founding member pricing closes in',
}: {
  variant?: 'dark' | 'light';
  label?: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const isDark = variant === 'dark';
  const numColor = isDark ? '#fbf4e9' : '#2d1506';
  const labelColor = isDark ? '#e8eeba' : '#a67c52';
  const dividerColor = isDark ? 'rgba(251,244,233,0.25)' : 'rgba(45,21,6,0.15)';

  // Render static 00s on the server / before mount to avoid a hydration flash.
  const t = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const expired = timeLeft !== null && t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0;

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ ...eyebrow, color: isDark ? '#e8eeba' : '#ce965a', marginBottom: '14px' }}>
        {expired ? 'Founding member pricing has closed' : label}
      </p>
      {!expired && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '18px' }}>
          <Unit value={t.days} label="Days" numColor={numColor} labelColor={labelColor} />
          <span style={{ color: dividerColor, fontSize: '24px', transform: 'translateY(-6px)' }}>:</span>
          <Unit value={t.hours} label="Hrs" numColor={numColor} labelColor={labelColor} />
          <span style={{ color: dividerColor, fontSize: '24px', transform: 'translateY(-6px)' }}>:</span>
          <Unit value={t.minutes} label="Min" numColor={numColor} labelColor={labelColor} />
          <span style={{ color: dividerColor, fontSize: '24px', transform: 'translateY(-6px)' }}>:</span>
          <Unit value={t.seconds} label="Sec" numColor={numColor} labelColor={labelColor} />
        </div>
      )}
    </div>
  );
}
