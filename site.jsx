// site.jsx — InnoVista marketing site, Direction D (editorial / tech-driven).
// System: deep green-black, Space Grotesk display, Hanken body, Space Mono labels.
// Hairline rules, mono uppercase section labels, numbered indices, green once per section.
(function () {
  const { useState, useEffect } = React;
  const { Icon, Logo } = window;
  const T = window.IV;
  const fD = "'Space Grotesk', sans-serif";
  const fB = "'Hanken Grotesk', sans-serif";
  const fM = "'Space Mono', ui-monospace, monospace";
  const MAXW = 1140;

  function useViewport() {
    const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
    useEffect(() => {
      const r = () => setW(window.innerWidth);
      window.addEventListener('resize', r);
      return () => window.removeEventListener('resize', r);
    }, []);
    return { w, mobile: w < 760, tablet: w < 1040 };
  }

  // ── shared primitives ────────────────────────────────────────
  const Rule = ({ m = 0 }) => <div style={{ height: 1, background: T.line, margin: m }} />;

  function Label({ children, n }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: fM, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: T.green }}>
        {n && <span style={{ color: T.green }}>{n}</span>}
        <span style={{ width: 22, height: 1, background: T.green, opacity: .6 }} />
        <span style={{ color: T.green }}>{children}</span>
      </div>
    );
  }

  function Primary({ children, onClick, big }) {
    return (
      <a href="#demo" onClick={onClick} style={{
        fontFamily: fD, fontWeight: 600, fontSize: big ? 15.5 : 14.5, whiteSpace: 'nowrap',
        textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
        background: T.green, color: '#06140d', padding: big ? '14px 24px' : '11px 19px',
        borderRadius: 9, transition: 'transform .12s',
      }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>{children}</a>
    );
  }

  function TextLink({ children, onClick }) {
    return (
      <a href="#" onClick={onClick} style={{ fontFamily: fM, fontSize: 13, letterSpacing: '.03em', color: T.textMute, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}>
        {children} <span style={{ color: T.green }}>→</span>
      </a>
    );
  }

  function Section({ id, children, pad, vp }) {
    return (
      <section id={id} style={{ maxWidth: MAXW, margin: '0 auto', padding: pad || (vp.mobile ? '56px 22px' : '90px 32px') }}>{children}</section>
    );
  }

  // Full-bleed background band with an edge-to-edge top divider.
  // tone: 'base' (#0a0f0a) | 'raised' (subtly lifted, green-tinted black)
  const RAISE = '#10211a';
  function Band({ id, tone = 'base', vp, pad, children }) {
    return (
      <section id={id} style={{ background: tone === 'raised' ? RAISE : 'transparent', borderTop: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: MAXW, margin: '0 auto', padding: pad || (vp.mobile ? '52px 22px' : '84px 32px') }}>{children}</div>
      </section>
    );
  }

  // Chapter opener: index marker + mono label on the left, short descriptor right.
  function SectionHead({ index, label, note, vp }) {
    return (
      <div style={{ marginBottom: vp.mobile ? 34 : 50 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, paddingBottom: 14, borderBottom: `1px solid ${T.line}` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ fontFamily: fM, fontSize: vp.mobile ? 13 : 15, fontWeight: 700, color: T.green }}>{index}</span>
            <span style={{ fontFamily: fM, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: T.textMute }}>{label}</span>
          </div>
          {note && !vp.mobile && <span style={{ fontFamily: fM, fontSize: 11.5, letterSpacing: '.06em', textTransform: 'uppercase', color: T.textDim, whiteSpace: 'nowrap' }}>{note}</span>}
        </div>
      </div>
    );
  }

  // ── Nav ──────────────────────────────────────────────────────
  function Nav({ vp, onDemo }) {
    const links = [['Method', 'method'], ['Features', 'features'], ['Results', 'results']];
    return (
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(10,15,10,.72)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: MAXW, margin: '0 auto', padding: vp.mobile ? '15px 22px' : '17px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
            <Logo size={vp.mobile ? 26 : 28} green={T.green} />
            <span style={{ fontFamily: fD, fontWeight: 700, fontSize: vp.mobile ? 18 : 19, color: T.text, letterSpacing: '-.01em' }}>InnoVista</span>
          </a>
          {!vp.tablet && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              {links.map(([l, h]) => (
                <a key={l} href={`#${h}`} style={{ fontFamily: fM, fontSize: 12.5, letterSpacing: '.06em', textTransform: 'uppercase', color: T.textMute, textDecoration: 'none' }}>{l}</a>
              ))}
            </nav>
          )}
          <Primary onClick={onDemo}>Book a demo</Primary>
        </div>
      </header>
    );
  }

  // ── Hero (the Split Index) ───────────────────────────────────
  function Hero({ vp, onDemo, onChat }) {
    const steps = [
      ['01', 'Call slips through', 'Missed, after-hours, or a midnight web form.'],
      ['02', 'Text back in <10s', 'A real message — not “we’ll call you back.”'],
      ['03', 'AI qualifies', 'Service, symptom, address, urgency — scored.'],
      ['04', 'Job booked', 'Dropped on your calendar, tech assigned.'],
    ];
    return (
      <section id="top">
        <div style={{ maxWidth: MAXW, margin: '0 auto', padding: vp.mobile ? '40px 22px 0' : '74px 32px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: vp.tablet ? '1fr' : '1.22fr 1fr', gap: vp.tablet ? 44 : 60, alignItems: 'start' }}>
            {/* left */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Label>AI lead capture / HVAC</Label>
              <h1 style={{ fontFamily: fD, fontWeight: 600, fontSize: vp.mobile ? 44 : 'clamp(48px, 6vw, 68px)', lineHeight: 0.99, letterSpacing: '-.035em', margin: '24px 0 0' }}>
                Every call answered. Every job booked.
              </h1>
              <p style={{ fontFamily: fB, fontSize: vp.mobile ? 16 : 17.5, lineHeight: 1.55, color: T.textMute, margin: '24px 0 0', maxWidth: 440 }}>
                The AI front desk that never sleeps — built for contractors who are done losing work to voicemail.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 32, flexWrap: 'wrap' }}>
                <Primary big onClick={onDemo}>Book a demo</Primary>
                <TextLink onClick={onChat}>see it work</TextLink>
              </div>
            </div>
            {/* right — numbered method */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {steps.map(([n, t, d], i) => (
                <div key={n} style={{ display: 'flex', gap: 18, padding: vp.mobile ? '16px 0' : '20px 0', borderTop: `1px solid ${T.line}`, borderBottom: i === steps.length - 1 ? `1px solid ${T.line}` : 'none' }}>
                  <span style={{ fontFamily: fM, fontSize: 13, color: i === 1 ? T.green : T.textDim, paddingTop: 3 }}>{n}</span>
                  <div>
                    <div style={{ fontFamily: fD, fontWeight: 600, fontSize: vp.mobile ? 18 : 19.5, color: i === 1 ? T.green : T.text, letterSpacing: '-.01em' }}>{t}</div>
                    <div style={{ fontFamily: fB, fontSize: 14, lineHeight: 1.45, color: T.textMute, marginTop: 4 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Trust strip ──────────────────────────────────────────────
  function TrustStrip({ vp }) {
    const names = ['Front Range HVAC', 'Summit Heating', 'BluePeak Air', 'Cornerstone Mechanical', 'Apex Comfort'];
    return (
      <div style={{ borderTop: `1px solid ${T.line}`, marginTop: vp.mobile ? 56 : 88 }}>
        <div style={{ maxWidth: MAXW, margin: '0 auto', padding: vp.mobile ? '22px' : '24px 32px', display: 'flex', alignItems: 'center', gap: vp.mobile ? 16 : 36, flexWrap: 'wrap', justifyContent: vp.mobile ? 'center' : 'space-between' }}>
          <span style={{ fontFamily: fM, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: T.textDim, whiteSpace: 'nowrap' }}>Trusted by trades teams</span>
          {names.map((n) => <span key={n} style={{ fontFamily: fD, fontWeight: 700, fontSize: vp.mobile ? 14 : 16, color: T.textMute, opacity: .65, letterSpacing: '-.01em', whiteSpace: 'nowrap' }}>{n}</span>)}
        </div>
      </div>
    );
  }

  // ── In action — what homeowners see (SMS proof) ──────────────
  function ProofThread() {
    const B = ({ me, children, sub }) => (
      <div style={{ display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start' }}>
        <div style={{ maxWidth: '82%', fontFamily: fB, fontSize: 14, lineHeight: 1.42, padding: '9px 13px', borderRadius: 15, borderBottomRightRadius: me ? 5 : 15, borderBottomLeftRadius: me ? 15 : 5, background: me ? T.green : T.surface2, color: me ? '#06140d' : T.text, boxShadow: me ? 'none' : `inset 0 0 0 1px ${T.line}` }}>
          {children}
          {sub && <div style={{ fontSize: 11, marginTop: 3, color: me ? 'rgba(6,20,13,.6)' : T.textDim }}>{sub}</div>}
        </div>
      </div>
    );
    return (
      <div style={{ width: '100%', maxWidth: 380, background: T.bg2, borderRadius: 20, padding: '18px', boxShadow: `inset 0 0 0 1px ${T.line2}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 14, borderBottom: `1px solid ${T.line}`, marginBottom: 14 }}>
          <div style={{ width: 30, height: 30, borderRadius: 99, background: T.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}` }}><Icon.snowflake size={16} color={T.green} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: fD, fontWeight: 600, fontSize: 13, color: T.text }}>Summit Heating &amp; Air</div>
            <div style={{ fontFamily: fM, fontSize: 10.5, letterSpacing: '.04em', color: T.green }}>ANSWERED BY INNOVISTA</div>
          </div>
          <div style={{ fontFamily: fM, fontSize: 10.5, color: T.textDim }}>9:41 PM</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <B>Sorry we missed you! What’s going on with your system? 🥵</B>
          <B me>AC won’t cool, blowing warm air</B>
          <B>Got it — what’s your zip so I can check we cover you?</B>
          <B me>80027</B>
          <B sub="Today, 2:00–4:00 PM · Marcus D.">You’re booked ✓ We’ll text when the tech is ~30 min out.</B>
        </div>
      </div>
    );
  }

  function InAction({ vp, onChat }) {
    return (
      <Band id="action" tone="raised" vp={vp}>
        <SectionHead index="A." label="What your customers feel" note="The homeowner side" vp={vp} />
        <div style={{ display: 'grid', gridTemplateColumns: vp.tablet ? '1fr' : '1fr 1fr', gap: vp.tablet ? 36 : 60, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: fD, fontWeight: 600, fontSize: vp.mobile ? 30 : 'clamp(32px, 4vw, 42px)', lineHeight: 1.08, letterSpacing: '-.025em', color: T.text, margin: 0, maxWidth: 440 }}>
              A text back so fast it feels like you never missed them.
            </h2>
            <p style={{ fontFamily: fB, fontSize: vp.mobile ? 15.5 : 17, lineHeight: 1.55, color: T.textMute, margin: '20px 0 0', maxWidth: 430 }}>
              No phone tree, no “leave a message.” Homeowners get a real conversation that sounds like
              your best front-desk rep — and a booked appointment before they’ve called anyone else.
            </p>
            <div style={{ marginTop: 26 }}><TextLink onClick={onChat}>try the live demo</TextLink></div>
          </div>
          <div style={{ display: 'flex', justifyContent: vp.tablet ? 'center' : 'flex-end' }}><ProofThread /></div>
        </div>
      </Band>
    );
  }

  // ── Features (editorial spec rows) ───────────────────────────
  function Features({ vp }) {
    const feats = [
      ['01', 'Texts back in under 10 seconds', 'The moment a call hits voicemail, the homeowner gets a real message — while they’re still deciding who to call.'],
      ['02', 'Qualifies before you pick up', 'Service, symptom, address and urgency — sorted and scored, so you only chase the jobs worth chasing.'],
      ['03', 'Books to your calendar', 'Confirmed appointments land with the tech, time window and address already filled in.'],
      ['04', 'Sounds like your front desk', 'Trained on your services, pricing and tone — homeowners can’t tell it from your best CSR.'],
      ['05', 'One pipeline for every lead', 'Calls, web forms, Google and referrals flow into a single board your team actually works.'],
      ['06', 'Never sleeps, never forgets', 'Nights, weekends, peak season — every lead gets the same fast, consistent follow-up.'],
    ];
    return (
      <Band id="features" tone="base" vp={vp}>
        <SectionHead index="B." label="Features" note="What runs behind your number" vp={vp} />
        <div style={{ maxWidth: 560, marginBottom: vp.mobile ? 30 : 44 }}>
          <h2 style={{ fontFamily: fD, fontWeight: 600, fontSize: vp.mobile ? 30 : 'clamp(32px, 4vw, 44px)', lineHeight: 1.06, letterSpacing: '-.025em', color: T.text, margin: 0 }}>
            Everything you need to stop bleeding leads.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: vp.mobile ? '1fr' : '1fr 1fr', columnGap: 48, rowGap: 0 }}>
          {feats.map(([n, t, d]) => (
            <div key={n} style={{ display: 'flex', gap: 18, padding: vp.mobile ? '20px 0' : '26px 0', borderTop: `1px solid ${T.line}` }}>
              <span style={{ fontFamily: fM, fontSize: 12.5, color: T.green, paddingTop: 4 }}>{n}</span>
              <div>
                <div style={{ fontFamily: fD, fontWeight: 600, fontSize: vp.mobile ? 18 : 20, color: T.text, letterSpacing: '-.01em' }}>{t}</div>
                <div style={{ fontFamily: fB, fontSize: 14.5, lineHeight: 1.5, color: T.textMute, marginTop: 7 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </Band>
    );
  }

  // ── Results (mono numerals) ──────────────────────────────────
  function Results({ vp }) {
    const stats = [['+38%', 'more booked jobs from the same calls', true], ['<10s', 'average text-back time', false], ['24/7', 'coverage, nights & weekends', false], ['2,000+', 'homeowners served', false]];
    return (
      <Band id="results" tone="raised" vp={vp}>
        <SectionHead index="C." label="Results" note="Measured across 120+ accounts" vp={vp} />
        <div style={{ display: 'grid', gridTemplateColumns: vp.mobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: vp.mobile ? '28px 20px' : 24 }}>
          {stats.map(([n, l, hot], i) => (
            <div key={i}>
              <div style={{ fontFamily: fD, fontWeight: 600, fontSize: vp.mobile ? 38 : 'clamp(40px, 4.6vw, 56px)', letterSpacing: '-.03em', lineHeight: 1, color: hot ? T.green : T.text }}>{n}</div>
              <div style={{ fontFamily: fB, fontSize: 13.5, lineHeight: 1.4, color: T.textMute, marginTop: 12, maxWidth: 200 }}>{l}</div>
            </div>
          ))}
        </div>
      </Band>
    );
  }

  // ── CTA ──────────────────────────────────────────────────────
  function CTASection({ vp, onDemo, onChat }) {
    return (
      <Band id="demo" tone="base" vp={vp} pad={vp.mobile ? '64px 22px' : '104px 32px'}>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}><Label>Book a demo</Label></div>
          <h2 style={{ fontFamily: fD, fontWeight: 600, fontSize: vp.mobile ? 34 : 'clamp(38px, 5vw, 56px)', lineHeight: 1.04, letterSpacing: '-.03em', color: T.text, margin: 0, textWrap: 'balance' }}>
            See InnoVista answer a lead in real time.
          </h2>
          <p style={{ fontFamily: fB, fontSize: vp.mobile ? 16 : 18, lineHeight: 1.55, color: T.textMute, margin: '20px auto 0', maxWidth: 480 }}>
            Tap the chat in the corner to walk a homeowner from a missed call to a booked job — or book a
            15-minute demo and we’ll set it up on your number.
          </p>
          <div style={{ display: 'flex', gap: 22, marginTop: 34, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Primary big onClick={onDemo}>Book a demo</Primary>
            <TextLink onClick={onChat}>try the live demo</TextLink>
          </div>
        </div>
      </Band>
    );
  }

  // ── Footer ───────────────────────────────────────────────────
  function Footer({ vp }) {
    const cols = [['Product', ['Features', 'Method', 'Pricing', 'Integrations']], ['Company', ['About', 'Careers', 'Contact', 'Blog']], ['Legal', ['Privacy', 'Terms', 'Security']]];
    return (
      <footer style={{ borderTop: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: MAXW, margin: '0 auto', padding: vp.mobile ? '40px 22px 28px' : '56px 32px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: vp.mobile ? '1fr' : '1.5fr repeat(3, 1fr)', gap: vp.mobile ? 28 : 40 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <Logo size={26} green={T.green} />
                <span style={{ fontFamily: fD, fontWeight: 700, fontSize: 18, color: T.text }}>InnoVista</span>
              </div>
              <p style={{ fontFamily: fB, fontSize: 14, lineHeight: 1.55, color: T.textMute, maxWidth: 270, margin: 0 }}>
                AI lead capture and automated booking for home-service businesses. Stop missing jobs.
              </p>
            </div>
            {cols.map(([h, items]) => (
              <div key={h}>
                <div style={{ fontFamily: fM, fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase', color: T.textDim, marginBottom: 16 }}>{h}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {items.map((it) => <a key={it} href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: fB, fontSize: 13.5, color: T.textMute, textDecoration: 'none' }}>{it}</a>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: vp.mobile ? 'column' : 'row', gap: 10, justifyContent: 'space-between', alignItems: vp.mobile ? 'flex-start' : 'center', marginTop: 44, paddingTop: 22, borderTop: `1px solid ${T.line}` }}>
            <span style={{ fontFamily: fM, fontSize: 11.5, letterSpacing: '.04em', color: T.textDim }}>© 2026 INNOVISTA STRATEGIES</span>
            <span style={{ fontFamily: fM, fontSize: 11.5, letterSpacing: '.04em', color: T.textDim }}>LEAD CAPTURE FOR THE TRADES</span>
          </div>
        </div>
      </footer>
    );
  }

  // ── floating chat widget (live homeowner demo) ───────────────
  function ChatWidget({ vp, openState }) {
    const [open, setOpen] = openState;
    const flow = window.useChatFlow(open);
    const ChatBody = window.ChatBody;
    useEffect(() => { window.__ivOpenChat = () => setOpen(true); }, []);
    const panelW = vp.mobile ? '100vw' : 384;
    const panelH = vp.mobile ? '100dvh' : 'min(620px, calc(100vh - 110px))';
    return (
      <React.Fragment>
        {open && (
          <div style={{ position: 'fixed', zIndex: 60, right: vp.mobile ? 0 : 24, bottom: vp.mobile ? 0 : 96, width: panelW, height: panelH, background: T.bg, borderRadius: vp.mobile ? 0 : 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: `inset 0 0 0 1px ${T.line2}, 0 40px 80px -20px rgba(0,0,0,.7)`, animation: 'ivslideup .28s cubic-bezier(.2,.8,.2,1)' }}>
            <div style={{ flexShrink: 0, background: 'rgba(13,19,15,.95)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${T.line}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: vp.mobile ? '44px 16px 12px' : '14px 16px' }}>
                <div style={{ width: 38, height: 38, borderRadius: 99, background: T.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}` }}><Icon.snowflake size={20} color={T.green} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: fD, fontWeight: 700, fontSize: 15, color: T.text }}>InnoVista AI <span style={{ fontFamily: fM, fontWeight: 400, fontSize: 10, letterSpacing: '.06em', color: T.green, background: T.greenGlow, padding: '2px 7px', borderRadius: 6, marginLeft: 4 }}>LIVE DEMO</span></div>
                  <div style={{ fontFamily: fB, fontSize: 11.5, color: T.green, display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}><span style={{ width: 5, height: 5, borderRadius: 9, background: T.green, boxShadow: `0 0 8px ${T.green}` }} />replies instantly</div>
                </div>
                <div onClick={flow.reset} title="Restart" style={{ cursor: 'pointer', width: 32, height: 32, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}`, marginRight: 4 }}><Icon.bell size={16} color={T.textMute} /></div>
                <div onClick={() => setOpen(false)} title="Close" style={{ cursor: 'pointer', width: 32, height: 32, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}` }}><Icon.plus size={18} color={T.textMute} style={{ transform: 'rotate(45deg)' }} /></div>
              </div>
            </div>
            <ChatBody flow={flow} pad={16} bottomPad={vp.mobile ? 28 : 18} />
          </div>
        )}
        {!(open && vp.mobile) && (
          <button onClick={() => setOpen((o) => !o)} title={open ? 'Close chat' : 'Chat with us'} style={{ position: 'fixed', zIndex: 61, right: 24, bottom: 24, width: 62, height: 62, borderRadius: 999, border: 'none', cursor: 'pointer', background: T.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 16px 34px -10px ${T.green}` }}>
            {!open && <span style={{ position: 'absolute', inset: 0, borderRadius: 999, animation: 'ivpulse 2.4s infinite' }} />}
            {open ? <Icon.plus size={26} color="#06140d" style={{ transform: 'rotate(45deg)' }} /> : <Icon.chat size={27} color="#06140d" />}
            {!open && <span style={{ position: 'absolute', top: -2, right: -2, width: 20, height: 20, borderRadius: 99, background: '#06140d', color: T.green, fontFamily: fM, fontWeight: 700, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 2px ${T.green}` }}>1</span>}
          </button>
        )}
      </React.Fragment>
    );
  }

  function Site() {
    const vp = useViewport();
    const openState = useState(false);
    const onDemo = (e) => { if (e) e.preventDefault(); openState[1](true); };
    const onChat = (e) => { if (e) e.preventDefault(); openState[1](true); };
    return (
      <div style={{ background: T.bg, minHeight: '100vh', color: T.text }}>
        <Nav vp={vp} onDemo={onDemo} />
        <Hero vp={vp} onDemo={onDemo} onChat={onChat} />
        <TrustStrip vp={vp} />
        <InAction vp={vp} onChat={onChat} />
        <Features vp={vp} />
        <Results vp={vp} />
        <CTASection vp={vp} onDemo={onDemo} onChat={onChat} />
        <Footer vp={vp} />
        <ChatWidget vp={vp} openState={openState} />
      </div>
    );
  }

  window.InnoVistaSite = Site;
})();
