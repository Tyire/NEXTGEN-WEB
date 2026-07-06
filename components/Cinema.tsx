"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * GSAP ScrollTrigger "cinema" layer — attention-catching set pieces that are
 * ALL pure enhancement. Content reveals stay CSS scroll-driven (globals.css);
 * this layer only adds what CSS can't:
 *  - scroll progress beam under the header
 *  - hero video parallax
 *  - stat counters that count up ([data-count])
 *  - ghost background words drift sideways as you scroll
 * If this bundle never loads, the site is merely calmer — never broken.
 */
export function Cinema() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    // Lenis smooth scroll — DESKTOP ONLY. Iron rule from the July rebuild:
    // Lenis never initializes on touch devices (it was part of the original
    // mobile breakage). Native scroll stays untouched there.
    let lenis: Lenis | null = null;
    let lenisTick: ((time: number) => void) | null = null;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      lenis = new Lenis({
        duration: 1.3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      lenisTick = (time) => lenis!.raf(time * 1000);
      gsap.ticker.add(lenisTick);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      // 1. Scroll progress beam
      const beam = document.querySelector(".progress-beam");
      if (beam) {
        gsap.to(beam, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.4 },
        });
      }

      // 2. Hero parallax — the video drifts slower than the page
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const holder = el.parentElement;
        if (!holder) return;
        gsap.to(el, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: holder, start: "top top", end: "bottom top", scrub: true },
        });
      });

      // 3. Stat counters — "99.9%", "2.5 Gbps", "3-day" count up on entry
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const original = el.textContent || "";
        const m = original.match(/^([\d.]+)(.*)$/);
        if (!m) return;
        const target = parseFloat(m[1]);
        const suffix = m[2];
        const decimals = (m[1].split(".")[1] || "").length;
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = state.v.toFixed(decimals) + suffix;
          },
          onComplete: () => {
            el.textContent = original; // exact final value, always
          },
        });
      });

      // 4. Ghost words drift sideways for depth
      document.querySelectorAll<HTMLElement>(".ghost").forEach((el) => {
        gsap.to(el, {
          xPercent: gsap.utils.random(-4, 4, 1),
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
    });

    return () => {
      ctx.revert();
      if (lenisTick) gsap.ticker.remove(lenisTick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
