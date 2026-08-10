import Link from 'next/link';
import Image from 'next/image';

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

const BgPhoto = ({ src, alt, overlay }: { src: string; alt: string; overlay: string }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit: 'cover' }} />
    <div style={{ position: 'absolute', inset: 0, background: overlay }} />
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
  lineHeight: '1.5',
};

function TestimonialCard({ quote, body, name }: { quote: string; body: string; name: string }) {
  return (
    <div style={{ backgroundColor: 'rgba(82,84,33,0.55)', borderRadius: '4px', padding: '32px' }}>
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
      <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: '15px', lineHeight: '1.5', marginBottom: '16px' }}>
        {body}
      </p>
      <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: '14px' }}>&mdash;{name}</p>
    </div>
  );
}

export default function About() {
  return (
    <>
      {/* ── HERO — Meet Madison ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '60px 20px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', overflow: 'hidden', marginBottom: '32px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: '#7f8b32',
                fontSize: 'clamp(60px, 14.5vw, 180px)',
                lineHeight: '0.85',
                fontWeight: 400,
              }}
            >
              Meet Madison
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
            <div className="hidden md:block md:w-[20%] text-right">
              <p className="subheading" style={{ color: '#45220d', fontSize: '14px', lineHeight: '2.2' }}>
                founder
                <br />
                fitness coach
                <br />
                ex-data scientist
              </p>
            </div>

            <div className="w-full md:w-[36%] max-w-[400px] mx-auto">
              <Photo src={img('BO1A8475.jpg')} alt="Madison laughing while opening her blazer" aspect="0.72" />
            </div>

            <div className="hidden md:block md:w-[20%] text-left">
              <p className="subheading" style={{ color: '#45220d', fontSize: '14px', lineHeight: '2.2' }}>
                ex-cheese monger
                <br />
                wine enthusiast
                <br />
                world traveler
              </p>
            </div>
          </div>

          <div className="md:hidden flex justify-between mb-8 px-4">
            <p className="subheading" style={{ color: '#45220d', fontSize: '11px', lineHeight: '1.8' }}>
              founder<br />fitness coach<br />ex-data scientist
            </p>
            <p className="subheading" style={{ color: '#45220d', fontSize: '11px', lineHeight: '1.8', textAlign: 'right' }}>
              ex-cheese monger<br />wine enthusiast<br />world traveler
            </p>
          </div>

          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px' }}>
              For a long time, I got results by becoming very good at pushing past my body.
            </p>
            <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px' }}>
              I was hard on myself. I followed the rules. I treated hunger, exhaustion, and anything else my body
              tried to communicate as something to control, manage, or overcome.
            </p>
            <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px' }}>And, honestly, some of it worked.</p>
            <p style={{ ...bodyP, color: '#45220d' }}>
              I changed my body. I built discipline. From the outside, it probably looked like proof that this was
              exactly how transformation was supposed to happen.
            </p>
          </div>
        </div>
      </section>

      {/* ── "The pursuit had become another cage..." ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '0 20px 60px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ ...eyebrowItalic, color: '#7f8b32', fontSize: 'clamp(16px, 1.9vw, 24px)', fontWeight: 500, lineHeight: '1.4' }}>
            The pursuit had become another cage. One made of rules, pressure, and the quiet belief that my body would
            only give me what I wanted if I was hard enough on her.
          </p>
        </div>
      </section>

      {/* ── "At the same time, I was trying to build a life around freedom." ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '20px 20px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-[55%]">
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
            <div className="w-full md:w-[45%]">
              <Photo src={img('madison-31.jpg')} alt="Madison outdoors in the mountains, arms raised to the sky" aspect="0.75" />
            </div>
          </div>
        </div>
      </section>

      {/* ── dark quote: "Could I help women..." ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '100px 20px' }} className="min-h-[380px] flex items-center">
        <BgPhoto src={img('BO1A8389.jpg')} alt="Balcony architecture, softly lit" overlay="rgba(45,21,6,0.8)" />
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#fbf4e9',
              fontSize: 'clamp(24px, 3.4vw, 42px)',
              lineHeight: '1.25',
              fontWeight: 400,
            }}
          >
            Could I help women build muscle, become stronger, and truly transform their bodies without asking them
            to override, distrust, or punish them&mdash;or make their lives smaller in pursuit of the results?
          </h2>
        </div>
      </section>

      {/* ── "Part of me was afraid the answer might be no." ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-[35%] flex-shrink-0">
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
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '24px' }}>
                Maybe I could only take a kinder approach because I had already done so much of the work the hard
                way. Maybe understanding and flexibility were things you earned after the transformation&mdash;not
                things that could help create it.
              </p>
              <p style={{ ...eyebrowItalic, color: '#7f8b32', fontWeight: 500, marginBottom: '12px' }}>
                So Body Unmuted became more than a coaching philosophy.
              </p>
              <p style={{ ...eyebrowItalic, color: '#7f8b32', fontWeight: 500, marginBottom: '12px' }}>
                It became the thing I wanted to prove over and over again:
              </p>
              <p style={{ ...eyebrowItalic, color: '#7f8b32', fontWeight: 500 }}>
                That women CAN achieve incredible physical results from a place of knowledge, support, kindness, and
                a much deeper relationship with their bodies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── dark: kindness does not mean lowering the standard ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '100px 20px' }} className="min-h-[420px] flex items-center">
        <BgPhoto src={img('BO1A8972.jpg')} alt="Aerial view of a Moroccan tiled pool" overlay="rgba(45,21,6,0.72)" />
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: 'clamp(18px, 2.4vw, 30px)', lineHeight: '1.4', fontWeight: 600, marginBottom: '20px' }}>
            Because kindness does not mean lowering the standard.
          </p>
          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: 'clamp(18px, 2.4vw, 30px)', lineHeight: '1.4', fontWeight: 600, marginBottom: '20px' }}>
            Listening to your body does not mean doing whatever feels easiest.
          </p>
          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: 'clamp(18px, 2.4vw, 30px)', lineHeight: '1.4', fontWeight: 600, marginBottom: '32px' }}>
            And creating freedom does not mean abandoning structure.
          </p>
          <p style={{ ...eyebrowItalic, color: '#e8eeba', fontSize: 'clamp(15px, 1.9vw, 22px)', textTransform: 'none' }}>
            It means understanding your body well enough to give her what she needs, building systems that can adapt
            as your life changes, and pursuing your goals in a way that allows you to keep living while you reach
            them.
          </p>
        </div>
      </section>

      {/* ── "Your body stops feeling like an unpredictable problem..." ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '80px 20px' }}>
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
                  marginBottom: '24px',
                }}
              >
                Your body stops feeling like an unpredictable problem you have to manage and becomes something you
                know how to care for, challenge, and trust.
              </h2>
              <p style={{ ...bodyP, color: '#2d1506', marginBottom: '8px' }}>She:</p>
              <ul style={{ ...bodyP, color: '#2d1506', paddingLeft: '22px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px' }}>supports you while you build the business.</li>
                <li style={{ marginBottom: '10px' }}>carries you onto every plane and into every room.</li>
                <li>gets to be fully present for every part of the freedom you worked so hard to create.</li>
              </ul>
              <p style={{ ...bodyP, color: '#2d1506', marginTop: '24px' }}>
                Because I don&apos;t only want women to build bodies that look incredible.
              </p>
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#7f8b32', fontSize: 'clamp(20px, 2.4vw, 30px)', marginTop: '12px' }}>
                I want them to build bodies that feel really fucking good to live in.
              </p>
            </div>
            <div className="w-full md:w-[38%]">
              <Photo src={img('BO1A9394.jpg')} alt="Madison in an olive dress leaning against a carved wood door" aspect="0.7" />
            </div>
          </div>
        </div>
      </section>

      {/* ── The Freedom Method ── */}
      <section style={{ background: 'linear-gradient(to bottom, #efdfc3 0%, #e8eeba 100%)', padding: '80px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ ...eyebrowItalic, color: '#45220d', marginBottom: '16px' }}>my philosophy: The Freedom Method</p>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
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
              color: '#7f8b32',
              fontSize: 'clamp(20px, 2.6vw, 32px)',
            }}
          >
            It exists to give you a bigger life.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="w-full md:w-1/3">
            <h3 style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#2d1506', fontSize: '28px', marginBottom: '12px' }}>
              understand your body
            </h3>
            <p style={{ ...bodyP, color: '#45220d', fontSize: '16px' }}>
              means replacing guesswork with body literacy. You learn to recognize your body&rsquo;s signals,
              understand your numbers, and see how it responds&mdash;so you can make informed decisions instead of
              depending on another plan or expert to tell you what to do.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#2d1506', fontSize: '28px', marginBottom: '12px' }}>
              think differently
            </h3>
            <p style={{ ...bodyP, color: '#45220d', fontSize: '16px' }}>
              means looking beyond the physical result to what you want that result to give you. Building muscle,
              becoming leaner, and getting stronger matter&mdash;but the ultimate goal is greater confidence, energy,
              and capacity inside your life.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#2d1506', fontSize: '28px', marginBottom: '12px' }}>
              Live Bigger
            </h3>
            <p style={{ ...bodyP, color: '#45220d', fontSize: '16px' }}>
              means using that strength and understanding to experience more of your life. You can adapt when your
              schedule, location, or circumstances change without feeling as though you have to start over.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '56px', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: 'clamp(20px, 2.4vw, 30px)', lineHeight: '1.3', marginBottom: '16px' }}>
            The point of fitness isn&rsquo;t just to give you a smaller waist.
          </p>
          <p style={{ ...eyebrowItalic, color: '#7f8b32', textTransform: 'none' }}>
            because changing your body is part of the work. changing the way you experience your life is the point.
          </p>
        </div>
      </section>

      {/* ── origin story ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '80px 20px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <p style={{ ...eyebrowItalic, color: '#ce965a', textTransform: 'none', textAlign: 'center', marginBottom: '32px' }}>
            I always get asked how I got into fitness, so here&apos;s that story&hellip;
          </p>
          <p style={{ ...bodyP, color: '#2d1506', marginBottom: '20px' }}>
            I definitely wasn&rsquo;t the sporty or fitness-obsessed girl growing up. I was quiet, a little socially
            awkward, very much a nerd, and just wanted to be left in peace to eat my salt and vinegar chips. But
            eventually, I reached a point where I just didn&rsquo;t feel confident in my body anymore. I tried what
            felt like every random workout and &ldquo;healthy&rdquo; approach under the sun, only to get
            approximately nowhere.
          </p>
          <p style={{ ...bodyP, color: '#2d1506', marginBottom: '20px' }}>
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
          <p style={{ ...bodyP, color: '#2d1506', marginBottom: '20px' }}>
            The transformation was so powerful that I wanted other women to experience it too, so I earned my NASM
            certification and became a coach. Turns out, the quiet nerdy girl didn&rsquo;t disappear, she just became
            a fitness nerd.
          </p>
          <p style={{ ...bodyP, color: '#7f8b32', fontStyle: 'italic' }}>
            These are still the same principles that form the foundation of how I coach transformations today.
          </p>
        </div>
      </section>

      {/* ── testimonials ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 20px' }}>
        <BgPhoto src={img('BO1A9059.jpg')} alt="Green ceramic pot with a fern on a bed" overlay="rgba(82,84,33,0.72)" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
      </section>

      {/* ── closing: "What Body Unmuted means?" ── */}
      <section style={{ background: 'linear-gradient(to bottom, #efdfc3 0%, #525421 100%)', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ ...eyebrowItalic, color: '#2d1506', marginBottom: '12px' }}>what body unmuted means?</p>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#525421',
              fontSize: 'clamp(24px, 3vw, 38px)',
              lineHeight: '1.2',
              fontWeight: 400,
              marginBottom: '32px',
              maxWidth: '760px',
            }}
          >
            We&rsquo;re taught to treat our bodies like inconveniences&hellip;
          </h2>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-[32%] flex-shrink-0">
              <Photo src={img('Madison-114.jpg')} alt="Madison with arm raised on a coastal cliff" aspect="0.68" />
              <div style={{ marginTop: '20px' }}>
                <Link
                  href="/contact"
                  className="inline-block"
                  style={{
                    backgroundColor: '#2d1506',
                    color: '#fbf4e9',
                    fontFamily: 'var(--font-inter-sans), sans-serif',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    lineHeight: '1.8',
                    padding: '10px 16px',
                    borderRadius: '3px',
                    textDecoration: 'none',
                  }}
                >
                  learn more
                </Link>
              </div>
            </div>

            <div className="w-full md:w-[68%]">
              <p style={{ ...bodyP, color: '#fbf4e9', marginBottom: '20px' }}>
                Problems to solve. Things to control and manage. Something to ignore so we can keep working,
                traveling, building, and pushing forward.
              </p>
              <p style={{ ...bodyP, color: '#fbf4e9', marginBottom: '20px' }}>
                But eventually, that disconnection catches up with us.
              </p>
              <p style={{ ...bodyP, color: '#fbf4e9', marginBottom: '20px' }}>
                Burnout. Exhaustion. Low energy. Fading confidence. A relationship with our body that makes it feel
                like she&rsquo;s working against us.
              </p>
              <p style={{ ...eyebrowItalic, color: '#e8eeba', textTransform: 'none', marginBottom: '20px' }}>
                But your body isn&rsquo;t in the way of the life you&rsquo;re building.
              </p>
              <p style={{ ...eyebrowItalic, color: '#e8eeba', textTransform: 'none', marginBottom: '20px' }}>
                She&rsquo;s the one helping you build it and the one experiencing everything your freedom makes
                possible.
              </p>
              <p style={{ ...bodyP, color: '#fbf4e9', marginBottom: '20px' }}>
                Body Unmuted is about learning to listen to her, understand her, care for her, and{' '}
                <em>unmute her</em> so you can move through your life with more energy, confidence, and capacity.
              </p>
              <p style={{ ...eyebrowItalic, color: '#e8eeba', marginBottom: '16px' }}>
                Your body isn&rsquo;t something to overcome.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontStyle: 'italic',
                  color: '#efdfc3',
                  fontSize: 'clamp(24px, 3vw, 36px)',
                }}
              >
                She&apos;s how you get to experience it all.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
