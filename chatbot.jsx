// chatbot.jsx — Screen 2. SMS-style InnoVista AI booking flow (mobile, interactive).
(function () {
  const { useState, useRef, useEffect } = React;
  const { Icon } = window;
  const T = window.IV;
  const fD = 'var(--font-display)';
  const fB = 'var(--font-body)';

  // Linear script. Each step = one bot turn (one or more lines) + the quick replies
  // shown afterwards. '__BOOKING__' renders the confirmation card; auto advances on.
  const SCRIPT = [
    { bot: ['Hey — thanks for calling Summit Heating & Air, sorry we missed you! 🙏', 'This is the team’s assistant. What’s going on with your system?'],
      replies: ['AC won’t cool', 'No heat', 'Just need a tune-up'] },
    { bot: ['Ugh, in this heat? Let’s get you handled fast.', 'Is it running but blowing warm, or not kicking on at all?'],
      replies: ['Blowing warm air', 'Won’t turn on'] },
    { bot: ['Got it. What’s the zip at the home so I can check we cover you?'],
      replies: ['80027', 'Type my address'] },
    { bot: ['Perfect — Louisville’s right in our service area. ✅', 'How soon do you need someone out?'],
      replies: ['Today if possible', 'Sometime this week', 'Just getting a quote'] },
    { bot: ['Good news — I’ve got a tech wrapping up a job nearby.', 'I can hold today, 2:00–4:00 PM. Want me to lock it in?'],
      replies: ['Yes, book it 👍', 'Show me other times'] },
    { bot: ['__BOOKING__'], auto: 6 },
    { bot: ['You’re all set, Dana. Marcus will text when he’s about 30 minutes out.', 'Thanks for going with Summit! 🧊'],
      replies: ['↻ Start over'] },
  ];

  function BookingCard() {
    const Row = ({ icon, label, value }) => {
      const I = Icon[icon];
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 0', borderTop: `1px solid ${T.line}` }}>
          <I size={17} color={T.green} />
          <span style={{ fontFamily: fB, fontSize: 13, color: T.textMute, width: 78 }}>{label}</span>
          <span style={{ fontFamily: fB, fontSize: 13.5, color: T.text, fontWeight: 600 }}>{value}</span>
        </div>
      );
    };
    return (
      <div style={{
        background: T.surface, borderRadius: 17, padding: '15px 16px 6px',
        boxShadow: `inset 0 0 0 1.5px ${T.green}`, maxWidth: '90%',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingBottom: 12 }}>
          <div style={{ width: 30, height: 30, borderRadius: 99, background: T.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.check size={18} color="#06140d" />
          </div>
          <div>
            <div style={{ fontFamily: fD, fontWeight: 700, fontSize: 15, color: T.text }}>Appointment booked</div>
            <div style={{ fontFamily: fB, fontSize: 11.5, color: T.green }}>Confirmation #SH-4471</div>
          </div>
        </div>
        <Row icon="wrench" label="Service" value="AC — no cool" />
        <Row icon="calendar" label="When" value="Today, 2:00–4:00 PM" />
        <Row icon="user" label="Tech" value="Marcus D." />
        <Row icon="mapPin" label="Address" value="Louisville, CO 80027" />
        <div style={{ fontFamily: fB, fontSize: 11.5, color: T.textDim, padding: '10px 0 8px', lineHeight: 1.4 }}>
          Reply <b style={{ color: T.textMute }}>C</b> to cancel or <b style={{ color: T.textMute }}>R</b> to reschedule.
        </div>
      </div>
    );
  }

  function Bubble({ role, text }) {
    const me = role === 'user';
    if (role === 'card') return (
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}><BookingCard /></div>
    );
    return (
      <div style={{ display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start' }}>
        <div style={{
          maxWidth: '80%', fontFamily: fB, fontSize: 15, lineHeight: 1.42,
          padding: '9px 14px', borderRadius: 19,
          borderBottomRightRadius: me ? 6 : 19, borderBottomLeftRadius: me ? 19 : 6,
          background: me ? T.green : T.surface2,
          color: me ? '#06140d' : T.text,
          boxShadow: me ? 'none' : `inset 0 0 0 1px ${T.line}`,
        }}>{text}</div>
      </div>
    );
  }

  function Typing() {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 5, padding: '13px 16px', borderRadius: 19, borderBottomLeftRadius: 6, background: T.surface2, boxShadow: `inset 0 0 0 1px ${T.line}` }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 7, height: 7, borderRadius: 9, background: T.textDim, animation: 'ivblink 1.2s infinite', animationDelay: `${i * 0.18}s` }} />
          ))}
        </div>
      </div>
    );
  }

  // ── shared conversation engine, decoupled from chrome ────────
  function useChatFlow(active) {
    const [msgs, setMsgs] = useState([]);
    const [replies, setReplies] = useState([]);
    const [typing, setTyping] = useState(false);
    const scroller = useRef(null);
    const timers = useRef([]);
    const started = useRef(false);

    const after = (ms, fn) => { const id = setTimeout(fn, ms); timers.current.push(id); };
    const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = []; };

    function playStep(idx) {
      const step = SCRIPT[idx];
      setReplies([]);
      let t = 350;
      step.bot.forEach((line) => {
        const len = line === '__BOOKING__' ? 24 : line.length;
        const dur = Math.min(1500, 550 + len * 13);
        after(t, () => setTyping(true));
        after(t + dur, () => {
          setTyping(false);
          setMsgs((m) => [...m, line === '__BOOKING__' ? { role: 'card' } : { role: 'bot', text: line }]);
        });
        t += dur + 360;
      });
      after(t, () => {
        if (step.auto != null) playStep(step.auto);
        else setReplies(step.replies.map((r) => ({ label: r, next: idx + 1, restart: r.startsWith('↻') })));
      });
    }

    function reset() {
      clearAll();
      setMsgs([]); setReplies([]); setTyping(false);
      after(250, () => playStep(0));
    }

    function onReply(r) {
      if (r.restart) { reset(); return; }
      setReplies([]);
      setMsgs((m) => [...m, { role: 'user', text: r.label }]);
      after(450, () => playStep(r.next));
    }

    // begin once when the conversation becomes active
    useEffect(() => {
      if (active && !started.current) { started.current = true; reset(); }
    }, [active]);
    useEffect(() => clearAll, []);
    useEffect(() => {
      const el = scroller.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, [msgs, typing, replies]);

    return { msgs, replies, typing, scroller, onReply, reset };
  }

  // messages list + quick-reply/input footer (chrome-agnostic)
  function ChatBody({ flow, pad = 16, bottomPad = 16 }) {
    const { msgs, replies, typing, scroller, onReply } = flow;
    return (
      <React.Fragment>
        <div ref={scroller} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: `16px ${pad}px 8px`, display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div style={{ textAlign: 'center', fontFamily: fB, fontSize: 11.5, color: T.textDim, padding: '2px 0 8px' }}>
            Today · 9:41 PM &nbsp;·&nbsp; Missed call auto-text
          </div>
          {msgs.map((m, i) => <Bubble key={i} {...m} />)}
          {typing && <Typing />}
        </div>
        <div style={{ flexShrink: 0, padding: `8px ${pad - 2}px ${bottomPad}px`, background: 'rgba(13,19,15,.92)', backdropFilter: 'blur(10px)', borderTop: `1px solid ${T.line}` }}>
          {replies.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 11, justifyContent: 'flex-end' }}>
              {replies.map((r, i) => (
                <button key={i} onClick={() => onReply(r)} style={{
                  fontFamily: fB, fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
                  padding: '9px 15px', borderRadius: 999, border: 'none',
                  background: r.restart ? 'transparent' : T.greenGlow, color: T.green,
                  boxShadow: `inset 0 0 0 1.5px ${r.restart ? T.line2 : T.green}`,
                  transition: 'background .15s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = r.restart ? T.surface2 : 'rgba(82,183,136,.22)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = r.restart ? 'transparent' : T.greenGlow; }}>
                  {r.label}
                </button>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 42, borderRadius: 999, background: T.surface, boxShadow: `inset 0 0 0 1px ${T.line2}`, display: 'flex', alignItems: 'center', padding: '0 16px', fontFamily: fB, fontSize: 14, color: T.textDim }}>
              Text message…
            </div>
            <div style={{ width: 42, height: 42, borderRadius: 999, background: T.surface2, boxShadow: `inset 0 0 0 1px ${T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.arrowRight size={19} color={T.textDim} style={{ transform: 'rotate(-90deg)' }} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  function Launcher({ onOpen }) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.bg, position: 'relative', overflow: 'hidden' }}>
        {/* faux business site top bar */}
        <div style={{ padding: '52px 18px 13px', display: 'flex', alignItems: 'center', gap: 9, borderBottom: `1px solid ${T.line}` }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: T.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
            <Icon.snowflake size={18} color={T.green} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: fD, fontWeight: 700, fontSize: 14, color: T.text }}>Summit Heating &amp; Air</div>
            <div style={{ fontFamily: fB, fontSize: 11, color: T.textDim }}>Louisville, CO · Lic #HV-4471</div>
          </div>
          <Icon.menu size={20} color={T.textMute} />
        </div>
        {/* hero */}
        <div style={{ padding: '26px 20px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: fB, fontSize: 10.5, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: T.green, background: T.greenGlow, padding: '6px 11px', borderRadius: 999, boxShadow: `inset 0 0 0 1px ${T.line2}` }}>
            <span style={{ width: 5, height: 5, borderRadius: 9, background: T.green }} />24/7 emergency service
          </div>
          <h1 style={{ fontFamily: fD, fontWeight: 700, fontSize: 27, lineHeight: 1.12, letterSpacing: '-.02em', color: T.text, margin: '15px 0 0' }}>No cool? No heat?<br />We’ll be there today.</h1>
          <p style={{ fontFamily: fB, fontSize: 13.5, lineHeight: 1.5, color: T.textMute, margin: '11px 0 0' }}>Trusted by 2,000+ Front Range homeowners for fast, honest HVAC repair &amp; installs.</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <div style={{ fontFamily: fB, fontWeight: 600, fontSize: 13.5, color: '#06140d', background: T.green, borderRadius: 11, padding: '11px 17px' }}>Call now</div>
            <div style={{ fontFamily: fB, fontWeight: 600, fontSize: 13.5, color: T.text, borderRadius: 11, padding: '11px 17px', boxShadow: `inset 0 0 0 1px ${T.line2}` }}>Book online</div>
          </div>
        </div>
        {/* image placeholder */}
        <div style={{ margin: '22px 20px 30px', flex: 1, borderRadius: 16, background: 'repeating-linear-gradient(135deg, rgba(22,32,26,.55), rgba(22,32,26,.55) 11px, rgba(17,25,18,.55) 11px, rgba(17,25,18,.55) 22px)', boxShadow: `inset 0 0 0 1px ${T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11.5, color: T.textDim }}>[ photo: tech at the unit ]</span>
        </div>
        {/* attention bubble + chat launcher button */}
        <div style={{ position: 'absolute', right: 18, bottom: 42, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
          <div onClick={onOpen} style={{ cursor: 'pointer', maxWidth: 215, background: T.surface, color: T.text, fontFamily: fB, fontSize: 13, lineHeight: 1.42, padding: '11px 14px', borderRadius: 16, borderBottomRightRadius: 5, boxShadow: `inset 0 0 0 1px ${T.line2}, 0 16px 34px -14px rgba(0,0,0,.8)` }}>
            Sorry we missed your call — text us and we’ll get you booked 👋
          </div>
          <button onClick={onOpen} title="Open chat" style={{ position: 'relative', width: 60, height: 60, borderRadius: 999, border: 'none', cursor: 'pointer', background: T.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 14px 30px -8px ${T.green}` }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: 999, animation: 'ivpulse 2.2s infinite' }} />
            <Icon.chat size={26} color="#06140d" />
          </button>
        </div>
      </div>
    );
  }

  function Chatbot({ startOpen = false }) {
    const [open, setOpen] = useState(startOpen);
    const flow = useChatFlow(open);

    function openChat() { setOpen(true); }
    function collapse() { setOpen(false); }

    if (!open) return <Launcher onOpen={openChat} />;

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.bg }}>
        {/* header */}
        <div style={{ paddingTop: 52, background: 'rgba(13,19,15,.92)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${T.line}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '8px 16px 12px' }}>
            <div onClick={collapse} title="Minimize" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Icon.chevronDown size={22} color={T.green} style={{ transform: 'rotate(90deg)' }} />
            </div>
            <div style={{ width: 38, height: 38, borderRadius: 99, background: T.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
              <Icon.snowflake size={20} color={T.green} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: fD, fontWeight: 700, fontSize: 15.5, color: T.text }}>Summit Heating &amp; Air</div>
              <div style={{ fontFamily: fB, fontSize: 11.5, color: T.green, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 5, height: 5, borderRadius: 9, background: T.green, boxShadow: `0 0 8px ${T.green}` }} />
                InnoVista AI · replies instantly
              </div>
            </div>
            <div onClick={flow.reset} title="Restart" style={{ cursor: 'pointer', width: 34, height: 34, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
              <Icon.bell size={17} color={T.textMute} />
            </div>
          </div>
        </div>
        <ChatBody flow={flow} pad={16} bottomPad={30} />
      </div>
    );
  }

  window.Chatbot = Chatbot;
  window.useChatFlow = useChatFlow;
  window.ChatBody = ChatBody;
})();
