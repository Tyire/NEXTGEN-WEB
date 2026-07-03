import { trustStats } from "@/lib/site";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function TrustBand() {
  return (
    <div className="border-y border-[var(--color-hairline)] bg-[var(--color-void)]">
      <Container className="grid grid-cols-1 divide-y divide-[var(--color-hairline)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {trustStats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.12}
            className="flex flex-col items-center gap-1 py-8 text-center sm:py-10"
          >
            <span className="display brand-text text-4xl font-bold md:text-5xl">{s.value}</span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
              {s.label}
            </span>
          </Reveal>
        ))}
      </Container>
    </div>
  );
}
