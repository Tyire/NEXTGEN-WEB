import { CloudProduct, PRICING_STATUS, formatCloudPrice } from "@/data/cloud-plans";
import { Arrow, waLinkButtonClass } from "@/components/ui";
import { waLink } from "@/lib/site";

/** Tier cards for one Cloud product — used on every /cloud/* subpage. */
export function CloudPricingTable({ product }: { product: CloudProduct }) {
  const featuredIndex = product.tiers.length > 1 ? 1 : 0;
  return (
    <div>
      {PRICING_STATUS === "proposal" && (
        <p className="sr mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-hairline)] bg-[var(--color-surface-2)] px-4 py-2 text-xs font-semibold text-[var(--color-fg-muted)]">
          Indicative pricing — confirmed at launch
        </p>
      )}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {product.tiers.map((t, i) => (
          <li
            key={t.name}
            className={`sr-pop lift relative flex flex-col rounded-[var(--radius)] p-7 md:p-8 ${
              i === featuredIndex && product.tiers.length > 1
                ? "grad-border glow-pulse bg-[var(--color-surface)]"
                : "edge-top border border-[var(--color-hairline)] bg-[var(--color-surface)]"
            }`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <h3 className="display text-xl font-bold">{t.name}</h3>
            <p className="mt-5">
              <span className="display text-[var(--color-brand-orange)] text-4xl font-extrabold tracking-tight">
                {formatCloudPrice(t)}
              </span>
              {t.unit && <span className="ml-1 text-sm text-[var(--color-fg-faint)]">{t.unit}</span>}
            </p>
            <ul className="mt-6 grid gap-2.5 text-sm text-[var(--color-fg-muted)]">
              {t.includes.map((h) => (
                <li key={h} className="flex gap-2.5">
                  <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2.5 8.5 6 12l7.5-8" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
            <a
              href={waLink(`Hi NextGen, I'm interested in ${product.name}${t.name ? ` (${t.name})` : ""}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${waLinkButtonClass} mt-8 ${
                i === featuredIndex && product.tiers.length > 1
                  ? "grad-sunset text-white shadow-[0_12px_32px_-12px_rgba(255,60,44,0.6)]"
                  : "border-2 border-[var(--color-hairline)] text-[var(--color-fg)] hover:border-[var(--color-brand-orange)]"
              }`}
            >
              {product.comingSoon ? "Join the waitlist" : "Talk to sales"} <Arrow />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
