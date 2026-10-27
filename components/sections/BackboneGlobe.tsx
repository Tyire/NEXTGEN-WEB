"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useReducedMotion, useSpring } from "motion/react";

/**
 * Lagos → the transatlantic cables. A cobe WebGL globe (≈5 KB, from the
 * UI-Layouts globe pattern) focused on West Africa, with arcs from Lagos to
 * where each cable system lands. ILLUSTRATIVE: arcs show landing regions,
 * not surveyed cable routes (same honesty rule as the Lagos network map).
 *
 * Motion: a slow sway around Lagos, plus drag-to-spin on a spring (Motion's
 * useSpring) so it has momentum instead of tracking the pointer rigidly.
 * Reduced motion: one still frame, no sway. Canvas pauses off-screen.
 */

import { LAGOS, backboneLandings as LANDINGS } from "@/data/backbone";

const ACCENT: [number, number, number] = [1, 0.42, 0.17];
// Rotation that puts Lagos (lon 3.39) facing the viewer.
const FOCUS_PHI = Math.PI - ((LAGOS[1] * Math.PI) / 180 - Math.PI / 2);

export function BackboneGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const drag = useSpring(0, { stiffness: 60, damping: 18, mass: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.offsetWidth;
    const onResize = () => (width = canvas.offsetWidth);
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: FOCUS_PHI,
      theta: 0.22,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 18000,
      mapBrightness: 3.2,
      mapBaseBrightness: 0.02,
      baseColor: [0.28, 0.28, 0.28],
      markerColor: ACCENT,
      glowColor: [0.12, 0.12, 0.12],
      opacity: 0.95,
      scale: 1.05,
      markers: [
        { location: LAGOS, size: 0.09, color: ACCENT },
        ...LANDINGS.map((l) => ({ location: l.at, size: 0.04, color: [0.9, 0.9, 0.9] as [number, number, number] })),
      ],
      arcs: LANDINGS.map((l) => ({ from: LAGOS, to: l.at })),
      arcColor: ACCENT,
      arcWidth: 0.6,
      arcHeight: 0.3,
    });

    let raf = 0;
    let t = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "100px" });
    io.observe(canvas);

    const frame = () => {
      if (visible) {
        t += 0.006;
        globe.update({
          phi: FOCUS_PHI + Math.sin(t) * 0.45 + drag.get(),
          width: width * 2,
          height: width * 2,
        });
      }
      raf = requestAnimationFrame(frame);
    };
    if (reduce) {
      globe.update({ phi: FOCUS_PHI });
    } else {
      raf = requestAnimationFrame(frame);
    }

    // Fade in once WebGL has painted, so there's no blank-square flash.
    requestAnimationFrame(() => (canvas.style.opacity = "1"));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [reduce, drag]);

  // Drag to spin (mouse or touch); the spring carries momentum on release.
  const start = useRef<{ x: number; base: number } | null>(null);
  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    start.current = { x: e.clientX, base: drag.get() };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!start.current) return;
    drag.set(start.current.base + (e.clientX - start.current.x) / 160);
  };
  const onUp = () => (start.current = null);

  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="h-full w-full cursor-grab touch-pan-y opacity-0 transition-opacity duration-700 active:cursor-grabbing"
      />
    </div>
  );
}
