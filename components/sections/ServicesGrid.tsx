import { services } from "@/lib/site";
import { Arrow } from "@/components/ui";

/** The three service pillars as oversized index cards. */
export function ServicesGrid() {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {services.map((s, i) => (
        <li key={s.slug} className="sr-pop" style={{ animationDelay: `${i * 0.06}s` }}>
          <a
            href={s.href}
            className="lift group relative flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-7 md:p-8"
          >
            {/* Giant index numeral */}
            <span aria-hidden="true" className="ghost absolute -right-3 -top-7 text-[7.5rem] opacity-70 transition-opacity duration-300 group-hover:opacity-100">
              0{i + 1}
            </span>
            <p className="eyebrow relative">{s.eyebrow}</p>
            <h3 className="display relative mt-3 text-2xl font-bold">{s.name}</h3>
            <p className="relative mt-4 flex-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">{s.short}</p>
            <p className="relative mt-6 border-t border-[var(--color-hairline)] pt-5">
              <span className="display text-[var(--color-brand-orange)] text-3xl font-extrabold">{s.stat.value}</span>
              <span className="ml-2 text-xs uppercase tracking-wider text-[var(--color-fg-faint)]">{s.stat.label}</span>
            </p>
            <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-orange)]">
              Explore <Arrow />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
