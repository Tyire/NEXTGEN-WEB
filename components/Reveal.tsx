"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

/**
 * Opacity/transform scroll reveal — IntersectionObserver based.
 *
 * Hard rule (learned the painful way on Modish + NextGen): NEVER hide with
 * clip-path/height. Chrome computes IO intersection from the *clipped* box, so
 * a clipped element reads 0% ratio forever and never reveals. Opacity+translate
 * only. Content is ALWAYS revealed — on intersect, under reduced-motion, or via
 * a fail-safe timeout — so it can never get stuck hidden on mobile.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  /** stagger delay in seconds */
  delay?: number;
  /** initial translateY in px */
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    // Fail-safe: reveal no matter what after a grace period.
    const t = window.setTimeout(() => el.classList.add("is-in"), 2200);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-up ${className}`}
      style={{ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
