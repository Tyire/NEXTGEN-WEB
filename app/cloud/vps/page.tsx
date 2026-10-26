import type { Metadata } from "next";
import { CloudProductPage } from "@/components/sections/CloudProductPage";

export const metadata: Metadata = {
  title: "VPS Lagos — Naira-Billed Virtual Servers on NextGen Cloud",
  description:
    "A Lagos virtual private server billed in Naira, IXPN-peered on NextGen's own network. No dollar-card limits. Managed add-on available.",
  alternates: { canonical: "/cloud/vps" },
};

export default function CloudVpsPage() {
  return (
    <CloudProductPage
      slug="vps"
      heroGhost="VPS"
      heroTitle={
        <>
          A real server,
          <br />
          <span className="text-flow">billed in Naira.</span>
        </>
      }
      benefitTitle={<>Yours to <span className="text-[var(--color-brand-orange)]">run.</span></>}
      whoFor={["Developers", "Startups", "Agencies", "Fintechs & data-sensitive apps"]}
      detail="Root access on a Lagos virtual server, peered at IXPN on NextGen's own network — no wrestling a dollar card through a declined-transaction loop, and your data never has to leave Nigeria. Add managed support if you'd rather we patch and monitor it for you."
      faqs={[
        { q: "Do I get root/SSH access?", a: "Yes — this is a real VPS, not a shared hosting account. You get full root access on every size." },
        { q: "What if I don't want to manage the server myself?", a: "Add the managed add-on and our team handles patching, monitoring and incident response." },
        { q: "Can I scale up later?", a: "Yes — move to a larger tier as your workload grows, without a fresh signup." },
      ]}
      ctaTitle={
        <>
          Spin up
          <br />
          your server.
        </>
      }
      ctaLede="Join the waitlist and we'll get your VPS provisioned on our Lagos network."
    />
  );
}
