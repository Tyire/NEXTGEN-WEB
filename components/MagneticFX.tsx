"use client";

import { useEffect } from "react";

/**
 * Magnetic CTAs — the few buttons marked `data-magnetic` lean toward the
 * cursor, nudge their arrow, and spring back on release (Modish's ButtonFX).
 *
 * Kept deliberately rare (only the primary conversion buttons) and mouse-only:
 * GSAP is import()ed on the first real mouse movement, so phones and
 * keyboard users never download it. Skipped entirely under reduced motion.
 */
export function MagneticFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let cleanup: (() => void) | undefined;

    const boot = async (first: PointerEvent) => {
      if (first.pointerType !== "mouse") return;
      window.removeEventListener("pointermove", boot);
      const { gsap } = await import("gsap");
      const offs: (() => void)[] = [];

      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const arrow = el.querySelector("svg");
        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          xTo(dx * 0.09);
          yTo(dy * 0.14);
          if (arrow) gsap.to(arrow, { x: 3, duration: 0.25, ease: "power2.out" });
        };
        const leave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.7)" });
          if (arrow) gsap.to(arrow, { x: 0, duration: 0.3, ease: "power2.out" });
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        offs.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
      cleanup = () => offs.forEach((f) => f());
    };

    window.addEventListener("pointermove", boot, { passive: true });
    return () => {
      window.removeEventListener("pointermove", boot);
      cleanup?.();
    };
  }, []);

  return null;
}
