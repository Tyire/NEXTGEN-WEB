"use client";

// Homepage hero backdrop — a swirling torus-knot sculpture, thousands of
// particles woven into a ribbon that drifts and leans toward the cursor.
// Inspired by dhileepkumargm's 21st.dev "Woven Light Hero" (a three.js +
// framer-motion point cloud). Hand-built in plain canvas 2D instead: this
// site has never needed a 3D rendering library (100% canvas-2D/CSS so far,
// kept deliberately light for slower connections), and its own source
// isn't fetchable right now either (21st.dev's free-tier retrieval quota —
// 2/day — is spent for today, and unlike the Klyv particle field this one
// has no public GitHub mirror to pull from instead). A torus-knot sampled
// into particles, rotated and perspective-projected, gets the same "woven
// ribbon of light" read without a scene graph — the real three.js version
// would look more refined up close, but this is the honest trade for
// keeping the homepage's most performance-critical section dependency-free.
// Recolored to NextGen's red→orange→amber instead of the original's
// multicolor palette, so the hero still reads as the brand, not a demo.
//
// Pure decoration: aria-hidden, respects prefers-reduced-motion (one
// static frame, no animation loop), pointer-interactive on desktop only
// (no touch handlers — the auto-rotation keeps it alive on phones).

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  z: number;
  accent: boolean;
}

// Classic (p,q) torus-knot parametric curve, with per-point jitter around
// the tube for a "woven fabric" density rather than a crisp wireframe line.
function buildKnot(count: number): Point[] {
  const p = 3;
  const q = 2;
  const R = 150;
  const r = 60;
  const points: Point[] = [];

  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2 * 6; // multiple passes around for density
    const jitter = () => (Math.random() - 0.5) * 18;

    const x = (R + r * Math.cos(q * t)) * Math.cos(p * t) + jitter();
    const y = (R + r * Math.cos(q * t)) * Math.sin(p * t) + jitter();
    const z = r * Math.sin(q * t) + jitter();

    points.push({ x, y, z, accent: i % 11 === 0 });
  }
  return points;
}

export function WovenParticles({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let points: Point[] = [];

    const pointer = { targetX: 0, targetY: 0, x: 0, y: 0 };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale density to surface area — dense on a wide desktop hero,
      // light enough on a phone hero to stay smooth on mid-range Android.
      const target = Math.round(Math.min(4200, Math.max(900, (width * height) / 420)));
      points = buildKnot(target);
    };

    let animId = 0;
    let time = 0;

    const drawFrame = () => {
      time += 0.003;
      ctx.clearRect(0, 0, width, height);

      pointer.x += (pointer.targetX - pointer.x) * 0.04;
      pointer.y += (pointer.targetY - pointer.y) * 0.04;

      const angleY = time + pointer.x * 0.6;
      const angleX = 0.35 + pointer.y * 0.35;
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const fov = 420;
      // Composition: right of the copy on desktop, above it on phones.
      const wide = width >= 900;
      const cx = wide ? width * 0.7 : width * 0.78;
      const cy = wide ? height * 0.5 : height * 0.2;
      const scaleFit = Math.min(width, height) / 420; // keeps the knot framed at any hero size

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const x = pt.x * scaleFit;
        const y = pt.y * scaleFit;
        const z = pt.z * scaleFit;

        const rx = x * cosY + z * sinY;
        const rz1 = -x * sinY + z * cosY;
        const ry = y * cosX - rz1 * sinX;
        const rz = y * sinX + rz1 * cosX + 520;

        const scale = fov / Math.max(1, rz);
        const sx = cx + rx * scale;
        const sy = cy + ry * scale;
        if (sx < -10 || sx > width + 10 || sy < -10 || sy > height + 10) continue;

        const alpha = Math.min(0.9, Math.max(0.05, (scale - 0.55) * 1.1));
        const radius = Math.max(0.4, 1.5 * scale);

        // Silver threads; roughly one particle in eleven carries the accent,
        // so the orange reads as a signal woven through, not a wash.
        ctx.fillStyle = pt.accent ? `rgba(255, 107, 44, ${Math.min(1, alpha + 0.15)})` : `rgba(240, 240, 240, ${alpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      drawFrame();
      animId = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    if (reduceMotion) {
      drawFrame();
    } else {
      animId = requestAnimationFrame(loop);
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    if (!reduceMotion) {
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
