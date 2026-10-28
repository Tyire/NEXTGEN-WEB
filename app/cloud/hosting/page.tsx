import type { Metadata } from "next";
import { CloudProductPage } from "@/components/sections/CloudProductPage";

export const metadata: Metadata = {
  title: "Web Hosting Lagos — NVMe Hosting on NextGen Cloud",
  description:
    "Fast NVMe web hosting on NextGen's own Lagos network. Firewall, malware scanning and daily offsite backup on every plan, set up for you in about 48 hours.",
  alternates: { canonical: "/cloud/hosting" },
};

export default function CloudHostingPage() {
  return (
    <CloudProductPage
      slug="hosting"
      heroGhost="HOSTING"
      heroTitle={
        <>
          Fast hosting.
          <br />
          <span className="text-flow">Set up for you.</span>
        </>
      }
      benefitTitle={<>Security, <span className="text-[var(--color-brand-orange)]">standard.</span></>}
      whoFor={["Small businesses", "Shops & services", "Schools", "Churches & NGOs"]}
      detail="Your site runs on NVMe storage on NextGen's own Lagos network — no shared-cabinet slowdowns, no dollar-card renewal surprises. Every plan ships with a firewall, malware scanning and a daily offsite backup, because security shouldn't be the plan you can't afford."
      faqs={[
        { q: "Do I need to be technical to use this?", a: "No. Setup happens over WhatsApp with our team — you tell us what you need, we configure the server, DNS and email." },
        { q: "What happens to my files if something goes wrong?", a: "Every site is backed up offsite daily, so a restore is a request away, not a rebuild." },
        { q: "Can I move my existing site here?", a: "Yes — tell us where it's hosted now and we'll handle the migration as part of setup." },
      ]}
      ctaTitle={
        <>
          Move your site
          <br />
          to Lagos.
        </>
      }
      ctaLede="Join the waitlist and we'll get your hosting set up over WhatsApp."
    />
  );
}
