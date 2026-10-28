import { Container, Button, Arrow, SectionHead } from "@/components/ui";
import { WovenParticles } from "@/components/sections/WovenParticles";
import { BackboneGlobe } from "@/components/sections/BackboneGlobe";
import { backboneLandings } from "@/data/backbone";
import { PlansGrid } from "@/components/sections/PlansGrid";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsBand } from "@/components/sections/StatsBand";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { CoverageChecker } from "@/components/CoverageChecker";
import { GeometricFlythrough } from "@/components/sections/GeometricFlythrough";
import { SpeedGauge } from "@/components/sections/SpeedGauge";
import { NetworkMap } from "@/components/sections/NetworkMap";
import { site, purpose } from "@/lib/site";

// Hero proof points (from Kimi's design)
const proofPoints = [
  { value: "99.9%", label: "Network uptime" },
  { value: "3 days", label: "Survey to online" },
  { value: "24/7", label: "NOC support" },
];

// Audience split cards (from Kimi's design)
const audienceCards = [
  {
    tag: "For homes",
    title: "Unlimited fibre,",
    accent: "no contract.",
    body: "Unlimited fibre plans for streaming, remote work and smart homes — prepaid, pause any month.",
    action: "View home plans",
    href: "/plans",
  },
  {
    tag: "For business",
    title: "Dedicated links,",
    accent: "SLA-backed.",
    body: "Dedicated connectivity, SLA-backed uptime and enterprise-grade support across Lagos.",
    action: "Talk to enterprise sales",
    href: "/enterprise",
  },
];

// "Why NextGen" numbered features (from Kimi's design)
// Six proofs that back up the mission. Rendered as a compact evidence rail
// beneath the Mission/Vision cards in the PURPOSE section — not a section of
// their own. Kept to one crisp line each so they read as receipts, not lede.
const whyProofs = [
  { title: "Unlimited Data", body: "No caps, no throttling, no hidden limits." },
  { title: "99.9% Uptime", body: "Fully redundant network with automated failover." },
  { title: "Symmetrical Speeds", body: "Upload as fast as you download — video calls, cloud backups, remote teams." },
  { title: "24/7 Support", body: "Real Lagos engineers on WhatsApp and the phone — not a ticket queue." },
  { title: "3-Day Installation", body: "Survey to streaming in about three days in every lit estate." },
  { title: "Direct Backbone", body: "Our own metro core straight to Equiano and MainOne — not resold." },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden md:items-center">
        {/* Woven-light particle knot — silver, with a sprinkle of accent.
            Renders instantly; no JS / reduced motion = one static frame. */}
        <WovenParticles className="-z-20" />

        {/* Legibility scrims: bottom-up on phones, left-to-right on desktop. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#000_18%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.15))] md:bg-[linear-gradient(90deg,#000_8%,rgba(0,0,0,0.7)_45%,rgba(0,0,0,0)_78%)]" />
        <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

        <Container className="relative pb-28 pt-32 md:pb-24 md:pt-40 lg:pb-24">
          <p className="rise eyebrow eyebrow-rule">
            <span className="live-dot" aria-hidden="true" />
            <span className="sm:hidden">GPON fibre · Lagos</span>
            <span className="hidden sm:inline">GPON fibre · Lekki · Ikate · Ilasan · Ajah</span>
          </p>

          <h1
            className="display rise-slide mt-6 max-w-[900px] text-[3.15rem] leading-[0.96] text-white sm:text-7xl lg:text-[6.4rem]"
            style={{ animationDelay: "0.08s" }}
          >
            Fibre for homes.
            <br />
            Resilient connectivity
            <br />
            <span className="accent-word">for business.</span>
          </h1>

          <p className="rise mt-7 max-w-[34rem] text-[1.05rem] leading-relaxed text-white/70 md:text-xl" style={{ animationDelay: "0.18s" }}>
            Truly unlimited fibre broadband, dedicated enterprise links, voice and data
            infrastructure across Lagos — backed by a 24/7 operations team.
          </p>

          <div className="rise cta-pair mt-9 max-w-md sm:max-w-none" style={{ animationDelay: "0.28s" }}>
            <Button href={site.selfcare.onboard} external variant="accent" magnetic>
              Check coverage <Arrow />
            </Button>
            <Button href="/enterprise" variant="ghost-light">
              For business
            </Button>
          </div>

          {/* Stats row — serif figures, tracked labels, one hairline above. */}
          <ul className="rise mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-6 md:mt-16" style={{ animationDelay: "0.36s" }} aria-label="Network highlights">
            {proofPoints.map((p) => (
              <li key={p.label}>
                <p className="display text-[2rem] leading-none text-white md:text-5xl">{p.value}</p>
                <p className="mt-2 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white/55 md:text-[0.68rem]">{p.label}</p>
              </li>
            ))}
          </ul>
        </Container>

        {/* Scroll indicator — desktop only (phones have the action bar) */}
        <div className="absolute bottom-8 right-10 hidden flex-col items-center gap-3 opacity-60 lg:flex" aria-hidden="true">
          <div className="relative h-10 w-px bg-white/25">
            <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--accent)] animate-[scroll-dot_1.6s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR — editorial split, routes homes vs business ─── */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          {audienceCards.map((c, i) => (
            <a
              key={c.tag}
              href={c.href}
              className={`group flex flex-col justify-between gap-10 px-5 py-12 transition-colors md:px-10 md:py-16 ${
                i === 0 ? "border-b border-[var(--color-hairline)] md:border-b-0 md:border-r" : ""
              } hover:bg-[var(--color-surface-2)]`}
            >
              <div>
                <p className="eyebrow">{c.tag}</p>
                <h2 className="display mt-4 text-[2.4rem] leading-[1.02] md:text-[3.2rem]">
                  {c.title} <span className="accent-word">{c.accent}</span>
                </h2>
                <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-[var(--color-fg-muted)]">{c.body}</p>
              </div>
              <span className="link-cta self-start">
                {c.action} <Arrow />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── SERVICES — Kimi-style asymmetric layout ──────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-ink)] py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="What we offer"
            title={
              <>
                Solutions built for
                <br />
                <span className="text-[var(--color-brand-orange)]">every need.</span>
              </>
            }
            lede="Home fiber, business voice, and carrier-grade transport — all running on infrastructure we own and operate ourselves."
          />
          <div className="mt-12 md:mt-16">
            <ServicesGrid />
          </div>
        </Container>
      </section>

      {/* ── NEXTGEN CLOUD — compact band, links out to /cloud ─────────── */}
      <section className="wash relative overflow-hidden py-16 md:py-20">
        <Container className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <p className="eyebrow mb-3">New · Pre-launch</p>
            <h2 className="display text-3xl font-extrabold sm:text-4xl">
              Introducing <span className="text-[var(--color-brand-orange)]">NextGen Cloud.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-fg-muted)]">
              Hosting, business email, Naira-billed VPS and done-for-you websites — on our own Lagos network. A small pilot group is onboarding now.
            </p>
          </div>
          <a
            href="/cloud"
            className="group btn btn-ghost shrink-0"
          >
            Explore NextGen Cloud <Arrow />
          </a>
        </Container>
      </section>

      {/* ── PLANS ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-surface)] py-20 md:py-28" id="plans">
        <span aria-hidden="true" className="ghost absolute right-0 top-4 text-[20vw] opacity-30 md:text-[11rem]">
          SPEED
        </span>
        <Container className="relative">
          <SectionHead
            eyebrow="Broadband plans"
            title={
              <>
                Choose your
                <br />
                <span className="text-[var(--color-brand-orange)]">speed.</span>
              </>
            }
            lede="Unlimited data. No hidden caps. Real prices from the onboarding portal — what you see is what you pay."
          />
          <div className="mt-12 md:mt-16">
            <PlansGrid carousel />
          </div>
          <p className="sr mt-8 text-sm text-[var(--color-fg-muted)]">
            Installation fees vary by estate —{" "}
            <a href="/plans#coverage" className="font-semibold text-[var(--color-brand-orange)] underline underline-offset-2 hover:text-[var(--color-brand-red)]">
              check your estate below
            </a>
            .
          </p>
        </Container>
      </section>

      {/* ── DATA IN MOTION ─────────────────────────────────────────── */}
      <GeometricFlythrough />

      {/* ── PURPOSE — mission and vision lead; six proofs back them up ── */}
      <section className="wash relative overflow-hidden py-20 md:py-28" aria-labelledby="purpose-title">
        <span aria-hidden="true" className="ghost absolute -top-4 right-0 text-[18vw] opacity-30 md:text-[10rem]">
          PURPOSE
        </span>
        <Container className="relative">
          <div className="max-w-2xl">
            <p className="eyebrow">Our driving force</p>
            <h2 id="purpose-title" className="display mt-4 text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Why Choose <span className="text-[var(--color-brand-orange)]">NextGen?</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
              Every plan, every install, every night-shift ticket ladders back to a single purpose.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
            {/* Mission */}
            <article className="sr-pop edge-top rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-8 md:p-10">
              <span className="display block text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-brand-orange)]">
                Mission Statement
              </span>
              <h3 className="display mt-4 text-2xl font-extrabold md:text-3xl">
                {purpose.mission.headline}
              </h3>
              {purpose.mission.lines.map((line, i) => (
                <p key={i} className={`${i === 0 ? "mt-4" : "mt-3"} text-sm leading-relaxed text-[var(--color-fg-muted)]`}>
                  {line}
                </p>
              ))}
            </article>

            {/* Vision */}
            <article className="sr-pop edge-top rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-8 md:p-10" style={{ animationDelay: "0.07s" }}>
              <span className="display block text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-brand-orange)]">
                Vision Statement
              </span>
              <h3 className="display mt-4 text-2xl font-extrabold md:text-3xl">
                {purpose.vision.headline}
              </h3>
              <ul className="mt-4 space-y-3">
                {purpose.vision.beliefs.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    <span aria-hidden="true" className="mt-1 shrink-0 text-[var(--color-brand-orange)]">→</span>
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/* Evidence rail — how the mission and vision translate into service.
              Deliberately understated: small tiles, hairline dividers, one
              crisp line each. Meant to read as receipts under the cards
              above, not as its own section. */}
          <div className="mt-14 border-t border-[var(--color-hairline)] pt-10 md:mt-20 md:pt-14">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
              <p className="eyebrow">How we back it up</p>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">Six ways · one promise</p>
            </div>
            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {whyProofs.map((p, i) => (
                <li
                  key={p.title}
                  className="sr-pop group flex gap-4"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-orange)]" />
                  <div>
                    <h4 className="display text-sm font-bold uppercase tracking-[0.08em]">{p.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-fg-muted)]">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── SPEED GAUGE ────────────────────────────────────────────── */}
      <SpeedGauge />

      {/* ── COVERAGE ──────────────────────────────────────────────── */}
      <section className="wash relative overflow-hidden py-20 md:py-28" id="coverage">
        <span aria-hidden="true" className="ghost absolute -top-3 left-0 text-[20vw] opacity-30 md:text-[11rem]">
          LIVE IN
        </span>
        <Container className="relative">
          <SectionHead
            eyebrow="Coverage"
            title={
              <>
                Already lit in{" "}
                <span className="text-[var(--color-brand-orange)]">your estate?</span>
              </>
            }
            lede="We build estate by estate across Lekki, Ikate, Ilasan, Orchid and Ajah. Pick yours to see live plans and the exact installation cost."
          />
          <div className="sr-pop mt-12 md:mt-16">
            <CoverageChecker />
          </div>

          <div className="sr edge-top relative mt-10 rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-8 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="display text-2xl font-extrabold md:text-3xl">
                  Want NextGen in{" "}
                  <span className="text-[var(--color-brand-orange)]">your estate?</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)] md:text-base">
                  Estate manager, resident committee, or a business that needs serious fiber — tell
                  us where you are and we&rsquo;ll survey your location for the next build.
                </p>
              </div>
              <a
                href="/contact"
                className="group btn btn-ink"
              >
                Reach out to us <Arrow />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ── BACKBONE — Lagos to the transatlantic cables (cobe globe) ── */}
      <section className="on-dark relative overflow-hidden py-20 md:py-28" aria-labelledby="backbone-title">
        <Container className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-6">
          <div className="sr">
            <p className="eyebrow eyebrow-rule mb-5">The backbone</p>
            <h2 id="backbone-title" className="display text-[2.6rem] leading-[1.02] text-white sm:text-6xl md:text-7xl">
              Lagos, wired <span className="accent-word">to the world.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
              Redundant links into the transatlantic submarine cables with automated failover, a
              nationwide IP/MPLS core, and fibre into Nigeria&rsquo;s major data centres. If one path
              goes quiet, your traffic doesn&rsquo;t.
            </p>
            <ul className="mt-10 border-t border-white/12">
              {backboneLandings.map((l) => (
                <li key={l.cable} className="flex items-baseline justify-between gap-4 border-b border-white/12 py-4">
                  <span className="flex items-center gap-3">
                    <span className="live-dot" aria-hidden="true" />
                    <span className="display text-2xl text-white">{l.cable}</span>
                  </span>
                  <span className="text-right text-xs uppercase tracking-[0.14em] text-white/45">{l.place}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] text-white/35">Illustrative: arcs mark where each cable system lands, not exact routes.</p>
          </div>
          <div className="sr-pop relative mx-auto w-full max-w-[560px]">
            <BackboneGlobe />
            <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-white/30">
              Drag to spin
            </p>
          </div>
        </Container>
      </section>

      <NetworkMap />

      <StatsBand />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
