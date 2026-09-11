import Image from 'next/image';
import MediaSection from '@/components/MediaSection';
import StickyChapter from '@/components/StickyChapter';
import WorkshopRegistrationBar from '@/components/WorkshopRegistrationBar';

const LUMA_URL = 'https://luma.com/numw8n89';
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

function ArrowIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M1 9h20M14 2l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LumaBtn({ bg, color, children }: { bg: string; color: string; children: React.ReactNode }) {
  return (
    <a
      href={LUMA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="luxe-button"
      style={{ backgroundColor: bg, color, borderColor: color }}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

function RegisterCaption({ color = 'rgba(45,21,6,0.5)' }: { color?: string }) {
  return (
    <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color, fontSize: '12px', marginTop: '12px' }}>
      Free &middot; Live Online &middot; September 29&ndash;October 1
    </p>
  );
}

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

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '18px' }}>
      <span style={{ flexShrink: 0, color: '#ce965a', fontSize: '17px', marginTop: '2px' }} aria-hidden="true">
        &#10003;
      </span>
      <p style={{ ...bodyP, color: '#2d1506', textAlign: 'left' }}>{children}</p>
    </div>
  );
}

const walkAway = [
  'A clear understanding of why your previous approaches haven’t worked or lasted',
  'A personalized look at the friction keeping you caught in the stop-start cycle',
  'A better understanding of how perfectionism may be making consistency harder',
  'Clarity around what effective strength training actually requires',
  'An understanding of how nutrition supports muscle growth, fat loss, energy, and recovery',
  'A personalized audit showing which pieces your current approach already has and which may be missing',
  'A clearer sense of which fitness advice matters for your goal and which details may be distracting you',
  'A framework for making fitness work through travel, launches, dinners out, and changing weeks',
  'A better way to decide when to keep going, when to adjust, and when something deserves more attention',
  'Clarity around what your next fitness strategy needs to include',
];

const forYouIf = [
  'You know you want to build muscle, lose fat, or become stronger, but you’re not fully sure what your body needs from you',
  'Your business has systems, while your fitness still runs mostly on motivation and good intentions',
  'You can follow a plan until a trip, launch, dinner, or demanding week changes everything',
  'You have saved workouts, nutrition advice, and half-finished plans, but no clear sense of which pieces actually apply to you',
  'You exercise regularly without seeing the physical changes you expected',
  'You tend to believe that anything less than the full plan isn’t worth doing',
  'You repeatedly wait for life to calm down before beginning again',
  'You want structure, but you don’t want fitness to become another rigid system controlling your life',
  'You want to enjoy restaurants, wine, travel, and spontaneous plans without feeling as though you have ruined your progress',
  'You want to understand whether your training is hard enough, productive enough, and progressing over time',
  'You want to know what your numbers and body signals mean without turning fitness into another thing to obsess over',
  'You want your strength, confidence, energy, and physical capacity to keep pace with the life and business you’re building',
];

function DayBlock({
  n,
  title,
  hook,
  body,
  couplet,
  createLabel,
  createName,
  createLeadIn,
  createBullets,
  leaveWith,
  bg,
}: {
  n: string;
  title: string;
  hook?: string[];
  body: string[];
  couplet?: string[];
  createLabel: string;
  createName: string;
  createLeadIn: string;
  createBullets: string[];
  leaveWith: string;
  bg: string;
}) {
  return (
    <section style={{ backgroundColor: bg }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(56px, 8vw, 88px) 20px' }}>
        <div className="flex gap-8 md:gap-10">
          <div style={{ flexShrink: 0, width: 'clamp(56px, 8vw, 88px)', borderLeft: '2px solid rgba(206,150,90,0.45)', paddingLeft: 'clamp(16px, 2vw, 24px)' }}>
            <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#ce965a', fontSize: 'clamp(40px, 5vw, 58px)', lineHeight: '1' }}>
              {n}
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                fontStyle: 'italic',
                color: '#2d1506',
                fontSize: 'clamp(24px, 3.2vw, 38px)',
                lineHeight: '1.2',
                marginBottom: '20px',
                textAlign: 'left',
              }}
            >
              {title}
            </h3>
            {hook &&
              hook.map((line, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'var(--font-instrument-serif), serif',
                    fontStyle: 'italic',
                    color: '#7f8b32',
                    fontSize: 'clamp(17px, 1.9vw, 21px)',
                    lineHeight: '1.4',
                    marginBottom: i === hook.length - 1 ? '20px' : '4px',
                    textAlign: 'left',
                  }}
                >
                  {line}
                </p>
              ))}
            {body.map((p, i) => (
              <p key={i} style={{ ...bodyP, color: '#45220d', marginBottom: '18px', textAlign: 'left' }}>
                {p}
              </p>
            ))}
            {couplet && (
              <div style={{ marginBottom: '24px' }}>
                {couplet.map((line, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: 'var(--font-instrument-serif), serif',
                      fontStyle: 'italic',
                      color: '#a67c52',
                      fontSize: 'clamp(16px, 1.8vw, 19px)',
                      marginBottom: '2px',
                      textAlign: 'left',
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}
            <div
              style={{
                borderTop: '1px solid rgba(206,150,90,0.4)',
                padding: '20px 0',
                marginBottom: '20px',
              }}
            >
              <p style={{ ...eyebrow, color: '#a67c52', marginBottom: '8px', textAlign: 'left' }}>{createLabel}</p>
              <p
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontStyle: 'italic',
                  color: '#2d1506',
                  fontSize: 'clamp(19px, 2.1vw, 23px)',
                  marginBottom: '14px',
                  textAlign: 'left',
                }}
              >
                {createName}
              </p>
              <p style={{ ...bodyP, color: '#45220d', fontSize: '15px', marginBottom: '12px', textAlign: 'left' }}>{createLeadIn}</p>
              <ul style={{ ...bodyP, color: '#45220d', fontSize: '15px', paddingLeft: '22px', listStyleType: 'disc', textAlign: 'left' }}>
                {createBullets.map((b) => (
                  <li key={b} style={{ marginBottom: '6px' }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <p style={{ ...bodyP, color: '#45220d', textAlign: 'left' }}>
              <strong style={{ fontWeight: 600, color: '#2d1506' }}>You&rsquo;ll leave with:</strong> {leaveWith}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WorkshopPage() {
  return (
    <>
      <WorkshopRegistrationBar />

      {/* ── STICKY CHAPTER: hero pinned, problem section slides over it ── */}
      <StickyChapter
        scene={
          <section className="sticky-scene flex items-center" style={{ backgroundColor: '#fbf4e9', position: 'relative' }}>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '320px',
                maxWidth: '42vw',
                aspectRatio: '1/1',
                opacity: 0.13,
                pointerEvents: 'none',
              }}
            >
              <Image src={img('light-background.png')} alt="" fill sizes="320px" style={{ objectFit: 'cover', objectPosition: 'top right' }} />
            </div>

            <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) 20px', width: '100%' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <p style={{ ...eyebrow, color: '#ce965a', fontWeight: 700, marginBottom: '18px', textAlign: 'left' }}>
                    Free 3-Day Live Workshop
                  </p>
                  <h1
                    style={{
                      fontFamily: 'var(--font-instrument-serif), serif',
                      color: '#2d1506',
                      fontSize: 'clamp(32px, 4.6vw, 56px)',
                      lineHeight: '1.1',
                      fontWeight: 400,
                      marginBottom: '20px',
                      textAlign: 'left',
                    }}
                  >
                    Founders, Your Fitness Plan Is F***d{' '}
                    <em style={{ fontStyle: 'italic', color: '#ce965a' }}>(Respectfully).</em>
                  </h1>
                  <p style={{ ...bodyP, color: '#45220d', marginBottom: '20px', textAlign: 'left' }}>
                    A three-day workshop to understand why fitness keeps feeling harder than it should, what your
                    body actually needs in order to change, and how to make it work inside the life you built your
                    business to create.
                  </p>
                  <p style={{ ...eyebrow, color: '#525421', fontWeight: 700, marginBottom: '28px', textAlign: 'left' }}>
                    September 29 through October 1 | Live Online
                  </p>
                  <LumaBtn bg="#2d1506" color="#fbf4e9">
                    Save My Free Spot
                  </LumaBtn>
                  <RegisterCaption />
                </div>
                <div className="gold-frame">
                  <Photo src={img('unnamed.jpg')} alt="Madison laughing on a cream couch" aspect="0.85" position="50% 38%" />
                </div>
              </div>
            </div>
          </section>
        }
        surface={
          <MediaSection backgroundSrc={img('brown-background.png')} contentStyle={{ padding: 'clamp(64px, 9vw, 100px) 20px' }}>
            <div id="workshop-hero-end" />
            <div className="problem-copy-surface" style={{ maxWidth: '740px', margin: '0 auto' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#2d1506',
                  fontSize: 'clamp(26px, 3.4vw, 40px)',
                  lineHeight: '1.25',
                  fontWeight: 400,
                  marginBottom: '24px',
                  textAlign: 'left',
                }}
              >
                You can do hard things. So why does fitness still feel this hard?
              </h2>
              <p style={{ ...bodyP, color: '#45220d', marginBottom: '20px', textAlign: 'left' }}>
                You&rsquo;ve built a business. You make decisions, solve problems, navigate uncertainty, and figure
                shit out every day.
              </p>
              <p style={{ ...bodyP, color: '#45220d', marginBottom: '20px', textAlign: 'left' }}>
                But when it comes to fitness, you may still find yourself&hellip;
              </p>
              <ArrowLine first>Knowing you want to change your body without knowing what will actually create that change</ArrowLine>
              <ArrowLine>Starting with the best intentions, only to watch the plan disappear when work gets busy or you leave town</ArrowLine>
              <ArrowLine>Exercising consistently for a while without seeing much difference in the way you look or feel</ArrowLine>
              <ArrowLine>Trying to &ldquo;get back on track&rdquo; after every trip, dinner out, missed workout, or demanding week</ArrowLine>
              <ArrowLine>Overwhelmed by advice that constantly contradicts itself</ArrowLine>
              <ArrowLine>
                Wondering why you can be capable and consistent everywhere else, but never seem to get this part of
                your life to click
              </ArrowLine>
            </div>
          </MediaSection>
        }
      />

      {/* ── THE REAL REASON IT HASN'T WORKED ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
            And I know how easy it is to assume that the answer must be more discipline.
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
            That if you could just follow the plan perfectly, stop letting life get in the way, or finally become the
            woman who never misses a workout, you would already have the body you want.
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
            But sometimes the plan was never capable of creating that result in the first place.
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
            Sometimes it could work, but only for a woman with the same schedule, the same gym, complete control over
            every meal, and a life that never changes.
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
            And sometimes the plan has become so wrapped up in rules, guilt, and perfection that it feels completely
            at odds with the freedom you worked so hard to create.
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
            You didn&rsquo;t build your business so you could spend your life organizing everything around fitness.
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '8px', textAlign: 'left' }}>
            But you also shouldn&rsquo;t have to choose between building the body you want and fully living the life
            you built.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#ce965a',
              fontSize: 'clamp(19px, 2.2vw, 24px)',
              marginTop: '20px',
              textAlign: 'left',
            }}
          >
            Over these three days, we&rsquo;re going to look at why your previous approaches haven&rsquo;t worked,
            what your body actually requires in order to change, and what it takes to make those pieces work together
            in your real life.
          </p>
        </div>
      </section>

      {/* ── WHAT YOU'LL WALK AWAY WITH ── */}
      <MediaSection backgroundSrc={img('light-background.png')} veil="rgba(251,244,233,0.85)" contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="surface-light" style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: '#2d1506',
                fontSize: 'clamp(28px, 3.8vw, 46px)',
                lineHeight: '1.2',
                fontWeight: 400,
                textAlign: 'center',
                marginBottom: '16px',
              }}
            >
              What You&rsquo;ll Walk Away With
            </h2>
            <p style={{ ...bodyP, color: '#45220d', textAlign: 'center', marginBottom: '40px' }}>
              By the end of the workshop, you&rsquo;ll have:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-2" style={{ marginBottom: '32px' }}>
              {walkAway.map((w) => (
                <CheckItem key={w}>{w}</CheckItem>
              ))}
            </div>
            <div style={{ textAlign: 'center', borderTop: '1px solid rgba(205,170,92,0.35)', paddingTop: '32px', marginBottom: '32px' }}>
              <p style={{ ...bodyP, color: '#45220d', marginBottom: '12px' }}>
                This isn&rsquo;t three days to hand you another generic plan and send you away to follow it.
              </p>
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#ce965a', fontSize: 'clamp(18px, 2vw, 22px)' }}>
                It&rsquo;s three days to help you understand why the old ones failed, what an approach capable of
                changing your body must contain, and what it takes to make those pieces work for you.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <LumaBtn bg="#2d1506" color="#fbf4e9">
                Save My Free Spot
              </LumaBtn>
            </div>
          </div>
        </div>
      </MediaSection>

      {/* ── WHAT HAPPENS EACH DAY ── */}
      <section style={{ backgroundColor: '#525421', padding: 'clamp(64px, 9vw, 96px) 20px clamp(40px, 6vw, 56px)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#fbf4e9',
            fontSize: 'clamp(30px, 4.2vw, 50px)',
            lineHeight: '1.15',
            fontWeight: 400,
            textAlign: 'center',
            maxWidth: '760px',
            margin: '0 auto',
          }}
        >
          What We&rsquo;re Doing Each Day
        </h2>
      </section>

      <DayBlock
        n="01"
        title="Why Your Fitness Plan Is F***d"
        hook={[
          'You’re successful, capable, and accustomed to doing hard things, so why does fitness still feel like the one problem you can’t seem to solve consistently?',
        ]}
        body={[
          'On Day 1, we’ll look at the two problems that are often tangled together: fitness plans that were never designed well enough to work and the patterns that keep pulling you into another round of stopping and starting.',
          'We’ll talk about the five types of friction that can exist between you and your plan, why trying harder doesn’t solve every one of them, and how perfectionism can make anything less than a perfect week feel like a failed one.',
          'We’ll also look at the deeper conflict that happens when you value freedom, but fitness has always been presented as more restriction, more rules, and another thing your life has to revolve around.',
        ]}
        couplet={[
          'Because the goal isn’t to remove all structure or pretend results don’t require real work.',
          'It’s to stop pursuing them in a way that makes your life smaller.',
        ]}
        createLabel="After Day 1, you&rsquo;ll complete"
        createName="Your Freedom-Fitness Friction Audit"
        createLeadIn="This personalized experience will help you identify:"
        createBullets={[
          'Your primary and secondary sources of friction',
          'The mindset patterns making them harder to move through',
          'Your personal stop-start cycle',
          'What you may have been blaming yourself for',
          'What your next approach needs to account for',
        ]}
        leaveWith="Understanding what has actually been getting in your way and knowing what we need to look at next."
        bg="#efdfc3"
      />
      <DayBlock
        n="02"
        title="What Actually Changes Your Body"
        hook={['Let’s say you did follow the plan consistently.', 'Would it actually work?']}
        body={[
          'On Day 2, we’re separating everything that makes you feel productive from the things that genuinely create physical change.',
          'We’ll look at what your training needs in order to build visible muscle and strength, including exercise selection, intensity, productive volume, progression, and enough consistency for your body to adapt.',
          'Then we’ll bring nutrition into the conversation and talk about energy balance, protein, carbohydrates, fats, recovery, meals out, alcohol, and why eating “healthy” isn’t always the same as eating in a way that supports your goal.',
          'We’ll also talk about what cardio, Pilates, yoga, walking, and other forms of movement can give you, along with the things they cannot replace when your goal is to meaningfully change your body.',
          'Most importantly, you’ll learn how to tell the difference between the foundations that drive results and the tiny details women are often taught to obsess over before those foundations are even in place.',
        ]}
        createLabel="After Day 2, you&rsquo;ll complete"
        createName="Your Body Transformation Gap Audit"
        createLeadIn="This personalized audit will help you see:"
        createBullets={[
          'What your current approach is already doing well',
          'Which essential pieces may be missing',
          'Which pieces exist but may not be executed effectively',
          'Your biggest potential bottleneck',
          'Where you are currently guessing',
          'Which details may be taking your attention away from what matters',
          'What needs a closer look before the right strategy can be built',
        ]}
        leaveWith="Knowing whether what you're currently doing is actually capable of moving you toward the body you want."
        bg="#fbf4e9"
      />
      <DayBlock
        n="03"
        title="Make It Work in Real Life"
        hook={[
          'Knowing what creates change is one thing.',
          'Knowing how to keep those pieces working when your schedule, environment, energy, body, or priorities change is another.',
        ]}
        body={[
          'On Day 3, we’ll talk about how to make an effective approach flexible without making it random, vague, or so watered down that it stops producing results.',
          'We’ll look at minimum, target, and stretch weeks, how to decide what needs to remain consistent, and which pieces can change during travel, launches, demanding seasons, or weeks when you don’t have access to your usual routine.',
          'We’ll talk about restaurants, alcohol, missed workouts, changing equipment, low-energy days, and how to return after disruption without punishing yourself or declaring that it’s time to start over again.',
          'You’ll also learn how to look at your progress and your body’s signals with more context, so you aren’t changing everything because of one difficult day or continuing to blindly push through a pattern that genuinely needs your attention.',
        ]}
        couplet={[
          'Because a plan shouldn’t require your life to stop changing.',
          'It should give you a way to keep making intelligent decisions while it does.',
        ]}
        createLabel="On Day 3, we&rsquo;ll apply"
        createName="The Real-Life Fitness Stress Test"
        createLeadIn="You'll look at the travel, work demands, social plans, and changes already on your calendar and identify:"
        createBullets={[
          'Where your current approach is most likely to break',
          'Which important pieces tend to disappear first',
          'How you normally respond when they do',
          'What your strategy needs to preserve',
          'Which decisions need to be made before the difficult week arrives',
          'Where more personalization, feedback, or support would make the greatest difference',
        ]}
        leaveWith="Understanding what it takes to make fitness work in your life without asking that life to become smaller first."
        bg="#efdfc3"
      />

      <section style={{ backgroundColor: '#fbf4e9', padding: 'clamp(56px, 8vw, 88px) 20px', textAlign: 'center' }}>
        <LumaBtn bg="#525421" color="#fbf4e9">
          Save My Free Spot
        </LumaBtn>
      </section>

      {/* ── MEET MADISON ── */}
      <section style={{ backgroundColor: '#efdfc3', padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-14 items-center">
            <div className="w-full md:w-[42%] gold-frame">
              <Photo src={img('madison-balcony.png')} alt="Madison laughing on a wrought-iron balcony" aspect="1.01" />
            </div>
            <div className="w-full md:w-[58%]">
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#2d1506',
                  fontSize: 'clamp(26px, 3.2vw, 38px)',
                  lineHeight: '1.25',
                  fontWeight: 400,
                  marginBottom: '24px',
                  textAlign: 'left',
                }}
              >
                Hi, I&rsquo;m Madison. I build fitness structures that can take a hit and keep moving.
              </h2>
              <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
                Before I was a coach, I was a data scientist, which is probably why I have never trusted a fitness
                plan that could not explain what was actually driving the result.
              </p>
              <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
                Then I built a business, and every plan I owned got tested by client emergencies, flights that got
                moved up a day, and hotel gyms with one dumbbell and a yoga mat that had seen better days. The
                training built for a predictable Tuesday did not survive contact with my actual calendar, so I threw
                it out and built something that could.
              </p>
              <p style={{ ...bodyP, color: '#45220d', textAlign: 'left' }}>
                I do not think you should have to shrink your life to get strong. You need a structure that can take
                a hit and keep going, same as you do. That is what we are building over these three days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO THIS WORKSHOP IS FOR ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '0 20px clamp(72px, 10vw, 112px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="surface-light" style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: '#2d1506',
                fontSize: 'clamp(28px, 3.8vw, 46px)',
                lineHeight: '1.2',
                fontWeight: 400,
                textAlign: 'center',
                marginBottom: '40px',
              }}
            >
              This Workshop Is for You If&hellip;
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-2" style={{ marginBottom: '32px' }}>
              {forYouIf.map((f) => (
                <CheckItem key={f}>{f}</CheckItem>
              ))}
            </div>
            <div style={{ textAlign: 'center', borderTop: '1px solid rgba(205,170,92,0.35)', paddingTop: '32px' }}>
              <p style={{ ...bodyP, color: '#45220d', marginBottom: '12px' }}>
                You do not need another person telling you to try harder or care more.
              </p>
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#7f8b32', fontSize: 'clamp(19px, 2.2vw, 25px)' }}>
                You need to understand what has been getting in your way, what your body actually requires, and how
                those pieces can work inside the life you genuinely want to live.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STRATEGY MANIFESTO ── */}
      <MediaSection backgroundSrc={img('dark-green-background.png')} veil="rgba(45,21,6,0.2)" contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div className="surface-dark" style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#fbf4e9',
              fontSize: 'clamp(26px, 3.4vw, 40px)',
              lineHeight: '1.25',
              fontWeight: 400,
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            Your Business Isn&rsquo;t the Only Thing That Deserves a Strategy
          </h2>
          <div style={{ maxWidth: '620px', margin: '0 auto' }}>
            <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '4px', textAlign: 'left' }}>
              If your business strategy only worked when nothing unexpected happened, you wouldn&rsquo;t consider it
              a particularly good strategy.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                fontStyle: 'italic',
                color: '#ce965a',
                fontSize: 'clamp(18px, 2vw, 22px)',
                marginBottom: '20px',
                textAlign: 'left',
              }}
            >
              Your fitness shouldn&rsquo;t get a pass.
            </p>
            <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '24px', textAlign: 'left' }}>
              It should understand the result you&rsquo;re trying to create, use methods capable of producing it,
              account for the constraints and opportunities inside your life, and give you a way to learn from what
              happens next.
            </p>
            <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '2px', textAlign: 'left' }}>
              Because your body will adapt.
            </p>
            <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '20px', textAlign: 'left' }}>Your schedule will change.</p>
            <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '24px', textAlign: 'left' }}>
              You will travel, go to dinner, move through demanding seasons, miss workouts, have incredible weeks,
              and have weeks where very little goes according to plan.
            </p>
            <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '4px', textAlign: 'left' }}>
              The answer isn&rsquo;t to keep finding new plans every time that happens.
            </p>
            <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '28px', textAlign: 'left' }}>
              It&rsquo;s to understand what matters well enough that your approach can keep evolving without losing
              the point of what you&rsquo;re doing.
            </p>
            <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '20px', textAlign: 'left' }}>
              Over these three days, that is exactly what we&rsquo;re going to begin building.
            </p>
            <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#a67c52', fontSize: 'clamp(17px, 1.9vw, 20px)', marginBottom: '2px', textAlign: 'left' }}>
              Not another perfect plan.
            </p>
            <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#a67c52', fontSize: 'clamp(17px, 1.9vw, 20px)', marginBottom: '16px', textAlign: 'left' }}>
              Not someone else&rsquo;s plan.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                fontStyle: 'italic',
                color: '#ce965a',
                fontSize: 'clamp(19px, 2.2vw, 25px)',
                textAlign: 'left',
              }}
            >
              A clearer, more intelligent way forward for your body and your life.
            </p>
          </div>
        </div>
      </MediaSection>

      {/* ── FINAL REGISTRATION CTA ── */}
      <MediaSection
        backgroundSrc={img('brown-background.png')}
        id="workshop-final-cta"
        contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-center surface-light" style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <div className="w-full md:w-[38%] gold-frame">
              <Photo src={img('BO1A8265.jpg')} alt="Madison fanning herself beside a tiled pool" aspect="0.9" />
            </div>
            <div className="w-full md:w-[62%]" style={{ textAlign: 'center' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#2d1506',
                  fontSize: 'clamp(24px, 3.2vw, 36px)',
                  lineHeight: '1.15',
                  fontWeight: 400,
                  marginBottom: '16px',
                }}
              >
                Founders, Your Fitness Plan Is F***d{' '}
                <em style={{ fontStyle: 'italic', color: '#ce965a' }}>(Respectfully).</em>
              </h2>
              <p style={{ ...eyebrow, color: '#525421', fontWeight: 700, marginBottom: '20px' }}>
                September 29 through October 1 | Live Online
              </p>
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#45220d', fontSize: 'clamp(18px, 2vw, 22px)', marginBottom: '28px' }}>
                Come find out why, and what your body actually needs instead.
              </p>
              <LumaBtn bg="#2d1506" color="#fbf4e9">
                Save My Free Spot
              </LumaBtn>
              <RegisterCaption />
            </div>
          </div>
        </div>
      </MediaSection>
    </>
  );
}
