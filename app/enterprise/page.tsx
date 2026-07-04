import type { Metadata } from "next";
import { Container, Button, Arrow, SectionHead } from "@/components/ui";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { services } from "@/lib/site";

const svc = services.find((s) => s.slug === "enterprise")!;

export const metadata: Metadata = {
  title: "Enterprise — Metro Ethernet & Custom Networks",
  description: svc.short,
  alternates: { canonical: "/enterprise" },
};

const offers = [
  {
    t: "Metro Ethernet transport",
    d: "IP/MPLS point-to-point and point-to-multipoint links between HQ, branches and data centers — deterministic performance, not best-effort internet.",
  },
  {
    t: "Dedicated internet access",
    d: "Symmetrical, uncontended bandwidth with a real SLA. Your 100 Mbps is your 100 Mbps, at 2am and at 2pm.",
  },
  {
    t: "Engineered to your topology",
    d: "Redundant paths, diverse entries, custom hand-offs — we design around your architecture, not the other way round.",
  },
];

export default function EnterprisePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Enterprise", href: "/enterprise" }]} />
      <ServiceJsonLd slug="enterprise" />

      <PageHero
        eyebrow={svc.eyebrow}
        title={
          <>
            Carrier-grade.
            <br />
            <span className="text-flow">Custom-built.</span>
          </>
        }
        lede={svc.short + " Backed by a 99.9% uptime SLA and engineers who answer at 2am."}
        image="banner-enterprise"
        ghost="METRO"
      >
        <Button href="/contact">
          Talk to sales <Arrow />
        </Button>
      </PageHero>

      <section className="relative overflow-hidden py-20 md:py-28">
        <span aria-hidden="true" className="ghost absolute right-0 top-2 text-[18vw] opacity-50 md:text-[10rem]">
          99.9%
        </span>
        <Container className="relative">
          <SectionHead
            eyebrow="What we build"
            title={
              <>
                Networks with a <span className="grad-text">pulse.</span>
              </>
            }
            lede="For multi-site enterprise, banks and fintech, government, ISPs and carriers."
          />
          <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
            {offers.map((o, i) => (
              <li
                key={o.t}
                className="sr-pop lift rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-7 md:p-8"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <span aria-hidden="true" className="display grad-text text-3xl font-extrabold">0{i + 1}</span>
                <h3 className="display mt-4 text-xl font-bold">{o.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">{o.d}</p>
              </li>
            ))}
          </ul>
          <p className="sr mt-10 flex flex-wrap gap-2.5">
            {svc.audience.map((a) => (
              <span key={a} className="display rounded-full border border-[var(--color-hairline)] px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">
                {a}
              </span>
            ))}
          </p>
        </Container>
      </section>

      <CtaBanner
        title={
          <>
            Let&rsquo;s scope
            <br />
            your link.
          </>
        }
        lede="Site survey, design and quote — usually inside a week."
      />
    </>
  );
}
