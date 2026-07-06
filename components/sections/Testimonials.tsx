import { Container, SectionHead } from "@/components/ui";

/* TODO: replace with real, permission-cleared customer quotes before launch.
   Names/areas below are illustrative placeholders. */
const quotes = [
  {
    quote:
      "Two years of Netflix nights and not one buffering wheel. My kids think slow internet is something from history class.",
    name: "Ada O.",
    meta: "Resident — Lekki Phase 1",
    tilt: "rotate-2",
  },
  {
    quote:
      "I run video calls with clients in London every morning. NextGen's upload speed is the reason they think I work from an office.",
    name: "Tunde A.",
    meta: "Consultant — Ikate",
    tilt: "-rotate-1",
  },
  {
    quote:
      "We moved the whole estate onto their fiber. Installation crew came when they said they would — twice in a row. In Lagos!",
    name: "Mrs. Bello",
    meta: "Estate manager — Ajah",
    tilt: "rotate-1",
  },
  {
    quote:
      "Ranked games at 12ms to the Lagos server. I switched ISPs three times before this one. I'm done switching.",
    name: "Seyi K.",
    meta: "Gamer — Orchid Road",
    tilt: "-rotate-2",
  },
];

/**
 * Sticky stacking testimonials — each card pins to the viewport center and
 * the next one slides over it as you scroll. Pure CSS `position: sticky`,
 * so it works identically with zero JavaScript on every device.
 */
export function Testimonials() {
  return (
    <section data-theme="dark" className="relative overflow-hidden bg-[var(--color-void)] text-[var(--color-fg)]">
      {/* faint blueprint grid, masked toward the top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:54px_54px]"
      />
      <Container className="relative py-16 md:py-20">
        {/* Mobile/tablet heading — desktop uses the sticky right column instead */}
        <SectionHead className="lg:hidden" eyebrow="Word on the street" title={<>Lagos is <span className="text-[var(--color-brand-orange)]">talking.</span></>} />

        <div className="mt-4 grid gap-8 lg:mt-0 lg:grid-cols-[1.1fr_1fr]">
          <div className="grid gap-2">
            {quotes.map((q) => (
              <figure key={q.name} className="sticky top-0 grid h-[82vh] place-content-center">
                <blockquote
                  className={`${q.tilt} max-w-md rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-8 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)]`}
                >
                  <span aria-hidden="true" className="display block text-4xl font-extrabold leading-none text-[var(--color-brand-orange)]">
                    &ldquo;
                  </span>
                  <p className="mt-3 text-lg leading-relaxed">{q.quote}</p>
                  <footer className="mt-6">
                    <p className="display text-sm font-bold">{q.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">{q.meta}</p>
                  </footer>
                </blockquote>
              </figure>
            ))}
          </div>

          <div className="sticky top-0 hidden h-screen place-content-center lg:grid">
            <div className="max-w-sm">
              <p className="eyebrow mb-4">Word on the street</p>
              <h2 className="display text-4xl font-extrabold sm:text-5xl">
                Lagos is <span className="text-[var(--color-brand-orange)]">talking.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--color-fg-muted)]">
                Homes, estates and businesses on real fiber — and what changed for them. Keep
                scrolling; the cards stack.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
