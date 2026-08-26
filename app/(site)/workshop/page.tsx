const LUMA_URL = 'https://luma.com/numw8n89';

const bodyP: React.CSSProperties = {
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontSize: 'clamp(15px, 1.6vw, 19px)',
  lineHeight: '1.6',
};

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: 'clamp(12px, 1.3vw, 15px)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

function ArrowIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 9h20M14 2l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowItem({ children, textColor = '#2d1506' }: { children: React.ReactNode; textColor?: string }) {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '18px' }}>
      <span
        style={{
          flexShrink: 0,
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '1.5px solid #ce965a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          color: '#ce965a',
          marginTop: '2px',
        }}
      >
        &rarr;
      </span>
      <p style={{ ...bodyP, color: textColor }}>{children}</p>
    </div>
  );
}

function CheckItem({ children, color = '#2d1506' }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '14px' }}>
      <span style={{ flexShrink: 0, color: '#ce965a', fontSize: '16px', marginTop: '2px' }}>&#10003;</span>
      <p style={{ ...bodyP, color }}>{children}</p>
    </div>
  );
}

function LumaButton({ id, bg = '#faf9f5' }: { id: string; bg?: string }) {
  return (
    <div
      id={id}
      style={{
        backgroundColor: bg,
        border: '1px solid rgba(206,150,90,0.28)',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 24px rgba(45,21,6,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        maxWidth: '480px',
        margin: '0 auto',
        scrollMarginTop: '40px',
      }}
    >
      <a
        href={LUMA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
        style={{ textAlign: 'center', textDecoration: 'none' }}
      >
        Save My Free Spot
      </a>
      <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.5)', fontSize: '12px', textAlign: 'center' }}>
        Free &middot; Live Online &middot; September 29&ndash;October 1
      </p>
    </div>
  );
}

function AnchorBtn({ href, bg, color, children }: { href: string; bg: string; color: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '14px',
        backgroundColor: bg,
        color,
        fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
        fontSize: '13px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        padding: '16px 28px',
        borderRadius: '2px',
        textDecoration: 'none',
      }}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

const dayCards = [
  {
    day: 'Day 1',
    title: 'Why Your Fitness Plan Is F***d',
    intro:
      "You're successful, capable, and accustomed to doing hard things, so why does fitness still feel like the one problem you can't solve consistently?",
    body: "On Day 1, you'll understand why your previous plans haven't stuck, identify the friction keeping you trapped in the stop-start cycle, and understand why trying harder hasn't been the answer.",
    create: 'Your Freedom-Fitness Friction Audit',
    outro: "You'll leave knowing what has actually been getting in your way and what your next plan needs to do differently.",
    bg: '#e8eeba',
  },
  {
    day: 'Day 2',
    title: 'Build Your Freedom-First Fitness Plan',
    intro: 'What would your fitness plan look like if it had to work with your real life, not an imaginary perfect week?',
    body: "On Day 2, you'll build a personalized 30-day strategy around your goals, schedule, training experience, preferences, travel, and actual capacity. You'll create minimum, target, and stretch versions of your week, so your progress no longer depends on every week looking the same.",
    create: 'Your 30-Day Freedom-First Fitness Blueprint',
    outro: "You'll leave with a realistic training structure, workouts or workout templates, starting nutrition guidance, and your first seven days mapped out.",
    bg: '#fbf4e9',
  },
  {
    day: 'Day 3',
    title: 'Make It Work in Real Life',
    intro: 'A plan is only useful if you know what to do when your schedule, energy, progress, or priorities change.',
    body: "On Day 3, you'll learn how to execute your plan, evaluate what is happening, and make intelligent adjustments without punishing yourself, abandoning the goal, or repeatedly starting over.",
    create: 'Your Adaptive Fitness Playbook',
    outro: "You'll leave with a simple weekly review process, personal adjustment rules, and a clear plan for handling travel, missed workouts, difficult weeks, and changing progress.",
    bg: '#e8eeba',
  },
];

const painPoints = [
  'Unsure what you should actually be doing',
  'Starting plans that disappear when work gets busy',
  'Trying to "get back on track" after every trip or dinner out',
  'Overwhelmed by contradictory workouts and nutrition advice',
  'Wondering why you can be consistent everywhere except here',
];

const outcomes = [
  "A clear understanding of why your previous approaches haven't stuck",
  'A personalized 30-day fitness plan built around your goals and real life',
  'A realistic weekly training structure',
  "Workouts or workout templates you can actually use",
  'Starting nutrition targets and principles',
  'A plan for travel, launches, dinners out, and demanding weeks',
  'A simple system for reviewing your progress',
  'Clear rules for knowing when to persist and when to adjust',
];

const forYouIf = [
  'Your business has systems, but your fitness still seems to run on motivation and good intentions',
  'You can stay consistent until a launch, trip, client dinner, or chaotic week throws everything off',
  'You have saved workouts, nutrition advice, and half-finished plans, but no clear idea which one is right for you',
  'You are tired of treating every disrupted week like proof that you need to start over',
  'You want to know exactly what to do during normal weeks, demanding weeks, and weeks spent living out of a suitcase',
  'You want visible results without turning fitness into another full-time job',
  'You want to enjoy restaurants, wine, travel, and spontaneous plans without feeling like you have ruined your progress',
  'Your business and lifestyle have evolved, but your approach to fitness has not evolved with them',
  'You want your strength, energy, and confidence to keep pace with the life and business you are building',
];

export default function WorkshopPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '110px 20px 80px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ ...eyebrow, color: '#ce965a', marginBottom: '20px' }}>Free 3-Day Live Workshop</p>
          <h1
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(34px, 5.4vw, 64px)',
              lineHeight: '1.1',
              fontWeight: 400,
              marginBottom: '28px',
            }}
          >
            Founders, Your Fitness Plan Is F***d <em style={{ fontStyle: 'italic', color: '#ce965a' }}>(Respectfully)</em>.
          </h1>
          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: 'clamp(17px, 2vw, 23px)', lineHeight: '1.5', fontWeight: 600, marginBottom: '24px' }}>
            A three-day workshop to build a fitness plan that works through travel, launches, dinners out, and real
            life without giving up the freedom you built your business to create.
          </p>
          <p style={{ ...eyebrow, color: '#525421', fontWeight: 700, marginBottom: '48px' }}>
            September 29 through October 1 &nbsp;|&nbsp; Live Online
          </p>
          <LumaButton id="register-top" />
        </div>
      </section>

      {/* ── "You can do hard things..." ── */}
      <section style={{ backgroundColor: '#efdfc3', padding: '90px 20px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(28px, 3.8vw, 46px)',
              lineHeight: '1.2',
              fontWeight: 400,
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            You can do hard things. So why does fitness feel this hard?
          </h2>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px' }}>
            You&rsquo;ve built a business. You make decisions, solve problems, and figure shit out every day.
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '24px' }}>But when it comes to fitness, you may still find yourself:</p>
          <div style={{ marginBottom: '32px' }}>
            {painPoints.map((p) => (
              <ArrowItem key={p}>{p}</ArrowItem>
            ))}
          </div>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px' }}>
            You don&rsquo;t need another generic plan created for an imaginary woman with a perfectly predictable
            schedule.
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px' }}>
            And you don&rsquo;t need another person telling you to try harder.
          </p>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px' }}>
            You need to understand what has been getting in your way, what will actually work for you, and how to
            keep it working when real life refuses to cooperate.
          </p>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#ce965a', fontSize: 'clamp(20px, 2.4vw, 28px)' }}>
            That&rsquo;s what we&rsquo;re doing during these three days.
          </p>
        </div>
      </section>

      {/* ── "What You'll Walk Away With" ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '90px 20px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(30px, 4vw, 50px)',
              lineHeight: '1.15',
              fontWeight: 400,
              textAlign: 'center',
              marginBottom: '40px',
            }}
          >
            What You&rsquo;ll Walk Away With
          </h2>
          <p style={{ ...bodyP, color: '#45220d', marginBottom: '24px', textAlign: 'center' }}>By the end of the workshop, you&rsquo;ll have:</p>
          <div style={{ marginBottom: '40px' }}>
            {outcomes.map((o) => (
              <CheckItem key={o}>{o}</CheckItem>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#45220d', fontSize: 'clamp(19px, 2.2vw, 26px)', marginBottom: '4px' }}>
              This isn&rsquo;t a three-day body transformation.
            </p>
            <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#ce965a', fontSize: 'clamp(19px, 2.2vw, 26px)' }}>
              It&rsquo;s three days to finally build the strategy behind one.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <AnchorBtn href={LUMA_URL} bg="#2d1506" color="#fbf4e9">
              build my plan
            </AnchorBtn>
          </div>
        </div>
      </section>

      {/* ── "What We're Doing Each Day" ── */}
      <section style={{ backgroundColor: '#525421', padding: '80px 20px 40px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#fbf4e9',
            fontSize: 'clamp(30px, 4.4vw, 52px)',
            lineHeight: '1.15',
            fontWeight: 400,
            textAlign: 'center',
            maxWidth: '760px',
            margin: '0 auto 8px',
          }}
        >
          What We&rsquo;re Doing Each Day
        </h2>
      </section>
      {dayCards.map((d) => (
        <section key={d.day} style={{ backgroundColor: d.bg, padding: '64px 20px' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#ce965a', fontSize: 'clamp(32px, 4.4vw, 48px)', lineHeight: '1', marginBottom: '10px' }}>
              {d.day}
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                fontStyle: 'italic',
                color: '#2d1506',
                fontSize: 'clamp(24px, 3.2vw, 38px)',
                lineHeight: '1.2',
                marginBottom: '20px',
              }}
            >
              {d.title}
            </h3>
            <p style={{ ...bodyP, color: '#45220d', marginBottom: '16px' }}>{d.intro}</p>
            <p style={{ ...bodyP, color: '#45220d', marginBottom: '24px' }}>{d.body}</p>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(206,150,90,0.2)',
                border: '1px solid rgba(206,150,90,0.4)',
                borderRadius: '8px',
                padding: '14px 22px',
                marginBottom: '24px',
              }}
            >
              <span style={{ ...eyebrow, color: '#a67c52', marginRight: '8px' }}>You&rsquo;ll create:</span>
              <span style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#2d1506', fontSize: '18px' }}>
                {d.create}
              </span>
            </div>
            <p style={{ ...bodyP, color: '#45220d' }}>{d.outro}</p>
          </div>
        </section>
      ))}
      <section style={{ backgroundColor: '#e8eeba', padding: '0 20px 80px', textAlign: 'center' }}>
        <AnchorBtn href={LUMA_URL} bg="#525421" color="#fbf4e9">
          join the three-day workshop
        </AnchorBtn>
      </section>

      {/* ── "This Workshop Is for You If…" ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '90px 20px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(30px, 4vw, 50px)',
              lineHeight: '1.15',
              fontWeight: 400,
              textAlign: 'center',
              marginBottom: '40px',
            }}
          >
            This Workshop Is for You If&hellip;
          </h2>
          <div style={{ marginBottom: '40px' }}>
            {forYouIf.map((f) => (
              <CheckItem key={f}>{f}</CheckItem>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ ...bodyP, color: '#45220d', marginBottom: '4px' }}>
              You do not need more rules, more guilt, or another plan that only works when life is quiet.
            </p>
            <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#ce965a', fontSize: 'clamp(19px, 2.2vw, 26px)', marginTop: '12px' }}>
              You need a fitness strategy built for the way you actually live.
            </p>
          </div>
        </div>
      </section>

      {/* ── "Your Business Isn't the Only Thing..." ── */}
      <section style={{ position: 'relative', backgroundColor: '#45220d', padding: '90px 20px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#e8dcc0',
              fontSize: 'clamp(28px, 3.8vw, 46px)',
              lineHeight: '1.2',
              fontWeight: 400,
              marginBottom: '28px',
            }}
          >
            Your Business Isn&rsquo;t the Only Thing That Deserves a Strategy
          </h2>
          <p style={{ ...bodyP, color: '#fbf4e9', marginBottom: '16px' }}>
            If your business plan only worked when nothing unexpected happened, you wouldn&rsquo;t call it a good
            plan.
          </p>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#e8eeba', fontSize: 'clamp(19px, 2.2vw, 26px)', marginBottom: '24px' }}>
            Your fitness plan shouldn&rsquo;t get a pass.
          </p>
          <p style={{ ...bodyP, color: '#fbf4e9', marginBottom: '32px' }}>
            It should account for your goals, your constraints, your preferences, your demanding weeks, and the fact
            that life will continue happening while you pursue results. Over these three days, we&rsquo;ll build
            exactly that.
          </p>
          <p style={{ ...bodyP, color: '#a67c52', marginBottom: '4px', fontStyle: 'italic' }}>Not a perfect plan.</p>
          <p style={{ ...bodyP, color: '#a67c52', marginBottom: '4px', fontStyle: 'italic' }}>Not someone else&rsquo;s plan.</p>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#fbf4e9', fontSize: 'clamp(19px, 2.2vw, 26px)', marginTop: '16px' }}>
            A plan you can start using and keep using in your real life.
          </p>
        </div>
      </section>

      {/* ── final CTA ── */}
      <section style={{ backgroundColor: '#fbf4e9', padding: '100px 20px 110px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              color: '#2d1506',
              fontSize: 'clamp(28px, 4.4vw, 52px)',
              lineHeight: '1.15',
              fontWeight: 400,
              marginBottom: '20px',
            }}
          >
            Founders, Your Fitness Plan Is F***d <em style={{ fontStyle: 'italic', color: '#ce965a' }}>(Respectfully)</em>.
          </h2>
          <p style={{ ...eyebrow, color: '#525421', fontWeight: 700, marginBottom: '16px' }}>
            September 29 through October 1 &nbsp;|&nbsp; Live Online
          </p>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#45220d', fontSize: 'clamp(20px, 2.6vw, 30px)', marginBottom: '48px' }}>
            Come build one that actually works.
          </p>
          <LumaButton id="register-bottom" />
        </div>
      </section>
    </>
  );
}
