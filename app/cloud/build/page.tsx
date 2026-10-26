import type { Metadata } from "next";
import { CloudProductPage } from "@/components/sections/CloudProductPage";

export const metadata: Metadata = {
  title: "Website Design Lagos — We Build It on NextGen Cloud",
  description:
    "A site, online store or portal built for you over WhatsApp — then kept running with a monthly care plan. Online stores include Paystack checkout.",
  alternates: { canonical: "/cloud/build" },
};

export default function CloudBuildPage() {
  return (
    <CloudProductPage
      slug="build"
      heroGhost="BUILD"
      heroTitle={
        <>
          We&rsquo;ll build it.
          <br />
          <span className="text-flow">You run your business.</span>
        </>
      }
      benefitTitle={<>Built, <span className="text-[var(--color-brand-orange)]">then maintained.</span></>}
      whoFor={["Small businesses", "Retailers", "Schools", "Service providers"]}
      detail="No drag-and-drop editor to learn — tell us what you need over WhatsApp and our team builds it, from a simple business site to an online store with Paystack checkout or a custom web/school portal app. A monthly care plan keeps it updated after launch."
      faqs={[
        { q: "What's the difference between this and the AI site builder?", a: "This is built by our team for anything custom — a store, a portal, a multi-page corporate site. The AI builder (coming soon) is for a simple site you describe over WhatsApp." },
        { q: "What does the care plan include?", a: "Ongoing updates, fixes, and a monthly report — so your site keeps working without you having to think about it." },
        { q: "Does the online store accept payments?", a: "Yes — Paystack checkout is built in." },
      ]}
      ctaTitle={
        <>
          Tell us
          <br />
          what you need.
        </>
      }
      ctaLede="Join the waitlist and describe your project over WhatsApp."
    />
  );
}
