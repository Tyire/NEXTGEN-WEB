import Link from "next/link";
import { services } from "@/lib/site";
import { Arrow } from "@/components/ui";

const icons: Record<string, React.ReactNode> = {
  connectivity: (
    <path d="M5 12.5a10 10 0 0 1 14 0M8 16a5 5 0 0 1 8 0M12 19.5h.01" strokeLinecap="round" strokeLinejoin="round" />
  ),
  voice: (
    <path d="M7 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 5 6a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  enterprise: (
    <path d="M4 20V8l5-3 5 3v12M14 20V11l5-3v12M3 20h18M8 11h0M8 14h0M8 17h0" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

export function ServiceGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {services.map((s, i) => (
        <Link
          key={s.slug}
          href={s.href}
          className="group relative flex flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-brand-orange)]/50"
        >
          <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-brand-orange)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-hairline)] bg-[var(--color-ink)]">
              <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-[var(--color-brand-amber)]" fill="none" strokeWidth="1.6">
                {icons[s.slug]}
              </svg>
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-fg-faint)]">
              {String(i + 1).padStart(2, "0")} / {s.eyebrow}
            </span>
          </div>

          <h3 className="display mt-6 text-2xl font-semibold text-[var(--color-fg)]">{s.name}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">{s.benefit}</p>

          <div className="mt-6 flex items-end justify-between border-t border-[var(--color-hairline)] pt-5">
            <div>
              <div className="display brand-text text-2xl font-bold">{s.stat.value}</div>
              <div className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-fg-faint)]">
                {s.stat.label}
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-fg)]">
              Explore <Arrow />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
