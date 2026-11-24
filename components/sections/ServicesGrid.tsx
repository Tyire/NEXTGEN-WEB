import { services } from "@/lib/site";
import { Arrow } from "@/components/ui";

/**
 * Bento service grid (phone-first: one column, then 3 columns at md).
 *  - Fiber is the lead tile: 2×2, photo behind a dark scrim.
 *  - Voice and Custom Network sit stacked on the right.
 *  - NextGen Cloud closes the grid as a full-width band (replaces the old
 *    standalone Cloud section on the home page).
 */
export function ServicesGrid() {
  const [lead, ...rest] = services;

  return (
    <ul className="grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto] md:gap-5">
      {/* Lead tile */}
      <li className="sr-pop md:col-span-2 md:row-span-2">
        <a
          href={lead.href}
          className="lift on-dark group relative isolate flex h-full min-h-[24rem] flex-col justify-end overflow-hidden rounded-[var(--radius)] border border-[var(--color-hairline)] p-7 md:min-h-[30rem] md:p-10"
        >
          <picture>
            <source
              type="image/avif"
              srcSet="/images/people/fiber-640.avif 640w, /images/people/fiber-1024.avif 1024w, /images/people/fiber-1600.avif 1600w"
              sizes="(min-width:768px) 62vw, 92vw"
            />
            <source
              type="image/webp"
              srcSet="/images/people/fiber-640.webp 640w, /images/people/fiber-1024.webp 1024w, /images/people/fiber-1600.webp 1600w"
              sizes="(min-width:768px) 62vw, 92vw"
            />
            <img
              src="/images/people/fiber-1024.webp"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
            />
          </picture>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/35 mix-blend-saturation" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#000_30%,rgba(0,0,0,0.72)_65%,rgba(0,0,0,0.35))] md:bg-[linear-gradient(to_top,#000_12%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.15))]" />

          <p className="eyebrow text-white/75">{lead.eyebrow}</p>
          <h3 className="display mt-3 text-3xl font-bold text-white md:text-5xl">{lead.name}</h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 md:text-base">{lead.short}</p>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-white/15 pt-6">
            <p>
              <span className="display text-4xl font-extrabold text-[var(--color-brand-orange)] md:text-5xl">{lead.stat.value}</span>
              <span className="ml-2 text-xs uppercase tracking-wider text-white/65">{lead.stat.label}</span>
            </p>
            <span className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white">
              Explore fiber <Arrow />
            </span>
          </div>
        </a>
      </li>

      {/* Secondary tiles */}
      {rest.map((s, i) => (
        <li key={s.slug} className="sr-pop" style={{ animationDelay: `${(i + 1) * 0.06}s` }}>
          <a
            href={s.href}
            className="lift group flex h-full flex-col rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-7"
          >
            <p className="eyebrow">{s.eyebrow}</p>
            <h3 className="display mt-3 text-2xl font-bold">{s.name}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">{s.short}</p>
            <div className="mt-6 flex items-end justify-between gap-4 border-t border-[var(--color-hairline)] pt-5">
              <p>
                <span className="display text-2xl font-extrabold text-[var(--color-brand-orange)]">{s.stat.value}</span>
                <span className="ml-2 text-xs uppercase tracking-wider text-[var(--color-fg-faint)]">{s.stat.label}</span>
              </p>
              <span aria-hidden="true" className="text-[var(--color-brand-orange)] transition-transform duration-300 group-hover:translate-x-1">
                <Arrow />
              </span>
            </div>
          </a>
        </li>
      ))}

      {/* Cloud band — full width */}
      <li className="sr-pop md:col-span-3" style={{ animationDelay: "0.18s" }}>
        <a
          href="/cloud"
          className="lift group flex flex-col gap-6 rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface-2)] p-7 md:flex-row md:items-center md:justify-between md:p-8"
        >
          <div className="max-w-2xl">
            <p className="eyebrow">New · Pre-launch</p>
            <h3 className="display mt-3 text-2xl font-bold md:text-3xl">
              NextGen <span className="text-[var(--color-brand-orange)]">Cloud.</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)] md:text-base">
              Hosting, business email, Naira-billed VPS and done-for-you websites — on our own Lagos
              network. A small pilot group is onboarding now.
            </p>
          </div>
          <span className="btn btn-ghost shrink-0 self-start md:self-center">
            Explore NextGen Cloud <Arrow />
          </span>
        </a>
      </li>
    </ul>
  );
}
