# MOBILE_FIX_PLAN.md — Choice Beauty Salon
> Senior Front-End Engineer — Mobile Responsiveness Implementation Plan
> Target: Android Chrome ~360-412 CSS px wide (primary), iOS Safari 375px (secondary)
> Constraint: Keep brand, layout concept, copy. No redesign. No heavy dependencies.

---

## 1. Stack and Codebase Findings

### Technology Stack
| Item | Value |
|---|---|
| Type | Static multi-page HTML/CSS/JS — zero build tools, zero framework |
| Pages | index.html · services.html · gallery.html · about.html · reviews.html · contact.html · 404.html |
| CSS architecture | 5 files loaded in this order: variables.css > base.css > components.css > layout.css > animations.css |
| JS | main.js (header/drawer/reveal), gallery.js (filter/lightbox), contact.js (form) |
| Config | config.js — single source of truth for business data |
| Viewport meta | Present and correct on all pages |
| Safe-area support | env(safe-area-inset-bottom) already used in mobile bar and drawer |

### Key Finding: Inline style=" Attributes Override Media Queries
| File | Line | Problematic Inline Style |
|---|---|---|
| about.html | 123 | display: grid; grid-template-columns: 1fr 1fr |
| about.html | 148 | width: 100%; height: 500px; object-fit: cover |
| about.html | 141 | display: flex; gap: 1rem; flex-wrap: wrap |
| contact.html | 184 | display: grid; grid-template-columns: 1.1fr 1fr |
| index.html | 346 | display: flex; gap: 1rem; flex-wrap: wrap |
| reviews.html | 123 | display: flex; flex-wrap: wrap; justify-content: space-between |
| reviews.html | 125 | display: flex; align-items: center; gap: 1.5rem |
| reviews.html | 140 | display: flex; gap: 12px; flex-wrap: wrap |

---

## 2. Root-Cause Table

| # | Bug | Root Cause | File/Line | Fix |
|---|---|---|---|---|
| RC-01 | About Our Story 2-col does not stack | Inline grid-template-columns: 1fr 1fr overrides any media query | about.html:123 | class grid-2col with mobile.css override |
| RC-02 | About founder image 500px fixed height overflows | Inline height: 500px | about.html:148 | class about-founder-img with max-height/auto |
| RC-03 | Contact form+map side-by-side at 360px | Inline grid-template-columns: 1.1fr 1fr | contact.html:184 | class contact-grid collapses at <=860px |
| RC-04 | Document wider than viewport on Contact | Caused by RC-03 | contact.html:184 | Fix RC-03 |
| RC-05 | Submit button and long CTAs overflow | white-space: nowrap + large padding | components.css:14,24 | white-space: normal + max-width:100% at <=480px |
| RC-06 | Explore Complete Services button overflows | Same as RC-05 | components.css:14 | Same fix |
| RC-07 | Page-hero padding uses desktop header height | calc(var(--header-height)+3.5rem) not mobile | layout.css:335 | Override to use --header-mobile-height at <=860px |
| RC-08 | Footer 2-col visible between 520-599px | Collapse at 600px is too late | layout.css:614 | Add <=520px breakpoint: 1-col |
| RC-09 | WhatsApp FAB overlaps content and clips at 360px | right:28px and not hidden on mobile | components.css:556 | Hide on mobile (<=768px); bottom bar has WhatsApp |
| RC-10 | Bottom bar labels touch Android gesture bar | padding-bottom needs safe-area verification | components.css:593 | Add padding-bottom: max(env(safe-area-inset-bottom),6px) |
| RC-11 | Call label low contrast in mobile bar | color: var(--color-text-secondary) on white bar | components.css:620 | Override first child to --color-text-primary |
| RC-12 | Nanoplastia CTA group does not stack at 360px | Inline flex without column direction | index.html:346 | class flex-cta with column at <=420px |
| RC-13 | Reviews score banner breaks at 360px | Large 4.8 numeral in fixed flex row overflows | reviews.html:125 | class score-row stacks at <=500px |
| RC-14 | Map iframe tall on mobile | min-height: 400px | layout.css:375 | Override min-height: 250px at <=600px |
| RC-15 | Hero headline low contrast over video | Dark-brown text over dark video | layout.css:236 | Stronger gradient on mobile + text-shadow |
| RC-16 | About button group does not stack | Inline flex without column stacking | about.html:141 | class flex-cta |
| RC-17 | overflow-x: hidden on html/body masks bugs | Does not fix layout | base.css:17,27 | Use overflow-x: clip as safety net ONLY after fixing RC-01 to RC-16 |
| RC-18 | Form input font-size 15.2px triggers iOS zoom | font-size: 0.95rem | components.css:684 | Set font-size: max(1rem, 16px) on all form controls |
| RC-19 | Phone input missing inputmode and autocomplete | Not present | contact.html:207 | Add inputmode=tel autocomplete=tel |
| RC-20 | Drawer action buttons may be cut by gesture nav | margin-bottom formula may need buffer | layout.css:185 | Verify on real device; add 8px extra buffer |

---

## 3. Responsive Strategy

### Breakpoints (additions in bold)
| Breakpoint | Purpose |
|---|---|
| max-width: 1024px | Footer 4>2 col |
| max-width: 860px | Header mobile; page-hero uses mobile height |
| max-width: 768px | Mobile bar visible; signature cards stack; FAB hidden |
| max-width: 600px | Footer 1-col; hero CTAs stack; map height reduced |
| max-width: 520px | NEW: Footer collapses earlier |
| max-width: 480px | Gallery; testimonials; button white-space fix |
| max-width: 420px | NEW: Flex CTA groups become column |
| max-width: 380px | NEW: Filter tabs tighter; gallery item height |

### Strategy: New css/mobile.css File (loaded LAST — zero impact on desktop)
All fixes go into one new file. Existing 5 CSS files are NOT changed.

---

## 4. Full mobile.css Content

Create: css/mobile.css

`css
/* ================================================================
 Choice Beauty Salon — Mobile Override Sheet v1.0
 All desktop appearance is completely untouched.
 overflow-x: clip is a SAFETY NET — real fixes are in layout classes.
 ================================================================ */

/* Safety net after real layout fixes */
main, .site-footer, .site-header { overflow-x: clip; max-width: 100%; }

/* -- UTILITY: responsive 2-col to 1-col grid -- */
.grid-2col {
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: clamp(2rem, 5vw, 4rem);
 align-items: start;
}
@media (max-width: 700px) {
 .grid-2col { grid-template-columns: minmax(0, 1fr); gap: 2rem; }
}

/* -- UTILITY: contact page form + map grid -- */
.contact-grid {
 display: grid;
 grid-template-columns: 1.1fr 1fr;
 gap: clamp(2rem, 4vw, 3.5rem);
 align-items: start;
}
@media (max-width: 860px) {
 .contact-grid { grid-template-columns: minmax(0, 1fr); gap: 2rem; }
}

/* -- UTILITY: flex CTA button groups -- */
.flex-cta {
 display: flex;
 gap: 1rem;
 flex-wrap: wrap;
 align-items: center;
}
@media (max-width: 420px) {
 .flex-cta { flex-direction: column; align-items: stretch; }
 .flex-cta .btn { width: 100%; justify-content: center; }
}

/* -- UTILITY: reviews score banner -- */
.score-banner-inner {
 display: flex;
 flex-wrap: wrap;
 align-items: center;
 justify-content: space-between;
 gap: 2rem;
}
.score-row { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
.score-cta { display: flex; gap: 12px; flex-wrap: wrap; }
@media (max-width: 500px) {
 .score-banner-inner { flex-direction: column; align-items: flex-start; }
 .score-cta { flex-direction: column; width: 100%; }
 .score-cta .btn { width: 100%; justify-content: center; }
}

/* -- About page founder image -- */
.about-founder-img {
 width: 100%;
 height: auto;
 max-height: 420px;
 object-fit: cover;
 object-position: top;
 border-radius: var(--radius-xl);
 box-shadow: var(--shadow-lg);
}

/* -- Page hero: use mobile header height -- */
@media (max-width: 860px) {
 .page-hero {
 padding-top: calc(var(--header-mobile-height) + 2rem);
 padding-bottom: 2.5rem;
 }
}

/* -- Hero: stronger overlay + text contrast on mobile -- */
@media (max-width: 768px) {
 .hero-overlay {
 background: linear-gradient(
 to bottom,
 rgba(20, 10, 5, 0.75) 0%,
 rgba(20, 10, 5, 0.85) 50%,
 rgba(10, 5, 2, 0.96) 100%
 );
 }
 .hero-title { text-shadow: 0 2px 20px rgba(0,0,0,0.6); }
 .hero-video { object-position: center 20%; }
}

/* -- Footer: collapse to 1-col earlier -- */
@media (max-width: 520px) {
 .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
}

/* -- Buttons: allow text wrap -- */
@media (max-width: 480px) {
 .btn { white-space: normal; max-width: 100%; }
}

/* -- Forms: prevent iOS zoom (16px minimum) -- */
.form-input, .form-select, .form-textarea { font-size: max(1rem, 16px); }

/* -- Map: smaller on mobile -- */
@media (max-width: 600px) {
 .map-wrapper, .map-wrapper iframe { min-height: 250px; }
}

/* -- Mobile bar: safe-area + Call contrast -- */
@media (max-width: 768px) {
 .mobile-action-bar { padding-bottom: max(env(safe-area-inset-bottom, 0px), 6px); }
 .mobile-action-link:first-child { color: var(--color-text-primary); }
}

/* -- Main: bottom padding so bar never hides footer content -- */
@media (max-width: 768px) {
 main { padding-bottom: calc(var(--bottom-bar-height) + env(safe-area-inset-bottom, 0px) + 1rem); }
}

/* -- WhatsApp FAB: hide on mobile (bottom bar already has WhatsApp) -- */
@media (max-width: 768px) {
 .whatsapp-fab { display: none !important; }
}

/* -- Filter tabs: tighter on narrow phones -- */
@media (max-width: 380px) {
 .filter-tab { padding: 5px 10px; font-size: 0.76rem; }
 .gallery-item { height: 210px; }
}

/* -- Body line-height: tighten on mobile -- */
@media (max-width: 480px) {
 body { line-height: 1.55; }
}

/* -- Hero: use dvh -- */
.hero-section { min-height: 100dvh; }
`

---

## 5. Page-by-Page HTML Changes

### All 7 HTML files (6 pages + 404.html)
Add as LAST stylesheet in head:
`html
<link rel=stylesheet href=css/mobile.css?v=1.0>
`

Update viewport meta on all pages:
`html
<meta name=viewport content=width=device-width, initial-scale=1.0, viewport-fit=cover>
`

### about.html
Line 123 — change inline style to class:
FROM: style=display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: center;
TO: class=grid-2col style=align-items: center;

Line 141 — change inline style to class:
FROM: style=display: flex; gap: 1rem; flex-wrap: wrap;
TO: class=flex-cta

Lines 147-149 — remove wrapper div fixed height, use class on img:
FROM: <div style=border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-lg);>
 <img ... style=width: 100%; height: 500px; object-fit: cover;>
 </div>
TO: <div>
 <img ... class=about-founder-img>
 </div>

### contact.html
Line 184 — change inline style to class:
FROM: style=display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(2rem, 4vw, 3.5rem); align-items: start;
TO: class=contact-grid

Line 201 — add autocomplete:
<input type=text id=client-name name=name class=form-input
 placeholder=e.g. Priyal Patel required autocomplete=name>

Line 207 — add inputmode + autocomplete:
<input type=tel id=client-phone name=phone class=form-input
 placeholder=e.g. 097235 12890 required inputmode=tel autocomplete=tel>

### reviews.html
Line 123 wrapper div — add class (keep existing style for visual card):
<div class=score-banner-inner style=background: var(--color-surface-card); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: clamp(2rem, 4vw, 3rem); box-shadow: var(--shadow-sm);>

Line 125 — add class:
FROM: <div style=display: flex; align-items: center; gap: 1.5rem;>
TO: <div class=score-row>

Line 140 — add class:
FROM: <div style=display: flex; gap: 12px; flex-wrap: wrap;>
TO: <div class=score-cta>

### index.html
Line 346 — change inline style to class:
FROM: <div style=display: flex; gap: 1rem; flex-wrap: wrap;>
TO: <div class=flex-cta>

---

## 6. Hero Mobile Behaviour Table

| Viewport | Connection | prefers-reduced-motion | Behaviour |
|---|---|---|---|
| Any | Fast | No | Video plays autoplay muted loop playsinline; overlay; content visible |
| Any | Fast | Yes | Video paused at frame 0 via JS; poster shown |
| Any | Slow/Data Saver | Any | Browser skips autoplay; poster (LCP) shown |
| <=768px portrait | Any | Any | object-position: center 20% — shows hair not extreme close-up |
| <=480px landscape | Any | Any | min-height: 100dvh adjusts; hero may be shorter |
| iOS Safari | Any | Any | playsinline ensures inline play |

---

## 7. Testing Plan

### Manual matrix
Test all 6 pages at: 320, 360, 375, 390, 412, 430, 600, 768, 1024, 1280px
Test landscape at: 360px height
Test text zoom: 130% and 200%
Test real device: Android Chrome + iOS Safari

### Console check (run at 360px on each page)
`js
// Viewport overflow offenders
[...document.querySelectorAll('*')]
 .filter(e => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
 .map(e => ({ tag: e.tagName, cls: e.className?.toString().slice(0,60), right: Math.round(e.getBoundingClientRect().right) }));

// Pass condition
console.log(document.documentElement.scrollWidth === window.innerWidth ? 'PASS' : 'FAIL');
`

### Playwright test (tests/mobile-overflow.spec.js)
`js
const { test, expect } = require('@playwright/test');
const PAGES = ['/', '/services.html', '/gallery.html', '/about.html', '/reviews.html', '/contact.html'];
const WIDTHS = [320, 360, 390, 412, 768];
const BASE = process.env.TEST_URL || 'https://salon-demo-website-mu.vercel.app';

test.describe('Mobile overflow check', () => {
 for (const width of WIDTHS) {
 for (const path of PAGES) {
 test(${path} no overflow at px, async ({ page }) => {
 await page.setViewportSize({ width, height: 780 });
 await page.goto(BASE + path, { waitUntil: 'networkidle' });
 await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
 await page.waitForTimeout(400);
 await page.evaluate(() => window.scrollTo(0, 0));
 const r = await page.evaluate(() => ({
 sw: document.documentElement.scrollWidth,
 cw: document.documentElement.clientWidth,
 }));
 if (r.sw > r.cw + 1) await page.screenshot({ path: ests/ss-.png });
 expect(r.sw, ${path} at px: sw= cw=).toBeLessThanOrEqual(r.cw + 1);
 });
 }
 }
});
`

### Lighthouse mobile targets
| Metric | Target |
|---|---|
| Performance | >= 80 |
| Accessibility | >= 95 |
| Best Practices | >= 95 |
| SEO | >= 95 |
| CLS | < 0.1 |
| LCP | < 2.5s |

---

## 8. Phased Checklist

### Phase 1 — Critical (fix horizontal scroll and two-column layouts)
- [ ] Create css/mobile.css with all rules from Section 4
- [ ] Add mobile.css stylesheet link to all 7 HTML files
- [ ] Add viewport-fit=cover to all pages
- [ ] about.html L123: inline grid to class grid-2col
- [ ] about.html L148: inline height to class about-founder-img
- [ ] about.html L141: inline flex to class flex-cta
- [ ] contact.html L184: inline grid to class contact-grid
- [ ] contact.html L207: add inputmode=tel autocomplete=tel
- [ ] contact.html L201: add autocomplete=name
- [ ] reviews.html L123: add class score-banner-inner
- [ ] reviews.html L125: add class score-row
- [ ] reviews.html L140: add class score-cta
- [ ] index.html L346: inline flex to class flex-cta
- [ ] Verify scrollWidth === innerWidth on all 6 pages at 360px in DevTools
- [ ] Commit + push to mobile-fix branch
- [ ] Vercel preview URL shared with client for real phone testing

### Phase 2 — Polish
- [ ] Verify WhatsApp FAB hidden on mobile; visible on desktop
- [ ] Verify bottom bar labels clear Android gesture bar on Pixel 6 and Samsung
- [ ] Verify drawer buttons clear gesture bar
- [ ] Test text zoom 130% and 200%
- [ ] Test landscape on narrow phones
- [ ] Test iOS Safari 375px (form 16px font, safe-area)
- [ ] Run Playwright: all tests must pass
- [ ] Run Lighthouse mobile: all targets met
- [ ] Replace Formspree placeholder in contact.html
- [ ] QA sign-off on real Android device
- [ ] Merge mobile-fix branch to main

---

## 9. Git Delivery Workflow

`ash
# Create branch
git checkout -b mobile-fix

# After Phase 1 changes
git add css/mobile.css index.html about.html contact.html reviews.html services.html gallery.html 404.html
git commit -m fix(mobile): stop horizontal scroll; stack 2-col sections; hide FAB on mobile
git push origin mobile-fix
# Vercel auto-deploys preview URL — share with client

# After Phase 2
git commit -m fix(mobile): polish spacing, typography, safe-area, lighthouse
git push origin mobile-fix

# After approval — merge to main
git checkout main
git merge mobile-fix
git push origin main

# Rollback if needed
git revert HEAD~1
git push origin main
`

---

## 10. Content Audit — Items for Owner Verification

> Nothing changed. Listed only for owner review.

| # | Claim | Location | Action Needed |
|---|---|---|---|
| CA-01 | 10:00 AM - 8:00 PM Monday to Sunday | index.html hours table | Confirm closing time and weekly schedule |
| CA-02 | closes: 20:00 in JSON-LD | index.html head script | Must match actual closing time |
| CA-03 | Verified Client and Google Verified badges | All testimonial cards | Confirm these are real verbatim Google reviews |
| CA-04 | Bhanu P. and Aayushi P. testimonials extended | reviews.html, index.html | Confirm wording matches original Google review text |
| CA-05 | formaldehyde-free, organic nano-nutrients, without harsh chemicals | services.html | Confirm with brand/product documentation |
| CA-06 | Lasts 4 to 6 months | services.html, index.html | Owner to confirm based on their experience |
| CA-07 | hospital-grade hygiene, 100% single-use strips, pain-minimal | services.html | Owner to confirm specific protocol |
| CA-08 | founded with a clear purpose, thriving community over the years | about.html | Owner to review and confirm business story |
| CA-09 | private sections for facial therapy and waxing | about.html | Confirm physical layout |
| CA-10 | ground-level parking available | contact.html | Confirm parking availability |
| CA-11 | About page founder image shows AYA... signage | about.html | Replace with real salon photo |
| CA-12 | Interior image shows AURORA LUXE Ahmedabad | about.html | Replace with real salon interior photo |
| CA-13 | Gallery labelled Real salon results / Before After | gallery.html | Replace stock/generated images with real client photos (with consent) |
| CA-14 | shop-bg-03.mp4 hero video | index.html | Confirm source and commercial license |
| CA-15 | Services and Pricing in page title but no prices shown | services.html title | Either add prices or remove Pricing from title |
| CA-16 | Canonical and og:url point to choicebeautysalon.in | All pages | Confirm domain is active and pointed to Vercel |

---

## 11. Open Questions for Client

1. What time does the salon close each day? Same hours 7 days a week?
2. Is the choicebeautysalon.in domain already purchased and pointed to Vercel?
3. Please set up a real Formspree account and share the endpoint to replace placeholder_form_id.
4. Can you provide real photos of the salon interior, founder, and actual client results?
5. What is the source of shop-bg-03.mp4? Is there a commercial license for public web use?
6. Are the testimonials exact quotes from real Google reviews?
7. Which brand/product is used for Nanoplastia, and what are its verified marketing claims?
8. Is there confirmed ground-level parking at Marutinandan Complex?

---

*Plan v1.0 — Implementation begins on Phase 1 after approval.*
