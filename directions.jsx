// directions.jsx — four editorial / tech-driven hero explorations for InnoVista.
// Each is a self-contained desktop hero crop. Type-led, minimal, green used sparingly.
(function () {
  const GREEN = '#52b788';
  const mono = "'Space Mono', ui-monospace, monospace";
  const grotesk = "'Space Grotesk', sans-serif";
  const body = "'Hanken Grotesk', sans-serif";

  // tiny shared logo mark
  const Mark = ({ size = 26, on = '#0a0f0a', fg = GREEN }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ display: 'block' }}>
      <rect x="1" y="1" width="30" height="30" rx="9" fill={fg} />
      <path d="M9 11.5l4.2 9.5a3 3 0 0 0 5.5 0L23 11.5" stroke={on} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="9.5" r="1.9" fill={on} />
    </svg>
  );

  const W = 1180, H = 740;

  // ── A · Editorial Index ──────────────────────────────────────
  // Magazine masthead energy: hairline rules, mono index labels,
  // oversized tight headline, a standfirst column. Green = one underline.
  function DirEditorial() {
    const ink = '#0a0f0a', paper = '#e9ece8', line = 'rgba(10,15,10,.16)', mute = 'rgba(10,15,10,.55)';
    const Rule = ({ style } = {}) => <div style={{ height: 1, background: line, ...style }} />;
    return (
      <div style={{ width: W, height: H, background: paper, color: ink, fontFamily: body, padding: '46px 56px', display: 'flex', flexDirection: 'column' }}>
        {/* masthead */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Mark size={26} on={paper} fg={ink} />
          <span style={{ fontFamily: grotesk, fontWeight: 700, fontSize: 19, letterSpacing: '-.01em' }}>InnoVista</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 34, fontFamily: mono, fontSize: 12, letterSpacing: '.04em', textTransform: 'uppercase', color: mute }}>
            <span>Product</span><span>Method</span><span>Results</span><span style={{ color: ink }}>Book a demo →</span>
          </div>
        </div>
        <Rule style={{ margin: '18px 0 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 11.5, letterSpacing: '.06em', textTransform: 'uppercase', color: mute, padding: '10px 0' }}>
          <span>Issue 01 — Lead Capture</span><span>For HVAC Contractors</span><span>Est. 2026</span>
        </div>
        <Rule />

        {/* headline block */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.55fr .9fr', gap: 48, paddingTop: 40 }}>
          <div>
            <h1 style={{ fontFamily: grotesk, fontWeight: 600, fontSize: 76, lineHeight: 0.98, letterSpacing: '-.035em', margin: 0 }}>
              The missed call<br />is the lost job.<br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                We end both.
                <span style={{ position: 'absolute', left: 0, right: 0, bottom: 6, height: 7, background: GREEN, zIndex: -1, opacity: .9 }} />
              </span>
            </h1>
          </div>
          <div style={{ paddingTop: 8 }}>
            <div style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: '.08em', textTransform: 'uppercase', color: mute, marginBottom: 14 }}>The standfirst</div>
            <p style={{ fontSize: 16.5, lineHeight: 1.55, margin: 0, color: 'rgba(10,15,10,.78)' }}>
              InnoVista answers, texts back, and qualifies every lead in seconds — then books the job on
              your calendar. Even at 2 a.m. in the middle of July.
            </p>
            <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontFamily: grotesk, fontWeight: 600, fontSize: 15, whiteSpace: 'nowrap', background: ink, color: paper, padding: '12px 20px', borderRadius: 2 }}>Book a demo</span>
              <span style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: '.04em', color: mute, whiteSpace: 'nowrap', borderBottom: `1px solid ${ink}`, paddingBottom: 2 }}>See it work →</span>
            </div>
          </div>
        </div>
        <Rule />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 12, letterSpacing: '.04em', color: mute, paddingTop: 12 }}>
          <span><b style={{ color: ink }}>+38%</b> booked jobs</span>
          <span><b style={{ color: ink }}>&lt;10s</b> text-back</span>
          <span><b style={{ color: ink }}>24/7</b> coverage</span>
          <span><b style={{ color: ink }}>2,000+</b> homeowners</span>
        </div>
      </div>
    );
  }

  // ── B · Technical Spec ───────────────────────────────────────
  // Dev-tool precision: faint grid, corner crosshairs, mono annotations,
  // bracketed green accents. Near-black. Linear/Vercel register.
  function DirTechnical() {
    const bg = '#070b08', ink = '#e7efe9', mute = '#6c8073', line = 'rgba(120,170,140,.14)';
    const Tick = ({ s }) => (
      <div style={{ position: 'absolute', width: 9, height: 9, ...s }}>
        <div style={{ position: 'absolute', left: 0, top: 4, width: 9, height: 1, background: GREEN }} />
        <div style={{ position: 'absolute', left: 4, top: 0, width: 1, height: 9, background: GREEN }} />
      </div>
    );
    return (
      <div style={{ width: W, height: H, background: bg, color: ink, fontFamily: body, position: 'relative', overflow: 'hidden',
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
        backgroundSize: '52px 52px' }}>
        {/* corner crosshairs */}
        <Tick s={{ left: 40, top: 40 }} /><Tick s={{ right: 40, top: 40 }} /><Tick s={{ left: 40, bottom: 40 }} /><Tick s={{ right: 40, bottom: 40 }} />

        {/* top bar */}
        <div style={{ position: 'absolute', top: 40, left: 64, right: 64, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Mark size={24} on={bg} fg={GREEN} />
          <span style={{ fontFamily: grotesk, fontWeight: 700, fontSize: 17, letterSpacing: '-.01em' }}>InnoVista</span>
          <span style={{ fontFamily: mono, fontSize: 11, color: mute, letterSpacing: '.05em' }}>v2.4 / lead-engine</span>
          <span style={{ marginLeft: 'auto', fontFamily: mono, fontSize: 11.5, color: GREEN, letterSpacing: '.06em' }}>● SYSTEM ONLINE — 24/7</span>
        </div>

        {/* center spec block */}
        <div style={{ position: 'absolute', left: 64, top: 200, right: 64 }}>
          <div style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: '.14em', textTransform: 'uppercase', color: GREEN, marginBottom: 22 }}>
            [ AI LEAD CAPTURE · HOME SERVICES ]
          </div>
          <h1 style={{ fontFamily: grotesk, fontWeight: 500, fontSize: 70, lineHeight: 1.02, letterSpacing: '-.03em', margin: 0, maxWidth: 880 }}>
            Capture every lead.<br />Qualify in <span style={{ color: GREEN }}>&lt;10s</span>. Book while<br />you’re under the house.
          </h1>
          <div style={{ display: 'flex', gap: 28, marginTop: 40, alignItems: 'center' }}>
            <span style={{ fontFamily: grotesk, fontWeight: 600, fontSize: 14.5, whiteSpace: 'nowrap', background: GREEN, color: '#06140d', padding: '12px 22px', borderRadius: 7 }}>Book a demo →</span>
            <span style={{ fontFamily: mono, fontSize: 12.5, color: mute, letterSpacing: '.04em', boxShadow: `inset 0 0 0 1px ${line}`, padding: '12px 18px', borderRadius: 7 }}>$ run live_demo</span>
          </div>
        </div>

        {/* bottom annotation row */}
        <div style={{ position: 'absolute', left: 64, right: 64, bottom: 56, display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 11.5, color: mute, letterSpacing: '.05em', borderTop: `1px solid ${line}`, paddingTop: 14 }}>
          <span>01 / CALL MISSED</span><span>02 / TEXT BACK</span><span>03 / QUALIFY</span><span>04 / BOOK</span><span style={{ color: GREEN }}>→ CALENDAR</span>
        </div>
      </div>
    );
  }

  // ── C · Quiet Statement ──────────────────────────────────────
  // Maximum negative space. One centered statement, one word in green.
  // Apple-keynote / gallery-wall calm. Cream paper.
  function DirQuiet() {
    const paper = '#ecefe9', ink = '#10160f', mute = 'rgba(16,22,15,.5)';
    return (
      <div style={{ width: W, height: H, background: paper, color: ink, fontFamily: body, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11, padding: '44px 0 0' }}>
          <Mark size={24} on={paper} fg={ink} />
          <span style={{ fontFamily: grotesk, fontWeight: 700, fontSize: 18, letterSpacing: '-.01em' }}>InnoVista</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 80px' }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: mute, marginBottom: 30 }}>AI lead capture for HVAC</div>
          <h1 style={{ fontFamily: grotesk, fontWeight: 500, fontSize: 60, lineHeight: 1.12, letterSpacing: '-.03em', margin: 0, maxWidth: 880 }}>
            Never miss another job to the contractor who simply <span style={{ color: GREEN, fontWeight: 600 }}>answered first.</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(16,22,15,.62)', maxWidth: 520, margin: '28px 0 0' }}>
            Instant text-back, AI qualification, and automatic booking — running quietly behind your number, around the clock.
          </p>
          <div style={{ marginTop: 38 }}>
            <span style={{ fontFamily: grotesk, fontWeight: 600, fontSize: 15, whiteSpace: 'nowrap', background: ink, color: paper, padding: '14px 26px', borderRadius: 999 }}>Book a demo</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, fontFamily: mono, fontSize: 11.5, letterSpacing: '.06em', textTransform: 'uppercase', color: mute, paddingBottom: 44 }}>
          <span>No setup fees</span><span>·</span><span>Live in 48 hours</span><span>·</span><span>Cancel anytime</span>
        </div>
      </div>
    );
  }

  // ── D · Split Index ──────────────────────────────────────────
  // Asymmetric editorial: oversized headline left, numbered method
  // list right with mono numerals + hairlines. Green marks the active step.
  function DirSplit() {
    const bg = '#0a0f0a', ink = '#e7efe9', mute = '#8a9b90', line = 'rgba(120,170,140,.16)';
    const steps = [
      ['01', 'Call slips through', 'Missed, after-hours, or a midnight web form.'],
      ['02', 'Text back in <10s', 'A real message, not “we’ll call you back.”'],
      ['03', 'AI qualifies', 'Service, symptom, address, urgency — scored.'],
      ['04', 'Job booked', 'Dropped on your calendar with the tech assigned.'],
    ];
    return (
      <div style={{ width: W, height: H, background: bg, color: ink, fontFamily: body, padding: '46px 56px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${line}`, paddingBottom: 20 }}>
          <Mark size={26} on={bg} fg={GREEN} />
          <span style={{ fontFamily: grotesk, fontWeight: 700, fontSize: 19, letterSpacing: '-.01em' }}>InnoVista</span>
          <span style={{ marginLeft: 'auto', fontFamily: mono, fontSize: 11.5, letterSpacing: '.08em', textTransform: 'uppercase', color: mute }}>The method ↘</span>
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 56, paddingTop: 46 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: '.14em', textTransform: 'uppercase', color: GREEN, marginBottom: 22 }}>AI lead capture / HVAC</div>
            <h1 style={{ fontFamily: grotesk, fontWeight: 600, fontSize: 66, lineHeight: 1.0, letterSpacing: '-.035em', margin: 0 }}>
              Every call answered. Every job booked.
            </h1>
            <p style={{ fontSize: 16.5, lineHeight: 1.55, color: mute, margin: '26px 0 0', maxWidth: 420 }}>
              The AI front desk that never sleeps — built for contractors who are done losing work to voicemail.
            </p>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 18 }}>
              <span style={{ fontFamily: grotesk, fontWeight: 600, fontSize: 15, whiteSpace: 'nowrap', background: GREEN, color: '#06140d', padding: '13px 22px', borderRadius: 8 }}>Book a demo</span>
              <span style={{ fontFamily: mono, fontSize: 12.5, color: mute, letterSpacing: '.04em' }}>see it work →</span>
            </div>
          </div>
          <div style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {steps.map(([n, t, d], i) => (
              <div key={n} style={{ display: 'flex', gap: 18, padding: '18px 0', borderTop: `1px solid ${line}`, borderBottom: i === steps.length - 1 ? `1px solid ${line}` : 'none' }}>
                <span style={{ fontFamily: mono, fontSize: 13, color: i === 1 ? GREEN : mute, paddingTop: 3 }}>{n}</span>
                <div>
                  <div style={{ fontFamily: grotesk, fontWeight: 600, fontSize: 19, color: i === 1 ? GREEN : ink, letterSpacing: '-.01em' }} dangerouslySetInnerHTML={{ __html: t }} />
                  <div style={{ fontSize: 13.5, lineHeight: 1.45, color: mute, marginTop: 4 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── C2 · Quiet Statement (DARK) ──────────────────────────────
  // Same calm/whitespace as C, on the deep green-black brand bg.
  function DirQuietDark() {
    const bg = '#0a0f0a', ink = '#e7efe9', mute = 'rgba(231,239,233,.5)', line = 'rgba(120,170,140,.16)';
    return (
      <div style={{ width: W, height: H, background: bg, color: ink, fontFamily: body, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11, padding: '44px 0 0' }}>
          <Mark size={24} on={bg} fg={GREEN} />
          <span style={{ fontFamily: grotesk, fontWeight: 700, fontSize: 18, letterSpacing: '-.01em' }}>InnoVista</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 80px' }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: GREEN, marginBottom: 30 }}>AI lead capture for HVAC</div>
          <h1 style={{ fontFamily: grotesk, fontWeight: 500, fontSize: 60, lineHeight: 1.12, letterSpacing: '-.03em', margin: 0, maxWidth: 880 }}>
            Never miss another job to the contractor who simply <span style={{ color: GREEN, fontWeight: 600 }}>answered first.</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: mute, maxWidth: 520, margin: '28px 0 0' }}>
            Instant text-back, AI qualification, and automatic booking — running quietly behind your number, around the clock.
          </p>
          <div style={{ marginTop: 38 }}>
            <span style={{ fontFamily: grotesk, fontWeight: 600, fontSize: 15, whiteSpace: 'nowrap', background: GREEN, color: '#06140d', padding: '14px 26px', borderRadius: 999 }}>Book a demo</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, fontFamily: mono, fontSize: 11.5, letterSpacing: '.06em', textTransform: 'uppercase', color: mute, paddingBottom: 44, borderTop: `1px solid ${line}`, paddingTop: 22, margin: '0 56px' }}>
          <span>No setup fees</span><span style={{ color: line }}>·</span><span>Live in 48 hours</span><span style={{ color: line }}>·</span><span>Cancel anytime</span>
        </div>
      </div>
    );
  }

  Object.assign(window, { DirEditorial, DirTechnical, DirQuiet, DirQuietDark, DirSplit, DIR_W: W, DIR_H: H });
})();
