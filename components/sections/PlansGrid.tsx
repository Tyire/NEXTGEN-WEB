import { plans, formatNaira, type Plan } from "@/data/plans";
import { Arrow } from "@/components/ui";

/** Naira value without the sign, so the sign can be styled smaller. */
function amount(p: Plan) {
  return p.priceNgn == null ? null : new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(p.priceNgn);
}

function PlanCard({ p, i }: { p: Plan; i: number }) {
  const amt = amount(p);
  const external = p.checkoutUrl.startsWith("http");
  return (
    <li
      className={`sr-pop lift relative flex flex-col rounded-[var(--radius)] p-7 md:p-8 ${
        p.featured
          ? "grad-border glow-pulse bg-[var(--color-surface)]"
          : "edge-top border border-[var(--color-hairline)] bg-[var(--color-surface)]"
      }`}
      style={{ animationDelay: `${i * 0.05}s` }}
    >
      {p.featured && (
        <span className="display absolute -top-3.5 left-7 rounded-full grad-sunset px-3.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white">
          Most popular
        </span>
      )}
      <p className="eyebrow">{p.speed}</p>
      <h3 className="display mt-2 text-xl font-bold">{p.name}</h3>

      <p className="mt-5">
        {amt ? (
          <>
            <span className="display grad-text align-top text-lg font-bold">₦</span>
            <span className="display grad-text text-5xl font-extrabold tracking-tight">{amt}</span>
            <span className="ml-1 text-sm text-[var(--color-fg-faint)]">/{p.cycle}</span>
          </>
        ) : (
          <span className="display text-2xl font-bold">{formatNaira(p.priceNgn)}</span>
        )}
      </p>

      <ul className="mt-6 grid gap-2.5 text-sm text-[var(--color-fg-muted)]">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2.5">
            <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2.5 8.5 6 12l7.5-8" />
            </svg>
            {h}
          </li>
        ))}
      </ul>

      <a
        href={p.checkoutUrl}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 active:scale-[0.97] ${
          p.featured
            ? "grad-sunset text-white shadow-[0_12px_32px_-12px_rgba(255,60,44,0.6)]"
            : "border-2 border-[var(--color-hairline)] text-[var(--color-fg)] hover:border-[var(--color-brand-orange)]"
        }`}
      >
        {p.priceNgn == null ? "Talk to sales" : "Subscribe"} <Arrow />
      </a>
    </li>
  );
}

export function PlansGrid({
  include = "all",
  carousel = false,
}: {
  include?: "all" | "residential";
  carousel?: boolean;
}) {
  const list = include === "residential" ? plans.filter((p) => p.priceNgn != null) : plans;
  return (
    <ul className={carousel ? "plans-carousel" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"}>
      {list.map((p, i) => (
        <PlanCard key={p.id} p={p} i={i} />
      ))}
    </ul>
  );
}
