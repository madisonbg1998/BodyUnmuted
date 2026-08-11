const panelStyle: React.CSSProperties = {
  backgroundColor: '#faf9f5',
  border: '1px solid rgba(206,150,90,0.28)',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(45,21,6,0.05)',
};

const panelHeaderStyle: React.CSSProperties = {
  padding: '20px 24px',
  borderBottom: '1px solid rgba(45,21,6,0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
};

const panelTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-instrument-serif), serif',
  color: '#2d1506',
  fontSize: '20px',
  lineHeight: '1',
  fontWeight: 400,
};

const panelMetaStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter-sans), sans-serif',
  color: 'rgba(45,21,6,0.55)',
  fontSize: '13px',
  marginTop: '4px',
};

/** Shared card shell used across dashboard pages — extracted so new pages don't re-copy panelStyle/panelHeaderStyle blocks. */
export default function DashboardPanel({
  title,
  meta,
  action,
  children,
  bodyStyle,
}: {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  bodyStyle?: React.CSSProperties;
}) {
  return (
    <div style={panelStyle}>
      {title && (
        <div style={panelHeaderStyle}>
          <div>
            <h2 style={panelTitleStyle}>{title}</h2>
            {meta && <p style={panelMetaStyle}>{meta}</p>}
          </div>
          {action}
        </div>
      )}
      <div style={bodyStyle}>{children}</div>
    </div>
  );
}
