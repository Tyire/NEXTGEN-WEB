import type { Metadata } from "next";
import { LegalShell } from "@/components/sections/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How NextGen Telecoms collects, uses and protects subscriber data under the NDPR.",
  alternates: { canonical: "/legal/privacy" },
};

/* TODO: legal review before launch — this is a working draft aligned to the
   NDPR, not reviewed counsel-approved text. */
export default function PrivacyPage() {
  return (
    <LegalShell eyebrow="Legal" title="Privacy Policy" updated="July 2026 (draft)">
      <p>
        NextGen Telecoms Ltd (&ldquo;NextGen&rdquo;, &ldquo;we&rdquo;) respects your privacy. This
        policy explains what we collect, why, and the choices you have. It applies to this website
        and to our subscriber services, and is written to comply with the Nigeria Data Protection
        Regulation (NDPR).
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Contact details you give us — name, phone, email, estate/address — when you enquire or subscribe.</li>
        <li>Service data needed to run your connection: plan, payments, usage volumes and network diagnostics.</li>
        <li>Basic technical logs when you visit this site (IP address, pages viewed). We currently run no third-party analytics or advertising trackers.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To survey, install, bill and support your service.</li>
        <li>To plan network capacity and diagnose faults.</li>
        <li>To contact you about your own service. We do not sell subscriber data.</li>
      </ul>

      <h2>Retention &amp; security</h2>
      <p>
        We keep personal data only as long as your relationship with us (plus statutory retention
        periods for billing records) and protect it with access controls and encryption in transit.
      </p>

      <h2>Your rights</h2>
      <p>
        Under the NDPR you may request access to, correction of, or deletion of your personal data.
        Write to <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within 30
        days.
      </p>

      <h2>Contact</h2>
      <p>
        Data questions: <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phoneDisplay},
        NextGen Telecoms Ltd, {site.address.region}, Nigeria.
      </p>
    </LegalShell>
  );
}
