# NextGen Telecoms — Build Context & Decisions (v3)

Source-of-truth for *what we decided and why*. Kept current as the build evolves.

## Product
Marketing + plans site for NextGen Telecoms, a Lagos fiber ISP. Goal: convert homes and
businesses into subscribers. Tone: confident, premium, human, conversion-focused.

## Service scope (STRICT — exactly three)
1. **Fiber Internet (GPON / FTTx)** — 2 Mbps up to STM-16 (2.5 Gbps). Homes, enterprise,
   education, carriers, cloud/content.
2. **Voice / VoIP** — live, actively sold. 01-640xxxx Lagos range. Home + business.
3. **Metro Ethernet / Custom Network Solutions** — IP/MPLS, HQ-to-branch transport.

**Removed entirely: IPTV** and anything not live on nextgen.ng today. Why: audit scope —
the site must reflect only current, sellable services.

## Design system — "Signal" (Oct 2026, PR #2; supersedes the gradient/serif look)
Modelled on modishformals.com + moafrique.com (owner: "pick a lot from Modish and Mo'Afrique").
- **Canvas:** light = true white #fff, dark = true black #000 (toggle, light default,
  persisted, no-flash). Hairline borders instead of shadows. Heroes, CTA band, footer and
  the cinematic sections are always black (`.on-dark`). Tokens live in `app/globals.css`.
- **Font: DM Sans everywhere** (Hostinger's font; owner's default for formal sites —
  serifs are for fashion only). Calm scale enforced in CSS: h1 ≤ 4rem, h2 ≤ 2.5rem.
  Why: Instrument Serif was rejected as "not professional for an ISP".
- **Accent rule:** NextGen orange is a signal, never a gradient or wash — eyebrow rule,
  one coloured word per headline, link underlines, ONE conversion button per view
  (black text on orange, 6.7:1), focus rings, live dots, rising glow on black bands.
  Accent text on white is #d2400d (AA); on black #ff6b2c.
- **Buttons:** 48px hairline pills (`.btn-*`); `.cta-pair` keeps pairs on one row at 375px.
- **Header:** floating glass pill, transparent over heroes, tucks on scroll down.
  Phone menu = two bars → X, true-black sheet opening as a circle from the button,
  bottom Close + contact icons (`components/MenuMorph.tsx`). Phone action bar
  (WhatsApp + Check coverage).
- **Motion:** theme switch is a View Transitions curtain (dark falls / light rises);
  GSAP magnetic pull on 4 primary CTAs (mouse only, lazy); Motion for the menu and globe.
  All honour `prefers-reduced-motion`; hero H1s slide but never start invisible (LCP).
- **Deps added:** `motion@12`, `cobe@2` (backbone globe). Trade-off: phone menu needs JS
  (footer links still cover navigation without it).
- Hero: speed-first value prop + "Check coverage" CTA. Trust strip: 99.9% uptime ·
  3-day install · 24/7 NOC.

## Page structure
- `/` Home — hero, trust strip, 3 service cards, **Our Plans (pricing)**, why-NextGen,
  coverage teaser, social proof, CTA.
- `/connectivity` — GPON deep dive + speed tiers table (2 Mbps → 2.5 Gbps).
- `/voice` — VoIP home + business.
- `/enterprise` — Metro Ethernet / IP-MPLS / HQ-to-branch.
- `/plans` — full pricing + checkout links + estate-presence coverage check (was `/coverage`).
- `/contact` — form + WhatsApp + sales line.
- Global: sticky header (logo + theme toggle + CTA), footer with schema NAP + Pexels credit.

## Plans / pricing data source
Plans come from the live WooCommerce **shop-now** page (https://www.nextgen.ng/shop-now/),
which is currently crawler-blocked (the audit's robots.txt issue). **Never invent prices.**
Typed `data/plans.ts` holds name, speed, monthly ₦ price, billing cycle, highlights, checkout
CTA. Unknown values are `// TODO: confirm from shop-now` placeholders, wired so the homepage
renders the moment real values drop in. Render "Our Plans" cards on `/` + a fuller `/plans`.

## Imagery pipeline (Pexels, build-time, self-hosted)
Real-people internet imagery (African/Nigerian, candid, warm). **Fetch at build time, self-host**
— never hotlink the Pexels CDN at runtime. `scripts/fetch-images.ts` reads `PEXELS_API_KEY`
from env (documented in `.env.example`, never committed), queries curated terms per slot,
downloads + optimizes (AVIF/WebP, responsive), writes to `/public/images/people/` and a typed
manifest `data/imagery.ts` (slot → path, alt, avg_color blur, photographer credit). Images are
illustrative only — no photographed person implies endorsement. Footer carries optional Pexels
credit. Why self-host: fast, offline-deployable to Cloudflare/shared hosting, license-clean.

## Install messaging
3-day install, scheduled after a site inspection. Sell estate-presence advantage:
"Already live in your estate? We connect you faster." Soft coverage-check prompt.

## SEO (half the job)
robots.txt ALLOWS crawl + sitemap ref; `app/sitemap.ts`; JSON-LD (Organization/LocalBusiness,
Service per service, **Product/Offer per plan with NGN price**, BreadcrumbList, WebSite);
unique title/description per page; OG/Twitter cards; one H1/page; keywords woven naturally
("GPON internet Nigeria", "fiber broadband Lagos", "1Gbps internet Nigeria price",
"Metro Ethernet Nigeria", "business VoIP Nigeria"); static export, next/image AVIF/WebP,
lazy-load, Lighthouse 95+; AA contrast both themes; canonical URLs.

## Stack & reuse
Next.js (App Router) + TS + Tailwind v4, static export for Cloudflare/shared hosting.
Reuse Modish Formals patterns: smooth scroll, section rhythm, quote/contact form, WhatsApp
click-to-chat float, PWA install, theme persistence, perf + security hardening. Adapt — not
NextGen's identity is its own (orange/black, not Modish purple).

## Status
**v1→v2 shipped:** scaffold, 3-services + no-IPTV, base SEO, PWA, real logo (bg removed, variants).
**v3 shipped:** light-default theme system + persisted dark toggle (no-flash, AA both, theme-aware
logo); `data/plans.ts` + "Our Plans" on `/` + `/plans` page (real-price TODO placeholders, no
invented prices); Pexels pipeline scaffolded (`scripts/fetch-images.ts`, `data/imagery.ts`,
`<PeopleImage>`, `.env.example` — run `npm run fetch-images` with a key to populate); WhatsApp
float; `Product`/`Offer` JSON-LD per priced plan; `/coverage` merged into `/plans`; README updated.
**Pending real data (user-owned):** verified NAP in `lib/site.ts`, real plan prices in
`data/plans.ts`, Pexels key to fetch imagery. Refresh this graph with `/graphify . --update`.
