# Architecture Decision Records (ADR) — Miradon Portfolio

## ADR-001: Adoption of Next.js App Router for Frontend & Backend Runtime
- **Status:** Accepted
- **Context:** The portfolio requires lightning-fast load times, first-class SEO indexing for client discovery, seamless dynamic routing for project case studies (`/portfolio/[slug]`), and integrated serverless API routes for contact/booking forms.
- **Decision:** Use Next.js 14/15 App Router with React Server Components (RSC) and TypeScript.
- **Consequences:**
  - *Positive:* Fast initial page load, automatic code splitting, optimized static generation for portfolio items, built-in API handlers without needing a separate Express backend.
  - *Negative:* Slightly higher framework learning curve than static HTML, mitigated by clean component architecture.

---

## ADR-002: Content Storage via Flat Files (JSON/Markdown) with Custom Admin Panel
- **Status:** Accepted
- **Context:** The client specified flat files / JSON / MD as the database solution to avoid external database subscription overhead, network latency, and connection maintenance while retaining the ability to edit content.
- **Decision:** Store all project details, profile data, services, tools, and testimonials in structured JSON files under `/data`. Provide a custom administrative dashboard UI (`/admin`) for viewing and managing content locally or updating JSON schemas.
- **Consequences:**
  - *Positive:* 0ms database query overhead, 100% version-controlled in Git, zero cloud database costs, ultra-reliable.
  - *Negative:* Content updates directly to production require a Git commit/push or admin API handler writing to local JSON in development.

---

## ADR-003: Video Presentation & Media Delivery Strategy
- **Status:** Accepted
- **Context:** The portfolio's core differentiator is cinematic AI video creation (*The Mad Preacher*, commercials, animations). Heavy raw 4K video files hosted on the server can degrade bandwidth and initial page speed.
- **Decision:** Implement a progressive video delivery approach:
  1. Lightweight color-graded animated posters and webm previews on the hero and project cards.
  2. A dedicated high-performance `VideoModal` component that supports streaming embedded players (YouTube, Vimeo, Cloudinary, direct CDN streaming) with custom cinematic controls and ambient backlight glow.
- **Consequences:**
  - *Positive:* 100/100 Lighthouse performance, instant page load, no bandwidth hogging, beautiful viewing experience.

---

## ADR-004: Interactive Booking System with Dual-Channel Notification
- **Status:** Accepted
- **Context:** Potential clients (commercial directors, brands, startups) need a frictionless way to book consultation calls and project kickoffs without leaving the site.
- **Decision:** Build an interactive in-app `AppointmentBookingModal` with calendar date selection, time slot picking, and project requirements input. Hook into `/api/booking` to dispatch instant email notifications to `miradon367@gmail.com` and provide instant visual feedback to the client.
- **Consequences:**
  - *Positive:* High lead conversion rate, seamless client user experience, direct email alerting to Miradon.

---

## ADR-005: Netlify Deployment Pipeline with Automated Git CI/CD
- **Status:** Accepted
- **Context:** Seamless deployment pipeline required with automated preview builds, SSL certificates, and edge CDN distribution.
- **Decision:** Configure `netlify.toml` with `@netlify/plugin-nextjs`, enabling zero-configuration automated deployments on Git push.
- **Consequences:**
  - *Positive:* Free global CDN, automatic preview branches, instant SSL, zero server management.
