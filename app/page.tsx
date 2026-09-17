import { Container, Button, Arrow, SectionHead } from "@/components/ui";
import { BlobVideo } from "@/components/BlobVideo";
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
    body: "Unlimited fiber plans for streaming, remote work and smart homes — prepaid, no contract.",
    action: "View home plans",
    href: "/plans",
  },
  {
    tag: "For business",
    body: "Dedicated connectivity, SLA-backed uptime, and enterprise-grade support across Lagos.",
    action: "Talk to enterprise sales",
    href: "/enterprise",
  },
];

// "Why NextGen" numbered features (from Kimi's design)
const whyFeatures = [
  {
    n: "01",
    title: "Unlimited Data",
    body: "No caps, no throttling, no hidden limits. Stream, download and work without watching your data allowance.",
  },
  {
    n: "02",
    title: "99.9% Uptime",
    body: "Fully redundant network with automated failover. Your connection stays up when it matters most.",
  },
  {
    n: "03",
    title: "Symmetrical Speeds",
    body: "Upload at the same speed you download. Critical for video calls, cloud backups and remote teams.",
  },
  {
    n: "04",
    title: "24/7 Support",
    body: "Real engineers in Lagos on WhatsApp and the phone — not a ticket queue. Most issues resolve without a visit.",
  },
  {
    n: "05",
    title: "3-Day Installation",
    body: "Survey to streaming in about three days in every lit estate. No wait lists, no guesswork.",
  },
  {
    n: "06",
    title: "Direct Backbone",
    body: "Our own metro core connected to Equiano and MainOne submarine cables — not resold capacity.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#0d0508] md:min-h-[92vh]">
        {/* Fallback blob backdrop — shows while video loads / JS off */}
        <div aria-hidden="true" className="absolute inset-0 -z-30">
          <div className="blob drift -left-24 -top-24 h-[480px] w-[480px]" style={{ "--blob-c": "rgba(255,31,77,0.35)" } as React.CSSProperties} />
          <div className="blob -bottom-32 right-[-10%] h-[520px] w-[520px]" style={{ "--blob-c": "rgba(255,167,15,0.28)", animationDelay: "-7s" } as React.CSSProperties} />
          <div className="blob left-1/3 top-1/3 h-[420px] w-[640px]" style={{ "--blob-c": "rgba(255,107,44,0.22)" } as React.CSSProperties} />
        </div>

        <BlobVideo
          src="/videos/hero-video.vid"
          mobileSrc="/videos/hero-mobile.vid"
          startAt={4}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        {/* Scrim — legibility over video */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(10,3,7,0.88)_0%,rgba(10,3,7,0.55)_55%,transparent_85%)]" />
        {/* Bottom fade to page bg */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 -z-10 h-40 bg-[linear-gradient(to_bottom,transparent,#0d0508)]" />
        <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

        <Container className="relative pb-28 pt-32 md:pb-32 md:pt-40">
          <p className="rise eyebrow" style={{ "--color-fg-faint": "rgba(255,255,255,0.7)" } as React.CSSProperties}>
            GPON fiber · Lekki · Ikate · Ilasan · Ajah
          </p>

          <h1
            className="display rise hero-pop mt-5 max-w-[820px] text-[2.8rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl lg:text-[4.8rem]"
            style={{ animationDelay: "0.08s", textShadow: "0 2px 40px rgba(10,3,7,0.6)" }}
          >
            Fibre for Homes.
            <br />
            Resilient Connectivity
            <br />
            <span className="text-flow">for Business.</span>
          </h1>

          <p className="rise hero-pop mt-7 max-w-[600px] text-base leading-relaxed text-white/80 md:text-xl" style={{ animationDelay: "0.18s" }}>
            Truly unlimited fiber broadband, dedicated enterprise links, voice and data
            infrastructure across Lagos — backed by a 24/7 operations team.
          </p>

          {/* CTAs */}
          <div className="rise mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.28s" }}>
            <Button href={site.selfcare.onboard} external>
              Check Coverage &amp; Plans <Arrow />
            </Button>
            <a
              href="/enterprise"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Enterprise solutions <Arrow />
            </a>
          </div>

          {/* Proof point chips */}
          <ul className="rise mt-12 flex flex-wrap gap-3" style={{ animationDelay: "0.36s" }} aria-label="Network highlights">
            {proofPoints.map((p) => (
              <li
                key={p.label}
                className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-sm"
              >
                <p className="display text-2xl font-bold text-white">{p.value}</p>
                <p className="mt-1 text-xs text-white/60">{p.label}</p>
              </li>
            ))}
          </ul>

          {/* Audience split cards (Kimi's pattern) */}
          <div className="rise mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:max-w-[720px]" style={{ animationDelay: "0.44s" }}>
            {audienceCards.map((c) => (
              <a
                key={c.tag}
                href={c.href}
                className="group rounded-2xl border border-white/10 bg-black/28 px-5 py-5 backdrop-blur-sm transition-all duration-300 hover:border-[rgba(255,107,44,0.4)] hover:bg-black/40"
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/45">{c.tag}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{c.body}</p>
                <p className="mt-4 text-sm font-semibold text-[var(--color-brand-amber)] transition-colors group-hover:text-[#ffd08a]">
                  {c.action} →
                </p>
              </a>
            ))}
          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60" aria-hidden="true">
          <div className="relative h-8 w-px bg-white/30">
            <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--color-brand-orange)] animate-[scroll-dot_1.6s_ease-in-out_infinite]" />
          </div>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/40">Scroll</span>
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

      {/* ── WHY NEXTGEN — Kimi's numbered grid, nextgen-web styling ─── */}
      <section className="relative overflow-hidden bg-[var(--color-ink)] py-20 md:py-28">
        <span aria-hidden="true" className="ghost absolute -top-4 left-0 text-[18vw] opacity-30 md:text-[10rem]">
          WHY
        </span>
        <Container className="relative">
          <SectionHead
            eyebrow="The NextGen difference"
            title={
              <>
                Six reasons people
                <br />
                <span className="text-[var(--color-brand-orange)]">don&rsquo;t switch back.</span>
              </>
            }
          />
          <dl className="mt-12 grid gap-x-10 gap-y-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {whyFeatures.map((f, i) => (
              <div
                key={f.n}
                className="sr-pop"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <span className="display block text-3xl font-extrabold text-[var(--color-brand-orange)] opacity-60">
                  {f.n}
                </span>
                <dt className="display mt-3 text-lg font-bold">{f.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">{f.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── PURPOSE — mission & vision anchor the six reasons above ── */}
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
                className="group grad-sunset inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_-12px_rgba(255,60,44,0.6)] transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Reach out to us <Arrow />
              </a>
            </div>
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
