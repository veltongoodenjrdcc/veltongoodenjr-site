# Production Accuracy, Personality & Polish Pass — QA Report

**Branch:** `brand-dna-polish-pass`
**Date:** 2026-05-02
**Spec source:** `CLAUDE.md` (project root)

---

## Files changed

- [index.html](../index.html) — homepage rebuilt: hero with Velton portrait + name, personal-bridge section, dedicated Lead Flow Fix section, enlarged credibility logos, simplified "currently open" section, refreshed Creator's Current teaser
- [about/index.html](../about/index.html) — warmer portrait, narrative rewrite (childhood → creativity → digital → systems → AI), new "What guides the work" faith + father/mentor section, corrected highlights
- [work/index.html](../work/index.html) — anchor nav centred, ~15 project entries replaced with spec-grounded copy, AgriPro promoted to Web & Digital group, Hi-Pro Ace removed as standalone, Benchmark QMS labelled archived
- [partnerships/index.html](../partnerships/index.html) — personal-context narrative, reserved speaking-photo placeholder frame, all `mailto:` CTAs replaced with `/contact/?type=...`, new values-aligned "A note on fit" section
- [contact/index.html](../contact/index.html) — new direct-contact human-check pattern (checkbox → arithmetic challenge → unlock → JS-assembled email/phone/WhatsApp reveal), hero personality chip, `?type=` URL param mapping in form JS (Web3Forms untouched)
- [lead-flow-fix/index.html](../lead-flow-fix/index.html) — surgical replacement of 6 `enquiries`/`Enquiries` instances with `messages`/`requests`
- [assets/css/site.css](../assets/css/site.css) — `.cred-strip__item` and `.project-entry__logo` enlarged with softened greyscale

## Files NOT touched (per scope)

- `creators-current/` — full-page rebuild deferred
- `lead-flow-fix/index.html` body content — only forbidden-term replacements
- `insights/`, `privacy/`, `404.html` — no required change
- `assets/js/site.js` — read-only; all new behaviour is page-scoped
- Web3Forms form, endpoint, access key, hidden fields, async fetch, validation, honeypot, success/error flow — all preserved verbatim

## Claims removed or corrected

- Edmond Law: removed inferred trust-hierarchy/IA claims; framed as multi-page website only
- Jamaica Pegasus / Courtleigh: reframed as in-house Digital Marketing & PR Executive role (not freelance website client)
- Jamaica Tourist Board: corrected from "content and digital work" to **voiceover for an onboarding project**
- Future Makers / Joel Nomdarkham: reframed as **video editor** for companion videos (not filmer/strategy)
- GrassROOTS: clarified as **through Amplify Studios** — edited award videos + provided voiceovers (not original capture)
- UWI Mona: corrected to a **2025 short-term** IG/FB engagement under "Velton Gooden Jr. — Digital Content Creation"
- HBO Max: softened to "Jamaican voiceover for a commercial spot, through an agency relationship"
- Cari-Med Group: scoped down to "single corporate event voiceover introduction"
- Montego Bay Convention Centre: clarified as narration for a series of facility-walkthrough videos
- Yello Media Group: layered description across all four roles, with Hi-Pro Ace mentioned only inside the social-fulfilment portfolio
- Berger Paints: scoped to a 2024 internal/CSR recap edit
- Jamaica Book Festival: clarified as through Amplify Studios social content
- Benchmark QMS: labelled "now-inactive" under "Archived / early projects"
- Hi-Pro Ace: standalone entry removed; appears only as part of Yello's social-fulfilment client portfolio mention
- AgriPro: own short entry promoted to Web & Digital Presence group
- About page Notable Highlights: rewritten so each line aligns with the corrected Work descriptions

## Where Velton imagery was added or replaced

- Homepage hero: **new portrait** (`velton-gooden-jr-red-sweater-standing-portrait.jpg`) with editorial frame + Kingston badge, replacing stock-photo carousel
- About page hero: **portrait swapped** to `velton-gooden-jr-red-sweater-seated-smiling-portrait.jpg` (warmer than the previous arms-crossed shot)
- Contact page hero: small circular avatar in personality chip "Velton usually replies within a couple of working days"
- OG meta `og:image` updated on Home, About, and Contact to point at Velton portraits instead of stock workspace images
- Speaking & Partnerships: reserved a styled placeholder frame for an event photo when one is provided (no stock filler)

## Lead Flow Fix promotion

A dedicated cyan-gradient section now lives between the capabilities section and Selected Work preview. It includes the pain-point hook ("Are people reaching out, then slipping through the cracks?"), the headline "Getting messages is one thing. Turning them into business is another.", a four-item "what it tightens" panel, and CTAs to `/lead-flow-fix/` and `/contact/?type=lead-flow-fix`. The old buried `.home-offer-note` card was removed; the parent "currently open" section now carries a single Speaking & Partnerships CTA.

## Creator's Current homepage teaser

- Logo enlarged from 32px → 64px
- Subscriber line changed from "243 subscribers" to **"200+ subscribers"**
- Body copy refreshed to reference "the messy middle of creative work" + "Think Let's Play, not Walkthrough" (in Velton's actual newsletter voice)

## Logos enlarged

- Homepage credibility strip: container height 52px → 84px, image height 28px → 52px, greyscale 1+0.55 opacity → 0.35 + 0.85 opacity (softer, more recognisable)
- Work-page project entries: `max-height` 36px → 60px, greyscale 0.4 → 0.2

## Speaking & Partnerships CTA routing

All `mailto:` CTAs replaced with `/contact/?type=speaking` (or `?type=partnership` where appropriate). The hidden email address is no longer rendered openly on this page. WhatsApp button preserved.

## Values / boundary filter

A new "A note on fit" section was added to Speaking & Partnerships listing the eight values-aligned no-go lanes per spec (partisan politics, violence, illicit drugs, gambling, explicit sexual content, occult/spiritism, hate/discrimination, alcohol-led promotion) with the precise "alcohol-led events, campaigns, or promotion" phrasing.

## Direct-contact human-check (Contact page)

- Initial state: "Tiny human check first" copy + checkbox "I'm human. Show me the contact details."
- On check: arithmetic challenge appears with answer input, "New one" refresh button, and "Unlock" button (disabled until answer is correct)
- On unlock: humanCheck wrapper hides, `directContent` reveals with JS-assembled `mailto:`, `tel:`, and pre-filled WhatsApp URLs
- Email: `info@veltongoodenjr.com` (assembled from parts at runtime)
- Phone: `+1 876-573-5858`
- WhatsApp prefill: `Hi Velton, reaching out via your website.`
- `<noscript>` fallback uses obfuscated text (`info [at] veltongoodenjr [dot] com`, `876 [dash] 573 [dash] 5858`)
- Scoped IIFE — does not touch Web3Forms or the global `site.js`

## Web3Forms safety check

The form action `https://api.web3forms.com/submit`, access key, hidden fields (`access_key`, `subject`, `from_name`, `botcheck`, `pageSubmittedFrom`, `utmSource/Medium/Campaign`, `userAgent`), async fetch submission, `reportValidity()` validation, honeypot check, and success/error UI are all unchanged. The only edit to the form's IIFE was adding a `?type=` URL-param to `requestType` mapping (`speaking`, `partnership`, `lead-flow-fix`) so deep links from Speaking & Partnerships and the homepage Lead Flow Fix CTA pre-select the right subject prefix.

## Forbidden-term sweep — final results

- `Freeboard`, `Work, made workable`, `hospitality specialist`, `nestled`, `script.google.com`, `Google Apps Script` — **0 matches** in HTML/CSS
- `enquiries`/`Enquiries` — **0 matches** site-wide (all replaced)
- `comprehensive solutions`, `tailored strategies`, `unlock your potential`, `seamless experience`, `elevate your brand`, `cutting-edge`, `world-class`, `innovative solutions` — **0 matches**
- `leverage` — 1 match in [creators-current/cut-through-dont-shout/index.html:163](../creators-current/cut-through-dont-shout/index.html#L163), used as published article rhetoric ("That is leverage."), intentional and out of consultant-speak scope. Skip.

## Visual QA

`scripts/visual-qa.mjs` ran successfully (exit code 0), regenerating all 21 screenshots in `reports/screenshots/` (7 pages × 3 viewports). Spot checks on desktop renders confirm:

- Homepage: portrait visible top-right, name prominent, Lead Flow Fix has its own bold cyan section, credibility logos readable, CC logo and copy refreshed
- About: warmer seated-smiling portrait in hero, narrative rewritten, pull quote visible, faith + father section in place
- Work: anchor nav centred on desktop, logos noticeably larger, all entries have real copy, no `<!-- CONTENT NEEDED -->` placeholders left
- Partnerships: speaking placeholder frame present, contact form CTA replaces mailto, values filter section rendered cleanly
- Contact: personality chip in hero, human-check card replaces the previous open-email card

## Impeccable scan

`npx impeccable detect ... --fast` exited 0. Findings echo previous pass: `single-font` flagged across pages (false positive — site uses both DM Serif Display and Plus Jakarta Sans; Impeccable parses only the first declaration), and `flat-type-hierarchy` in `content-creation/index.html` (deprecated unlinked page, out of scope per project memory).

## Items still needing Velton's confirmation

- **Web3Forms inbox delivery**: I did not submit a real test submission. Velton should personally confirm one round-trip lands in the configured inbox after this branch is deployed.
- **Year fields on Work entries**: Most year fields were left blank or unstated where the year was not in the spec. Velton should fill these in (Edmond Law, AgriPro, Courtleigh Hospitality Group dates, HBO Max year, etc.) before deployment if desired.
- **Hero portrait choice**: Currently using `velton-gooden-jr-red-sweater-standing-portrait.jpg` as the hero JPG. Confirm this is the intended public-facing hero image, or swap to a transparent-PNG cutout when one is available.
- **Speaking event photos**: Reserved frame is in place on `/partnerships/`. Drop a real `<img>` into `.speaking-photo-frame` when a photo is provided.
- **Hero portrait file size**: Currently 16MB. Worth converting to a tighter cropped WebP for production LCP. (Same applies to the About-page portrait.)
- **`creators-current/` page rebuild**: deferred per spec, not in this pass. Plan a separate session.

## Open items inherited from prior pass (still relevant)

- Form `required` attributes already in place; verify `aria-live` polite on `.form-status` is firing correctly to screen readers (already configured).
- `aria-current="page"` on active nav links — wired in `site.js`.
- `fetchpriority="high"` on About-page LCP image — added in this pass.
- `content-creation/index.html` flat-type-hierarchy — still flagged, page is unlinked/deprecated, out of scope.

## Ready for review

The site now reads as Velton's personal headquarters rather than a generic strategy template. Hero, About, Speaking, and Contact all carry his name, voice, and image directly. Work descriptions are accurate. The values boundary is explicit. Direct contact is bot-resistant without being hostile to humans. Lead Flow Fix has the prominence the spec asked for, without being added to the navbar.
