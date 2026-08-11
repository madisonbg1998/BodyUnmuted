/** Generalizes the "No activity yet" pattern from the dashboard home page for reuse across new sections. */
export default function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      {icon && (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(45,21,6,0.06)',
            color: 'rgba(45,21,6,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          {icon}
        </div>
      )}
      <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '17px' }}>{title}</p>
      {description && (
        <p
          style={{
            fontFamily: 'var(--font-inter-sans), sans-serif',
            color: 'rgba(45,21,6,0.55)',
            fontSize: '13px',
            marginTop: '4px',
          }}
        >
          {description}
        </p>
      )}
      {action && <div style={{ marginTop: '16px' }}>{action}</div>}
    </div>
  );
}
