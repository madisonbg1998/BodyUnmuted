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
      Free &middot; Live Online &middot; One Day Only
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

const knowByEnd = [
  'Which part of your current approach is most likely holding back your results',
  'Whether your workouts are actually structured to build visible muscle and strength',
  'Whether your nutrition matches the transformation you’re trying to create',
  'Why your routine keeps disappearing when work, travel, or normal life gets busy',
  'Which parts of your strategy must stay consistent and which parts can change',
  'What your next approach needs to prioritize first',
];

const forYouIf = [
  'You want to begin but don’t feel confident that you know what to do',
  'Your routine only works when you’re home and life is predictable',
  'You’re already exercising and eating “well,” but your body isn’t changing',
  'You repeatedly stop, restart, and wait for a better time to try again',
  'Your old approach no longer works for your current body or life',
  'You know plenty about fitness but struggle to turn that information into an effective strategy',
  'You want visible physical results without making fitness the center of your entire world',
];

const roadmapItems = [
  'What is already working',
  'What is missing',
  'What exists but isn’t being used effectively',
  'Where your plan is most likely to break',
  'What your body and goal require next',
  'What needs to change first',
];

function StepBlock({
  n,
  title,
  body,
  createName,
  bg,
}: {
  n: string;
  title: string;
  body: string[];
  createName: string;
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
            {body.map((p, i) => (
              <p key={i} style={{ ...bodyP, color: '#45220d', marginBottom: '18px', textAlign: 'left' }}>
                {p}
              </p>
            ))}
            <div style={{ borderTop: '1px solid rgba(206,150,90,0.4)', paddingTop: '20px' }}>
              <p style={{ ...eyebrow, color: '#a67c52', marginBottom: '8px', textAlign: 'left' }}>You&rsquo;ll complete</p>
              <p
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontStyle: 'italic',
                  color: '#2d1506',
                  fontSize: 'clamp(19px, 2.1vw, 23px)',
                  textAlign: 'left',
                }}
              >
                {createName}
              </p>
            </div>
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
                    Free One-Day Live Workshop for Female Founders
                  </p>
                  <h1
                    style={{
                      fontFamily: 'var(--font-instrument-serif), serif',
                      color: '#2d1506',
                      fontSize: 'clamp(32px, 4.6vw, 56px)',
                      lineHeight: '1.1',
                      fontWeight: 400,
                      marginBottom: '4px',
                      textAlign: 'left',
                    }}
                  >
                    Founders, Your Fitness Plan Is F***d
                  </h1>
                  <p
                    style={{
                      fontFamily: 'var(--font-instrument-serif), serif',
                      fontStyle: 'italic',
                      color: '#ce965a',
                      fontSize: 'clamp(19px, 2.4vw, 28px)',
                      marginBottom: '20px',
                      textAlign: 'left',
                    }}
                  >
                    (Respectfully.)
                  </p>
                  <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
                    A one-day workshop to understand why fitness keeps feeling harder than it should, what your body
                    actually needs in order to change, and how to make it work inside the life you built your
                    business to create.
                  </p>
                  <p style={{ ...bodyP, color: '#45220d', fontSize: '15px', marginBottom: '20px', textAlign: 'left' }}>
                    You&rsquo;ll audit your training, nutrition, and the way fitness currently fits into your life,
                    so you leave knowing exactly what is working, what is missing, and what your next strategy needs
                    to include to build muscle, become stronger, and create visible change you can actually sustain.
                  </p>
                  <p style={{ ...eyebrow, color: '#525421', fontWeight: 700, marginBottom: '28px', textAlign: 'left' }}>
                    September 30 | Live Online
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
                You Can Do Hard Things. So Why Does Fitness Still Feel This Hard?
              </h2>
              <p style={{ ...bodyP, color: '#45220d', marginBottom: '20px', textAlign: 'left' }}>
                You&rsquo;ve built a business. You make decisions, solve problems, navigate uncertainty, and figure
                shit out every day.
              </p>
              <p style={{ ...bodyP, color: '#45220d', marginBottom: '20px', textAlign: 'left' }}>
                But when it comes to changing your body, you might be&hellip;
              </p>
              <ArrowLine first>
                Wanting to start, but unsure what to do in the gym, how to eat for your goal, or how to build a
                routine around a life that rarely looks the same from one week to the next
              </ArrowLine>
              <ArrowLine>
                Following a plan that works beautifully when you&rsquo;re home, in your usual gym, and cooking your
                own meals, but disappears the moment you travel or work gets intense
              </ArrowLine>
              <ArrowLine>
                Working out, taking classes, eating more protein, or trying to be consistent without seeing much
                difference in the way your body actually looks
              </ArrowLine>
              <ArrowLine>
                Collecting so much conflicting information that you question every workout, meal, and decision
                before you&rsquo;ve given anything enough time to work
              </ArrowLine>
              <ArrowLine>
                Trying to return to an approach that worked for an earlier version of your body or life, but no
                longer seems to create the same result
              </ArrowLine>
            </div>
          </MediaSection>
        }
      />

      {/* ── THE REAL REASON IT HASN'T WORKED ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
            We often think the problem is a lack of discipline or knowledge, or simply not having found quite the
            right plan yet.
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
            <span
              style={{
                backgroundColor: 'rgba(206,150,90,0.32)',
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
                padding: '0.1em 0.3em',
                borderRadius: '2px',
              }}
            >
              But what you really need is to learn what is actually capable of changing your body, which pieces are
              missing from your current approach, and how to make those pieces work when your life is full,
              unpredictable, and frequently happening somewhere new.
            </span>
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
            Because sometimes the plan was ineffective from the start.
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
            Sometimes you have the right pieces, but you don&rsquo;t know how to use them effectively enough to
            create change.
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
            And sometimes the approach could work, but only for a woman with the same schedule, the same gym,
            complete control over every meal, and a life that never changes.
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
            You didn&rsquo;t build your business for freedom just to trade that freedom for a life organized around
            fitness.
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
            But you also shouldn&rsquo;t have to choose between building the body you want and fully living the life
            you built.
          </p>
        </div>
      </section>

      {/* ── WHAT YOU'LL KNOW BY THE END ── */}
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
              What You&rsquo;ll Know by the End
            </h2>
            <p style={{ ...bodyP, color: '#45220d', textAlign: 'center', marginBottom: '40px' }}>
              By the end of the workshop, you&rsquo;ll know:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-2" style={{ marginBottom: '32px' }}>
              {knowByEnd.map((w) => (
                <CheckItem key={w}>{w}</CheckItem>
              ))}
            </div>
            <div style={{ textAlign: 'center', borderTop: '1px solid rgba(205,170,92,0.35)', paddingTop: '32px', marginBottom: '32px' }}>
              <p style={{ ...bodyP, color: '#45220d' }}>
                You&rsquo;ll leave with a personalized view of the gap between where you are now and the body
                you&rsquo;re trying to build, <strong style={{ fontWeight: 700, color: '#2d1506' }}>WITHOUT</strong>{' '}
                another generic plan telling you to meal prep every Sunday and simply &ldquo;stay consistent.&rdquo;
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

      {/* ── WHAT WE'LL DO TOGETHER ── */}
      <MediaSection backgroundSrc={img('dark-green-background.png')} veil="rgba(45,21,6,0.2)" contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div className="surface-dark" style={{ maxWidth: '700px', margin: '0 auto', padding: 'clamp(2.5rem, 6vw, 4rem)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#fbf4e9',
              fontSize: 'clamp(30px, 4.2vw, 50px)',
              lineHeight: '1.15',
              fontWeight: 400,
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            What We&rsquo;ll Do Together
          </h2>
          <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '16px', textAlign: 'left' }}>
            This won&rsquo;t be a day of taking notes while I repeat advice you could have found on Instagram.
          </p>
          <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '16px', textAlign: 'left' }}>
            We&rsquo;re going to put your actual approach on the table and look at whether it can produce the result
            you want.
          </p>
          <p style={{ ...bodyP, color: '#e8eeba', textAlign: 'left' }}>
            As we go, you&rsquo;ll complete three audits based on your body, your current habits, your goals, and
            the life your strategy needs to fit inside.
          </p>
        </div>
      </MediaSection>

      <StepBlock
        n="01"
        title="Find Out What Is Actually Getting in the Way"
        body={[
          'First, we’ll look at the friction between you and the result you want.',
          'Maybe you don’t know how to turn everything you’ve learned into a clear plan. Maybe the plan itself isn’t capable of creating the change you want. Maybe it only works under perfect conditions, or conflicting information, low energy, and all-or-nothing thinking keep making it harder to follow through.',
          'You’ll identify your primary and secondary sources of friction, see how they interact, and understand what your next strategy needs to account for, so you can stop treating every problem like a discipline problem.',
        ]}
        createName="Your Freedom-Fitness Friction Audit"
        bg="#efdfc3"
      />
      <StepBlock
        n="02"
        title="Whether What You're Doing Can Actually Change Your Body"
        body={[
          'You may already know that you should lift weights and eat protein, but those two instructions leave out most of what determines whether your body changes.',
          'We’ll look at whether your training has the right exercises, effort, volume, progression, and consistency to build muscle, along with whether your nutrition supports the phase and physical result you’re pursuing.',
          'We’ll also separate the things that genuinely drive change from the workouts, rules, and tiny details that make you feel productive without necessarily moving you forward.',
        ]}
        createName="Your Body Transformation Gap Audit"
        bg="#fbf4e9"
      />
      <StepBlock
        n="03"
        title="Whether Your Plan Can Survive Your Life"
        body={[
          'Finally, we’ll put your approach through the reality test.',
          'What happens when you travel? When your gym changes? When you have three dinners in one week, a launch consuming your attention, or less energy than usual?',
          'You’ll identify where your routine normally breaks, what needs to remain in place, and what should be able to flex without costing you the result.',
        ]}
        createName="Your Real-Life Fitness Stress Test"
        bg="#efdfc3"
      />

      {/* ── YOUR BODY TRANSFORMATION ROADMAP ── */}
      <MediaSection backgroundSrc={img('dark-green-background.png')} veil="rgba(45,21,6,0.2)" contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div className="surface-dark" style={{ maxWidth: '700px', margin: '0 auto', padding: 'clamp(2.5rem, 6vw, 4rem)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#fbf4e9',
              fontSize: 'clamp(28px, 3.6vw, 42px)',
              lineHeight: '1.2',
              fontWeight: 400,
              marginBottom: '28px',
              textAlign: 'left',
            }}
          >
            Your Body Transformation Roadmap
          </h2>
          <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '18px', textAlign: 'left' }}>
            Together, your audits will show you:
          </p>
          <ul style={{ ...bodyP, color: '#e8eeba', paddingLeft: '22px', listStyleType: 'disc', marginBottom: '28px', textAlign: 'left' }}>
            {roadmapItems.map((r) => (
              <li key={r} style={{ marginBottom: '10px' }}>
                {r}
              </li>
            ))}
          </ul>
          <p style={{ ...bodyP, color: '#e8eeba', marginBottom: '4px', textAlign: 'left' }}>
            You won&rsquo;t leave with thirty more things to try.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#ce965a',
              fontSize: 'clamp(19px, 2.2vw, 24px)',
              marginTop: '16px',
              textAlign: 'left',
            }}
          >
            You&rsquo;ll leave knowing where the actual problem is, so you can stop putting more effort into an
            approach that cannot give you the result you want.
          </p>
        </div>
      </MediaSection>

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
                Hi, I&rsquo;m Madison.
              </h2>
              <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
                I&rsquo;m a body transformation coach and former data scientist, so I care just as much about
                helping you understand why something works as I do about giving you something to follow.
              </p>
              <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px', textAlign: 'left' }}>
                I built Body Unmuted because I wanted to prove that women could build muscle, become stronger, and
                create extraordinary transformations while living the freedom-first lifestyles they worked so hard
                to create.
              </p>
              <p style={{ ...bodyP, color: '#45220d', textAlign: 'left' }}>
                I&rsquo;m building a business while living and traveling internationally too, so I&rsquo;m not
                teaching this from inside a perfectly controlled routine. I know what it looks like to work around
                flights, changing gyms, dinners out, busy work seasons, and weeks that look nothing alike, and still
                want a body that reflects the work you&rsquo;re putting in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO THIS WORKSHOP IS FOR ── */}
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
                You don&rsquo;t need another person telling you to care more or try harder.
              </p>
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#7f8b32', fontSize: 'clamp(19px, 2.2vw, 25px)' }}>
                You need to understand what your body actually requires, whether your current approach provides it,
                and how to make those pieces work inside the life you genuinely want to live.
              </p>
            </div>
          </div>
        </div>
      </MediaSection>

      {/* ── FINAL CTA ── */}
      <MediaSection
        backgroundSrc={img('brown-background.png')}
        id="workshop-final-cta"
        contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-center surface-light" style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <div className="w-full md:w-[38%] gold-frame">
              <Photo src={img('BO1A8336.jpg')} alt="Madison walking through a courtyard" aspect="0.85" position="38% 18%" />
            </div>
            <div className="w-full md:w-[62%]" style={{ textAlign: 'center' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#2d1506',
                  fontSize: 'clamp(26px, 3.4vw, 38px)',
                  lineHeight: '1.2',
                  fontWeight: 400,
                  marginBottom: '16px',
                }}
              >
                Walk In Wondering Why It Still Isn&rsquo;t Working.
              </h2>
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#7f8b32', fontSize: 'clamp(18px, 2vw, 22px)', marginBottom: '24px' }}>
                Leave knowing exactly what is missing and what your next strategy needs to do differently.
              </p>
              <p style={{ fontFamily: 'var(--font-ibm-plex-sans), sans-serif', fontWeight: 700, color: '#45220d', fontSize: '15px', marginBottom: '4px' }}>
                Founders, Your Fitness Plan Is F***d <em style={{ fontStyle: 'italic', color: '#ce965a' }}>(Respectfully.)</em>
              </p>
              <p style={{ ...eyebrow, color: '#525421', fontWeight: 700, marginBottom: '24px' }}>September 30 | Live Online</p>
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
