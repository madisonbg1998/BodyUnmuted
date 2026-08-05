export default function QuizProgress({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label?: string;
}) {
  const pct = Math.round((current / total) * 100);

  return (
    <div style={{ marginBottom: '32px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#ce965a',
          marginBottom: '8px',
        }}
      >
        <span>{label || `Question ${current} of ${total}`}</span>
        <span>{pct}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          height: '6px',
          borderRadius: '999px',
          backgroundColor: 'rgba(45,21,6,0.1)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            backgroundColor: '#525421',
            borderRadius: '999px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
