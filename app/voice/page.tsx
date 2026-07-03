import type { Metadata } from "next";
import { Container, Button, Arrow, Eyebrow } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HumanMoment } from "@/components/sections/HumanMoment";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Voice", href: "/voice" },
];

export const metadata: Metadata = {
  title: "Business & Home VoIP in Nigeria — Crystal-Clear Calling",
  description:
    "HD VoIP for homes and businesses in Lagos on the 01-640xxxx number range. Calls ride your NextGen fiber line — no separate copper, no dropouts. Hosted PBX and call-center ready.",
  alternates: { canonical: "/voice" },
};

const home = [
  "A proper Lagos landline on the 01-640xxxx range",
  "HD voice quality over your existing fiber line",
  "Keep calling during power and copper outages",
  "One simple bill alongside your broadband",
];

const business = [
  "Hosted PBX — extensions, IVR menus and call routing",
  "Scale from a single line to a full call center",
  "Number ranges and DID blocks for your team",
  "SLA-backed voice on carrier-grade infrastructure",
];

export default function VoicePage() {
  return (
    <>
      <ServiceJsonLd slug="voice" />
      <BreadcrumbJsonLd items={crumbs} />
      <PageHero
        eyebrow="VoIP · Voice"
        title="Calls that ride your"
        highlight="fiber."
        sub="Crystal-clear voice for home and business on the 01-640xxxx Lagos number range. Because it rides your NextGen fiber, there's no separate copper line to fail — just HD calls that stay up."
        crumbs={crumbs}
        image="banner-voice"
      />

      <HumanMoment
        slot="voice"
        side="left"
        eyebrow="Calls that just work"
        title="Hear every word — at home or at the desk."
        body="Because your line rides NextGen fiber, there's no copper to crackle or drop. HD voice for family calls and a PBX your whole team can scale into."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <VoiceCard tag="For homes" title="A landline that finally works" items={home} />
            <VoiceCard tag="For business" title="Voice infrastructure that scales" items={business} featured />
          </div>

          <div className="mt-16 grid gap-6 rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-8 sm:grid-cols-3 md:p-10">
            <Stat value="01-640" label="Lagos number range" />
            <Stat value="HD" label="Wideband voice codec" />
            <Stat value="1 line → ∞" label="Scales to call-center" />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/contact">Get a voice line <Arrow /></Button>
            <Button href={`tel:${site.phoneHref}`} variant="outline">Call {site.phoneDisplay}</Button>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Put your business on a line that doesn't drop."
        sub="Bundle VoIP with NextGen fiber and run home or office calls over one reliable connection."
      />
    </>
  );
}

function VoiceCard({
  tag,
  title,
  items,
  featured,
}: {
  tag: string;
  title: string;
  items: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-[var(--radius)] border p-8 ${
        featured
          ? "border-[var(--color-brand-orange)]/40 bg-[color-mix(in_srgb,var(--color-brand-orange)_6%,var(--color-surface))]"
          : "border-[var(--color-hairline)] bg-[var(--color-surface)]"
      }`}
    >
      <Eyebrow>{tag}</Eyebrow>
      <h2 className="display mt-4 text-2xl font-semibold text-[var(--color-fg)]">{title}</h2>
      <ul className="mt-6 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 stroke-[var(--color-success)]" fill="none" strokeWidth="2">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="display brand-text text-3xl font-bold">{value}</div>
      <div className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--color-fg-faint)]">{label}</div>
    </div>
  );
}
