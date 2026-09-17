"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  useEffect(() => {
    let cancelled = false;
    // Wait for the browser to finish first paint before booting GSAP/Lenis so
    // the ~200KB scroll layer never competes with initial render. Falls back
    // to a small timeout on browsers without requestIdleCallback (Safari).
    const idle = (cb: () => void) => {
      const w = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
      if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout: 800 });
      else setTimeout(cb, 200);
    };
    let cleanup: (() => void) | undefined;
    idle(() => {
      if (cancelled) return;
      cleanup = boot();
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };

    function boot() {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 768px) and (hover: hover) and (pointer: fine)" }, (context) => {
      if (!context.conditions?.motion) return;
      const restore: (() => void)[] = [];

      // Lenis smooth scroll — DESKTOP ONLY. Iron rule from the July rebuild:
      // Lenis never initializes on touch devices (it was part of the original
      // mobile breakage). Native scroll stays untouched there.
      const desktop = Boolean(context.conditions.desktop);
      let lenis: Lenis | null = null;
      let lenisTick: ((time: number) => void) | null = null;
      if (desktop) {
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
          restore.push(() => { el.textContent = original; });
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

        // 5. Pinned pricing sweep — vertical scroll pauses while the plan cards
        // travel horizontally through view, so every plan is seen. Only runs on
        // wide desktop viewports (>=768px). Narrow viewport OR touch device
        // keeps .plans-carousel as native swipe + dot pagination.
        const wideDesktop = desktop && window.matchMedia("(min-width: 768px)").matches;
        if (wideDesktop) {
          const track = document.querySelector<HTMLElement>(".plans-carousel");
          const section = track?.closest("section");
          if (track && section) {
            track.classList.add("is-pinned");
            restore.push(() => track.classList.remove("is-pinned"));
            const dist = () => track.scrollWidth - track.clientWidth;
            if (dist() > 40) {
              gsap.to(track, {
                x: () => -dist(),
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: () => (section.offsetHeight > window.innerHeight ? "bottom bottom" : "top top"),
                  end: () => "+=" + dist(),
                  pin: true,
                  scrub: 0.5,
                  invalidateOnRefresh: true,
                },
              });
            } else {
              track.classList.remove("is-pinned");
            }
          }
        }

        // Donor flythrough, initialized only after the server-visible content exists.
        const flythrough = document.querySelector<HTMLElement>("[data-flythrough]");
        if (flythrough) {
          flythrough.classList.add("is-animated");
          restore.push(() => flythrough.classList.remove("is-animated"));
          const shapes = gsap.utils.toArray<HTMLElement>("[data-flythrough-shape]", flythrough);
          const active = desktop ? shapes : shapes.slice(0, 20);
          if (!desktop) gsap.set(shapes.slice(20), { display: "none" });
          const tl = gsap.timeline({ scrollTrigger: {
            trigger: flythrough, start: "top top", end: "bottom bottom", scrub: 0.8,
          } });
          active.forEach((shape) => {
            const delay = Number(shape.dataset.shapeDelay || 0);
            tl.fromTo(shape, { opacity: 0, z: -2000, scale: 0.05 }, {
              opacity: 0.7, z: 500, scale: 2.5, ease: "power1.in", duration: 0.65,
            }, delay).to(shape, {
              opacity: 0, z: 1200, scale: 4, ease: "power2.in", duration: 0.15,
            }, delay + 0.6);
          });
          // Keep copy legible throughout the sequence, including its first and last frame.
          tl.fromTo(flythrough.querySelector("[data-flythrough-text]"), { y: 12 }, { y: -12, ease: "none", duration: 1 }, 0);
        }

        const gauge = document.querySelector<HTMLElement>("[data-speed-gauge]");
        if (gauge) {
          const ring = gauge.querySelector<SVGCircleElement>("circle[stroke-dasharray]");
          const value = gauge.querySelector<SVGTextElement>("[data-speed-value]");
          const target = Number(gauge.dataset.speedTarget);
          const particles = gauge.querySelectorAll<HTMLElement>(".gauge-particle");
          restore.push(() => particles.forEach((particle) => particle.style.removeProperty("animation-play-state")));
          if (ring && value && Number.isFinite(target) && target > 0) {
            const circumference = Number(ring.getAttribute("stroke-dasharray"));
            const state = { speed: 0 };
            const original = value.textContent;
            restore.push(() => { value.textContent = original; ring.style.removeProperty("stroke-dashoffset"); });
            gsap.to(state, {
              speed: target, duration: 2, ease: "power2.inOut",
              scrollTrigger: { trigger: gauge, start: "top 75%", once: true },
              onUpdate: () => {
                value.textContent = String(Math.round(state.speed));
                ring.style.strokeDashoffset = String(circumference * (1 - state.speed / target));
              },
            });
            gsap.to(gauge.querySelectorAll(".gauge-particle"), {
              opacity: 0.7, duration: 0.3, repeat: 1, yoyo: true, repeatDelay: 1.4,
              scrollTrigger: { trigger: gauge, start: "top 75%", once: true },
              onStart: () => { gsap.set(gauge.querySelectorAll(".gauge-particle"), { animationPlayState: "running" }); },
              onComplete: () => { gsap.set(gauge.querySelectorAll(".gauge-particle"), { animationPlayState: "paused" }); },
            });
          }
        }
      });

      return () => {
        ctx.revert();
        restore.forEach((reset) => reset());
        if (lenisTick) gsap.ticker.remove(lenisTick);
        lenis?.destroy();
      };
    });
    return () => media.revert();
    }
  }, [pathname]);

  return null;
}
