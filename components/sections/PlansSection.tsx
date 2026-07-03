import { Container, Eyebrow, Arrow } from "@/components/ui";
import { plans, formatNaira, plansUpdatedNote, type Plan } from "@/data/plans";

export function PlansSection({
  heading = "Our Plans",
  showAll = false,
}: {
  heading?: string;
  showAll?: boolean;
}) {
  // ponytail: homepage teases the first 3 residential plans; /plans shows all.
  // Single crawlable, keyboard-reachable grid — no JS toggle.
  const items = showAll ? plans : plans.slice(0, 3);

  return (
    <section id="plans" className="border-y border-[var(--color-hairline)] bg-[var(--color-void)] py-24">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Eyebrow>{heading}</Eyebrow>
            <h2 className="display mt-4 text-4xl font-semibold text-[var(--color-fg)] md:text-5xl">
              Choose your speed.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[var(--color-fg-muted)]">
            Unlimited data, no hidden caps. {plansUpdatedNote}.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>

        {!showAll && (
          <div className="mt-10">
            <a
              href="/plans"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-orange)] hover:underline"
            >
              See all plans <Arrow />
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative flex flex-col rounded-[var(--radius)] border bg-[var(--color-surface)] p-7 ${
        plan.featured
          ? "border-[var(--color-brand-orange)]/60 shadow-[0_12px_40px_-16px_rgba(255,90,44,0.5)]"
          : "border-[var(--color-hairline)]"
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-7 rounded-full brand-gradient-accent px-3 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-wider text-white">
          Most popular
        </span>
      )}
      <h3 className="display text-xl font-semibold text-[var(--color-fg)]">{plan.name}</h3>
      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--color-fg-faint)]">{plan.speed}</p>

      <div className="mt-6">
        <span className="display text-3xl font-bold text-[var(--color-fg)]">{formatNaira(plan.priceNgn)}</span>
        {plan.priceNgn != null && (
          <span className="text-sm text-[var(--color-fg-faint)]">/{plan.cycle}</span>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-fg-muted)]">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 stroke-[var(--color-success)]" fill="none" strokeWidth="2.2">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {h}
          </li>
        ))}
      </ul>

      <a
        href={plan.checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-[transform,box-shadow,border-color,color] duration-200 ease-[var(--ease-out)] active:scale-[0.97] ${
          plan.featured
            ? "brand-gradient text-[#180a04] hover:-translate-y-0.5"
            : "border border-[var(--color-hairline)] text-[var(--color-fg)] hover:border-[var(--color-brand-orange)]"
        }`}
      >
        {plan.priceNgn == null ? "Get a quote" : "Subscribe"} <Arrow />
      </a>
    </div>
  );
}
