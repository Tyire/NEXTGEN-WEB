import type { Metadata } from "next";
import { LegalShell } from "@/components/sections/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern NextGen Telecoms fiber, voice and enterprise services.",
  alternates: { canonical: "/legal/terms" },
};

/* TODO: legal review before launch — working draft, not counsel-approved. */
export default function TermsPage() {
  return (
    <LegalShell eyebrow="Legal" title="Terms of Service" updated="July 2026 (draft)">
      <p>
        These terms govern your use of NextGen Telecoms services. Subscribing to a plan, or using
        this website, means you accept them.
      </p>

      <h2>Service</h2>
      <ul>
        <li>Plans are prepaid and renew only when paid — there is no lock-in contract for residential service.</li>
        <li>Advertised speeds are the capacity of your line, measured wired; Wi-Fi performance varies with environment and devices.</li>
        <li>Installation timelines (typically 3 days in lit estates) begin after a successful site survey.</li>
      </ul>

      <h2>Your responsibilities</h2>
      <ul>
        <li>Keep the installed ONT powered and undamaged; it remains NextGen property unless purchased.</li>
        <li>Use the service lawfully. Resale of a residential connection requires a business agreement.</li>
        <li>Usage is subject to our <a href="/legal/fair-usage">Fair Usage Policy</a>.</li>
      </ul>

      <h2>Availability &amp; support</h2>
      <p>
        We target 99.9% network uptime. Business SLAs are defined in their service agreements.
        Faults are reported via WhatsApp or {site.phoneDisplay}; we prioritise restoring service
        over paperwork.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by Nigerian law, NextGen&rsquo;s liability is limited to the fees
        paid for the affected billing period. We are not liable for indirect losses.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms; material changes are announced on this page with a new
        &ldquo;last updated&rdquo; date. Continued use after a change constitutes acceptance.
      </p>
    </LegalShell>
  );
}
