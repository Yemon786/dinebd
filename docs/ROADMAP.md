# 📊 ROADMAP — DineBD

> Generated: 2026-05-03 | PM Review: Complete  
> Based on: `TECH_STACK.md`, `MEMORY_BANK.md`, `WORKFLOW.md`  
> Agent sequence per WORKFLOW.md: `/git` → `/lead-dev` → `/ui-ux` → `/qa` → `/git`

---

## Sprint 0 — Critical Fixes (Production Blockers)

> **Goal:** Make the codebase secure, buildable, and clean. Zero new features.  
> **Sequence:** `/git` → `/lead-dev` → `/qa` → `/git` (chore — skip UI/UX)  
> **Branch:** `chore/sprint-0-critical-fixes`  
> **Estimated effort:** ~30 minutes

- [x] **T-001:** Upgrade Next.js to latest patched version
  - Run `npm install next@latest`
  - Verify `npm audit` shows 0 critical/high vulnerabilities
  - Run `npm run build` — must exit 0
  - Update `docs/TECH_STACK.md` with the new Next.js version number
  - ✅ **Done when:** `npm audit` is clean and build passes

- [x] **T-002:** Resolve all remaining npm vulnerabilities
  - Run `npm audit fix`
  - If lodash vulnerability persists, verify it's only in a dev dependency and document it
  - Run `npm run build` — must exit 0
  - ✅ **Done when:** `npm audit` reports 0 vulnerabilities, or all remaining are low/informational

- [x] **T-003:** Remove unused packages
  - Run: `npm uninstall recharts cmdk react-resizable-panels input-otp react-day-picker next-themes`
  - Run `npm run build` — must exit 0 (no broken imports)
  - Update `docs/TECH_STACK.md` — remove the 6 packages from the Utility Libraries table
  - ✅ **Done when:** Build passes, `package.json` is lighter, TECH_STACK.md updated

- [x] **T-004:** Remove test/development pages
  - Delete directory: `app/text-test/`
  - Delete directory: `app/2nd-page/`
  - Run `npm run build` — verify these routes no longer appear in the build output
  - Update `docs/MEMORY_BANK.md` — remove `/text-test` and `/2nd-page` from the pages table (should now be 9 routes)
  - ✅ **Done when:** Build output shows 9 routes (not 11), no dead links anywhere

---

## Sprint 1 — Performance & Image Optimization

> **Goal:** Optimize all images, reduce page load from ~1.85MB to <500KB.  
> **Sequence:** `/git` → `/lead-dev` → `/ui-ux` → `/qa` → `/git`  
> **Branch:** `feat/image-optimization`  
> **Estimated effort:** ~1 hour

- [x] **T-005:** Replace `<img>` with `next/image` in shared components
  - Files: `components/app-download.tsx` (line 57), `components/partner-section.tsx` (line 44), `components/rider-section.tsx` (line 10)
  - Add `import Image from "next/image"` to each file
  - Set explicit `width` and `height` props on each `<Image>`
  - Keep existing `alt` text and `className` values
  - ✅ **Done when:** No `<img>` tags remain in `components/` directory (verify with `grep -rn '<img' components/`)

- [x] **T-006:** Replace `<img>` with `next/image` in page files
  - Files: `app/rider/page.tsx` (line 41), `app/partner-with-us/page.tsx` (line 51)
  - Same pattern: `import Image from "next/image"`, set `width`/`height`, keep `alt`/`className`
  - ✅ **Done when:** `grep -rn '<img' app/` returns zero results

- [ ] **T-007:** Optimize hero background image
  - Convert `public/hero.png` (772KB) to WebP format — target <200KB
  - Update `components/hero.tsx` line 9: change `url('/hero.png')` to `url('/hero.webp')`
  - Keep the original PNG as a fallback if needed
  - ✅ **Done when:** Hero section loads with WebP image, visually identical, file size <200KB

- [ ] **T-008:** Extract inline logo SVGs to public files
  - Export the SVG markup from `components/ui/logo.tsx` (60KB) → save as `public/logo.svg`
  - Export the SVG markup from `components/ui/logo-white.tsx` (66KB) → save as `public/logo-white.svg`
  - Run both through SVGO optimization (target <15KB each)
  - Rewrite `logo.tsx` to use `<Image src="/logo.svg" ... />` instead of inline SVG JSX
  - Rewrite `logo-white.tsx` to use `<Image src="/logo-white.svg" ... />`
  - ✅ **Done when:** Logo renders identically, JS bundle reduced by ~126KB, both files <15KB

---

## Sprint 2 — SEO & Accessibility

> **Goal:** Every page has metadata. Every link is secure. All elements are accessible.  
> **Sequence:** `/git` → `/lead-dev` → `/qa` → `/git` (no visual changes — skip UI/UX)  
> **Branch:** `feat/seo-a11y`  
> **Estimated effort:** ~45 minutes

- [x] **T-009:** Add metadata exports to all pages missing them
  - Add `export const metadata = { title: "...", description: "..." }` to:
    - `app/contact-us/page.tsx` → title: `"Contact Us | DineBD"`
    - `app/faq/page.tsx` → title: `"FAQ | DineBD"`
    - `app/privacy-policy/page.tsx` → title: `"Privacy Policy | DineBD"`
    - `app/partner-with-us/page.tsx` → title: `"Partner With Us | DineBD"`
    - `app/partner-form/page.tsx` → title: `"Partner Registration | DineBD"`
    - `app/privacy-contract/page.tsx` → title: `"Vendor Contract | DineBD"`
    - `app/rider/page.tsx` → title: `"Become a Rider | DineBD"`
  - Each description must be 50-160 characters summarizing the page content
  - ✅ **Done when:** Every `app/*/page.tsx` has a metadata export. Verify with: `grep -rn 'export const metadata' app/`

- [x] **T-010:** Secure all external links
  - Add `target="_blank"` and `rel="noopener noreferrer"` to every `<a href="https://...">` tag
  - Files to check: `components/hero.tsx`, `components/header.tsx`, `components/footer.tsx`, `components/app-download.tsx`
  - Also check `app/rider/page.tsx` and `app/partner-with-us/page.tsx` for any external links
  - ✅ **Done when:** `grep -rn 'href="https://' components/ app/ --include='*.tsx'` — every result has `rel="noopener noreferrer"`

- [x] **T-011:** Add ARIA labels to interactive elements
  - Footer social icons: add `aria-label="Facebook"`, `aria-label="Instagram"`, etc. to each icon link in `components/footer.tsx`
  - Newsletter form: add `aria-label="Email address"` to the email input, `aria-label="Subscribe to newsletter"` to the button
  - Footer navigation links: verify they have descriptive text (already good — just audit)
  - ✅ **Done when:** All social icons have `aria-label`, form inputs have labels/aria-labels

---

## Sprint 3 — Design System Unification

> **Goal:** One canonical orange. Consistent design tokens. Responsive perfection.  
> **Sequence:** `/git` → `/lead-dev` → `/ui-ux` → `/qa` → `/git`  
> **Branch:** `feat/design-unification`  
> **Estimated effort:** ~1 hour

- [x] **T-012:** Define canonical brand color in CSS variables
  - In `app/globals.css`, set `:root { --primary: #ED7319; --accent: #ED7319; }`
  - Ensure the Tailwind `@theme` section maps `--color-primary` to `var(--primary)`
  - Document the chosen hex in `docs/TECH_STACK.md` under Design System
  - ✅ **Done when:** `globals.css` has one definitive orange value for `--primary` and `--accent`

- [x] **T-013:** Replace all hardcoded colors with design tokens
  - Replace every `#ED7319` with `text-primary` / `bg-primary` / `border-primary`
  - Replace every `text-orange-500` / `bg-orange-500` with `text-primary` / `bg-primary`
  - Replace every `text-orange-600` / `bg-orange-600` / `hover:bg-orange-600` with appropriate hover variant
  - Files affected: `hero.tsx`, `header.tsx`, `footer.tsx`, `not-found.tsx`, `services.tsx`, `testimonials.tsx`, `app-download.tsx`, `why-choose.tsx`, `cookie-banner.tsx`
  - ✅ **Done when:** `grep -rn '#ED7319\|orange-500\|orange-600' components/ app/ --include='*.tsx'` returns 0 results

- [x] **T-014:** Responsive & typography polish pass
  - Test every page at 375px (mobile), 768px (tablet), 1280px (desktop)
  - Verify no text overflow, no horizontal scroll, no overlapping elements
  - Verify consistent font sizes match Geist hierarchy (headings bold, body regular)
  - Take screenshot of homepage at all 3 breakpoints as proof
  - ✅ **Done when:** Screenshots at 3 breakpoints show no layout issues

---

## Sprint 4 — Deployment & Go-Live

> **Goal:** Ship to production on Vercel. Verify everything works live.  
> **Sequence:** `/git` → `/lead-dev` → `/qa` → `/git` (then `/devops`)  
> **Branch:** Work directly on `main` for deployment config (exception — no code changes)  
> **Estimated effort:** ~30 minutes

- [ ] **T-015:** Connect Vercel to GitHub and deploy
  - Import `Yemon786/dinebd` repo on vercel.com/new
  - Framework preset: Next.js (auto-detected)
  - No environment variables needed
  - Trigger first production build
  - ✅ **Done when:** Vercel shows "Ready" with a `.vercel.app` URL

- [ ] **T-016:** Configure custom domain (if available)
  - Add domain in Vercel dashboard → Settings → Domains
  - Update DNS records at registrar (A record or CNAME)
  - Wait for SSL certificate provisioning
  - ✅ **Done when:** Custom domain loads the site with HTTPS, or skip if no domain yet

- [ ] **T-017:** Verify Vercel Analytics
  - Visit the production URL in an incognito browser
  - Navigate to 3+ pages
  - Check Vercel dashboard → Analytics tab — should show page views
  - ✅ **Done when:** Analytics dashboard shows at least 1 visitor with page views

- [ ] **T-018:** Full smoke test on production
  - Visit every route on the production URL:
    - `/`, `/about-us`, `/contact-us`, `/faq`, `/privacy-policy`, `/partner-with-us`, `/partner-form`, `/privacy-contract`, `/rider`
  - Verify: all images load, no console errors, all links work, forms render correctly
  - Test on mobile (real device or devtools emulation)
  - ✅ **Done when:** All 9 routes render correctly with no errors on desktop + mobile

- [ ] **T-019:** Lighthouse audit
  - Run Lighthouse on the production homepage URL
  - Target scores: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90, Best Practices ≥ 90
  - If any score < 90, log the specific failing audits as new tickets
  - ✅ **Done when:** Screenshot of Lighthouse scores ≥ 90 in all 4 categories, or new tickets logged for failures

---

## Backlog (Post-Launch / v2)

> These tickets are **not in scope** for the current sprint cycle. They will be prioritized after launch.

- [ ] **B-001:** Connect contact form to email service (Formspree, EmailJS, or Next.js API route)
- [ ] **B-002:** Connect partner/rider forms to backend or Google Sheets
- [ ] **B-003:** Add Open Graph images (`og:image`) for social media sharing previews
- [ ] **B-004:** Implement dark mode using `next-themes` (re-install when needed)
- [ ] **B-005:** Add `sitemap.xml` and `robots.txt` for SEO crawling
- [ ] **B-006:** Blog/news section for content marketing

---

## Execution Summary

| Sprint | Tickets | Branch | Sequence | Effort |
|--------|:-------:|--------|----------|:------:|
| **0** | T-001 → T-004 | `chore/sprint-0-critical-fixes` | `/git` → `/lead-dev` → `/qa` → `/git` | ~30 min |
| **1** | T-005 → T-008 | `feat/image-optimization` | `/git` → `/lead-dev` → `/ui-ux` → `/qa` → `/git` | ~60 min |
| **2** | T-009 → T-011 | `feat/seo-a11y` | `/git` → `/lead-dev` → `/qa` → `/git` | ~45 min |
| **3** | T-012 → T-014 | `feat/design-unification` | `/git` → `/lead-dev` → `/ui-ux` → `/qa` → `/git` | ~60 min |
| **4** | T-015 → T-019 | `main` (deploy config) | `/lead-dev` → `/qa` → `/devops` | ~30 min |

**Total: 19 tickets across 5 sprints | ~3.5 hours of focused work**
