import type { Metadata } from "next";
import { Container, SectionHead } from "@/components/ui";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Talk to NextGen",
  description: `Call ${site.phoneDisplay}, WhatsApp ${site.whatsapp}, or send an enquiry — fiber, voice and enterprise connectivity across Lagos.`,
  alternates: { canonical: "/contact" },
};

const wa = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi NextGen, I'd like to get connected."
)}`;

const channels = [
  { t: "Call us", v: site.phoneDisplay, s: `also ${site.phoneDisplayAlt}`, href: `tel:${site.phoneHref}` },
  { t: "WhatsApp", v: "+234 916 640 5000", s: "fastest response", href: wa, external: true },
  { t: "Email", v: site.email, s: "quotes & partnerships", href: `mailto:${site.email}` },
  { t: "Self-care portal", v: "selfcare.nextgen.ng", s: "manage your account", href: site.selfcare.login, external: true },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Talk to a
            <br />
            <span className="text-flow">human.</span>
          </>
        }
        lede="Sales, support, surveys, partnerships — real people in Lagos, on channels you actually use."
        image="banner-contact"
        video="/videos/banner-contact.vid"
        ghost="HELLO"
      />

      <section className="relative overflow-hidden py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHead eyebrow="Channels" title={<>Reach us <span className="grad-text">anywhere.</span></>} />
            <ul className="mt-10 grid gap-4">
              {channels.map((c, i) => (
                <li key={c.t} className="sr" style={{ animationDelay: `${i * 0.05}s` }}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="lift flex items-baseline justify-between gap-4 rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] px-6 py-5"
                  >
                    <div>
                      <p className="eyebrow">{c.t}</p>
                      <p className="display mt-1.5 text-lg font-bold text-[var(--color-fg)]">{c.v}</p>
                    </div>
                    <span className="shrink-0 text-xs text-[var(--color-fg-faint)]">{c.s}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-[var(--color-fg-faint)]">{site.address.region}, Nigeria</p>
          </div>

          <div className="sr-pop">
            <div className="grad-border rounded-[var(--radius)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-pop)] sm:p-8 md:p-10">
              <h2 className="display mb-7 text-2xl font-bold">Send an enquiry</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
