import { Container, Arrow } from "@/components/ui";
import { coverageZones } from "@/lib/site";

// Schematic positions only: these are coverage areas, not surveyed fiber routes.
const nodes = [
  { label: "Ikate", x: 125, y: 195 },
  { label: "Lekki", x: 75, y: 295 },
  { label: "Ajah", x: 415, y: 150 },
  { label: "Ilasan", x: 250, y: 245 },
  { label: "Orchid", x: 345, y: 300 },
].filter(({ label }) => coverageZones.some((zone) => zone === label));

export function NetworkMap() {
  return (
    <section className="cinema-dark relative overflow-hidden py-20 md:py-28" aria-labelledby="network-map-title">
      <div aria-hidden="true" className="blob absolute -left-24 -top-24 h-96 w-96" style={{ "--blob-c": "rgba(212,168,67,0.12)" } as React.CSSProperties} />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="sr">
            <p className="eyebrow mb-4">Across Lagos</p>
            <h2 id="network-map-title" className="display text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Closer to <span className="text-[var(--color-brand-orange)]">home.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
              Find NextGen in estates across Lekki, Ikate, Ilasan, Orchid and Ajah.
              Check your estate for available plans and installation details.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Coverage areas and estates">
              {coverageZones.slice(0, 10).map((zone) => (
                <li key={zone} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80">{zone}</li>
              ))}
            </ul>
            <a href="/plans#coverage" className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--gold)] transition-colors hover:text-white">
              Check your estate coverage <Arrow />
            </a>
          </div>
          <figure className="sr-pop min-w-0">
            <svg viewBox="0 0 520 420" className="network-map w-full" role="img" aria-labelledby="network-map-svg-title network-map-svg-description">
              <title id="network-map-svg-title">NextGen coverage areas in Lagos</title>
              <desc id="network-map-svg-description">Schematic showing Ikate, Lekki, Ajah, Ilasan and Orchid. Positions and connecting lines are illustrative, not geographical routes.</desc>
              <defs>
                <pattern id="network-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.045)" />
                </pattern>
                <radialGradient id="network-glow">
                  <stop stopColor="#d4a843" stopOpacity="0.3" />
                  <stop offset="1" stopColor="#d4a843" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="520" height="420" fill="url(#network-grid)" />
              <text x="32" y="48" fill="#d4a843" fontSize="12" letterSpacing="3">LAGOS / FIBER COVERAGE</text>
              <path d="M 30 345 Q 150 310 260 355 T 490 325" fill="none" stroke="rgba(212,168,67,0.18)" strokeWidth="2" />
              <path className="network-link" d="M 75 295 L 125 195 L 250 245 L 415 150 M 250 245 L 345 300 L 415 150" fill="none" stroke="#d4a843" strokeOpacity="0.65" strokeWidth="2" />
              {nodes.map(({ label, x, y }) => (
                <g key={label}>
                  <circle cx={x} cy={y} r="32" fill="url(#network-glow)" />
                  <circle cx={x} cy={y} r="15" fill="none" stroke="#d4a843" strokeOpacity="0.35" />
                  <circle cx={x} cy={y} r="6" fill="var(--color-brand-orange)" />
                  <circle cx={x} cy={y} r="2" fill="white" />
                  <text x={x + 22} y={y + 5} fill="#eef1f8" fontSize="16" fontWeight="600">{label}</text>
                </g>
              ))}
            </svg>
            <figcaption className="mt-4 text-xs leading-relaxed text-white/70">
              Coverage illustration, not a street map. Availability is confirmed per estate.
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
