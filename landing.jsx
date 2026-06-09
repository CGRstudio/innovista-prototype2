// landing.jsx — Screen 1. InnoVista marketing landing. <Landing variant="desktop"|"mobile" />
(function () {
  const { Icon, Logo } = window;
  const T = window.IV;

  const fD = 'var(--font-display)';
  const fB = 'var(--font-body)';

  // ── shared bits ──────────────────────────────────────────────
  function Btn({ children, primary, full, large, onClick }) {
    const base = {
      fontFamily: fB, fontWeight: 600, cursor: 'pointer', border: 'none',
      borderRadius: 11, display: 'inline-flex', alignItems: 'center', gap: 8,
      justifyContent: 'center', whiteSpace: 'nowrap',
      padding: large ? '15px 26px' : '11px 18px',
      fontSize: large ? 16 : 14.5, width: full ? '100%' : 'auto',
      transition: 'transform .12s, background .15s, box-shadow .15s',
    };
    const skin = primary
      ? { background: T.green, color: '#06140d', boxShadow: `0 0 0 1px ${T.green}, 0 10px 30px -10px ${T.green}` }
      : { background: 'transparent', color: T.text, boxShadow: `inset 0 0 0 1px ${T.line2}` };
    return <button onClick={onClick} style={{ ...base, ...skin }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>{children}</button>;
  }

  function Eyebrow({ children }) {
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: fB,
        fontSize: 12.5, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase',
        color: T.green, padding: '7px 13px', borderRadius: 999,
        background: T.greenGlow, boxShadow: `inset 0 0 0 1px ${T.line2}`,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 99, background: T.green, boxShadow: `0 0 10px ${T.green}` }} />
        {children}
      </div>
    );
  }

  const TRUST = [
    { icon: 'bolt', t: 'Texts back in under 10 seconds', d: 'The second a call goes to voicemail, the homeowner gets a real text — not a “we’ll call you back.”' },
    { icon: 'sparkle', t: 'Qualifies the job before you pick up', d: 'Service, symptom, address and urgency — sorted and scored so you only chase the jobs worth chasing.' },
    { icon: 'calendar', t: 'Drops booked jobs on your calendar', d: 'Confirmed appointments land in your schedule with the tech, window and address already filled in.' },
  ];

  // ── the little SMS proof thread used in the hero ─────────────
  function ProofThread({ scale = 1 }) {
    const Bubble = ({ me, children, sub }) => (
      <div style={{ display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start' }}>
        <div style={{
          maxWidth: '78%', fontFamily: fB, fontSize: 13.5, lineHeight: 1.4,
          padding: '9px 13px', borderRadius: 15,
          borderBottomRightRadius: me ? 5 : 15, borderBottomLeftRadius: me ? 15 : 5,
          background: me ? T.green : T.surface2,
          color: me ? '#06140d' : T.text,
          boxShadow: me ? 'none' : `inset 0 0 0 1px ${T.line}`,
        }}>
          {children}
          {sub && <div style={{ fontSize: 11, marginTop: 3, color: me ? 'rgba(6,20,13,.6)' : T.textDim }}>{sub}</div>}
        </div>
      </div>
    );
    return (
      <div style={{
        width: 320, transform: `scale(${scale})`, transformOrigin: 'top right',
        background: T.bg2, borderRadius: 22, padding: '16px 16px 18px',
        boxShadow: `inset 0 0 0 1px ${T.line2}, 0 40px 80px -30px rgba(0,0,0,.7)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
          <div style={{ width: 30, height: 30, borderRadius: 99, background: T.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
            <Icon.snowflake size={16} color={T.green} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: fB, fontWeight: 600, fontSize: 13, color: T.text }}>Summit Heating &amp; Air</div>
            <div style={{ fontFamily: fB, fontSize: 11, color: T.green, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: 9, background: T.green }} />Answered by InnoVista
            </div>
          </div>
          <div style={{ fontFamily: fB, fontSize: 10.5, color: T.textDim }}>9:41 PM</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Bubble>Sorry we missed you! What’s going on with your system? 🥵</Bubble>
          <Bubble me>AC won’t cool, blowing warm air</Bubble>
          <Bubble>Got it. What’s your zip so I can check we cover you?</Bubble>
          <Bubble me>80027</Bubble>
          <Bubble sub="Today, 2:00–4:00 PM · Marcus D.">You’re booked ✓ We’ll text when the tech is ~30 min out.</Bubble>
        </div>
      </div>
    );
  }

  function Nav({ mobile }) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: mobile ? '56px 20px 16px' : '20px 44px',
        borderBottom: `1px solid ${T.line}`, background: 'rgba(10,15,10,.7)', backdropFilter: 'blur(8px)',
        position: mobile ? 'static' : 'sticky', top: 0, zIndex: 5,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={mobile ? 26 : 30} green={T.green} />
          <span style={{ fontFamily: fD, fontWeight: 700, fontSize: mobile ? 17 : 19, color: T.text, letterSpacing: '-.01em' }}>InnoVista</span>
        </div>
        {mobile ? (
          <Icon.menu size={22} color={T.textMute} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            {['Product', 'How it works', 'Pricing', 'Results'].map((l) => (
              <span key={l} style={{ fontFamily: fB, fontSize: 14.5, color: T.textMute, cursor: 'pointer' }}>{l}</span>
            ))}
            <Btn primary>Book a demo</Btn>
          </div>
        )}
      </div>
    );
  }

  function Hero({ mobile }) {
    return (
      <div style={{
        display: mobile ? 'block' : 'grid',
        gridTemplateColumns: mobile ? undefined : '1.05fr .95fr',
        gap: mobile ? 0 : 48, alignItems: 'center',
        padding: mobile ? '34px 22px 8px' : '70px 44px 60px',
      }}>
        <div>
          <Eyebrow>Built for HVAC contractors</Eyebrow>
          <h1 style={{
            fontFamily: fD, fontWeight: 700, color: T.text, margin: mobile ? '20px 0 0' : '24px 0 0',
            fontSize: mobile ? 29 : 38, lineHeight: 1.12, letterSpacing: '-.02em',
            maxWidth: mobile ? '100%' : 660, textWrap: 'balance',
          }}>
            {mobile
              ? 'Every missed call is a job going to the guy who picked up.'
              : <>Every missed call is a job<br />going to the guy who picked up.</>}
          </h1>
          <p style={{
            fontFamily: fB, color: T.textMute, fontSize: mobile ? 16 : 19, lineHeight: 1.55,
            margin: mobile ? '18px 0 0' : '24px 0 0', maxWidth: 520,
          }}>
            InnoVista answers, texts back, and qualifies every lead in seconds — then puts a booked
            appointment straight on your calendar. Even at 2 a.m. in the middle of July.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: mobile ? 24 : 34, flexDirection: mobile ? 'column' : 'row' }}>
            <Btn primary large full={mobile}>Book a demo <Icon.arrowRight size={18} color="#06140d" /></Btn>
            <Btn large full={mobile}>See it work</Btn>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 22, flexWrap: 'wrap' }}>
            {['No setup fees', 'Live in 48 hours', 'Cancel anytime'].map((x) => (
              <span key={x} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: fB, fontSize: 13.5, color: T.textDim }}>
                <Icon.check size={15} color={T.green} />{x}
              </span>
            ))}
          </div>
        </div>
        {!mobile && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ProofThread />
          </div>
        )}
        {mobile && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
            <ProofThread scale={0.92} />
          </div>
        )}
      </div>
    );
  }

  function TrustBlock({ mobile }) {
    return (
      <div style={{ padding: mobile ? '34px 22px' : '24px 44px 70px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: mobile ? 14 : 20,
        }}>
          {TRUST.map((c) => {
            const I = Icon[c.icon];
            return (
              <div key={c.t} style={{
                background: T.surface, borderRadius: 18, padding: '24px 22px',
                boxShadow: `inset 0 0 0 1px ${T.line}`,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: T.greenGlow,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `inset 0 0 0 1px ${T.line2}`, marginBottom: 16,
                }}>
                  <I size={22} color={T.green} />
                </div>
                <div style={{ fontFamily: fD, fontWeight: 600, fontSize: 17, color: T.text, marginBottom: 8, letterSpacing: '-.01em' }}>{c.t}</div>
                <div style={{ fontFamily: fB, fontSize: 14, lineHeight: 1.5, color: T.textMute }}>{c.d}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function StatBand({ mobile }) {
    const stats = [['38%', 'more booked jobs from the same calls'], ['<10s', 'average text-back time'], ['24/7', 'coverage, nights & weekends included']];
    return (
      <div style={{ margin: mobile ? '0 22px 34px' : '0 44px 70px' }}>
        <div style={{
          background: T.green, borderRadius: 22, padding: mobile ? '26px 22px' : '34px 40px',
          display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: mobile ? 20 : 30,
        }}>
          {stats.map(([n, l], i) => (
            <div key={i} style={{ borderLeft: !mobile && i ? '1px solid rgba(6,20,13,.18)' : 'none', paddingLeft: !mobile && i ? 30 : 0 }}>
              <div style={{ fontFamily: fD, fontWeight: 700, fontSize: mobile ? 40 : 46, color: '#06140d', lineHeight: 1, letterSpacing: '-.02em' }}>{n}</div>
              <div style={{ fontFamily: fB, fontSize: 14.5, color: 'rgba(6,20,13,.72)', marginTop: 8, lineHeight: 1.4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Footer({ mobile }) {
    return (
      <div style={{ borderTop: `1px solid ${T.line}`, padding: mobile ? '26px 22px' : '34px 44px', background: T.bg2 }}>
        <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: mobile ? 18 : 0, justifyContent: 'space-between', alignItems: mobile ? 'flex-start' : 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo size={26} green={T.green} />
            <span style={{ fontFamily: fD, fontWeight: 700, fontSize: 17, color: T.text }}>InnoVista</span>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['Product', 'Pricing', 'Integrations', 'Support', 'Privacy'].map((l) => (
              <span key={l} style={{ fontFamily: fB, fontSize: 13.5, color: T.textDim }}>{l}</span>
            ))}
          </div>
        </div>
        <div style={{ fontFamily: fB, fontSize: 12.5, color: T.textDim, marginTop: 18 }}>© 2026 InnoVista Strategies · Lead capture for the trades.</div>
      </div>
    );
  }

  function Landing({ variant = 'desktop' }) {
    const mobile = variant === 'mobile';
    return (
      <div style={{ background: T.bg, minHeight: '100%', color: T.text }}>
        <Nav mobile={mobile} />
        <Hero mobile={mobile} />
        <TrustBlock mobile={mobile} />
        <StatBand mobile={mobile} />
        <Footer mobile={mobile} />
      </div>
    );
  }

  window.Landing = Landing;
})();
