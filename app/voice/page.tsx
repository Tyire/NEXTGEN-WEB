import type { Metadata } from "next";
import { Container, Button, Arrow, SectionHead } from "@/components/ui";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { site, services } from "@/lib/site";

const svc = services.find((s) => s.slug === "voice")!;

export const metadata: Metadata = {
  title: "Voice — Business & Home VoIP over Fiber",
  description: svc.short,
  alternates: { canonical: "/voice" },
};

const features = [
  {
    t: "HD voice, zero copper",
    d: "Calls ride your fiber line end-to-end — no crackle, no dropouts, no NITEL-era wiring between you and the person you’re talking to.",
  },
  {
    t: "A real Lagos number",
    d: "Numbers on the 01-640xxxx Lagos range — local presence for your business, reachable from any network.",
  },
  {
    t: "From one line to a call center",
    d: "A single home line, a small office PBX, or hundreds of concurrent channels for support floors — same platform, same clarity.",
  },
];

export default function VoicePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Voice", href: "/voice" }]} />
      <ServiceJsonLd slug="voice" />

      <PageHero
        eyebrow={svc.eyebrow}
        title={
          <>
            Loud &amp; clear.
            <br />
            <span className="text-flow">Every call.</span>
          </>
        }
        lede={svc.benefit + " Crystal-clear calling for homes, SMEs and corporate PBX on the 01-640 Lagos number range."}
        image="banner-voice"
        video="/videos/banner-voice.vid"
        ghost="VOICE"
      >
        <Button href="/contact">
          Get a number <Arrow />
        </Button>
        <a href={`tel:${site.phoneHref}`} className="group inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10">
          Call {site.phoneDisplay}
        </a>
      </PageHero>

      <section className="relative overflow-hidden py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Why fiber voice"
            title={
              <>
                Your number, on <span className="grad-text">01-640.</span>
              </>
            }
            lede="Voice built into the network itself — not an app fighting your bandwidth."
          />
          <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
            {features.map((f, i) => (
              <li
                key={f.t}
                className="sr-pop lift rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-7 md:p-8"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <span aria-hidden="true" className="display grad-text text-3xl font-extrabold">0{i + 1}</span>
                <h3 className="display mt-4 text-xl font-bold">{f.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">{f.d}</p>
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
            Say it
            <br />
            in HD.
          </>
        }
        lede="Tell us how many lines you need — we’ll have you talking on fiber this week."
      />
    </>
  );
}
