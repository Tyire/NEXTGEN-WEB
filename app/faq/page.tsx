import type { Metadata } from "next";
import { Container, Button, Arrow, SectionHead } from "@/components/ui";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ — NextGen Help Center",
  description:
    "Answers on activation, billing, coverage and troubleshooting for NextGen fiber, voice and enterprise services — plus how to reach a real engineer fast.",
  alternates: { canonical: "/faq" },
};

export const groups: { title: string; faqs: { q: string; a: string }[] }[] = [
  {
    title: "Getting connected",
    faqs: [
      {
        q: "How do I check if NextGen covers my estate?",
        a: "Use the coverage checker on our Plans page or the selfcare portal. If your estate is listed, you can subscribe immediately; if not, submit your estate through the contact form and our rollout team will survey it.",
      },
      {
        q: "How long does installation take?",
        a: "About 3 days after a successful survey in a lit estate. The engineer confirms your ONT placement, runs the drop fiber, and tests speeds with you before leaving.",
      },
      {
        q: "Is there an installation fee?",
        a: "Installation pricing depends on your estate and plan — the exact fee is shown next to your estate in the coverage checker before you commit. No surprises on the day.",
      },
      {
        q: "Do I need to buy a router?",
        a: "We install an ONT with Wi-Fi as part of setup. You can use your own router behind it if you prefer — our engineers will help you bridge it during installation.",
      },
    ],
  },
  {
    title: "Billing & plans",
    faqs: [
      {
        q: "Are plans really unlimited?",
        a: "Yes — no data caps. Usage is subject to our Fair Usage Policy, which exists to stop abuse (like commercial resale on a home plan), not to throttle normal streaming, gaming or work.",
      },
      {
        q: "Is there a contract?",
        a: "No. Plans are prepaid month-to-month (or day-to-day on the daily plan). Pause, upgrade or downgrade from the selfcare portal any time.",
      },
      {
        q: "How do I pay?",
        a: "Through the selfcare portal — card or bank transfer. Your service renews automatically when your balance covers the next cycle.",
      },
      {
        q: "Can I change my plan mid-cycle?",
        a: "Upgrades apply immediately with a pro-rated top-up. Downgrades take effect from your next renewal date.",
      },
    ],
  },
  {
    title: "Technical & troubleshooting",
    faqs: [
      {
        q: "My internet is slow or down. What should I do first?",
        a: "Restart the ONT (power off, wait 10 seconds, power on) and test with a cable if possible. If it persists, message us on WhatsApp — an engineer responds fast, and most issues resolve without a visit.",
      },
      {
        q: "What speeds should I actually expect?",
        a: "Your subscribed speed, symmetrical, on a wired connection. Wi-Fi speeds depend on distance, walls and device — for full gigabit-class throughput use 5 GHz close to the ONT or a cable.",
      },
      {
        q: "Does NextGen work during power outages?",
        a: "Our network runs on redundant power. Your side needs the ONT powered — a small inverter or power bank with the right adapter keeps you online through outages.",
      },
      {
        q: "How do I cancel?",
        a: "Simply let your prepaid cycle lapse — nothing renews that you haven't paid for. If you're moving within our coverage, relocation is usually easier than cancelling; ask support.",
      },
    ],
  },
];

const wa = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi NextGen support, I need help with my connection."
)}`;

export default function FaqPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]} />
      <FaqJsonLd faqs={groups.flatMap((g) => g.faqs)} />

      <PageHero
        eyebrow="Help center"
        title={
          <>
            Answers,
            <br />
            <span className="text-flow">then engineers.</span>
          </>
        }
        lede="Most questions are answered below in a minute. Everything else goes straight to a real engineer on WhatsApp — no ticket purgatory."
        image="banner-contact"
        video="/videos/banner-contact.vid"
        ghost="HELP"
      >
        <Button href={wa} external>
          WhatsApp support <Arrow />
        </Button>
        <a
          href={`tel:${site.phoneHref}`}
          className="group inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
        >
          Call {site.phoneDisplay} <Arrow />
        </a>
      </PageHero>

      <section className="relative overflow-hidden py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="FAQ"
            title={
              <>
                Asked and <span className="text-[var(--color-brand-orange)]">answered.</span>
              </>
            }
            lede="Activation, billing, coverage and troubleshooting — the questions every new subscriber asks."
          />
          <div className="mt-12 grid gap-12 md:mt-16">
            {groups.map((g) => (
              <div key={g.title}>
                <h3 className="eyebrow mb-5">{g.title}</h3>
                <ul className="grid gap-3">
                  {g.faqs.map((f) => (
                    <li key={f.q} className="sr">
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
                        <p className="border-t border-[var(--color-hairline)] px-6 pb-6 pt-4 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                          {f.a}
                        </p>
                      </details>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title={
          <>
            Still stuck?
            <br />
            Talk to a person.
          </>
        }
        lede="WhatsApp gets the fastest response — screenshots and speed tests welcome."
      />
    </>
  );
}
