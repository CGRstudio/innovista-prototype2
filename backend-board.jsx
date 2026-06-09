// backend-board.jsx — Pipeline kanban + AI Calendar week view.
(function () {
  const { useState, useRef, useMemo } = React;
  const { Icon } = window;
  const T = window.IV;
  const fD = 'var(--font-display)';
  const fB = 'var(--font-body)';

  function get() { return window.BE; }

  // ── Pipeline kanban ──────────────────────────────────────────
  function PipelineBoard() {
    const BE = get();
    const { COLS, SVC, money, initials } = BE;
    const [leads, setLeads] = useState(BE.LEADS);
    const [q, setQ] = useState('');
    const [svc, setSvc] = useState('all');
    const [drag, setDrag] = useState(null);
    const [over, setOver] = useState(null);
    const dragId = useRef(null);

    const filtered = useMemo(() => leads.filter((l) => {
      const m = (l.name + l.phone + SVC[l.svc].label).toLowerCase().includes(q.toLowerCase());
      return m && (svc === 'all' || l.svc === svc);
    }), [leads, q, svc]);

    const onDragStart = (e, id) => { dragId.current = id; setDrag(id); e.dataTransfer.effectAllowed = 'move'; };
    const onDrop = (colId) => {
      const id = dragId.current;
      if (id != null) setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, col: colId } : l)));
      setDrag(null); setOver(null); dragId.current = null;
    };
    const totalVal = filtered.reduce((a, l) => a + l.val, 0);

    const Select = () => (
      <div style={{ position: 'relative' }}>
        <select value={svc} onChange={(e) => setSvc(e.target.value)} style={{ appearance: 'none', fontFamily: fB, fontSize: 13.5, fontWeight: 500, color: T.text, background: T.surface, border: 'none', boxShadow: `inset 0 0 0 1px ${T.line2}`, borderRadius: 10, padding: '9px 34px 9px 13px', cursor: 'pointer', outline: 'none' }}>
          <option value="all">All services</option>
          {Object.entries(SVC).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <Icon.chevronDown size={15} color={T.textMute} style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      </div>
    );

    function Lead({ lead }) {
      const v = SVC[lead.svc]; const I = Icon[v.icon];
      return (
        <div draggable onDragStart={(e) => onDragStart(e, lead.id)} style={{ background: T.surface, borderRadius: 13, padding: '13px 14px', boxShadow: `inset 0 0 0 1px ${T.line}`, cursor: 'grab', opacity: drag === lead.id ? 0.4 : 1, transition: 'opacity .15s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 11 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: fB, fontSize: 11.5, fontWeight: 600, color: v.c, background: 'rgba(255,255,255,.03)', padding: '4px 9px', borderRadius: 7, boxShadow: `inset 0 0 0 1px ${T.line}` }}><I size={13} color={v.c} />{v.label}</span>
            {lead.hot && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: fB, fontSize: 11, fontWeight: 700, color: '#c79a5b', marginLeft: 'auto' }}><Icon.flame size={13} color="#c79a5b" />HOT</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 99, flexShrink: 0, background: T.surface2, boxShadow: `inset 0 0 0 1px ${T.line2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fD, fontWeight: 700, fontSize: 12, color: T.green }}>{initials(lead.name)}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: fD, fontWeight: 600, fontSize: 14.5, color: T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lead.name}</div>
              <div style={{ fontFamily: fB, fontSize: 12.5, color: T.textMute }}>{lead.phone}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 11, borderTop: `1px solid ${T.line}` }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: fB, fontSize: 11.5, color: T.textDim }}><Icon.clock size={12} color={T.textDim} />{lead.when}</span>
            <span style={{ fontFamily: fD, fontWeight: 700, fontSize: 13, color: T.green }}>{money(lead.val)}</span>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: fB, fontSize: 13.5, color: T.textMute }}>
            <b style={{ color: T.text }}>{filtered.length}</b> active leads · <span style={{ color: T.green, fontWeight: 600 }}>{money(totalVal)}</span> in play
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.surface, borderRadius: 10, padding: '0 12px', boxShadow: `inset 0 0 0 1px ${T.line2}`, height: 38 }}>
              <Icon.search size={16} color={T.textMute} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search leads…" style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: fB, fontSize: 13.5, color: T.text, width: 150 }} />
            </div>
            <Select />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS.length}, minmax(190px, 1fr))`, gap: 14, alignItems: 'start' }}>
          {COLS.map((col) => {
            const items = filtered.filter((l) => l.col === col.id);
            const isOver = over === col.id;
            return (
              <div key={col.id}
                onDragOver={(e) => { e.preventDefault(); if (over !== col.id) setOver(col.id); }}
                onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOver((o) => (o === col.id ? null : o)); }}
                onDrop={() => onDrop(col.id)}
                style={{ background: isOver ? 'rgba(82,183,136,.06)' : T.bg2, borderRadius: 15, padding: 10, boxShadow: `inset 0 0 0 1px ${isOver ? T.green : T.line}`, transition: 'box-shadow .15s, background .15s', minHeight: 120 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 6px 12px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 9, background: col.c }} />
                  <span style={{ fontFamily: fD, fontWeight: 600, fontSize: 13.5, color: T.text }}>{col.label}</span>
                  <span style={{ marginLeft: 'auto', fontFamily: fB, fontSize: 12, fontWeight: 600, color: T.textMute, background: T.surface, borderRadius: 7, padding: '2px 8px', boxShadow: `inset 0 0 0 1px ${T.line}` }}>{items.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {items.map((l) => <Lead key={l.id} lead={l} />)}
                  {items.length === 0 && <div style={{ fontFamily: fB, fontSize: 12.5, color: T.textDim, textAlign: 'center', padding: '18px 0', border: `1px dashed ${T.line2}`, borderRadius: 11 }}>{isOver ? 'Drop here' : 'No leads'}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── AI Calendar week view ────────────────────────────────────
  function CalendarWeek() {
    const BE = get();
    const { APPTS, SVC, DAYS, DATES } = BE;
    const H0 = 8, H1 = 18, ROW = 56; // 8am–6pm
    const hours = [];
    for (let h = H0; h <= H1; h++) hours.push(h);
    const fmtH = (h) => { const am = h < 12; const hr = h % 12 === 0 ? 12 : h % 12; return `${hr} ${am ? 'AM' : 'PM'}`; };
    const todayIdx = 1; // Tue highlighted as "today" for the demo

    return (
      <div style={{ background: T.surface, borderRadius: 16, boxShadow: `inset 0 0 0 1px ${T.line}`, overflow: 'hidden' }}>
        {/* toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderBottom: `1px solid ${T.line}` }}>
          <div style={{ fontFamily: fD, fontWeight: 600, fontSize: 16, color: T.text }}>June 8–13, 2026</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line2}`, cursor: 'pointer' }}><Icon.arrowRight size={15} color={T.textMute} style={{ transform: 'rotate(180deg)' }} /></div>
            <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line2}`, cursor: 'pointer' }}><Icon.arrowRight size={15} color={T.textMute} /></div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: fB, fontSize: 12.5, color: T.green, background: T.greenGlow, padding: '5px 11px', borderRadius: 999 }}>
            <Icon.sparkle size={13} color={T.green} />{APPTS.length} jobs auto-booked this week
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {Object.entries(SVC).map(([k, v]) => (
              <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: fB, fontSize: 12, color: T.textMute }}>
                <span style={{ width: 9, height: 9, borderRadius: 3, background: v.c }} />{v.label}
              </span>
            ))}
          </div>
        </div>
        {/* grid */}
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 760 }}>
            {/* day header */}
            <div style={{ display: 'grid', gridTemplateColumns: '56px repeat(6, 1fr)', borderBottom: `1px solid ${T.line}` }}>
              <div />
              {DAYS.map((d, i) => (
                <div key={d} style={{ padding: '10px 8px', textAlign: 'center', borderLeft: `1px solid ${T.line}`, background: i === todayIdx ? T.greenGlow : 'transparent' }}>
                  <div style={{ fontFamily: fB, fontSize: 11.5, color: i === todayIdx ? T.green : T.textMute, fontWeight: 600, letterSpacing: '.04em' }}>{d.toUpperCase()}</div>
                  <div style={{ fontFamily: fD, fontWeight: 700, fontSize: 15, color: i === todayIdx ? T.green : T.text, marginTop: 2 }}>{DATES[i].split(' ')[1]}</div>
                </div>
              ))}
            </div>
            {/* time grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '56px repeat(6, 1fr)', position: 'relative' }}>
              {/* hour labels + row lines */}
              <div>
                {hours.map((h) => (
                  <div key={h} style={{ height: ROW, position: 'relative' }}>
                    <span style={{ position: 'absolute', top: -7, right: 8, fontFamily: fB, fontSize: 10.5, color: T.textDim }}>{fmtH(h)}</span>
                  </div>
                ))}
              </div>
              {DAYS.map((d, di) => (
                <div key={d} style={{ position: 'relative', borderLeft: `1px solid ${T.line}`, background: di === todayIdx ? 'rgba(82,183,136,.03)' : 'transparent' }}>
                  {hours.map((h) => <div key={h} style={{ height: ROW, borderTop: `1px solid ${T.line}` }} />)}
                  {APPTS.filter((a) => a.day === di).map((a, k) => {
                    const v = SVC[a.svc];
                    const top = (a.start - H0) * ROW;
                    const height = a.len * ROW - 6;
                    return (
                      <div key={k} title={`${a.name} · ${v.label}`} style={{ position: 'absolute', top: top + 2, left: 4, right: 4, height, background: `${v.c}22`, borderLeft: `3px solid ${v.c}`, borderRadius: 8, padding: '6px 8px', overflow: 'hidden', cursor: 'pointer' }}>
                        <div style={{ fontFamily: fD, fontWeight: 600, fontSize: 12, color: T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</div>
                        <div style={{ fontFamily: fB, fontSize: 11, color: v.c, marginTop: 1 }}>{v.label}</div>
                        {height > 52 && <div style={{ fontFamily: fB, fontSize: 10.5, color: T.textMute, marginTop: 3 }}>{a.tech}</div>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  window.PipelineBoard = PipelineBoard;
  window.CalendarWeek = CalendarWeek;
})();
