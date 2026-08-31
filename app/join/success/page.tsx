import Link from 'next/link';
import Image from 'next/image';
import { subscribeToConvertKit, subscribeToConvertKitSequence } from '@/app/lib/convertkit';

const img = (name: string) => `/Body%20Unmuted%20Brand%20Images/${name}`;

export default async function JoinSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; name?: string }>;
}) {
  const { email, name } = await searchParams;

  if (email) {
    try {
      await subscribeToConvertKit(email, name, process.env.CONVERTKIT_MEMBERSHIP_FORM_ID);
    } catch (err) {
      console.error('ConvertKit subscribe error:', err);
    }

    const sequenceId = process.env.CONVERTKIT_INTAKE_SEQUENCE_ID;
    if (sequenceId) {
      const sequenceResult = await subscribeToConvertKitSequence(email, name, sequenceId);
      if (!sequenceResult.ok) {
        console.error('Failed to enroll new member in ConvertKit welcome sequence');
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row" style={{ minHeight: '100vh', backgroundColor: '#fbf4e9' }}>
      <div className="w-full h-[220px] md:h-screen md:w-[44%] md:sticky md:top-0" style={{ position: 'relative', flexShrink: 0 }}>
        <Image
          src={img('BO1A9466.jpg')}
          alt="Madison glancing back through an ornate open door, surrounded by greenery"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 44vw"
          style={{ objectFit: 'cover', objectPosition: '50% 55%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(45,21,6,0.3)' }} />
        <Link
          href="/"
          style={{
            position: 'absolute',
            top: '28px',
            left: '28px',
            fontFamily: 'var(--font-instrument-serif), serif',
            fontSize: '20px',
            color: '#fbf4e9',
            textDecoration: 'none',
          }}
        >
          Body Unmuted
        </Link>
      </div>

      <div className="w-full md:w-[56%] flex items-center justify-center" style={{ padding: '56px 24px' }}>
        <div style={{ width: '100%', maxWidth: '440px' }} className="quiz-fade-in">
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#ce965a',
              fontSize: 'clamp(20px, 2.2vw, 26px)',
              marginBottom: '16px',
            }}
          >
            Woo hoo!
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(38px, 4.6vw, 54px)',
              lineHeight: '1.05',
              fontWeight: 400,
              marginBottom: '20px',
            }}
          >
            You&rsquo;re in.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter-sans), sans-serif',
              color: '#45220d',
              fontSize: '17px',
              lineHeight: '1.6',
              marginBottom: '36px',
            }}
          >
            Welcome to Body Unmuted. Check your inbox — I&rsquo;ve sent you an email with everything you need to
            complete your onboarding and get your 1:1 strategy call on the calendar.
          </p>
          <Link href="/" className="btn-primary" style={{ padding: '14px 28px' }}>
            Back to the site
          </Link>
        </div>
      </div>
    </div>
  );
}
