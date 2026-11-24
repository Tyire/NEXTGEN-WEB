"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { CAMERA, HUB, LAGOS, MAP_LABEL, ROUTES, VIEW } from "@/lib/network-map";
import { LAGOS_PATH, LAND_PATH, NIGERIA_PATH } from "@/lib/reach-land";

/**
 * Home hero background: NextGen's network lighting up from Lagos.
 * (Animations library #22, adapted: one hub, sunset colours, always dark.)
 *
 * Timeline (CSS only, keyframes in app/hero-network.css):
 *  0.0s  camera close on Lagos; Nigeria's border and Lagos State draw in
 *  1.9s  fibre routes shoot out to Nigerian cities, each lands with a ripple
 *  2.4s  camera pulls back to the world; West Africa, then subsea landings
 *  5.2s  idle: packets race along every route, Lagos beats
 * The server HTML is the finished frame (no JS, reduced motion). The hidden
 * start state is keyed on html.js + no .hn-play, so there is no flash of the
 * end frame before hydration. .hn-paused stops every loop off-screen.
 */
export function HeroNetwork({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("hn-play");
      return;
    }
    // Next frame, so the hidden state paints once and the intro plays from it.
    const raf = requestAnimationFrame(() => el.classList.add("hn-play"));
    const io = new IntersectionObserver(([e]) => el.classList.toggle("hn-paused", !e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const camStyle = {
    "--hn-s": CAMERA.s,
    "--hn-tx": `${CAMERA.tx}px`,
    "--hn-ty": `${CAMERA.ty}px`,
    "--hn-inv": CAMERA.inv,
  } as CSSProperties;

  return (
    <div ref={ref} className={`hn ${className}`}>
      <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} role="img" aria-label={MAP_LABEL} preserveAspectRatio="xMidYMid meet" className="h-full w-full">
        <defs>
          <linearGradient id="hn-sun" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffb020" />
            <stop offset="0.35" stopColor="#ff6b2c" />
            <stop offset="0.7" stopColor="#ff3d5a" />
            <stop offset="1" stopColor="#e0368f" />
          </linearGradient>
          <radialGradient id="hn-glow">
            <stop offset="0" stopColor="#ff6b2c" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ff6b2c" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="hn-cam" style={camStyle}>
          <g aria-hidden="true">
            <path d={LAND_PATH} className="hn-land" />
            <path d={NIGERIA_PATH} className="hn-ng-fill" />
            <path d={NIGERIA_PATH} pathLength={1} className="hn-ng" />
            <path d={LAGOS_PATH} className="hn-lag-fill" />
            <path d={LAGOS_PATH} pathLength={1} className="hn-lag" />
            <circle cx={LAGOS.x} cy={LAGOS.y} r={70} fill="url(#hn-glow)" className="hn-bloom" />
          </g>

          {/* routes: arc + glowing packet + white-hot core */}
          <g aria-hidden="true">
            {ROUTES.map((r) => (
              <g key={r.name} style={{ ["--d" as string]: `${r.delay}s`, ["--i" as string]: `${r.idle}s` }}>
                <path d={r.d} pathLength={1} className={`hn-arc hn-t${r.tier}`} stroke="url(#hn-sun)" />
                <path d={r.d} pathLength={1} className="hn-pkt hn-pkt-glow" />
                <path d={r.d} pathLength={1} className="hn-pkt" />
              </g>
            ))}
          </g>

          {/* nodes */}
          <g aria-hidden="true">
            {ROUTES.map((r) => {
              const x = HUB.x + r.x;
              const y = HUB.y + r.y;
              return (
                <g key={r.name} style={{ ["--d" as string]: `${r.delay}s`, ["--i" as string]: `${r.idle}s` }}>
                  <circle cx={x} cy={y} r={9} className="hn-halo" />
                  <circle cx={x} cy={y} r={9} className="hn-halo hn-halo-idle" />
                  <circle cx={x} cy={y} r={r.tier === 3 ? 4.5 : 3.5} className="hn-dot" />
                  {r.label && (
                    <text x={x + (r.lx ?? 12)} y={y + (r.ly ?? 5)} textAnchor={r.anchor ?? "start"} className={`hn-label${r.tier === 3 ? " hn-far" : ""}`}>
                      {r.name}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* Lagos hub */}
          <g aria-hidden="true">
            <circle cx={LAGOS.x} cy={LAGOS.y} r={8} className="hn-ripple" />
            <circle cx={LAGOS.x} cy={LAGOS.y} r={8} className="hn-ripple hn-ripple-2" />
            <circle cx={LAGOS.x} cy={LAGOS.y} r={6.5} className="hn-hub" />
            <circle cx={LAGOS.x} cy={LAGOS.y} r={2.6} className="hn-hub-core" />
            <text x={LAGOS.x - 14} y={LAGOS.y + 26} textAnchor="end" className="hn-label hn-label-hub" style={{ transformOrigin: `${LAGOS.x}px ${LAGOS.y}px` }}>
              Lagos
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
