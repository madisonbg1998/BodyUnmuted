import Link from 'next/link';
import Image from 'next/image';
import MembershipFaq from '@/components/MembershipFaq';
import OneOnOneForm from '@/components/OneOnOneForm';
import LightContactForm from '@/components/LightContactForm';

const img = (name: string) => `/Body%20Unmuted%20Brand%20Images/${name}`;

const Photo = ({
  src,
  alt,
  aspect = '3/2',
  className = '',
  position = '50% 50%',
}: {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  position?: string;
}) => (
  <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
    <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover', objectPosition: position }} />
  </div>
);

const BgPhoto = ({ src, alt, overlay, position = '50% 50%' }: { src: string; alt: string; overlay: string; position?: string }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: position }} />
    <div style={{ position: 'absolute', inset: 0, background: overlay }} />
  </div>
);

const bodyP: React.CSSProperties = {
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontSize: 'clamp(15px, 1.6vw, 19px)',
  lineHeight: '1.6',
};

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: 'clamp(12px, 1.3vw, 15px)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

function ArrowIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="18" height="14" viewBox="0 0 24 18" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M1 9h20M14 2l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Btn({
  href,
  bg,
  color,
  border,
  large = false,
  children,
}: {
  href: string;
  bg: string;
  color: string;
  border?: string;
  large?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: large ? '18px' : '14px',
        backgroundColor: bg,
        color,
        border: border || 'none',
        fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
        fontSize: large ? '15px' : '13px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        padding: large ? '22px 40px' : '16px 28px',
        borderRadius: '2px',
        textDecoration: 'none',
      }}
    >
      {children}
      <ArrowIcon color={color} />
    </Link>
  );
}

function ArrowItem({ children, color = '#ce965a', textColor, divider = false }: { children: React.ReactNode; color?: string; textColor?: string; divider?: boolean }) {
  return (
    <div style={{ borderTop: divider ? '1px solid rgba(45,21,6,0.15)' : 'none', paddingTop: divider ? '22px' : 0, marginBottom: '22px' }}>
      <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
        <span
          style={{
            flexShrink: 0,
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            border: `1.5px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '15px',
            color,
          }}
        >
          &rarr;
        </span>
        <p style={{ ...bodyP, color: textColor || '#2d1506', paddingTop: '5px' }}>{children}</p>
      </div>
    </div>
  );
}

function CheckItem({ children, color = '#2d1506' }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '10px' }}>
      <span style={{ flexShrink: 0, color: '#ce965a', fontSize: '16px' }}>&#10003;</span>
      <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color, fontSize: '15px' }}>{children}</p>
    </div>
  );
}

function IncludedItem({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div>
      <div style={{ display: 'flex', gap: '18px', alignItems: 'center', marginBottom: '18px' }}>
        <div style={{ width: '110px', height: '104px', flexShrink: 0, position: 'relative' }}>
          <Image src={img(icon)} alt="" fill sizes="110px" style={{ objectFit: 'cover' }} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#525421', fontSize: '22px', lineHeight: '1.25' }}>
          {title}
        </h3>
      </div>
      <p style={{ ...bodyP, color: '#45220d', fontSize: '15px' }}>{body}</p>
    </div>
  );
}

function MonthBlock({
  month,
  title,
  intro,
  bullets,
  image,
  alt,
  imageSide,
  bg,
  imagePosition = '50% 50%',
}: {
  month: string;
  title: string;
  intro: string;
  bullets: string[];
  image: string;
  alt: string;
  imageSide: 'left' | 'right';
  bg: string;
  imagePosition?: string;
}) {
  const textCol = (
    <div className="w-full md:w-[56%]" style={{ padding: '80px 40px' }}>
      <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#ce965a', fontSize: 'clamp(40px, 5.5vw, 62px)', lineHeight: '1' }}>
        {month}
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          fontStyle: 'italic',
          color: '#2d1506',
          fontSize: 'clamp(30px, 3.8vw, 46px)',
          lineHeight: '1.15',
          marginBottom: '24px',
        }}
      >
        {title}
      </h3>
      <p style={{ ...bodyP, color: '#45220d', marginBottom: '28px', fontSize: 'clamp(16px, 1.7vw, 20px)' }}>{intro}</p>
      {bullets.map((b, i) => (
        <ArrowItem key={i} divider={i > 0}>
          {b}
        </ArrowItem>
      ))}
    </div>
  );
  const imageCol = (
    <div className="w-full md:w-[44%]" style={{ position: 'relative', minHeight: '460px' }}>
      <Image src={img(image)} alt={alt} fill sizes="(max-width: 768px) 100vw, 44vw" style={{ objectFit: 'cover', objectPosition: imagePosition }} />
    </div>
  );
  return (
    <section style={{ backgroundColor: bg }}>
      <div className="flex flex-col md:flex-row items-stretch">
        {imageSide === 'left' ? (
          <>
            {imageCol}
            {textCol}
          </>
        ) : (
          <>
            {textCol}
            {imageCol}
          </>
        )}
      </div>
    </section>
  );
}

function TestimonialCard({ body, name }: { body: string; name: string }) {
  return (
    <div style={{ backgroundColor: 'rgba(45,21,6,0.55)', padding: '32px' }}>
      <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
        {body}
      </p>
      <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: '15px' }}>&mdash;{name}</p>
    </div>
  );
}

const benefitBlocks = [
  {
    n: '01.',
    title: 'Walk Into the Gym With Confidence',
    body: 'Know exactly what you’re doing, why you’re doing it, and how to move through every workout without wandering around, feeling intimidated, or second-guessing yourself.',
  },
  {
    n: '02.',
    title: 'Build Strength You Can Measure',
    body: 'Stop repeating random workouts and start progressing with intention as you lift heavier, build muscle, and see clear evidence that your effort is working.',
  },
  {
    n: '03.',
    title: 'Create Consistency That Fits Your Life',
    body: 'Know how to keep moving forward through travel, dinners, deadlines, and changing routines without needing perfect conditions—or starting over every Monday.',
  },
  {
    n: '04.',
    title: 'Understand What Your Body Needs',
    body: 'Begin recognizing how your body responds to training, nutrition, stress, and recovery so you can make confident decisions instead of relying on more rules or guesswork.',
  },
];

const gainPhrases = [
  'Build muscle you can see',
  'Read what your numbers mean',
  'Make macros fit real life',
  'Lose fat without extremes',
  'Fuel muscle, energy, and recovery',
  'Choose supplements worth taking',
  'Train to produce change',
  'Enjoy meals without guilt',
  'Know what your body needs',
  'Progress without pushing blindly',
  'Travel without losing momentum',
  'Adjust with confidence',
];

const communityItems = [
  {
    label: 'Community Chats',
    body: 'Ask questions, share what you’re learning, and get support through every part of the process, not only when things are going perfectly.',
  },
  {
    label: 'A Space for Your Wins',
    body: 'Celebrate the heavier lift, the progress photo, the confident choice, and every moment that proves you’re becoming the woman you came here to be.',
  },
  {
    label: 'Guest Expert Conversations',
    body: 'Connect with specialists during guest expert residencies, ask your own questions, and explore the areas of women’s health most fitness programs leave out.',
  },
  {
    label: 'Private Accountability Group Chat',
    body: 'You’ll be matched with accountability partners and given a private space to check in, keep one another moving, and have people who notice your effort and genuinely cheer you on.',
  },
];

export default function WorkWithMe() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '120px 20px 80px' }} className="min-h-[520px] flex items-center">
        <BgPhoto src={img('BO1A8370-small-crop.jpg')} alt="Balcony architecture, softly lit" overlay="rgba(251,244,233,0.55)" />
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h1
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#45220d',
              fontSize: 'clamp(38px, 6vw, 70px)',
              lineHeight: '1.05',
              fontWeight: 400,
              marginBottom: '8px',
            }}
          >
            Body Unmuted:
          </h1>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#45220d',
              fontSize: 'clamp(44px, 7vw, 82px)',
              lineHeight: '1.05',
              fontWeight: 400,
              marginBottom: '28px',
            }}
          >
            The Membership
          </h2>
          <p style={{ ...bodyP, color: '#2d1506', fontSize: 'clamp(16px, 2vw, 22px)', marginBottom: '32px' }}>
            the GROUP FITNESS COACHING MEMBERSHIP for location-free female founders, built to flex with your life,
            not fight it.
          </p>
          <Btn href="/contact" bg="#2d1506" color="#fbf4e9">
            join now
          </Btn>
        </div>
      </section>

      {/* ── 4 benefit blocks ── */}
      <section style={{ background: 'linear-gradient(135deg, #ce965a 0%, #e8c383 100%)', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '56px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#fbf4e9',
              fontSize: 'clamp(26px, 3.6vw, 46px)',
              lineHeight: '1.25',
            }}
          >
            What if twelve weeks from now, you weren&rsquo;t still trying to figure out what works&mdash;you had a
            system that was already working for you?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {benefitBlocks.map((b) => (
            <div key={b.n}>
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#fbf4e9', fontSize: '48px', lineHeight: '1', marginBottom: '12px', opacity: 0.85 }}>
                {b.n}
              </p>
              <h3 style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#fbf4e9', fontSize: '24px', lineHeight: '1.25', marginBottom: '12px' }}>
                {b.title}
              </h3>
              <p style={{ ...bodyP, color: '#fbf4e9', fontSize: '14px', opacity: 0.9 }}>{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── "Why does it feel like..." — full-bleed image + arrow list ── */}
      <section style={{ backgroundColor: '#fbf4e9' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
          <div style={{ position: 'relative', minHeight: '460px', backgroundColor: '#e9e2d0' }}>
            <Image
              src={img('madison-fan-hero.webp')}
              alt="Madison laughing, holding a fan"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
            />
          </div>
          <div style={{ padding: '88px 56px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: '#2d1506',
                fontSize: 'clamp(32px, 4vw, 50px)',
                lineHeight: '1.15',
                fontWeight: 400,
                marginBottom: '24px',
              }}
            >
              Why does it feel like every time life changes, your fitness has to start over?
            </h2>
            <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#7f8b32', fontSize: 'clamp(18px, 2.2vw, 26px)', marginBottom: '28px' }}>
              Maybe you&apos;ve found yourself here before&hellip;
            </p>
            <ArrowItem>
              You finally build momentum, then work gets busy, you book another trip, life shifts, and suddenly
              you&apos;re starting from scratch again.
            </ArrowItem>
            <ArrowItem>
              Every fitness program seems designed for someone whose life revolves around meal prep, routine, and
              never missing a workout.
            </ArrowItem>
            <ArrowItem>You want to build muscle and lose fat, but not at the expense of your freedom.</ArrowItem>
            <ArrowItem>
              You&apos;ve followed plans before. You know how to &ldquo;be healthy.&rdquo; But no one ever taught
              you how to adapt when life inevitably changes.
            </ArrowItem>
            <ArrowItem>
              Accountability is hard to hold onto when you&apos;re never in the same place, or even the same time
              zone, for long.
            </ArrowItem>
            <div style={{ marginTop: '56px' }}>
              <Btn href="/contact" bg="#2d1506" color="#fbf4e9">
                get started now
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* ── ticker — continuous marquee ── */}
      <div style={{ backgroundColor: '#ce965a', padding: '18px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: 'max-content' }} className="animate-marquee">
          {[0, 1].map((rep) => (
            <p
              key={rep}
              style={{
                ...eyebrow,
                color: '#fbf4e9',
                whiteSpace: 'nowrap',
                margin: 0,
                fontSize: '16px',
                letterSpacing: '0.15em',
                paddingRight: '0',
              }}
            >
              {Array(10).fill('WAITLIST NOW OPEN').join(' // ') + ' // '}
            </p>
          ))}
        </div>
      </div>

      {/* ── "Here's what most fitness programs miss." / "Your body, your life..." ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '96px 20px' }} className="min-h-[380px] flex items-center">
        <BgPhoto src={img('BO1A9059.jpg')} alt="Green ceramic pot on a bed" overlay="rgba(251,244,233,0.72)" />
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#45220d',
              fontSize: 'clamp(32px, 4.4vw, 54px)',
              lineHeight: '1.15',
              fontWeight: 400,
              marginBottom: '20px',
            }}
          >
            Here&apos;s what most fitness programs miss.
          </h2>
          <p style={{ ...eyebrow, color: '#7f8b32', fontWeight: 700, marginBottom: '24px' }}>
            Your body, your life, and your business aren&apos;t separate.
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '32px' }}>
            When you&apos;re under-fueled, wired but tired, and disconnected from what your body actually needs, it
            doesn&apos;t just change how you feel. It changes how you show up, the energy you bring to your
            decisions, your relationships, and your work. This is about the capacity you don&apos;t know you&apos;re
            missing until you get it back.
          </p>
          <Btn href="/contact" bg="#525421" color="#fbf4e9">
            i&rsquo;m in
          </Btn>
        </div>
      </section>

      {/* ── "let me introduce... BODY UNMUTED: THE MEMBERSHIP" ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '64px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#ce965a', fontSize: 'clamp(20px, 2.6vw, 30px)', marginBottom: '20px' }}>
            let me introduce&hellip;
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#45220d',
              fontSize: 'clamp(48px, 8vw, 100px)',
              lineHeight: '1.02',
              marginBottom: '40px',
            }}
          >
            Body Unmuted:
            <br />
            <em>The Membership</em>
          </h2>
          <div style={{ maxWidth: '1100px', margin: '0 auto 40px' }}>
            <Photo src={img('generated-image-1.png')} alt="Body Unmuted app dashboard and membership materials" aspect="1.78" />
          </div>
          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#2d1506', fontSize: 'clamp(18px, 2.2vw, 26px)', marginBottom: '12px' }}>
            Most fitness coaching gives you a plan to follow.
          </p>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#ce965a', fontSize: 'clamp(20px, 2.6vw, 30px)', marginBottom: '36px' }}>
            Body Reclaimed gives you a system that travels with you.
          </p>
          <Btn href="/contact" bg="#2d1506" color="#fbf4e9">
            join now
          </Btn>
        </div>
      </section>

      {/* ── "You don't need another static plan..." ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '20px 20px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ ...bodyP, color: '#a67c52', marginBottom: '16px' }}>
            The fitness strategies you&rsquo;ve tried haven&rsquo;t failed because you weren&rsquo;t motivated
            enough. Most were built inefficiently from the beginning.
          </p>
          <p style={{ ...bodyP, color: '#a67c52', marginBottom: '16px' }}>
            Real physical transformation requires your training and nutrition to progress as your body adapts. But
            most programs give you one set of workouts, one calorie target, and a list of rules to follow&mdash;
            without showing you when, why, or how any of it should change.
          </p>
          <p style={{ ...bodyP, color: '#a67c52', marginBottom: '32px' }}>
            So even when you follow the plan, your progress eventually stalls. And because the entire thing depends
            on your life staying predictable, a trip, deadline, dinner, or unexpectedly busy week can leave you
            feeling like you&rsquo;ve fallen off and need to start again.
          </p>
          <p style={{ ...bodyP, color: '#a67c52', fontStyle: 'italic', marginBottom: '8px' }}>
            You don&rsquo;t need another static plan that only works temporarily and under perfect conditions.
          </p>
          <p style={{ ...bodyP, color: '#a67c52', fontStyle: 'italic', marginBottom: '32px' }}>
            You need a system that helps you build muscle and transform your body efficiently, teaches you how to
            understand what she needs, and continues adapting as both your body and your life change.
          </p>
          <Btn href="/contact" bg="#2d1506" color="#fbf4e9">
            join now
          </Btn>
        </div>
      </section>

      {/* ── "Body Unmuted adapts with your body and your life" ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '90px 20px' }}>
        <BgPhoto
          src={img('BO1A8370-small-crop.jpg')}
          alt="Balcony architecture, softly lit"
          overlay="linear-gradient(180deg, rgba(82,84,33,0.88) 0%, rgba(82,84,33,0.65) 45%, rgba(219,209,175,0.55) 100%)"
        />
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#fbf4e9',
              fontSize: 'clamp(32px, 4.4vw, 52px)',
              lineHeight: '1.2',
              fontWeight: 400,
              marginBottom: '28px',
            }}
          >
            Body Unmuted adapts with your body and your life
          </h2>
          <p style={{ ...bodyP, color: '#fbf4e9', marginBottom: '16px' }}>
            Your programming keeps evolving with what your body needs to keep changing.
          </p>
          <p style={{ ...bodyP, color: '#fbf4e9', marginBottom: '16px' }}>
            You&rsquo;re taught the why behind every shift, so you always know what&rsquo;s driving your results and
            what isn&rsquo;t. That knowledge makes the whole thing flexible.
          </p>
          <p style={{ ...bodyP, color: '#fbf4e9', marginBottom: '32px' }}>
            Swap a session across time zones, adjust for whatever equipment you&rsquo;ve got, keep moving through a
            launch week instead of losing it entirely.
          </p>
          <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '36px', fontStyle: 'italic' }}>
            You never receive just workouts but the system and the knowledge built to keep producing real results no
            matter where you are or how unpredictable your month gets.
          </p>
          <Btn href="/contact" bg="#c8d199" color="#2d1506" large>
            i need body unmuted
          </Btn>
        </div>
      </section>

      {/* ── "YOUR 1:1 BODY TRANSFORMATION STRATEGY SESSION" ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '90px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#45220d',
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              lineHeight: '1.1',
              fontWeight: 400,
              marginBottom: '48px',
            }}
          >
            Your 1:1 Body Transformation Strategy Session
          </h2>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-[38%] flex-shrink-0">
              <Photo src={img('Madison-73.jpg')} alt="Madison outdoors in the mountains, arms raised" aspect="0.68" />
            </div>
            <div className="w-full md:w-[62%]">
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#2d1506', fontSize: 'clamp(22px, 2.6vw, 30px)', textAlign: 'center', marginBottom: '36px' }}>
                We start with your private 1:1 strategy session with me
              </p>
              <ArrowItem divider={false}>
                <strong style={{ display: 'block', color: '#ce965a', fontSize: '19px', marginBottom: '6px' }}>
                  Get clear on where you are and where you&rsquo;re going
                </strong>
                We&rsquo;ll look at your goals, training history, current routine, and what has kept previous
                approaches from working.
              </ArrowItem>
              <ArrowItem divider>
                <strong style={{ display: 'block', color: '#ce965a', fontSize: '19px', marginBottom: '6px' }}>
                  Identify what your body needs from you now
                </strong>
                Together, we&rsquo;ll determine where your focus will make the greatest difference and how to
                approach your training, nutrition, and recovery.
              </ArrowItem>
              <ArrowItem divider>
                <strong style={{ display: 'block', color: '#ce965a', fontSize: '19px', marginBottom: '6px' }}>
                  Leave knowing exactly how to begin
                </strong>
                You&rsquo;ll walk away with clear priorities, your first steps, and the confidence that
                you&rsquo;re starting with a strategy built around you, not another generic plan.
              </ArrowItem>
            </div>
          </div>
        </div>
      </section>

      {/* ── "What you'll find inside the membership" ── */}
      <section style={{ backgroundColor: '#e8eeba', padding: '90px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#45220d',
              fontSize: 'clamp(36px, 5vw, 58px)',
              lineHeight: '1.1',
              fontWeight: 400,
              marginBottom: '56px',
              textAlign: 'center',
            }}
          >
            What you&apos;ll find inside the membership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12" style={{ marginBottom: '56px' }}>
            <IncludedItem
              icon="icon-01-strategy-call.png"
              title="A 1:1 strategy call and a custom transformation roadmap."
              body="You'll start your journey with a strategy call with me where we build your personalized strategy. Then I deliver your first month of programming and nutrition built around your life, your work, and your seasons. It changes as you progress so it never feels like a plan you'll outgrow. It keeps evolving with you, because if it doesn't change, it stops working."
            />
            <IncludedItem
              icon="icon-02-body-literacy-course.png"
              title="12 weeks of body literacy lessons"
              body="So you can understand what your body is telling you, recognize the patterns behind how it responds to training, nutrition, stress, recovery, and the changes happening in your life, and know what to adjust when something feels off. Instead of blindly following instructions or searching for another plan, you'll build the knowledge and self-trust to make confident decisions for your body—both now and long after the course ends."
            />
            <IncludedItem
              icon="icon-03-client-portal.png"
              title="Client portal to access your workouts and track your numbers"
              body="So you can walk into the gym knowing exactly what you're doing without feeling intimidated, wandering between machines, or second-guessing every exercise and begin understanding how your body responds over time."
            />
            <IncludedItem
              icon="icon-04-community-accountability.png"
              title="A community of women + accountability partners"
              body="So you have women in your corner who understand what you're working toward, help you keep showing up when life gets busy, and genuinely cheer for you as you become stronger, more confident, and more capable."
            />
            <IncludedItem
              icon="icon-05-live-group-coaching.png"
              title="Live group coaching and coach messaging access"
              body="So when questions come up, progress stalls, or life changes, you're never left guessing. You get personalized feedback, clear adjustments, and support that reflects your body, your goals, and your actual life."
            />
            <IncludedItem
              icon="icon-06-guest-expert-residencies.png"
              title="Guest Expert Residencies"
              body="Learn directly from specialists in hormones, gut health, thyroid function, recovery, and the other factors shaping how your body feels, functions, and responds. Because lasting transformation requires more than understanding your workouts—it requires understanding the body doing them."
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Btn href="/contact" bg="#525421" color="#fbf4e9">
              join now
            </Btn>
          </div>
        </div>
      </section>

      {/* ── "EVERY WORKOUT. EVERY NUMBER. RIGHT IN YOUR POCKET." ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '90px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-[55%]">
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#2d1506',
                  fontSize: 'clamp(30px, 4vw, 48px)',
                  lineHeight: '1.15',
                  fontWeight: 400,
                  marginBottom: '24px',
                }}
              >
                Every workout. Every number.
                <br />
                Right in your pocket.
              </h2>
              <p style={{ ...eyebrow, color: '#ce965a', marginBottom: '20px' }}>
                Walk into any gym knowing exactly what to do.
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '20px' }}>
                Open the app and your workout is already waiting, with everything laid out clearly from the moment
                you arrive.
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '12px', fontWeight: 700 }}>Inside, you can:</p>
              <ul style={{ ...bodyP, color: '#2d1506', paddingLeft: '22px', listStyleType: 'disc', marginBottom: '24px' }}>
                <li style={{ marginBottom: '10px' }}>Follow every exercise, set, rep, and rest period</li>
                <li style={{ marginBottom: '10px' }}>Watch demonstration videos whenever you need them</li>
                <li style={{ marginBottom: '10px' }}>Log your weights and track your strength over time</li>
                <li>Keep your workouts, nutrition, sleep, measurements, and progress photos together</li>
              </ul>
              <p style={{ ...bodyP, color: '#ce965a', marginBottom: '16px' }}>
                No wandering between machines, feeling intimidated, or wondering whether you&rsquo;re doing enough.
              </p>
              <p style={{ ...bodyP, color: '#2d1506' }}>
                And as your numbers build, you won&rsquo;t only see that your body is changing.{' '}
                <em>You&rsquo;ll begin understanding what&rsquo;s creating that change, so you can train with more confidence wherever you are.</em>
              </p>
            </div>
            <div className="w-full md:w-[45%]">
              <Photo src={img('trainerize-portal-mockup.png')} alt="Body Unmuted client portal shown on three phone screens" aspect="0.56" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 12-week course headline + phrase grid ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '90px 20px' }}>
        <BgPhoto src={img('BO1A8912.jpg')} alt="Woman lying beside a Moroccan tiled pool" overlay="rgba(69,34,13,0.6)" position="62% 85%" />
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#e8eeba',
              fontSize: 'clamp(26px, 3.6vw, 46px)',
              lineHeight: '1.4',
              fontWeight: 400,
              textAlign: 'center',
              marginBottom: '44px',
            }}
          >
            The <em>12-week</em> long body literacy course <em>dedicated</em> entirely to helping you{' '}
            <em>fully understand your body</em> and <em>optimize your training</em>
          </h2>
          <p style={{ ...eyebrow, color: '#fbf4e9', textAlign: 'center', marginBottom: '20px' }}>
            After the course you will gain insights on <strong>all of these things</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-4" style={{ marginTop: '20px' }}>
            {gainPhrases.map((p) => (
              <CheckItem key={p} color="#fbf4e9">
                {p}
              </CheckItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── "The Body Literacy Course" title (comes first) then the "what's in it" intro ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '90px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#ce965a',
              fontSize: 'clamp(60px, 9vw, 120px)',
              lineHeight: '0.95',
              fontWeight: 400,
              marginBottom: '40px',
            }}
          >
            The Body
            <br />
            Literacy Course
          </h2>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#45220d', fontSize: 'clamp(19px, 2.4vw, 28px)', marginBottom: '12px' }}>
            what exactly is in the this course?
          </p>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: 'clamp(22px, 2.8vw, 32px)' }}>
            Glad you asked. Here is what you get.
          </p>
        </div>
      </section>

      <MonthBlock
        month="Month 01"
        title="Train for Transformation"
        intro="You'll stop simply completing workouts and start understanding what makes training effective, what productive effort actually feels like, and how to tell whether your body is responding."
        bullets={[
          'Learn what actually drives muscle growth, strength, and fat loss so you know what your workouts are working toward.',
          'Learn how to recognize a productive set, choose the right weight, and challenge yourself without pushing blindly.',
          'Understand what your weights, reps, and performance are telling you and when it’s time to progress or recover.',
        ]}
        image="madison-88.jpg"
        alt="Madison outdoors in the mountains, arms raised"
        imageSide="right"
        bg="#e8eeba"
      />
      <MonthBlock
        month="Month 02"
        title="Fuel the Body You're Building"
        intro="Nutrition will stop feeling like a collection of rules and start becoming something you understand well enough to use flexibly, confidently, and in support of your results."
        bullets={[
          'Learn how calories influences your body and why your needs can change throughout the transformation process.',
          'Understand protein, carbohydrates, fats, and alcohol so you can make informed choices without expecting every meal to be perfect.',
          'Learn which nutrients and supplements genuinely support muscle, performance, and recovery and which ones are mostly expensive noise.',
        ]}
        image="Madison-243.jpg"
        alt="Madison eating from a bowl on the beach at sunset"
        imageSide="left"
        bg="#fbf4e9"
      />
      <MonthBlock
        month="Month 03"
        title="Become the Expert on Your Body"
        intro="You'll bring everything together so you can understand what your body needs, recognize when something should change, and keep progressing even when life doesn't follow the plan."
        bullets={[
          'Learn what changes in your energy, hunger, performance, sleep, and recovery may be telling you.',
          'Know how to respond when you travel, work gets busy, your routine shifts, or your progress begins to slow.',
          'Understand when to push, when to recover, and how to adjust your approach without second-guessing every choice.',
        ]}
        image="BO1A8389.jpg"
        alt="Madison leaning against a wooden door with wrought-iron balcony railing"
        imageSide="right"
        bg="#e8eeba"
        imagePosition="50% 12%"
      />

      {/* ── The Community ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '90px 20px' }}>
        <BgPhoto src={img('madison-175.jpg')} alt="Silhouette of a woman with arm raised at sunset by the ocean" overlay="rgba(251,244,233,0.88)" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ ...eyebrow, color: '#2d1506', marginBottom: '16px' }}>The Community</p>
            <h2
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: '#7f8b32',
                fontSize: 'clamp(34px, 5vw, 58px)',
                lineHeight: '1.15',
                fontWeight: 400,
                marginBottom: '28px',
                textTransform: 'uppercase',
              }}
            >
              People in your corner
              <br />
              wherever in the world you are.
            </h2>
            <p style={{ ...bodyP, color: '#45220d', maxWidth: '820px', margin: '0 auto' }}>
              Body Unmuted brings you into a community of women who care about changing their bodies but refuse to
              put their lives on hold to do it. This is where you can ask the question you&rsquo;ve been
              overthinking, talk through the week that didn&rsquo;t go to plan, share the win you&rsquo;re
              ridiculously proud of, and be surrounded by women who genuinely understand what you&rsquo;re building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
            {communityItems.map((c) => (
              <div key={c.label}>
                <p
                  style={{
                    ...eyebrow,
                    display: 'inline-block',
                    backgroundColor: 'rgba(206,150,90,0.25)',
                    color: '#525421',
                    padding: '14px 28px',
                    borderRadius: '999px',
                    marginBottom: '18px',
                  }}
                >
                  {c.label}
                </p>
                <p style={{ ...bodyP, color: '#2d1506' }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── "What Happens When You Say Yes?" — cream fades into light green ── */}
      <section style={{ background: 'linear-gradient(to bottom, #fbf4e9 0%, #e8eeba 100%)', padding: '90px 20px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '90px' }}>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-[58%]">
              <p style={{ ...eyebrow, color: '#2d1506', marginBottom: '16px' }}>What Happens When You Say Yes?</p>
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#7f8b32',
                  fontSize: 'clamp(30px, 4vw, 46px)',
                  lineHeight: '1.2',
                  fontWeight: 400,
                  marginBottom: '24px',
                }}
              >
                The moment you join, your transformation begins!
              </h2>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px' }}>
                You&rsquo;ll get your 1:1 strategy call with me where we plan your transformation roadmap together
                and make a plan around your unique life.
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px' }}>
                You&apos;ll also be added to your community space right away to introduce yourself, connect with the
                other members, and access your first body literacy lesson.
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '28px' }}>
                Within 1 week you&apos;ll have your first set of personalized workouts and nutrition programming to
                get started!
              </p>
              <Btn href="/contact" bg="#525421" color="#fbf4e9">
                join body reclaimed
              </Btn>
            </div>
            <div className="w-full md:w-[42%]">
              <Photo src={img('IMG_6545.jpg')} alt="Madison sitting on a cream couch, smiling" aspect="0.95" />
            </div>
          </div>
        </div>

        {/* seam: Founding Price title sits on the shared light-green meeting point */}
        <div style={{ backgroundColor: '#e8eeba', textAlign: 'center', padding: '0 20px 8px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#525421',
              fontSize: 'clamp(64px, 10vw, 140px)',
              lineHeight: '1',
              fontWeight: 400,
            }}
          >
            Founding Price
          </h2>
        </div>
      </section>

      {/* ── founding price detail — light green fades back into cream ── */}
      <section style={{ background: 'linear-gradient(to bottom, #e8eeba 0%, #fbf4e9 100%)', padding: '20px 20px 90px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ ...eyebrow, color: '#525421', marginBottom: '8px' }}>Founding Member Pricing, for the First Five Members</p>
          <p style={{ ...eyebrow, color: '#7f8b32', marginBottom: '32px' }}>
            The first five women to join the membership become founding members.
          </p>
          <p
            style={{
              display: 'inline-block',
              backgroundColor: '#a8b562',
              borderRadius: '999px',
              padding: '20px 56px',
              fontFamily: 'var(--font-instrument-serif), serif',
              fontSize: 'clamp(28px, 4vw, 44px)',
              marginBottom: '40px',
            }}
          >
            <span style={{ color: '#45220d', textDecoration: 'line-through' }}>$555</span>{' '}
            <span style={{ color: '#45220d' }}>$333</span>
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '4px' }}>
            That means you lock in the founding member pricing of $333/month for as long as you stay a member.
          </p>
          <p style={{ ...bodyP, color: '#45220d' }}>
            As Body Unmuted grows, your investment won&apos;t. It&apos;s my way of saying thank you for believing in
            this from the very beginning.
          </p>
        </div>
      </section>

      {/* ── testimonials ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '90px 20px' }}>
        <BgPhoto src={img('BO1A9059.jpg')} alt="Green ceramic pot on a bed" overlay="rgba(69,34,13,0.78)" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#efdfc3',
              fontSize: 'clamp(34px, 5vw, 60px)',
              lineHeight: '1.05',
              fontWeight: 400,
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '48px',
            }}
          >
            People say nice things
            <br />
            about me sometimes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TestimonialCard
              body="Working with Madison has genuinely changed my life. Over the last year I've lost 20 pounds, built real strength, and found a confidence I didn't know I was missing. She doesn't just give you workouts. She helped me completely overhaul my nutrition and actually understand what my body needs. I feel better at 36 than I did at 26. I didn't think that was possible."
              name="Liz"
            />
            <TestimonialCard
              body="I was traveling through seven countries in three months, losing muscle, losing confidence, and it was starting to affect my business and my speaking events. Madison reminded me I could still enjoy life, still travel, and still feel strong, confident, and sexy while actually being in a routine. She helped me move past so many mindset blocks around consistency. Now I eat high protein foods I actually love and do personalised workouts that work. I feel in such amazing shape, and it's had a huge ripple effect on everything. If you're even thinking about it, take the dive. She'll not only change your body. She'll change your life."
              name="Ashleigh"
            />
            <TestimonialCard
              body="Madison was the first person who ever got me genuinely excited about fitness. She explains nutrition in a way that actually makes sense and feels doable in real life. She's a trainer who's also a foodie, so she won't just tell you to diet. She understands that we're human, and especially as women, we're not operating at 100% all the time. Instead of the all-or-nothing cycle, she helps you stay consistent and keep moving forward. I've tried getting into the gym so many times and always fell off because I didn't know what I was doing. Madison gave me the foundation I was missing. I finally understand what I'm supposed to be doing and what a good workout should actually FEEL like, not just look like. I honestly can't recommend her enough."
              name="Sierra"
            />
            <TestimonialCard
              body="Training with Madison has been really eye opening. I thought I was training to failure before, but she helped me realize I could do so much more. The support is great and I'm already getting stronger. She's also really customizing everything for me and the way my body moves which has been super helpful as I grow my confidence in the gym."
              name="Ali"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ — luxe accordion ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '90px 20px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(56px, 8vw, 100px)',
              lineHeight: '1',
              fontWeight: 400,
              marginBottom: '48px',
            }}
          >
            FAQ
          </h2>
        </div>
        <MembershipFaq />
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Btn href="/contact" bg="#ce965a" color="#fbf4e9">
            join the waitlist
          </Btn>
        </div>
      </section>

      {/* ── founding pricing (photo bg) ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '90px 20px' }} className="min-h-[620px] flex items-center">
        <BgPhoto src={img('Madison-114.jpg')} alt="Madison with arm raised on a coastal cliff" overlay="rgba(45,21,6,0.55)" position="50% 50%" />
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#e8dcc0',
              fontSize: 'clamp(34px, 5vw, 58px)',
              lineHeight: '1.1',
              fontWeight: 400,
              marginBottom: '16px',
            }}
          >
            Founding member pricing
          </h2>
          <p style={{ ...eyebrow, color: '#fbf4e9', marginBottom: '28px' }}>for the first five members only.</p>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '32px' }}>
            <span style={{ color: '#fbf4e9', textDecoration: 'line-through' }}>$555</span>{' '}
            <span style={{ color: '#fbf4e9' }}>$333</span>
          </p>
          <Btn href="/contact" bg="#efdfc3" color="#2d1506">
            become a founding member
          </Btn>
        </div>
      </section>

      {/* ── "Why I created this membership" ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '90px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#ce965a',
              fontSize: 'clamp(38px, 5.5vw, 64px)',
              lineHeight: '1.1',
              fontWeight: 400,
              marginBottom: '40px',
            }}
          >
            Why I created this membership
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-[38%] flex-shrink-0">
              <Photo src={img('madison-201.jpg')} alt="Madison resting on a bed" aspect="0.68" />
            </div>
            <div className="w-full md:w-[62%]" style={{ textAlign: 'right' }}>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px' }}>
                I didn&apos;t create Body Reclaimed because I couldn&apos;t get results, for myself or my clients. I
                could, and I did. But my life changed.
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px' }}>
                I stepped into full-time travel and entrepreneurship, and I hit an uncomfortable realization: the
                system that had worked for years wasn&apos;t built for the life I actually wanted to live. I
                remember asking myself one question:
              </p>
              <p style={{ ...eyebrow, color: '#ce965a', marginBottom: '16px' }}>
                How do I keep getting results and also get to live the life I&apos;m dreaming about?
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px' }}>That question changed everything.</p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px' }}>
                Before any of this, I was a data scientist, and that background never really left me.
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px' }}>
                I stopped thinking about fitness as something that only works under perfect conditions, and I started
                looking at fitness from the same data-driven lens I had used in my work: understanding what&apos;s
                actually driving the result, not just chasing the result itself.
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px' }}>
                This let me build a system that could travel with me. One that adapted to changing seasons instead
                of breaking when they came. One that taught understanding instead of dependency.
              </p>
              <p style={{ ...eyebrow, color: '#ce965a', marginBottom: '28px' }}>
                It showed me that fitness shouldn&rsquo;t ask women to make their lives smaller. It can make them
                bigger.
              </p>
              <Btn href="/contact" bg="#fbf4e9" color="#2d1506" border="1px solid #2d1506">
                join body unmuted
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* ── "You didn't build your life..." CTA ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '96px 20px' }} className="min-h-[600px] flex items-center">
        <BgPhoto src={img('madison-131.jpg')} alt="Madison outdoors with arms raised, back to camera, overlooking the water" overlay="rgba(45,21,6,0.55)" position="50% 45%" />
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#fbf4e9',
              fontSize: 'clamp(30px, 4.2vw, 48px)',
              lineHeight: '1.2',
              fontWeight: 400,
              marginBottom: '24px',
            }}
          >
            You didn&apos;t build your life to choose between your freedom and the body you want.
          </h2>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#e8eeba', fontSize: 'clamp(20px, 2.6vw, 30px)', marginBottom: '28px' }}>
            You deserve both.
          </p>
          <p style={{ ...bodyP, color: '#fbf4e9', marginBottom: '32px' }}>
            Join Body Unmuted and learn how to build a stronger, leaner, more energized body that gives you the
            freedom to keep saying yes to the life you&apos;re building.
          </p>
          <Btn href="/contact" bg="#e8eeba" color="#2d1506" border="1px solid rgba(45,21,6,0.3)">
            join the waitlist
          </Btn>
        </div>
      </section>

      {/* ── 1:1 coaching — with a dedicated application form ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '90px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ ...eyebrow, color: '#2d1506', marginBottom: '16px' }}>Looking for 1:1 coaching?</p>
            <h2
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                fontStyle: 'italic',
                color: '#ce965a',
                fontSize: 'clamp(24px, 3vw, 36px)',
                lineHeight: '1.3',
                fontWeight: 400,
                marginBottom: '20px',
                maxWidth: '780px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              the body unmuted membership is designed for full body transformation results with the same freedom
              method I use with my 1:1 clients
            </h2>
            <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
              But if you&rsquo;re looking for deeper level of perosonalized support and accountability, I accept a
              select number of women into 1:1 coaching.
            </p>
            <p style={{ ...eyebrow, color: '#ce965a', fontStyle: 'italic' }}>private coaching: $1111 per month</p>
          </div>
          <div className="flex flex-col md:flex-row gap-10 items-stretch">
            <div className="w-full md:w-[42%]">
              <Photo src={img('madison-balcony.png')} alt="Madison laughing on a wrought-iron balcony" aspect="0.85" />
            </div>
            <div className="w-full md:w-[58%]">
              <OneOnOneForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── founding investment recap (dark) ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '90px 20px' }} className="min-h-[560px] flex items-center">
        <BgPhoto src={img('BO1A8389.jpg')} alt="Madison leaning against a wooden door with wrought-iron balcony railing" overlay="rgba(45,21,6,0.82)" position="50% 4%" />
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#fbf4e9', fontSize: 'clamp(22px, 2.8vw, 32px)', marginBottom: '16px' }}>
            Founding Member Investment:
          </p>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 'clamp(26px, 3.6vw, 40px)', marginBottom: '24px' }}>
            <span style={{ color: '#a67c52', textDecoration: 'line-through' }}>$555</span>{' '}
            <span style={{ color: '#fbf4e9' }}>$333/month</span>
          </p>
          <p style={{ ...bodyP, fontStyle: 'italic', color: '#e8eeba', marginBottom: '32px' }}>
            Jumping to $555/month after the first 5 members. Available for the first five founding members only.
            Once those spots are filled, pricing increases.
          </p>
          <Btn href="/contact" bg="#fbf4e9" color="#2d1506">
            become a founding member
          </Btn>
        </div>
      </section>

      {/* ── contact ── */}
      <section style={{ backgroundColor: '#efdfc3', padding: '90px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-1/2">
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#2d1506',
                  fontSize: 'clamp(34px, 4.6vw, 52px)',
                  lineHeight: '1.1',
                  fontWeight: 400,
                  marginBottom: '12px',
                }}
              >
                Still have a question?
              </h2>
              <p style={{ ...eyebrow, fontStyle: 'italic', color: '#7f8b32', marginBottom: '24px' }}>I&rsquo;d love to hear from you!</p>
              <p style={{ ...bodyP, color: '#45220d', marginBottom: '24px' }}>
                Wondering if Body Unmuted is the right fit for you or any other questions, drop em below!
              </p>
              <LightContactForm />
            </div>
            <div className="w-full md:w-1/2">
              <Photo src={img('BO1A8225.jpg')} alt="Madison Griffin holding a fan among plants" aspect="0.85" />
            </div>
          </div>
        </div>
      </section>

      {/* ── final CTA ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '110px 20px' }} className="min-h-[420px] flex items-center justify-center">
        <BgPhoto src={img('BO1A8336.jpg')} alt="Madison walking through a courtyard" overlay="rgba(45,21,6,0.4)" position="50% 20%" />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#fbf4e9',
              fontSize: 'clamp(30px, 5vw, 62px)',
              lineHeight: '1.1',
              fontWeight: 400,
              marginBottom: '32px',
            }}
          >
            Your body should make
            <br />
            your life bigger
          </h2>
          <Btn href="/contact" bg="#e8eeba" color="#2d1506">
            join body unmuted
          </Btn>
        </div>
      </section>
    </>
  );
}
