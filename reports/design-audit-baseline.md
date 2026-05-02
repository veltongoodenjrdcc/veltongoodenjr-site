# Design Audit — Baseline
**Site:** veltongoodenjr.com  
**Branch:** brand-dna-polish-pass  
**Date:** 2026-05-01  
**Auditor:** Claude (brand-dna-polish-pass session)

---

## Summary

The site is structurally solid — semantic HTML, a well-organised CSS design system, accessible skip links, ARIA labels, reduced-motion support, focus-visible styles, and a working Web3Forms contact integration. The primary problem was a colour drift from the VGJ brand identity: the design token set had shifted to a muted teal (`#1a6b7a` / `#124f5c`) rather than the target blue-cyan (`#1db6f2` / `#0e7490`). This has been corrected in this session.

---

## 1. Brand DNA Issues (RESOLVED)

| Token | Was | Now |
|---|---|---|
| `--c-brand` | `#1a6b7a` (muted teal) | `#1db6f2` (brand cyan) |
| `--c-brand-dark` | `#124f5c` (dark teal) | `#0e7490` (cyan-dark) |
| `--c-brand-grad` | teal → deep teal | cyan → cyan-dark |
| `--c-brand-grad-h` | same | same fix |
| `--c-bg` | `#f8fafb` (teal-grey tint) | `#f7fbfd` (slight cyan tint) |
| `--c-surface-2` | `#f1f7f8` | `#f0f9ff` (sky blue tint) |
| `--c-surface-3` | `#e4f0f2` | `#dff1fc` (light cyan) |
| `--c-dark` | `#0d1f24` (teal-dark) | `#071420` (navy-dark) |
| `--c-dark-2` | `#132a31` (teal-dark) | `#0c1e30` (navy-dark) |
| `--c-muted` | `#4d7880` | `#3d7a95` (more blue) |
| `--c-border` | `#d6e8eb` | `#cce8fa` (cyan border) |
| `--c-border-2` | `#b8d5da` | `#9ed5f5` (cyan border) |

**Additional fixes applied:**
- `btn--primary` shadow: teal rgba → cyan rgba
- `btn--pulse` animation: teal rgba → cyan rgba
- `form-input:focus` ring: teal rgba → cyan rgba
- `@keyframes pulse`: teal → cyan
- `tag--blue` and `tag--teal`: updated to sky-blue/cyan palette
- `service-card__icon` gradient: teal tints → cyan tints
- Homepage `home-hero-bg` gradient: teal-dark → navy-dark with cyan radial glow
- Homepage work card thumbnail gradients: teal tints → cyan tints
- Homepage hero icon colour: `#7ecdd8` → `#7dd3fc` (brand cyan)

---

## 2. Impeccable Anti-Slop Scan (npx impeccable detect . --fast)

**Run on:** `assets/css/site.css` and all HTML files.

### Findings

| ID | File | Line | Verdict |
|---|---|---|---|
| `side-tab` | site.css | 980 | `.project-highlight` warning callout — **accepted** (editorial convention) |
| `side-tab` | site.css | 1627 | `.pull-quote` block quote — **accepted** (editorial convention) |
| `side-tab` | site.css | 2066 | `article-body blockquote` — **accepted** (HTML/typography standard) |
| `side-tab` | site.css | was 1930 | `.project-entry__demonstrates` — **FIXED** (removed border-left, uses border now) |
| `layout-transition` | site.css | 1540 | `.wa-btn { transition: width }` — **accepted** (position:fixed element, no document layout impact) |
| `single-font` | all HTML | — | **FALSE POSITIVE** (fast mode reads only the first font in Google Fonts URL; both DM Serif Display and Plus Jakarta Sans are loaded) |
| `flat-type-hierarchy` | content-creation/index.html | 32 | Noted (page may be deprecated/unused) |

### Net result
1 fix applied, 3 editorial conventions accepted, 1 layout-transition accepted with justification, 1 false positive.

---

## 3. Colour Contrast Check

| Use | Colour pair | Ratio | WCAG |
|---|---|---|---|
| Body text (`--c-ink`) on bg | `#071525` on `#f7fbfd` | ~19:1 | AAA ✓ |
| Secondary text (`--c-ink-2`) | `#1c3d54` on `#ffffff` | ~11:1 | AAA ✓ |
| Muted text (`--c-muted`) | `#3d7a95` on `#ffffff` | ~4.6:1 | AA ✓ |
| `--c-brand-dark` on white | `#0e7490` on `#fff` | ~4.7:1 | AA ✓ |
| `--c-brand` on white | `#1db6f2` on `#fff` | ~2.3:1 | ✗ (decorative use only) |
| `--c-brand` on dark bg | `#1db6f2` on `#0c1e30` | ~7.8:1 | AAA ✓ |

**Note:** `--c-brand` (`#1db6f2`) should never be used as text colour on light surfaces. The CSS uses it only as a decorative colour (borders, dots, animations). One exception was found and fixed: `.step::before` counter was changed from `var(--c-brand)` to `var(--c-brand-dark)`.

---

## 4. Accessibility (Manual + Code Review)

**Present and working:**
- Skip-to-main link on every page
- ARIA labels on nav, dialog, social links, image alt texts
- `role="list"` on nav and feature lists
- `aria-expanded` / `aria-controls` on mobile nav toggle
- `prefers-reduced-motion` media query disables all animations
- `focus-visible` outlines
- Form labels linked to inputs with `for`/`id` matching
- `accent-color` on checkboxes

**Issues noted (not yet fixed — for final pass):**
- Form `aria-required` or `required` attribute may be missing on required fields (visual `*` mark exists but no programmatic required)
- `aria-live` region for form success/error status (`.form-status`) — verify it is announced to screen readers

---

## 5. Layout and Spacing

- Fluid type scale using `clamp()` — good
- `--section-v` using `clamp(5rem, 9vw, 8rem)` — generous, appropriate
- All major components use CSS custom properties — single-source of truth
- Grid layouts use `auto-fit/minmax` — responsive without breakpoint coupling

**No significant layout issues found.**

---

## 6. AI Slop / Generic Design Signals

- **Not present:** Inter/Roboto over-use (site uses DM Serif Display + Plus Jakarta Sans — distinctive pairing)
- **Not present:** Purple gradients, violet palettes
- **Not present:** Generic SaaS "three columns with icons" hero (site has a capabilities list + mini stats panel)
- **Not present:** Everything-centered layout (mix of left-aligned and centred sections)
- **Not present:** Nested cards pattern
- **Acceptable:** Brand-gradient used on page heroes, newsletter feature, 404 — intentional and brand-aligned
- **Acceptable:** Scrolling logo strip (`cred-strip`) — credibility evidence, not filler

---

## 7. Mobile / Responsive

- Navigation: hamburger menu with full-screen overlay, skip link, ARIA ✓
- Fluid grids throughout ✓
- WA float button repositioned at mobile breakpoint ✓
- Work cards, timeline, about portrait — all have responsive column collapse ✓

---

## 8. Remaining Polish Opportunities (for final pass)

1. Form required-field programmatic marking (`required` or `aria-required="true"`)
2. `.form-status` should have `role="status"` or `aria-live="polite"` for screen reader announcements
3. `content-creation/index.html` — flat type hierarchy flag (check if page is live/used)
4. Consider adding `fetchpriority="high"` to LCP hero image on About page (portrait photo)
5. Footer nav uses `<nav>` with `aria-label` — good; ensure `aria-current="page"` is set on active links across all pages
6. Check WhatsApp button has adequate touch target on small screens (currently 56×56px ✓)

---

## Tools Attempted

| Tool | Status |
|---|---|
| Playwright | Installed at `C:\vgj-qa-modules` + Chromium. Screenshot script at `scripts/visual-qa.mjs`. |
| Impeccable | Run via `npx impeccable detect . --fast`. Report in `reports/impeccable-baseline.json`. |
| Taste Skill / UI UX Pro Max / Web Quality Skills | These are Claude Code skill-CLI tools (`npx skills add`). Not subprocess-executable from within Claude Code session. Use `/impeccable audit`, `/impeccable polish` commands directly. |
| Huashu-Design | Not attempted (optional per CLAUDE.md). |

---

*Report generated: 2026-05-01 | Branch: brand-dna-polish-pass*
