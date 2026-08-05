const SIZE = 128;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function MacroRing({
  label,
  value,
  target,
  unit,
}: {
  label: string;
  value: number;
  target: number;
  unit: string;
}) {
  const pct = Math.min(value / target, 1);
  const offset = CIRCUMFERENCE * (1 - pct);
  const percentLabel = Math.round((value / target) * 100);
  const gradientId = `macro-ring-${label.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
      role="img"
      aria-label={`${label}: ${value} of ${target}${unit}, ${percentLabel}% of target`}
    >
      <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ transform: 'rotate(-90deg)' }}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ce965a" />
              <stop offset="100%" stopColor="#525421" />
            </linearGradient>
          </defs>
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="#efe9d8" strokeWidth={STROKE} />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.4s ease' }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '26px', lineHeight: '1' }}>
            {value}
          </span>
          <span style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.55)', fontSize: '11px', marginTop: '2px' }}>
            / {target}{unit}
          </span>
        </div>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#ce965a',
        }}
      >
        {label}
      </p>
    </div>
  );
}
