# Site Changes — Session Log
**Date:** 2026-05-04

---

## 1. Viewport & Responsive Design Fixes

### Problem
Sections and layout didn't size cleanly on smaller displays (tested at 1351×645, targeting 1366×768 and 1280×800 Dell laptops).

### Changes — `assets/css/site.css`

- **`--section-v`** (global section padding): reduced from `clamp(5rem, 9vw, 8rem)` → `clamp(3.5rem, 7.5vw, 8rem)` so sections scale down more gracefully at intermediate sizes
- **`.section--sm`**: reduced minimum from `3rem` → `2rem`
- **`.section--roomy`**: reduced minimum from `5.5rem` → `4rem`
- **`html`**: added `overflow-x: clip` to prevent horizontal overflow on any screen size
- **Nav breakpoint**: raised from `56rem` (896px) → `76rem` (1216px) — the desktop nav with 6 long items + CTA physically overflowed between 896px–1100px; hamburger now shows correctly up to 1215px
- **Compact nav link sizing**: added `font-size: 0.8125rem` and tighter padding at 1216px–1536px range
- **`@media (max-height: 820px)`**: added compact section padding overrides for laptop-height viewports, portrait capped at `360px`
- **`@media (max-height: 760px)`**: more aggressive overrides for very short viewports (e.g. 645px actual height), section padding halved, portrait capped at `280px`, hero grid gap reduced

### Changes — `index.html` (inline `<style>`)

- **Home hero padding**: reduced scaling from `10vw` → `7.5vw`
- **`@media (max-height: 820px)`**: portrait capped at `400px`, bridge section padding reduced
- **`@media (max-height: 760px)`**: hero padding further reduced, headline font-size reduced and `max-width` widened to `26ch` (collapses 3-line headline to 2 lines), pill-row and actions top margins halved, footer note hidden, portrait capped at `360px`

---

## 2. Lead Flow Fix — Temporarily Disabled

### Problem
User requested all Lead Flow Fix content be dormant (not deleted) until reactivation.

### What was commented out

| File | What was disabled |
|---|---|
| `index.html` | Inline CSS for `.home-lff` styles, entire Section 4.5 hero block, footer "Offers" nav link |
| `contact/index.html` | "Lead Flow Fix specifically" form dropdown option, JS `helperText` and `subjectPrefixes` entries, `?type=lead-flow-fix` URL pre-select handler, footer link, meta descriptions updated |
| `about/`, `work/`, `partnerships/`, `creators-current/`, all 5 article pages, `insights/`, `privacy/` | Footer "Offers" nav link |
| `lead-flow-fix/index.html` | Added `<meta name="robots" content="noindex, nofollow">` — page intact but suppressed from search |

### How to reactivate
Search the project for `LFF-DISABLED` and uncomment each block. Remove the `noindex` meta from `lead-flow-fix/index.html`.

---

## 3. Primary Button Border Fix

### Problem
A faint dark vertical line appeared at the edge of primary (gradient) buttons — a browser rendering artifact caused by `border: 1.5px solid transparent` compositing against the gradient endpoint colour.

### Change — `assets/css/site.css`

```css
/* Before */
.btn--primary {
  background: var(--c-brand-grad-h);
  color: #fff;
  box-shadow: 0 2px 8px rgba(14,116,144,0.3);
}

/* After */
.btn--primary {
  background: var(--c-brand-grad-h);
  border-color: var(--c-brand-dark); /* #0e7490 — matches gradient endpoint */
  color: #fff;
  box-shadow: 0 2px 8px rgba(14,116,144,0.3);
}
```

The border colour now matches the gradient's dark endpoint, unifying the edge rendering and removing the artifact. The border is effectively invisible against the button while resolving the issue. Side effect: user found the defined edge visually preferable and chose to keep it.

---

*All changes are non-destructive. Commented-out code is preserved in-place.*
