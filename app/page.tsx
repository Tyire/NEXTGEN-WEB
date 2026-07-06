import { Container, Button, Arrow, SectionHead } from "@/components/ui";
import { BlobVideo } from "@/components/BlobVideo";
import { PlansGrid } from "@/components/sections/PlansGrid";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsBand } from "@/components/sections/StatsBand";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { CoverageChecker } from "@/components/CoverageChecker";
import { site } from "@/lib/site";

const chips = ["↑↓ Symmetrical", "STM-16 capable", "Low-latency core"];

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────
          The gradient/blob backdrop below is the DESIGNED hero — the video
          fades in over it when ready. Slow phone, dead JS, reduced motion:
          the hero still looks intentional, never broken. */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#081020] md:min-h-[92vh]">
        {/* designed fallback backdrop */}
        <div aria-hidden="true" className="absolute inset-0 -z-30">
          <div className="blob drift -left-24 -top-24 h-[480px] w-[480px]" style={{ "--blob-c": "rgba(255,31,77,0.35)" } as React.CSSProperties} />
          <div className="blob -bottom-32 right-[-10%] h-[520px] w-[520px]" style={{ "--blob-c": "rgba(255,167,15,0.28)", animationDelay: "-7s" } as React.CSSProperties} />
          <div className="blob left-1/3 top-1/3 h-[420px] w-[640px]" style={{ "--blob-c": "rgba(255,107,44,0.22)" } as React.CSSProperties} />
        </div>
        <BlobVideo
          src="/videos/hero-video.vid"
          mobileSrc="/videos/hero-mobile.vid"
          startAt={4}
          data-parallax=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        {/* left scrim for copy legibility over the bright clip */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(6,12,24,0.85)_10%,rgba(6,12,24,0.45)_55%,transparent_85%)]" />
        <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

        <Container className="relative pb-24 pt-32 md:pb-28 md:pt-36">
          <p className="rise eyebrow" style={{ "--color-fg-faint": "rgba(255,255,255,0.75)" } as React.CSSProperties}>
            GPON fiber — Lekki · Ikate · Ilasan · Ajah
          </p>
          <h1 className="display rise hero-pop mt-5 max-w-4xl text-[2.9rem] font-extrabold leading-[1.02] text-white sm:text-6xl md:text-7xl lg:text-[5.2rem]" style={{ animationDelay: "0.08s" }}>
            No buffering.
            <br />
            No caps.
            <br />
            <span className="text-flow">No stories.</span>
          </h1>
          <p className="rise hero-pop mt-7 max-w-xl text-base leading-relaxed text-white/90 md:text-lg" style={{ animationDelay: "0.18s" }}>
            Unlimited fiber for Lagos homes and businesses — stream, work and game at full speed.
            Installed in 3 days, backed by real engineers who actually pick up.
          </p>
          <div className="rise mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.28s" }}>
            <Button href={site.selfcare.onboard} external>
              Check Coverage <Arrow />
            </Button>
            <a
              href="/plans"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              See fiber plans <Arrow />
            </a>
          </div>
          <ul className="rise mt-12 flex flex-wrap gap-2.5" style={{ animationDelay: "0.38s" }} aria-label="Network highlights">
            {chips.map((c) => (
              <li key={c} className="display rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/90">
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── PLANS ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28" id="plans">
        <span aria-hidden="true" className="ghost absolute right-0 top-4 text-[20vw] opacity-60 md:text-[11rem]">
          SPEED
        </span>
        <Container className="relative">
          <SectionHead
            eyebrow="Fiber plans"
            title={
              <>
                Unlimited. <span className="grad-text">Prepaid.</span>
                <br />
                No contracts.
              </>
            }
            lede="Real prices from our onboarding portal — what you see is what you pay. Every plan is unlimited data on true GPON fiber."
          />
          <div className="mt-12 md:mt-16">
            <PlansGrid />
          </div>
          <p className="sr mt-8 text-sm text-[var(--color-fg-muted)]">
            Installation fees and first-month-free offers vary by estate —{" "}
            <a href="/plans" className="font-semibold text-[var(--color-brand-orange)] underline underline-offset-2 hover:text-[var(--color-brand-red)]">
              check yours below
            </a>
            .
          </p>
        </Container>
      </section>

      {/* ── COVERAGE ───────────────────────────────────────────────────── */}
      <section className="wash relative overflow-hidden py-20 md:py-28" id="coverage">
        <span aria-hidden="true" className="ghost absolute -top-3 left-0 text-[20vw] opacity-50 md:text-[11rem]">
          LIVE IN
        </span>
        <Container className="relative">
          <SectionHead
            eyebrow="Coverage"
            title={
              <>
                Already lit in <span className="grad-text">your estate?</span>
              </>
            }
            lede="We build estate by estate across Lekki, Ikate, Ilasan, Orchid and Ajah. Pick yours to see live plans and the exact installation cost."
          />
          <div className="sr-pop mt-12 md:mt-16">
            <CoverageChecker />
          </div>
        </Container>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="What we do"
            title={
              <>
                One network.
                <br />
                <span className="grad-text">Three superpowers.</span>
              </>
            }
            lede="Home fiber, business voice, and carrier-grade transport — all running on infrastructure we own and operate ourselves."
          />
          <div className="mt-12 md:mt-16">
            <ServicesGrid />
          </div>
        </Container>
      </section>

      <StatsBand />
      <CtaBanner />
    </>
  );
}
