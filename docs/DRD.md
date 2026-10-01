# Design Requirements Document (DRD) — Miradon Portfolio

## 1. Design Philosophy & Aesthetic
- **Primary Visual Style:** Futuristic, Cyber-cinematic, High-tech minimalism.
- **Color Scheme:** Dark mode first with rich luminescent accent gradients (Cyan, Indigo, Electric Purple, Emerald accents).
- **Surface Elevation:** Translucent cyber-glass with subtle backdrop blur (`backdrop-blur-xl bg-slate-950/70 border border-slate-800/60`).
- **Visual Weight & Balance:** Two-column split layouts for optimal hierarchy between high-impact typography and visual media.

---

## 2. Design Tokens & Color Palette

```css
:root {
  /* Backgrounds */
  --bg-primary: #07090e;
  --bg-secondary: #0f1422;
  --bg-card: rgba(18, 24, 38, 0.7);
  --bg-card-hover: rgba(26, 35, 55, 0.85);

  /* Accents & Neon Glows */
  --accent-cyan: #06b6d4;     /* #00f2ff */
  --accent-purple: #8b5cf6;   /* #a855f7 */
  --accent-blue: #3b82f6;     /* #2563eb */
  --accent-emerald: #10b981;  /* Status / Active */

  /* Gradients */
  --grad-cyan-purple: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
  --grad-glow: radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15), transparent 70%);

  /* Text & Borders */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-glow: rgba(6, 182, 212, 0.35);
}
```

---

## 3. Layout Architecture
- **Split Hero Section:**
  - Left: Kinetic badge ("✦ Available for AI Video & Dev Projects"), bold statement typography, quick bio bullet points, dual CTA buttons ("View Featured Work", "Book a Consultation").
  - Right: Floating 3D/Cinematic reel card with animated ambient glow, live video playback trigger, and interactive stat pills.
- **Navigation (All elements):**
  - Sticky glass header with logo icon, primary links (Home, Portfolio, Services, About, Contact), status indicator, and glowing "Book Call" action.
  - Mobile bottom/drawer sheet with seamless micro-animations.
- **Project Showcase (Card Grid):**
  - Interactive cards with video preview thumbnail, category chips, tech stack icons, project metric badges, and "View Case Study" modal triggers.
- **Appointment Booking & Contact Modal:**
  - Clean floating modal with time-slot selection, date picker, service type dropdown, and instant confirmation state.

---

## 4. Typography & Motion
- **Typography:** Modern geometric sans-serif (Inter / Space Grotesk / Outfit) paired with high-tech mono elements (JetBrains Mono) for metrics, code snippets, and timestamps.
- **Motion & Micro-interactions:**
  - Smooth page reveals & staggered list animations using Framer Motion.
  - Interactive button ripple, glowing hover states, and card tilt/magnetic effects.
  - Color-graded media presentation with cinematic vignette and subtle ambient background mesh glow.

---

## 5. Responsive Breakpoints & Accessibility
- Mobile First: Responsive scaling from 360px up to 2560px ultra-wide screens.
- WCAG 2.1 AA compliant color contrast ratios on all text and interactive elements.
- ARIA accessibility tags, keyboard focus rings, and screen-reader navigable modals.
