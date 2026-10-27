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
          <h2 className="display text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl">
            Built like a <span className="accent-word">carrier.</span>
            <br />
            Priced like a neighbour.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
            NextGen runs its own GPON fiber network — no resold capacity, no cabinet copper. That&rsquo;s
            why the speeds are symmetrical, the latency stays low at 9pm, and an engineer who actually
            knows your estate picks up when you call.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--color-hairline)] pt-6">
            {trustStats.map((s, i) => (
              <div key={s.label} className="sr-pop flex flex-col-reverse" style={{ animationDelay: `${i * 0.07}s` }}>
                <dt className="mt-2 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">{s.label}</dt>
                <dd data-count="" className="display text-[2rem] leading-none sm:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="sr-pop relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius)] border border-[var(--color-hairline)] sm:aspect-[4/3]">
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
          <p className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-black/55 py-2 pl-3 pr-4 text-white backdrop-blur-md">
            <span className="live-dot" aria-hidden="true" />
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.16em]">3 days · survey to online</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
