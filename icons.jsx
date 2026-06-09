// icons.jsx — simple line-icon set shared across screens.
// Each takes {size, color, stroke, fill} and renders a 24-grid stroke icon.
(function () {
  const Svg = ({ size = 20, color = 'currentColor', sw = 1.75, children, fill = 'none', style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', ...style }}>{children}</svg>
  );

  const Icon = {
    bolt: (p) => <Svg {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></Svg>,
    check: (p) => <Svg {...p}><path d="M20 6 9 17l-5-5" /></Svg>,
    checkCircle: (p) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></Svg>,
    calendar: (p) => <Svg {...p}><rect x="3" y="4.5" width="18" height="16" rx="2.5" /><path d="M3 9h18M8 2.5v4M16 2.5v4" /></Svg>,
    phone: (p) => <Svg {...p}><path d="M5 3.5h3.2l1.6 4-2 1.3a12 12 0 0 0 5.3 5.3l1.3-2 4 1.6V18a2.5 2.5 0 0 1-2.7 2.5A16.5 16.5 0 0 1 2.5 6.2 2.5 2.5 0 0 1 5 3.5Z" /></Svg>,
    phoneMissed: (p) => <Svg {...p}><path d="M5 3.5h3.2l1.6 4-2 1.3a12 12 0 0 0 5.3 5.3l1.3-2 4 1.6V18a2.5 2.5 0 0 1-2.7 2.5A16.5 16.5 0 0 1 2.5 6.2 2.5 2.5 0 0 1 5 3.5Z" /><path d="m16 3 5 5M21 3l-5 5" /></Svg>,
    chat: (p) => <Svg {...p}><path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 16.5H9l-4.5 3.5V7A1.5 1.5 0 0 1 6 5.5Z" /></Svg>,
    search: (p) => <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Svg>,
    bell: (p) => <Svg {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path d="M10 19a2 2 0 0 0 4 0" /></Svg>,
    chevronDown: (p) => <Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>,
    plus: (p) => <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>,
    filter: (p) => <Svg {...p}><path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z" /></Svg>,
    user: (p) => <Svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 20a8 8 0 0 1 16 0" /></Svg>,
    mapPin: (p) => <Svg {...p}><path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></Svg>,
    clock: (p) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></Svg>,
    arrowRight: (p) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>,
    menu: (p) => <Svg {...p}><path d="M3 6h18M3 12h18M3 18h18" /></Svg>,
    sparkle: (p) => <Svg {...p}><path d="M12 3c.6 4.2 1.8 5.4 6 6-4.2.6-5.4 1.8-6 6-.6-4.2-1.8-5.4-6-6 4.2-.6 5.4-1.8 6-6Z" /></Svg>,
    snowflake: (p) => <Svg {...p}><path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11" /><path d="M9 4l3 2 3-2M9 20l3-2 3 2" /></Svg>,
    flame: (p) => <Svg {...p}><path d="M12 22a6 6 0 0 0 6-6c0-4-3-5.5-3-9 0 0-3 1.5-3 5 0-2-1-3-1-3-2 1.5-5 4-5 7a6 6 0 0 0 6 6Z" /></Svg>,
    wrench: (p) => <Svg {...p}><path d="M15 3a5 5 0 0 0-5 6.5L3 16.5 5.5 19l7-7A5 5 0 1 0 15 3Z" /></Svg>,
    wind: (p) => <Svg {...p}><path d="M3 9h11a3 3 0 1 0-3-3M3 14h15a3 3 0 1 1-3 3" /></Svg>,
    grid: (p) => <Svg {...p}><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></Svg>,
    star: (p) => <Svg {...p}><path d="M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.2l1-5.9L3.5 9.2l5.9-.8L12 3Z" /></Svg>,
  };

  // Brand mark: a crisp geometric "V"-chevron inside a rounded square. Simple shapes only.
  const Logo = ({ size = 28, green = '#52b788', dark = '#0a0f0a' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ display: 'block' }}>
      <rect x="1" y="1" width="30" height="30" rx="9" fill={green} />
      <path d="M9 11.5l4.2 9.5a3 3 0 0 0 5.5 0L23 11.5" stroke={dark} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="9.5" r="1.9" fill={dark} />
    </svg>
  );

  window.Icon = Icon;
  window.Logo = Logo;
})();
