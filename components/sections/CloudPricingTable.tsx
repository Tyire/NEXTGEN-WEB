import { CloudProduct, PRICING_STATUS, formatCloudPrice } from "@/data/cloud-plans";
import { Arrow, waLinkButtonClass } from "@/components/ui";
import { waLink } from "@/lib/site";

/** Tier cards for one Cloud product — used on every /cloud/* subpage. */
export function CloudPricingTable({ product }: { product: CloudProduct }) {
  const featuredIndex = product.tiers.length > 1 ? 1 : 0;
  return (
    <div>
      {PRICING_STATUS === "proposal" && (
        <p className="sr mb-8 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-hairline)] px-4 py-2 text-xs font-medium text-[var(--color-fg-muted)]">
          <span className="live-dot" aria-hidden="true" />
          Indicative pricing — confirmed at launch
        </p>
      )}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {product.tiers.map((t, i) => (
          <li
            key={t.name}
            className={`sr-pop lift relative flex flex-col rounded-[var(--radius)] p-7 md:p-8 ${
              i === featuredIndex && product.tiers.length > 1
                ? "grad-border bg-[var(--color-surface)]"
                : "border border-[var(--color-hairline)] bg-[var(--color-surface)]"
            }`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <h3 className="display text-[1.7rem] leading-tight">{t.name}</h3>
            <p className="mt-6 border-t border-[var(--color-hairline)] pt-6">
              <span className="display text-[2.6rem] leading-none tabular-nums">{formatCloudPrice(t)}</span>
              {t.unit && <span className="ml-1.5 text-sm text-[var(--color-fg-faint)]">{t.unit}</span>}
            </p>
            <ul className="mb-8 mt-6 grid flex-1 content-start gap-3 text-sm text-[var(--color-fg-muted)]">
              {t.includes.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--color-fg-faint)]" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
            <a
              href={waLink(`Hi NextGen, I'm interested in ${product.name}${t.name ? ` (${t.name})` : ""}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${waLinkButtonClass} w-full ${i === featuredIndex && product.tiers.length > 1 ? "btn-accent" : "btn-ghost"}`}
            >
              {product.comingSoon ? "Join the waitlist" : "Talk to sales"} <Arrow />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
