// backend-data.jsx — shared seed data + UI helpers for the InnoVista operator app.
(function () {
  const T = window.IV;
  const { Icon } = window;
  const fD = 'var(--font-display)';
  const fB = 'var(--font-body)';

  // service types share chroma with the brand green
  const SVC = {
    cooling:     { label: 'AC repair',     icon: 'snowflake', c: '#52b788' },
    heating:     { label: 'Heating',       icon: 'flame',     c: '#c79a5b' },
    install:     { label: 'Install',       icon: 'wind',      c: '#5b9ec7' },
    maintenance: { label: 'Tune-up',       icon: 'wrench',    c: '#9bb06a' },
  };

  // pipeline columns + leads (operator's lead board)
  const COLS = [
    { id: 'new', label: 'New Lead', c: '#52b788' },
    { id: 'contacted', label: 'Contacted', c: '#74c69d' },
    { id: 'qualified', label: 'Qualified', c: '#5b9ec7' },
    { id: 'booked', label: 'Booked', c: '#c79a5b' },
    { id: 'complete', label: 'Complete', c: '#6c8073' },
  ];
  const LEADS = [
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
    { id: 11, name: 'Aisha Brown', svc: 'cooling', phone: '(303) 555-0109', ch: 'Missed call', when: 'Mon', val: 600, hot: false, col: 'complete' },
    { id: 12, name: 'Derek Lowe', svc: 'install', phone: '(720) 555-0177', ch: 'Google', when: 'Mon', val: 6400, hot: false, col: 'complete' },
  ];

  // jobs table
  const JOBS = [
    { id: 'SH-4471', name: 'Dana Whitfield', svc: 'cooling', tech: 'Marcus D.', date: 'Today', time: '2:00–4:00 PM', val: 480, status: 'scheduled', booker: 'ai' },
    { id: 'SH-4470', name: 'Carla Mendez', svc: 'maintenance', tech: 'Priya R.', date: 'Today', time: '4:00–5:00 PM', val: 145, status: 'scheduled', booker: 'ai' },
    { id: 'SH-4469', name: 'Hassan Yusuf', svc: 'cooling', tech: 'Marcus D.', date: 'Today', time: '11:30–1:00 PM', val: 480, status: 'in_progress', booker: 'ai' },
    { id: 'SH-4468', name: 'Will Foster', svc: 'heating', tech: 'Jordan K.', date: 'Tomorrow', time: '9:00–11:00 AM', val: 410, status: 'scheduled', booker: 'staff' },
    { id: 'SH-4465', name: 'Renee Okafor', svc: 'cooling', tech: 'Marcus D.', date: 'Jun 6', time: '1:00–3:00 PM', val: 520, status: 'complete', booker: 'ai' },
    { id: 'SH-4462', name: 'Aisha Brown', svc: 'cooling', tech: 'Priya R.', date: 'Jun 5', time: '8:30–10:00 AM', val: 600, status: 'complete', booker: 'ai' },
    { id: 'SH-4458', name: 'Derek Lowe', svc: 'install', tech: 'Jordan K.', date: 'Jun 5', time: 'All day', val: 6400, status: 'complete', booker: 'staff' },
    { id: 'SH-4455', name: 'Greg Sanders', svc: 'heating', tech: 'Unassigned', date: 'Jun 9', time: '—', val: 290, status: 'unscheduled', booker: 'ai' },
  ];

  const STATUS = {
    unscheduled: { label: 'Unscheduled', c: '#9bb0a3', bg: 'rgba(155,176,163,.12)' },
    scheduled:   { label: 'Scheduled',   c: '#5b9ec7', bg: 'rgba(91,158,199,.14)' },
    in_progress: { label: 'In progress', c: '#c79a5b', bg: 'rgba(199,154,91,.14)' },
    complete:    { label: 'Complete',    c: '#52b788', bg: 'rgba(82,183,136,.14)' },
  };

  // calendar appointments (day index 0=Mon … 5=Sat, start hour decimal, length hrs)
  const APPTS = [
    { day: 0, start: 9, len: 2, name: 'Will Foster', svc: 'heating', tech: 'Jordan K.' },
    { day: 0, start: 13, len: 1.5, name: 'Greg Sanders', svc: 'heating', tech: 'Priya R.' },
    { day: 1, start: 11.5, len: 1.5, name: 'Hassan Yusuf', svc: 'cooling', tech: 'Marcus D.' },
    { day: 1, start: 14, len: 2, name: 'Dana Whitfield', svc: 'cooling', tech: 'Marcus D.' },
    { day: 1, start: 16, len: 1, name: 'Carla Mendez', svc: 'maintenance', tech: 'Priya R.' },
    { day: 2, start: 8.5, len: 1.5, name: 'Renee Okafor', svc: 'cooling', tech: 'Marcus D.' },
    { day: 2, start: 10.5, len: 3, name: 'Linda Park', svc: 'install', tech: 'Jordan K.' },
    { day: 3, start: 9, len: 2, name: 'Aisha Brown', svc: 'cooling', tech: 'Priya R.' },
    { day: 3, start: 13, len: 2, name: 'Marcus Bell', svc: 'install', tech: 'Jordan K.' },
    { day: 4, start: 10, len: 1, name: 'Tom Alvarez', svc: 'maintenance', tech: 'Priya R.' },
    { day: 4, start: 14.5, len: 2, name: 'Derek Lowe', svc: 'install', tech: 'Jordan K.' },
    { day: 5, start: 9.5, len: 1.5, name: 'Priya Nair', svc: 'heating', tech: 'Marcus D.' },
  ];

  // notification feed
  const NOTIFS = [
    { id: 1, group: 'Today', icon: 'calendar', tone: 'green', title: 'AI booked a job', body: 'Dana Whitfield · AC repair · Today 2:00–4:00 PM with Marcus D.', when: '2m', unread: true },
    { id: 2, group: 'Today', icon: 'phoneMissed', tone: 'green', title: 'Missed call recovered', body: 'Priya Nair texted back within 8s — qualified as a heating no-heat call.', when: '31m', unread: true },
    { id: 3, group: 'Today', icon: 'sparkle', tone: 'blue', title: 'Lead qualified', body: 'Linda Park · install quote · est. $9,200 — flagged high value.', when: '1h', unread: true },
    { id: 4, group: 'Today', icon: 'chat', tone: 'mute', title: 'Reminder sent', body: 'Appointment reminder texted to Hassan Yusuf for 11:30 AM.', when: '2h', unread: false },
    { id: 5, group: 'Earlier', icon: 'check', tone: 'green', title: 'Job completed', body: 'Renee Okafor · AC repair · $520 collected. Review request sent.', when: 'Yesterday', unread: false },
    { id: 6, group: 'Earlier', icon: 'user', tone: 'mute', title: 'New review', body: '★★★★★ from Aisha Brown: “Booked online at 11pm, fixed by noon.”', when: 'Yesterday', unread: false },
    { id: 7, group: 'Earlier', icon: 'bell', tone: 'amber', title: 'Follow-up needed', body: 'Greg Sanders hasn’t picked a time — AI will nudge again in 24h.', when: '2d', unread: false },
  ];

  // pricing config the AI quotes from
  const PRICING = [
    { svc: 'cooling', items: [
      { name: 'Diagnostic / service call', price: '$89', note: 'Waived if repair approved' },
      { name: 'AC repair (standard)', price: '$180–$650', note: 'Parts + labor' },
      { name: 'Refrigerant recharge', price: '$250–$450', note: 'Per lb varies' },
    ], aiQuote: true },
    { svc: 'heating', items: [
      { name: 'Furnace diagnostic', price: '$89', note: 'Waived if repair approved' },
      { name: 'Furnace repair', price: '$200–$700', note: 'Parts + labor' },
      { name: 'No-heat emergency (after hrs)', price: '+$120', note: 'Trip surcharge' },
    ], aiQuote: true },
    { svc: 'install', items: [
      { name: 'New AC system', price: '$5,800–$9,500', note: 'In-home estimate' },
      { name: 'Furnace replacement', price: '$4,200–$7,000', note: 'In-home estimate' },
    ], aiQuote: false },
    { svc: 'maintenance', items: [
      { name: 'Seasonal tune-up', price: '$145', note: 'Per system' },
      { name: 'Comfort Club membership', price: '$19/mo', note: '2 visits / yr + 15% off' },
    ], aiQuote: true },
  ];

  // ── helpers ──
  const initials = (n) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');
  const money = (v) => '$' + v.toLocaleString('en-US');

  // ── shared UI ──
  function Avatar({ name, size = 32, accent = T.green }) {
    return (
      <div style={{ width: size, height: size, borderRadius: 99, flexShrink: 0, background: T.surface2, boxShadow: `inset 0 0 0 1px ${T.line2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fD, fontWeight: 700, fontSize: size * 0.38, color: accent }}>{initials(name)}</div>
    );
  }

  function StatusPill({ status }) {
    const s = STATUS[status] || STATUS.scheduled;
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: fB, fontSize: 12, fontWeight: 600, color: s.c, background: s.bg, padding: '4px 10px', borderRadius: 7 }}>
        <span style={{ width: 6, height: 6, borderRadius: 9, background: s.c }} />{s.label}
      </span>
    );
  }

  function SvcTag({ svc, small }) {
    const v = SVC[svc]; const I = Icon[v.icon];
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', fontFamily: fB, fontSize: small ? 11.5 : 12.5, fontWeight: 600, color: v.c, background: 'rgba(255,255,255,.03)', padding: small ? '3px 8px' : '4px 10px', borderRadius: 7, boxShadow: `inset 0 0 0 1px ${T.line}` }}>
        <I size={small ? 12 : 13} color={v.c} />{v.label}
      </span>
    );
  }

  function AiBadge() {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: fB, fontSize: 11, fontWeight: 600, color: T.green, background: T.greenGlow, padding: '3px 8px', borderRadius: 6 }}>
        <Icon.sparkle size={11} color={T.green} />AI
      </span>
    );
  }

  function Card({ title, sub, action, pad = 20, children, style }) {
    return (
      <div style={{ background: T.surface, borderRadius: 16, boxShadow: `inset 0 0 0 1px ${T.line}`, ...style }}>
        {(title || action) && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `16px ${pad}px`, borderBottom: `1px solid ${T.line}` }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: fD, fontWeight: 600, fontSize: 15.5, color: T.text, whiteSpace: 'nowrap' }}>{title}</div>
              {sub && <div style={{ fontFamily: fB, fontSize: 12.5, color: T.textMute, marginTop: 2 }}>{sub}</div>}
            </div>
            {action}
          </div>
        )}
        <div style={{ padding: pad }}>{children}</div>
      </div>
    );
  }

  window.BE = {
    SVC, COLS, LEADS, JOBS, STATUS, APPTS, NOTIFS, PRICING,
    initials, money, Avatar, StatusPill, SvcTag, AiBadge, Card,
    DAYS: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    DATES: ['Jun 8', 'Jun 9', 'Jun 10', 'Jun 11', 'Jun 12', 'Jun 13'],
  };
})();
