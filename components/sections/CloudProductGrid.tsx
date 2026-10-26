import { cloudProducts } from "@/data/cloud-plans";
import { Arrow } from "@/components/ui";

/** Product index cards for the /cloud hub — mirrors ServicesGrid's visual language. */
export function CloudProductGrid() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cloudProducts.map((p, i) => (
        <li key={p.slug} className="sr-pop" style={{ animationDelay: `${i * 0.06}s` }}>
          <a
            href={p.href}
            className="lift group relative flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-7 md:p-8"
          >
            <span aria-hidden="true" className="ghost absolute -right-3 -top-7 text-[7.5rem] opacity-70 transition-opacity duration-300 group-hover:opacity-100">
              0{i + 1}
            </span>
            <p className="eyebrow relative">{p.eyebrow}</p>
            <h3 className="display relative mt-3 text-2xl font-bold">{p.name}</h3>
            <p className="relative mt-4 flex-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">{p.short}</p>
            <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-orange)]">
              {p.comingSoon ? "Join the waitlist" : "Explore"} <Arrow />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
