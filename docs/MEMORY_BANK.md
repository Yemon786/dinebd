# 🗄️ MEMORY BANK — DineBD

> Last updated: 2026-05-03T20:16:00+06:00

## Project Overview

**DineBD** is a Bangladeshi food delivery platform landing site — similar to Foodpanda/Pathao Food. It is a **frontend-only** Next.js marketing website with no backend, no database, and no API integrations. All forms are client-side only (console.log on submit).

---

## Current Features

### Pages (9 routes)

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Homepage — hero, app download, services, partner CTA, rider CTA, why-choose, testimonials |
| `/about-us` | `app/about-us/page.tsx` | Company info (206 lines) |
| `/contact-us` | `app/contact-us/page.tsx` | Contact form (449 lines) |
| `/faq` | `app/faq/page.tsx` | FAQ accordion (247 lines) |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | Legal privacy policy (362 lines) |
| `/partner-with-us` | `app/partner-with-us/page.tsx` | Restaurant partner landing (231 lines) |
| `/partner-form` | `app/partner-form/page.tsx` | Partner signup form (297 lines) |
| `/privacy-contract` | `app/privacy-contract/page.tsx` | Vendor contract/partnership agreement form (575 lines) |
| `/rider` | `app/rider/page.tsx` | Rider recruitment page (304 lines) |

### Layout Components

| Component | File | Purpose |
|-----------|------|---------|
| Header | `components/header.tsx` | Sticky nav, mobile hamburger, DineBD logo, "Download App" CTA |
| Footer | `components/footer.tsx` | Newsletter form, social links, app store badges, company/partner links |
| Cookie Banner | `components/cookie-banner.tsx` | GDPR cookie consent banner |

### Homepage Sections

| Section | File | What it does |
|---------|------|-------------|
| Hero | `components/hero.tsx` | Full-width hero with background image, stat cards (50K+ customers, 10K+ partners, 1500+ riders), "Order Now" + "Book a Table" CTAs |
| App Download | `components/app-download.tsx` | Download CTA with app mockup image |
| Services | `components/services.tsx` | 5 services grid (delivery, booking, takeaway, catering, homemade) |
| Partner Section | `components/partner-section.tsx` | Restaurant partner recruitment CTA |
| Rider Section | `components/rider-section.tsx` | Delivery rider recruitment CTA |
| Why Choose | `components/why-choose.tsx` | Trust signals grid |
| Testimonials | `components/testimonials.tsx` | Customer testimonial cards |

### UI Components (shadcn/ui)

Located in `components/ui/`:
- `button.tsx`, `input.tsx`, `label.tsx`, `textarea.tsx` — standard shadcn
- `logo.tsx` — DineBD logo (inline SVG, 60KB)
- `logo-white.tsx` — White variant (66KB)
- `apple.tsx` — Apple App Store icon
- `google-play.tsx` — Google Play icon

### Static Assets

Located in `public/`:
- `hero.png` (772KB) — Hero background image
- `app.png` (387KB) — App mockup screenshot
- `partner_us.png` (408KB) — Partner section image
- `rider_us.jpg` (57KB) — Rider section image
- `plate.jpg` (122KB) — Food plate image
- `hero2.jpg` (33KB) — Alternate hero
- `images/tak_awa.png` (69KB) — Takeaway image

---

## Key Architectural Decisions

1. **Frontend-only** — No backend, no database. All forms are decorative (console.log).
2. **Next.js App Router** — Using the latest App Router pattern with server components.
3. **Tailwind v4** — Using the new `@import "tailwindcss"` syntax (not v3 `@tailwind` directives).
4. **shadcn/ui New York style** — Component library with CSS variables.
5. **External links** — All "Order Now" / "Download App" buttons link to `https://qr1.be/6UYZ` (QR redirect to app store).
6. **Static export compatible** — All pages are statically generated (○ in build output).
7. **Vercel Analytics** — `@vercel/analytics` integrated in root layout.

---

## Environment Variables

- None required. This is a fully static frontend with no secrets.

---

## Deployment Config

- `.gitignore` — Standard Next.js ignores including `.vercel`, `.env*`, `.next/`, `node_modules/`
- `next.config.ts` — Empty config (no custom settings)
- Vercel auto-detect: Next.js framework preset

---

## Known Issues / Tech Debt

1. ~~**`next@16.0.3` has a security vulnerability**~~ → Fixed: upgraded to 16.2.4
2. ~~**3 npm audit vulnerabilities**~~ → Fixed: lodash fixed, 2 moderate postcss remain (bundled in Next.js, not actionable)
3. ~~**`baseline-browser-mapping` warning**~~ → Fixed: resolved with Next.js upgrade
4. ~~**`/text-test` and `/2nd-page`**~~ → Fixed: deleted in Sprint 0
5. ~~**Unused packages**~~ → Fixed: 6 packages removed in Sprint 0
6. **Logo SVGs are massive** — `logo.tsx` (60KB) and `logo-white.tsx` (66KB) are inline SVGs that should ideally be separate `.svg` files

---

## GitHub & Git Config

- **GitHub Account:** `Yemon786`
- **Repository:** To be created (`dinebd`)
- **Author:** Yemon786 only — isolated to this account
- **Hosting:** Vercel (connected to GitHub repo for auto-deploy)
