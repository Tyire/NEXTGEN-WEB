import type { Metadata } from "next";
import { Container, Button, Arrow, Eyebrow } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HumanMoment } from "@/components/sections/HumanMoment";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { services } from "@/lib/site";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Enterprise", href: "/enterprise" },
];

export const metadata: Metadata = {
  title: "Metro Ethernet & Custom Network Solutions in Nigeria",
  description:
    "Metro Ethernet, IP/MPLS and tailor-made enterprise connectivity in Lagos. HQ-to-branch data transport, dedicated leased lines and SLA-backed networks engineered to your topology.",
  alternates: { canonical: "/enterprise" },
};

const solutions = [
  { k: "Metro Ethernet", d: "Layer-2 transport across the metro at scale — clean, deterministic bandwidth between your sites." },
  { k: "IP / MPLS", d: "Traffic-engineered, prioritized routing with QoS for voice, video and mission-critical apps." },
  { k: "HQ-to-branch", d: "Stitch every office, warehouse and store into one private, high-availability network." },
  { k: "Dedicated leased lines", d: "Uncontended, symmetrical capacity with guaranteed throughput and tight SLAs." },
];

const steps = [
  { n: "01", t: "Discovery", d: "We map your sites, traffic and growth plans." },
  { n: "02", t: "Design", d: "Engineers spec topology, capacity and redundancy." },
  { n: "03", t: "Survey & build", d: "Site survey, fiber build and staged cutover." },
  { n: "04", t: "Manage", d: "Monitored 24/7 with SLA-backed support." },
];

export default function EnterprisePage() {
  const s = services.find((x) => x.slug === "enterprise")!;
  return (
    <>
      <ServiceJsonLd slug="enterprise" />
      <BreadcrumbJsonLd items={crumbs} />
      <PageHero
        eyebrow="Metro Ethernet · Custom Networks"
        title="Enterprise connectivity,"
        highlight="shaped to fit."
        sub="IP/MPLS Metro Ethernet and custom network solutions for multi-site businesses, banks, government and carriers. HQ-to-branch data transport built around your topology — not a one-size box."
        crumbs={crumbs}
        image="banner-enterprise"
      />

      <HumanMoment
        slot="enterprise"
        eyebrow="Built around your teams"
        title="Every site, every office, always on."
        body="From HQ to the smallest branch, your people stay on one network — with the SLAs and round-the-clock monitoring that keep operations running."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-hairline)] md:grid-cols-2">
            {solutions.map((x) => (
              <div key={x.k} className="bg-[var(--color-ink)] p-8">
                <h2 className="display text-xl font-semibold text-[var(--color-fg)]">{x.k}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">{x.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--color-hairline)] bg-[var(--color-void)] py-20">
        <Container>
          <Eyebrow>How we deliver</Eyebrow>
          <h2 className="display mt-4 mb-12 max-w-xl text-3xl font-semibold text-[var(--color-fg)] md:text-4xl">
            From first survey to 24/7 managed.
          </h2>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((st) => (
              <li key={st.n} className="rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-ink)] p-6">
                <span className="display brand-text text-3xl font-bold">{st.n}</span>
                <h3 className="display mt-3 text-lg font-semibold text-[var(--color-fg)]">{st.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">{st.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div>
                <Eyebrow>Built for</Eyebrow>
                <h2 className="display mt-4 text-2xl font-semibold text-[var(--color-fg)] md:text-3xl">
                  Networks that can&apos;t go down.
                </h2>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {s.audience.map((a) => (
                    <span key={a} className="rounded-full border border-[var(--color-hairline)] bg-[var(--color-ink)] px-4 py-2 font-mono text-xs tracking-wide text-[var(--color-fg-muted)]">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button href="/contact">Scope your network <Arrow /></Button>
                <Button href="/plans" variant="outline">Check metro coverage</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Let's design the network your business actually needs."
        sub="Tell us your sites and traffic. Our engineers come back with a topology, capacity plan and SLA."
      />
    </>
  );
}
