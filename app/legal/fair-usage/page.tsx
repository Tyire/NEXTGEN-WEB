import type { Metadata } from "next";
import { LegalShell } from "@/components/sections/LegalShell";

export const metadata: Metadata = {
  title: "Fair Usage Policy",
  description: "What unlimited means on NextGen fiber — and the narrow cases where we intervene.",
  alternates: { canonical: "/legal/fair-usage" },
};

/* TODO: legal review before launch — working draft, not counsel-approved. */
export default function FairUsagePage() {
  return (
    <LegalShell eyebrow="Legal" title="Fair Usage Policy" updated="July 2026 (draft)">
      <p>
        Every NextGen plan is unlimited: no data caps, no overnight-only fine print, no throttling
        of normal streaming, gaming, work or backups. This policy exists for the narrow cases that
        degrade the network for everyone else.
      </p>

      <h2>What is always fine</h2>
      <ul>
        <li>4K streaming, video calls, cloud backups, game downloads and updates — at any hour.</li>
        <li>Working from home, hosting a NAS, smart-home devices, CCTV uplinks.</li>
        <li>Heavy but personal use. We size the network for it.</li>
      </ul>

      <h2>What triggers a conversation</h2>
      <ul>
        <li>Reselling or sharing a residential line beyond your household (that needs a business plan).</li>
        <li>Running attack traffic, open relays or other abuse from your connection.</li>
        <li>Sustained automated traffic so extreme it measurably degrades a shared segment.</li>
      </ul>

      <h2>What we do</h2>
      <p>
        We contact you first. If abuse continues, we may temporarily manage the connection&rsquo;s
        priority or, in serious cases, suspend service. We never silently throttle a plan because
        you used it &ldquo;too much&rdquo;.
      </p>
    </LegalShell>
  );
}
