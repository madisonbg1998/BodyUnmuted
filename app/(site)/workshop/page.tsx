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
      Free &middot; Live Online
    </p>
  );
}

function ArrowCircleItem({ children, color = '#45220d' }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', marginBottom: '22px' }}>
      <span
        style={{
          flexShrink: 0,
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: '1.5px solid #ce965a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '15px',
          color: '#ce965a',
        }}
        aria-hidden="true"
      >
        &rarr;
      </span>
      <p style={{ ...bodyP, color, textAlign: 'left', paddingTop: '5px' }}>{children}</p>
    </div>
  );
}

/** Small gold diamond marker — echoes the diamond flourishes already in
 * light-background.png, and reads as "does this sound like you" rather than
 * a completed checklist item. */
function MarkerItem({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '18px' }}>
      <span style={{ flexShrink: 0, color: '#ce965a', fontSize: '12px', marginTop: '7px' }} aria-hidden="true">
        &#9670;
      </span>
      <p style={{ ...bodyP, color: '#2d1506', textAlign: 'left' }}>{children}</p>
    </div>
  );
}

const figureOutItems = [
  'whether your training is actually structured to change your body',
  'whether your nutrition supports the result you want',
  'where you’re putting in effort without getting much back',
  'what genuinely needs to stay consistent',
  'where you have more flexibility than you think',
  'what I would prioritize next if this were my body and my goal',
];

const forYouIf = [
  'You’re already working out but expected your body to look different by now.',
  'You want to build muscle, get stronger, get leaner, or create more shape and definition.',
  'You know the basics but aren’t confident that what you’re doing is actually enough.',
  'Your routine works when life is predictable and disappears when it isn’t.',
  'You travel, eat out, attend events, have busy work seasons, or regularly train in different gyms.',
  'You’re tired of stopping, restarting, and wondering whether you just need to try harder.',
  'Or you want your fitness to support your life rather than slowly become the center of it.',
];

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
                    Free Live Workshop for Female Founders
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
                  <p style={{ ...bodyP, color: '#45220d', marginBottom: '20px', textAlign: 'left' }}>
                    A one-day workshop to figure out why your body isn&rsquo;t changing, what&rsquo;s missing from
                    your training and nutrition, and how to make your fitness actually work inside the life and
                    business you built.
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
                  fontSize: 'clamp(25px, 3.2vw, 38px)',
                  lineHeight: '1.3',
                  fontWeight: 400,
                  marginBottom: '24px',
                  textAlign: 'left',
                }}
              >
                Women are constantly told to try harder. For female founders, that is rarely the f*cking problem.
              </h2>
              <p style={{ ...bodyP, color: '#2d1506', fontWeight: 600, marginBottom: '18px', textAlign: 'left' }}>
                You already know how to work hard. You built a business.
              </p>
              <p style={{ ...bodyP, color: '#45220d', fontSize: '16px', marginBottom: '20px', textAlign: 'left' }}>
                And as it grows, you&rsquo;re becoming more visible too: filming content, going on podcasts,
                traveling to conferences, networking over dinners, getting photographed, speaking on panels and
                walking onto stages.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontStyle: 'italic',
                  color: '#ce965a',
                  fontSize: 'clamp(19px, 2.2vw, 24px)',
                  lineHeight: '1.4',
                  marginBottom: '20px',
                  textAlign: 'left',
                }}
              >
                So when fitness still isn&rsquo;t giving you the result you want, &ldquo;you just need to be more
                disciplined&rdquo; is not a particularly useful answer.
              </p>
              <p style={{ ...bodyP, color: '#45220d', textAlign: 'left' }}>
                You know you need to workout, get your steps, and eat more protein. But your execution isn&rsquo;t
                producing the results you want, and your life wasn&rsquo;t built to execute the same way someone
                with a 9-5 and predictable days does.
              </p>
            </div>
          </MediaSection>
        }
      />

      {/* ── SO HOW DO YOU ACTUALLY CREATE A BODY... ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(25px, 3.2vw, 38px)',
              lineHeight: '1.3',
              fontWeight: 400,
              marginBottom: '20px',
              textAlign: 'left',
            }}
          >
            So how do you actually create a body that you feel confident as hell to show up in that also works with
            the life you live?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#7f8b32',
              fontSize: 'clamp(18px, 2vw, 22px)',
              marginBottom: '32px',
              textAlign: 'left',
            }}
          >
            That&rsquo;s the question we&rsquo;re actually going to answer.
          </p>
          <ArrowCircleItem>Is your training actually capable of building the muscle and shape you want?</ArrowCircleItem>
          <ArrowCircleItem>Does the way you&rsquo;re eating support that?</ArrowCircleItem>
          <ArrowCircleItem>Are the hours you&rsquo;re spending in the gym actually earning you a return?</ArrowCircleItem>
          <ArrowCircleItem>
            And can the whole thing survive a week with a flight, a conference, three dinners out, a podcast
            recording, and a launch happening at the same time?
          </ArrowCircleItem>
          <p style={{ ...bodyP, color: '#2d1506', fontWeight: 600, marginTop: '24px', marginBottom: '28px', textAlign: 'left' }}>
            Because for women like you, the problem isn&rsquo;t a lack of ambition and discipline.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#ce965a',
              fontSize: 'clamp(20px, 2.4vw, 27px)',
              lineHeight: '1.35',
              textAlign: 'left',
            }}
          >
            Your fitness plan just needs to be good enough for the life you&rsquo;re asking it to work inside.
          </p>
        </div>
      </section>

      {/* ── WE'RE LOOKING AT YOUR FITNESS PLAN ── */}
      <MediaSection backgroundSrc={img('dark-green-background.png')} veil="rgba(45,21,6,0.2)" contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div className="surface-dark" style={{ maxWidth: '700px', margin: '0 auto', padding: 'clamp(2.5rem, 6vw, 4rem)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#fbf4e9',
              fontSize: 'clamp(26px, 3.4vw, 40px)',
              lineHeight: '1.25',
              fontWeight: 400,
              marginBottom: '28px',
              textAlign: 'left',
            }}
          >
            We&rsquo;re looking at your fitness plan, not handing you another generic one.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#c8d199',
              fontSize: 'clamp(19px, 2.2vw, 24px)',
              marginBottom: '20px',
              textAlign: 'left',
            }}
          >
            This is a working session.
          </p>
          <p style={{ ...bodyP, color: '#e8eeba', fontSize: '16px', marginBottom: '24px', textAlign: 'left' }}>
            We&rsquo;ll run custom audits on your current training, nutrition, goals, schedule, and the places your
            routine usually breaks down, with feedback to help you see what&rsquo;s working, what&rsquo;s missing,
            and what I would change first.
          </p>
          <p style={{ ...bodyP, color: '#fbf4e9', fontWeight: 700, marginBottom: '14px', textAlign: 'left' }}>
            I&rsquo;ll help you figure out:
          </p>
          <ul style={{ ...bodyP, color: '#e8eeba', fontSize: '16px', paddingLeft: '22px', listStyleType: 'disc', marginBottom: '32px', textAlign: 'left' }}>
            {figureOutItems.map((item) => (
              <li key={item} style={{ marginBottom: '10px' }}>
                {item}
              </li>
            ))}
          </ul>
          <div style={{ borderTop: '1px solid rgba(232,238,186,0.3)', paddingTop: '28px', marginBottom: '28px' }}>
            <p
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: '#fbf4e9',
                fontSize: 'clamp(20px, 2.4vw, 27px)',
                lineHeight: '1.3',
                marginBottom: '10px',
                textAlign: 'left',
              }}
            >
              You&rsquo;ll leave knowing what actually needs to change.
            </p>
            <p style={{ ...bodyP, color: '#e8eeba', fontSize: '15px', textAlign: 'left' }}>
              Not with another list of fitness rules to add to your life.
            </p>
          </div>
          <LumaBtn bg="#fbf4e9" color="#2d1506">
            Save My Free Spot
          </LumaBtn>
        </div>
      </MediaSection>

      {/* ── WHO THIS IS FOR ── */}
      <MediaSection backgroundSrc={img('light-background.png')} veil="rgba(251,244,233,0.85)" contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="surface-light" style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: '#2d1506',
                fontSize: 'clamp(25px, 3.2vw, 38px)',
                lineHeight: '1.3',
                fontWeight: 400,
                textAlign: 'center',
                marginBottom: '40px',
              }}
            >
              This is for you if you can&rsquo;t get a routine to stick or the routine you have isn&rsquo;t changing
              your body.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-2">
              {forYouIf.map((f) => (
                <MarkerItem key={f}>{f}</MarkerItem>
              ))}
            </div>
          </div>
        </div>
      </MediaSection>

      {/* ── MEET MADISON ── */}
      <section style={{ backgroundColor: '#efdfc3', padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-14 items-center">
            <div className="w-full md:w-[42%] md:order-2 gold-frame">
              <Photo src={img('Madison-114.jpg')} alt="Madison with arm raised on a coastal cliff" aspect="0.9" position="50% 52%" />
            </div>
            <div className="w-full md:w-[58%] md:order-1">
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
                Former data scientist, former cheesemonger, now fitness coach for female founders. Apparently I just
                keep turning the things I get extremely nerdy about into careers.
              </p>
              <p style={{ ...bodyP, color: '#45220d', textAlign: 'left' }}>
                These days, that means helping women build strong, incredible-looking bodies that actually work with
                the big lives they&rsquo;re building.
              </p>
            </div>
          </div>
        </div>
      </section>

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
                  fontSize: 'clamp(25px, 3.2vw, 36px)',
                  lineHeight: '1.25',
                  fontWeight: 400,
                  marginBottom: '24px',
                }}
              >
                Build a fitness plan that can actually keep up with you.
              </h2>
              <p style={{ fontFamily: 'var(--font-ibm-plex-sans), sans-serif', fontWeight: 700, color: '#45220d', fontSize: '15px', marginBottom: '4px' }}>
                Founders, Your Fitness Plan Is F***d <em style={{ fontStyle: 'italic', color: '#ce965a' }}>(Respectfully.)</em>
              </p>
              <p style={{ ...eyebrow, color: '#525421', fontWeight: 700, marginBottom: '20px' }}>September 30 | Live Online</p>
              <p style={{ ...bodyP, color: '#45220d', fontSize: '15px', marginBottom: '24px' }}>
                Bring the approach you have now. We&rsquo;ll figure out what needs to change, and how to make it
                support your life and your business. Because you aren&rsquo;t crazy or &lsquo;undisciplined&rsquo;.
                You&rsquo;re just f*cking busy.
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
