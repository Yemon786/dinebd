# 📊 ROADMAP — DineBD

> Generated: 2026-05-03 | Based on: TECH_STACK.md, MEMORY_BANK.md, WORKFLOW.md

---

## Sprint 0 — Critical Fixes (Production Blockers)

> **Goal:** Make the codebase deployable and secure. No new features.

- [ ] **T-001:** Upgrade Next.js to latest patched version (`npm install next@latest`)
- [ ] **T-002:** Run `npm audit fix` and resolve remaining vulnerabilities
- [ ] **T-003:** Remove unused packages (`recharts`, `cmdk`, `react-resizable-panels`, `input-otp`, `react-day-picker`, `next-themes`)
- [ ] **T-004:** Remove test/dev pages (`/text-test`, `/2nd-page`) — delete `app/text-test/` and `app/2nd-page/` directories

---

## Sprint 1 — Performance & Image Optimization

> **Goal:** Optimize all images and reduce page load weight.

- [ ] **T-005:** Replace all `<img>` tags with `next/image` in `components/app-download.tsx`, `components/partner-section.tsx`, `components/rider-section.tsx`
- [ ] **T-006:** Replace all `<img>` tags with `next/image` in `app/rider/page.tsx`, `app/partner-with-us/page.tsx`
- [ ] **T-007:** Optimize hero image — convert `hero.png` (772KB) to WebP, add blur placeholder
- [ ] **T-008:** Extract inline logo SVGs (`components/ui/logo.tsx` 60KB, `logo-white.tsx` 66KB) to optimized SVG files in `/public`

---

## Sprint 2 — SEO & Accessibility

> **Goal:** Every page is discoverable and accessible.

- [ ] **T-009:** Add metadata exports (title + description) to all pages missing them: `/contact-us`, `/faq`, `/privacy-policy`, `/partner-with-us`, `/partner-form`, `/privacy-contract`, `/rider`
- [ ] **T-010:** Add `rel="noopener noreferrer"` and `target="_blank"` to all external links across all components
- [ ] **T-011:** Audit and add ARIA labels to all interactive elements (footer social icons, newsletter form, navigation links)

---

## Sprint 3 — Design System Unification

> **Goal:** Single source of truth for brand colors and consistent design tokens.

- [ ] **T-012:** Unify brand orange — replace all hardcoded `#ED7319`, `#ff7f00`, and Tailwind `orange-500/600` with CSS variable `text-primary` / `bg-primary`
- [ ] **T-013:** Update `globals.css` `:root` to use a single canonical brand orange for `--primary` and `--accent`
- [ ] **T-014:** UI/UX polish pass — verify spacing, typography, and responsive behavior across all pages at 375px, 768px, and 1280px

---

## Sprint 4 — Deployment & Go-Live

> **Goal:** Deploy to Vercel and verify production site.

- [ ] **T-015:** Connect Vercel to GitHub repo (`Yemon786/dinebd`) and trigger first production deploy
- [ ] **T-016:** Configure custom domain on Vercel (if available)
- [ ] **T-017:** Verify Vercel Analytics is collecting data
- [ ] **T-018:** Final smoke test — visit every route on the production URL, check for broken images/links/forms
- [ ] **T-019:** Run Lighthouse audit on production URL — target scores: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90

---

## Backlog (Post-Launch / v2)

- [ ] **B-001:** Connect contact form to email service (Formspree, EmailJS, or API route)
- [ ] **B-002:** Connect partner/rider forms to backend or Google Sheets
- [ ] **B-003:** Add Open Graph images for social media sharing
- [ ] **B-004:** Implement dark mode using `next-themes` (re-install when needed)
- [ ] **B-005:** Add sitemap.xml and robots.txt for SEO crawling
- [ ] **B-006:** Blog/news section for content marketing
