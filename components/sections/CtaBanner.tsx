import { Container, Button, Arrow, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export function CtaBanner({
  title = "Already live in your estate? We connect you faster.",
  sub = "Check coverage in 30 seconds. Where NextGen already has network presence, install lands in as little as 3 days after a quick site survey.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] py-24">
      <div className="grain absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-px brand-gradient opacity-60" />
      <span className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-brand-orange)] opacity-[0.12] blur-[120px]" />
      <Container className="relative text-center">
        <Eyebrow className="justify-center">Get connected</Eyebrow>
        <h2 className="display mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold text-[var(--color-fg)] md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)]">{sub}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/plans">Check Coverage <Arrow /></Button>
          <Button href={`tel:${site.phoneHref}`} variant="outline">Call {site.phoneDisplay}</Button>
        </div>
      </Container>
    </section>
  );
}
