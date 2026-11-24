import { Arrow } from "@/components/ui";
import { site } from "@/lib/site";

/**
 * "Us vs Them" comparison (pattern after 21st.dev comparison-2): NextGen fibre
 * beside typical wireless / shared broadband. Names no competitor; the right
 * column describes common limits of the technology, not any one provider.
 * Every NextGen claim already appears elsewhere on the site.
 * Phone-first: two stacked cards; side by side from md.
 */
const rows: { us: string; them: string }[] = [
  { us: "Truly unlimited data, no caps or throttling", them: "Data bundles that run out or slow down" },
  { us: "Symmetrical: upload as fast as download", them: "Upload often a small part of download" },
  { us: "Steady speeds at 9pm on dedicated GPON fibre", them: "Shared radio capacity that dips at peak hours" },
  { us: "Survey to online in about 3 days", them: "Long waits for a slot or a router" },
  { us: "Real Lagos engineers 24/7 on WhatsApp and phone", them: "Call-centre queues and ticket numbers" },
  { us: "Own metro core into Equiano and MainOne", them: "Resold or shared upstream capacity" },
];

function Mark({ yes }: { yes: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.8rem] font-bold ${yes ? "mark-yes" : "mark-no"}`}
    >
      {yes ? "✓" : "✕"}
    </span>
  );
}

export function FiberVsWireless() {
  return (
    <div className="mt-14 md:mt-20">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="display text-2xl font-extrabold md:text-3xl">
          Fibre that <span className="accent-word">outruns the usual.</span>
        </h3>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">How we compare</p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.25fr_1fr] md:gap-5">
        {/* Us */}
        <div className="sr-pop on-dark edge-top relative isolate overflow-hidden rounded-[var(--radius)] border border-[var(--color-hairline)] p-7 md:p-9">
          <div aria-hidden="true" className="sun-glow" />
          <p className="eyebrow !text-white/70">NextGen fibre</p>
          <ul className="mt-6 space-y-4" aria-label="With NextGen fibre">
            {rows.map((r) => (
              <li key={r.us} className="flex gap-3 text-[0.95rem] leading-snug text-white">
                <Mark yes />
                {r.us}
              </li>
            ))}
          </ul>
          <a href={site.selfcare.onboard} target="_blank" rel="noopener noreferrer" className="group btn btn-accent mt-8 w-full sm:w-auto">
            Check coverage <Arrow />
          </a>
        </div>

        {/* Them */}
        <div className="sr-pop rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-7 md:p-9" style={{ animationDelay: "0.07s" }}>
          <p className="eyebrow">Typical wireless &amp; shared plans</p>
          <ul className="mt-6 space-y-4" aria-label="With typical wireless and shared plans">
            {rows.map((r) => (
              <li key={r.them} className="flex gap-3 text-[0.95rem] leading-snug text-[var(--color-fg-muted)]">
                <Mark yes={false} />
                {r.them}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
