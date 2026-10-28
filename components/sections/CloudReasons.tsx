import { cloudReasons } from "@/data/cloud-plans";

/** The six reasons grid — numbered cards, same rhythm as EnterprisePage's "offers". */
export function CloudReasons() {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cloudReasons.map((r, i) => (
        <li
          key={r.t}
          className="sr-pop lift rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-7 md:p-8"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <span aria-hidden="true" className="display text-[var(--color-brand-orange)] text-3xl font-extrabold">0{i + 1}</span>
          <h3 className="display mt-4 text-lg font-bold">{r.t}</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">{r.d}</p>
        </li>
      ))}
    </ul>
  );
}
