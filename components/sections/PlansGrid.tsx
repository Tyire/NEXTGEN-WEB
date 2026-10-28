import { plans, formatNaira, type Plan } from "@/data/plans";
import { Arrow } from "@/components/ui";
import { PlansCarouselNav } from "./PlansCarouselNav";

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
          ? "grad-border bg-[var(--color-surface)]"
          : "border border-[var(--color-hairline)] bg-[var(--color-surface)]"
      }`}
      style={{ animationDelay: `${i * 0.05}s` }}
    >
      {p.featured && (
        <span className="absolute -top-3 left-7 rounded-full bg-[var(--accent)] px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-black">
          Most popular
        </span>
      )}
      <p className="eyebrow">{p.speed}</p>
      <h3 className="display mt-2 text-[1.7rem] leading-tight">{p.name}</h3>

      <p className="mt-6 flex items-baseline gap-1 border-t border-[var(--color-hairline)] pt-6">
        {amt ? (
          <>
            <span className="text-lg text-[var(--color-fg-muted)]">₦</span>
            <span className="display text-[3.2rem] leading-none tabular-nums">{amt}</span>
            <span className="ml-1 text-sm text-[var(--color-fg-faint)]">/ {p.cycle}</span>
          </>
        ) : (
          <span className="display text-3xl">{formatNaira(p.priceNgn)}</span>
        )}
      </p>

      <ul className="mb-8 mt-6 grid flex-1 content-start gap-3 text-sm text-[var(--color-fg-muted)]">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-3">
            <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--color-fg-faint)]" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>

      <a
        href={p.checkoutUrl}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`group btn w-full ${p.featured ? "btn-accent" : "btn-ghost"}`}
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
    <>
      <ul className={carousel ? "plans-carousel" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"}>
        {list.map((p, i) => (
          <PlanCard key={p.id} p={p} i={i} />
        ))}
      </ul>
      {carousel && (
        <div className="md:hidden">
          <PlansCarouselNav total={list.length} />
        </div>
      )}
    </>
  );
}
