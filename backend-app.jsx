// backend-app.jsx — login + operator app shell + lighter views + router.
(function () {
  const { useState, useEffect } = React;
  const { Icon, Logo } = window;
  const T = window.IV;
  const fD = 'var(--font-display)';
  const fB = 'var(--font-body)';

  const NAV = [
    { id: 'overview', label: 'Overview', icon: 'grid' },
    { id: 'pipeline', label: 'Pipeline', icon: 'filter' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar' },
    { id: 'jobs', label: 'Jobs', icon: 'wrench' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'pricing', label: 'Pricing', icon: 'bolt' },
    { id: 'settings', label: 'Settings', icon: 'user' },
  ];

  // ── Login ────────────────────────────────────────────────────
  function Login({ onLogin }) {
    const [email, setEmail] = useState('owner@summithvac.com');
    const [pw, setPw] = useState('demo1234');
    const Field = ({ label, value, onChange, type }) => (
      <label style={{ display: 'block', marginTop: 16 }}>
        <span style={{ display: 'block', fontFamily: fB, fontSize: 13, fontWeight: 600, color: T.textMute, marginBottom: 7 }}>{label}</span>
        <input value={value} onChange={(e) => onChange(e.target.value)} type={type || 'text'} style={{ width: '100%', height: 46, borderRadius: 11, border: 'none', background: T.bg2, boxShadow: `inset 0 0 0 1px ${T.line2}`, padding: '0 15px', fontFamily: fB, fontSize: 14.5, color: T.text, outline: 'none' }} />
      </label>
    );
    return (
      <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr', placeItems: 'center', background: T.bg, padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, justifyContent: 'center', marginBottom: 30 }}>
            <Logo size={34} green={T.green} />
            <span style={{ fontFamily: fD, fontWeight: 700, fontSize: 22, color: T.text }}>InnoVista</span>
          </div>
          <div style={{ background: T.surface, borderRadius: 20, padding: '32px 30px', boxShadow: `inset 0 0 0 1px ${T.line2}` }}>
            <h1 style={{ fontFamily: fD, fontWeight: 700, fontSize: 23, color: T.text, margin: 0, letterSpacing: '-.01em' }}>Sign in to your dashboard</h1>
            <p style={{ fontFamily: fB, fontSize: 13.5, color: T.textMute, margin: '8px 0 4px' }}>Summit Heating &amp; Air · operator portal</p>
            <Field label="Work email" value={email} onChange={setEmail} />
            <Field label="Password" value={pw} onChange={setPw} type="password" />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', fontFamily: fB, fontSize: 13, color: T.textMute, cursor: 'pointer' }}>
                <span style={{ width: 16, height: 16, borderRadius: 5, background: T.green, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon.check size={11} color="#06140d" /></span>
                Remember me
              </label>
              <span style={{ fontFamily: fB, fontSize: 13, color: T.green, cursor: 'pointer' }}>Forgot password?</span>
            </div>
            <button onClick={onLogin} style={{ width: '100%', marginTop: 22, height: 48, borderRadius: 12, border: 'none', cursor: 'pointer', background: T.green, color: '#06140d', fontFamily: fB, fontWeight: 700, fontSize: 15.5, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: `0 10px 30px -10px ${T.green}` }}>
              Sign in <Icon.arrowRight size={18} color="#06140d" />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '18px 0', color: T.textDim }}>
              <span style={{ flex: 1, height: 1, background: T.line }} /><span style={{ fontFamily: fB, fontSize: 12 }}>or</span><span style={{ flex: 1, height: 1, background: T.line }} />
            </div>
            <button onClick={onLogin} style={{ width: '100%', height: 46, borderRadius: 12, border: 'none', cursor: 'pointer', background: 'transparent', color: T.text, fontFamily: fB, fontWeight: 600, fontSize: 14, boxShadow: `inset 0 0 0 1px ${T.line2}` }}>Use single sign-on (SSO)</button>
          </div>
          <p style={{ fontFamily: fB, fontSize: 12.5, color: T.textDim, textAlign: 'center', marginTop: 20 }}>New to InnoVista? <span style={{ color: T.green, cursor: 'pointer' }}>Book a demo</span></p>
        </div>
      </div>
    );
  }

  // ── Overview ─────────────────────────────────────────────────
  function Overview() {
    const BE = window.BE; const { Card, Avatar, SvcTag, AiBadge, money } = BE;
    const kpis = [
      { label: 'New leads today', value: '14', delta: '+5', up: true, icon: 'sparkle' },
      { label: 'Jobs booked (wk)', value: '23', delta: '+18%', up: true, icon: 'calendar' },
      { label: 'Revenue booked', value: '$41,250', delta: '+12%', up: true, icon: 'bolt' },
      { label: 'Calls recovered', value: '9', delta: 'after-hrs', up: true, icon: 'phoneMissed' },
    ];
    const week = [9, 14, 11, 18, 23, 16, 7];
    const max = Math.max(...week);
    const today = BE.JOBS.filter((j) => j.date === 'Today');
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 18 }}>
          {kpis.map((k) => {
            const I = Icon[k.icon];
            return (
              <div key={k.label} style={{ background: T.surface, borderRadius: 16, padding: '18px 20px', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: T.greenGlow, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line2}` }}><I size={19} color={T.green} /></div>
                  <span style={{ fontFamily: fB, fontSize: 12, fontWeight: 600, color: k.up ? T.green : T.textMute }}>{k.delta}</span>
                </div>
                <div style={{ fontFamily: fD, fontWeight: 700, fontSize: 28, color: T.text, marginTop: 14, letterSpacing: '-.02em' }}>{k.value}</div>
                <div style={{ fontFamily: fB, fontSize: 13, color: T.textMute, marginTop: 2 }}>{k.label}</div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: 14 }}>
          <Card title="Booked jobs" sub="Last 7 days" action={<AiBadge />}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 180, paddingTop: 10 }}>
              {week.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontFamily: fD, fontWeight: 700, fontSize: 13, color: T.text }}>{v}</div>
                  <div style={{ width: '100%', maxWidth: 38, borderRadius: 8, height: `${(v / max) * 100}%`, background: i === 4 ? T.green : 'rgba(82,183,136,.28)', transition: 'height .3s' }} />
                  <div style={{ fontFamily: fB, fontSize: 11.5, color: T.textDim }}>{BE.DAYS[i] || 'Sun'}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Today’s schedule" sub={`${today.length} appointments`} action={<span style={{ fontFamily: fB, fontSize: 12.5, color: T.green, cursor: 'pointer' }}>View all</span>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {today.map((j) => (
                <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar name={j.name} size={36} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: fD, fontWeight: 600, fontSize: 14, color: T.text }}>{j.name}</div>
                    <div style={{ fontFamily: fB, fontSize: 12, color: T.textMute }}>{j.time} · {j.tech}</div>
                  </div>
                  <SvcTag svc={j.svc} small />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ── Jobs table ───────────────────────────────────────────────
  function Jobs() {
    const BE = window.BE; const { JOBS, SvcTag, StatusPill, AiBadge, money } = BE;
    const tabs = ['All', 'Today', 'Scheduled', 'In progress', 'Complete'];
    const [tab, setTab] = useState('All');
    const rows = JOBS.filter((j) => {
      if (tab === 'All') return true;
      if (tab === 'Today') return j.date === 'Today';
      return j.status === tab.toLowerCase().replace(' ', '_');
    });
    return (
      <div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ fontFamily: fB, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', border: 'none', borderRadius: 9, padding: '8px 14px', background: tab === t ? T.green : T.surface, color: tab === t ? '#06140d' : T.textMute, boxShadow: tab === t ? 'none' : `inset 0 0 0 1px ${T.line}` }}>{t}</button>
          ))}
        </div>
        <div style={{ background: T.surface, borderRadius: 16, boxShadow: `inset 0 0 0 1px ${T.line}`, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: 720, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${T.line}` }}>
                  {['Job', 'Customer', 'Service', 'Tech', 'When', 'Value', 'Status'].map((h) => (
                    <th key={h} style={{ textAlign: h === 'Value' ? 'right' : 'left', fontFamily: fB, fontSize: 11.5, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: T.textDim, padding: '13px 18px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((j) => (
                  <tr key={j.id} style={{ borderBottom: `1px solid ${T.line}` }}>
                    <td style={{ padding: '14px 18px', fontFamily: fB, fontSize: 13, color: T.textMute, whiteSpace: 'nowrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>{j.id}{j.booker === 'ai' && <BE.AiBadge />}</span>
                    </td>
                    <td style={{ padding: '14px 18px', fontFamily: fD, fontWeight: 600, fontSize: 14, color: T.text, whiteSpace: 'nowrap' }}>{j.name}</td>
                    <td style={{ padding: '14px 18px' }}><SvcTag svc={j.svc} small /></td>
                    <td style={{ padding: '14px 18px', fontFamily: fB, fontSize: 13.5, color: T.textMute, whiteSpace: 'nowrap' }}>{j.tech}</td>
                    <td style={{ padding: '14px 18px', fontFamily: fB, fontSize: 13.5, color: T.textMute, whiteSpace: 'nowrap' }}>{j.date} · {j.time}</td>
                    <td style={{ padding: '14px 18px', fontFamily: fD, fontWeight: 700, fontSize: 13.5, color: T.green, textAlign: 'right', whiteSpace: 'nowrap' }}>{money(j.val)}</td>
                    <td style={{ padding: '14px 18px' }}><StatusPill status={j.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ── Notifications ────────────────────────────────────────────
  function Notifications() {
    const BE = window.BE; const { NOTIFS } = BE;
    const toneC = { green: T.green, blue: '#5b9ec7', amber: '#c79a5b', mute: T.textMute };
    const groups = ['Today', 'Earlier'];
    return (
      <div style={{ maxWidth: 720 }}>
        {groups.map((g) => (
          <div key={g} style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: fB, fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: T.textDim, marginBottom: 10 }}>{g}</div>
            <div style={{ background: T.surface, borderRadius: 16, boxShadow: `inset 0 0 0 1px ${T.line}`, overflow: 'hidden' }}>
              {NOTIFS.filter((n) => n.group === g).map((n, i, arr) => {
                const I = Icon[n.icon]; const c = toneC[n.tone];
                return (
                  <div key={n.id} style={{ display: 'flex', gap: 13, padding: '15px 18px', borderBottom: i < arr.length - 1 ? `1px solid ${T.line}` : 'none', background: n.unread ? 'rgba(82,183,136,.04)' : 'transparent' }}>
                    <div style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: `${c}1f`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I size={18} color={c} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: fD, fontWeight: 600, fontSize: 14.5, color: T.text, whiteSpace: 'nowrap' }}>{n.title}</span>
                        {n.unread && <span style={{ width: 7, height: 7, borderRadius: 9, background: T.green }} />}
                        <span style={{ marginLeft: 'auto', fontFamily: fB, fontSize: 12, color: T.textDim, whiteSpace: 'nowrap' }}>{n.when}</span>
                      </div>
                      <div style={{ fontFamily: fB, fontSize: 13.5, lineHeight: 1.45, color: T.textMute, marginTop: 3 }}>{n.body}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ── Pricing ──────────────────────────────────────────────────
  function Pricing() {
    const BE = window.BE; const { PRICING, SVC } = BE;
    const [cfg, setCfg] = useState(PRICING);
    const toggle = (i) => setCfg((c) => c.map((g, k) => (k === i ? { ...g, aiQuote: !g.aiQuote } : g)));
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: T.greenGlow, borderRadius: 13, padding: '14px 16px', marginBottom: 18, boxShadow: `inset 0 0 0 1px ${T.line2}`, maxWidth: 760 }}>
          <Icon.sparkle size={18} color={T.green} style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontFamily: fB, fontSize: 13.5, lineHeight: 1.5, color: T.textMute }}>
            The AI quotes from these prices when a homeowner asks “how much?”. Toggle a category off and the assistant will book the visit but leave pricing to your team.
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: 14 }}>
          {cfg.map((g, gi) => {
            const v = SVC[g.svc]; const I = Icon[v.icon];
            return (
              <div key={g.svc} style={{ background: T.surface, borderRadius: 16, boxShadow: `inset 0 0 0 1px ${T.line}`, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '15px 18px', borderBottom: `1px solid ${T.line}` }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: `${v.c}1f`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I size={18} color={v.c} /></div>
                  <span style={{ fontFamily: fD, fontWeight: 600, fontSize: 15.5, color: T.text, flex: 1 }}>{v.label}</span>
                  <span onClick={() => toggle(gi)} title="AI may quote" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: fB, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', color: g.aiQuote ? T.green : T.textDim }}>AI quotes</span>
                    <span style={{ width: 38, height: 22, borderRadius: 999, background: g.aiQuote ? T.green : T.surface2, boxShadow: g.aiQuote ? 'none' : `inset 0 0 0 1px ${T.line2}`, position: 'relative', transition: 'background .15s' }}>
                      <span style={{ position: 'absolute', top: 3, left: g.aiQuote ? 19 : 3, width: 16, height: 16, borderRadius: 99, background: g.aiQuote ? '#06140d' : T.textMute, transition: 'left .15s' }} />
                    </span>
                  </span>
                </div>
                <div>
                  {g.items.map((it, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 18px', borderBottom: i < g.items.length - 1 ? `1px solid ${T.line}` : 'none' }}>
                      <div>
                        <div style={{ fontFamily: fB, fontSize: 13.5, fontWeight: 600, color: T.text, whiteSpace: 'nowrap' }}>{it.name}</div>
                        <div style={{ fontFamily: fB, fontSize: 12, color: T.textDim, marginTop: 1 }}>{it.note}</div>
                      </div>
                      <div style={{ fontFamily: fD, fontWeight: 700, fontSize: 14.5, color: T.text, whiteSpace: 'nowrap' }}>{it.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Settings (light) ─────────────────────────────────────────
  function Settings() {
    const BE = window.BE; const { Card } = BE;
    const Row = ({ label, value }) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '13px 0', borderTop: `1px solid ${T.line}` }}>
        <span style={{ fontFamily: fB, fontSize: 13.5, color: T.textMute }}>{label}</span>
        <span style={{ fontFamily: fB, fontSize: 13.5, fontWeight: 600, color: T.text }}>{value}</span>
      </div>
    );
    const Toggle = ({ label, on }) => {
      const [v, setV] = useState(on);
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderTop: `1px solid ${T.line}` }}>
          <span style={{ fontFamily: fB, fontSize: 13.5, color: T.text }}>{label}</span>
          <span onClick={() => setV(!v)} style={{ cursor: 'pointer', width: 38, height: 22, borderRadius: 999, background: v ? T.green : T.surface2, boxShadow: v ? 'none' : `inset 0 0 0 1px ${T.line2}`, position: 'relative' }}>
            <span style={{ position: 'absolute', top: 3, left: v ? 19 : 3, width: 16, height: 16, borderRadius: 99, background: v ? '#06140d' : T.textMute, transition: 'left .15s' }} />
          </span>
        </div>
      );
    };
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14, maxWidth: 760 }}>
        <Card title="Business profile">
          <div style={{ marginTop: -6 }}>
            <Row label="Business name" value="Summit Heating & Air" />
            <Row label="Service area" value="Boulder County, CO" />
            <Row label="Forwarding number" value="(303) 555-0100" />
            <Row label="Plan" value="Pro · $299/mo" />
          </div>
        </Card>
        <Card title="AI assistant">
          <div style={{ marginTop: -6 }}>
            <Toggle label="Answer missed calls by text" on={true} />
            <Toggle label="Book appointments automatically" on={true} />
            <Toggle label="Send appointment reminders" on={true} />
            <Toggle label="Ask for reviews after a job" on={true} />
            <Toggle label="Quote prices from Pricing tab" on={true} />
          </div>
        </Card>
      </div>
    );
  }

  const VIEW = { overview: Overview, jobs: Jobs, notifications: Notifications, pricing: Pricing, settings: Settings };
  const TITLES = {
    overview: ['Overview', 'Here’s what InnoVista handled for you'],
    pipeline: ['Pipeline', 'Drag leads through your sales stages'],
    calendar: ['Calendar', 'Every appointment InnoVista booked for you'],
    jobs: ['Jobs', 'All work orders, past and upcoming'],
    notifications: ['Notifications', 'Everything your assistant did'],
    pricing: ['Pricing', 'What the AI quotes homeowners'],
    settings: ['Settings', 'Business profile & AI behavior'],
  };

  // ── Shell ────────────────────────────────────────────────────
  function Shell({ onLogout }) {
    const [view, setView] = useState(() => localStorage.getItem('iv_view') || 'overview');
    const [navOpen, setNavOpen] = useState(false);
    const [mobile, setMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 900);
    useEffect(() => {
      const r = () => setMobile(window.innerWidth < 900);
      window.addEventListener('resize', r); return () => window.removeEventListener('resize', r);
    }, []);
    useEffect(() => { localStorage.setItem('iv_view', view); }, [view]);

    const Body = view === 'pipeline' ? window.PipelineBoard : view === 'calendar' ? window.CalendarWeek : VIEW[view];
    const [title, sub] = TITLES[view];
    const unread = window.BE.NOTIFS.filter((n) => n.unread).length;

    const Sidebar = (
      <aside style={{ width: 244, flexShrink: 0, background: T.bg2, borderRight: `1px solid ${T.line}`, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={28} green={T.green} />
          <span style={{ fontFamily: fD, fontWeight: 700, fontSize: 18, color: T.text }}>InnoVista</span>
        </div>
        <div style={{ margin: '0 12px 14px', padding: '11px 13px', borderRadius: 12, background: T.surface, boxShadow: `inset 0 0 0 1px ${T.line}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: T.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line2}` }}><Icon.snowflake size={17} color={T.green} /></div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontFamily: fD, fontWeight: 600, fontSize: 13, color: T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Summit Heating</div>
            <div style={{ fontFamily: fB, fontSize: 11, color: T.green }}>Pro plan</div>
          </div>
          <Icon.chevronDown size={15} color={T.textMute} />
        </div>
        <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {NAV.map((n) => {
            const I = Icon[n.icon]; const active = view === n.id;
            return (
              <button key={n.id} onClick={() => { setView(n.id); setNavOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left', background: active ? T.greenGlow : 'transparent', color: active ? T.green : T.textMute, fontFamily: fB, fontSize: 14, fontWeight: active ? 600 : 500, boxShadow: active ? `inset 0 0 0 1px ${T.line2}` : 'none' }}>
                <I size={18} color={active ? T.green : T.textMute} />
                <span style={{ flex: 1 }}>{n.label}</span>
                {n.id === 'notifications' && unread > 0 && <span style={{ fontFamily: fB, fontSize: 11, fontWeight: 700, color: '#06140d', background: T.green, borderRadius: 99, padding: '1px 7px' }}>{unread}</span>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: 12, borderTop: `1px solid ${T.line}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 99, background: T.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fD, fontWeight: 700, fontSize: 13, color: '#06140d' }}>JS</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: fD, fontWeight: 600, fontSize: 13, color: T.text }}>Jamie Santos</div>
            <div style={{ fontFamily: fB, fontSize: 11, color: T.textDim }}>Owner</div>
          </div>
          <div onClick={onLogout} title="Sign out" style={{ cursor: 'pointer', width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}` }}><Icon.arrowRight size={15} color={T.textMute} /></div>
        </div>
      </aside>
    );

    return (
      <div style={{ height: '100vh', display: 'flex', background: T.bg, color: T.text, overflow: 'hidden' }}>
        {!mobile && Sidebar}
        {mobile && navOpen && (
          <div onClick={() => setNavOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,.5)' }}>
            <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', left: 0, top: 0, bottom: 0 }}>{Sidebar}</div>
          </div>
        )}
        <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* topbar */}
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 14, padding: mobile ? '14px 18px' : '16px 26px', borderBottom: `1px solid ${T.line}` }}>
            {mobile && <div onClick={() => setNavOpen(true)} style={{ cursor: 'pointer' }}><Icon.menu size={22} color={T.text} /></div>}
            <div style={{ minWidth: 0 }}>
              <h1 style={{ fontFamily: fD, fontWeight: 700, fontSize: 20, color: T.text, margin: 0, letterSpacing: '-.01em' }}>{title}</h1>
              {!mobile && <div style={{ fontFamily: fB, fontSize: 13, color: T.textMute, marginTop: 2 }}>{sub}</div>}
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
              {!mobile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.surface, borderRadius: 10, padding: '0 12px', boxShadow: `inset 0 0 0 1px ${T.line2}`, height: 38 }}>
                  <Icon.search size={16} color={T.textMute} />
                  <input placeholder="Search…" style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: fB, fontSize: 13.5, color: T.text, width: 130 }} />
                </div>
              )}
              <div onClick={() => setView('notifications')} style={{ position: 'relative', width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}`, cursor: 'pointer' }}>
                <Icon.bell size={18} color={T.textMute} />
                {unread > 0 && <span style={{ position: 'absolute', top: 7, right: 8, width: 7, height: 7, borderRadius: 9, background: T.green, boxShadow: `0 0 0 2px ${T.bg}` }} />}
              </div>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: fB, fontWeight: 600, fontSize: 13.5, color: '#06140d', background: T.green, border: 'none', borderRadius: 10, padding: '9px 15px', cursor: 'pointer', boxShadow: `0 8px 22px -10px ${T.green}` }}>
                <Icon.plus size={16} color="#06140d" />{mobile ? 'New' : 'New job'}
              </button>
            </div>
          </div>
          {/* scroll body */}
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: mobile ? '18px' : '24px 26px' }}>
            <Body />
          </div>
        </main>
      </div>
    );
  }

  function App() {
    const [authed, setAuthed] = useState(() => localStorage.getItem('iv_authed') === '1');
    const login = () => { localStorage.setItem('iv_authed', '1'); setAuthed(true); };
    const logout = () => { localStorage.removeItem('iv_authed'); setAuthed(false); };
    return authed ? <Shell onLogout={logout} /> : <Login onLogin={login} />;
  }

  window.InnoVistaBackend = App;
})();
