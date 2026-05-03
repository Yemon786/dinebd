# ⚠️ TECH STACK — DineBD

> **WARNING:** Devs must strictly adhere to these packages. Do not install anything not listed here without Architect approval. No hallucinations.

## Platform
- **Type:** Frontend-only marketing/landing site (no backend, no database)
- **Hosting:** Vercel
- **Deployment:** Git-push → Vercel auto-deploy

---

## Frontend

| Category | Choice | Version |
|----------|--------|---------|
| Framework | Next.js (App Router) | 16.2.4 |
| Language | TypeScript | ^5 |
| React | React + React DOM | 19.2.0 |
| Styling | Tailwind CSS v4 | ^4.1.9 |
| CSS Animations | tw-animate-css | 1.3.3 |
| PostCSS | @tailwindcss/postcss | ^4.1.9 |
| Component Library | shadcn/ui (New York style) | via components.json |
| Icon Library | Lucide React | ^0.454.0 |
| Fonts | Geist + Geist Mono (next/font) | bundled |
| Analytics | @vercel/analytics | 1.3.1 |

## UI Primitives (Radix UI)

All Radix packages are installed — used by shadcn/ui:
- accordion 1.2.2, alert-dialog 1.1.4, avatar 1.1.2, checkbox 1.1.3, dialog 1.1.4, dropdown-menu 2.1.4, label ^2.1.1, navigation-menu 1.2.3, popover 1.1.4, select 2.1.4, tabs 1.1.2, toast 1.2.4, tooltip 1.1.6, and more.

## Utility Libraries

| Package | Version | Purpose |
|---------|---------|---------|
| class-variance-authority | ^0.7.1 | Component variant styling |
| clsx | ^2.1.1 | Conditional classnames |
| tailwind-merge | ^3.3.1 | Tailwind class deduplication |
| zod | 3.25.76 | Schema validation |
| react-hook-form | ^7.60.0 | Form state management |
| @hookform/resolvers | ^3.10.0 | Zod + react-hook-form bridge |
| sonner | ^1.7.4 | Toast notifications |
| date-fns | 4.1.0 | Date utilities |
| vaul | ^1.1.2 | Drawer component |
| embla-carousel-react | 8.5.1 | Carousel |

## Dev Tools

| Tool | Version |
|------|---------|
| TypeScript | ^5 |
| PostCSS | ^8.5 |
| ESLint | via eslint.config.mjs |

## Design System

- **Primary color:** `#ff7f00` (orange) / `#ED7319` (used in components)
- **Accent:** Same orange
- **CSS Variables:** OKLCH color space via Tailwind v4
- **Border radius:** 0.625rem base
- **Font:** Geist sans + Geist Mono
- **Dark mode:** CSS variables defined but not actively used

## Infrastructure

| Concern | Solution |
|---------|----------|
| Hosting | Vercel |
| CI/CD | Vercel Git integration (auto-deploy on push) |
| CDN | Vercel Edge Network |
| Domain | TBD |
| Monitoring | @vercel/analytics |
