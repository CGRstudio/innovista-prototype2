// dashboard.jsx — Screen 3. InnoVista client pipeline (desktop, drag + filter).
(function () {
  const { useState, useRef, useMemo } = React;
  const { Icon, Logo } = window;
  const T = window.IV;
  const fD = 'var(--font-display)';
  const fB = 'var(--font-body)';

  // accent hues share chroma/lightness with the brand green (oklch ~0.73 0.1 h)
  const SVC = {
    cooling:     { label: 'AC repair',     icon: 'snowflake', c: '#52b788' },
    heating:     { label: 'Heating',       icon: 'flame',     c: '#c79a5b' },
    install:     { label: 'Install quote', icon: 'wind',      c: '#5b9ec7' },
    maintenance: { label: 'Tune-up',       icon: 'wrench',    c: '#9bb06a' },
  };
  const CHANNEL = { 'Missed call': 'phoneMissed', 'Web form': 'grid', 'Google': 'search', 'Referral': 'star' };

  const COLS = [
    { id: 'new', label: 'New Lead', c: '#52b788' },
    { id: 'contacted', label: 'Contacted', c: '#74c69d' },
    { id: 'qualified', label: 'Qualified', c: '#5b9ec7' },
    { id: 'booked', label: 'Booked', c: '#c79a5b' },
    { id: 'complete', label: 'Complete', c: '#6c8073' },
  ];

  const SEED = [
    { id: 1, name: 'Dana Whitfield', svc: 'cooling', phone: '(303) 555-0148', ch: 'Missed call', when: '2m ago', val: 480, hot: true, col: 'new' },
    { id: 2, name: 'Marcus Bell', svc: 'install', phone: '(720) 555-0193', ch: 'Web form', when: '14m ago', val: 7800, hot: false, col: 'new' },
    { id: 3, name: 'Priya Nair', svc: 'heating', phone: '(303) 555-0119', ch: 'Missed call', when: '31m ago', val: 360, hot: true, col: 'new' },
    { id: 4, name: 'Tom Alvarez', svc: 'maintenance', phone: '(720) 555-0167', ch: 'Google', when: '1h ago', val: 145, hot: false, col: 'contacted' },
    { id: 5, name: 'Renee Okafor', svc: 'cooling', phone: '(303) 555-0172', ch: 'Referral', when: '2h ago', val: 520, hot: false, col: 'contacted' },
    { id: 6, name: 'Greg Sanders', svc: 'heating', phone: '(720) 555-0140', ch: 'Web form', when: '3h ago', val: 290, hot: false, col: 'qualified' },
    { id: 7, name: 'Linda Park', svc: 'install', phone: '(303) 555-0188', ch: 'Google', when: '4h ago', val: 9200, hot: false, col: 'qualified' },
    { id: 8, name: 'Hassan Yusuf', svc: 'cooling', phone: '(720) 555-0155', ch: 'Missed call', when: 'Today 2pm', val: 480, hot: false, col: 'booked' },
    { id: 9, name: 'Carla Mendez', svc: 'maintenance', phone: '(303) 555-0126', ch: 'Referral', when: 'Today 4pm', val: 145, hot: false, col: 'booked' },
    { id: 10, name: 'Will Foster', svc: 'heating', phone: '(720) 555-0131', ch: 'Web form', when: 'Tomorrow', val: 410, hot: false, col: 'booked' },
    { id: 11, name: 'Aisha Bröhn', svc: 'cooling', phone: '(303) 555-0109', ch: 'Missed call', when: 'Mon', val: 600, hot: false, col: 'complete' },
    { id: 12, name: 'Derek Lowe', svc: 'install', phone: '(720) 555-0177', ch: 'Google', when: 'Mon', val: 6400, hot: false, col: 'complete' },
  ];

  function initials(n) { return n.split(' ').map((w) => w[0]).slice(0, 2).join(''); }
  function money(v) { return '$' + v.toLocaleString('en-US'); }

  function Card({ lead, onDragStart, dragging }) {
    const s = SVC[lead.svc];
    const I = Icon[s.icon];
    const Ch = Icon[CHANNEL[lead.ch]];
    return (
      <div draggable onDragStart={(e) => onDragStart(e, lead.id)}
        style={{
          background: T.surface, borderRadius: 13, padding: '13px 14px',
          boxShadow: `inset 0 0 0 1px ${T.line}`, cursor: 'grab',
          opacity: dragging ? 0.4 : 1, transition: 'opacity .15s, transform .1s',
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 11 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: fB, fontSize: 11.5, fontWeight: 600, color: s.c, background: 'rgba(255,255,255,.03)', padding: '4px 9px', borderRadius: 7, boxShadow: `inset 0 0 0 1px ${T.line}` }}>
            <I size={13} color={s.c} />{s.label}
          </span>
          {lead.hot && (
            <span title="Urgent" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: fB, fontSize: 11, fontWeight: 700, color: '#c79a5b', marginLeft: 'auto' }}>
              <Icon.flame size={13} color="#c79a5b" />HOT
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 99, flexShrink: 0, background: T.surface2, boxShadow: `inset 0 0 0 1px ${T.line2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fD, fontWeight: 700, fontSize: 12, color: T.green }}>{initials(lead.name)}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: fD, fontWeight: 600, fontSize: 14.5, color: T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lead.name}</div>
            <div style={{ fontFamily: fB, fontSize: 12.5, color: T.textMute }}>{lead.phone}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 11, borderTop: `1px solid ${T.line}` }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: fB, fontSize: 11.5, color: T.textDim }}>
            <Ch size={13} color={T.textDim} />{lead.ch}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: fB, fontSize: 11.5, color: T.textDim }}>
            <Icon.clock size={12} color={T.textDim} />{lead.when}
          </span>
        </div>
        <div style={{ fontFamily: fD, fontWeight: 700, fontSize: 13, color: T.green, marginTop: 9 }}>{money(lead.val)} <span style={{ fontFamily: fB, fontWeight: 400, fontSize: 11.5, color: T.textDim }}>est.</span></div>
      </div>
    );
  }

  function Dashboard() {
    const [leads, setLeads] = useState(SEED);
    const [q, setQ] = useState('');
    const [svc, setSvc] = useState('all');
    const [drag, setDrag] = useState(null);
    const [over, setOver] = useState(null);
    const dragId = useRef(null);

    const filtered = useMemo(() => leads.filter((l) => {
      const m = (l.name + l.phone + SVC[l.svc].label).toLowerCase().includes(q.toLowerCase());
      const sm = svc === 'all' || l.svc === svc;
      return m && sm;
    }), [leads, q, svc]);

    const onDragStart = (e, id) => { dragId.current = id; setDrag(id); e.dataTransfer.effectAllowed = 'move'; };
    const onDrop = (colId) => {
      const id = dragId.current;
      if (id != null) setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, col: colId } : l)));
      setDrag(null); setOver(null); dragId.current = null;
    };

    const totalVal = filtered.reduce((a, l) => a + l.val, 0);
    const bookedToday = leads.filter((l) => l.col === 'booked').length;

    const Select = ({ value, onChange, children }) => (
      <div style={{ position: 'relative' }}>
        <select value={value} onChange={(e) => onChange(e.target.value)} style={{
          appearance: 'none', fontFamily: fB, fontSize: 13.5, fontWeight: 500, color: T.text,
          background: T.surface, border: 'none', boxShadow: `inset 0 0 0 1px ${T.line2}`,
          borderRadius: 10, padding: '9px 34px 9px 13px', cursor: 'pointer', outline: 'none',
        }}>{children}</select>
        <Icon.chevronDown size={15} color={T.textMute} style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      </div>
    );

    return (
      <div style={{ background: T.bg, minHeight: '100%', color: T.text, display: 'flex', flexDirection: 'column' }}>
        {/* top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '14px 24px', borderBottom: `1px solid ${T.line}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo size={28} green={T.green} />
            <span style={{ fontFamily: fD, fontWeight: 700, fontSize: 17, color: T.text }}>InnoVista</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['Pipeline', 'Conversations', 'Calendar', 'Reports'].map((t, i) => (
              <span key={t} style={{
                fontFamily: fB, fontSize: 14, fontWeight: i === 0 ? 600 : 500, cursor: 'pointer',
                color: i === 0 ? T.text : T.textMute, padding: '8px 13px', borderRadius: 9,
                background: i === 0 ? T.surface : 'transparent', boxShadow: i === 0 ? `inset 0 0 0 1px ${T.line}` : 'none',
              }}>{t}</span>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
              <Icon.bell size={18} color={T.textMute} />
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 99, background: T.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fD, fontWeight: 700, fontSize: 13, color: '#06140d' }}>JS</div>
          </div>
        </div>

        {/* title + filter bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px 16px', flexShrink: 0, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontFamily: fD, fontWeight: 700, fontSize: 23, color: T.text, margin: 0, letterSpacing: '-.01em' }}>Pipeline</h1>
            <div style={{ fontFamily: fB, fontSize: 13, color: T.textMute, marginTop: 3 }}>
              {filtered.length} active leads · {bookedToday} booked today · <span style={{ color: T.green, fontWeight: 600 }}>{money(totalVal)}</span> in play
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.surface, borderRadius: 10, padding: '0 12px', boxShadow: `inset 0 0 0 1px ${T.line2}`, height: 38 }}>
              <Icon.search size={16} color={T.textMute} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search leads…" style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: fB, fontSize: 13.5, color: T.text, width: 150 }} />
            </div>
            <Select value={svc} onChange={setSvc}>
              <option value="all">All services</option>
              {Object.entries(SVC).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </Select>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: fB, fontWeight: 600, fontSize: 13.5, color: '#06140d', background: T.green, border: 'none', borderRadius: 10, padding: '9px 15px', cursor: 'pointer', boxShadow: `0 8px 22px -10px ${T.green}` }}>
              <Icon.plus size={16} color="#06140d" />Add lead
            </button>
          </div>
        </div>

        {/* board */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS.length}, 1fr)`, gap: 14, padding: '4px 24px 26px', alignItems: 'start', flex: 1 }}>
          {COLS.map((col) => {
            const items = filtered.filter((l) => l.col === col.id);
            const isOver = over === col.id;
            return (
              <div key={col.id}
                onDragOver={(e) => { e.preventDefault(); if (over !== col.id) setOver(col.id); }}
                onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOver((o) => (o === col.id ? null : o)); }}
                onDrop={() => onDrop(col.id)}
                style={{
                  background: isOver ? 'rgba(82,183,136,.06)' : T.bg2, borderRadius: 15, padding: 10,
                  boxShadow: `inset 0 0 0 1px ${isOver ? T.green : T.line}`, transition: 'box-shadow .15s, background .15s',
                  minHeight: 120,
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 6px 12px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 9, background: col.c }} />
                  <span style={{ fontFamily: fD, fontWeight: 600, fontSize: 13.5, color: T.text }}>{col.label}</span>
                  <span style={{ marginLeft: 'auto', fontFamily: fB, fontSize: 12, fontWeight: 600, color: T.textMute, background: T.surface, borderRadius: 7, padding: '2px 8px', boxShadow: `inset 0 0 0 1px ${T.line}` }}>{items.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {items.map((l) => <Card key={l.id} lead={l} onDragStart={onDragStart} dragging={drag === l.id} />)}
                  {items.length === 0 && (
                    <div style={{ fontFamily: fB, fontSize: 12.5, color: T.textDim, textAlign: 'center', padding: '18px 0', border: `1px dashed ${T.line2}`, borderRadius: 11 }}>
                      {isOver ? 'Drop here' : 'No leads'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  window.Dashboard = Dashboard;
})();
