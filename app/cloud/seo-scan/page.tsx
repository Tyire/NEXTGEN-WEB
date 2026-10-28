import type { Metadata } from "next";
import { CloudProductPage } from "@/components/sections/CloudProductPage";

export const metadata: Metadata = {
  title: "SEO Analyzer — Coming Soon on NextGen Cloud",
  description:
    "A free scan of your site plus a plain-English list of what to fix — no jargon. Coming soon; join the waitlist.",
  alternates: { canonical: "/cloud/seo-scan" },
};

export default function CloudSeoScanPage() {
  return (
    <CloudProductPage
      slug="seo-scan"
      heroGhost="SEO"
      heroTitle={
        <>
          What&rsquo;s wrong,
          <br />
          <span className="text-flow">in plain English.</span>
        </>
      }
      benefitTitle={<>No jargon, <span className="text-[var(--color-brand-orange)]">just fixes.</span></>}
      whoFor={["Small businesses", "Site owners", "Marketers"]}
      detail="A scan of your site that skips the jargon and tells you exactly what to fix — and why it matters. The free scan covers one site; Pro checks up to three sites weekly and keeps a running fix list."
      faqs={[
        { q: "When does this launch?", a: "It's not live yet. Join the waitlist and we'll let you know as soon as the pilot opens." },
        { q: "What will the free scan check?", a: "The basics that actually move search rankings — covered in plain English, not a wall of technical scores." },
      ]}
      ctaTitle={
        <>
          Find out
          <br />
          what to fix.
        </>
      }
      ctaLede="Join the waitlist and we'll reach out when the scan opens up."
    />
  );
}
