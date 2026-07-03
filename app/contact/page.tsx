import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export const metadata: Metadata = {
  title: "Contact NextGen Telcoms — Sales & Support in Lagos",
  description:
    "Talk to NextGen Telcoms about GPON fiber, business VoIP or Metro Ethernet in Lagos. Call our sales line, message on WhatsApp or send an enquiry — we'll arrange a site survey.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageHero
        eyebrow="Talk to us"
        title="Let's get you"
        highlight="connected."
        sub="Tell us what you need and where you are. Our team will check the nearest fiber, arrange a site survey and come back with honest options."
        crumbs={crumbs}
        image="banner-contact"
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-7 md:p-9">
              <ContactForm />
            </div>

            <div className="flex flex-col gap-8">
              <ContactItem label="Sales line" value={site.phoneDisplay} href={`tel:${site.phoneHref}`} />
              <ContactItem label="Email" value={site.email} href={`mailto:${site.email}`} />
              <ContactItem
                label="WhatsApp"
                value="Chat with sales"
                href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
              />
              <div>
                <Eyebrow>Office</Eyebrow>
                <address className="mt-3 not-italic leading-relaxed text-[var(--color-fg-muted)]">
                  {[site.address.street, site.address.city, site.address.region].filter(Boolean).join(", ")}
                  <br />
                  Nigeria
                </address>
              </div>
              <div className="rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-void)] p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-fg-faint)]">
                  Install promise
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                  3-day install after a site survey — faster where we already have estate presence.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactItem({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div>
      <Eyebrow>{label}</Eyebrow>
      <a href={href} className="display mt-2 block text-xl font-semibold text-[var(--color-fg)] transition-colors hover:text-[var(--color-brand-amber)]">
        {value}
      </a>
    </div>
  );
}
