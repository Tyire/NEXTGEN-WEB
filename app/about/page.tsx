import type { Metadata } from "next";
import { Container, Button, Arrow, SectionHead } from "@/components/ui";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { site, trustStats } from "@/lib/site";

export const metadata: Metadata = {
  title: "About NextGen Telcoms — Lagos Fiber ISP",
  description:
    "NextGen Telcoms builds and runs its own GPON fiber network across Lagos — homes, estates and enterprises on real fiber, backed by engineers who pick up.",
  alternates: { canonical: "/about" },
};

/* TODO: replace the story copy and licensing details below with verified
   company facts (founding year, NCC license class/number, team size). */
const story = [
  {
    title: "Built, not resold",
    body: "NextGen runs its own GPON fiber and metro core across Lagos. When you subscribe, you're on our glass end-to-end — not a reseller hop away from whoever actually owns the network.",
  },
  {
    title: "Estates first",
    body: "We light estates, not just streets. Working with estate managers from Ikate to Ajah, we bring fiber to the gate and then to every door — so whole communities upgrade at once.",
  },
  {
    title: "Engineers who pick up",
    body: "Support here means a Lagos-based engineer on WhatsApp or the phone — someone who can actually read your line, not a script. It's the single thing customers mention most.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />

      <PageHero
        eyebrow="About us"
        title={
          <>
            The network is
            <br />
            <span className="text-flow">the product.</span>
          </>
        }
        lede="NextGen Telcoms is a Lagos ISP that builds and operates its own fiber — GPON to homes and estates, Metro Ethernet to enterprises, voice on top."
        image="fiber"
        ghost="NEXTGEN"
      >
        <Button href="/contact">
          Work with us <Arrow />
        </Button>
      </PageHero>

      <section className="relative overflow-hidden py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="What we stand on"
            title={
              <>
                Three things we <span className="text-[var(--color-brand-orange)]">refuse to outsource.</span>
              </>
            }
          />
          <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
            {story.map((s, i) => (
              <li
                key={s.title}
                className="sr-pop lift rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-8"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span aria-hidden="true" className="display text-3xl font-extrabold text-[var(--color-brand-orange)]">
                  0{i + 1}
                </span>
                <h3 className="display mt-4 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">{s.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="wash relative overflow-hidden py-20 md:py-24">
        <Container className="relative">
          <SectionHead
            eyebrow="Track record"
            title={
              <>
                Numbers we <span className="text-[var(--color-brand-orange)]">answer for.</span>
              </>
            }
          />
          <dl className="mt-12 grid gap-6 sm:grid-cols-3">
            {trustStats.map((s) => (
              <div key={s.label} className="sr rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-7">
                <dd data-count="" className="display text-4xl font-extrabold text-[var(--color-brand-orange)]">
                  {s.value}
                </dd>
                <dt className="mt-2 text-sm text-[var(--color-fg-muted)]">{s.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-[var(--color-fg-muted)]">
            NextGen Telcoms Ltd operates as a licensed Nigerian telecommunications provider.
            {/* TODO: add NCC license class + number and founding year once confirmed. */}
          </p>
        </Container>
      </section>

      <CtaBanner
        title={
          <>
            Bring us to
            <br />
            your estate.
          </>
        }
        lede="Estate managers and businesses: one conversation starts a survey."
      />
    </>
  );
}
