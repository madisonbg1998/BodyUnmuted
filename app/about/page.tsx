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

export default function About() {
  return (
    <>
      {/* ── HERO — Meet Madison ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '60px 20px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* "Meet Madison" big display */}
          <div style={{ textAlign: 'center', overflow: 'hidden', marginBottom: '40px' }}>
            <h1
              style={{
                fontFamily: "'Instrument Serif', serif",
                color: '#82921c',
                fontSize: 'clamp(60px, 14.5vw, 180px)',
                lineHeight: '0.8',
                fontWeight: 400,
                letterSpacing: '0em',
              }}
            >
              Meet Madison
            </h1>
          </div>

          {/* Three-column: left labels | photo | right labels */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
            {/* Left labels */}
            <div className="hidden md:block md:w-[20%] text-right">
              <p
                className="subheading"
                style={{ color: '#45220d', fontSize: '16px', lineHeight: '1.6' }}
              >
                founder
                <br /><br />
                fitness coach
                <br /><br />
                ex-data scientist
              </p>
            </div>

            {/* Photo center */}
            <div className="w-full md:w-[40%] max-w-[370px] mx-auto">
              <Photo src={img('BO1A8475.jpg')} alt="Madison laughing while opening her blazer" aspect="0.77" />
            </div>

            {/* Right labels */}
            <div className="hidden md:block md:w-[20%] text-left">
              <p
                className="subheading"
                style={{ color: '#45220d', fontSize: '16px', lineHeight: '1.6' }}
              >
                ex-cheese monger
                <br /><br />
                wine enthusiast
                <br /><br />
                world traveler
              </p>
            </div>
          </div>

          {/* Mobile labels */}
          <div className="md:hidden flex justify-between mb-8 px-4">
            <p className="subheading" style={{ color: '#45220d', fontSize: '11px', lineHeight: '1.6' }}>
              founder<br />fitness coach<br />ex-data scientist
            </p>
            <p className="subheading" style={{ color: '#45220d', fontSize: '11px', lineHeight: '1.6', textAlign: 'right' }}>
              ex-cheese monger<br />wine enthusiast<br />world traveler
            </p>
          </div>

          {/* Bio text */}
          <div style={{ maxWidth: '935px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: "'Domine', serif",
                color: '#45220d',
                fontSize: 'clamp(12px, 1.7vw, 20px)',
                lineHeight: '1.4',
                fontWeight: 400,
                textAlign: 'justify',
              }}
            >
              I know. It&apos;s a weird combination, but they all came together to build this very specific business.
              <br /><br />
              Anyhow, rewind a few years ago, I finally built the body I&apos;d wanted for years. The only problem?{' '}
              <strong>I was also the girl eating overnight oats alone in a winery parking lot because I didn&apos;t want to &ldquo;fall off plan.&rdquo;</strong>{' '}
              I remember sitting there thinking this cannot be the answer.
              <br /><br />
              Because I didn&apos;t want a body instead of a life. I wanted a body that made my life better. So I started asking a different question...
            </h2>
          </div>
        </div>
      </section>

      {/* ── MISSION QUOTE ── */}
      <section
        style={{ backgroundColor: '#2d1506', padding: '80px 20px', position: 'relative', overflow: 'hidden' }}
        className="min-h-[328px] md:min-h-[600px] flex items-center"
      >
        {/* Background photo 30% opacity */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3, zIndex: 0 }}>
          <Image
            src={img('BO1A8370.jpg')}
            alt="Madison leaning on a balcony railing"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, width: '100%' }}>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: '#e8eeba',
              fontSize: 'clamp(26px, 7.8vw, 94px)',
              lineHeight: '1',
              fontWeight: 400,
            }}
          >
            How do I build incredible body composition without shrinking the life I&apos;m trying to build?
          </h1>
        </div>
      </section>

      {/* ── STORY / INSPIRATION ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-start">

            {/* Photo left */}
            <div className="w-full md:w-[33%] flex-shrink-0">
              <Photo src={img('Madison-73.jpg')} alt="Madison outdoors at golden hour in the mountains" aspect="0.75" />
            </div>

            {/* Text right */}
            <div className="w-full md:w-[67%]">
              <h2
                style={{
                  fontFamily: "'Domine', serif",
                  color: '#82921c',
                  fontSize: 'clamp(15px, 2.75vw, 33px)',
                  lineHeight: '1.2',
                  fontWeight: 400,
                  marginBottom: '32px',
                }}
              >
                How do I keep these results while also traveling the world, eating cheese, drinking wine, and living an all around magical life?
              </h2>

              <p
                className="paragraph"
                style={{ color: '#45220d', fontSize: 'clamp(11px, 1.5vw, 18px)', marginBottom: '32px' }}
              >
                That question ended up changing everything.
                <br /><br />
                I started coaching women, traveled to more than 30 countries, left my job in data science, and became slightly obsessed with understanding how to help women build bodies that support freedom-based lives.
                <br /><br />
                <strong>Today, that&apos;s what Body Unmuted is.</strong>
                <br /><br />
                A different way of thinking about fitness.
                <br /><br />
                <strong>One that helps women create bodies they love, understand their bodies deeply, and build fitness around the lives they actually want to live.</strong>
              </p>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#82921c',
                  fontSize: 'clamp(14px, 2vw, 24px)',
                  lineHeight: '1.4',
                  fontStyle: 'italic',
                }}
              >
                <em>Because I don&apos;t think your body should be the reason you say no to your life.</em>
                <br />
                <strong><br />I think it should be one of the biggest reasons you get to say yes.</strong>
              </p>

              <div style={{ marginTop: '48px' }}>
                <Link href="/method" className="btn-primary">
                  Explore the method
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
