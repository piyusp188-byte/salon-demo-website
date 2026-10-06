# Choice Beauty Salon — Website Implementation Plan

> **Status:** Draft for approval — no code will be written until this plan is confirmed.
> **Prepared:** 6 October 2026 | **Prepared for:** Choice Beauty Salon, Ahmedabad

---

## Table of Contents

1. [Summary of Understanding & Assumptions](#1-summary-of-understanding--assumptions)
2. [Reference Website Analysis](#2-reference-website-analysis-canvassalonandspa)
3. [Recommended Tech Stack](#3-recommended-tech-stack)
4. [Sitemap & Page-by-Page Wireframe](#4-sitemap--page-by-page-wireframe)
5. [Design System](#5-design-system)
6. [Folder / File Structure](#6-folder--file-structure)
7. [Content Plan](#7-content-plan)
8. [Feature Implementation Notes](#8-feature-implementation-notes)
9. [SEO & Analytics Plan](#9-seo--analytics-plan)
10. [Performance & Accessibility Plan](#10-performance--accessibility-plan)
11. [Phased Roadmap & Task Checklist](#11-phased-roadmap--task-checklist)
12. [Testing Checklist](#12-testing-checklist)
13. [Deployment & Handover Plan](#13-deployment--handover-plan)
14. [Risks, Open Questions & Clarifications Needed](#14-risks-open-questions--clarifications-needed)

---

## 1. Summary of Understanding & Assumptions

### What I Understand
Choice Beauty Salon is a women-owned beauty parlour and hair salon located in the Ghatlodiya / KK Nagar area of Ahmedabad. It has a strong local reputation (4.8 stars from 184 Google reviews) and an existing SimplyBook.me booking system. The primary goals of this website are:

1. **Convert** phone and walk-in intent into online bookings and direct calls.
2. **Build trust** through social proof, professional design, and hygiene signals.
3. **Rank locally** for searches like "beauty parlour near me", "hair salon KK Nagar Ahmedabad".
4. **Be maintainable** by the owner or a non-developer with minimal technical knowledge.

### Key Assumptions (flagged for confirmation)

| # | Assumption | Risk if Wrong |
|---|-----------|---------------|
| A1 | The salon serves **women only** (no men's services) | Would change services page scope |
| A2 | Closing time and weekly off day are **unknown** — placeholder used | Hours widget will show incomplete info |
| A3 | No logo exists — a **typographic wordmark** will be designed in CSS | May clash with owner's vision |
| A4 | No real photos available at build time — **high-quality placeholder images** used from Unsplash/Pexels with clear notes to replace | Gallery will not reflect real salon |
| A5 | SimplyBook.me booking will open in a **new tab** (redirect, not embedded) — see section 8.1 | Owner may prefer embedded widget |
| A6 | Contact form will use **Formspree** (free tier, 50 submissions/month) | If volume exceeds 50/month, upgrade needed |
| A7 | No pricing is available — all service cards will have an **optional price slot** hidden by default | Cannot do price-based SEO |
| A8 | Team member names and photos are **unknown** — placeholder slots used | About page will be thin until filled |
| A9 | The site will be **static HTML/CSS/JS** (see section 3) — no CMS or database | Owner updates files manually or via a form |
| A10 | Budget is **zero or near-zero** for hosting — Netlify free tier recommended | |

---

## 2. Reference Website Analysis (canvassalonandspa.co.in)

> The site was partially unavailable for automated scraping; the analysis below is based on available industry context and best-practice research.

### What Canvass Salon Does Well

| Strength | How We Adopt It |
|----------|----------------|
| **Sticky header** with persistent Book Now CTA | Adopt — our header will always show "Book Now" |
| **Full-screen hero** with atmospheric salon imagery | Adopt — premium hero with subtle parallax effect |
| **Service grid** with icons/illustrations | Adopt — filterable grid with category tabs |
| **Testimonials carousel** | Adopt — auto-scrolling + manual navigation |
| **Trust signals** (ratings) near the top | Adopt — trust bar immediately below hero |
| **Google Maps embed** on Contact page | Adopt |
| **Clean sans-serif typography** | Adopt with a serif display pairing for elegance |

### Where We Will Do Better

| Weakness to Avoid | Our Approach |
|-------------------|-------------|
| **Slow load times** from heavy images | WebP/AVIF, lazy loading, Lighthouse 90+ target |
| **Generic CTAs** like "Contact Us" | Specific, action-driven: "Book Your Treatment", "Chat on WhatsApp" |
| **No WhatsApp integration** for Indian users | Floating WhatsApp button + mobile bottom bar |
| **No "Open/Closed" hours indicator** | Real-time hours widget in header and footer |
| **No before/after gallery** | Dedicated before-and-after section with lightbox |
| **Weak local SEO signals** | Schema.org JSON-LD, localised copy, NAP consistency |
| **No mobile bottom action bar** | Persistent 4-button bar on mobile: Call, WhatsApp, Book, Directions |
| **Booking friction** (external redirect feels abrupt) | Smooth transition with brief loading state |

---

## 3. Recommended Tech Stack

### Comparison Table

| Criterion | Plain HTML/CSS/JS | Astro (SSG) | Next.js (SSR/SSG) |
|-----------|:-----------------:|:-----------:|:-----------------:|
| Learning curve for owner updates | Easiest | Medium | Hardest |
| SEO (static HTML) | Excellent | Excellent | Good (SSG mode) |
| Performance (no JS runtime) | Best | Near-best | Heavier |
| Hosting cost | Free | Free | Free (Vercel) |
| Build tooling required | None | npm build | npm build |
| Component reuse | Manual | Built-in | Built-in |
| CMS-ready later | Manual | Ready | Ready |
| Best for a 6-page static site | YES | YES | Overkill |

### Recommendation: Plain HTML + CSS + Vanilla JS

**Reasoning:**
- The site is 6 pages with no server-side logic needed — a static site is ideal.
- Zero build tooling: the owner or any developer can open files in Notepad and edit.
- All content lives in a **single `config.js` data file** — update once, reflects everywhere.
- Deployed to **Netlify** via drag-and-drop or Git. No `npm install` required for the owner.
- Achieves Lighthouse 90+ without a framework's overhead.
- If a CMS is needed later (Phase 3), the static files can be ported to Astro with minimal rework.

**The only JS dependencies used:**
- `vanilla-lazyload` (CDN) — image lazy loading
- `GLightbox` (CDN) — gallery lightbox
- No jQuery. No React. No build step.

---

## 4. Sitemap & Page-by-Page Wireframe

### Sitemap

```
/                    → Home
/services.html       → Services
/gallery.html        → Gallery
/about.html          → About Us
/reviews.html        → Reviews & Testimonials
/contact.html        → Contact
/bridal.html         → Bridal Packages [Phase 2]
/blog/               → Blog / Tips [Phase 2]
/404.html            → Custom 404
```

---

### 4.1 Home Page (index.html)

| # | Section | Content Purpose | Primary CTA |
|---|---------|----------------|-------------|
| 1 | **Sticky Header** | Logo, nav links, persistent Book Now button, hours badge | Book Now |
| 2 | **Hero** | Full-viewport image, H1 headline + sub-headline, two CTAs | Book Appointment / Call Now |
| 3 | **Trust Bar** | 4.8 star badge, "184 Google Reviews", Women-Owned, Hygiene-First icons | → Google Reviews link |
| 4 | **Featured Services** | 4 service cards (Hair, Skin, Makeup, Waxing) with icons and Learn More links | → /services.html |
| 5 | **Signature Treatment Spotlight** | Deep-dive on Nanoplastia treatment — biggest differentiator | Book This Treatment |
| 6 | **Why Choose Us** | 4 value pillars: Trained Staff, Hygiene, Personalised Care, Ahmedabad Trusted | — |
| 7 | **Testimonials Carousel** | 3 real reviews with star ratings, first name, avatar placeholder | → /reviews.html |
| 8 | **Gallery Preview** | 6-image mosaic grid (before/after + interior), links to full gallery | → /gallery.html |
| 9 | **Location & Hours** | Embedded Google Map, address, hours table with Open/Closed indicator | Get Directions |
| 10 | **Final CTA Banner** | Strong closing headline, Book + WhatsApp buttons | Book Appointment |
| 11 | **Footer** | Logo, nav links, social links, address, phone, copyright | — |
| 12 | **Floating Elements** | WhatsApp FAB, Mobile bottom action bar (Call/WhatsApp/Book/Directions) | — |

---

### 4.2 Services Page (services.html)

| # | Section | Notes |
|---|---------|-------|
| 1 | Page Hero (smaller, decorative) | Headline: "Our Services" |
| 2 | Category Filter Bar | Tabs: All / Hair / Skin / Makeup / Waxing |
| 3 | Service Cards Grid | Icon, name, short description, optional price badge (hidden by default), "Book" CTA |
| 4 | Signature Treatments Panel | Nanoplastia call-out with more detail |
| 5 | Bottom CTA | "Not sure which service? Call us or WhatsApp" |

---

### 4.3 Gallery Page (gallery.html)

| # | Section | Notes |
|---|---------|-------|
| 1 | Page Hero | Headline: "See the Transformation" |
| 2 | Filter Tabs | All / Before & After / Hair / Makeup / Salon Interior |
| 3 | Masonry/Grid Gallery | Lazy-loaded WebP images, lightbox on click |
| 4 | CTA strip | "Like what you see? Book your visit" |

---

### 4.4 About Page (about.html)

| # | Section | Notes |
|---|---------|-------|
| 1 | Page Hero | Headline: "Our Story" |
| 2 | Story Section | Salon origin, owner's vision, women-owned message |
| 3 | Philosophy / Values | 3 pillars with icons |
| 4 | Team Section | [TEAM_PLACEHOLDER] cards — owner to supply photos and names |
| 5 | Women-Owned Banner | Tasteful highlight of women-owned status, supportive messaging |
| 6 | CTA | "Come visit us — Book your appointment" |

---

### 4.5 Reviews Page (reviews.html)

| # | Section | Notes |
|---|---------|-------|
| 1 | Hero + Rating Badge | 4.8 stars / 184 reviews prominently displayed |
| 2 | Review Cards Grid | All 3+ provided reviews in card format with star rating |
| 3 | Google Reviews Link | "Read all reviews on Google" button |
| 4 | Leave a Review CTA | "Love your experience? Leave us a review" → Google link |

---

### 4.6 Contact Page (contact.html)

| # | Section | Notes |
|---|---------|-------|
| 1 | Page Hero | Headline: "Find Us & Get in Touch" |
| 2 | Contact Info Cards | Phone (click-to-call), WhatsApp, Address, Hours |
| 3 | Map Embed | Google Maps iframe, "Get Directions" external link |
| 4 | Contact Form | Name, Phone, Service Interest, Message; Formspree backend |
| 5 | Booking Reminder | "For appointments, use our online booking" → SimplyBook link |

---

## 5. Design System

### 5.1 Color Palettes

#### Option A — "Rose Dusk" (RECOMMENDED)
Warm, feminine, premium. Soft blush background with rose-terracotta accents and deep charcoal text.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#C7836A` Rose Terracotta | CTAs, highlights, active nav |
| `--color-primary-light` | `#E8B9A8` Blush | Hover states, badges |
| `--color-primary-dark` | `#9B5A44` Deep Rose | Pressed states |
| `--color-accent` | `#B5935A` Rose Gold | Decorative lines, icons, borders |
| `--color-surface` | `#FDF8F5` Warm Cream | Page background |
| `--color-surface-alt` | `#F5EDE7` Blush Tint | Section alternation |
| `--color-text-primary` | `#2C1810` Deep Espresso | Body text |
| `--color-text-secondary` | `#6B4F44` Muted Mocha | Captions, secondary text |
| `--color-white` | `#FFFFFF` | Cards, overlays |
| `--color-border` | `#E8D5CC` Light Rose | Dividers, card borders |

#### Option B — "Midnight Plum"
Dramatic, editorial, luxury feel. Deep plum with champagne gold accents.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#6B3FA0` Deep Plum | CTAs, highlights |
| `--color-accent` | `#C9A84C` Champagne Gold | Icons, decorative |
| `--color-surface` | `#FAF7FF` Pale Lavender | Background |
| `--color-surface-dark` | `#1A0A2E` Midnight | Dark sections |
| `--color-text-primary` | `#1A0A2E` Midnight | Body text |

> **Recommendation: Option A (Rose Dusk).** It reads as warm, welcoming, and clearly beauty-focused without being cliche pink. The terracotta rose is a modern 2024-2026 design trend, and the cream background ensures excellent readability and fast perceived loading.

---

### 5.2 Typography

| Role | Font | Weight | Size (desktop) |
|------|------|--------|---------------|
| Display / Hero H1 | Cormorant Garamond | 300, 400, 600 | 56–72px |
| Headings H2–H3 | Cormorant Garamond | 600 | 32–44px |
| Body text | DM Sans | 400, 500 | 16–18px |
| UI / Buttons / Nav | DM Sans | 500, 600 | 14–16px |
| Captions / Tags | DM Sans | 400 | 12–14px |

**Pairing Rationale:** Cormorant Garamond brings old-world elegance and femininity to headlines; DM Sans is clean and highly legible on mobile — ideal for body copy and UI elements. Both are available as variable fonts from Google Fonts.

---

### 5.3 Spacing Scale
8px base grid: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px

---

### 5.4 Button System

| Variant | Style | Usage |
|---------|-------|-------|
| Primary | Rose Terracotta fill, white text, 6px radius | "Book Appointment" |
| Secondary | Outlined (2px rose border), transparent fill | "Call Now", "Learn More" |
| Ghost | No border, rose text, underline on hover | Inline links |
| WhatsApp | #25D366 green fill, white text, WhatsApp icon | WhatsApp CTA |
| Icon Button | Round, 48px, for FAB and mobile bar | Floating actions |

All buttons: `transition: transform 150ms ease, box-shadow 150ms ease` — on hover: lift 2px + soft shadow.

---

### 5.5 Cards

**Service Card:** White background, 1px rose border, 16px radius, icon (48px), title, 2-line description, optional price badge (hidden by default via `data-show-price="false"`), CTA link.

**Testimonial Card:** Cream background, 12px radius, decorative quotation mark (rose gold), star rating row, quote text, name.

**Gallery Tile:** Aspect ratio 1:1 or 4:3, `object-fit: cover`, hover overlay with expand icon.

---

### 5.6 Logo / Wordmark

Since no logo exists, the site will use a CSS typographic wordmark:

```
Choice                     ← Cormorant Garamond Light, wide tracking
BEAUTY SALON               ← DM Sans SemiBold, smaller, very wide tracking
─────────────              ← thin rose-gold horizontal rule
```

A simple SVG floral or scissors motif can sit to the left. This is pure CSS/SVG — no image file needed, and it scales perfectly at any resolution. The owner can commission a real logo later that slots into the same space.

---

### 5.7 Iconography

**Lucide Icons** (MIT license, SVG sprite) for all UI icons. Consistent stroke weight (1.5px), 24x24px default. Key icons used: scissors, sparkles, leaf, star, phone, message-circle, map-pin, clock, heart, check.

---

### 5.8 Animations

All animations respect `@media (prefers-reduced-motion: reduce)`:

| Animation | Trigger | Duration |
|-----------|---------|----------|
| Fade-up on scroll | Intersection Observer | 600ms ease-out |
| Hero parallax (subtle) | Scroll | Continuous |
| Button hover lift | :hover | 150ms ease |
| Card border glow | :hover | 200ms ease |
| Testimonial carousel slide | Auto + click | 400ms ease-in-out |
| Mobile bar entry | Page load | 300ms slide-up |
| Lightbox fade | Click | 250ms ease |

---

## 6. Folder / File Structure

```
d:\salon demo website\
│
├── index.html               ← Home page
├── services.html            ← Services page
├── gallery.html             ← Gallery page
├── about.html               ← About page
├── reviews.html             ← Reviews page
├── contact.html             ← Contact page
├── 404.html                 ← Custom 404
│
├── config.js                ← SINGLE SOURCE OF TRUTH
│                               Business info, services, reviews, hours
│
├── css/
│   ├── variables.css        ← Design tokens (colors, fonts, spacing)
│   ├── reset.css            ← Modern CSS reset
│   ├── base.css             ← Typography, body, links
│   ├── components.css       ← Buttons, cards, badges, forms
│   ├── layout.css           ← Header, footer, grid, sections
│   ├── animations.css       ← Keyframes, transition utilities
│   └── pages/
│       ├── home.css
│       ├── services.css
│       ├── gallery.css
│       ├── about.css
│       ├── reviews.css
│       └── contact.css
│
├── js/
│   ├── main.js              ← Init, mobile menu, header scroll, hours widget
│   ├── gallery.js           ← Filter, lightbox, lazy load
│   ├── services.js          ← Filter tabs
│   ├── testimonials.js      ← Carousel auto-scroll
│   ├── contact.js           ← Form validation + Formspree submit
│   └── analytics.js         ← GA4 event tracking
│
├── images/
│   ├── hero/
│   │   ├── hero-main.webp         ← [REPLACE with real salon photo]
│   │   └── hero-mobile.webp
│   ├── services/
│   │   ├── hair.webp
│   │   ├── skin.webp
│   │   ├── makeup.webp
│   │   └── waxing.webp
│   ├── gallery/
│   │   ├── before-after-01.webp   ← [REPLACE]
│   │   └── ...
│   ├── team/
│   │   └── team-placeholder.webp
│   ├── og-image.jpg               ← Open Graph image (1200x630px)
│   └── favicon/
│       ├── favicon.ico
│       ├── apple-touch-icon.png
│       └── site.webmanifest
│
├── icons/
│   └── lucide-sprite.svg    ← SVG icon sprite
│
├── sitemap.xml
├── robots.txt
└── netlify.toml             ← Netlify redirect and cache rules
```

---

## 7. Content Plan

### 7.1 Draft Headlines & Copy

**Hero Section:**
- H1: "Where Every Visit Feels Like a Treat"
- Subheadline: "Ahmedabad's trusted beauty parlour in Ghatlodiya, KK Nagar — for hair, skin, makeup & more."
- Primary CTA: "Book Your Appointment"
- Secondary CTA: "Call: 097235 12890"

**Trust Bar:**
- "4.8 / 5 from 184 Google Reviews"
- "Proudly Women-Owned"
- "Hygiene-First Environment"
- "Ghatlodiya, Ahmedabad"

**Featured Services Tagline:** "From everyday care to special occasion glam — we've got you covered."

**Signature Treatment Spotlight (Nanoplastia):**
- H2: "Transform Your Hair with Nanoplastia"
- Body: "Say goodbye to frizz and dry, tangled hair. Our signature Nanoplastia treatment uses advanced nano-technology to smooth, soften, and revive your hair — leaving it shiny, manageable, and beautifully healthy."
- Quote: "My hair went from dry and tangled to soft, shiny, and completely manageable." — Bhanu P.

**Why Choose Us:**
- "Caring, Trained Staff" — Our team listens, advises, and delivers results that suit you.
- "Premium Products & Hygiene" — Quality products in a clean, sanitised space, every time.
- "Personalised Service" — From haircuts to bridal makeup, every treatment is tailored to you.
- "Ahmedabad Trusted" — 4.8 stars and 184 reviews speak louder than words.

**Testimonials:**
- "I visit every month for waxing, cleanup, and hair treatments. The staff is very kind, professional, and welcoming — and the hygiene is excellent." — Anjali S.
- "My hair was completely transformed after the Nanoplastia treatment. Couldn't be happier." — Bhanu P.
- "The stylist took time to understand exactly what I wanted and delivered an incredible haircut." — Aayushi P.

**Final CTA Banner:**
- H2: "Ready for Your Transformation?"
- Body: "Book online in seconds, or give us a call — we'd love to see you."
- CTA 1: "Book Appointment Online"
- CTA 2: "Chat on WhatsApp"

**About Page Story (placeholder):**
> "Choice Beauty Salon was born from a passion for helping women look and feel their best. Located in the heart of Ghatlodiya, Ahmedabad, our salon offers a warm, welcoming space where every client is treated with care and respect. As a proudly women-owned business, we understand the needs of the women we serve — and we bring that understanding to every service we offer."
> [OWNER_STORY — please provide 2–3 sentences about how and why you started the salon]

---

### 7.2 Assets I Need You to Provide

| Asset | Priority | Notes |
|-------|----------|-------|
| Salon interior / exterior photos | CRITICAL | 5–10 high-res JPG/PNG for hero and gallery |
| Before & After photos | CRITICAL | Especially hair treatments, makeup |
| Owner/team photos + names | IMPORTANT | For About page team section |
| Owner's story (2–3 sentences) | IMPORTANT | Why she started the salon |
| Exact closing time + weekly off day | IMPORTANT | Hours widget will show "Closed" otherwise |
| Service prices (if to be shown) | OPTIONAL | Can toggle on later via config.js |
| Social media handles (Instagram, etc.) | OPTIONAL | Footer links, social proof |
| Google Analytics GA4 Measurement ID | OPTIONAL | For traffic tracking |
| Preferred domain name | IMPORTANT | e.g., choicebeautysalon.in |
| Email address for contact form replies | REQUIRED | Needed to set up Formspree |

---

## 8. Feature Implementation Notes

### 8.1 Online Booking (SimplyBook.me)

| Option | UX | Speed Impact | Recommendation |
|--------|-------|-------------|----------------|
| Redirect (new tab) | User leaves site briefly | Zero | RECOMMENDED |
| Embedded iFrame widget | User stays on page | ~500ms extra | Not recommended for performance |

**Decision: Redirect (new tab).** SimplyBook's embedded widget adds third-party JS and iframe overhead that hurts Lighthouse scores. A clean `target="_blank"` redirect is faster and more reliable. SimplyBook's own mobile experience is well-optimised. We add a brief loading toast: "Opening booking page…"

### 8.2 WhatsApp Integration

- **Floating FAB:** Fixed bottom-right, 56px circle, WhatsApp green (#25D366), with a subtle pulse animation. Pre-filled message URL: `https://wa.me/919723512890?text=Hello%2C%20I%27d%20like%20to%20book%20an%20appointment%20at%20Choice%20Beauty%20Salon`
- **Mobile bottom bar:** One of the 4 action buttons
- **CTA sections:** Dedicated WhatsApp buttons throughout the page
- **Analytics:** Click events tracked in GA4 as `whatsapp_click`

### 8.3 Google Maps Embed

```html
<iframe
  src="https://maps.google.com/maps?q=Marutinandan+Complex+KK+Nagar+Ghatlodiya+Ahmedabad&output=embed"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Choice Beauty Salon location on Google Maps">
</iframe>
```

"Get Directions" button links to: `https://maps.app.goo.gl/6WDFSV6VFLX1EU9y9`

### 8.4 Contact Form

**Backend: Formspree (free tier — 50 submissions/month)**

- Form fields: Name (required), Phone/WhatsApp (required), Service interested in (dropdown), Message (optional)
- Client-side validation with clear error messages
- Spam protection: Formspree's built-in honeypot field
- On success: inline success message "We've received your message and will reply within 24 hours!"
- On error: show error with WhatsApp fallback link
- Upgrade path: Formspree Basic ($10/month) or EmailJS free tier (200 emails/month)

### 8.5 Gallery Lightbox

- Library: **GLightbox** (3KB gzipped, MIT license, CDN) — keyboard navigation, swipe on mobile, zoom, captions
- Lazy loading: **vanilla-lazyload** (2KB, CDN) with `data-src` attributes
- All gallery images in **WebP** with JPEG fallback via `<picture>` element
- Filter tabs use CSS `display:none` toggling — no re-render, instant filter

### 8.6 Opening Hours Widget

The hours are stored in `config.js` — the owner edits only this file:

```javascript
const BUSINESS_HOURS = {
  monday:    { open: "10:00", close: "CLOSING_TIME_UNKNOWN", isOpen: true },
  tuesday:   { open: "10:00", close: "CLOSING_TIME_UNKNOWN", isOpen: true },
  wednesday: { open: "10:00", close: "CLOSING_TIME_UNKNOWN", isOpen: true },
  thursday:  { open: "10:00", close: "CLOSING_TIME_UNKNOWN", isOpen: true },
  friday:    { open: "10:00", close: "CLOSING_TIME_UNKNOWN", isOpen: true },
  saturday:  { open: "10:00", close: "CLOSING_TIME_UNKNOWN", isOpen: true },
  sunday:    { open: "UNKNOWN", close: "UNKNOWN", isOpen: false },
};
```

Widget reads current day/time (client-side, IST timezone via `Intl`) and displays:
- Green dot + "Open Now" if within hours
- Red dot + "Closed" if outside hours or on off day
- "Opens at 10:00 AM" when closed

### 8.7 Mobile Bottom Action Bar

Fixed at bottom of viewport, visible only on screens under 768px. Four icon+label buttons with glassmorphism effect:

| Button | Icon | Action |
|--------|------|--------|
| Call | Phone | `tel:+919723512890` |
| WhatsApp | MessageCircle | `https://wa.me/919723512890?text=...` |
| Book | Calendar | SimplyBook.me link (new tab) |
| Directions | MapPin | `https://maps.app.goo.gl/6WDFSV6VFLX1EU9y9` |

### 8.8 Config File (config.js)

Everything the owner would ever update lives here — no touching layout HTML:

```javascript
const SALON_CONFIG = {
  name: "Choice Beauty Salon",
  tagline: "Where Every Visit Feels Like a Treat",
  phone: "+91 97235 12890",
  whatsapp: "919723512890",
  address: "Marutinandan Complex, 11, KK Nagar Rd, near Hocco Entry, Sector 4, Ghatlodiya, Nirnay Nagar, Ahmedabad, Gujarat 380061",
  bookingUrl: "https://r.postserver.simplybook.me",
  googleMapsUrl: "https://maps.app.goo.gl/6WDFSV6VFLX1EU9y9",
  googleReviewsUrl: "https://maps.app.goo.gl/6WDFSV6VFLX1EU9y9",
  rating: { score: 4.8, count: 184 },
  social: { instagram: "", facebook: "" },
  hours: { /* ... see 8.6 */ },
  services: [ /* ... array of service objects */ ],
  testimonials: [ /* ... array of review objects */ ],
};
```

---

## 9. SEO & Analytics Plan

### 9.1 Page Titles & Meta Descriptions

| Page | Title Tag | Meta Description |
|------|-----------|-----------------|
| Home | Choice Beauty Salon — Hair & Beauty Parlour in Ghatlodiya, Ahmedabad | Ahmedabad's trusted beauty parlour in KK Nagar, Ghatlodiya. Hair treatments, Nanoplastia, facials, bridal makeup & more. Book online. 4.8 stars. |
| Services | Services — Hair, Skin, Makeup & Waxing | Choice Beauty Salon | Explore our full menu of hair treatments, facials, waxing, and makeup services. Women-only salon in Ghatlodiya, Ahmedabad. Book online. |
| Gallery | Before & After Gallery — Choice Beauty Salon Ahmedabad | See real transformations: hair treatments, Nanoplastia, bridal makeup, and more from our salon in KK Nagar, Ghatlodiya. |
| About | About Us — Women-Owned Beauty Salon in Ahmedabad | The story behind Choice Beauty Salon, a proudly women-owned beauty parlour serving Ghatlodiya, KK Nagar, and Nirnay Nagar, Ahmedabad. |
| Reviews | Customer Reviews — Choice Beauty Salon Ahmedabad | Read real reviews from happy clients of Choice Beauty Salon in Ghatlodiya. 4.8 stars from 184 Google reviews. |
| Contact | Contact & Location — Choice Beauty Salon, KK Nagar Ahmedabad | Find us at Marutinandan Complex, KK Nagar Rd, Ghatlodiya, Ahmedabad. Call, WhatsApp, or book online. Open from 10 AM. |

### 9.2 Schema.org JSON-LD (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": ["HairSalon", "BeautySalon"],
  "name": "Choice Beauty Salon",
  "image": "https://choicebeautysalon.in/images/og-image.jpg",
  "url": "https://choicebeautysalon.in",
  "telephone": "+91-97235-12890",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Marutinandan Complex, 11, KK Nagar Rd, near Hocco Entry, Sector 4",
    "addressLocality": "Ghatlodiya, Nirnay Nagar",
    "addressRegion": "Gujarat",
    "postalCode": "380061",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.0825",
    "longitude": "72.5319"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "10:00",
      "closes": "CLOSING_TIME_UNKNOWN"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "184"
  },
  "sameAs": ["https://maps.app.goo.gl/6WDFSV6VFLX1EU9y9"]
}
```

### 9.3 Target Keywords

| Intent | Keywords |
|--------|----------|
| Primary local | beauty parlour near me Ahmedabad, hair salon KK Nagar, beauty salon Ghatlodiya |
| Secondary local | hair salon Nirnay Nagar, salon near Hocco Ahmedabad, parlour Ghatlodiya |
| Service-specific | Nanoplastia treatment Ahmedabad, hair smoothening Ahmedabad, bridal makeup Ahmedabad |
| Long-tail | best women salon in Ghatlodiya, affordable facial Ahmedabad, hair spa near me Ahmedabad |

### 9.4 Technical SEO Checklist

- [ ] `sitemap.xml` — all 6 pages with `<lastmod>` and `<priority>`
- [ ] `robots.txt` — allow all, point to sitemap
- [ ] Canonical URLs on every page (`<link rel="canonical">`)
- [ ] Open Graph tags — title, description, image (1200x630px), type, URL
- [ ] Twitter Cards — `summary_large_image`
- [ ] `lang="en"` on `<html>` tag
- [ ] Alt text on every image (descriptive, keyword-aware)
- [ ] NAP consistent with Google Business Profile on every footer
- [ ] No broken internal links
- [ ] Mobile-friendly validated

### 9.5 Google Business Profile Optimisation Checklist

- [ ] Confirm all NAP details match the website exactly
- [ ] Add website URL to GBP
- [ ] Upload 10+ high-quality photos (interior, exterior, services, team)
- [ ] Set categories: "Beauty Salon" (primary) + "Hair Salon" (secondary)
- [ ] Add all services with descriptions
- [ ] Add business hours (once confirmed)
- [ ] Enable messaging / link to WhatsApp
- [ ] Post weekly via GBP Posts
- [ ] Respond to all reviews within 24 hours
- [ ] Add "Women-owned" attribute in GBP

### 9.6 Analytics

**Tool: Google Analytics 4 (free)**

Custom events to track:
- `book_click` — any "Book Appointment" button
- `call_click` — any "Call Now" or tel: link
- `whatsapp_click` — any WhatsApp link
- `directions_click` — Get Directions button
- `form_submit` — contact form submission
- `gallery_open` — lightbox opened

A lightweight cookie consent banner will be added (local storage based, no paid tool required).

---

## 10. Performance & Accessibility Plan

### 10.1 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| LCP (Largest Contentful Paint) | < 2.5s |
| INP | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| First Contentful Paint | < 1.8s |

### 10.2 Performance Techniques

| Technique | Implementation |
|-----------|---------------|
| Image formats | All images in WebP with JPEG fallback via `<picture>` |
| Lazy loading | Native `loading="lazy"` + vanilla-lazyload for CSS bg images |
| Hero image preload | `<link rel="preload" as="image">` for above-fold image |
| Font loading | `font-display: swap`, preconnect to Google Fonts |
| CSS | Minified, no unused rules, critical CSS inlined above fold |
| JavaScript | Deferred, no blocking scripts, no jQuery |
| Google Maps | Loaded lazily via Intersection Observer |
| CDN | Netlify's global CDN for all static assets |
| Compression | Netlify auto-compresses all text assets (Brotli/GZIP) |
| Cache headers | `netlify.toml` sets long cache for images, short for HTML |

### 10.3 Accessibility (WCAG 2.1 AA)

| Requirement | Implementation |
|-------------|---------------|
| Colour contrast | All text/background combos ≥ 4.5:1 (verified with APCA) |
| Alt text | All `<img>` tags have descriptive alt attributes |
| Keyboard navigation | All interactive elements focusable with visible focus ring |
| Skip link | `<a href="#main" class="skip-link">Skip to main content</a>` |
| ARIA labels | Icon-only buttons have `aria-label`; modal has `role="dialog"` |
| Form labels | All inputs have `<label for="...">` or `aria-label` |
| Semantic HTML | `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, correct H1–H6 hierarchy |
| Reduced motion | All animations wrapped in `@media (prefers-reduced-motion: no-preference)` |
| Touch targets | All tappable elements ≥ 44x44px |
| Error messages | Form errors announced via `role="alert"` |

---

## 11. Phased Roadmap & Task Checklist

### Phase 1 — MVP (Target: 2–3 weeks)

**Goal:** Live, functional, SEO-ready website with all 6 pages.

#### Setup & Infrastructure
- [ ] Create full project folder structure
- [ ] Create `config.js` with all business data
- [ ] Create CSS variable system (`variables.css`)
- [ ] Create shared components: header, footer, mobile bar, WhatsApp FAB

#### Pages
- [ ] Home page — all 10 sections
- [ ] Services page
- [ ] Gallery page (with premium placeholder images)
- [ ] About page (with placeholder team section)
- [ ] Reviews page
- [ ] Contact page + Formspree form setup

#### Features
- [ ] Sticky header with scroll-shadow effect
- [ ] Mobile hamburger menu
- [ ] Mobile bottom action bar
- [ ] Floating WhatsApp button
- [ ] Opening hours widget (IST timezone)
- [ ] Gallery lightbox (GLightbox)
- [ ] Lazy loading (vanilla-lazyload)
- [ ] Testimonials carousel
- [ ] Service filter tabs
- [ ] Contact form with validation + Formspree

#### SEO & Tech
- [ ] Schema.org JSON-LD on all pages
- [ ] All meta tags (title, description, OG, Twitter)
- [ ] `sitemap.xml` + `robots.txt`
- [ ] Canonical URLs
- [ ] All image alt texts
- [ ] `netlify.toml` cache/redirect config
- [ ] GA4 snippet + custom event tracking

#### QA & Launch
- [ ] Lighthouse audit all pages (target 90+)
- [ ] Mobile test on real Android device
- [ ] Test all links (booking, call, WhatsApp, maps)
- [ ] Test contact form end-to-end
- [ ] Cross-browser test (Chrome, Safari, Firefox)
- [ ] Deploy to Netlify
- [ ] Connect custom domain + HTTPS
- [ ] Submit sitemap to Google Search Console
- [ ] Add website URL to Google Business Profile

---

### Phase 2 — Enhancements (Post-launch, 4–6 weeks later)

- [ ] Replace all placeholder images with real salon photos
- [ ] Add team member profiles to About page
- [ ] Enable service prices via config.js (one-line toggle)
- [ ] Add Bridal Packages page (`/bridal.html`)
- [ ] Add Blog / Tips for SEO (`/blog/`) — 3–5 initial posts:
  - "How to care for Nanoplastia-treated hair"
  - "5 bridal makeup tips for Ahmedabad weddings"
  - "Why hygiene matters in your beauty parlour"
- [ ] Instagram feed embed
- [ ] Add more testimonials (via config.js)
- [ ] Complete Google Business Profile optimisation

### Phase 3 — Future (3–6 months)
- [ ] Evaluate Netlify CMS for owner self-editing
- [ ] Multilingual support (Gujarati / Hindi) if needed
- [ ] Astro migration if blog grows significantly
- [ ] Loyalty programme or referral widget

---

## 12. Testing Checklist

### Devices
- [ ] iPhone SE (375px) — smallest common iPhone
- [ ] iPhone 14 Pro (393px)
- [ ] Samsung Galaxy A series (360px)
- [ ] iPad (768px)
- [ ] Desktop 1280px
- [ ] Desktop 1920px

### Browsers
- [ ] Chrome (Android + Windows)
- [ ] Safari (iOS) — critical for Indian users
- [ ] Firefox
- [ ] Edge
- [ ] Samsung Internet

### Functional Tests
- [ ] All nav links work on desktop and mobile
- [ ] Hamburger menu opens/closes correctly
- [ ] Book Now opens SimplyBook in new tab
- [ ] Call Now triggers phone dialler on mobile
- [ ] WhatsApp link opens with pre-filled message
- [ ] Get Directions opens Google Maps
- [ ] Contact form submits and shows success message
- [ ] Contact form shows error on invalid input
- [ ] Gallery filter tabs work correctly
- [ ] Gallery lightbox opens, navigates, and closes
- [ ] Testimonials carousel auto-scrolls and responds to click
- [ ] Hours widget shows correct Open/Closed status
- [ ] Footer NAP is correct and consistent

### Performance & Accessibility
- [ ] Lighthouse ≥ 90 all categories (mobile + desktop)
- [ ] WAVE accessibility tool — no errors
- [ ] Keyboard-only navigation through entire site
- [ ] Tab order is logical
- [ ] All images have alt text
- [ ] No horizontal scroll on mobile
- [ ] Prefers-reduced-motion: animations off when set

---

## 13. Deployment & Handover Plan

### Hosting: Netlify (Free Tier)

**Why Netlify:** Zero cost, global CDN, HTTPS by default, drag-and-drop deploy, auto-deploy from GitHub.

**Deployment Steps:**
1. Zip project folder → drag to `app.netlify.com/drop` for instant live URL
2. Or: Push to GitHub → connect repo in Netlify for auto-deploy on every commit
3. Netlify assigns a free `.netlify.app` subdomain immediately

### Custom Domain Setup
- **Recommended domain:** `choicebeautysalon.in` (GoDaddy India or BigRock — ~₹800/year)
- DNS: Point nameservers to Netlify OR add CNAME/A records from Netlify dashboard
- HTTPS: Netlify provisions free Let's Encrypt SSL automatically

### netlify.toml Configuration

```toml
[[redirects]]
  from = "/book"
  to = "https://r.postserver.simplybook.me"
  status = 301

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

### How the Owner Can Update Content

**To update text, phone, hours, services, reviews — edit `config.js` only:**
1. Open `config.js` in any text editor (Notepad works fine)
2. Find the item to change (all sections are clearly labelled with comments)
3. Update the value in quotes
4. Save the file
5. Re-upload to Netlify (drag the whole folder into Netlify dashboard)

**To replace an image:**
1. Name the new photo the same as the old one (e.g., `hero-main.webp`)
2. Convert to WebP if possible (free tool: squoosh.app)
3. Drop it into the correct `/images/` subfolder
4. Re-upload

**For layout or page changes:** contact the original developer.

A written "Owner's Guide to Updating Your Website" document will be provided at handover.

---

## 14. Risks, Open Questions & Clarifications Needed

### CRITICAL — Need Before Building

| # | Question | Why It Matters |
|---|----------|---------------|
| Q1 | What are the exact **closing hours** and **weekly off day**? | Hours widget will show incorrect Open/Closed status |
| Q2 | Do you have **salon photos** (interior, services, staff)? | Site launches with placeholder images otherwise |
| Q3 | What **domain name** do you want? (e.g., choicebeautysalon.in) | Needed for canonical URLs, OG tags, and Schema.org |
| Q4 | What **email address** should contact form replies go to? | Required to set up Formspree |

### IMPORTANT — Affects Design Decisions

| # | Question | Default if Not Answered |
|---|----------|------------------------|
| Q5 | **Color palette** — Option A (Rose Dusk) or Option B (Midnight Plum)? | Option A (Rose Dusk) |
| Q6 | Is the salon **women-only**, or do you also serve men? | Will present as women-only |
| Q7 | Do you want **service prices** shown on the website? | Prices hidden by default, toggleable later |
| Q8 | Do you have an **Instagram or Facebook page**? | Social links in footer omitted |
| Q9 | **When did the salon open?** (founding year) | About page uses [YEAR_FOUNDED] placeholder |
| Q10 | **Team members** — how many stylists? Any names or roles to mention? | Generic placeholder cards on About page |
| Q11 | Preferred **content language** — English only, or also Gujarati/Hindi? | English only for Phase 1 |

### Lower Priority — Nice to Confirm

| # | Question | Default |
|---|----------|---------|
| Q12 | **Embedded booking widget or redirect?** | Redirect (new tab) — recommended |
| Q13 | Do you want a **Blog section** for SEO in Phase 2? | Will plan for Phase 2, not build in Phase 1 |
| Q14 | Do you want **Google Analytics** for visitor tracking? | GA4 snippet added with placeholder ID |
| Q15 | Any **services/treatments not listed** that should appear? | Will use the inferred list from reviews |
| Q16 | Do you have a **Google Analytics account** already? | Will create one if not |

---

### Known Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| No real photos at launch | High | High | Premium Unsplash placeholders; clear REPLACE notes in config.js |
| SimplyBook.me URL changes | Low | Medium | URL stored only in config.js — one-line update |
| Formspree free limit exceeded | Low | Low | Documented upgrade path; easy to switch |
| Google Maps embed breaks without API key | Low | Medium | Falls back to static map link + directions button |
| Owner cannot update files independently | Medium | Medium | Written guide provided; Netlify CMS in Phase 3 |
| Closing time unknown → hours widget inaccurate | High | Medium | Shows "Call to confirm hours" until info provided |

---

## Ready to Build?

Once you approve this plan and answer the questions in Section 14:

1. I will build Phase 1 in this order: CSS system → shared components → Home → all other pages → SEO files → deploy configuration.
2. You provide real photos and content to replace placeholders before or after launch.
3. We deploy to Netlify and submit to Google Search Console.
4. Phase 2 enhancements follow in the weeks after launch.

---

*This document is a living plan. Any changes to business details, design direction, or features should be confirmed before coding begins.*
