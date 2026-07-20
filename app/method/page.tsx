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

export default function Method() {
  return (
    <>
      {/* ── TITLE — The Freedom Method ── */}
      <section
        style={{
          background: 'linear-gradient(to bottom, #efdfc3 0%, #fbf4e9 100%)',
          padding: '60px 20px 80px',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: '#45220d',
              fontSize: 'clamp(54px, 16.7vw, 200px)',
              lineHeight: '0.9',
              fontWeight: 400,
              textTransform: 'uppercase',
              textAlign: 'center',
              letterSpacing: '0em',
              marginBottom: '32px',
            }}
          >
            the freedom method
          </h1>

          <p
            className="subheading"
            style={{
              color: '#82921c',
              fontSize: 'clamp(12px, 2.25vw, 27px)',
              lineHeight: '1.6',
              textAlign: 'right',
              textTransform: 'none',
              fontStyle: 'normal',
              letterSpacing: '0em',
            }}
          >
            Think differently.{' '}
            <br className="md:hidden" />
            Understand your body.
            <br />
            Live bigger.
          </p>
        </div>
      </section>

      {/* ── THINK DIFFERENTLY — Why we want to change our bodies ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-start">

            {/* Photo left */}
            <div className="w-full md:w-[47%] flex-shrink-0">
              <Placeholder aspect="0.626" />
            </div>

            {/* Text right */}
            <div className="w-full md:w-[53%]">
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  color: '#ce965a',
                  fontSize: 'clamp(28px, 5.5vw, 66px)',
                  lineHeight: '1',
                  fontWeight: 400,
                  marginBottom: '32px',
                }}
              >
                I&apos;ve been thinking a lot lately about why we want to change our bodies.
              </h2>

              <p
                className="paragraph"
                style={{ color: '#2d1506', fontSize: 'clamp(10px, 1.1vw, 13px)', marginBottom: '40px' }}
              >
                Not whether we should.
                <br /><br />
                I think wanting to build muscle, improve your body composition, or become stronger is a beautiful goal. I love aesthetics. I love strength. I love watching women completely transform the way they look.
                <br /><br />
                What I&apos;ve become much more interested in though is what we&apos;re actually hoping those things will give us. Because I don&apos;t think most women are chasing body composition.
                <br /><br />
                <strong>I think they&apos;re chasing confidence.
                <br />Energy.
                <br />Capacity.</strong>
                <br /><br />
                They want to <em>love the way they look and feel.</em>
                <br />They want to walk into a room and feel like <em>the absolute best version of themselves.</em>
                <br />They want to build an incredible business without feeling exhausted every afternoon.
                <br />They want to travel <em>without feeling like they&apos;re constantly starting over.</em>
                <br /><strong>They want a body that makes them feel more alive inside the life they&apos;ve worked so hard to build.</strong>
                <br /><br />
                And I think that&apos;s a really important distinction.
                <br /><br />
                <strong>Because if that&apos;s what we&apos;re actually after, then the way we pursue changing our body should move us closer to those things. Not further away from them.</strong>
                <br /><br />
                I know for me, there was a season where I got so obsessed with changing my body that instead of letting it fuel a bigger life, I let the pursuit of it make my life smaller.
                <br /><br />
                More rules. More guilt. More mental load. More &ldquo;I&apos;ll start again on Monday.&rdquo;
                <br /><br />
                Looking back, I don&apos;t think changing my body was ever the problem. Forgetting why I wanted to change it was.
                <br /><br />
                That&apos;s where The Freedom Method begins.
              </p>

              <Link href="/work-with-me" className="btn-copper">
                Let&apos;s implement it
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── THINK DIFFERENTLY — Banner ── */}
      <section
        style={{ backgroundColor: '#45220d', padding: '60px 20px', position: 'relative', overflow: 'hidden' }}
        className="min-h-[250px] md:min-h-[530px] flex items-center"
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5, zIndex: 0 }}>
          <Placeholder aspect="1.3" className="h-full" />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, width: '100%' }}>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: '#fbf4e9',
              fontSize: 'clamp(59px, 10.8vw, 130px)',
              lineHeight: '1',
              fontWeight: 400,
            }}
          >
            Think Differently.
          </h2>
        </div>
      </section>

      {/* ── DETAILS — Fitness should make your life bigger ── */}
      <section style={{ backgroundColor: '#efdfc3', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p
            className="subheading"
            style={{ color: '#45220d', fontSize: 'clamp(12px, 1.8vw, 22px)', marginBottom: '8px' }}
          >
            The point of fitness isn&apos;t to just give you a smaller waist
          </p>

          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: '#82921c',
              fontSize: 'clamp(28px, 4.5vw, 54px)',
              lineHeight: '1',
              fontWeight: 400,
              marginBottom: '40px',
            }}
          >
            <br />It exists to give you a bigger life.
          </h2>

          <p
            className="paragraph"
            style={{ color: '#45220d', fontSize: 'clamp(10px, 1.5vw, 18px)', maxWidth: '613px', marginBottom: '40px' }}
          >
            Yes, changing your body matters. But changing your body is part of the work. Changing the way you experience your life is the point.
            <br /><br />
            That&apos;s a very different way of thinking about fitness.
            <br /><br />
            Instead of just asking, &ldquo;How do I change my body?&rdquo;
            <br /><br />
            We ask, &ldquo;What kind of body do I want for the life I&apos;m trying to build?&rdquo;
            <br /><br />
            Because the answer isn&apos;t just leaner. Or stronger.
            <br /><strong>It&apos;s more capable.</strong>
            <br /><br />
            A body that has the energy to build a business.
            <br />The resilience to handle stressful seasons.
            <br />The confidence to walk into any room feeling incredible.
            <br />The capacity to travel, celebrate, recover, and still keep moving toward the life you want.
            <br /><br />
            <strong>I don&apos;t think fitness should ask you to make your life smaller.
            <br />I think it should make your life bigger.</strong>
          </p>

          <Link href="/work-with-me" className="btn-yellow-green">
            This is how we do it
          </Link>
        </div>
      </section>

      {/* ── UNDERSTAND YOUR BODY — Banner ── */}
      <section
        style={{ backgroundColor: '#2d1506', padding: '60px 20px', position: 'relative', overflow: 'hidden' }}
        className="min-h-[250px] md:min-h-[450px] flex items-center"
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5, zIndex: 0 }}>
          <Placeholder aspect="1.98" className="h-full" />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, width: '100%' }}>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: '#e8eeba',
              fontSize: 'clamp(59px, 10.8vw, 130px)',
              lineHeight: '1',
              fontWeight: 400,
            }}
          >
            Understand
            <br />
            Your Body.
          </h2>
        </div>
      </section>

      {/* ── UNDERSTAND — Guesswork section ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-start">

            {/* Photos left — two stacked */}
            <div className="w-full md:w-[42%] flex-shrink-0 flex flex-col gap-4">
              <Placeholder aspect="0.667" />
              <Placeholder aspect="0.667" />
            </div>

            {/* Text right */}
            <div className="w-full md:w-[58%]">
              <h1
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  color: '#ce965a',
                  fontSize: 'clamp(26px, 4.2vw, 50px)',
                  lineHeight: '1',
                  fontWeight: 400,
                  marginBottom: '32px',
                }}
              >
                One of the biggest things making women&apos;s lives smaller isn&apos;t food. It&apos;s guesswork.
              </h1>

              <p
                className="paragraph"
                style={{ color: '#45220d', fontSize: 'clamp(12px, 1.5vw, 18px)', marginBottom: '40px' }}
              >
                Do this workout. Try this diet. Track your macros. Cut carbs. Actually... cut fat. No, sugar. Gluten. Seed oils. Intermittent fasting. Ten thousand steps. Zone 2. Lift heavier. Lift lighter.
                <br /><br />
                <strong>And somewhere along the way, fitness became one giant guessing game.</strong>
                <br /><br />
                You&apos;re constantly wondering if you&apos;re doing the &ldquo;right&rdquo; thing.
                <br />Always looking for the missing piece.
              </p>

              <Link href="/work-with-me" className="btn-copper" style={{ border: '1px solid #45220d' }}>
                This is how we do it
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── UNDERSTAND — Numbers section (olive bg + image) ── */}
      <section
        style={{ backgroundColor: '#525421', padding: '80px 20px', position: 'relative', overflow: 'hidden' }}
        className="min-h-[720px] md:min-h-[850px] flex items-center"
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, zIndex: 0 }}>
          <Placeholder aspect="0.667" className="h-full" />
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: '#e8eeba',
              fontSize: 'clamp(25px, 5.6vw, 67px)',
              lineHeight: '1',
              fontWeight: 400,
              textAlign: 'center',
              marginBottom: '48px',
            }}
          >
            But I don&apos;t think women need more information.
            <br /><br />
            I think they need to understand their numbers.
          </h1>

          <p
            className="paragraph"
            style={{ color: '#fbf4e9', fontSize: 'clamp(14px, 1.75vw, 21px)', textAlign: 'center', maxWidth: '870px', margin: '0 auto 32px' }}
          >
            One thing I&apos;ve always found interesting is that the women I work with already understand this in every other area of their lives.
            <br /><br />
            <em>Especially in business.</em>
            <br /><br />
            <strong>They know that understanding their numbers creates freedom.</strong>
            <br /><br />
            Not because numbers are exciting but because they replace guessing with clarity.
            <br /><br />
            You understand what&apos;s working. You understand what isn&apos;t.
            <br />And then you make better decisions because of it.
          </p>

          <p
            className="subheading"
            style={{ color: '#e8eeba', fontSize: 'clamp(11px, 2.4vw, 29px)', textAlign: 'center', marginBottom: '48px', textTransform: 'none', fontStyle: 'italic', letterSpacing: '0em', lineHeight: '1.4' }}
          >
            <em>The numbers don&apos;t restrict your freedom. They create it.</em>
          </p>

          <div style={{ textAlign: 'center' }}>
            <Link href="/work-with-me" className="btn-yellow-green">
              This is how we do it
            </Link>
          </div>
        </div>
      </section>

      {/* ── LIVE BIGGER — Tan section ── */}
      <section style={{ backgroundColor: '#efdfc3', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10 items-start">

            {/* Text left */}
            <div className="w-full md:w-[60%]">
              <h1
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  color: '#82921c',
                  fontSize: 'clamp(29px, 5.6vw, 67px)',
                  lineHeight: '1',
                  fontWeight: 400,
                  marginBottom: '32px',
                }}
              >
                I think your body deserves the same approach.
              </h1>

              <p
                className="paragraph"
                style={{ color: '#45220d', fontSize: 'clamp(12px, 1.6vw, 19px)', marginBottom: '40px' }}
              >
                Before I became a coach, I was a data scientist.
                <br /><br />
                I think that&apos;s one of the reasons I care so deeply about helping women understand their bodies instead of simply telling them what to do.
                <br /><br />
                <em>I don&apos;t want to guess. I don&apos;t want you guessing either.</em>
                <br /><br />
                <strong>I want you to understand your body well enough that every decision becomes simpler.</strong>
                <br /><br />
                Because plans eventually end. Understanding doesn&apos;t.
                <br /><br />
                The goal isn&apos;t for you to become dependent on another fitness expert. <strong>It&apos;s for you to become the expert on your own body.</strong> Because when you understand your body, you stop chasing every new opinion.
                <br /><br />
                You stop fearing dessert.
                <br />You stop wondering if one holiday ruined your progress.
                <br />You stop looking for someone else to tell you what to do.
                <br /><br />
                <em>You start trusting yourself.</em>
                <br /><strong>And I think that&apos;s one of the most freeing things a woman can build.</strong>
              </p>

              <Link href="/work-with-me" className="btn-yellow-green">
                This is how we do it
              </Link>
            </div>

            {/* Photo right */}
            <div className="w-full md:w-[40%] flex-shrink-0">
              <Placeholder aspect="0.667" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — Think differently. Understand. Live bigger. ── */}
      <section
        style={{ backgroundColor: '#45220d', padding: '80px 20px', position: 'relative', overflow: 'hidden' }}
        className="min-h-[250px] md:min-h-[450px] flex items-center"
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5, zIndex: 0 }}>
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
            Think differently. Understand your body. Live bigger.
          </h1>

          <Link href="/work-with-me" className="btn-yellow-green">
            This is how we do it
          </Link>
        </div>
      </section>
    </>
  );
}
