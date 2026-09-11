import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import MediaSection from '@/components/MediaSection';
import StickyChapter from '@/components/StickyChapter';
import MembershipFaq from '@/components/MembershipFaq';

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

const bodyP: React.CSSProperties = {
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontSize: 'clamp(15px, 1.6vw, 19px)',
  lineHeight: '1.65',
};

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: 'clamp(12px, 1.3vw, 15px)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
};

/** Higher-contrast, larger sub-section header — used for labels like
 * "Your Custom Training" that need to read as real headers, not fine print. */
const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: 'clamp(15px, 1.7vw, 18px)',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#7f8b32',
};

function ArrowIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="16" height="12" viewBox="0 0 24 18" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
      <path d="M1 9h20M14 2l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Btn({
  href,
  bg,
  color,
  borderColor,
  children,
}: {
  href: string;
  bg: string;
  color: string;
  borderColor?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="luxe-button" style={{ backgroundColor: bg, color, borderColor: borderColor || color }}>
      {children}
      <ArrowIcon />
    </Link>
  );
}

/** Gold arrow + fine rule divider — replaces the old circled-arrow treatment. */
function ArrowLine({ children, first = false, color = '#2d1506' }: { children: React.ReactNode; first?: boolean; color?: string }) {
  return (
    <div style={{ borderTop: first ? 'none' : '1px solid rgba(45,21,6,0.14)', padding: '18px 0' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <span style={{ flexShrink: 0, color: '#ce965a', fontSize: '18px', lineHeight: 1.5 }} aria-hidden="true">
          &rarr;
        </span>
        <p style={{ ...bodyP, color, textAlign: 'left' }}>{children}</p>
      </div>
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
    <div className="w-full md:w-[56%]" style={{ padding: 'clamp(48px, 6vw, 80px) clamp(24px, 4vw, 48px)' }}>
      <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#ce965a', fontSize: 'clamp(38px, 5vw, 58px)', lineHeight: '1' }}>
        {month}
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          fontStyle: 'italic',
          color: '#2d1506',
          fontSize: 'clamp(28px, 3.6vw, 42px)',
          lineHeight: '1.15',
          marginBottom: '20px',
        }}
      >
        {title}
      </h3>
      <p style={{ ...bodyP, color: '#45220d', marginBottom: '20px', textAlign: 'left' }}>{intro}</p>
      {bullets.map((b, i) => (
        <ArrowLine key={i} first={i === 0}>
          {b}
        </ArrowLine>
      ))}
    </div>
  );
  const imageCol = (
    <div className="w-full md:w-[44%]" style={{ position: 'relative', minHeight: '420px' }}>
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

function PullQuoteTestimonial({ quote, body, name, bg = '#efdfc3' }: { quote: string; body: string; name: string; bg?: string }) {
  return (
    <section style={{ backgroundColor: bg, padding: 'clamp(48px, 6vw, 72px) 20px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div
          style={{
            background: '#fbf4e9',
            border: '1px solid rgba(205,170,92,0.4)',
            padding: 'clamp(28px, 4vw, 48px)',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(22px, 3vw, 32px)',
              lineHeight: '1.3',
              fontWeight: 400,
              marginBottom: '18px',
            }}
          >
            &ldquo;{quote}&rdquo;
          </h2>
          <p style={{ ...bodyP, color: '#45220d', fontSize: '15px', marginBottom: '16px' }}>{body}</p>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#ce965a', fontSize: '17px' }}>
            {name}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Bounded proof-point card — a tinted, bordered box so a testimonial reads as
 * its own contained unit instead of bleeding into the surrounding paragraph flow. */
function ProofCard({ body, name }: { body: string; name: string }) {
  return (
    <div
      style={{
        background: 'rgba(206,150,90,0.09)',
        border: '1px solid rgba(206,150,90,0.32)',
        padding: 'clamp(22px, 3vw, 32px)',
        margin: '32px 0',
      }}
    >
      <p style={{ ...bodyP, color: '#45220d', fontStyle: 'italic', marginBottom: '14px', textAlign: 'left' }}>
        &ldquo;{body}&rdquo;
      </p>
      <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#ce965a', fontSize: '17px' }}>
        {name}
      </p>
    </div>
  );
}

function TimelineStep({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="w-full md:flex-1" style={{ padding: '0 0 0 24px', borderLeft: '1px solid rgba(206,150,90,0.4)', marginBottom: '40px' }}>
      <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#ce965a', fontSize: 'clamp(36px, 3.4vw, 48px)', lineHeight: '1', marginBottom: '14px' }}>
        {n}
      </p>
      <p style={{ ...eyebrow, color: '#2d1506', fontWeight: 600, marginBottom: '10px' }}>{title}</p>
      <p style={{ ...bodyP, color: '#45220d', fontSize: '15px', textAlign: 'left' }}>{children}</p>
    </div>
  );
}

const outcomes = [
  {
    n: '01',
    title: 'Walk Into the Gym With Confidence',
    body: 'Know what you are doing, why you are doing it, and how to move through your workout without wandering around or second-guessing yourself.',
  },
  {
    n: '02',
    title: 'Build Strength You Can Measure',
    body: 'Progress with intention as you lift heavier, build muscle, and see evidence that your effort is working.',
  },
  {
    n: '03',
    title: 'Create Consistency That Fits Your Life',
    body: 'Keep moving through flights, launches, dinners, deadlines, and changing routines without waiting for perfect conditions.',
  },
  {
    n: '04',
    title: 'Understand What Your Body Needs',
    body: 'Recognize how your body responds to training, nutrition, stress, and recovery so you can make better decisions.',
  },
];

const coachingInclusions = [
  'Private strategy session',
  'Custom transformation roadmap',
  'Personalized training',
  'Personalized nutrition coaching',
  'Monthly progress and data review',
  'Ongoing coach access',
  'Training and tracking app',
];

const supportInclusions = [
  'Body Literacy curriculum',
  'Community',
  'Matched accountability partners',
  'Monthly live office hours',
  'Guest Expert Residencies',
];

const nutritionInclusions = [
  'Personalized calorie targets',
  'Personalized protein, carbohydrate, and fat targets',
  'Nutrition priorities for the current phase',
  'Habit goals',
  'Support with dinners, alcohol, restaurants, travel, and busy weeks',
  'Adjustments based on results and feedback',
  'Additional resources such as meal guides or sample meals when useful',
];

const communityItems = [
  {
    label: 'Community Conversations',
    body: 'A place to ask the question you have been sitting on, talk through the week that did not go to plan, and get support that does not disappear the moment things stop going perfectly.',
  },
  {
    label: 'A Place To Share Wins',
    body: 'The heavier lift, the progress photo, the confident choice at dinner. Somewhere to celebrate the moments that prove this is working.',
  },
  {
    label: 'Matched Accountability Partners',
    body: 'You will be matched with other members for a private space to check in, keep each other moving, and have someone who actually notices your effort.',
  },
  {
    label: 'Monthly Live Office Hours',
    body: 'A live session with Madison every month to ask questions, talk through what is and is not working, and get real-time coaching.',
  },
];

export default function WorkWithMe() {
  return (
    <>
      {/* ── STICKY CHAPTER 1: hero pinned, recognition section slides over it ── */}
      <StickyChapter
        scene={
          <MediaSection
            backgroundSrc={img('BO1A8336.jpg')}
            priority
            objectPosition="50% 30%"
            mobileObjectPosition="30% 30%"
            veil="linear-gradient(180deg, rgba(45,21,6,0.05) 0%, rgba(45,21,6,0.12) 40%, rgba(45,21,6,0.58) 76%, rgba(45,21,6,0.85) 100%)"
            className="sticky-scene hero-mobile-tall flex flex-col justify-end"
            contentClassName="w-full"
            contentStyle={{ padding: 'clamp(32px, 6vw, 64px) 20px' }}
          >
            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
              <p style={{ ...eyebrow, color: '#e8eeba', marginBottom: '18px' }}>
                Custom fitness and nutrition coaching for women building freedom-first lives
              </p>
              <h1
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#fbf4e9',
                  fontSize: 'clamp(38px, 6vw, 70px)',
                  lineHeight: '1.05',
                  fontWeight: 400,
                  marginBottom: '4px',
                }}
              >
                Body Unmuted:
              </h1>
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontStyle: 'italic',
                  color: '#fbf4e9',
                  fontSize: 'clamp(44px, 7vw, 82px)',
                  lineHeight: '1.05',
                  fontWeight: 400,
                  marginBottom: '24px',
                }}
              >
                The Membership
              </h2>
              <p style={{ ...bodyP, color: '#fbf4e9', fontSize: 'clamp(16px, 1.9vw, 21px)', marginBottom: '36px' }}>
                Personalized coaching that changes your body without asking you to shrink your life to fit it.
              </p>
              <Btn href="/join" bg="#2d1506" color="#fbf4e9">
                Secure Your Founding Rate
              </Btn>
            </div>
          </MediaSection>
        }
        surface={
          <div style={{ position: 'relative', padding: 'clamp(56px, 9vw, 96px) 20px' }}>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '260px',
                maxWidth: '38vw',
                aspectRatio: '1/1',
                opacity: 0.1,
                pointerEvents: 'none',
              }}
            >
              <Image src={img('light-background.png')} alt="" fill sizes="260px" style={{ objectFit: 'cover', objectPosition: 'top right' }} />
            </div>

            <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                <div style={{ position: 'relative', minHeight: '380px' }} className="order-2 md:order-1 md:h-full">
                  <Image
                    src={img('madison-fan-hero.webp')}
                    alt="Madison laughing, holding a fan"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h2
                    style={{
                      fontFamily: 'var(--font-instrument-serif), serif',
                      color: '#2d1506',
                      fontSize: 'clamp(28px, 3.6vw, 44px)',
                      lineHeight: '1.15',
                      fontWeight: 400,
                      marginBottom: '20px',
                      textAlign: 'left',
                    }}
                  >
                    Why does your fitness only seem to work when life stays predictable?
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-instrument-serif), serif',
                      fontStyle: 'italic',
                      color: '#7f8b32',
                      fontSize: 'clamp(17px, 2vw, 23px)',
                      marginBottom: '12px',
                      textAlign: 'left',
                    }}
                  >
                    Maybe you&rsquo;ve found yourself here before&hellip;
                  </p>
                  <ArrowLine first>
                    You get into a rhythm, then work gets busy, a trip comes up, or the week takes a turn you did not
                    plan for.
                  </ArrowLine>
                  <ArrowLine>
                    The routine that worked at home suddenly makes no sense in a new city, a different gym, or
                    another time zone.
                  </ArrowLine>
                  <ArrowLine>
                    Some weeks give you plenty of time to train. Others come with client deadlines, long dinners, jet
                    lag, and whatever equipment happens to be available.
                  </ArrowLine>
                  <ArrowLine>
                    You know the basics of being healthy. What you have never been taught is how to adjust them
                    without losing the progress you have already made.
                  </ArrowLine>
                  <ArrowLine>
                    You want the way you train and eat to support the life you are building, even when that life
                    looks different from one week to the next.
                  </ArrowLine>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* ── WHY PREVIOUS APPROACHES FAILED ── */}
      <MediaSection backgroundSrc={img('brown-background.png')} contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div className="problem-copy-surface" style={{ maxWidth: '980px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(24px, 3vw, 34px)',
              lineHeight: '1.3',
              fontWeight: 400,
              marginBottom: '32px',
              maxWidth: '780px',
              textAlign: 'left',
            }}
          >
            Most fitness plans fail in one of two places. They are not effective enough to change your body, or they
            are not realistic enough to survive your life.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '32px' }}>
            <div style={{ background: 'rgba(206,150,90,0.08)', border: '1px solid rgba(206,150,90,0.3)', padding: 'clamp(24px, 3vw, 32px)' }}>
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#ce965a', fontSize: '34px', lineHeight: '1', marginBottom: '14px' }}>
                01
              </p>
              <p style={{ ...eyebrow, color: '#ce965a', marginBottom: '10px', textAlign: 'left' }}>
                The programming was not effective enough
              </p>
              <p style={{ ...bodyP, color: '#45220d', fontSize: '15px', textAlign: 'left' }}>
                Body-composition change is not a motivation problem. It&rsquo;s a programming problem. Your training
                and nutrition have to be structured, progressed, reviewed, and adjusted as your body changes, or it
                simply stops having a reason to keep changing. Random workouts and a calorie target set once and
                forgotten will only get you so far, no matter how disciplined you are between meetings.
              </p>
            </div>
            <div style={{ background: 'rgba(206,150,90,0.08)', border: '1px solid rgba(206,150,90,0.3)', padding: 'clamp(24px, 3vw, 32px)' }}>
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#ce965a', fontSize: '34px', lineHeight: '1', marginBottom: '14px' }}>
                02
              </p>
              <p style={{ ...eyebrow, color: '#ce965a', marginBottom: '10px', textAlign: 'left' }}>
                The programming did not fit your life
              </p>
              <p style={{ ...bodyP, color: '#45220d', fontSize: '15px', marginBottom: '14px', textAlign: 'left' }}>
                Most plans are built around a week that repeats itself. The same schedule, the same gym, and plenty
                of time to plan every meal.
              </p>
              <p style={{ ...bodyP, color: '#45220d', fontSize: '15px', marginBottom: '14px', textAlign: 'left' }}>
                Some weeks might look like that. Others come with travel, long dinners, deadlines, and a gym you have
                never seen before. When you run a business, some weeks also ask far more of you than expected. The
                work piles up, your clients need more support, and the routine you planned no longer fits the time
                you actually have.
              </p>
              <p style={{ ...bodyP, color: '#45220d', fontSize: '15px', textAlign: 'left' }}>
                If the plan only works during the predictable weeks, it was never flexible enough for your actual
                life.
              </p>
            </div>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#ce965a',
              fontSize: 'clamp(19px, 2.2vw, 25px)',
              lineHeight: '1.4',
              maxWidth: '780px',
              textAlign: 'left',
            }}
          >
            Body Unmuted changes both. Your training and nutrition are built around what your body needs to produce
            results. Then we keep adjusting them around the life you are actually living.
          </p>
        </div>
      </MediaSection>

      {/* ── THE TWELVE-WEEK FUTURE ── */}
      <section style={{ background: 'linear-gradient(135deg, #ce965a 0%, #e8c383 100%)', padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '56px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#fbf4e9',
              fontSize: 'clamp(26px, 3.6vw, 46px)',
              lineHeight: '1.3',
            }}
          >
            What if twelve weeks from now, you were not trying another routine and hoping it worked? What if you had
            a strategy that was already working for you?
          </h2>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-10 divide-y divide-[rgba(251,244,233,0.35)] md:divide-y-0 md:divide-x"
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          {outcomes.map((o, i) => (
            <div key={o.n} className={i === 0 ? '' : 'pt-10 md:pt-0 md:pl-10'}>
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#fbf4e9', fontSize: '44px', lineHeight: '1', marginBottom: '12px', opacity: 0.85 }}>
                {o.n}
              </p>
              <h3 style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#fbf4e9', fontSize: '23px', lineHeight: '1.25', marginBottom: '12px' }}>
                {o.title}
              </h3>
              <p style={{ ...bodyP, color: '#fbf4e9', fontSize: '14px', opacity: 0.92, textAlign: 'left' }}>{o.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STICKY CHAPTER 2: signature coaching statement pinned, testimonial + offer overview slide over it ── */}
      <StickyChapter
        scene={
          <MediaSection
            backgroundSrc={img('dark-green-background.png')}
            veil="rgba(45,21,6,0.2)"
            className="sticky-scene flex items-start"
            contentClassName="w-full"
            contentStyle={{ padding: 'clamp(48px, 8vw, 88px) 20px clamp(32px, 6vw, 64px)' }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div className="surface-dark" style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-instrument-serif), serif',
                    color: '#fbf4e9',
                    fontSize: 'clamp(26px, 3.4vw, 42px)',
                    lineHeight: '1.25',
                    fontWeight: 400,
                    marginBottom: '36px',
                    textAlign: 'left',
                  }}
                >
                  Body Unmuted does not hand you another plan to follow. You get personalized coaching that changes
                  as your body changes and flexes when your life does.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ marginBottom: '36px', borderTop: '1px solid rgba(232,238,186,0.3)', paddingTop: '32px' }}>
                  <div>
                    <p style={{ ...eyebrow, color: '#ce965a', marginBottom: '10px', textAlign: 'left' }}>
                      Effective enough to change your body
                    </p>
                    <p style={{ ...bodyP, color: '#e8eeba', fontSize: '15px', textAlign: 'left' }}>
                      Your training and nutrition are based on your goals, starting point, transformation phase, and
                      the information your body gives us.
                    </p>
                  </div>
                  <div>
                    <p style={{ ...eyebrow, color: '#ce965a', marginBottom: '10px', textAlign: 'left' }}>
                      Realistic enough to fit your life
                    </p>
                    <p style={{ ...bodyP, color: '#e8eeba', fontSize: '15px', textAlign: 'left' }}>
                      Your strategy can be adjusted around flights, deadlines, dinners, unfamiliar equipment, energy,
                      business demands, and changing routines.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ borderTop: '1px solid rgba(232,238,186,0.3)', paddingTop: '32px', marginBottom: '40px' }}>
                  <div>
                    <p style={{ ...eyebrow, color: '#c8d199', fontWeight: 700, marginBottom: '8px', textAlign: 'left' }}>
                      Swap The Session
                    </p>
                    <p style={{ ...bodyP, color: '#fbf4e9', fontSize: '14px', textAlign: 'left' }}>
                      Move a workout when your schedule or time zone changes.
                    </p>
                  </div>
                  <div>
                    <p style={{ ...eyebrow, color: '#c8d199', fontWeight: 700, marginBottom: '8px', textAlign: 'left' }}>
                      Work With What You Have
                    </p>
                    <p style={{ ...bodyP, color: '#fbf4e9', fontSize: '14px', textAlign: 'left' }}>
                      Adjust around the equipment, space, energy, or time available.
                    </p>
                  </div>
                  <div>
                    <p style={{ ...eyebrow, color: '#c8d199', fontWeight: 700, marginBottom: '8px', textAlign: 'left' }}>
                      Keep Your Momentum
                    </p>
                    <p style={{ ...bodyP, color: '#fbf4e9', fontSize: '14px', textAlign: 'left' }}>
                      Navigate a launch week, trip, dinner, or client deadline without throwing away the entire
                      strategy.
                    </p>
                  </div>
                </div>

                <Btn href="#whats-inside" bg="#c8d199" color="#2d1506">
                  See What&rsquo;s Included
                </Btn>
              </div>
            </div>
          </MediaSection>
        }
        surface={
          <>
            <PullQuoteTestimonial
              quote="Madison reminded me I could still enjoy life, still travel, and still feel strong, confident, and sexy while actually being in a routine."
              body="I was traveling through seven countries in three months, losing muscle, losing confidence, and it was starting to affect my business and my speaking events. Madison reminded me I could still enjoy life, still travel, and still feel strong, confident, and sexy while actually being in a routine. She helped me move past so many mindset blocks around consistency. Now I eat high protein foods I actually love and do personalised workouts that work. I feel in such amazing shape, and it's had a huge ripple effect on everything. If you're even thinking about it, take the dive. She'll not only change your body. She'll change your life."
              name="Ashleigh"
            />

            <MediaSection
              backgroundSrc={img('light-background.png')}
              veil="rgba(251,244,233,0.85)"
              id="whats-inside"
              contentStyle={{ padding: 'clamp(64px, 9vw, 100px) 20px' }}
            >
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div className="surface-light" style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
                  <h2
                    style={{
                      fontFamily: 'var(--font-instrument-serif), serif',
                      color: '#2d1506',
                      fontSize: 'clamp(28px, 3.8vw, 46px)',
                      lineHeight: '1.15',
                      fontWeight: 400,
                      marginBottom: '48px',
                      textAlign: 'center',
                    }}
                  >
                    What&rsquo;s actually inside Body Unmuted?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12">
                    <div>
                      <p style={{ ...eyebrow, color: '#ce965a', fontWeight: 700, marginBottom: '12px', textAlign: 'left' }}>
                        Your Personalized Coaching
                      </p>
                      <ul className="body-support-list">
                        {coachingInclusions.map((item) => (
                          <li key={item} style={{ ...bodyP, color: '#2d1506', textAlign: 'left' }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p style={{ ...eyebrow, color: '#7f8b32', fontWeight: 700, marginBottom: '12px', textAlign: 'left' }}>
                        Your Built-In Support System
                      </p>
                      <ul className="body-support-list">
                        {supportInclusions.map((item) => (
                          <li key={item} style={{ ...bodyP, color: '#45220d', fontSize: '15px', textAlign: 'left' }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '48px' }}>
                    <Btn href="/join" bg="#2d1506" color="#fbf4e9">
                      Secure Your Founding Rate
                    </Btn>
                  </div>
                </div>
              </div>
            </MediaSection>
          </>
        }
      />

      {/* ── YOUR PERSONALIZED COACHING (main product deep-dive) ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-14">
            <div className="w-full md:w-[68%]">
              <p style={{ ...sectionLabel, marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(127,139,50,0.35)', textAlign: 'left' }}>
                Your Custom Training
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '20px', textAlign: 'left' }}>
                Your workouts are built around your goals, experience, body, schedule, equipment, and the phase of
                your transformation you&rsquo;re in right now. Every exercise, set, rep, and rest period is chosen on
                purpose, and it keeps progressing based on your performance, recovery, and results. You&rsquo;ll get
                exercise demonstrations and workout and strength tracking right inside the app, and when you submit a
                video, I&rsquo;ll review your technique and give you real feedback.
              </p>

              <ProofCard
                body="Training with Madison has been really eye opening. I thought I was training to failure before, but she helped me realize I could do so much more. The support is great and I'm already getting stronger. She's also really customizing everything for me and the way my body moves which has been super helpful as I grow my confidence in the gym."
                name="Ali"
              />

              <div style={{ borderTop: '1px solid rgba(206,150,90,0.35)', paddingTop: '36px', marginTop: '12px' }}>
                <p style={{ ...sectionLabel, marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(127,139,50,0.35)', textAlign: 'left' }}>
                  Your Custom Nutrition
                </p>
                <p style={{ ...bodyP, color: '#2d1506', marginBottom: '20px', textAlign: 'left' }}>
                  Your nutrition starts with calorie and macronutrient targets based on your body, goals, lifestyle,
                  and current phase. Those numbers are not calculated once and forgotten. Madison reviews how your
                  body responds and adjusts the strategy using your progress, performance, recovery, feedback, and
                  data.
                </p>
                <p style={{ ...bodyP, color: '#2d1506', marginBottom: '14px', fontWeight: 600, textAlign: 'left' }}>
                  Nutrition coaching may include:
                </p>
                <ul style={{ ...bodyP, color: '#2d1506', paddingLeft: '22px', listStyleType: 'disc', marginBottom: '24px', textAlign: 'left' }}>
                  {nutritionInclusions.map((item) => (
                    <li key={item} style={{ marginBottom: '8px' }}>
                      {item}
                    </li>
                  ))}
                </ul>
                <p
                  style={{
                    fontFamily: 'var(--font-instrument-serif), serif',
                    fontStyle: 'italic',
                    color: '#7f8b32',
                    fontSize: 'clamp(18px, 2vw, 22px)',
                    lineHeight: '1.4',
                    textAlign: 'left',
                  }}
                >
                  Your nutrition is reviewed and adjusted based on how your body responds. It is not a set of numbers
                  we calculate once and leave untouched.
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(206,150,90,0.35)', paddingTop: '36px', marginTop: '36px' }}>
                <p style={{ ...sectionLabel, marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(127,139,50,0.35)', textAlign: 'left' }}>
                  Ongoing Coach Access
                </p>
                <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px', textAlign: 'left' }}>
                  I review each member&rsquo;s progress and data monthly, and your training and nutrition get
                  adjusted when it&rsquo;s needed. Inside the coaching space, you can ask questions and request help
                  with training, nutrition, travel, scheduling, and technique. You can also submit exercise videos
                  for feedback whenever you want a second set of eyes on your form.
                </p>
              </div>
            </div>

            <div className="w-full md:w-[32%] md:self-start md:sticky" style={{ top: 'calc(var(--header-height-desktop) + 40px)' }}>
              <Photo src={img('Madison-73.jpg')} alt="Madison outdoors in the mountains, arms raised" aspect="0.667" />
            </div>
          </div>
        </div>
      </section>

      {/* ── THE CLIENT APP ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: 'clamp(72px, 10vw, 112px) 20px', borderTop: '1px solid rgba(45,21,6,0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-[55%]">
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#2d1506',
                  fontSize: 'clamp(30px, 4vw, 48px)',
                  lineHeight: '1.15',
                  fontWeight: 400,
                  marginBottom: '20px',
                  textAlign: 'left',
                }}
              >
                Every workout. Every number.
                <br />
                Right in your pocket.
              </h2>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px', textAlign: 'left' }}>
                The app is how your personalized coaching actually gets delivered and tracked. Open it and your
                workout is already waiting, with everything laid out clearly from the moment you arrive.
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '12px', fontWeight: 600, textAlign: 'left' }}>
                Inside, you&rsquo;ll find:
              </p>
              <ul style={{ ...bodyP, color: '#2d1506', paddingLeft: '22px', listStyleType: 'disc', marginBottom: '20px', textAlign: 'left' }}>
                <li style={{ marginBottom: '8px' }}>Workouts waiting for you, with every exercise, set, rep, and rest period</li>
                <li style={{ marginBottom: '8px' }}>Exercise demonstration videos whenever you need them</li>
                <li style={{ marginBottom: '8px' }}>Weight and strength tracking</li>
                <li style={{ marginBottom: '8px' }}>Nutrition information</li>
                <li style={{ marginBottom: '8px' }}>Sleep tracking and measurements</li>
                <li>Progress photos, all in one place</li>
              </ul>
              <p style={{ ...bodyP, color: '#7f8b32', borderTop: '1px solid rgba(127,139,50,0.3)', paddingTop: '16px', textAlign: 'left' }}>
                It builds a clear history so you and Madison can both see what&rsquo;s actually working.
              </p>
            </div>
            <div className="w-full md:w-[45%]">
              <Photo src={img('trainerize-portal-mockup.png')} alt="Body Unmuted client portal shown on three phone screens" aspect="0.56" />
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY LITERACY + GUEST EXPERT RESIDENCIES ── */}
      <MediaSection
        backgroundSrc={img('BO1A8912.jpg')}
        objectPosition="62% 85%"
        veil="linear-gradient(90deg, rgba(45,21,6,0.85) 0%, rgba(45,21,6,0.6) 55%, rgba(45,21,6,0.3) 100%)"
        contentStyle={{ padding: 'clamp(80px, 11vw, 130px) 20px' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#fbf4e9',
              fontSize: 'clamp(28px, 4vw, 48px)',
              lineHeight: '1.25',
              fontWeight: 400,
              marginBottom: '24px',
              maxWidth: '680px',
              textAlign: 'left',
            }}
          >
            Your coaching shows you what your body needs now. Body Literacy helps you understand why.
          </h2>
          <p style={{ ...bodyP, color: '#e8eeba', maxWidth: '620px', textAlign: 'left' }}>
            The twelve-week Body Literacy curriculum runs alongside your coaching. It&rsquo;s where you learn the
            training, nutrition, recovery, and data behind every adjustment we make, so you understand the decisions
            driving your results, not just the instructions.
          </p>
        </div>
      </MediaSection>

      <div style={{ position: 'relative', height: '40px', backgroundColor: '#e8eeba', overflow: 'hidden' }} aria-hidden="true">
        <Image src={img('light-background.png')} alt="" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.14 }} />
      </div>

      <MonthBlock
        month="Month 01"
        title="Train for Transformation"
        intro="Learn what drives strength, muscle growth, and fat loss. Understand productive effort, weight selection, progression, and recovery."
        bullets={[
          'Learn what actually drives muscle growth, strength, and fat loss so you know what your workouts are working toward.',
          'Learn how to recognize a productive set, choose the right weight, and challenge yourself without pushing blindly.',
          "Understand what your weights, reps, and performance are telling you and when it's time to progress or recover.",
        ]}
        image="madison-88.jpg"
        alt="Madison outdoors in the mountains, arms raised"
        imageSide="right"
        bg="#e8eeba"
      />
      <MonthBlock
        month="Month 02"
        title="Fuel the Body You're Building"
        intro="Understand calories, protein, carbohydrates, fats, alcohol, nutrients, and supplements well enough to make informed choices in real life."
        bullets={[
          'Learn how calories influence your body and why your needs can change throughout the transformation process.',
          'Understand protein, carbohydrates, fats, and alcohol so you can make informed choices without expecting every meal to be perfect.',
          'Learn which nutrients and supplements genuinely support muscle, performance, and recovery, and which ones are mostly expensive noise.',
        ]}
        image="Madison-243.jpg"
        alt="Madison eating from a bowl on the beach at sunset"
        imageSide="left"
        bg="#fbf4e9"
      />
      <MonthBlock
        month="Month 03"
        title="Become the Expert on Your Body"
        intro="Learn to interpret changes in energy, hunger, performance, sleep, and recovery. Understand when something may need to change."
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

      {/* ── GUEST EXPERT RESIDENCIES ── */}
      <MediaSection
        backgroundSrc={img('BO1A9059.jpg')}
        objectPosition="62% 22%"
        veil="linear-gradient(100deg, rgba(45,21,6,0.9) 0%, rgba(45,21,6,0.72) 48%, rgba(45,21,6,0.4) 100%)"
        contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ ...eyebrow, color: '#ce965a', fontWeight: 700, marginBottom: '24px', textAlign: 'left' }}>
            Guest Expert Residencies
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#fbf4e9',
                  fontSize: 'clamp(24px, 3vw, 34px)',
                  lineHeight: '1.3',
                  fontWeight: 400,
                  marginBottom: '20px',
                  textAlign: 'left',
                }}
              >
                So much of women&rsquo;s health never gets the conversation it deserves.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontStyle: 'italic',
                  color: '#e8eeba',
                  fontSize: 'clamp(19px, 2.2vw, 25px)',
                  lineHeight: '1.4',
                  textAlign: 'left',
                }}
              >
                You deserve to be treated as a whole person, not a list of symptoms.
              </p>
            </div>
            <div>
              <p style={{ ...bodyP, color: '#f3ead9', fontSize: '15px', marginBottom: '18px', textAlign: 'left' }}>
                Gut health, hormones, thyroid function, recovery, stress. So many of the topics that shape how you
                actually feel rarely get real airtime, and it&rsquo;s easy to end up piecing together answers on your
                own.
              </p>
              <p style={{ ...bodyP, color: '#f3ead9', fontSize: '15px', marginBottom: '18px', textAlign: 'left' }}>
                Guest Expert Residencies bring trusted specialists into Body Unmuted to change that. Each residency
                takes on a different underdiscussed part of women&rsquo;s health, so you get real conversation and
                resources that treat you as a whole person, not a list of symptoms to manage one at a time.
              </p>
              <p style={{ ...bodyP, color: '#fbf4e9', fontWeight: 600, fontSize: '15px', textAlign: 'left', borderTop: '1px solid rgba(232,238,186,0.35)', paddingTop: '18px' }}>
                First up: a functional nutrition expert specializing in women&rsquo;s gut, thyroid, and hormone
                health. It&rsquo;s one of many topics we plan to bring into the community, because no one should have
                to struggle through this alone.
              </p>
            </div>
          </div>
        </div>
      </MediaSection>

      {/* ── SIERRA TESTIMONIAL ── */}
      <PullQuoteTestimonial
        quote="I finally understand what I'm supposed to be doing and what a good workout should actually FEEL like, not just look like."
        body="Madison was the first person who ever got me genuinely excited about fitness. She explains nutrition in a way that actually makes sense and feels doable in real life. She's a trainer who's also a foodie, so she won't just tell you to diet. She understands that we're human, and especially as women, we're not operating at 100% all the time. Instead of the all-or-nothing cycle, she helps you stay consistent and keep moving forward. I've tried getting into the gym so many times and always fell off because I didn't know what I was doing. Madison gave me the foundation I was missing. I finally understand what I'm supposed to be doing and what a good workout should actually FEEL like, not just look like. I honestly can't recommend her enough."
        name="Sierra"
        bg="#efdfc3"
      />

      {/* ── COMMUNITY, ACCOUNTABILITY, AND LIVE SUPPORT ── */}
      <MediaSection
        backgroundSrc={img('madison-175.jpg')}
        veil="linear-gradient(180deg, rgba(251,244,233,0.5) 0%, rgba(251,244,233,0.9) 55%, rgba(251,244,233,0.94) 100%)"
        contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: '#7f8b32',
                fontSize: 'clamp(30px, 4.4vw, 52px)',
                lineHeight: '1.15',
                fontWeight: 400,
                marginBottom: '24px',
              }}
            >
              People in your corner wherever in the world you are.
            </h2>
            <p style={{ ...bodyP, color: '#45220d', maxWidth: '780px', margin: '0 auto' }}>
              Your coaching gives you the right strategy. Community and coaching support are what help you keep
              using it when a launch takes over the week or your schedule falls apart. This is where you ask the
              question you&rsquo;ve been sitting on, talk through the week that didn&rsquo;t go to plan, and get to
              know the other women doing this alongside you.
            </p>
          </div>

          <div className="surface-light grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10" style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {communityItems.map((c) => (
              <div key={c.label}>
                <p style={{ ...eyebrow, color: '#525421', fontWeight: 700, marginBottom: '10px', textAlign: 'left', borderBottom: '1px solid rgba(206,150,90,0.4)', paddingBottom: '10px' }}>
                  {c.label}
                </p>
                <p style={{ ...bodyP, color: '#2d1506', textAlign: 'left' }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </MediaSection>

      {/* ── WHY MADISON CREATED BODY UNMUTED ── */}
      <MediaSection backgroundSrc={img('brown-background.png')} contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-14 items-start">
            <div className="w-full md:w-[36%] flex-shrink-0 gold-frame">
              <Photo src={img('madison-201.jpg')} alt="Madison resting on a bed" aspect="0.667" />
            </div>
            <div className="w-full md:w-[64%] problem-copy-surface" style={{ maxWidth: '700px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#ce965a',
                  fontSize: 'clamp(28px, 3.6vw, 42px)',
                  lineHeight: '1.15',
                  fontWeight: 400,
                  marginBottom: '28px',
                  textAlign: 'left',
                }}
              >
                Why I created Body Unmuted
              </h2>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px', textAlign: 'left' }}>
                I didn&rsquo;t create Body Unmuted because I couldn&rsquo;t get results, for myself or my clients. I
                could, and I did.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontStyle: 'italic',
                  color: '#ce965a',
                  fontSize: 'clamp(20px, 2.4vw, 27px)',
                  marginBottom: '16px',
                  textAlign: 'left',
                }}
              >
                Then my life changed.
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px', textAlign: 'left' }}>
                I stepped into full-time travel and entrepreneurship, and I hit an uncomfortable realization. The
                system that had worked for years wasn&rsquo;t built for the life I actually wanted to live. I
                remember asking myself one question: how do I keep getting results and also get to live the life
                I&rsquo;m dreaming about?
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px', textAlign: 'left' }}>
                Before any of this, I was a data scientist, and that background never really left me. I stopped
                thinking about fitness as something that only works under perfect conditions, and I started looking
                at it through the same lens I used in my work: understanding what&rsquo;s actually driving the
                result, not just chasing the result itself.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontStyle: 'italic',
                  color: '#ce965a',
                  fontSize: 'clamp(20px, 2.4vw, 27px)',
                  marginBottom: '20px',
                  textAlign: 'left',
                }}
              >
                I learned how to build my fitness around my life.
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '24px', textAlign: 'left' }}>
                That let me build a coaching method that could travel with me. One that adapts to changing seasons
                instead of breaking when they come, and teaches understanding instead of dependency.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#2d1506',
                  fontSize: 'clamp(19px, 2.2vw, 24px)',
                  lineHeight: '1.4',
                  textAlign: 'left',
                }}
              >
                Fitness should not ask women to make their lives smaller. It can help make them bigger.
              </p>

              <ProofCard
                body="Working with Madison has genuinely changed my life. Over the last year I've lost 20 pounds, built real strength, and found a confidence I didn't know I was missing. She doesn't just give you workouts. She helped me completely overhaul my nutrition and actually understand what my body needs. I feel better at 36 than I did at 26. I didn't think that was possible."
                name="Liz"
              />
            </div>
          </div>
        </div>
      </MediaSection>

      {/* ── WHAT HAPPENS WHEN YOU SAY YES ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-12 items-center" style={{ marginBottom: '64px' }}>
            <div className="w-full md:w-[55%]">
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#7f8b32',
                  fontSize: 'clamp(30px, 4vw, 46px)',
                  lineHeight: '1.2',
                  fontWeight: 400,
                  marginBottom: '16px',
                  textAlign: 'left',
                }}
              >
                Here&rsquo;s what happens when you say yes.
              </h2>
              <p style={{ ...bodyP, color: '#45220d', textAlign: 'left' }}>
                From your deposit to your first day inside Body Unmuted, here is exactly what to expect.
              </p>
            </div>
            <div className="w-full md:w-[40%]">
              <Photo src={img('IMG_6545.jpg')} alt="Madison sitting on a cream couch, smiling" aspect="0.9" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-8">
            <TimelineStep n="01" title="Reserve Your Founding Spot">
              Pay the $100 deposit. It will be applied to your first month inside Body Unmuted.
            </TimelineStep>
            <TimelineStep n="02" title="Complete Your Onboarding">
              You&rsquo;ll immediately receive an email with your onboarding questionnaire and a link to schedule
              your private strategy session with Madison.
            </TimelineStep>
            <TimelineStep n="03" title="Build Your Transformation Roadmap">
              During the strategy session, Madison will review your goals, training history, current routines,
              lifestyle, obstacles, and starting data. Together, you&rsquo;ll identify the phases and priorities of
              your transformation.
            </TimelineStep>
            <TimelineStep n="04" title="Receive Your Custom Programming">
              Your personalized training and nutrition programming will be delivered within one week of your
              strategy session. Enroll by October 1 and you should be ready to begin when Body Unmuted opens on
              October 5.
            </TimelineStep>
            <TimelineStep n="05" title="Enter Body Unmuted">
              On October 5, you&rsquo;ll receive access to the community, coaching space, and Body Literacy
              curriculum. Your programming, progress, feedback, and real life will continue guiding future
              adjustments.
            </TimelineStep>
          </div>
        </div>
      </section>

      {/* ── FOUNDING MEMBER PRICING ── */}
      <MediaSection backgroundSrc={img('dark-green-background.png')} veil="rgba(45,21,6,0.2)" contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div className="surface-dark" style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(2.5rem, 6vw, 4.5rem)', textAlign: 'center' }}>
          <p style={{ ...eyebrow, color: '#c8d199', marginBottom: '20px' }}>Founding Member Rate</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', gap: '8px 16px', marginBottom: '32px' }}>
            <span
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: 'rgba(251,244,233,0.55)',
                textDecoration: 'line-through',
                fontSize: 'clamp(20px, 3.4vw, 32px)',
              }}
            >
              $555/month
            </span>
            <span
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: '#fbf4e9',
                fontSize: 'clamp(40px, 9vw, 88px)',
                lineHeight: '1',
              }}
            >
              $333/month
            </span>
          </div>
          <p style={{ ...bodyP, color: '#fbf4e9', marginBottom: '4px' }}>Reserve your spot today with a $100 deposit.</p>
          <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '24px' }}>
            Your deposit is applied to your first month. The remaining $233 will be charged on October 5, followed by
            $333 monthly beginning November 5.
          </p>
          <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '36px' }}>
            Enroll before October 5 and your $333 founding rate remains locked in for as long as you stay a member.
            New-member pricing increases to $555 per month on October 5.
          </p>
          <Btn href="/join" bg="#fbf4e9" color="#2d1506">
            Reserve My Founding Spot
          </Btn>
        </div>
      </MediaSection>

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(48px, 7vw, 84px)',
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
          <Btn href="/join" bg="#2d1506" color="#fbf4e9">
            Secure Your Founding Rate
          </Btn>
        </div>
      </section>

      {/* ── STICKY CHAPTER 3: final CTA pinned, olive footer slides over ── */}
      <StickyChapter
        scene={
          <MediaSection
            backgroundSrc={img('BO1A8225.jpg')}
            objectPosition="55% 15%"
            veil="linear-gradient(90deg, rgba(45,21,6,0.72) 0%, rgba(45,21,6,0.45) 55%, rgba(45,21,6,0.15) 100%)"
            className="sticky-scene flex items-center"
            contentClassName="w-full"
            contentStyle={{ padding: 'clamp(64px, 9vw, 100px) 20px' }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ maxWidth: '640px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-instrument-serif), serif',
                    color: '#fbf4e9',
                    fontSize: 'clamp(28px, 4vw, 44px)',
                    lineHeight: '1.25',
                    fontWeight: 400,
                    marginBottom: '20px',
                    maxWidth: '420px',
                    textAlign: 'left',
                  }}
                >
                  You do not have to choose between getting results and living the life you worked so hard to build.
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-instrument-serif), serif',
                    fontStyle: 'italic',
                    color: '#e8eeba',
                    fontSize: 'clamp(19px, 2.2vw, 25px)',
                    marginBottom: '20px',
                    textAlign: 'left',
                  }}
                >
                  Your body and your freedom were never supposed to be competing goals.
                </p>
                <p style={{ ...bodyP, color: '#fbf4e9', marginBottom: '20px', textAlign: 'left' }}>
                  Body Unmuted gives you personalized training, nutrition, and coaching that can change your body
                  without taking over your life.
                </p>
                <p style={{ ...eyebrow, color: '#e8eeba', marginBottom: '28px', textAlign: 'left' }}>
                  Reserve your founding member spot with a $100 deposit before the rate increases from $333 to $555
                  on October 5.
                </p>
                <Btn href="/join" bg="#e8eeba" color="#2d1506">
                  Secure My Founding Rate
                </Btn>
                <p style={{ marginTop: '28px' }}>
                  <Link
                    href="/contact"
                    style={{
                      fontFamily: 'var(--font-inter-sans), sans-serif',
                      fontSize: '13px',
                      color: 'rgba(251,244,233,0.75)',
                      textDecoration: 'underline',
                    }}
                  >
                    Looking for deeper private support? Explore 1:1 coaching.
                  </Link>
                </p>
              </div>
            </div>
          </MediaSection>
        }
        surfaceStyle={{ background: '#525421', padding: 0 }}
        surface={<Footer />}
      />
    </>
  );
}
