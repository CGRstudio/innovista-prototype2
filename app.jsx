// app.jsx — Figma-style canvas that lays out the three screens + Tweaks panel.
(function () {
  const { useState, useEffect, useLayoutEffect, useRef } = React;
  const { Landing, Chatbot, Dashboard, ChromeWindow, IOSDevice, Logo } = window;
  const {
    useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle,
  } = window;
  const T = window.IV;

  const PAIRS = {
    sharp:     { display: "'Space Grotesk', sans-serif", body: "'Hanken Grotesk', sans-serif", label: 'Sharp' },
    technical: { display: "'Sora', sans-serif",          body: "'Inter Tight', sans-serif",   label: 'Technical' },
    warm:      { display: "'Poppins', sans-serif",       body: "'Figtree', sans-serif",       label: 'Warm' },
  };

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "fontPair": "sharp",
    "canvas": "dark",
    "labels": true
  }/*EDITMODE-END*/;

  function FrameLabel({ n, title, caption, light }) {
    return (
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 11, marginBottom: 14, paddingLeft: 2 }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12,
          color: T.green, background: 'rgba(82,183,136,.14)', padding: '3px 8px', borderRadius: 6,
          letterSpacing: '.06em',
        }}>{n}</span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, color: light ? '#3a3f3c' : '#e7efe9' }}>{title}</span>
        <span style={{ fontFamily: "'Hanken Grotesk', monospace", fontSize: 12.5, color: light ? '#9aa39d' : '#6c8073', letterSpacing: '.02em' }}>{caption}</span>
      </div>
    );
  }

  function Frame({ n, title, caption, show, light, children }) {
    return (
      <div style={{ display: 'inline-block' }}>
        {show && <FrameLabel n={n} title={title} caption={caption} light={light} />}
        {children}
      </div>
    );
  }

  function ZoomBar({ zoom, setZoom }) {
    const Btn = ({ children, onClick, title }) => (
      <button onClick={onClick} title={title} style={{
        width: 34, height: 34, borderRadius: 8, border: 'none', cursor: 'pointer',
        background: '#1f2320', color: '#cdd6d0', fontFamily: "'Hanken Grotesk', sans-serif",
        fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.07)',
      }}>{children}</button>
    );
    return (
      <div style={{
        position: 'fixed', left: 18, bottom: 18, zIndex: 40, display: 'flex', alignItems: 'center', gap: 6,
        background: 'rgba(20,23,21,.9)', backdropFilter: 'blur(10px)', padding: 6, borderRadius: 12,
        boxShadow: '0 10px 30px rgba(0,0,0,.4), inset 0 0 0 1px rgba(255,255,255,.06)',
      }}>
        <Btn onClick={() => setZoom((z) => Math.max(0.3, +(z - 0.1).toFixed(2)))} title="Zoom out">−</Btn>
        <button onClick={() => setZoom(0.62)} style={{
          minWidth: 58, height: 34, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'transparent',
          color: '#cdd6d0', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
        }}>{Math.round(zoom * 100)}%</button>
        <Btn onClick={() => setZoom((z) => Math.min(1.4, +(z + 0.1).toFixed(2)))} title="Zoom in">+</Btn>
      </div>
    );
  }

  function Present({ onExit }) {
    const SCREENS = [
      { label: 'Landing — Desktop', hint: 'The marketing site. One clear promise, one CTA.', w: 1280, h: 820, node: <ChromeWindow width={1280} height={820} url="innovista.io" tabs={[{ title: 'InnoVista' }]}><Landing variant="desktop" /></ChromeWindow> },
      { label: 'Landing — Mobile', hint: 'Same story, thumb-friendly.', w: 402, h: 874, node: <IOSDevice dark width={402} height={874}><Landing variant="mobile" /></IOSDevice> },
      { label: 'AI Chatbot — Mobile', hint: 'Tap the green chat button, then the quick replies, to book a job.', w: 402, h: 874, node: <IOSDevice dark width={402} height={874}><Chatbot /></IOSDevice> },
      { label: 'Client Pipeline — Desktop', hint: 'Where booked jobs land. Drag a card between columns; search to filter.', w: 1340, h: 860, node: <ChromeWindow width={1340} height={860} url="app.innovista.io/pipeline" tabs={[{ title: 'Pipeline · InnoVista' }]}><Dashboard /></ChromeWindow> },
    ];
    const [i, setI] = useState(0);
    const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
    useEffect(() => {
      const r = () => setVp({ w: window.innerWidth, h: window.innerHeight });
      window.addEventListener('resize', r);
      return () => window.removeEventListener('resize', r);
    }, []);
    useEffect(() => {
      const k = (e) => {
        if (e.key === 'ArrowRight') setI((v) => Math.min(SCREENS.length - 1, v + 1));
        else if (e.key === 'ArrowLeft') setI((v) => Math.max(0, v - 1));
        else if (e.key === 'Escape') onExit();
      };
      window.addEventListener('keydown', k);
      return () => window.removeEventListener('keydown', k);
    }, []);
    const s = SCREENS[i];
    const scale = Math.min((vp.w - 220) / s.w, (vp.h - 196) / s.h, 1);
    const Arrow = ({ dir, disabled, onClick }) => (
      <button onClick={onClick} disabled={disabled} style={{
        position: 'absolute', top: '50%', [dir < 0 ? 'left' : 'right']: 26, transform: 'translateY(-50%)',
        width: 52, height: 52, borderRadius: 999, border: 'none', cursor: disabled ? 'default' : 'pointer',
        background: disabled ? 'rgba(255,255,255,.04)' : '#1c2420', color: disabled ? '#3c453f' : '#e7efe9',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5,
        boxShadow: disabled ? 'none' : 'inset 0 0 0 1px rgba(82,183,136,.3), 0 10px 30px rgba(0,0,0,.5)',
      }}>
        <Icon.arrowRight size={22} color={disabled ? '#3c453f' : T.green} style={{ transform: dir < 0 ? 'rotate(180deg)' : 'none' }} />
      </button>
    );
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#080b09', display: 'flex', flexDirection: 'column' }}>
        {/* top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 22px', borderBottom: '1px solid rgba(255,255,255,.06)', flexShrink: 0 }}>
          <button onClick={onExit} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13.5, fontWeight: 600, color: '#cdd6d0', background: '#1c2420', border: 'none', borderRadius: 9, padding: '8px 14px', cursor: 'pointer', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.07)' }}>
            <Icon.grid size={15} color="#9bb0a3" />Back to canvas
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <Logo size={22} green={T.green} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: '#e7efe9' }}>InnoVista</span>
            <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#6c8073' }}>· Client walkthrough</span>
          </div>
          <span style={{ marginLeft: 'auto', whiteSpace: 'nowrap', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12.5, color: '#6c8073' }}>← → to navigate · Esc to exit</span>
        </div>
        {/* stage */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
          <Arrow dir={-1} disabled={i === 0} onClick={() => setI((v) => Math.max(0, v - 1))} />
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'center', transition: 'transform .2s' }}>
            {s.node}
          </div>
          <Arrow dir={1} disabled={i === SCREENS.length - 1} onClick={() => setI((v) => Math.min(SCREENS.length - 1, v + 1))} />
        </div>
        {/* footer: title + dots */}
        <div style={{ flexShrink: 0, padding: '14px 22px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, color: '#e7efe9' }}>{s.label}</div>
            <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#8a9b90', marginTop: 3 }}>{s.hint}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {SCREENS.map((sc, k) => (
              <button key={k} onClick={() => setI(k)} title={sc.label} style={{
                width: k === i ? 26 : 9, height: 9, borderRadius: 999, border: 'none', cursor: 'pointer',
                background: k === i ? T.green : 'rgba(255,255,255,.16)', transition: 'all .2s', padding: 0,
              }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const [mode, setMode] = useState('canvas');
    const [zoom, setZoom] = useState(0.62);
    const light = t.canvas === 'light';
    const innerRef = useRef(null);
    const [dims, setDims] = useState({ w: 0, h: 0 });

    useLayoutEffect(() => {
      const el = innerRef.current;
      if (!el) return;
      const measure = () => setDims({ w: el.offsetWidth, h: el.offsetHeight });
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }, [t.labels, t.fontPair, mode]);

    useEffect(() => {
      const p = PAIRS[t.fontPair] || PAIRS.sharp;
      document.documentElement.style.setProperty('--font-display', p.display);
      document.documentElement.style.setProperty('--font-body', p.body);
    }, [t.fontPair]);

    const canvasBg = light ? '#e7eae8' : '#141714';
    const dotColor = light ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.045)';

    if (mode === 'present') return <Present onExit={() => setMode('canvas')} />;

    return (
      <div style={{
        minHeight: '100vh', background: canvasBg,
        backgroundImage: `radial-gradient(${dotColor} 1.3px, transparent 1.3px)`,
        backgroundSize: '26px 26px',
      }}>
        {/* canvas top strip */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 30, display: 'flex', alignItems: 'center', gap: 12,
          padding: '13px 20px', background: light ? 'rgba(231,234,232,.85)' : 'rgba(20,23,20,.85)',
          backdropFilter: 'blur(10px)', borderBottom: `1px solid ${light ? 'rgba(0,0,0,.07)' : 'rgba(255,255,255,.06)'}`,
        }}>
          <Logo size={24} green={T.green} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: light ? '#2a2e2b' : '#e7efe9' }}>InnoVista Strategies</span>
          <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: light ? '#8a938c' : '#6c8073' }}>· Product UI — 3 screens</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12.5, color: light ? '#8a938c' : '#6c8073' }}>Scroll to pan · ⚙ Tweaks for fonts</span>
            <button onClick={() => setMode('present')} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 600, fontSize: 13.5, color: '#06140d', background: T.green, border: 'none',
              borderRadius: 9, padding: '8px 15px', cursor: 'pointer', boxShadow: `0 6px 18px -8px ${T.green}`,
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#06140d"><path d="M6 4l14 8-14 8z" /></svg>
              Present
            </button>
          </div>
        </div>

        {/* scaled canvas */}
        <div style={{ padding: 40, overflow: 'auto' }}>
          <div style={{ position: 'relative', width: dims.w * zoom, height: dims.h * zoom }}>
            <div ref={innerRef} style={{ position: 'absolute', top: 0, left: 0, transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 88 }}>

              {/* Section 1 — Landing */}
              <div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>
                <Frame n="01" title="Landing page" caption="Desktop · 1280×820" show={t.labels} light={light}>
                  <ChromeWindow width={1280} height={820} url="innovista.io" tabs={[{ title: 'InnoVista — Lead capture for HVAC' }]}>
                    <Landing variant="desktop" />
                  </ChromeWindow>
                </Frame>
                <Frame n="01b" title="Landing page" caption="Mobile · 402×874" show={t.labels} light={light}>
                  <IOSDevice dark width={402} height={874}>
                    <Landing variant="mobile" />
                  </IOSDevice>
                </Frame>
              </div>

              {/* Section 2 — Chatbot */}
              <div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>
                <Frame n="02" title="AI chatbot" caption="Mobile · 402×874 · interactive" show={t.labels} light={light}>
                  <IOSDevice dark width={402} height={874}>
                    <Chatbot />
                  </IOSDevice>
                </Frame>
                <div style={{ maxWidth: 300, paddingTop: t.labels ? 46 : 6 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, color: light ? '#2a2e2b' : '#e7efe9', marginBottom: 10 }}>Try it</div>
                  <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, lineHeight: 1.55, color: light ? '#6a736c' : '#9bb0a3' }}>
                    Tap the green chat button to open the assistant. The thread walks a homeowner from a
                    missed call to a booked appointment — service, symptom, zip, urgency — then confirms a
                    slot. The chevron minimizes it; the bell replays.
                  </div>
                </div>
              </div>

              {/* Section 3 — Dashboard */}
              <div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>
                <Frame n="03" title="Client pipeline" caption="Desktop · 1340×860 · drag cards between columns" show={t.labels} light={light}>
                  <ChromeWindow width={1340} height={860} url="app.innovista.io/pipeline" tabs={[{ title: 'Pipeline · InnoVista' }]}>
                    <Dashboard />
                  </ChromeWindow>
                </Frame>
              </div>

            </div>

            </div>
          </div>
          </div>

        <ZoomBar zoom={zoom} setZoom={setZoom} />

        <TweaksPanel>
          <TweakSection label="Typography" />
          <TweakRadio label="Font pairing" value={t.fontPair}
            options={['sharp', 'technical', 'warm']}
            onChange={(v) => setTweak('fontPair', v)} />
          <TweakSection label="Canvas" />
          <TweakRadio label="Background" value={t.canvas}
            options={['dark', 'light']}
            onChange={(v) => setTweak('canvas', v)} />
          <TweakToggle label="Frame labels" value={t.labels}
            onChange={(v) => setTweak('labels', v)} />
        </TweaksPanel>
      </div>
    );
  }

  window.InnoVistaApp = App;
})();
