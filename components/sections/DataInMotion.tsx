"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Data in Motion — scroll-driven 3D geometric flythrough.
 * Ported from the Website-Redesign_kimi-TRAE GeometricFlythrough section.
 * Pure GSAP ScrollTrigger, no React state during animation loop (perf safe).
 * Static-export compatible: imports GSAP lazily so the server bundle stays clean.
 */

interface ShapeConfig {
  el: HTMLDivElement;
  startZ: number;
  endZ: number;
  endScale: number;
  targetOpacity: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scrollStart: number;
  scrollEnd: number;
  isDiamond: boolean;
}

function generateShapes(container: HTMLElement, count: number): ShapeConfig[] {
  const shapes: ShapeConfig[] = [];
  const colors = [
    { color: "#ff6b2c", weight: 0.38 },
    { color: "#ff1f4d", weight: 0.32 },
    { color: "#ffa70f", weight: 0.30 },
  ];

  for (let i = 0; i < count; i++) {
    const typeRoll = Math.random();
    const type = typeRoll < 0.6 ? "square" : typeRoll < 0.85 ? "diamond" : "rectangle";

    let width: number, height: number;
    if (type === "rectangle") {
      width = 120 + Math.random() * 130;
      height = 30 + Math.random() * 35;
    } else {
      const size = 24 + Math.random() * 120;
      width = size;
      height = size;
    }

    const colorPick = Math.random();
    let selectedColor = colors[0];
    let cumulative = 0;
    for (const c of colors) {
      cumulative += c.weight;
      if (colorPick <= cumulative) { selectedColor = c; break; }
    }

    const opacityBase =
      selectedColor.color === "#ff6b2c"
        ? 0.22 + Math.random() * 0.32
        : 0.18 + Math.random() * 0.28;

    const isDiamond = type === "diamond";
    const el = document.createElement("div");
    el.style.cssText = `position:absolute;left:${-20 + Math.random() * 140}%;top:${-20 + Math.random() * 140}%;width:${width}px;height:${height}px;background:${selectedColor.color};opacity:0;will-change:transform,opacity;backface-visibility:hidden;border-radius:${isDiamond ? "2px" : "0"};`;
    if (isDiamond) el.style.transform = "rotate(45deg)";
    container.appendChild(el);

    shapes.push({
      el,
      startZ: -1800 + Math.random() * 1000,
      endZ: 180 + Math.random() * 260,
      endScale: 1.4 + Math.random() * 1.4,
      targetOpacity: opacityBase,
      rotationX: -180 + Math.random() * 360,
      rotationY: -180 + Math.random() * 360,
      rotationZ: isDiamond ? 45 + Math.random() * 90 : -90 + Math.random() * 180,
      scrollStart: 0.05 + (i / count) * 0.9,
      scrollEnd: Math.min(1, 0.05 + (i / count) * 0.9 + 0.15 + Math.random() * 0.2),
      isDiamond,
    });
  }
  return shapes;
}

export function DataInMotion() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shapeLayerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const shapeLayer = shapeLayerRef.current;
    const textEl = textRef.current;
    if (!section || !shapeLayer || !textEl) return;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Clear any existing shapes
      shapeLayer.innerHTML = "";
      ScrollTrigger.getAll().forEach((t) => { if (t.trigger === section) t.kill(); });

      const shapeCount = isMobile ? 18 : 42;
      const shapes = generateShapes(shapeLayer, shapeCount);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      shapes.forEach((shape) => {
        const localStart = (shape.scrollStart - 0.05) / 0.9;
        const localEnd = (shape.scrollEnd - 0.05) / 0.9;
        const duration = localEnd - localStart;

        tl.fromTo(
          shape.el,
          { z: shape.startZ, scale: 0, opacity: 0, rotationX: 0, rotationY: 0, rotationZ: shape.isDiamond ? 45 : 0 },
          { z: shape.endZ, scale: shape.endScale, opacity: shape.targetOpacity, rotationX: shape.rotationX, rotationY: shape.rotationY, rotationZ: shape.rotationZ, duration, ease: "none" },
          localStart
        );
        tl.to(shape.el, { opacity: 0, duration: duration * 0.1, ease: "none" }, localStart + duration * 0.9);
      });

      tl.fromTo(textEl, { opacity: 0, scale: 0.93 }, { opacity: 1, scale: 1, duration: 0.12, ease: "power2.out" }, 0.25);
      tl.to(textEl, { opacity: 0, scale: 0.95, duration: 0.12, ease: "power2.in" }, 0.68);
    })();

    return () => {
      if (shapeLayerRef.current) shapeLayerRef.current.innerHTML = "";
    };
  }, [isMobile, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0f050b] dark:bg-[#0f050b]"
      style={{ height: reducedMotion ? "60vh" : "200vh" }}
      aria-label="Data in motion visualisation"
    >
      {/* SVG turbulence filter for organic shape distortion */}
      <svg style={{ display: "none", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="ng-turbulence">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="28" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ perspective: isMobile ? "600px" : "1000px", perspectiveOrigin: "50% 50%" }}
      >
        {/* Shape layer */}
        <div
          ref={shapeLayerRef}
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", overflow: "visible" }}
          aria-hidden="true"
        />

        {/* Ambient gradient tint */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(255,107,44,0.06),transparent_70%)]"
        />

        {/* Centre text — fades in mid-scroll, fades out at end */}
        <div
          ref={textRef}
          className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center ${reducedMotion ? "opacity-100" : "opacity-0"}`}
        >
          <p className="eyebrow mb-4 text-white/60">The NextGen Network</p>
          <h2
            className="display text-3xl font-extrabold text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: "0 0 80px rgba(13,13,13,0.95)" }}
          >
            Data in
            <br />
            <span className="text-flow">Motion.</span>
          </h2>
          <p className="mt-5 max-w-md text-base text-white/70 md:text-lg">
            Unlimited fiber. Zero buffering. Symmetrical speeds across Lagos and Nigeria.
          </p>
        </div>
      </div>
    </section>
  );
}
