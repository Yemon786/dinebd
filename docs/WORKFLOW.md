# 🎬 WORKFLOW — DineBD

> Defined: 2026-05-03 | Project Type: Frontend-only marketing site | Hosting: Vercel

---

## Git Strategy

### Branching Model
```
main (production — auto-deploys to Vercel)
  └── feat/<ticket-name>   (feature branches)
  └── fix/<ticket-name>    (bug fixes)
  └── chore/<ticket-name>  (cleanup, deps, config)
```

### Rules
- **Never commit directly to `main`** — all work happens on feature branches
- **Branch naming:** `feat/`, `fix/`, `chore/` prefix + kebab-case ticket name
- **One branch per ticket** — keep changes atomic
- **Merge strategy:** Squash merge to `main` for clean history
- **Delete branches after merge**

### Commit Convention
```
feat: add partner registration form
fix: resolve TypeScript error in privacy-contract
chore: remove unused test pages
refactor: extract logo SVGs to public assets
docs: update MEMORY_BANK with sprint 0 completion
```

---

## Agent Sequence (Per Ticket)

This is a **design-heavy frontend project**, so the UI/UX polish step is critical:

```
/git → /lead-dev → /ui-ux → /qa → /git (merge)
```

| Step | Role | What they do |
|------|------|-------------|
| 1 | `/git` | Create feature branch from latest `main` |
| 2 | `/lead-dev` | Write the code for the ticket |
| 3 | `/ui-ux` | Audit spacing, typography, responsive, a11y |
| 4 | `/qa` | Test edge cases, verify build passes |
| 5 | `/git` | Stage, commit (conventional), squash-merge to `main` |

### Exceptions
- **Chore tickets** (dependency updates, config changes): `/git` → `/lead-dev` → `/qa` → `/git` (skip UI/UX)
- **Docs-only tickets**: `/git` → `/lead-dev` → `/git` (skip QA and UI/UX)

---

## Testing Rules

### Every Ticket Must:
1. ✅ **Build passes** — `npm run build` exits 0 with no TypeScript errors
2. ✅ **No console errors** — browser devtools clean on all affected pages
3. ✅ **Responsive check** — works at 375px (mobile), 768px (tablet), 1280px (desktop)
4. ✅ **Visual regression** — screenshot before/after for UI changes

### UI Tickets Additionally:
5. ✅ **Accessibility** — keyboard navigable, proper focus states, alt text on images
6. ✅ **Color consistency** — no raw hex values outside design tokens

---

## PR / Merge Rules

Before merging any branch to `main`:
1. `npm run build` passes clean
2. All acceptance criteria from the ticket are met
3. No `// TODO` or placeholder code
4. Screenshots attached for visual changes
5. `docs/ROADMAP.md` updated (ticket marked `[x]`)

---

## Deployment

- **Automatic:** Every push to `main` triggers Vercel auto-deploy
- **Preview:** Every feature branch gets a Vercel Preview URL (if Vercel GitHub integration is enabled)
- **No manual deploys** — the pipeline is fully automated

---

## Token Management

- If the chat exceeds 10 messages, run `/archivist` to compress memory
- Always read `docs/MEMORY_BANK.md` at the start of a new session
