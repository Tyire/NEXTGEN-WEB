import { cloudHowItWorks } from "@/data/cloud-plans";

/** The 3-step "tell us → we set it up → you're online" strip. */
export function CloudHowItWorks() {
  return (
    <ol className="grid gap-8 md:grid-cols-3">
      {cloudHowItWorks.map((s, i) => (
        <li key={s.t} className="sr-pop relative" style={{ animationDelay: `${i * 0.08}s` }}>
          <span aria-hidden="true" className="display flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-hairline)] text-xl text-[var(--accent-text)]">
            {i + 1}
          </span>
          <h3 className="display mt-5 text-xl font-bold">{s.t}</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}
