import type { Metadata } from "next";
import { CloudProductPage } from "@/components/sections/CloudProductPage";

export const metadata: Metadata = {
  title: "Colocation & Private Cloud Lagos — NextGen Cloud Enterprise",
  description:
    "Colocation, disaster recovery and private cloud on NextGen's own Lagos infrastructure — built for data residency under NDPA.",
  alternates: { canonical: "/cloud/enterprise" },
};

export default function CloudEnterprisePage() {
  return (
    <CloudProductPage
      slug="enterprise"
      heroGhost="ENTERPRISE"
      heroTitle={
        <>
          Your data,
          <br />
          <span className="text-flow">kept in Nigeria.</span>
        </>
      }
      benefitTitle={<>Built for <span className="text-[var(--color-brand-orange)]">residency.</span></>}
      whoFor={["Fintechs", "Schools & hospitals", "Government suppliers", "Regulated businesses"]}
      detail="Rack space, a live backup copy, or dedicated private infrastructure on NextGen's own Lagos network — built with data residency in mind as CBN payment-data localisation and NDPA requirements tighten. We'll scope a data agreement that fits your compliance needs."
      faqs={[
        { q: "Why does data residency matter for us?", a: "CBN requires payment data to stay in Nigeria from 1 January 2027, and NDPA governs personal data more broadly. Keeping infrastructure on NextGen's Lagos network keeps that data where it needs to be." },
        { q: "What's included in disaster recovery?", a: "A live backup copy of your systems, held in Lagos, so a failure elsewhere doesn't mean starting from zero." },
        { q: "Can I bring my own hardware for colocation?", a: "Yes — colocation gives you rack space, power and bandwidth on our network for equipment you own." },
      ]}
      ctaTitle={
        <>
          Let&rsquo;s scope
          <br />
          your setup.
        </>
      }
      ctaLede="Join the waitlist and we'll talk through colocation, DR or private cloud for your business."
    />
  );
}
