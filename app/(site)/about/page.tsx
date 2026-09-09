import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import MediaSection from '@/components/MediaSection';
import StickyChapter from '@/components/StickyChapter';

const img = (name: string) => `/Body%20Unmuted%20Brand%20Images/${name}`;

const Photo = ({
  src,
  alt,
  aspect = '3/2',
  className = '',
}: {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
}) => (
  <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
    <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
  </div>
);

const eyebrowItalic: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontStyle: 'italic',
  fontSize: 'clamp(14px, 1.6vw, 20px)',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const bodyP: React.CSSProperties = {
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontSize: 'clamp(15px, 1.7vw, 20px)',
  lineHeight: '1.6',
};

const questionVeil =
  'linear-gradient(90deg, rgba(45,21,6,0.9) 0%, rgba(45,21,6,0.72) 56%, rgba(45,21,6,0.26) 100%)';
const standardVeil =
  'linear-gradient(90deg, rgba(45,21,6,0.88) 0%, rgba(45,21,6,0.7) 55%, rgba(45,21,6,0.28) 100%)';

function TestimonialCard({ quote, body, name }: { quote: string; body: string; name: string }) {
  return (
    <div className="testimonial-card">
      <h3
        style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          color: '#fbf4e9',
          fontSize: 'clamp(20px, 2.2vw, 28px)',
          lineHeight: '1.15',
          fontWeight: 400,
          marginBottom: '16px',
        }}
      >
        &ldquo;{quote}&rdquo;
      </h3>
      <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: '15px', lineHeight: '1.6', marginBottom: '16px' }}>
        {body}
      </p>
      <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: '14px' }}>&mdash;{name}</p>
    </div>
  );
}

export default function About() {
  return (
    <>
      {/* ── Meet Madison — normal flow, not pinned: a sticky pin here forced the box to
          exactly one viewport, which was clipping the bottom of the portrait (her feet)
          the moment the box needed to be tall enough for a bigger photo. ── */}
      <div style={{ backgroundColor: '#fbf4e9', position: 'relative' }}>
        <div
          aria-hidden="true"
          style={{ position: 'absolute', top: 0, left: 0, width: '280px', maxWidth: '40vw', aspectRatio: '1/1', opacity: 0.1, pointerEvents: 'none' }}
        >
          <Image src={img('light-background.png')} alt="" fill sizes="280px" style={{ objectFit: 'cover', objectPosition: 'top left' }} />
        </div>

        <div style={{ position: 'relative', padding: 'clamp(48px, 8vw, 96px) 20px clamp(64px, 10vw, 120px)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 4vw, 44px)' }}>
              <h1
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#7f8b32',
                  fontSize: 'clamp(56px, 13vw, 170px)',
                  lineHeight: '0.85',
                  fontWeight: 400,
                }}
              >
                Meet Madison
              </h1>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="hidden md:block md:w-[26%] text-right">
                <p className="identity-label">
                  Founder
                  <br />
                  Fitness coach
                  <br />
                  Ex-data scientist
                </p>
              </div>

              <div className="w-full md:w-[34%] max-w-[420px] mx-auto gold-offset-line">
                <Photo src={img('BO1A8475.jpg')} alt="Madison laughing while opening her blazer" aspect="0.72" />
              </div>

              <div className="hidden md:block md:w-[26%] text-left">
                <p className="identity-label">
                  Ex-cheese monger
                  <br />
                  Wine enthusiast
                  <br />
                  World traveler
                </p>
              </div>
            </div>

            <div className="md:hidden flex justify-between mt-6 px-4">
              <p className="identity-label" style={{ fontSize: '0.62rem' }}>
                Founder
                <br />
                Fitness coach
                <br />
                Ex-data scientist
              </p>
              <p className="identity-label" style={{ fontSize: '0.62rem', textAlign: 'right' }}>
                Ex-cheese monger
                <br />
                Wine enthusiast
                <br />
                World traveler
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Opening story + "the pursuit had become another cage" — one combined
          cocoa pattern chapter (dark). Both beats sit inside the same opaque cream
          reading card, kept off the busy plaster texture. ── */}
      <MediaSection backgroundSrc={img('brown-background.png')} contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div className="problem-copy-surface" style={{ maxWidth: '740px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-domine-serif), serif', color: '#2d1506', fontSize: 'clamp(21px, 2.6vw, 28px)', lineHeight: '1.6', fontWeight: 500, marginBottom: '28px' }}>
            For a long time, I got results by becoming very good at pushing past my body.
          </p>
          <p style={{ ...bodyP, color: '#45220d', lineHeight: '1.75', marginBottom: '28px' }}>
            I was hard on myself. I followed the rules. I treated hunger, exhaustion, and anything else my body
            tried to communicate as something to control, manage, or overcome.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#ce965a',
              fontSize: 'clamp(20px, 2.3vw, 26px)',
              marginBottom: '28px',
            }}
          >
            And, honestly, some of it worked.
          </p>
          <p style={{ ...bodyP, color: '#45220d', lineHeight: '1.75', marginBottom: '32px' }}>
            <strong style={{ fontWeight: 700, color: '#2d1506' }}>I changed my body. I built discipline.</strong>{' '}
            From the outside, it probably looked like proof that this was exactly how transformation was supposed to
            happen.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#45220d',
              fontSize: 'clamp(18px, 2vw, 24px)',
              lineHeight: '1.4',
              fontWeight: 400,
            }}
          >
            But the pursuit had become another cage. One made of rules, pressure, and the quiet belief that my body
            would only give me what I wanted if I was hard enough on her.
          </p>
        </div>
      </MediaSection>

      {/* ── "At the same time, I was trying to build a life around freedom." — plain
          cream chapter with a gold-framed inset photo (not a photo background). ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-14 items-start">
            <div className="w-full md:w-[52%]">
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#ce965a',
                  fontSize: 'clamp(26px, 3.2vw, 40px)',
                  lineHeight: '1.15',
                  fontWeight: 400,
                  marginBottom: '24px',
                }}
              >
                At the same time, I was trying to build a life around freedom.
              </h2>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px' }}>
                I wanted to travel, build a business, follow opportunities, and be fully present for the experiences
                I had worked so hard to create.
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '16px' }}>
                But the version of fitness I knew required predictability, control, and a life organized around
                maintaining it.
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '4px' }}>
                I didn&apos;t just need a workout plan that could travel.
              </p>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '24px' }}>
                I needed a different relationship with the body doing the traveling.
              </p>
              <p style={{ ...eyebrowItalic, color: '#ce965a', fontWeight: 500 }}>
                And that brought me to a question I wasn&apos;t entirely sure I could answer&hellip;
              </p>
            </div>
            <div className="w-full md:w-[42%] gold-frame">
              <Photo src={img('madison-31.jpg')} alt="Madison outdoors in the mountains, arms raised to the sky" aspect="0.8" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY CHAPTER 2: central question pinned, proof chapter slides over it ── */}
      <StickyChapter
        scene={
          <MediaSection
            backgroundSrc={img('BO1A8389.jpg')}
            objectPosition="50% 4%"
            veil={questionVeil}
            className="sticky-scene flex items-center"
            contentClassName="w-full"
            contentStyle={{ padding: 'clamp(32px, 6vw, 64px) 20px' }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2
                style={{
                  maxWidth: '620px',
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#fbf4e9',
                  fontSize: 'clamp(24px, 3.6vw, 44px)',
                  lineHeight: '1.3',
                  fontWeight: 400,
                  textAlign: 'left',
                }}
              >
                Could I help women build muscle, become stronger, and truly transform their bodies without asking
                them to override, distrust, or punish them&mdash;or make their lives smaller in pursuit of the
                results?
              </h2>
            </div>
          </MediaSection>
        }
        surface={
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 80px' }}>
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-full md:w-[35%] flex-shrink-0 gold-frame">
                <Photo src={img('madison_wine_stellenbosch.jpg')} alt="Madison drinking wine in a garden at golden hour" aspect="0.7" />
              </div>
              <div className="w-full md:w-[65%]">
                <h2
                  style={{
                    fontFamily: 'var(--font-instrument-serif), serif',
                    color: '#7f8b32',
                    fontSize: 'clamp(26px, 3.2vw, 40px)',
                    lineHeight: '1.15',
                    fontWeight: 400,
                    marginBottom: '24px',
                  }}
                >
                  Part of me was afraid the answer might be no.
                </h2>
                <p style={{ ...bodyP, color: '#2d1506', marginBottom: '28px' }}>
                  Maybe I could only take a kinder approach because I had already done so much of the work the hard
                  way. Maybe understanding and flexibility were things you earned after the transformation&mdash;not
                  things that could help create it.
                </p>
                <p style={{ ...eyebrowItalic, color: '#7f8b32', fontStyle: 'normal', fontWeight: 500, marginBottom: '8px' }}>
                  So Body Unmuted became more than a coaching philosophy.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-instrument-serif), serif',
                    fontStyle: 'italic',
                    color: '#ce965a',
                    fontSize: 'clamp(22px, 2.6vw, 32px)',
                    lineHeight: '1.3',
                    margin: '16px 0 24px',
                  }}
                >
                  It became the thing I wanted to prove over and over again.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-instrument-serif), serif',
                    fontStyle: 'italic',
                    color: '#45220d',
                    fontSize: 'clamp(17px, 1.9vw, 22px)',
                    lineHeight: '1.5',
                    borderLeft: '3px solid #e8eeba',
                    paddingLeft: '20px',
                  }}
                >
                  That women CAN achieve incredible physical results from a place of knowledge, support, kindness,
                  and a much deeper relationship with their bodies.
                </p>
              </div>
            </div>
          </div>
        }
      />

      {/* ── "Because kindness does not mean lowering the standard" — immersive pool chapter ── */}
      <MediaSection
        backgroundSrc={img('BO1A8972.jpg')}
        objectPosition="50% 72%"
        veil={standardVeil}
        contentStyle={{ padding: 'clamp(80px, 12vw, 140px) 20px' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ maxWidth: '620px' }}>
            <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: 'clamp(19px, 2.4vw, 30px)', lineHeight: '1.4', fontWeight: 600, marginBottom: '20px' }}>
              Because kindness does not mean lowering the standard.
            </p>
            <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: 'clamp(19px, 2.4vw, 30px)', lineHeight: '1.4', fontWeight: 600, marginBottom: '20px' }}>
              Listening to your body does not mean doing whatever feels easiest.
            </p>
            <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: 'clamp(19px, 2.4vw, 30px)', lineHeight: '1.4', fontWeight: 600, marginBottom: '32px' }}>
              And creating freedom does not mean abandoning structure.
            </p>
            <p style={{ ...eyebrowItalic, color: '#e8eeba', textTransform: 'none' }}>
              It means understanding your body well enough to give her what she needs, building systems that can
              adapt as your life changes, and pursuing your goals in a way that allows you to keep living while you
              reach them.
            </p>
          </div>
        </div>
      </MediaSection>

      {/* ── "Your body stops feeling like an unpredictable problem..." — plain cream
          chapter with a gold-framed inset photo (not a photo background). ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-[62%]">
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#ce965a',
                  fontSize: 'clamp(24px, 2.8vw, 36px)',
                  lineHeight: '1.2',
                  fontWeight: 400,
                  marginBottom: '28px',
                }}
              >
                Your body stops feeling like an unpredictable problem you have to manage and becomes something you
                know how to care for, challenge, and trust.
              </h2>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '4px' }}>She:</p>
              <ul className="body-support-list" style={{ ...bodyP, color: '#2d1506' }}>
                <li>supports you while you build the business.</li>
                <li>carries you onto every plane and into every room.</li>
                <li>gets to be fully present for every part of the freedom you worked so hard to create.</li>
              </ul>
              <p style={{ ...bodyP, color: '#2d1506', marginTop: '28px' }}>
                Because I don&apos;t only want women to build bodies that look incredible.
              </p>
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#7f8b32', fontSize: 'clamp(22px, 2.6vw, 32px)', lineHeight: '1.3', marginTop: '14px' }}>
                I want them to build bodies that feel really fucking good to live in.
              </p>
            </div>
            <div className="w-full md:w-[38%] gold-frame">
              <Photo src={img('BO1A9394.jpg')} alt="Madison in an olive dress leaning against a carved wood door" aspect="0.7" />
            </div>
          </div>
        </div>
      </section>

      {/* ── The Freedom Method — dark cocoa pattern chapter (reusing brown-background.png;
          non-adjacent to the opening story's use of it, so no two pattern assets ever
          touch). Principle cards stay opaque cream on top for readability. ── */}
      <MediaSection backgroundSrc={img('brown-background.png')} contentStyle={{ padding: 'clamp(80px, 10vw, 120px) 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ ...eyebrowItalic, color: '#ce965a', marginBottom: '16px' }}>my philosophy: The Freedom Method</p>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#fbf4e9',
              fontSize: 'clamp(26px, 3.4vw, 42px)',
              lineHeight: '1.2',
              fontWeight: 400,
              marginBottom: '20px',
            }}
          >
            The Freedom Method is my approach to helping women transform their bodies without letting fitness make
            their lives smaller.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#e8eeba',
              fontSize: 'clamp(20px, 2.6vw, 32px)',
            }}
          >
            It exists to give you a bigger life.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="w-full md:w-1/3 method-principle">
            <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#ce965a', fontSize: '15px', letterSpacing: '0.08em', marginBottom: '8px' }}>
              01
            </p>
            <h3 style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#2d1506', fontSize: '26px', marginBottom: '12px' }}>
              understand your body
            </h3>
            <p style={{ ...bodyP, color: '#45220d', fontSize: '16px' }}>
              means replacing guesswork with body literacy. You learn to recognize your body&rsquo;s signals,
              understand your numbers, and see how it responds&mdash;so you can make informed decisions instead of
              depending on another plan or expert to tell you what to do.
            </p>
          </div>
          <div className="w-full md:w-1/3 method-principle">
            <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#ce965a', fontSize: '15px', letterSpacing: '0.08em', marginBottom: '8px' }}>
              02
            </p>
            <h3 style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#2d1506', fontSize: '26px', marginBottom: '12px' }}>
              think differently
            </h3>
            <p style={{ ...bodyP, color: '#45220d', fontSize: '16px' }}>
              means looking beyond the physical result to what you want that result to give you. Building muscle,
              becoming leaner, and getting stronger matter&mdash;but the ultimate goal is greater confidence, energy,
              and capacity inside your life.
            </p>
          </div>
          <div className="w-full md:w-1/3 method-principle">
            <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#ce965a', fontSize: '15px', letterSpacing: '0.08em', marginBottom: '8px' }}>
              03
            </p>
            <h3 style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#2d1506', fontSize: '26px', marginBottom: '12px' }}>
              Live Bigger
            </h3>
            <p style={{ ...bodyP, color: '#45220d', fontSize: '16px' }}>
              means using that strength and understanding to experience more of your life. You can adapt when your
              schedule, location, or circumstances change without feeling as though you have to start over.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '64px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#e8eeba',
              fontSize: 'clamp(22px, 2.8vw, 34px)',
              lineHeight: '1.35',
            }}
          >
            The point of fitness isn&rsquo;t just to give you a smaller waist. Changing the way you experience your
            life is the point.
          </p>
        </div>
      </MediaSection>

      {/* ── Origin story — solid tan (light), no pattern. Sits between the Freedom
          Method's cocoa pattern and the testimonials' olive pattern, keeping the two
          pattern assets from ever touching. ── */}
      <section style={{ backgroundColor: '#efdfc3', padding: 'clamp(72px, 10vw, 112px) 20px' }}>
        <div className="origin-story-surface">
          <p style={{ ...eyebrowItalic, color: '#ce965a', textTransform: 'none', marginBottom: '32px' }}>
            I always get asked how I got into fitness, so here&apos;s that story&hellip;
          </p>
          <p style={{ ...bodyP, color: '#2d1506', marginBottom: '20px' }}>
            I definitely wasn&rsquo;t the sporty or fitness-obsessed girl growing up. I was quiet, a little socially
            awkward, very much a nerd, and just wanted to be left in peace to eat my salt and vinegar chips. But
            eventually, I reached a point where I just didn&rsquo;t feel confident in my body anymore. I tried what
            felt like every random workout and &ldquo;healthy&rdquo; approach under the sun, only to get
            approximately nowhere.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#7f8b32',
              fontSize: 'clamp(19px, 2.1vw, 25px)',
              lineHeight: '1.5',
              marginTop: '40px',
              marginBottom: '20px',
            }}
          >
            I didn&apos;t feel like guessing anymore and wanted someone to just show me what works.
          </p>
          <p style={{ ...bodyP, color: '#2d1506', marginBottom: '20px' }}>
            So I hired a WBFF fitness athlete as my coach, and she taught me the real principles of body-composition
            change, and what a freakin light bulb moment.
          </p>
          <p style={{ ...bodyP, color: '#2d1506', marginBottom: '20px' }}>
            The results changed so much more than my body. My confidence skyrocketed, I felt strong and capable, and
            I finally understood how to create results without constantly guessing.
          </p>
          <p style={{ ...bodyP, color: '#2d1506', marginTop: '40px', marginBottom: '20px' }}>
            The transformation was so powerful that I wanted other women to experience it too, so I earned my NASM
            certification and became a coach. Turns out, the quiet nerdy girl didn&rsquo;t disappear, she just became
            a fitness nerd.
          </p>
          <p style={{ ...bodyP, color: '#7f8b32', fontStyle: 'italic', marginTop: '32px' }}>
            These are still the same principles that form the foundation of how I coach transformations today.
          </p>
        </div>
      </section>

      {/* ── Testimonials — olive botanical signature chapter ── */}
      <MediaSection
        backgroundSrc={img('dark-green-background.png')}
        veil="linear-gradient(180deg, rgba(45,21,6,0.28) 0%, rgba(45,21,6,0.46) 100%)"
        contentStyle={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#efdfc3',
              fontSize: 'clamp(30px, 4.6vw, 56px)',
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
              quote="I feel better at 36 than I did at 26."
              body="Working with Madison has genuinely changed my life. Over the last year I've lost 20 pounds, built real strength, and found a confidence I didn't know I was missing. She doesn't just give you workouts. She helped me completely overhaul my nutrition and actually understand what my body needs. I feel better at 36 than I did at 26. I didn't think that was possible."
              name="Liz"
            />
            <TestimonialCard
              quote="She'll not only change your body. She'll change your life."
              body="I was traveling through seven countries in three months, losing muscle, losing confidence, and it was starting to affect my business and my speaking events. Madison reminded me I could still enjoy life, still travel, and still feel strong, confident, and sexy while actually being in a routine. She helped me move past so many mindset blocks around consistency. Now I eat high protein foods I actually love and do personalised workouts that work. I feel in such amazing shape, and it's had a huge ripple effect on everything. If you're even thinking about it, take the dive. She'll not only change your body. She'll change your life."
              name="Ashleigh"
            />
            <TestimonialCard
              quote="I finally understand what I'm supposed to be doing."
              body="Madison was the first person who ever got me genuinely excited about fitness. She explains nutrition in a way that actually makes sense and feels doable in real life. She's a trainer who's also a foodie, so she won't just tell you to diet. She understands that we're human, and especially as women, we're not operating at 100% all the time. Instead of the all-or-nothing cycle, she helps you stay consistent and keep moving forward. I've tried getting into the gym so many times and always fell off because I didn't know what I was doing. Madison gave me the foundation I was missing. I finally understand what I'm supposed to be doing and what a good workout should actually FEEL like, not just look like. I honestly can't recommend her enough."
              name="Sierra"
            />
            <TestimonialCard
              quote="I'm already getting stronger."
              body="Training with Madison has been really eye opening. I thought I was training to failure before, but she helped me realize I could do so much more. The support is great and I'm already getting stronger. She's also really customizing everything for me and the way my body moves which has been super helpful as I grow my confidence in the gym."
              name="Ali"
            />
          </div>
        </div>
      </MediaSection>

      {/* ── "What Body Unmuted means" — normal flow, not pinned: this closing
          chapter's copy is too long to safely fit one viewport while pinned
          (verified: it overflows the sticky box on common laptop window
          heights, which would hide content the same way the homepage's
          "And yet" chapter did before that was de-stickied). ── */}
      <section
        style={{
          background:
            'linear-gradient(90deg, rgba(251,244,233,0.96) 0%, rgba(251,244,233,0.88) 50%, rgba(82,84,33,0.58) 100%)',
        }}
      >
            <div style={{ padding: 'clamp(72px, 10vw, 112px) 20px' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <p style={{ ...eyebrowItalic, color: '#2d1506', marginBottom: '12px' }}>what body unmuted means?</p>
                <h2
                  style={{
                    fontFamily: 'var(--font-instrument-serif), serif',
                    fontStyle: 'italic',
                    color: '#525421',
                    fontSize: 'clamp(22px, 2.8vw, 34px)',
                    lineHeight: '1.2',
                    fontWeight: 400,
                    marginBottom: '24px',
                    maxWidth: '700px',
                  }}
                >
                  We&rsquo;re taught to treat our bodies like inconveniences&hellip;
                </h2>

                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="w-full md:w-[30%] flex-shrink-0 gold-frame">
                    <Photo src={img('Madison-114.jpg')} alt="Madison with arm raised on a coastal cliff" aspect="0.75" />
                  </div>

                  <div className="w-full md:w-[70%]">
                    <p style={{ ...bodyP, color: '#2d1506', marginBottom: '14px' }}>
                      Problems to solve. Things to control and manage. Something to ignore so we can keep working,
                      traveling, building, and pushing forward.
                    </p>
                    <p style={{ ...bodyP, color: '#2d1506', marginBottom: '14px' }}>
                      But eventually, that disconnection catches up with us. Burnout. Exhaustion. Low energy. Fading
                      confidence. A relationship with our body that makes it feel like she&rsquo;s working against
                      us.
                    </p>
                    <p style={{ ...bodyP, color: '#45220d', fontStyle: 'italic', marginBottom: '10px' }}>
                      But your body isn&rsquo;t in the way of the life you&rsquo;re building.
                    </p>
                    <p style={{ ...bodyP, color: '#45220d', fontStyle: 'italic', marginBottom: '14px' }}>
                      She&rsquo;s the one helping you build it and the one experiencing everything your freedom makes
                      possible.
                    </p>
                    <p style={{ ...bodyP, color: '#2d1506', marginBottom: '18px' }}>
                      Body Unmuted is about learning to listen to her, understand her, care for her, and{' '}
                      <em>unmute her</em> so you can move through your life with more energy, confidence, and
                      capacity.
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-instrument-serif), serif',
                        fontStyle: 'italic',
                        color: '#525421',
                        fontSize: 'clamp(19px, 2.2vw, 26px)',
                        lineHeight: '1.4',
                        marginBottom: '10px',
                      }}
                    >
                      Your body isn&rsquo;t something to overcome.
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-instrument-serif), serif',
                        fontStyle: 'italic',
                        color: '#2d1506',
                        fontSize: 'clamp(22px, 2.8vw, 34px)',
                        lineHeight: '1.3',
                      }}
                    >
                      She&apos;s how you get to experience it all.
                    </p>
                    <div style={{ marginTop: '28px' }}>
                      <Link href="/contact" className="btn-primary">
                        learn more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </section>

      <Footer />
    </>
  );
}
