# Technical Requirements Document (TRD) — Miradon Portfolio

## 1. System Architecture & Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | Next.js 14/15 (App Router) | React Server Components, Server-Side Rendering (SSR), Static Generation (SSG). |
| **Language** | TypeScript (v5+) | Strict type-safety across all components, API schemas, and JSON data loaders. |
| **Styling** | Tailwind CSS + CSS Variables | Utility-first responsive design, dark mode tokens, and custom glassmorphism utilities. |
| **Motion & Icons** | Framer Motion & Lucide React | High-performance 60fps micro-interactions, spring physics, vector icons. |
| **Data / Storage** | Flat Files (JSON / Markdown) | Zero-database latency, file-system based content loaded with type guards. |
| **API Layer** | Next.js Route Handlers (REST) | `/api/contact`, `/api/booking`, `/api/projects` endpoints with input validation. |
| **Deployment** | Netlify | CI/CD Git-based deployment, Netlify edge functions and security headers. |
| **Analytics & SEO**| Google Analytics / Plausible / Meta | Next/Metadata API, dynamic OpenGraph, structured schema.org JSON-LD. |

---

## 2. Directory Structure

```text
MIRADON PORTFOLIO/
├── app/
│   ├── layout.tsx                # Root layout (Fonts, Meta, Header, Footer)
│   ├── page.tsx                  # Home page (Split Hero, Featured, Services, Testimonials, CTA)
│   ├── about/page.tsx            # About & Background page
│   ├── portfolio/
│   │   ├── page.tsx              # All projects portfolio catalog
│   │   └── [slug]/page.tsx       # Deep-dive technical project breakdown
│   ├── services/page.tsx         # Detailed services & AI video pipeline
│   ├── contact/page.tsx          # Contact form & appointment booking hub
│   ├── admin/page.tsx            # Flat JSON content management panel
│   ├── api/
│   │   ├── contact/route.ts      # Contact form submission handler
│   │   ├── booking/route.ts      # Appointment booking handler
│   │   └── projects/route.ts     # Project retrieval API
│   ├── sitemap.ts                # Dynamic XML sitemap
│   └── robots.ts                 # SEO crawler rules
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── SplitHero.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── MetricsBanner.tsx
│   │   ├── ProcessSummary.tsx
│   │   ├── ToolStack.tsx
│   │   └── TestimonialsSection.tsx
│   └── ui/
│       ├── ProjectCard.tsx
│       ├── VideoModal.tsx
│       ├── AppointmentBookingModal.tsx
│       └── Toast.tsx
├── data/
│   ├── profile.json              # Bio, contact info, social links
│   ├── projects.json             # Flagship case studies & technical details
│   ├── services.json             # Core offerings & deliverables
│   ├── testimonials.json         # Client reviews & proof points
│   ├── metrics.json              # Key performance indicators
│   └── tools.json                # AI and engineering tool stack
├── docs/
│   ├── PRD.md
│   ├── DRD.md
│   ├── TRD.md
│   └── ADR.md
├── public/                       # Static media, icons, avatars, video posters
├── netlify.toml                  # Netlify deployment configuration
├── tailwind.config.ts            # Tailwind custom config
├── tsconfig.json                 # TypeScript compiler options
└── package.json
```

---

## 3. Data Schema & Models

### Project Schema (`data/projects.json`)
```typescript
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'AI Video' | 'Software Development' | 'Web Design' | 'Commercial';
  tagline: string;
  client: string;
  role: string;
  year: string;
  featured: boolean;
  videoUrl?: string;
  thumbnailUrl: string;
  bannerUrl: string;
  description: string;
  technicalBreakdown: {
    overview: string;
    pipeline: string[];
    aiToolsUsed: string[];
    techStack: string[];
    keyChallenges: string[];
    outcomes: string[];
  };
  metrics: {
    label: string;
    value: string;
  }[];
}
```

---

## 4. API Endpoints & Request Handling

### `POST /api/contact`
- Accepts: `{ name: string, email: string, message: string, service?: string }`
- Validates fields and sends response/confirmation email logic.

### `POST /api/booking`
- Accepts: `{ name: string, email: string, date: string, time: string, serviceType: string, notes?: string }`
- Validates time slot availability and logs/emails booking details.

---

## 5. Performance, Security & SEO Requirements
- **Lighthouse Performance Score:** 95+ target across Mobile & Desktop.
- **Image & Video Optimization:** Next.js `<Image>` component with webp/avif generation and lazy loading; responsive video embeds with custom thumbnail posters.
- **Security:** CSP headers, sanitized input validation, Rate limiting on form submission routes, HTTPS enforcement.
