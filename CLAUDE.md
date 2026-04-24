# CLAUDE.md â€” Velton Gooden Jr Website Rebuild Brief

> **You are Claude Code working in VS Code on the personal website of Velton Gooden Jr. This is not a casual refresh. This is a strategic rebuild. Read this file end-to-end before touching a single file. The website must become a world-class digital hub that can credibly serve clients, collaborators, brand partners, and interested followers without feeling split, messy, or generic.**

---

## 0. The mission

This site is no longer just a freelancer brochure.

It must now function as **Veltonâ€™s central digital home base**.

It should:
- help potential clients understand what he can do and how to work with him
- help collaborators quickly see his strengths, experience, and fit
- help brand partners understand what kinds of collaborations make sense
- help curious visitors, followers, and newsletter readers find a reason to stay connected
- showcase his taste, judgment, and web design ability so the site itself becomes proof of competence

**The site must feel like someone serious built it.**
Not flashy for the sake of it. Not template-y. Not â€œgood enoughâ€.
It should feel thoughtful, controlled, premium, and unmistakably intentional.

---

## 1. What is wrong with the current site

Treat these as problems to solve, not notes to ignore.

1. **It is still too narrow.**
   Right now the site reads mainly like a service brochure for video, voiceover, and event coverage. That is too small for the purpose the site now needs to serve.

2. **It does not route different visitor types clearly enough.**
   A collaborator, a potential client, a brand partner, and a newsletter reader all land on the same site, but the current information architecture does not cleanly guide each person to what matters most to them.

3. **The homepage has public placeholders.**
   Placeholder thumbnails, placeholder logos, â€œdrop a video here laterâ€, diagram placeholders, and generic content blocks weaken trust immediately. Public-facing placeholder content is not acceptable.

4. **The proof is present, but not shaped well enough.**
   There is real experience and real work, but it is not yet packaged in a way that creates strong confidence quickly.

5. **The site currently feels more assembled than designed.**
   It works, but it still carries signs of a build-in-progress. The end result must feel authored, not stitched together.

6. **The technical finish is not yet premium enough.**
   Missing canonicals, thin metadata coverage, no skip link, no `aria-current`, production reliance on Tailwind Play CDN, lots of inline styling, and uneven consistency across pages all undermine the â€œimmaculateâ€ standard.

7. **The contact experience needs to feel cleaner and more confident.**
   No awkward gating. No â€œcoming soonâ€ dead ends. No friction that makes serious people hesitate.

---

## 2. Hard constraints

These are non-negotiable.

1. **World-class standard.** Every page must be good enough to show a high-value client, a collaborator, or a sponsor without apology.
2. **Mobile-first.** The site must feel premium on a phone first, then scale upward.
3. **Fast and static.** GitHub Pages-friendly. No build system dependency unless absolutely necessary. Prefer a high-quality static implementation.
4. **No Tailwind Play CDN in the final build.** Replace with a deliberate stylesheet and real design system.
5. **No public placeholders.** No dummy logos, no â€œcoming soonâ€, no generic filler blocks, no placeholder cards, no dead modules.
6. **No fake proof.** Do not invent metrics, clients, testimonials, outcomes, partnerships, or case studies.
7. **Accessibility is mandatory.** WCAG 2.2 AA thinking throughout.
8. **British English throughout.**
9. **No em dashes unless absolutely unavoidable.** Prefer commas, parentheses, or full sentence breaks.
10. **The website itself must demonstrate web design competence.** The design, structure, states, hierarchy, motion, and responsiveness all need to be a portfolio piece.
11. **No generic AI-sounding copy.** No hollow hype, no â€œpassionate visionaryâ€, no bloated filler, no buzzword soup.
12. **Do not describe Velton as a hospitality specialist.** He has worked in hospitality contexts before, but that is not his specialism.
13. **Do not make him sound like a giant agency.** He is a multidisciplinary operator with strong systems thinking, not a fake 20-person studio.
14. **Do not oversell weak areas.** Lead with actual strengths: systems thinking, workflow optimisation, brand clarity, content strategy, web builds, multimedia execution, practical problem-solving.
15. **Keep the tone human and grounded.** Smart, warm, direct, and credible.

---

## 3. Brand position the site must communicate

The site should position Velton as:

- a **digital brand strategist** with real execution range
- someone who understands the overlap of **brand, content, systems, and delivery**
- someone who can think strategically and also make things
- someone credible enough to work with, collaborate with, or follow
- someone Jamaica-based, Caribbean-aware, and internationally legible

This is a personal brand site, but it should still feel commercially serious.
It must balance:
- **strategy**
- **craft**
- **proof**
- **personality**
- **practical conversion**

The site should not force visitors to choose between creative, professional, and commercially useful. It needs to hold all three.

---

## 4. The audiences this site must serve

The architecture and content must deliberately serve four avatars.

### A. Potential clients
They need to know:
- what he helps with
- what kinds of projects fit
- what the working relationship feels like
- whether he is credible
- how to get in touch quickly

They care about:
- clarity
- professionalism
- proof of taste and execution
- whether he can reduce confusion and make their brand or project stronger

### B. Collaborators
They need to know:
- what kinds of projects and conversations fit
- what he is actually strong at
- the range of his experience
- what he has built, improved, or contributed to
- what makes him distinctive beyond a generic marketing operator

They care about:
- competence
- judgment
- communication
- initiative
- versatility without chaos
- whether he can create structure, momentum, and quality

### C. Brand partners and collaborators
They need to know:
- what his platform and perspective are about
- what kinds of collabs make sense
- what formats he can credibly produce
- whether he is a good fit for creator partnerships, workshops, products, or tools

They care about:
- alignment
- clarity of voice
- audience fit
- content quality
- reliability

### D. Followers, readers, and subscribers
They need to know:
- what kind of ideas and work he shares
- why they should keep up with him
- where to subscribe or follow
- what the through-line is between his content, work, and thinking

They care about:
- resonance
- insight
- consistency of perspective
- whether the content will actually help or interest them

---

## 5. The core website jobs

This site has five jobs.

### Job 1: Establish a sharp first impression
Within seconds, the site should communicate:
- this person is credible
- this person has taste
- this person can think and execute
- this site was clearly built with intention

### Job 2: Route the right person to the right next step
The homepage must make it very obvious where each audience should go next.

### Job 3: Package proof in a stronger way
Not just â€œhere are things I didâ€, but:
- what the project was
- what contribution Velton made
- what problem was being solved
- what artefact or outcome came out of it
- why it matters

### Job 4: Create multiple conversion paths
Not just a single â€œcontact meâ€ path.
The site must support:
- project enquiries
- lead-flow enquiries
- partnership and media enquiries
- newsletter subscriptions / follows

### Job 5: Act as a living hub
This site should be able to grow over time without becoming incoherent.
It should hold:
- client-facing services
- portfolio and case studies
- professional context
- partnership opportunities
- content and newsletter touchpoints

---

## 6. Strategic direction for the rebuild

The site should feel like a **personal headquarters**.

Not a generic portfolio.
Not a boxed-in agency site.
Not a content creator bio page.
Not a thin bio awkwardly put on the web.

Think of it as a hybrid of:
- premium portfolio
- strategic services site
- personal brand home base
- collaboration signal
- collaboration deck in website form

The site should make visitors feel:
- â€œThis person is more thoughtful than the average freelancer.â€
- â€œThis person understands both the message and the machinery.â€
- â€œI can see how to work with him.â€
- â€œI can see why I would work with him.â€
- â€œI can see why Iâ€™d want to keep up with him.â€

---

## 7. Information architecture

Use clean directory routing.

```
/
/about/
/work/
/lead-flow-fix/
/partnerships/
/insights/
/contact/
/privacy/
/404.html
```

Optional sub-pages if useful:

```
/work/[case-study-slug]/
/insights/[article-slug]/
```

### Why these pages exist

- **Home** routes and frames the whole ecosystem
- **About** gives the narrative and positioning
- **Work** proves range and quality
- **Lead Flow Fix** helps clients understand the core offer
- **Partnerships** helps collaborators, sponsors, collaborators, and brands evaluate alignment
- **Insights** supports thought leadership, newsletter growth, and follower retention
- **Contact** gives clean paths for the right type of enquiry

---

## 8. Home page requirements

The homepage is the most important page on the site.
It must not try to say everything at once. It must guide.

### Required sections

1. **Hero**
   - strong one-line positioning
   - supporting copy that explains the overlap of strategy, content, systems, and execution
   - primary CTA for client work
   - secondary CTA for partnerships / media
   - tertiary or supporting route for newsletter / insights
   - visual treatment must feel custom and premium, not generic SaaS, not generic creator template

2. **Choose your path / audience router**
   Four cards or a similarly elegant routing system:
   - Work with me
   - Partnerships / media
   - Partnerships
   - Follow the work / insights

   Each route must have a short explanation and clear CTA.

3. **Credibility strip**
   Use real proof only. This can include selected names, project categories, or notable work references.
   Possible references include real work connected to HBO Max, Jamaica Tourist Board, Yello Media, UWI Mona, Jamaica Pegasus, Edmond Law, selected Jamaican business work, and similar verified items.

4. **What I actually do**
   A concise strategic section that explains the core overlap:
   - digital brand strategy
   - web design / web presence
   - content strategy and execution
   - video / voice / digital storytelling
   - workflow and systems thinking where relevant

   Keep it tight. No bloat.

5. **Selected work preview**
   3 to 6 featured projects with strong framing.
   Each card should show:
   - project / brand name
   - contribution
   - medium or deliverable
   - one meaningful line about what the work achieved or clarified

6. **Why this mix matters**
   A section that explains why Veltonâ€™s value is not just one skill, but the way his skills converge.
   This should speak to both clients and collaborators.

7. **Opportunity snapshot**
   Short, sharp overview of selected projects, capabilities, collaborations, and media-ready context with a CTA to `/partnerships/`.

8. **Partnership / collaboration teaser**
   A section that quietly signals openness to brand collaborations, tool partnerships, creator collaborations, speaking, workshops, or campaign support.

9. **Newsletter / insights teaser**
   Feature Creatorâ€™s Current and the broader content / ideas side of the brand.
   Make it clear why somebody should subscribe or follow.

10. **Strong final CTA section**
    Must offer multiple routes, not just one button.

### The homepage must not include
- placeholders
- unfinished modules
- â€œcoming soonâ€ notices
- vague cards with no proof
- generic stock sections that could belong to anybody

---

## 9. About page requirements

This page should make Velton feel legible, credible, and human.

### Required sections

1. **Intro hero**
   Clear, grounded introduction. Not overly polished. Not overly casual.

2. **Narrative**
   Explain the through-line between:
   - storytelling
   - digital execution
   - systems thinking
   - practical business value

3. **How he thinks**
   A section about approach, judgment, and how he solves problems.
   This is not a values fluff section. It should feel real.

4. **What he is actually strong at**
   Use honest strengths, such as:
   - systems thinking
   - workflow optimisation
   - brand clarity
   - content planning and execution
   - video and voice integration
   - web presence and digital experience
   - translating complexity into something clearer

5. **Proof without arrogance**
   Short highlights of notable projects, brands, or contexts.

6. **Personal but relevant layer**
   Enough humanity to feel like a person, not a robot or faceless service business.

7. **CTA block**
   Route to work, Lead Flow Fix, Partnerships, insights, or contact.

---

## 10. Work page requirements

This page must do heavy lifting.

The current portfolio is a start, but it needs to become stronger, more strategic, and more credible.

### The work page should feel like curated proof, not a random gallery.

### Required structure for each featured project
Each project block or card should include:
- project / brand name
- year
- contribution
- deliverable type
- context or challenge
- what Velton did
- what this demonstrates
- live link, asset, or supporting proof where available

### Group work into meaningful buckets if helpful
Examples:
- Web / digital presence
- Content and campaign work
- Video and multimedia
- Voiceover and narration
- Strategy and systems

### Prioritise work that best supports the new direction
Likely stronger anchors include:
- selected Jamaican business work website and brand/digital setup
- Edmond Law website
- hospitality and hotel-related digital work where relevant
- Yello Media content work
- UWI Mona projects
- voiceover projects with notable brands
- any project that demonstrates cross-functional thinking, not just one-off output

### Important rule
Do not present only tasks. Present judgment, contribution, and relevance.

### Optional enhancement
Create dedicated case study pages for 2 to 4 strongest projects.
These should be world-class mini case studies, not bloated essays.

---

## 11. Lead Flow Fix page requirements

This page is for potential clients with messy lead flow.

The current version is too tied to a narrower service mix. The new version should reflect Veltonâ€™s broader, more strategic direction while staying honest.

### Position the offer around clear, practical fixes
Possible Lead Flow Fix areas:
- digital front door clarity
- Google presence cleanup
- WhatsApp Business flow
- saved replies and FAQ logic
- simple lead labels, tracking, and follow-up structure

### Important
This page should not make him look like he is claiming mastery in everything.
The framing should be:
- strategic
- practical
- collaborative
- adaptable

### Include
- what kinds of service businesses are a good fit
- what a typical engagement might tighten
- what is in scope vs out of scope
- why the work is practical rather than a giant custom buildout
- what kind of enquiry to send

### Do not include
- limp â€œI can do anythingâ€ language
- defensive disclaimers everywhere
- awkward morality or content policy copy unless it is truly necessary and elegantly handled

If a fit filter is needed, make it subtle and mature.

---

## 12. Partnerships page requirements

This page exists primarily for collaborators, partners, media, workshops, and aligned brand conversations.

It should feel like a polished bridge between a collaboration page and a personal site.

### Goals
- help someone quickly understand what kind of professional Velton is
- clarify the kinds of conversations and opportunities that fit
- highlight experience, achievements, and range
- offer relevant supporting material only when useful

### Required sections

1. **Positioning summary**
   A concise statement of the kinds of partnerships, workshops, media conversations, and collaborations he is best suited for.
   Examples may include digital brand strategy, content strategy, web or digital communications, creative marketing, multimedia, and systems-minded brand conversations.

2. **Strengths at a glance**
   Not a generic skill cloud. Curated strengths only.

3. **Selected experience timeline**
   Use real projects and contributions, framed cleanly.

4. **Selected achievements / contributions**
   Explain meaningful contributions without inflation.

5. **Tools and platforms**
   Only include tools he can credibly speak to and use.

6. **Contact path for collaborators**
   A clean dedicated route.

### Important tone rule
This page should be professional and clear, but it must still sound like Velton, not a generic auto-summary.

---

## 13. Partners page requirements

This page is for:
- brand partnerships
- creator partnerships
- collaboration opportunities
- tool and platform sponsors
- workshop or speaking opportunities

### The job of this page
Make it easy for the right partner to understand:
- who Velton is
- what topics and formats fit his brand
- what kinds of collaborations are welcome
- why he is a useful collaborator

### Include
- short positioning statement
- types of partnership formats he is open to
- examples: creator-led demos, gear/tool features, educational partnerships, workshops, live appearances, sponsored content that fits his audience and perspective
- what kinds of brands are a fit
- what kinds of brands are not a fit
- collaboration enquiry CTA

### Important
Do not pretend he has a massive following if he does not.
The value proposition should come from:
- clarity
- thoughtfulness
- niche relevance
- credibility
- production quality
- real-world practitioner perspective

---

## 14. Insights page requirements

This page is for followers, readers, and future subscribers.

It should support the content side of the brand and give the site a reason to be revisited.

### Include
- Creatorâ€™s Current as a featured newsletter property
- selected articles or posts
- content pillars
- why somebody should subscribe
- clean CTA to subscribe or follow elsewhere

### Content pillars may include
- digital brand strategy
- creator systems
- small workflow upgrades
- web and digital presence lessons
- content and storytelling observations
- practical ideas for small businesses and creators

### Important
This page should feel alive and credible even if content volume is still growing.
That means:
- fewer pieces is fine
- they must be presented well
- no empty blog shell
- no thin fake â€œinsightsâ€ page with nothing to say

---

## 15. Contact page requirements

The contact page should feel calm, premium, and easy.

### It must support multiple enquiry types
Use a clear selector or grouped options for:
- project / client enquiry
- partnership / media enquiry
- partnership / collaboration enquiry
- general question

### Include
- name
- email
- optional phone / WhatsApp
- enquiry type
- message
- optional budget / timeline only if it actually helps

### Also include direct contact details cleanly
No awkward reveal gates unless there is a very strong reason.

### Optional
A short â€œbest forâ€ note so people know what kind of message is useful.

### Avoid
- clunky friction
- â€œscheduling coming soonâ€ language
- anything that makes the site feel incomplete

---

## 16. Visual direction

The visual system should communicate:
- taste
- clarity
- maturity
- confidence
- creative intelligence

### It should feel like a premium personal brand site, not:
- a bootstrap SaaS template
- a generic Tailwind landing page
- a loud creator page
- a corporate bio microsite

### Visual principles
- generous whitespace
- strong hierarchy
- controlled contrast
- a deliberate grid
- refined typography
- restrained motion
- clear content rhythm
- excellent states and spacing

### Recommended design personality
A hybrid of:
- editorial sharpness
- modern product design discipline
- portfolio-level elegance

### Avoid
- gimmicks
- flashy gradients everywhere
- noisy cards
- generic icon overload
- fake 3D effects
- busy glassmorphism
- over-animated sections

### Motion
Use motion sparingly and with taste.
Subtle reveal, hover refinement, and micro-interaction polish only.
The motion should make the site feel expensive, not distracting.

---

## 17. Typography and copy direction

### Typography
Choose a pairing that feels premium, modern, and readable.
The type system should help the site feel bespoke.

Do not use default-looking web typography that makes the site feel like every other AI-generated portfolio.

### Copy tone
The copy should be:
- human
- clear
- confident
- intelligent
- slightly personal where useful
- grounded in real work

### The copy should not be
- overhyped
- bloated
- jargon-stuffed
- fake-deep
- cheesy
- corporate-robotic

### Copy rules
- no em dashes unless absolutely necessary
- no AI clichÃ© phrasing
- no lazy â€œpassionate about helping brands thriveâ€ type language
- no pretending to be bigger than reality
- no trying too hard to sound profound

The best copy on this site should sound like someone who has actually done the work and thought about it.

---

## 18. Proof and content sources to use

Use real material only.
Wherever possible, pull from verified projects, experience, and work already connected to Velton.

### Real proof points that may be used where relevant
- HBO Max voiceover work
- Jamaica Tourist Board-related work
- Montego Bay Convention Centre voiceover work
- Cari-Med Group Ltd. voiceover work
- Joel Nomdarkham / Future Makers project
- GrassROOTS Community Foundation project via Amplify Studios
- Yello Media projects
- Jamaica Pegasus / Courtleigh digital work where relevant
- UWI Mona project work
- selected Jamaican business work digital and website work
- Edmond Law website project
- other real client or brand work already represented truthfully

### Important
Do not use any proof point unless it can be represented honestly.
If details are thin, frame carefully rather than inflating.

---

## 19. Technical standards

1. **Static site, GitHub Pages friendly**
2. **Clean directory routing**
3. **Single shared stylesheet**
4. **Single shared script where practical**
5. **No production Tailwind CDN**
6. **No inline style clutter except where genuinely justified**
7. **No dead code or duplicated markup if it can be avoided responsibly**
8. **Responsive images and good file hygiene**
9. **Thoughtful component reuse**
10. **No framework migration unless there is an overwhelming reason**

### The site should be easy to maintain later
This matters.
Do not create an overcomplicated codebase just to look clever.

---

## 20. Accessibility and UX requirements

Mandatory:
- skip link
- semantic landmarks
- one clear `h1` per page
- visible focus states
- keyboard-friendly navigation
- `aria-current="page"` in nav
- proper labels on forms
- sensible error handling
- reduced-motion support
- strong colour contrast
- touch target quality on mobile
- no interaction that relies on hover only

### UX principles
- fewer, clearer choices
- fast recognition of next steps
- no clutter
- no mixed signals
- no weak or dead CTAs
- nothing that makes the site feel unfinished

---

## 21. SEO and discoverability

This site should be discoverable, but not written like an SEO farm.

### Baseline requirements
- unique page titles
- unique meta descriptions
- canonical URLs
- Open Graph tags
- sitemap
- robots.txt
- structured data where relevant

### Schema to consider
- `Person`
- `ProfessionalService`
- `WebSite`
- `Article` or `BlogPosting`
- `CreativeWork` where useful

### Search intent to support
Likely useful positioning terms include combinations around:
- digital brand strategist Jamaica
- web designer Jamaica
- content strategist Jamaica
- video production Jamaica
- voiceover Jamaica
- personal brand strategist Jamaica
- portfolio / creator systems / digital presence related terms where relevant

Do this with restraint.
No keyword stuffing.

---

## 22. Specific improvements over the current build

The redesign must directly fix these problems:

- remove all placeholders from the homepage
- replace weak gallery logic with stronger case-study logic
- create a clear audience-routing system on the homepage
- make `/partnerships/` work clearly for collaborators, partners, media, workshops, and brand collaborations
- elevate Creatorâ€™s Current and the insights side of the brand
- clean up the contact experience and remove incomplete-feeling friction
- create a more bespoke visual identity
- improve technical polish and accessibility
- make the homepage feel intentional and expensive

---

## 23. Final QA checklist

Before calling the rebuild done, verify all of this.

### Strategic QA
- Does the site clearly serve clients, collaborators, partners, and followers?
- Can each visitor type find their route within seconds?
- Does the site feel coherent rather than crowded?
- Does the site make Velton look more credible than before?

### Content QA
- Is every visible module real and finished?
- Is the copy human and grounded?
- Are there any filler lines, generic claims, or inflated descriptions?
- Does each page earn its existence?

### Design QA
- Does the site feel custom rather than template-derived?
- Is the hierarchy sharp?
- Is spacing disciplined?
- Do hover, focus, and transitions feel polished?
- Would another designer or developer respect the execution?

### Technical QA
- Are metadata, canonicals, and OG tags in place?
- Is accessibility handled properly?
- Is the mobile experience genuinely strong?
- Are there any broken links, duplicate IDs, dead sections, or odd states?
- Is the codebase tidy enough to maintain confidently later?

### Final gut-check
Ask this before shipping:

**Would this site make a serious person think â€œthis person clearly knows what theyâ€™re doingâ€?**

If the answer is not yes, keep refining.

---

## 24. Build order

1. establish the final design system and stylesheet
2. rebuild shared header, footer, navigation, buttons, cards, and layout primitives
3. rebuild the homepage completely around routing and proof
4. rebuild `/work/`
5. rebuild `/lead-flow-fix/`
6. rebuild `/partnerships/`
7. rebuild `/about/`
8. rebuild `/insights/`
9. rebuild `/contact/`
10. clean up privacy and 404
11. finish metadata, schema, sitemap, robots, and final QA

---

## 25. Final reminder

This site is not meant to be merely â€œniceâ€.
It is meant to become a serious business and brand asset.

A client should feel safer working with Velton because of it.
A collaborator should feel clearer about starting a conversation because of it.
A brand partner should see a credible collaborator because of it.
A thoughtful follower should want to stay connected because of it.

**Build the site so it can hold all of that without feeling bloated.**

That balance is the brief.
