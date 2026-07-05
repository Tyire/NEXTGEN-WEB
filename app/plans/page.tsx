import type { Metadata } from "next";
import { Container, Button, Arrow, SectionHead } from "@/components/ui";
import { PageHero } from "@/components/sections/PageHero";
import { PlansGrid } from "@/components/sections/PlansGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { CoverageChecker } from "@/components/CoverageChecker";
import { BreadcrumbJsonLd, PlansJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

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
                What&rsquo;s live <span className="grad-text">where you live.</span>
              </>
            }
            lede="Exact plans, prices and installation cost for your estate — the same data the onboarding portal uses."
          />
          <div className="sr-pop mt-12 md:mt-16">
            <CoverageChecker />
          </div>
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
