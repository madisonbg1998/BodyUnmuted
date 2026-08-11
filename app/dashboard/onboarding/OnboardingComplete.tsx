import Link from 'next/link';
import DashboardPanel from '@/components/DashboardPanel';

export default function OnboardingComplete() {
  return (
    <div style={{ maxWidth: '560px' }}>
      <DashboardPanel>
        <div style={{ padding: '40px 24px', textAlign: 'center' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#e8eeba',
              color: '#525421',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '22px', marginBottom: '8px' }}>
            You&apos;re all set
          </p>
          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.65)', fontSize: '14px', marginBottom: '24px' }}>
            Your account is ready. You can update any of this later from your profile.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link href="/dashboard" className="btn-primary" style={{ textDecoration: 'none' }}>
              Go to Dashboard
            </Link>
            <Link href="/dashboard/profile" className="btn-secondary" style={{ color: '#45220d', borderColor: '#45220d', textDecoration: 'none' }}>
              Edit Profile
            </Link>
          </div>
        </div>
      </DashboardPanel>
    </div>
  );
}
