# Changelog

## 2026-07-01 — Hero, brand, pricing, nav, and animation pass

### Hero video
- Compressed from 7.3 MB via reusable pipeline: audio stripped, H.264 MP4 + VP9 WebM (WebM primary / MP4 fallback).
- Swapped source Pexels → Kimi-V1 clip (Pexels read as "a Christmas show").
- Tried a boomerang loop to fix the abrupt cut; reverted to forward-only 5s loop (1.7 MB MP4 / 1.2 MB WebM) per feedback.
- Removed dark overlay; legibility now comes from `.hero-pop` text-shadow instead of a scrim.

### Design / brand
- Pulled back gradient use: flattened `.brand-gradient` to solid fill, killed gradient-text (`.brand-text` → solid orange). Gradient now only on the featured-plan badge.
- Fonts: Fraunces/Hanken/JetBrains → Space Grotesk (display) + Inter (body).
- Removed AI-sounding "Nigeria's next-generation ISP · Lagos" eyebrow; humanized hero copy, softened repeated "engineered" across pages.

### Pricing
- Adopted Kimi-TRAE structure: Home (Lite/Pro/Ultra) + Business (SME/Corporate/Enterprise), speed pills, check-lists, MOST POPULAR badge, grouped labels.
- Prices flagged in-code and on-page as unconfirmed vs. shop-now.

### Header / nav
- Transparent over hero (white logo + nav), solid blur once scrolled.
- Fixed stray divider line — mobile-menu `border-t` now only renders when open.
- Fixed hamburger menu text invisible in light mode by scoping the white-token override to the top bar, not the whole `<header>`.

### Theme toggle
- Landed on sliding pill switch (white knob, amber sun→moon), confirmed against claude.salient.community's live toggle.

### Imagery (Pexels, self-hosted AVIF/WebP)
- People slots retargeted to Black/African subjects; ISP banner graphics added to every inner page (fibre optics, comms tower, data center, Lagos skyline, network).
- Hero family image replaced with a Nigerian family in traditional attire (agbada/aso-ebi + gele).
- Fixed an out-of-place fiber image and two banners that had fetched empty.
- Removed the "Photography via Pexels…" credits line.

### Animations
- Accordion-slat reveal (from accordion.net.au) on lifestyle images, made robust so content is never stuck hidden.
- Staggered plan-card entrance, page-transition fade, hero reveal.
- Loading screen: NextGen logo beating like a heartbeat on first load; subtle fade between pages.

### Other
- WhatsApp: removed floating icon on desktop (moved to footer); shrank mobile icon to a compact 44px circle (Modish-style).

### Open items — resolution pass (same day)
1. **Plan prices** — ✅ **Done.** Pulled real data from the live WooCommerce Store API
   (`/wp-json/wc/store/v1/products`). The invented Kimi-TRAE tiers (20–200 Mbps,
   Home/Business split) did not exist. Rebuilt `data/plans.ts` to mirror the store:
   five residential plans — 1 Mbps ₦25k, 2 Mbps ₦40k, 3 Mbps ₦55k, 4 Mbps ₦65k,
   5 Mbps ₦80k (all /month) — plus one quote-based Enterprise card → `/contact`.
   Real per-product checkout URLs. `PlansSection` simplified to a single grid
   (homepage teases 3 + "See all plans", `/plans` shows all). JSON-LD now emits
   five accurate Product/Offer entries. Note: store tags 5 Mbps as "every day"
   (a WooCommerce misconfig on their end) — rendered as /month; confirm with client.
2. **Hero video license** — ⏳ **Still open.** Kimi-V1 clip kept as-is per your call;
   verify rights before launch.
3. **NAP gaps** — ⏳ **Blocked on you.** Need the verified WhatsApp number and precise
   street address to fill the placeholders in `lib/site.ts`.
4. **Testimonials** — ✅ **Done.** Removed the fabricated quotes (Adaeze O., Tunde A.,
   Mrs. Bello) and the social-proof section from the homepage. Reinstate only with
   real, consented customer quotes.
