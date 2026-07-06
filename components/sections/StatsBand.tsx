import { trustStats } from "@/lib/site";
import { Container, Eyebrow } from "@/components/ui";
import { BlobVideo } from "@/components/BlobVideo";

/** Why-NextGen band: image + huge gradient stats on the void surface. */
export function StatsBand() {
  return (
    <section className="wash relative overflow-hidden py-20 md:py-28">
      <span aria-hidden="true" className="ghost absolute -top-2 right-0 text-[18vw] opacity-50 md:text-[10rem]">
        UPTIME
      </span>
      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <div className="sr">
          <Eyebrow>Why NextGen</Eyebrow>
          <h2 className="display text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Built like a <span className="text-[var(--color-brand-orange)]">carrier.</span>
            <br />
            Priced like a neighbour.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
            NextGen runs its own GPON fiber network — no resold capacity, no cabinet copper. That&rsquo;s
            why the speeds are symmetrical, the latency stays low at 9pm, and an engineer who actually
            knows your estate picks up when you call.
          </p>
          <dl className="mt-10 grid gap-5 sm:grid-cols-3 sm:gap-6">
            {trustStats.map((s, i) => (
              <div
                key={s.label}
                className="sr-pop flex items-baseline gap-3 border-l-2 border-[var(--color-brand-orange)] pl-4 sm:block sm:border-l-0 sm:pl-0"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <dt className="order-2 text-[0.7rem] uppercase tracking-wider text-[var(--color-fg-faint)] sm:mt-1.5">
                  {s.label}
                </dt>
                <dd data-count="" className="display text-[var(--color-brand-orange)] text-3xl font-extrabold sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="sr-pop relative">
          <div aria-hidden="true" className="blob drift -right-16 -top-16 h-72 w-72" style={{ "--blob-c": "rgba(255,31,77,0.3)" } as React.CSSProperties} />
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius)] border border-[var(--color-hairline)] shadow-[var(--shadow-pop)]">
            <picture>
              <source type="image/avif" srcSet="/images/people/why-640.avif 640w, /images/people/why-1024.avif 1024w" sizes="(min-width:1024px) 45vw, 92vw" />
              <source type="image/webp" srcSet="/images/people/why-640.webp 640w, /images/people/why-1024.webp 1024w" sizes="(min-width:1024px) 45vw, 92vw" />
              <img
                src="/images/people/why-1024.webp"
                alt="A Lagos family streaming together on NextGen fiber"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>
            {/* mum & daughter browsing — the image above stays as the instant fallback */}
            <BlobVideo src="/videos/why-people.vid" className="absolute inset-0 h-full w-full object-cover" grade={false} />
          </div>
          {/* sticker stat */}
          <p className="display absolute -bottom-5 -left-2 -rotate-2 rounded-2xl grad-sunset px-5 py-3.5 text-white shadow-[0_16px_40px_-16px_rgba(255,31,77,0.8)] md:-left-6">
            <span className="block text-2xl font-extrabold leading-none">3 days</span>
            <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/90">survey → online</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
