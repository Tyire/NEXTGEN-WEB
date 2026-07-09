import type { Metadata } from "next";
import { Container, Button, Arrow, SectionHead } from "@/components/ui";
import { PageHero } from "@/components/sections/PageHero";
import { PlansGrid } from "@/components/sections/PlansGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { CoverageChecker } from "@/components/CoverageChecker";
import { BreadcrumbJsonLd, PlansJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

/** Subset of FAQs relevant to plans — shown inline; full list lives at /faq */
const plansFaqs: { q: string; a: string }[] = [
  {
    q: "Are plans really unlimited?",
    a: "Yes — no data caps. Usage is subject to our Fair Usage Policy, which exists to stop abuse (like commercial resale on a home plan), not to throttle normal streaming, gaming or work.",
  },
  {
    q: "Is there a contract?",
    a: "No. Plans are prepaid month-to-month (or day-to-day on the daily plan). Pause, upgrade or downgrade from the selfcare portal any time.",
  },
  {
    q: "How do I pay?",
    a: "Through the selfcare portal — card or bank transfer. Your service renews automatically when your balance covers the next cycle.",
  },
  {
    q: "Can I change my plan mid-cycle?",
    a: "Upgrades apply immediately with a pro-rated top-up. Downgrades take effect from your next renewal date.",
  },
  {
    q: "Is there an installation fee?",
    a: "Installation pricing depends on your estate and plan — the exact fee is shown next to your estate in the coverage checker before you commit. No surprises on the day.",
  },
  {
    q: "How long does installation take?",
    a: "About 3 days after a successful survey in a lit estate. The engineer confirms your ONT placement, runs the drop fiber, and tests speeds with you before leaving.",
  },
];

export const metadata: Metadata = {
  title: "Plans & Pricing — Unlimited Fiber from ₦1,500/day",
  description:
    "Unlimited GPON fiber plans in Lagos: 25/35/50 Mbps prepaid monthly, ₦1,500/day unlimited, and dedicated business tiers. Real prices from the onboarding portal.",
  alternates: { canonical: "/plans" },
};

export default function PlansPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Plans", href: "/plans" }]} />
      <PlansJsonLd />
      <FaqJsonLd faqs={plansFaqs} />

      <PageHero
        eyebrow="Plans & pricing"
        title={
          <>
            Pick your
            <br />
            <span className="text-flow">speed.</span>
          </>
        }
        lede="Every plan is unlimited data on true fiber — prepaid, no contracts, no fair-usage fine print. Prices mirror the onboarding portal exactly."
        image="banner-plans"
        video="/videos/banner-plans.vid"
        ghost="PLANS"
      >
        <Button href={site.selfcare.onboard} external>
          Start onboarding <Arrow />
        </Button>
      </PageHero>

      <section className="relative overflow-hidden py-20 md:py-28">
        <Container>
          <PlansGrid />
          <p className="sr mt-8 text-sm text-[var(--color-fg-muted)]">
            All residential plans are prepaid and unlimited. Installation is free in several estates
            (some include your first month free) — select your estate below for the exact figure.
          </p>
        </Container>
      </section>

      <section className="wash relative overflow-hidden py-20 md:py-28" id="coverage">
        <span aria-hidden="true" className="ghost absolute -top-3 right-0 text-[18vw] opacity-50 md:text-[10rem]">
          ESTATE
        </span>
        <Container className="relative">
          <SectionHead
            eyebrow="Your estate"
            title={
              <>
                What&rsquo;s live <span className="text-[var(--color-brand-orange)]">where you live.</span>
              </>
            }
            lede="Exact plans, prices and installation cost for your estate — the same data the onboarding portal uses."
          />
          <div className="sr-pop mt-12 md:mt-16">
            <CoverageChecker />
          </div>
        </Container>
      </section>

      <section className="wash relative overflow-hidden py-20 md:py-28" id="faq">
        <Container>
          <SectionHead
            eyebrow="Common questions"
            title={
              <>
                Plans <span className="text-[var(--color-brand-orange)]">FAQ.</span>
              </>
            }
            lede="The questions every new subscriber asks before signing up."
          />
          <div className="mt-12 grid gap-3 md:mt-16">
            {plansFaqs.map((f) => (
              <div key={f.q} className="sr">
                <details className="group rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="display text-base font-bold">{f.q}</span>
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[var(--color-fg-faint)] transition-transform duration-300 ease-[var(--ease-out)] group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3 6 5 5 5-5" />
                    </svg>
                  </summary>
                  <p className="border-t border-[var(--color-hairline)] px-6 pb-6 pt-4 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    {f.a}
                  </p>
                </details>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-[var(--color-fg-muted)]">
            More questions?{" "}
            <a href="/faq" className="font-semibold text-[var(--color-brand-orange)] hover:underline">
              See the full FAQ →
            </a>
          </p>
        </Container>
      </section>

      <CtaBanner
        title={
          <>
            Three days from
            <br />
            &ldquo;yes&rdquo; to streaming.
          </>
        }
        lede="Onboard online, we survey, we splice, you stream."
      />
    </>
  );
}
