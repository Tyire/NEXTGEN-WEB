import type { Metadata } from "next";
import { Container, SectionHead } from "@/components/ui";
import { PageHero } from "@/components/sections/PageHero";
import { CloudProductGrid } from "@/components/sections/CloudProductGrid";
import { CloudReasons } from "@/components/sections/CloudReasons";
import { CloudHowItWorks } from "@/components/sections/CloudHowItWorks";
import { ParticleField } from "@/components/sections/ParticleField";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { CloudWaitlistForm } from "@/components/CloudWaitlistForm";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { cloudComingSoonAddOns } from "@/data/cloud-plans";

const cloudFaqs: { q: string; a: string }[] = [
  {
    q: "Is NextGen Cloud live yet?",
    a: "NextGen Cloud is pre-launch. We're onboarding a small pilot group first, with public launch to follow. Join the waitlist and we'll reach out on WhatsApp.",
  },
  {
    q: "Where is it hosted?",
    a: "On NextGen's own network in Lagos, peered at IXPN. Your data stays in Nigeria and billing is in Naira.",
  },
  {
    q: "Can I bundle this with my internet plan?",
    a: "Yes — NextGen Cloud is designed to sit on one bill with your existing NextGen business connectivity.",
  },
  {
    q: "How do I pay?",
    a: "Naira billing via Paystack at launch. No live checkout yet while we're in pilot.",
  },
];

export const metadata: Metadata = {
  title: "NextGen Cloud — Hosting, Email, VPS & More, Hosted in Lagos",
  description:
    "Web hosting, business email, Naira-billed VPS, and done-for-you websites — hosted on NextGen's own Lagos network. Pre-launch, pilot onboarding now.",
  alternates: { canonical: "/cloud" },
};

export default function CloudPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Cloud", href: "/cloud" }]} />
      <FaqJsonLd faqs={cloudFaqs} />

      <PageHero
        eyebrow="NextGen Cloud"
        title={
          <>
            Everything your business
            <br />
            <span className="text-flow">needs online.</span>
          </>
        }
        lede="Hosting, email, VPS and done-for-you websites — hosted on NextGen's own network in Lagos, billed in Naira. Pre-launch: a small pilot group is onboarding now."
        ghost="CLOUD"
      />

      <section className="relative overflow-hidden py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Why NextGen Cloud"
            title={
              <>
                Done for you,
                <br />
                <span className="text-[var(--color-brand-orange)]">not DIY.</span>
              </>
            }
            lede="Set up over WhatsApp by people you can call — not a dashboard you have to learn."
          />
          <div className="mt-12 md:mt-16">
            <CloudReasons />
          </div>
        </Container>
      </section>

      <section className="wash relative overflow-hidden py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="What we offer" title={<>Pick what you need.</>} lede="Each product has its own plans and detail page." />
          <div className="mt-12 md:mt-16">
            <CloudProductGrid />
          </div>
          <p className="sr mt-10 text-sm text-[var(--color-fg-muted)]">
            Also coming soon: {cloudComingSoonAddOns.join(" · ")}.
          </p>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Ambient "network" backdrop — fits the connectivity theme, quiet enough not to fight the content above it. */}
        <ParticleField density={2.5} pull={140} className="opacity-40" />
        <Container className="relative">
          <SectionHead
            eyebrow="How it works"
            title={<>Three steps. No dashboards to learn.</>}
            lede="Tell us what you need, we configure it, you're online — usually inside 48 hours."
          />
          <div className="mt-12 md:mt-16">
            <CloudHowItWorks />
          </div>
        </Container>
      </section>

      <section className="wash relative overflow-hidden py-20 md:py-28" id="waitlist">
        <Container className="max-w-2xl">
          <SectionHead
            eyebrow="Join the waitlist"
            title={<>Be first on NextGen Cloud.</>}
            lede="We're onboarding a small pilot group now, with public launch to follow. Tell us what you need and we'll reach out."
          />
          <div className="sr-pop mt-12">
            <CloudWaitlistForm />
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 md:py-28" id="faq">
        <Container>
          <SectionHead eyebrow="Common questions" title={<>Cloud <span className="text-[var(--color-brand-orange)]">FAQ.</span></>} />
          <div className="mt-12 grid gap-3 md:mt-16">
            {cloudFaqs.map((f) => (
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
                  <p className="border-t border-[var(--color-hairline)] px-6 pb-6 pt-4 text-sm leading-relaxed text-[var(--color-fg-muted)]">{f.a}</p>
                </details>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title={<>Let&rsquo;s get you online.</>}
        lede="Join the NextGen Cloud waitlist — we'll reach out on WhatsApp."
        ghost="CLOUD"
        primaryHref="/cloud#waitlist"
        primaryLabel="Join the waitlist"
        primaryExternal={false}
        whatsappText="Hi NextGen, I'd like to know more about NextGen Cloud."
      />
    </>
  );
}
