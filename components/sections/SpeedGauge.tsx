import { Container } from "@/components/ui";

// Illustrative gigabit gauge; this does not measure the visitor's connection.
const R = 130;
const CIRC = 2 * Math.PI * R;
const MAX_SPEED = 1000;
const ORBIT_R     = R + 22;     // px — orbit radius for particles

// Particle count and their starting angles
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  angle: (i / 8) * 360,
}));

export function SpeedGauge() {
  return (
    <section
      data-speed-gauge=""
      data-speed-target={MAX_SPEED}
      aria-labelledby="speed-gauge-title"
      className="cinema-dark relative overflow-hidden py-20 md:py-28"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="blob drift absolute right-[-5%] top-[-10%] h-[500px] w-[500px]"
        style={{ "--blob-c": "rgba(255,107,44,0.09)" } as React.CSSProperties}
      />
      <div
        aria-hidden="true"
        className="blob absolute bottom-[-15%] left-[-8%] h-[440px] w-[440px]"
        style={{ "--blob-c": "rgba(212,168,67,0.07)", animationDelay: "-9s" } as React.CSSProperties}
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">

          {/* Left: gauge */}
          <div className="flex flex-col items-center">
            {/* Gauge SVG */}
            <div
              className="relative"
              style={{ width: (R + 40) * 2, aspectRatio: "1", maxWidth: "100%" }}
            >
              {/* Orbit particles */}
              {PARTICLES.map((p, i) => (
                <div
                  key={i}
                  className="gauge-particle"
                  style={
                    {
                      "--angle": `${p.angle}deg`,
                      "--orbit-r": `${ORBIT_R}px`,
                      opacity: 0,
                    } as React.CSSProperties
                  }
                  aria-hidden="true"
                />
              ))}

              <svg
                viewBox={`0 0 ${(R + 40) * 2} ${(R + 40) * 2}`}
                className="h-full w-full"
                aria-label="Illustrative 1,000 Mbps fiber speed, not a live speed test"
                role="img"
              >
                <defs>
                  <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#ff1f4d" />
                    <stop offset="48%"  stopColor="#ff6b2c" />
                    <stop offset="100%" stopColor="#ffa70f" />
                  </linearGradient>
                  {/* Gold tick-mark gradient for the track */}
                  <linearGradient id="track-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="rgba(212,168,67,0.18)" />
                    <stop offset="100%" stopColor="rgba(212,168,67,0.06)" />
                  </linearGradient>
                </defs>

                {/* Track ring (gold — Kimi accent) */}
                <circle
                  cx={R + 40}
                  cy={R + 40}
                  r={R}
                  fill="none"
                  stroke="url(#track-grad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                />

                {/* Progress ring — GSAP animates strokeDashoffset */}
                <circle
                  cx={R + 40}
                  cy={R + 40}
                  r={R}
                  fill="none"
                  stroke="url(#gauge-grad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={0}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                />

                {/* Speed readout */}
                <text
                  data-speed-value=""
                  x={R + 40}
                  y={R + 40 - 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontFamily="var(--font-display), Arial, sans-serif"
                  fontWeight="800"
                  fontSize="52"
                  letterSpacing="-2"
                >
                  {MAX_SPEED}
                </text>
                <text
                  x={R + 40}
                  y={R + 40 + 34}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(238,241,248,0.55)"
                  fontFamily="var(--font-display), Arial, sans-serif"
                  fontWeight="600"
                  fontSize="13"
                  letterSpacing="2"
                >
                  Mbps
                </text>

                {/* Tick marks around the ring (gold — Kimi accent) */}
                {Array.from({ length: 24 }, (_, i) => {
                  const angle  = (i / 24) * 360 - 90;
                  const rad    = (angle * Math.PI) / 180;
                  const inner  = R - 10;
                  const outer  = R - 2;
                  const cx0    = R + 40 + inner * Math.cos(rad);
                  const cy0    = R + 40 + inner * Math.sin(rad);
                  const cx1    = R + 40 + outer * Math.cos(rad);
                  const cy1    = R + 40 + outer * Math.sin(rad);
                  return (
                    <line
                      key={i}
                      x1={cx0} y1={cy0} x2={cx1} y2={cy1}
                      stroke={i % 6 === 0 ? "rgba(212,168,67,0.6)" : "rgba(212,168,67,0.2)"}
                      strokeWidth={i % 6 === 0 ? 2 : 1}
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Result chips — fade in after gauge completes */}
            <div
              className="mt-6 flex flex-wrap justify-center gap-3"
              aria-label="Speed illustration details"
            >
              {[
                { label: "Illustration", value: "1 Gbps", color: "rgba(255,107,44,0.15)", border: "rgba(255,107,44,0.3)" },
                { label: "Availability", value: "Check your plan", color: "rgba(212,168,67,0.12)", border: "rgba(212,168,67,0.3)" },
              ].map(({ label, value, color, border }) => (
                <div
                  key={label}
                  className="rounded-xl px-5 py-3 text-center"
                  style={{ background: color, border: `1px solid ${border}` }}
                >
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/70">{label}</p>
                  <p className="display mt-1 text-lg font-extrabold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: copy */}
          <div className="sr">
            <p className="eyebrow mb-4">Fiber speed, illustrated</p>
            <h2 id="speed-gauge-title" className="display text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Room to do
              <br />
              <span
                style={{
                  background: "linear-gradient(115deg,#ff1f4d,#ff6b2c 48%,#ffa70f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                more.
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
              Stream, work and upload over fiber straight to your premises. This animation
              illustrates gigabit bandwidth; it is not a live speed test. Your speed depends
              on your selected plan, equipment and connection conditions.
            </p>

            <ul className="mt-8 grid gap-4">
              {[
                { stat: "2.5 Gbps",    label: "Maximum fiber tier (STM-16)",         color: "#ff6b2c" },
                { stat: "Symmetrical", label: "Same upload and download speeds",       color: "#d4a843" },
              ].map(({ stat, label, color }) => (
                <li key={stat} className="flex items-center gap-4">
                  <span
                    className="display shrink-0 text-2xl font-extrabold"
                    style={{ color }}
                  >
                    {stat}
                  </span>
                  <span className="text-sm text-white/70">{label}</span>
                </li>
              ))}
            </ul>

            <a
              href="/plans"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-orange)] hover:text-white transition-colors"
            >
              Explore fiber plans
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 8h12M9 3l5 5-5 5" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
