"use client";

import { useEffect, useRef } from "react";

/**
 * Very subtle cursor trail — a thin brand-orange ribbon that follows the
 * pointer and dissolves when it rests. Desktop pointers only; never mounts
 * any work on touch devices or under reduced motion. Pure decoration:
 * pointer-events none, aria-hidden, and the site is identical without it.
 */
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    const trail: { x: number; y: number }[] = [];
    let mouse: { x: number; y: number } | null = null;
    let idleFrames = 0;

    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      idleFrames = 0;
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (mouse) {
        trail.unshift({ ...mouse });
        if (trail.length > 16) trail.pop();
      }
      // when the pointer rests, let the ribbon dissolve from the tail
      if (++idleFrames > 2 && trail.length) trail.pop();

      if (trail.length > 2) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < trail.length; i++) {
          const t = 1 - i / trail.length; // 1 at cursor → 0 at tail
          ctx.strokeStyle = `rgba(255, 107, 44, ${0.22 * t})`;
          ctx.lineWidth = 1.5 * t + 0.3;
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", size);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", size);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]" />;
}
