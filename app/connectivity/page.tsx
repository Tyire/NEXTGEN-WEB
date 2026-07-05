import type { Metadata } from "next";
import { Container, Button, Arrow, SectionHead } from "@/components/ui";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { site, speedTiers, services } from "@/lib/site";

const svc = services.find((s) => s.slug === "connectivity")!;

export const metadata: Metadata = {
  title: "Fiber Internet — GPON Broadband in Lagos",
  description: svc.short,
  alternates: { canonical: "/connectivity" },
};

export default function ConnectivityPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Fiber Internet", href: "/connectivity" }]} />
      <ServiceJsonLd slug="connectivity" />

      <PageHero
        eyebrow={svc.eyebrow}
        title={
          <>
            Fiber that hits
            <br />
            <span className="text-flow">different.</span>
          </>
        }
        lede="True GPON fiber to your door — symmetrical speeds, low latency, and bandwidth that doesn't fold at 9pm. From 2 Mbps starter lines to 2.5 Gbps carrier tiers."
        image="banner-connectivity"
        video="/videos/banner-connectivity.vid"
        ghost="FIBER"
      >
        <Button href={site.selfcare.onboard} external>
          Check Coverage <Arrow />
        </Button>
        <a href="/plans" className="group inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10">
          See plans <Arrow />
        </a>
      </PageHero>

      {/* Speed tiers */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Speed tiers"
            title={
              <>
                From starter to <span className="grad-text">STM-16.</span>
              </>
            }
            lede="One network, every scale — the same fiber that feeds a studio apartment can feed a data center."
          />
          <ul className="mt-12 grid gap-4 md:mt-16">
            {speedTiers.map((t, i) => (
              <li
                key={t.name}
                className={`sr lift flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius)] border p-6 md:p-7 ${
                  "featured" in t && t.featured
                    ? "grad-border bg-[var(--color-surface)]"
                    : "border-[var(--color-hairline)] bg-[var(--color-surface)]"
                }`}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="flex items-center gap-5">
                  <span aria-hidden="true" className="display grad-text w-12 text-3xl font-extrabold">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="display text-lg font-bold">{t.name}</h3>
                    <p className="mt-1 text-sm text-[var(--color-fg-muted)]">{t.use}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="display text-xl font-extrabold md:text-2xl">{t.speed}</span>
                  <span className="display rounded-full border border-[var(--color-hairline)] px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">
                    {t.tier}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Why GPON */}
      <section className="wash relative overflow-hidden py-20 md:py-28">
        <span aria-hidden="true" className="ghost absolute -top-3 right-0 text-[18vw] opacity-50 md:text-[10rem]">
          GPON
        </span>
        <Container className="relative grid items-center gap-12 lg:grid-cols-2">
          <div className="sr-pop relative order-2 lg:order-1">
            <picture>
              <source type="image/avif" srcSet="/images/people/fiber-640.avif 640w, /images/people/fiber-1024.avif 1024w" sizes="(min-width:1024px) 45vw, 92vw" />
              <source type="image/webp" srcSet="/images/people/fiber-640.webp 640w, /images/people/fiber-1024.webp 1024w" sizes="(min-width:1024px) 45vw, 92vw" />
              <img
                src="/images/people/fiber-1024.webp"
                alt="Fiber optic strands lit up"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-[var(--radius)] border border-[var(--color-hairline)] object-cover shadow-[var(--shadow-pop)]"
              />
            </picture>
          </div>
          <div className="sr order-1 lg:order-2">
            <SectionHead
              eyebrow="Why it's different"
              title={
                <>
                  Glass to your door, <span className="grad-text">not copper.</span>
                </>
              }
            />
            <ul className="mt-8 grid gap-5 text-base leading-relaxed text-[var(--color-fg-muted)]">
              <li><strong className="text-[var(--color-fg)]">Symmetrical up and down.</strong> Uploads matter — video calls, cloud backups, content. GPON gives you both directions at full speed.</li>
              <li><strong className="text-[var(--color-fg)]">Low latency, steady at peak.</strong> Our own core network, engineered headroom — no evening congestion collapse.</li>
              <li><strong className="text-[var(--color-fg)]">For {svc.audience.join(", ").toLowerCase()}.</strong> {svc.benefit}</li>
            </ul>
          </div>
        </Container>
      </section>

      <CtaBanner
        title={
          <>
            Your estate
            <br />
            could be next.
          </>
        }
        lede="Check coverage now — if we're lit in your estate, you're 3 days from full-speed fiber."
      />
    </>
  );
}
