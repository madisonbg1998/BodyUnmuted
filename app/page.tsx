import Link from 'next/link';

const Placeholder = ({ aspect = '3/2', className = '' }: { aspect?: string; className?: string }) => (
  <div
    className={`w-full bg-neutral-300 flex items-center justify-center ${className}`}
    style={{ aspectRatio: aspect }}
  >
    <span style={{ color: '#999', fontFamily: 'Inter, sans-serif', fontSize: '13px', letterSpacing: '0.05em' }}>
      photo
    </span>
  </div>
);

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{ backgroundColor: '#fbf4e9', position: 'relative', overflow: 'hidden' }}
        className="min-h-[499px] md:min-h-[858px] flex flex-col justify-center"
      >
        {/* Background image placeholder */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Placeholder aspect="1.49" className="h-full" />
        </div>

        {/* "Body Unmuted" display text */}
        <div style={{ position: 'relative', zIndex: 1, padding: '0 0', textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: '#e8eeba',
              lineHeight: '0.8',
              letterSpacing: '0em',
              fontSize: 'clamp(93px, 15.6vw, 187px)',
              textAlign: 'center',
              fontWeight: 400,
              whiteSpace: 'nowrap',
            }}
          >
            Body Unmuted
          </h1>
        </div>
      </section>

      {/* ── VALUE STATEMENT ── */}
      <section
        style={{
          background: 'linear-gradient(to bottom, #525421 0%, #fbf4e9 100%)',
          padding: '60px 20px 80px',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: '#faf9f5',
              fontSize: 'clamp(38px, 8.3vw, 100px)',
              lineHeight: '1',
              letterSpacing: '0em',
              fontWeight: 400,
              marginBottom: '40px',
            }}
          >
            Make your body your best business asset
          </h2>

          <h3
            style={{
              fontFamily: "'Domine', serif",
              color: '#45220d',
              fontSize: 'clamp(15px, 2.9vw, 35px)',
              lineHeight: '1.2',
              letterSpacing: '0em',
              fontWeight: 400,
              marginBottom: '16px',
            }}
          >
            A Different Philosophy on Fitness for the{' '}
            <br className="hidden md:block" />
            Location-Free Female Founder
          </h3>

          <h3
            style={{
              fontFamily: "'Domine', serif",
              color: '#2d1506',
              fontSize: 'clamp(13px, 1.8vw, 22px)',
              lineHeight: '1.2',
              letterSpacing: '0em',
              fontWeight: 400,
              marginBottom: '48px',
            }}
          >
            (consistent schedule, time zone, and equipment <em>not</em> required)
          </h3>

          <Link href="/method" className="btn-olive-light">
            tell me more
          </Link>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Top text — full width */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                color: '#45220d',
                fontSize: 'clamp(27px, 4.3vw, 52px)',
                lineHeight: '1',
                fontWeight: 400,
                marginBottom: '16px',
              }}
            >
              Women don&apos;t build location-free businesses because they&apos;re &ldquo;<em>ambitious</em>.&rdquo;
            </h2>

            <p
              className="subheading"
              style={{ color: '#ce965a', fontSize: 'clamp(12px, 1.8vw, 22px)' }}
            >
              (though obviously they are)
            </p>

            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                color: '#45220d',
                fontSize: 'clamp(23px, 3.7vw, 44px)',
                lineHeight: '1',
                fontWeight: 400,
                fontStyle: 'italic',
                marginTop: '16px',
              }}
            >
              They build them because they want the freedom to choose their lives.
            </h2>
          </div>

          {/* Two columns: image + list */}
          <div className="flex flex-col md:flex-row gap-10 items-start mt-12">
            {/* Photo left */}
            <div className="w-full md:w-[45%] flex-shrink-0">
              <Placeholder aspect="1/1" />
            </div>

            {/* List right */}
            <div className="w-full md:w-[55%]">
              <p
                className="paragraph"
                style={{ color: '#45220d', fontSize: 'clamp(13px, 1.6vw, 19px)', lineHeight: '1.3' }}
              >
                The <em>freedom</em> to...
                <br /><br />
              </p>
              <ul
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#45220d',
                  fontSize: 'clamp(13px, 1.6vw, 19px)',
                  lineHeight: '1.3',
                  paddingLeft: '24px',
                  listStyleType: 'disc',
                }}
              >
                <li>choose work they genuinely care about.</li>
                <li style={{ marginTop: '16px' }}>decide who they work with.</li>
                <li style={{ marginTop: '16px' }}>spend more time with their family.</li>
                <li style={{ marginTop: '16px' }}>stay in Lisbon for another month because they&apos;re not quite ready to leave.</li>
                <li style={{ marginTop: '16px' }}>take a Wednesday afternoon off without asking permission.</li>
              </ul>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#45220d',
                  fontSize: 'clamp(13px, 1.6vw, 19px)',
                  lineHeight: '1.3',
                  marginTop: '24px',
                  fontWeight: 700,
                }}
              >
                The freedom to build a life around what matters most to them instead of trying to squeeze life around work.
              </p>

              <div style={{ marginTop: '48px' }}>
                <Link href="/about" className="btn-copper">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DARK QUOTE (When you really think about it…) ── */}
      <section style={{ backgroundColor: '#2d1506', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Text left */}
            <div className="w-full md:w-[65%]">
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  color: '#fbf4e9',
                  fontSize: 'clamp(30px, 4.3vw, 52px)',
                  lineHeight: '1',
                  fontWeight: 400,
                  marginBottom: '24px',
                }}
              >
                When you really think about it, entrepreneurship wasn&apos;t the goal.
              </h2>

              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  color: '#e8eeba',
                  fontSize: 'clamp(36px, 5.2vw, 62px)',
                  lineHeight: '1',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  marginBottom: '40px',
                }}
              >
                Freedom was.
              </h2>

              <p
                className="paragraph"
                style={{ color: '#fbf4e9', fontSize: 'clamp(12px, 1.9vw, 23px)', lineHeight: '1.3' }}
              >
                And entrepreneurship became the way to get there.
                <br /><br />
                And I think that&apos;s a really beautiful reason to build a business.
                <br /><br />
                <strong>Which keeps bringing me back to one question...</strong>
              </p>
            </div>

            {/* Photo right */}
            <div className="w-full md:w-[35%]">
              <Placeholder aspect="0.667" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY (If freedom is the reason…) ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Photo left */}
            <div className="w-full md:w-[42%] flex-shrink-0">
              <Placeholder aspect="0.667" />
            </div>

            {/* Text right */}
            <div className="w-full md:w-[58%]">
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  color: '#45220d',
                  fontSize: 'clamp(36px, 5.2vw, 62px)',
                  lineHeight: '1',
                  fontWeight: 400,
                  marginBottom: '32px',
                }}
              >
                If freedom is the reason you built your business...
                <br /><br />
                <em>shouldn&apos;t your body help you experience more of it?</em>
              </h2>

              <p
                className="paragraph"
                style={{ color: '#45220d', fontSize: 'clamp(14px, 2.1vw, 25px)', marginBottom: '40px' }}
              >
                I&apos;ve built an entire philosophy around that question...
              </p>

              <Link href="/method" className="btn-copper">
                Explore the freedom method
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA (dark, Your body should make your life bigger) ── */}
      <section
        style={{ backgroundColor: '#2d1506', padding: '80px 20px', position: 'relative', overflow: 'hidden' }}
        className="min-h-[190px] md:min-h-[450px] flex items-center"
      >
        {/* Background image at 40% opacity */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4, zIndex: 0 }}>
          <Placeholder aspect="2.375" className="h-full" />
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, width: '100%' }}>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: '#fbf4e9',
              fontSize: 'clamp(27px, 8.3vw, 100px)',
              lineHeight: '1',
              fontWeight: 400,
              marginBottom: '40px',
            }}
          >
            Your body should make
            <br />
            your life bigger
          </h1>

          <Link href="/work-with-me" className="btn-yellow-green">
            join body reclaimed
          </Link>
        </div>
      </section>
    </>
  );
}
