"use client";

import { useEffect } from "react";

/**
 * Lenis smooth-scroll for the buttery desktop-wheel feel (Modish-style).
 * Touch is left NATIVE (Lenis default syncTouch:false) — that was the source of
 * last session's mobile jank, so we never smooth touch. Dynamically imported so
 * it stays out of the initial bundle, and skipped entirely under reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let raf = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      // Expose for imperative scrollers (BackToTop) — window.scrollTo fights Lenis.
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      delete (window as unknown as { __lenis?: unknown }).__lenis;
    };
  }, []);

  return null;
}
