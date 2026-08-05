import BrandOrb from '@/components/BrandOrb';

export default function QuizCalculating() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
      }}
      role="status"
      aria-live="polite"
    >
      <BrandOrb size="md" pulse />
      <p
        style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          color: '#2d1506',
          fontSize: 'clamp(22px, 3vw, 28px)',
          marginTop: '24px',
        }}
      >
        Finding your blind spot…
      </p>
    </div>
  );
}
