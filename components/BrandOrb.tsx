const SIZES = {
  xs: 28,
  sm: 40,
  md: 64,
  lg: 190,
};

export default function BrandOrb({
  size = 'md',
  pulse = false,
}: {
  size?: keyof typeof SIZES;
  pulse?: boolean;
}) {
  const dim = SIZES[size];

  return (
    <div
      style={{
        width: dim,
        height: dim,
        borderRadius: '50%',
        flexShrink: 0,
        background:
          'radial-gradient(circle at 34% 28%, #fdf9f0 0%, #f3e4c4 14%, #e8c383 32%, #ce965a 52%, #82571f 74%, #2d1506 100%)',
        boxShadow:
          size === 'lg'
            ? '0 0 0 1px rgba(206,150,90,0.3), 0 0 0 10px rgba(206,150,90,0.08), 0 0 0 22px rgba(206,150,90,0.05), 0 0 60px rgba(206,150,90,0.35)'
            : size === 'md'
              ? '0 0 0 1px rgba(206,150,90,0.28), 0 0 0 6px rgba(206,150,90,0.08), 0 0 24px rgba(206,150,90,0.3)'
              : '0 0 0 1px rgba(206,150,90,0.25)',
        animation: pulse ? 'brand-orb-pulse 2.4s ease-in-out infinite' : undefined,
      }}
    >
      <style>{`
        @keyframes brand-orb-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
}
