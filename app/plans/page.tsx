import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { PlansSection } from "@/components/sections/PlansSection";
import { CoverageChecker } from "@/components/CoverageChecker";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BreadcrumbJsonLd, PlansJsonLd } from "@/components/JsonLd";
import { coverageZones } from "@/lib/site";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Plans", href: "/plans" },
];

export const metadata: Metadata = {
  title: "Fiber Plans & Pricing in Lagos — Check Your Estate",
  description:
    "NextGen fiber broadband plans for homes and business in Lagos. See speeds and Naira pricing, check coverage in your estate, and subscribe. 1Gbps internet Nigeria price, GPON fiber Lagos.",
  alternates: { canonical: "/plans" },
};

export default function PlansPage() {
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PlansJsonLd />
      <PageHero
        eyebrow="Plans & coverage · Lagos"
        title="Pick your speed."
        highlight="We'll get you live."
        sub="Transparent fiber plans for homes and business. Check your estate below — where NextGen already has network presence, install can land in as little as 3 days after a site survey."
        crumbs={crumbs}
        image="banner-plans"
      />

      <PlansSection heading="All plans" showAll />

      <section className="py-20">
        <Container>
          <Eyebrow>Coverage check</Eyebrow>
          <h2 className="display mt-4 mb-7 max-w-xl text-3xl font-semibold text-[var(--color-fg)] md:text-4xl">
            Already live in your estate? We connect you faster.
          </h2>
          <CoverageChecker />

          <div className="mt-12">
            <p className="eyebrow mb-4">Currently lit areas</p>
            <div className="flex flex-wrap gap-2.5">
              {coverageZones.map((z) => (
                <span
                  key={z}
                  className="rounded-full border border-[var(--color-hairline)] bg-[var(--color-surface)] px-4 py-2 font-mono text-xs tracking-wide text-[var(--color-fg-muted)]"
                >
                  {z}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-fg-faint)]">
              Don&apos;t see your area? We&apos;re expanding continuously and often have fiber
              closer than you&apos;d expect. Send your address — install is scheduled after a site
              inspection.
            </p>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Let's get your address surveyed."
        sub="Drop your estate and we'll check the nearest fiber and the fastest path to getting you connected."
      />
    </>
  );
}
