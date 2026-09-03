# NextGen Telecoms — nextgen.ng

Production redesign for **NextGen Telecoms**, a Lagos-based fiber ISP. Bright,
professional marketing + plans site with a dark editorial theme on toggle.
Multipage, static-exportable, PWA, SEO-first.

- **Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- **Fonts:** Fraunces (display serif) · Hanken Grotesk (body) · JetBrains Mono (labels)
- **Output:** fully static (`output: "export"`) → `out/` — deploys to Cloudflare Pages / any static host
- **Scope:** exactly three live services — Fiber Internet (GPON/FTTx), Voice (VoIP), Metro Ethernet / Custom Networks. **No IPTV.**
- **Context graph:** `graphify-out/` (open `graph.html`) + `docs/CONTEXT.md` — the persistent source-of-truth for decisions. Re-run `/graphify . --update` after big changes.

## Develop

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # type-check + static export to ./out
npm run gen-assets     # regenerate logo variants + PWA icons + OG image from brand artwork
npm run fetch-images   # (needs PEXELS_API_KEY) fetch + self-host people imagery
```

## Theme — light default, dark toggle

- **Light is the default** on load (bright, professional). Dark is an opt-in toggle
  in the header (sun/moon), persisted in `localStorage`, keyboard-accessible
  (`role="switch"`, aria-labelled), with a no-flash inline script in `app/layout.tsx`.
- Both themes are fully designed and AA-contrast. Semantic color tokens in
  `app/globals.css` flip via `[data-theme="dark"]`; components read `var(--color-*)`
  so the whole UI re-themes from one place. Brand orange→red gradient is constant.
- The logo is theme-aware: black wordmark on light, white on dark (`components/Logo.tsx`).

## Pages

| Route | Purpose | Primary keywords |
|-------|---------|------------------|
| `/` | Home — hero (human image slot), trust band, 3 services, **Our Plans**, why, coverage teaser, social proof | fiber broadband Lagos |
| `/connectivity` | GPON fiber deep dive + speed tiers (2 Mbps → 2.5 Gbps STM-16) | GPON internet Nigeria, 1Gbps internet Nigeria price |
| `/voice` | VoIP for home + business (01-640 range) | business VoIP Nigeria |
| `/enterprise` | Metro Ethernet / IP-MPLS / HQ-to-branch | Metro Ethernet Nigeria |
| `/plans` | Full pricing + checkout links + estate-presence coverage checker | 1Gbps internet Nigeria price, fiber broadband Lagos |
| `/contact` | Enquiry form + WhatsApp + sales NAP | — |

Global: sticky header (logo + theme toggle + CTA), footer with schema NAP + optional
Pexels credit, and a WhatsApp click-to-chat float (`components/WhatsAppFloat.tsx`).

## Plans / pricing — how it's sourced

Plans come from the live WooCommerce **shop-now** page
(<https://www.nextgen.ng/shop-now/>), which is currently crawler-blocked (the audit's
robots.txt issue). **No prices are invented.** Edit `data/plans.ts`:

- Each tier has `name`, `speed`, `priceNgn`, `cycle`, `segment`, `highlights`, `checkoutUrl`.
- `priceNgn` is `null` (→ UI shows "Contact for pricing") with a `// TODO: confirm from
  shop-now` marker. Drop in the real Naira value and the homepage "Our Plans" + `/plans`
  render it immediately, and `Product`/`Offer` JSON-LD (with `priceCurrency: NGN`) is
  emitted automatically for any priced tier.

## Imagery pipeline — Pexels, build-time, self-hosted

Real-people internet imagery, fetched at build time and **self-hosted** (never hotlinked).

1. `npm run fetch-images` (reads `PEXELS_API_KEY` from env — see `.env.example`; key is
   free at <https://www.pexels.com/api/>).
2. `scripts/fetch-images.ts` queries the curated terms in `data/imagery.ts` (per-slot,
   orientation-matched), downloads, optimizes to **AVIF + WebP** responsive widths into
   `public/images/people/`, and rewrites `data/imagery.ts` with local `src`, `alt`,
   `avgColor` (blur-up), and photographer credit.
3. Components render via `<PeopleImage slot="...">` — responsive `<picture>` when fetched,
   a branded gradient placeholder until then (the build never depends on the images).
4. Footer shows a "Photography via Pexels" credit when photos are present.

Slots defined: `hero`, `fiber`, `voice`, `enterprise`, `why`. The hero consumes its slot
already; drop `<PeopleImage slot="fiber" />` etc. into the service sections after fetching.
Imagery is illustrative only — no photographed person implies endorsement.

## SEO fixes applied (from the audit)

1. **robots.txt now ALLOWS crawling** (`app/robots.ts`) — the old site blocked it. References the sitemap.
2. **sitemap.xml** for all routes (`app/sitemap.ts`).
3. **JSON-LD** (`components/JsonLd.tsx`): `Organization`/`InternetServiceProvider`/`LocalBusiness` (sitewide), `WebSite` + `SearchAction`, per-service `Service`, **`Product`/`Offer` per priced plan (NGN)**, `BreadcrumbList` on inner pages.
4. **Unique title + meta description per page**; templated titles via root `metadata`.
5. **Open Graph + Twitter cards** with a generated 1200×630 `og.png`.
6. **One H1 per page**, logical H2/H3 hierarchy.
7. **Performance:** static export, `next/font` self-host + `display: swap`, AVIF/WebP imagery, lazy-load below fold.
8. **A11y:** semantic HTML, breadcrumbs, alt/aria labels, visible focus rings, AA contrast in **both themes**, `prefers-reduced-motion` respected.
9. **Canonical URLs** per page; clean slugs; `trailingSlash` for static hosts.

## PWA

- `app/manifest.ts` → `manifest.webmanifest` (standalone, themed, maskable icon).
- `public/sw.js` — hand-rolled service worker (precache core routes, network-first navigations, cache-first assets). Registered in production only via `components/RegisterSW.tsx`.
- Icons in `public/icons/` generated from the real brand mark (`npm run gen-assets`).

## Deploy

**Cloudflare Pages** — build `npm run build`, output dir `out`, framework preset None.
**Any static host** — `npm run build`, upload `out/`; host must serve `*/index.html` for
trailing-slash routes (Cloudflare/Netlify/`serve` do this automatically).

## ⚠️ Before launch — replace placeholders

- `lib/site.ts`: `phoneDisplay` / `phoneHref`, `whatsapp`, `address`, `geo`, social URLs are
  **representative placeholders** — swap in verified NextGen NAP (drives `LocalBusiness`
  JSON-LD + footer).
- `data/plans.ts`: fill real Naira prices from shop-now (remove `// TODO` markers).
- Run `npm run fetch-images` with a Pexels key to populate imagery.
- Testimonials in `app/page.tsx` are illustrative — replace with real, attributed quotes.
