# LumiEmbed Space Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first runnable React + Vite version of the LumiEmbed Space high-end single-page portfolio.

**Architecture:** The site is a static React application with data-driven sections and no backend. `src/data/portfolio.js` owns editable content, `src/App.jsx` composes semantic sections, and `src/styles.css` owns the warm glass/particle visual system.

**Tech Stack:** React, Vite, CSS animations, static assets in `public/`, browser verification.

---

## File Structure

- Create `package.json`: npm scripts and dependencies for Vite + React.
- Create `index.html`: Vite HTML shell and metadata.
- Create `src/main.jsx`: React entry point.
- Create `src/App.jsx`: page composition, navigation, sections, and repeated UI components.
- Create `src/data/portfolio.js`: editable nav labels, case entries, interaction entries, and contact email.
- Create `src/styles.css`: global layout, warm dream particle hero, glass surfaces, responsive behavior, reduced-motion support.
- Create `public/media/README.md`: explains where future videos/posters should be placed and the expected filenames.
- Modify `.gitignore` only if needed for Vite outputs; it already ignores `node_modules/`, `dist/`, and `.superpowers/`.

## Task 1: Visual Reference Pass

**Files:**
- Read: `docs/superpowers/specs/2026-07-09-lumiembed-space-design.md`
- Create: `docs/superpowers/visual-notes/2026-07-09-lumiembed-space-visual-system.md`

- [ ] **Step 1: Create visual-system notes from the approved direction**

Create `docs/superpowers/visual-notes/2026-07-09-lumiembed-space-visual-system.md` with this content:

```markdown
# LumiEmbed Space Visual System

## Approved Direction

Warm Dream Particles.

## Palette

- Page warm white: `#fffaf0`
- Surface white glass: `rgba(255, 255, 255, 0.56)`
- Amber highlight: `#ffb34d`
- Orange accent: `#f47b35`
- Deep text: `#2b170b`
- Muted text: `rgba(43, 23, 11, 0.64)`
- Soft border: `rgba(255, 184, 92, 0.26)`

## Typography

- Use a modern sans-serif stack: `Inter`, `ui-sans-serif`, `system-ui`, `Microsoft YaHei`, `sans-serif`.
- Use large editorial headings with normal letter spacing.
- Keep body text readable and calm.

## Hero Motion

- Use layered radial gradients and 18-24 animated particle elements.
- Motion should be slow, floating, and warm.
- Provide `prefers-reduced-motion` fallback.

## Container Rules

- Max content width: `1700px`.
- Use glass only for navigation, media shells, and selected project surfaces.
- Avoid nested cards and dense dashboard chrome.

## Section Rhythm

- Hero: full viewport.
- Role introduction: open editorial layout.
- Works: one large video shell plus poster/case surfaces.
- Interactive experience: three refined entries.
- Contact: calm closing band with email link.
```

- [ ] **Step 2: Commit visual notes**

Run:

```bash
git add docs/superpowers/visual-notes/2026-07-09-lumiembed-space-visual-system.md
git commit -m "docs: add LumiEmbed visual system notes"
```

Expected: commit succeeds.

## Task 2: Scaffold React + Vite

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `public/media/README.md`

- [ ] **Step 1: Create `package.json`**

Create `package.json`:

```json
{
  "name": "lumiembed-space",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "vite build",
    "preview": "vite preview --host 127.0.0.1"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^latest",
    "vite": "^latest",
    "react": "^latest",
    "react-dom": "^latest"
  },
  "devDependencies": {}
}
```

- [ ] **Step 2: Create `index.html`**

Create `index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="LumiEmbed Space - embedded systems and machine vision engineer portfolio."
    />
    <title>LumiEmbed Space</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Create `src/main.jsx`**

Create `src/main.jsx`:

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 4: Create `public/media/README.md`**

Create `public/media/README.md`:

```markdown
# Media Assets

Future visual assets can be placed here.

Recommended filenames:

- `hero-video.mp4` for a future full-screen hero video
- `project-video.mp4` for the featured project video
- `poster-1.jpg` or `poster-1.png` for the main poster
- `poster-2.jpg` or `poster-2.png` for additional case imagery

The current first version uses CSS motion and visual media shells, so these files are optional.
```

- [ ] **Step 5: Install dependencies**

Run:

```bash
npm install
```

Expected: `node_modules/` and `package-lock.json` are created, with no install errors.

- [ ] **Step 6: Commit scaffold**

Run:

```bash
git add package.json package-lock.json index.html src/main.jsx public/media/README.md
git commit -m "feat: scaffold LumiEmbed React app"
```

Expected: commit succeeds.

## Task 3: Add Portfolio Data

**Files:**
- Create: `src/data/portfolio.js`

- [ ] **Step 1: Create `src/data/portfolio.js`**

Create `src/data/portfolio.js`:

```js
export const navItems = [
  { label: "角色介绍", href: "#role" },
  { label: "作品案例", href: "#works" },
  { label: "互动体验", href: "#experience" },
  { label: "联系方式", href: "#contact" },
];

export const skillSignals = [
  "Embedded systems",
  "Machine vision",
  "Edge devices",
  "STM32 / ESP32 / Raspberry Pi",
  "4G camera car",
];

export const projectCases = [
  {
    title: "4G Camera Car",
    category: "Edge Vision / Remote Video",
    description:
      "A remote camera platform exploring TCP video upload, cloud relay, and future vehicle-control interfaces.",
    mediaType: "video",
  },
  {
    title: "Smart Fan",
    category: "Embedded Control",
    description:
      "An STM32-based smart fan project with sensing, display, BLE communication, and mobile interaction.",
    mediaType: "poster",
  },
  {
    title: "Vision Lab Notes",
    category: "Machine Vision",
    description:
      "A growing space for visual detection experiments, image processing notes, and edge AI prototypes.",
    mediaType: "case",
  },
];

export const experienceEntries = [
  {
    title: "Vision Demo",
    description: "A future browser-based area for detection demos and visual experiment previews.",
    action: "Preview soon",
    href: "#works",
  },
  {
    title: "Mini Games",
    description: "A future playful area for 2048, snake, tic-tac-toe, and small interactive sketches.",
    action: "Coming soon",
    href: "#experience",
  },
  {
    title: "4G Camera Car",
    description: "Open the current live camera page while the integrated car page is being designed.",
    action: "Open camera",
    href: "http://175.178.171.79:8080",
  },
];

export const contact = {
  email: "1022815834@qq.com",
};
```

- [ ] **Step 2: Commit data**

Run:

```bash
git add src/data/portfolio.js
git commit -m "feat: add portfolio content data"
```

Expected: commit succeeds.

## Task 4: Build Page Structure

**Files:**
- Create: `src/App.jsx`

- [ ] **Step 1: Create `src/App.jsx`**

Create `src/App.jsx`:

```jsx
import {
  contact,
  experienceEntries,
  navItems,
  projectCases,
  skillSignals,
} from "./data/portfolio.js";

function ParticleField() {
  return (
    <div className="particle-field" aria-hidden="true">
      {Array.from({ length: 24 }, (_, index) => (
        <span
          className="particle"
          key={index}
          style={{
            "--x": `${8 + ((index * 37) % 88)}%`,
            "--y": `${12 + ((index * 29) % 74)}%`,
            "--delay": `${-(index % 9) * 0.7}s`,
            "--size": `${4 + (index % 5)}px`,
          }}
        />
      ))}
    </div>
  );
}

function Header() {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <a className="brand" href="#hero" aria-label="LumiEmbed Space home">
        LumiEmbed
      </a>
      <nav className="nav-links">
        {navItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="hero">
      <ParticleField />
      <Header />
      <div className="hero-content">
        <p className="section-note">Warm embedded vision portfolio</p>
        <h1>LumiEmbed Space</h1>
        <p className="hero-subtitle">
          Embedded + Machine Vision Engineer crafting edge devices, visual systems,
          and small intelligent machines with a warm technical aesthetic.
        </p>
        <div className="hero-actions" aria-label="Hero actions">
          <a className="button primary" href="#works">
            View works
          </a>
          <a className="button ghost" href={`mailto:${contact.email}`}>
            Contact
          </a>
        </div>
      </div>
      <div className="hero-orb" aria-hidden="true" />
    </section>
  );
}

function RoleSection() {
  return (
    <section className="section role-section" id="role">
      <div className="section-inner role-grid">
        <div>
          <p className="section-note">角色介绍</p>
          <h2>Building warm machines that can sense, see, and respond.</h2>
        </div>
        <div className="role-copy">
          <p>
            I focus on embedded systems and machine vision: from MCU control and
            communication links to camera streams, edge devices, and future robot
            interaction surfaces.
          </p>
          <div className="skill-cloud" aria-label="Skill areas">
            {skillSignals.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorksSection() {
  return (
    <section className="section works-section" id="works">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-note">作品案例</p>
          <h2>Video, posters, and engineering case surfaces.</h2>
        </div>
        <div className="works-grid">
          {projectCases.map((item, index) => (
            <article className={`work-card work-card-${index + 1}`} key={item.title}>
              <div className="media-shell">
                <span>{item.mediaType}</span>
              </div>
              <div className="work-body">
                <p>{item.category}</p>
                <h3>{item.title}</h3>
                <span>{item.description}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="section experience-section" id="experience">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-note">互动体验</p>
          <h2>Small doors into future demos, games, and device experiences.</h2>
        </div>
        <div className="experience-grid">
          {experienceEntries.map((entry) => (
            <a
              className="experience-card"
              href={entry.href}
              key={entry.title}
              target={entry.href.startsWith("http") ? "_blank" : undefined}
              rel={entry.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span>{entry.action}</span>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="section-inner contact-panel">
        <p className="section-note">联系方式</p>
        <h2>Let ideas become devices.</h2>
        <a className="email-link" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <RoleSection />
        <WorksSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Commit structure**

Run:

```bash
git add src/App.jsx
git commit -m "feat: compose LumiEmbed portfolio sections"
```

Expected: commit succeeds.

## Task 5: Add Visual System CSS

**Files:**
- Create: `src/styles.css`

- [ ] **Step 1: Create `src/styles.css`**

Create `src/styles.css`:

```css
:root {
  color: #2b170b;
  background: #fffaf0;
  font-family: Inter, ui-sans-serif, system-ui, "Microsoft YaHei", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  --page: #fffaf0;
  --page-2: #fff3dc;
  --ink: #2b170b;
  --muted: rgba(43, 23, 11, 0.64);
  --glass: rgba(255, 255, 255, 0.56);
  --line: rgba(255, 184, 92, 0.26);
  --amber: #ffb34d;
  --orange: #f47b35;
  --max: 1700px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

.hero-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 199, 94, 0.5), transparent 26%),
    radial-gradient(circle at 78% 18%, rgba(244, 123, 53, 0.22), transparent 25%),
    radial-gradient(circle at 50% 56%, rgba(255, 255, 255, 0.74), transparent 22%),
    linear-gradient(135deg, var(--page) 0%, #fff 44%, var(--page-2) 100%);
}

.site-header {
  position: fixed;
  z-index: 20;
  top: 28px;
  left: 50%;
  width: min(calc(100% - 44px), var(--max));
  height: 68px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.46);
  backdrop-filter: blur(24px);
  box-shadow: 0 18px 70px rgba(155, 82, 22, 0.12);
}

.brand {
  font-size: 18px;
  font-weight: 760;
}

.nav-links {
  display: flex;
  gap: 28px;
  font-size: 14px;
  color: var(--muted);
}

.nav-links a {
  transition: color 180ms ease;
}

.nav-links a:hover {
  color: var(--ink);
}

.hero-content {
  position: relative;
  z-index: 4;
  width: min(calc(100% - 44px), var(--max));
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 0 80px;
}

.section-note {
  margin: 0 0 18px;
  color: rgba(116, 63, 19, 0.76);
  font-size: 13px;
  font-weight: 720;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  letter-spacing: 0;
}

h1 {
  max-width: 980px;
  margin: 0;
  font-size: clamp(72px, 12vw, 188px);
  line-height: 0.86;
  font-weight: 740;
}

.hero-subtitle {
  max-width: 680px;
  margin: 34px 0 0;
  color: var(--muted);
  font-size: clamp(18px, 2vw, 26px);
  line-height: 1.5;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 38px;
}

.button {
  display: inline-flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 720;
}

.button.primary {
  background: var(--ink);
  color: #fff9ed;
  box-shadow: 0 18px 50px rgba(43, 23, 11, 0.2);
}

.button.ghost {
  border: 1px solid var(--line);
  background: var(--glass);
  backdrop-filter: blur(18px);
}

.hero-orb {
  position: absolute;
  z-index: 1;
  right: 8vw;
  top: 21vh;
  width: min(42vw, 650px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 32%, #fff, #ffd084 30%, rgba(255, 131, 42, 0.42) 56%, transparent 70%);
  filter: blur(0.2px);
  opacity: 0.78;
}

.particle-field {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.particle {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 0 24px rgba(255, 174, 62, 0.78);
  animation: particleFloat 8s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes particleFloat {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(0.9);
    opacity: 0.32;
  }
  50% {
    transform: translate3d(22px, -36px, 0) scale(1.65);
    opacity: 0.96;
  }
}

.section {
  position: relative;
  padding: clamp(80px, 11vw, 170px) 22px;
  background: linear-gradient(180deg, #fffaf0 0%, #fff 54%, #fff5e4 100%);
}

.section-inner {
  width: min(100%, var(--max));
  margin: 0 auto;
}

.section-heading {
  max-width: 880px;
  margin-bottom: 44px;
}

.section h2 {
  max-width: 1050px;
  margin: 0;
  font-size: clamp(42px, 6vw, 104px);
  line-height: 0.98;
  font-weight: 700;
}

.role-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(32px, 6vw, 110px);
  align-items: start;
}

.role-copy p {
  margin: 0;
  color: var(--muted);
  font-size: clamp(18px, 2vw, 28px);
  line-height: 1.55;
}

.skill-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.skill-cloud span {
  padding: 12px 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.56);
  color: rgba(43, 23, 11, 0.72);
}

.works-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 22px;
}

.work-card {
  min-height: 460px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 28px;
  background: var(--glass);
  box-shadow: 0 28px 90px rgba(151, 80, 24, 0.13);
  backdrop-filter: blur(22px);
}

.work-card-1 {
  grid-row: span 2;
}

.media-shell {
  min-height: 310px;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 48% 36%, rgba(255, 255, 255, 0.9), transparent 12%),
    radial-gradient(circle at 50% 40%, rgba(255, 179, 77, 0.64), transparent 32%),
    linear-gradient(145deg, #fff9ed, #ffd589);
  color: rgba(77, 38, 11, 0.52);
  font-size: 13px;
  font-weight: 760;
  text-transform: uppercase;
}

.work-body {
  padding: 30px;
}

.work-body p,
.work-body span {
  color: var(--muted);
  line-height: 1.65;
}

.work-body p {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 720;
  text-transform: uppercase;
}

.work-body h3 {
  margin: 0 0 14px;
  font-size: clamp(28px, 3vw, 50px);
  line-height: 1;
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.experience-card {
  min-height: 300px;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0 22px 70px rgba(151, 80, 24, 0.1);
  transition: transform 180ms ease, border-color 180ms ease;
}

.experience-card:hover {
  transform: translateY(-5px);
  border-color: rgba(244, 123, 53, 0.38);
}

.experience-card span {
  color: rgba(116, 63, 19, 0.72);
  font-size: 13px;
  font-weight: 720;
  text-transform: uppercase;
}

.experience-card h3 {
  margin: 78px 0 16px;
  font-size: clamp(28px, 3vw, 46px);
  line-height: 1;
}

.experience-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
}

.contact-panel {
  padding: clamp(42px, 7vw, 96px);
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 34px;
  background:
    radial-gradient(circle at 90% 16%, rgba(255, 179, 77, 0.3), transparent 26%),
    rgba(255, 255, 255, 0.58);
  box-shadow: 0 35px 110px rgba(151, 80, 24, 0.14);
}

.email-link {
  display: inline-flex;
  margin-top: 30px;
  color: var(--orange);
  font-size: clamp(22px, 4vw, 58px);
  font-weight: 720;
  overflow-wrap: anywhere;
}

@media (max-width: 900px) {
  .site-header {
    top: 14px;
    width: calc(100% - 24px);
    height: auto;
    min-height: 60px;
    align-items: flex-start;
    border-radius: 24px;
    padding: 18px;
  }

  .nav-links {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 8px 16px;
    font-size: 12px;
  }

  .hero-content {
    width: calc(100% - 36px);
    padding-top: 132px;
  }

  .role-grid,
  .works-grid,
  .experience-grid {
    grid-template-columns: 1fr;
  }

  .work-card,
  .experience-card {
    min-height: 280px;
  }

  .work-card-1 {
    grid-row: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .particle {
    animation: none;
  }

  .experience-card,
  .nav-links a {
    transition: none;
  }
}
```

- [ ] **Step 2: Run build**

Run:

```bash
npm run build
```

Expected: Vite build succeeds and writes `dist/`.

- [ ] **Step 3: Commit styling**

Run:

```bash
git add src/styles.css
git commit -m "feat: add warm particle portfolio styling"
```

Expected: commit succeeds.

## Task 6: Browser QA And Final Polish

**Files:**
- Modify: `src/App.jsx` if copy or structure needs minor fixes.
- Modify: `src/styles.css` if layout, responsiveness, or motion needs fixes.

- [ ] **Step 1: Start local dev server**

Run:

```bash
npm run dev
```

Expected: Vite prints a local URL such as `http://127.0.0.1:5173/`.

- [ ] **Step 2: Verify desktop in browser**

Open the local URL and verify:

- first viewport shows `LumiEmbed Space`
- hero uses warm animated particles
- nav links are visible: `角色介绍`, `作品案例`, `互动体验`, `联系方式`
- no phone number is visible
- email is `1022815834@qq.com`

- [ ] **Step 3: Verify anchor navigation**

Click each nav link.

Expected:

- `角色介绍` scrolls to the role section
- `作品案例` scrolls to the works section
- `互动体验` scrolls to the experience section
- `联系方式` scrolls to the contact section

- [ ] **Step 4: Verify mobile layout**

Set browser viewport near `390x844`.

Expected:

- no horizontal scroll
- header wraps cleanly
- hero headline remains readable
- works and experience sections collapse to one column
- email wraps without clipping

- [ ] **Step 5: Fix issues if found**

If the header overlaps too much on mobile, reduce `gap` in `.nav-links` and increase `padding-top` on `.hero-content`.

Use this CSS adjustment:

```css
@media (max-width: 560px) {
  .site-header {
    display: block;
  }

  .brand {
    display: block;
    margin-bottom: 12px;
  }

  .nav-links {
    grid-template-columns: 1fr 1fr;
  }

  h1 {
    font-size: clamp(58px, 18vw, 92px);
  }
}
```

- [ ] **Step 6: Run final build**

Run:

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 7: Commit QA fixes**

If files changed, run:

```bash
git add src/App.jsx src/styles.css
git commit -m "fix: polish LumiEmbed responsive presentation"
```

If no files changed, run:

```bash
git status --short
```

Expected: clean working tree or only intentionally untracked runtime files ignored by `.gitignore`.

## Self-Review

- Spec coverage: Hero, role introduction, works/cases, interactive experience, contact email, no phone number, React + Vite, static deployment readiness, desktop width, mobile readability, and reduced-motion behavior are covered.
- Open-item scan: The plan uses concrete visual media shells and explicit future asset filenames. There are no unspecified tasks, open requirements, or missing file contents.
- Type consistency: `navItems`, `skillSignals`, `projectCases`, `experienceEntries`, and `contact` are defined in Task 3 and imported with matching names in Task 4.
