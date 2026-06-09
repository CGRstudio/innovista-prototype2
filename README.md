# InnoVista Strategies — Product

AI-powered lead capture and automated booking for home-service (HVAC) businesses.

This repo contains the full product as a static site — **three connected experiences**, one for each audience:

| Audience | File | What it is |
|---|---|---|
| **Prospects** (HVAC owners) | `InnoVista Website.html` | The marketing website, with a live AI chat widget in the corner |
| **Homeowners** (the business's clients) | `InnoVista Screens.html` → Screen 2 | The AI text-message assistant that qualifies and books a job after a missed call |
| **The HVAC business** (operator) | `InnoVista Backend.html` | The dashboard they log into — pipeline, AI calendar, jobs, notifications, pricing |

`index.html` is a hub landing page that links to all three.

---

## Quick start

This is a static site — no build step, no install.

```bash
npx serve .
# open the printed http://localhost:3000 URL
```

Or open `index.html` in a browser. (If screens don't render from `file://`, use the local server above — browsers block local module/script loading.)

### Live demo (GitHub Pages)

1. Upload everything in this folder to a GitHub repo.
2. Repo **Settings → Pages → Source → Deploy from a branch → `main` / root**.
3. Your hub goes live at `https://<you>.github.io/<repo>/`.

---

## File map

**Hub**
- `index.html` — landing page linking the three experiences
- `.nojekyll` — makes GitHub Pages serve the `.jsx` files correctly

**Marketing website** (for prospects)
- `InnoVista Website.html` — entry point
- `site.jsx` — all sections + the floating chat widget
- `chatbot.jsx` — shared chat engine (`useChatFlow` + `ChatBody`)

**Operator dashboard** (for the business)
- `InnoVista Backend.html` — entry point (login → dashboard)
- `backend-data.jsx` — seed data (leads, jobs, appointments, notifications, pricing) + shared UI
- `backend-board.jsx` — pipeline kanban + AI calendar week view
- `backend-app.jsx` — login page, app shell, and the lighter views

**Design prototype** (Figma-style canvas of all screens, incl. the homeowner AI chat)
- `InnoVista Screens.html` — entry point (canvas + Present mode for client demos)
- `app.jsx`, `landing.jsx`, `dashboard.jsx` — the three mockup screens
- `browser-window.jsx`, `ios-frame.jsx`, `tweaks-panel.jsx` — presentation frames + tweak controls
- `InnoVista Screens (Figma import).html` — single self-contained file (for importing into Figma via the html.to.design plugin)

**Shared**
- `icons.jsx` — inline SVG icon set + logo mark

---

## Tech notes for the developer

This is a **prototype**, optimized for fidelity and fast iteration — not production. Read before estimating.

- **React 18** via UMD + **Babel Standalone** (in-browser JSX). Great for a no-build prototype; for production, move to a real toolchain (Vite/Next) and precompile.
- **Styling is inline style objects.** The design system lives in the `window.IV` token object defined in a `<script>` near the top of each HTML entry file — colors, surfaces, lines, text shades. Port these to CSS variables / your theme.
- **Typography:** `Space Grotesk` (display) + `Hanken Grotesk` (body), loaded from Google Fonts.
- **Components share scope via `window`** (each Babel script assigns to `window.X`). In a real build these become normal module imports.

### What's real vs. mocked

| Behavior | Status |
|---|---|
| Website layout, responsive | Real |
| Homeowner AI chat conversation | **Scripted** (linear flow in `SCRIPT` in `chatbot.jsx`) — no real NLP/SMS backend |
| Dashboard login | Any credentials → enters (no auth backend) |
| Pipeline drag-and-drop, search, filter | Real (local state) |
| Jobs filter, pricing toggles, settings toggles | Real (local state) |
| Calendar, KPIs, notifications, lead/job data | **Seed data** — no API |

### Next steps for production
- Wire the chat to a real conversation engine + SMS provider (e.g. Twilio).
- Add real auth to the dashboard; back pipeline/jobs/calendar with an API; persist changes.
- Replace Babel-in-browser with a compiled build.
- Extract `window.IV` tokens into a shared theme; lift inline styles into CSS/Tailwind.

---

© 2026 InnoVista Strategies. Lead capture for the trades.
