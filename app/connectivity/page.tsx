import type { Metadata } from "next";
import { Container, Button, Arrow, Eyebrow } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HumanMoment } from "@/components/sections/HumanMoment";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { speedTiers, services } from "@/lib/site";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Fiber Internet", href: "/connectivity" },
];

export const metadata: Metadata = {
  title: "GPON Fiber Internet in Lagos — 2 Mbps to 2.5 Gbps",
  description:
    "GPON / FTTx fiber broadband in Lagos and across Nigeria. Symmetrical, low-latency dedicated bandwidth from 2 Mbps up to 2.5 Gbps (STM-16) for homes, enterprise, education and carriers.",
  alternates: { canonical: "/connectivity" },
};

const facts = [
  { k: "GPON / FTTx", d: "Passive optical fiber run all the way to your premises — not copper from a roadside cabinet." },
  { k: "Symmetrical", d: "Equal upload and download. Backups, video calls and live uploads stop being the bottleneck." },
  { k: "Dedicated options", d: "From contended home plans to fully dedicated business bandwidth with guaranteed throughput." },
  { k: "STM-16 capable", d: "Scale a single delivery up to 2.5 Gbps for data centers, campuses and content providers." },
];

export default function ConnectivityPage() {
  const s = services.find((x) => x.slug === "connectivity")!;
  return (
    <>
      <ServiceJsonLd slug="connectivity" />
      <BreadcrumbJsonLd items={crumbs} />
      <PageHero
        eyebrow="GPON / FTTx Fiber"
        title="Fiber broadband for Nigeria,"
        highlight="done right."
        sub="GPON fiber for homes, businesses, schools and carriers across Lagos. Dedicated bandwidth from 2 Mbps to 2.5 Gbps — symmetrical, low-latency, and steady when everyone else slows down."
        crumbs={crumbs}
        image="banner-connectivity"
      />

      <HumanMoment
        slot="fiber"
        eyebrow="Real homes, real speed"
        title="Streaming, gaming, calls — all at once."
        body="GPON fiber to the premises means the whole household can stream in 4K, hop on video calls and game online at the same time, even at 8pm when everyone's online."
      />

      {/* Facts grid */}
      <section className="py-20">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-hairline)] md:grid-cols-2">
            {facts.map((f) => (
              <div key={f.k} className="bg-[var(--color-ink)] p-8">
                <h2 className="display text-xl font-semibold text-[var(--color-fg)]">{f.k}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">{f.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Speed tiers table */}
      <section className="border-y border-[var(--color-hairline)] bg-[var(--color-void)] py-20">
        <Container>
          <div className="mb-10 max-w-xl">
            <Eyebrow>Speed tiers</Eyebrow>
            <h2 className="display mt-4 text-3xl font-semibold text-[var(--color-fg)] md:text-4xl">
              Pick the lane that fits.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-fg-muted)]">
              From a single home line to carrier-grade STM delivery. Final pricing depends on your
              location and a quick site survey.
            </p>
          </div>

          <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--color-hairline)]">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[var(--color-surface)] font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-fg-faint)]">
                  <th className="px-5 py-4 font-medium">Plan</th>
                  <th className="px-5 py-4 font-medium">Speed</th>
                  <th className="hidden px-5 py-4 font-medium sm:table-cell">Best for</th>
                  <th className="px-5 py-4 font-medium">Segment</th>
                </tr>
              </thead>
              <tbody>
                {speedTiers.map((t) => (
                  <tr
                    key={t.name}
                    className={`border-t border-[var(--color-hairline)] ${
                      "featured" in t && t.featured ? "bg-[color-mix(in_srgb,var(--color-brand-orange)_8%,transparent)]" : ""
                    }`}
                  >
                    <td className="px-5 py-5">
                      <span className="font-semibold text-[var(--color-fg)]">{t.name}</span>
                      {"featured" in t && t.featured && (
                        <span className="ml-2 rounded-full brand-gradient px-2 py-0.5 align-middle font-mono text-[0.6rem] font-bold uppercase text-[#180a04]">
                          Popular
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-5 font-display text-lg font-semibold brand-text">{t.speed}</td>
                    <td className="hidden px-5 py-5 text-sm text-[var(--color-fg-muted)] sm:table-cell">{t.use}</td>
                    <td className="px-5 py-5">
                      <span className="rounded-full border border-[var(--color-hairline)] px-3 py-1 font-mono text-xs capitalize text-[var(--color-fg-muted)]">
                        {t.tier}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/plans">Check availability <Arrow /></Button>
            <Button href="/contact" variant="outline">Talk to sales</Button>
          </div>
          <p className="mt-6 font-mono text-xs text-[var(--color-fg-faint)]">
            Audience: {s.audience.join(" · ")}
          </p>
        </Container>
      </section>

      <CtaBanner
        title="See if GPON fiber is live at your address."
        sub="Coverage check takes 30 seconds. Where NextGen already has estate presence, install can land in as little as 3 days after a site survey."
      />
    </>
  );
}
