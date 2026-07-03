import Link from "next/link";
import { Container, Eyebrow } from "./ui";
import { PeopleImage } from "./PeopleImage";
import { imagery } from "@/data/imagery";

export function PageHero({
  eyebrow,
  title,
  highlight,
  sub,
  crumbs,
  image,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  sub: string;
  crumbs: { name: string; href: string }[];
  /** ISP-themed banner slot rendered behind the heading (white text over a scrim). */
  image?: keyof typeof imagery;
}) {
  const hasImg = !!image && !!imagery[image]?.src;
  return (
    <section
      className="relative isolate overflow-hidden border-b border-[var(--color-hairline)] pt-32 pb-16 md:pt-40 md:pb-20"
      style={
        hasImg
          ? ({
              "--color-fg": "#ffffff",
              "--color-fg-muted": "rgba(255,255,255,0.85)",
              "--color-fg-faint": "rgba(255,255,255,0.6)",
              "--color-hairline": "rgba(255,255,255,0.22)",
            } as React.CSSProperties)
          : undefined
      }
    >
      {hasImg ? (
        <>
          <div className="absolute inset-0 -z-20">
            <PeopleImage slot={image!} className="h-full w-full object-cover" sizes="100vw" priority placeholder={false} />
          </div>
          <div className="absolute inset-0 -z-10 bg-[#070a09]/72" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#060807]/85 via-[#060807]/45 to-[#060807]/20" />
        </>
      ) : (
        <>
          <div className="grid-bg absolute inset-0 -z-10 opacity-50" />
          <span className="pointer-events-none absolute -top-32 right-[-8%] -z-10 h-[440px] w-[440px] rounded-full bg-[var(--color-brand-orange)] opacity-[0.12] blur-[130px]" />
        </>
      )}
      <Container>
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--color-fg-faint)]">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-2">
                {i > 0 && <span className="text-[var(--color-hairline)]">/</span>}
                {i < crumbs.length - 1 ? (
                  <Link href={c.href} className="transition-colors hover:text-[var(--color-fg)]">
                    {c.name}
                  </Link>
                ) : (
                  <span className="text-[var(--color-fg-muted)]">{c.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display mt-5 max-w-3xl text-4xl font-semibold text-[var(--color-fg)] sm:text-5xl md:text-6xl">
          {title} {highlight && <span className="brand-text">{highlight}</span>}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-muted)]">{sub}</p>
      </Container>
    </section>
  );
}
