import { Container, SectionHead } from "@/components/ui";
import { PageHero } from "@/components/sections/PageHero";
import { CloudPricingTable } from "@/components/sections/CloudPricingTable";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { CloudWaitlistForm } from "@/components/CloudWaitlistForm";
import { BreadcrumbJsonLd, FaqJsonLd, CloudServiceJsonLd, CloudOfferCatalogJsonLd } from "@/components/JsonLd";
import { cloudProducts } from "@/data/cloud-plans";

/**
 * Shared template for every /cloud/* product page — one configurable
 * component (hero, benefit, pricing, waitlist, FAQ, CTA) over five
 * near-duplicate page files. Each route supplies its own copy via props.
 */
export function CloudProductPage({
  slug,
  heroTitle,
  heroGhost,
  benefitTitle,
  whoFor,
  detail,
  faqs,
  ctaTitle,
  ctaLede,
}: {
  slug: string;
  heroTitle: React.ReactNode;
  heroGhost: string;
  /** Short punchy heading (3–6 words) for the "What it is" section — product.benefit is shown as supporting copy, not the heading. */
  benefitTitle: React.ReactNode;
  whoFor: string[];
  detail: string;
  faqs: { q: string; a: string }[];
  ctaTitle: React.ReactNode;
  ctaLede: string;
}) {
  const product = cloudProducts.find((p) => p.slug === slug)!;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Cloud", href: "/cloud" }, { name: product.name, href: product.href }]} />
      <CloudServiceJsonLd slug={slug} />
      <CloudOfferCatalogJsonLd product={product} />
      <FaqJsonLd faqs={faqs} />

      <PageHero eyebrow={`NextGen Cloud · ${product.eyebrow}`} title={heroTitle} lede={product.short} ghost={heroGhost} />

      <section className="relative overflow-hidden py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="What it is" title={benefitTitle} lede={detail} />
          <p className="sr mt-8 max-w-xl text-sm font-semibold text-[var(--color-brand-orange)]">{product.benefit}</p>
          <p className="sr mt-10 flex flex-wrap gap-2.5">
            {whoFor.map((a) => (
              <span key={a} className="display rounded-full border border-[var(--color-hairline)] px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">
                {a}
              </span>
            ))}
          </p>
        </Container>
      </section>

      <section className="wash relative overflow-hidden py-20 md:py-28" id="plans">
        <Container>
          <SectionHead eyebrow="Plans" title={<>Pick a plan.</>} lede={product.comingSoon ? "Join the waitlist — pricing below is what we're planning to launch with." : "Naira billing, no dollar-card limits."} />
          <div className="mt-12 md:mt-16">
            <CloudPricingTable product={product} />
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 md:py-28" id="waitlist">
        <Container className="max-w-2xl">
          <SectionHead eyebrow="Get started" title={<>Tell us what you need.</>} lede="We'll reach out on WhatsApp or email to get you set up." />
          <div className="sr-pop mt-12">
            <CloudWaitlistForm product={slug} />
          </div>
        </Container>
      </section>

      {faqs.length > 0 && (
        <section className="wash relative overflow-hidden py-20 md:py-28" id="faq">
          <Container>
            <SectionHead eyebrow="Common questions" title={<>{product.name} <span className="text-[var(--color-brand-orange)]">FAQ.</span></>} />
            <div className="mt-12 grid gap-3 md:mt-16">
              {faqs.map((f) => (
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
      )}

      <CtaBanner
        title={ctaTitle}
        lede={ctaLede}
        ghost={heroGhost}
        primaryHref={`${product.href}#waitlist`}
        primaryLabel={product.comingSoon ? "Join the waitlist" : "Talk to sales"}
        primaryExternal={false}
        whatsappText={`Hi NextGen, I'm interested in ${product.name}.`}
      />
    </>
  );
}
