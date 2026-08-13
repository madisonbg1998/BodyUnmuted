import Link from 'next/link';
import Image from 'next/image';

const img = (name: string) => `/Body%20Unmuted%20Brand%20Images/${name}`;

const Photo = ({
  src,
  alt,
  aspect = '3/2',
  className = '',
  priority = false,
}: {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
}) => (
  <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      style={{ objectFit: 'cover' }}
      priority={priority}
    />
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

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate' }}
        className="min-h-[620px] md:min-h-[800px] flex flex-col justify-center"
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src={img('BO1A8225.jpg')}
            alt="Madison Griffin holding a fan among plants"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(82,84,33,0.82) 0%, rgba(251,244,233,0.68) 100%)',
            }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 1, padding: '0 20px 56px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1
              className="animate-slide-in-right"
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: '#e8eeba',
                lineHeight: '0.85',
                fontSize: 'clamp(70px, 12vw, 150px)',
                fontWeight: 400,
                textAlign: 'center',
                marginBottom: '8px',
              }}
            >
              Body Unmuted
            </h1>
            <h2
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: '#faf9f5',
                fontSize: 'clamp(30px, 5.5vw, 83px)',
                lineHeight: '1.05',
                fontWeight: 400,
                textAlign: 'center',
                marginTop: '74px',
                marginBottom: '74px',
              }}
            >
              Make your body your best business asset
            </h2>

            <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
                  color: '#45220d',
                  fontSize: 'clamp(13px, 1.5vw, 22px)',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                A fitness philosophy designed specifically for location-free female founders.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-domine-serif), serif',
                  color: '#45220d',
                  fontSize: 'clamp(14px, 1.6vw, 22px)',
                  lineHeight: '1.4',
                  marginBottom: '20px',
                }}
              >
                Because the stronger, healthier, and more energized you are, the more capacity you have to lead,
                create, grow, and embrace the freedom you&apos;ve worked so hard to build.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-domine-serif), serif',
                  fontStyle: 'italic',
                  color: '#2d1506',
                  fontSize: 'clamp(13px, 1.4vw, 19px)',
                  marginBottom: '32px',
                }}
              >
                (consistent schedule, time zone, and equipment not required)
              </p>
              <Link href="/contact" className="btn-primary">
                tell me more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── "Women don't build..." ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: '#45220d',
                fontSize: 'clamp(27px, 4.3vw, 52px)',
                lineHeight: '1.05',
                fontWeight: 400,
                marginBottom: '16px',
              }}
            >
              Women don&apos;t build location-free businesses because they&apos;re &ldquo;<em>ambitious</em>.&rdquo;
            </h2>

            <p style={{ ...eyebrowItalic, color: '#ce965a', fontWeight: 700, marginBottom: '20px' }}>
              (though obviously they are)
            </p>

            <h2
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                color: '#45220d',
                fontSize: 'clamp(23px, 3.7vw, 44px)',
                lineHeight: '1.1',
                fontWeight: 400,
                fontStyle: 'italic',
              }}
            >
              They build them because they want the freedom to choose their lives.
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-10 items-start mt-12">
            <div className="w-full md:w-[45%] flex-shrink-0">
              <Photo src={img('madison-balcony.png')} alt="Madison laughing on a wrought-iron balcony" aspect="1/1" />
            </div>

            <div className="w-full md:w-[55%]">
              <p
                style={{
                  fontFamily: 'var(--font-inter-sans), sans-serif',
                  color: '#45220d',
                  fontSize: 'clamp(14px, 1.6vw, 19px)',
                  lineHeight: '1.4',
                  marginBottom: '4px',
                }}
              >
                The <em>freedom</em> to&hellip;
              </p>
              <ul
                style={{
                  fontFamily: 'var(--font-inter-sans), sans-serif',
                  color: '#45220d',
                  fontSize: 'clamp(14px, 1.6vw, 19px)',
                  lineHeight: '1.4',
                  paddingLeft: '24px',
                  listStyleType: 'disc',
                  marginTop: '16px',
                }}
              >
                <li>do the work that lights you up and work with clients who you actually enjoy.</li>
                <li style={{ marginTop: '14px' }}>
                  to put your time into whatever calls you. Whether that´s traveling the world or being more present
                  with your family and community
                </li>
                <li style={{ marginTop: '14px' }}>
                  stay in Lisbon for another month simply because you&apos;re not quite ready to leave.
                </li>
                <li style={{ marginTop: '14px' }}>take a Wednesday afternoon off without asking permission.</li>
                <li style={{ marginTop: '14px' }}>to design your work and schedule around your natural energy flow</li>
              </ul>
              <p
                style={{
                  fontFamily: 'var(--font-inter-sans), sans-serif',
                  color: '#45220d',
                  fontSize: 'clamp(14px, 1.6vw, 19px)',
                  lineHeight: '1.4',
                  marginTop: '24px',
                  fontWeight: 700,
                }}
              >
                The freedom to build a life around what matters most to you instead of trying to squeeze your life
                around work.
              </p>

              <div style={{ marginTop: '40px' }}>
                <Link
                  href="/about"
                  className="inline-block"
                  style={{
                    backgroundColor: '#efdfc3',
                    color: '#45220d',
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
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── "And yet, fitness advice..." ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 20px' }}>
        <BgPhoto
          src={img('BO1A8389.jpg')}
          alt="Balcony architecture, softly lit"
          overlay="rgba(45,21,6,0.82)"
        />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-[62%]">
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#e8eeba',
                  fontSize: 'clamp(28px, 4.2vw, 51px)',
                  lineHeight: '1.1',
                  fontWeight: 400,
                  marginBottom: '20px',
                }}
              >
                And yet, fitness advice asks you to do the exact opposite.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-inter-sans), sans-serif',
                  color: '#fbf4e9',
                  fontSize: 'clamp(15px, 1.8vw, 23px)',
                  lineHeight: '1.4',
                  marginBottom: '24px',
                }}
              >
                It asks you to follow a rigid weekly workout routine while maintaining strict diets and nutrition
                plans regardless of where you are, what season you&rsquo;re in, or what your body is telling you.
              </p>
              <p
                style={{
                  ...eyebrowItalic,
                  color: '#e8eeba',
                  fontSize: 'clamp(16px, 2.2vw, 26px)',
                  marginBottom: '20px',
                }}
              >
                But what happens when life inevitably changes?
              </p>
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: 'clamp(14px, 1.6vw, 19px)', marginBottom: '12px' }}>
                Maybe you stop and start over.
              </p>
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: 'clamp(14px, 1.6vw, 19px)', marginBottom: '12px' }}>
                Maybe you wait for a calmer season.
              </p>
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: 'clamp(14px, 1.6vw, 19px)', marginBottom: '24px' }}>
                Maybe you never begin at all because you can&apos;t imagine how fitness fits inside a life that
                rarely looks the same from one week to the next.
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontStyle: 'italic',
                  color: '#e8eeba',
                  fontSize: 'clamp(24px, 3.4vw, 50px)',
                  lineHeight: '1.15',
                  fontWeight: 400,
                  marginBottom: '20px',
                }}
              >
                The problem isn&apos;t you. It isn&apos;t your discipline. And it certainly isn&apos;t your body.
              </h3>
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: 'clamp(15px, 1.8vw, 23px)' }}>
                It&apos;s that you&apos;ve been trying to follow a version of fitness that was never designed for the
                life you built.
              </p>
            </div>

            <div className="w-full md:w-[38%]">
              <Photo src={img('BO1A8912.jpg')} alt="Woman lying beside a Moroccan tiled pool" aspect="0.55" />
            </div>
          </div>
        </div>
      </section>

      {/* ── "Hiiiiii, I'm Madison" ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-[38%] flex-shrink-0">
              <Photo src={img('BO1A9394.jpg')} alt="Madison in an olive dress leaning against a carved wood door" aspect="0.7" />
            </div>

            <div className="w-full md:w-[62%]">
              <h2
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontStyle: 'italic',
                  color: '#45220d',
                  fontSize: 'clamp(38px, 5.4vw, 70px)',
                  lineHeight: '1',
                  fontWeight: 400,
                  marginBottom: '20px',
                }}
              >
                Hiiiiii, I&apos;m Madison
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-inter-sans), sans-serif',
                  color: '#ce965a',
                  fontSize: 'clamp(16px, 2vw, 26px)',
                  lineHeight: '1.35',
                  marginBottom: '20px',
                }}
              >
                Fitness and Body Literacy Coach, former data scientist, former cheese monger, and now the woman
                behind Body Unmuted.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter-sans), sans-serif',
                  color: '#2d1506',
                  fontSize: 'clamp(16px, 2vw, 26px)',
                  lineHeight: '1.35',
                  marginBottom: '20px',
                }}
              >
                I love helping women look and feel sexy, build muscle, and become stronger because those physical
                results feel <em>damn</em> good.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter-sans), sans-serif',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  color: '#7f8b32',
                  fontSize: 'clamp(18px, 2.3vw, 30px)',
                  lineHeight: '1.3',
                  marginBottom: '20px',
                }}
              >
                But what I care about more is what those results make possible.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter-sans), sans-serif',
                  color: '#2d1506',
                  fontSize: 'clamp(15px, 1.9vw, 24px)',
                  lineHeight: '1.35',
                  marginBottom: '32px',
                }}
              >
                More confidence. More energy. More trust in your body, and the ability to build an even fuller and
                freer life because you finally have a version of fitness that supports it.
              </p>
              <Link href="/about" className="btn-copper">
                Learn more about me and my story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 20px' }}>
        <BgPhoto src={img('BO1A9059.jpg')} alt="Green ceramic pot with a fern on a bed" overlay="rgba(82,84,33,0.72)" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#efdfc3',
              fontSize: 'clamp(34px, 5.6vw, 68px)',
              lineHeight: '1.05',
              fontWeight: 400,
              textTransform: 'uppercase',
              marginBottom: '48px',
            }}
          >
            People say nice things
            <br />
            about me sometimes
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            <div
              className="w-full md:w-1/2"
              style={{ backgroundColor: 'rgba(82,84,33,0.55)', borderRadius: '4px', padding: '36px' }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#fbf4e9',
                  fontSize: 'clamp(22px, 2.6vw, 32px)',
                  lineHeight: '1.15',
                  fontWeight: 400,
                  marginBottom: '20px',
                }}
              >
                &ldquo;I feel better at 36 than I did at 26.&rdquo;
              </h3>
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>
                Working with Madison has genuinely changed my life. Over the last year I&apos;ve lost 20 pounds,
                built real strength, and found a confidence I didn&apos;t know I was missing. She doesn&apos;t just
                give you workouts. She helped me completely overhaul my nutrition and actually understand what my
                body needs. I feel better at 36 than I did at 26. I didn&apos;t think that was possible.&rdquo;
              </p>
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: '15px' }}>&mdash;Liz</p>
            </div>

            <div
              className="w-full md:w-1/2"
              style={{ backgroundColor: 'rgba(82,84,33,0.55)', borderRadius: '4px', padding: '36px' }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  color: '#fbf4e9',
                  fontSize: 'clamp(22px, 2.6vw, 32px)',
                  lineHeight: '1.15',
                  fontWeight: 400,
                  marginBottom: '20px',
                }}
              >
                &ldquo;She&apos;ll not only change your body. She&apos;ll change your life.
              </h3>
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>
                I was traveling through seven countries in three months, losing muscle, losing confidence, and it
                was starting to affect my business and my speaking events. Madison reminded me I could still enjoy
                life, still travel, and still feel strong, confident, and sexy while actually being in a routine. I
                feel in such amazing shape, and it&apos;s had a huge ripple effect on everything. If you&apos;re even
                thinking about it, take the dive. She&apos;ll not only change your body. She&apos;ll change your
                life.&rdquo;
              </p>
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: '15px' }}>&mdash;Ashleigh</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── "You built your business..." ── */}
      <section style={{ background: 'linear-gradient(to bottom, #e8eeba 0%, #efdfc3 100%)', padding: '80px 20px 56px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ ...eyebrowItalic, color: '#45220d', fontSize: 'clamp(16px, 2.1vw, 30px)', marginBottom: '12px' }}>
            You built your business to give you more freedom
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#7f8b32',
              fontSize: 'clamp(28px, 3.4vw, 48px)',
              lineHeight: '1.1',
              fontWeight: 400,
              marginBottom: '24px',
            }}
          >
            Your fitness should do the same.
          </h2>
          <p style={{ fontFamily: 'var(--font-ibm-plex-sans), sans-serif', color: '#2d1506', fontSize: 'clamp(15px, 1.7vw, 20px)', lineHeight: '1.4', marginBottom: '32px' }}>
            It should give you the energy to build, the confidence to be seen, the strength to keep expanding, and
            the capacity to be fully inside the life you worked so hard to create.
          </p>
          <Link href="/contact" className="btn-copper">
            explore how we do it
          </Link>
        </div>
      </section>

      {/* ── "What body unmuted means?" ── */}
      <section style={{ background: 'linear-gradient(to bottom, #efdfc3 0%, #525421 100%)', padding: '56px 20px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ ...eyebrowItalic, color: '#2d1506', fontSize: 'clamp(14px, 1.6vw, 20px)', marginBottom: '12px' }}>
            what body unmuted means?
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#525421',
              fontSize: 'clamp(24px, 3vw, 41px)',
              lineHeight: '1.2',
              fontWeight: 400,
              marginBottom: '32px',
              maxWidth: '900px',
            }}
          >
            Body Unmuted is about reconnecting with your body instead of overriding her (yes, I refer to our bodies
            as her)
          </h2>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-[40%] flex-shrink-0">
              <Photo src={img('Madison-114.jpg')} alt="Madison with arm raised on a coastal cliff" aspect="0.68" />
            </div>

            <div className="w-full md:w-[60%]">
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: 'clamp(16px, 1.9vw, 24px)', lineHeight: '1.4', marginBottom: '20px' }}>
                Too often we look in the mirror and don&apos;t like what we see, or might feel like caring for our
                bodies is &lsquo;getting in the way&rsquo; of the massive list of things we need to get done.
              </p>
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#fbf4e9', fontSize: 'clamp(16px, 1.9vw, 24px)', lineHeight: '1.4', marginBottom: '20px' }}>
                Body Unmuted is about learning to listen to her, understand her, care for her, and <em>unmute her.</em>
              </p>
              <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', fontStyle: 'italic', color: '#e8eeba', fontSize: 'clamp(16px, 1.9vw, 24px)', lineHeight: '1.4', marginBottom: '24px' }}>
                Because your body isn&rsquo;t getting in the way of the life you&rsquo;re building.
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontStyle: 'italic',
                  color: '#fbf4e9',
                  fontSize: 'clamp(24px, 3vw, 43px)',
                  lineHeight: '1.15',
                  fontWeight: 400,
                  marginBottom: '32px',
                }}
              >
                She&apos;s what makes it possible.
              </h3>

              <Link
                href="/contact"
                className="inline-block"
                style={{
                  backgroundColor: 'transparent',
                  color: '#fbf4e9',
                  fontFamily: 'var(--font-inter-sans), sans-serif',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  lineHeight: '1.8',
                  padding: '10px 16px',
                  borderRadius: '3px',
                  border: '1px solid #fbf4e9',
                  textDecoration: 'none',
                }}
              >
                learn more about the program
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── "The point of fitness isn't..." ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '96px 20px' }} className="min-h-[420px] flex items-center">
        <BgPhoto src={img('BO1A8952.jpg')} alt="Woman relaxing beside a Moroccan tiled pool, aerial view" overlay="rgba(45,21,6,0.65)" />
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ ...eyebrowItalic, color: '#fbf4e9', fontSize: 'clamp(16px, 2.5vw, 36px)', marginBottom: '16px' }}>
            The point of fitness isn&apos;t to just give you a smaller waist
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              color: '#e8eeba',
              fontSize: 'clamp(36px, 6.2vw, 82px)',
              lineHeight: '1.05',
              fontWeight: 400,
              marginBottom: '40px',
            }}
          >
            It&apos;s to make your life bigger.
          </h2>
          <Link href="/contact" className="btn-yellow-green" style={{ backgroundColor: '#fbf4e9' }}>
            let&apos;s talk
          </Link>
        </div>
      </section>
    </>
  );
}
