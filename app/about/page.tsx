import type { Metadata } from "next";
import { Container, Button, Arrow, SectionHead } from "@/components/ui";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { site, trustStats, coverageZones, purpose } from "@/lib/site";

export const metadata: Metadata = {
  title: "About NextGen Telecoms — The NextGen Telecom Company",
  description:
    "We're changing the way leading brands and consumers communicate. GPON fiber, Metro Ethernet, VoIP — built and owned by NextGen across Lagos and Nigeria.",
  alternates: { canonical: "/about" },
};

const pillars = [
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
        eyebrow="About NextGen"
        title={
          <>
            The NextGen
            <br />
            <span className="text-flow">Telecom Company.</span>
          </>
        }
        lede="We're changing the way leading brands and consumers communicate. A forward-thinking telecoms company fueled by our commitment to addressing the specific needs of our customers."
        image="fiber"
        ghost="NEXTGEN"
      >
        <Button href="/contact">
          Work with us <Arrow />
        </Button>
        <a
          href="/careers"
          className="group inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
        >
          Join our team <Arrow />
        </a>
      </PageHero>

      {/* ── WHO WE ARE ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="sr">
            <p className="eyebrow mb-4">Who we are</p>
            <h2 className="display text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Fiber that keeps up{" "}
              <span className="text-[var(--color-brand-orange)]">with Nigeria.</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-fg-muted)]">
              <p>
                We are a forward-thinking telecoms company fueled by our commitment to addressing the
                specific needs of our customers. Our technological solutions are entirely
                customer-driven.
              </p>
              <p>
                Our broadband services offer high-speed, highly reliable, and cost-effective
                connectivity options tailored for various sectors, including households, enterprise
                businesses, educational institutions, carriers, cloud service providers, and content
                companies.
              </p>
            </div>
            <ul className="mt-8 grid gap-3">
              {pillars.map((p, i) => (
                <li key={p.title} className="sr flex gap-4" style={{ animationDelay: `${i * 0.07}s` }}>
                  <span className="display mt-0.5 shrink-0 text-xl font-extrabold text-[var(--color-brand-orange)]">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="display font-bold">{p.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="sr-pop flex flex-col justify-center gap-5">
            {trustStats.map((s) => (
              <div
                key={s.label}
                className="lift rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-7"
              >
                <p data-count="" className="display text-5xl font-extrabold text-[var(--color-brand-orange)]">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── MISSION & VISION ────────────────────────────────────── */}
      <section className="wash relative overflow-hidden py-20 md:py-28">
        <span aria-hidden="true" className="ghost absolute -top-4 right-0 text-[18vw] opacity-40 md:text-[10rem]">
          PURPOSE
        </span>
        <Container className="relative grid gap-10 md:grid-cols-2">
          {/* Mission */}
          <div className="sr-pop edge-top rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-8 md:p-10">
            <span className="display block text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-brand-orange)]">
              Mission Statement
            </span>
            <h2 className="display mt-4 text-2xl font-extrabold md:text-3xl">
              {purpose.mission.headline}
            </h2>
            {purpose.mission.lines.map((line, i) => (
              <p key={i} className={`${i === 0 ? "mt-4" : "mt-3"} text-sm leading-relaxed text-[var(--color-fg-muted)]`}>
                {line}
              </p>
            ))}
          </div>

          {/* Vision */}
          <div className="sr-pop edge-top rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-8 md:p-10" style={{ animationDelay: "0.07s" }}>
            <span className="display block text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-brand-orange)]">
              Vision Statement
            </span>
            <h2 className="display mt-4 text-2xl font-extrabold md:text-3xl">
              {purpose.vision.headline}
            </h2>
            <ul className="mt-4 space-y-3">
              {purpose.vision.beliefs.map((b) => (
                <li key={b} className="flex gap-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                  <span aria-hidden="true" className="mt-1 shrink-0 text-[var(--color-brand-orange)]">→</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── BRAND MESSAGE ───────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <span aria-hidden="true" className="ghost absolute -top-3 left-0 text-[18vw] opacity-40 md:text-[10rem]">
          SIGNAL
        </span>
        <Container className="relative">
          <SectionHead
            eyebrow="Our brand message"
            title={
              <>
                One network.{" "}
                <span className="text-[var(--color-brand-orange)]">Every need.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "📡",
                title: "Voice & Data",
                body: "From seamlessly integrated voice services, ensuring crystal-clear calls to numbers within the 01-640xxxx range for homes, corporations, small and large businesses, to user-friendly unlimited data plans — we continuously introduce innovative and budget-friendly solutions.",
              },
              {
                icon: "🔗",
                title: "What we provide",
                body: "By utilising our network, we provide: Voice, Data (Internet), IPTV, Metro Ethernet, and customised network solutions — all running on infrastructure we own and operate.",
              },
              {
                icon: "🎯",
                title: "Unified communications",
                body: "Our focus lies in providing unified communications and comprehensive solutions. We prioritise flexibility and offer tailor-made solutions to accommodate your specific communication needs.",
              },
              {
                icon: "🛡️",
                title: "Carrier-class reliability",
                body: "Our team of experienced and dedicated professionals and a fully redundant network guarantees carrier-class reliability. We provide 24/7/365 support to ensure uninterrupted service.",
              },
              {
                icon: "🇳🇬",
                title: "Built for Nigeria",
                body: "Naira pricing. Local support teams. Coverage in cities and estates that most ISPs ignore. Built for the Nigerian market, not just aimed at it.",
              },
              {
                icon: "⚡",
                title: "No limits",
                body: "Unlimited data, transparent pricing, no lock-in tricks. We build long-term relationships with our customers, not short-term revenue extraction.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="sr-pop lift rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-7"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="mb-4 block text-3xl" aria-hidden="true">{item.icon}</span>
                <h3 className="display text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── COVERAGE ────────────────────────────────────────────── */}
      <section className="wash relative overflow-hidden py-20 md:py-24">
        <Container className="relative">
          <SectionHead
            eyebrow="Where we operate"
            title={
              <>
                Live across{" "}
                <span className="text-[var(--color-brand-orange)]">Lagos.</span>
              </>
            }
            lede="Estate by estate across the Lekki peninsula — and growing."
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:mt-16">
            {coverageZones.map((z, i) => (
              <div
                key={z}
                className="sr flex items-center justify-between rounded-xl border border-[var(--color-hairline)] bg-[var(--color-surface)] px-5 py-4"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <span className="text-sm font-semibold">{z}</span>
                <span className="ml-3 shrink-0 rounded-full bg-[rgba(20,145,92,0.12)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-success)]">
                  Live
                </span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-[var(--color-fg-muted)]">
            Not listed?{" "}
            <a href="/contact" className="font-semibold text-[var(--color-brand-orange)] hover:underline">
              Contact us →
            </a>{" "}
            We may still be able to serve your address.
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
