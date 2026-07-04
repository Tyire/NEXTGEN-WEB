import { Container, Button, Arrow, Eyebrow } from "@/components/ui";
import { TrustBand } from "@/components/sections/TrustBand";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { PlansSection } from "@/components/sections/PlansSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HumanMoment } from "@/components/sections/HumanMoment";
import { PlansJsonLd } from "@/components/JsonLd";
import { HeroVideo } from "@/components/HeroVideo";
import { Reveal } from "@/components/Reveal";
import { coverageZones, site } from "@/lib/site";

const marqueeItems = [
  "GPON Fibre",
  "99.9% Uptime",
  "Symmetrical Speeds",
  "3-Day Install",
  "Carrier-Grade Core",
  "No Data Caps",
  "Lagos-Wide Coverage",
  "Low-Latency Core",
];

const why = [
  { k: "Fiber, not fixed-wireless", d: "GPON glass to your premises means no weather drops, no shared-tower congestion at 8pm." },
  { k: "Symmetrical by design", d: "Upload as fast as you download — built for creators, video calls and backups." },
  { k: "Honest install windows", d: "3-day install after a site survey. Faster where we already have estate presence." },
  { k: "Carrier-grade core", d: "IP/MPLS backbone with 99.9% uptime and SLAs that hold up for business." },
];

export default function Home() {
  return (
    <>
      {/* ── HERO — full-bleed fibre-data video background ───────── */}
      <section
        id="hero"
        className="relative isolate flex min-h-[100svh] items-center overflow-hidden md:min-h-[88vh]"
        /* scope light-on-dark tokens so text reads over the video in BOTH themes */
        style={
          {
            "--color-fg": "#ffffff",
            "--color-fg-muted": "rgba(255,255,255,0.82)",
            "--color-fg-faint": "rgba(255,255,255,0.64)",
            "--color-hairline": "rgba(255,255,255,0.24)",
          } as React.CSSProperties
        }
      >
        <HeroVideo className="absolute inset-0 -z-20 h-full w-full object-cover" />
        {/* Left-anchored dark scrim: darkens the copy side so the white heading and
            the bright-orange accent word both pop, while the vivid teal right side
            fades to transparent and stays fully visible. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050706]/92 via-[#050706]/62 via-55% to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-[#060807]/45 to-transparent" />
        <span className="aurora pointer-events-none absolute -top-32 left-[-10%] -z-10 h-[520px] w-[520px] rounded-full bg-[var(--color-brand-red)] opacity-[0.22] blur-[150px]" />
        <span className="aurora pointer-events-none absolute -bottom-24 right-[-8%] -z-10 h-[440px] w-[440px] rounded-full bg-[var(--color-brand-amber)] opacity-[0.16] blur-[150px] [animation-delay:-6s]" />

        <Container>
          <div className="hero-pop max-w-3xl py-28 md:py-32">
            <h1 className="display rise mt-6 text-6xl font-semibold leading-[0.95] text-[var(--color-fg)] [animation-delay:0.1s] sm:text-7xl md:text-8xl">
              Say goodbye to
              <br />
              <span className="text-flow">buffering.</span>
            </h1>
            <p className="rise mt-7 max-w-md text-lg leading-relaxed text-[var(--color-fg-muted)] [animation-delay:0.28s]">
              Fast, unlimited fibre for Lagos homes and businesses — stream, work and game
              with no caps and no drama.
            </p>
            <div className="rise mt-9 flex flex-wrap items-center gap-3 [animation-delay:0.42s]">
              <Button href={site.selfcare.onboard} variant="solid">Check Coverage <Arrow /></Button>
              <Button href="/plans" variant="outline">See fibre plans</Button>
            </div>

            {/* inline speed proof */}
            <div className="rise mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-fg-faint)] [animation-delay:0.56s]">
              <span>↑↓ Symmetrical</span>
              <span className="hidden h-3 w-px bg-[var(--color-hairline)] sm:block" />
              <span>STM-16 capable</span>
              <span className="hidden h-3 w-px bg-[var(--color-hairline)] sm:block" />
              <span>Low-latency core</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CREDENTIALS MARQUEE — infinite scrolling proof strip ─────── */}
      <div className="marquee-mask relative overflow-hidden border-y border-[var(--color-hairline)] bg-[var(--color-void)] py-4">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {marqueeItems.map((m) => (
                <span
                  key={m}
                  className="flex items-center gap-5 whitespace-nowrap px-5 font-mono text-sm uppercase tracking-[0.18em] text-[var(--color-fg-muted)]"
                >
                  {m}
                  <span className="h-1.5 w-1.5 rounded-full brand-gradient" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <TrustBand />

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="relative py-24">
        <Container>
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <Eyebrow>What we run</Eyebrow>
              <h2 className="display mt-4 text-4xl font-semibold text-[var(--color-fg)] md:text-5xl">
                Three things, done properly.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-fg-muted)]">
              No bundled clutter. Fiber internet, voice and enterprise transport — each built
              on the same carrier-grade fiber core.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <ServiceGrid />
          </Reveal>
        </Container>
      </section>

      {/* ── HUMAN MOMENT ─────────────────────────────────────── */}
      <HumanMoment
        slot="hero"
        eyebrow="Made for real life in Lagos"
        title="Internet that fits how your home actually lives."
        body="Movie nights that don't buffer, work calls that hold, kids learning online — all on one fiber line built to keep up with a busy Nigerian household."
      />

      {/* ── OUR PLANS ────────────────────────────────────────── */}
      <PlansJsonLd />
      <PlansSection />

      {/* ── WHY ──────────────────────────────────────────────── */}
      <section className="relative border-y border-[var(--color-hairline)] bg-[var(--color-void)] py-24">
        <Container>
          <Reveal className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Eyebrow>Why NextGen</Eyebrow>
              <h2 className="display mt-4 text-4xl font-semibold text-[var(--color-fg)] md:text-5xl">
                Built for people who can&apos;t afford to buffer.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-fg-muted)]">
                We obsess over the boring parts — peak-hour stability, real upload speed,
                install honesty — because that&apos;s what reliable internet actually is.
              </p>
              <Button href="/enterprise" variant="outline" className="mt-8">
                Enterprise solutions <Arrow />
              </Button>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-hairline)] sm:grid-cols-2">
              {why.map((w) => (
                <li key={w.k} className="bg-[var(--color-ink)] p-7">
                  <h3 className="display text-xl font-semibold text-[var(--color-fg)]">{w.k}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">{w.d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* ── COVERAGE TEASER ──────────────────────────────────── */}
      <section className="py-24">
        <Container>
          <Reveal className="rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-8 md:p-12 lift hover:border-[var(--color-brand-orange)]/40 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>Live coverage</Eyebrow>
                <h2 className="display mt-4 max-w-md text-3xl font-semibold text-[var(--color-fg)] md:text-4xl">
                  We&apos;re already lit across Lagos.
                </h2>
              </div>
              <Button href={site.selfcare.onboard} variant="outline">Check your address <Arrow /></Button>
            </div>
            <div className="mt-9 flex flex-wrap gap-2.5">
              {coverageZones.map((z) => (
                <span
                  key={z}
                  className="rounded-full border border-[var(--color-hairline)] bg-[var(--color-ink)] px-4 py-2 font-mono text-xs tracking-wide text-[var(--color-fg-muted)]"
                >
                  {z}
                </span>
              ))}
              <a
                href={site.selfcare.onboard}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full brand-gradient px-4 py-2 font-mono text-xs font-semibold tracking-wide text-[#180a04]"
              >
                + your estate?
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Social-proof testimonials removed 2026-07-01 — the previous quotes were
          fabricated. Reinstate this section only with real, consented customer
          quotes. */}

      <CtaBanner />
    </>
  );
}
