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

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
      role="img"
      aria-label={`${label}: ${value} of ${target}${unit}, ${percentLabel}% of target`}
    >
      <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="#e8eeba" strokeWidth={STROKE} />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#525421"
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
