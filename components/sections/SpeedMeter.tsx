"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SpeedMeter — animated speed gauge that counts from 0 to 1 Gbps download
 * and 0 to 700 Mbps upload when it scrolls into view.
 * Mimics a real speed test UI. Uses IntersectionObserver (no GSAP dependency).
 */

const DOWNLOAD_PEAK = 1000; // Mbps
const UPLOAD_PEAK = 700;    // Mbps
const LATENCY = 4;          // ms

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

function useCountUp(target: number, duration = 2200, active = false) {
  const [value, setValue] = useState(0);
  const raf = useRef<number>(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    startTime.current = null;
    cancelAnimationFrame(raf.current);

    function tick(now: number) {
      if (startTime.current === null) startTime.current = now;
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, duration]);

  return value;
}

function Gauge({
  speed,
  peak,
  label,
  active,
}: {
  speed: number;
  peak: number;
  label: string;
  active: boolean;
}) {
  const displayed = useCountUp(speed, label === "Download" ? 2200 : 1800, active);
  const r = 108;
  const circ = 2 * Math.PI * r;
  // Arc goes from -225° to +45° (270° sweep) — standard speedometer style.
  const sweep = 270;
  const dashArray = (sweep / 360) * circ;
  const dashOffset = dashArray * (1 - displayed / peak);
  // We only draw 3/4 of the circle; rotate so it starts bottom-left.
  const rotation = 135;

  const unitLabel = label === "Latency" ? "ms" : displayed >= 1000 ? "Gbps" : "Mbps";
  const displayValue = label === "Latency" ? displayed : displayed >= 1000 ? (displayed / 1000).toFixed(1) : displayed;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[240px] w-[240px]">
        <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={`gauge-grad-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff1f4d" />
              <stop offset="50%" stopColor="#ff6b2c" />
              <stop offset="100%" stopColor="#ffa70f" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle
            cx="120" cy="120" r={r}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="10"
            strokeDasharray={`${dashArray} ${circ}`}
            strokeLinecap="round"
            transform={`rotate(${rotation} 120 120)`}
          />
          {/* Fill */}
          <circle
            cx="120" cy="120" r={r}
            fill="none"
            stroke={`url(#gauge-grad-${label})`}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${dashArray} ${circ}`}
            strokeDashoffset={dashOffset}
            transform={`rotate(${rotation} 120 120)`}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>

        {/* Orbital dots */}
        {active && [0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute rounded-full"
            aria-hidden="true"
            style={{
              width: 6,
              height: 6,
              background: ["#ff1f4d", "#ff6b2c", "#ffa70f", "#ff6b2c"][i],
              top: "50%",
              left: "50%",
              marginTop: -3,
              marginLeft: -3,
              transform: `rotate(${i * 90}deg) translateX(108px)`,
              animation: `ng-orbit ${2 - (displayed / peak) * 1.1}s linear infinite`,
              opacity: 0.35 + (displayed / peak) * 0.55,
            }}
          />
        ))}

        {/* Centre value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="display font-extrabold tabular-nums text-[var(--color-fg)]" style={{ fontSize: "clamp(2rem,7vw,2.6rem)", lineHeight: 1 }}>
            {displayValue}
          </span>
          <span className="eyebrow mt-1 text-[var(--color-fg-faint)]">{unitLabel}</span>
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold text-[var(--color-fg-muted)]">{label}</p>
    </div>
  );
}

export function SpeedMeter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) { setActive(true); return; }

    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28 bg-[var(--color-void)]" aria-label="NextGen fiber speed demonstration">
      {/* ng-orbit keyframe for the orbital speed dots — scoped inline */}
      <style dangerouslySetInnerHTML={{ __html: "@keyframes ng-orbit{to{transform:rotate(360deg) translateX(108px);}}" }} />
      <span aria-hidden="true" className="ghost absolute right-0 top-0 text-[18vw] opacity-40 md:text-[10rem]">SPEED</span>

      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <div className="sr max-w-2xl">
          <p className="eyebrow mb-4">Check your speed</p>
          <h2 className="display text-4xl font-extrabold sm:text-5xl md:text-6xl">
            How fast is{" "}
            <span className="text-[var(--color-brand-orange)]">your internet?</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
            Experience what NextGen fiber feels like — symmetrical speeds up to 1 Gbps with
            sub-5ms latency on our core network.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20">
          <Gauge speed={DOWNLOAD_PEAK} peak={DOWNLOAD_PEAK} label="Download" active={active} />
          <Gauge speed={UPLOAD_PEAK} peak={DOWNLOAD_PEAK} label="Upload" active={active} />
          {/* Latency card — simple, no gauge */}
          <div className="flex flex-col items-center">
            <div className="flex h-[240px] w-[240px] flex-col items-center justify-center rounded-full border-[10px] border-[rgba(255,255,255,0.07)]">
              <span className="display font-extrabold tabular-nums text-[var(--color-brand-orange)]" style={{ fontSize: "clamp(2rem,7vw,2.6rem)", lineHeight: 1 }}>
                {active ? LATENCY : 0}
              </span>
              <span className="eyebrow mt-1 text-[var(--color-fg-faint)]">ms</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-[var(--color-fg-muted)]">Latency</p>
          </div>
        </div>

        {/* Result pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            { label: "Download", val: `${DOWNLOAD_PEAK / 1000} Gbps` },
            { label: "Upload", val: `${UPLOAD_PEAK} Mbps` },
            { label: "Ping", val: `${LATENCY}ms` },
            { label: "Jitter", val: "<1ms" },
          ].map((r) => (
            <div
              key={r.label}
              className="sr-pop rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-surface)] px-6 py-4 text-center"
            >
              <p className="display text-xl font-bold text-[var(--color-brand-orange)]">{r.val}</p>
              <p className="eyebrow mt-1 text-[var(--color-fg-faint)]">{r.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/plans"
            className="group grad-sunset inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white shadow-[0_12px_32px_-12px_rgba(255,60,44,0.6)] transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 active:scale-[0.97]"
          >
            Upgrade your speed
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 8h12M9 3l5 5-5 5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
