"use client";

// Hyperspace warp-streak backdrop — "nothing says Fibre like this." Inspired
// by chamaac's 21st.dev "Light Speed" (a full WebGL/three.js/@react-three
// hyperspace tunnel), but hand-built in plain canvas 2D rather than pulling
// in three.js + @react-three/fiber + @react-three/postprocessing: that's
// three new, sizeable dependencies this site has never needed (it's 100%
// canvas-2D/CSS so far, deliberately light for slow connections), and the
// same classic "streaks flying past a vanishing point" look doesn't need a
// 3D scene graph — it's a perspective-divide projection, which canvas 2D
// does natively. Recolored to NextGen's brand gradient instead of the
// original's purple/neon, since this is meant to say "fiber", not "sci-fi".
//
// Pure decoration: aria-hidden, respects prefers-reduced-motion by drawing
// one static frame and stopping.

import { useEffect, useRef } from "react";

interface Streak {
  x: number;
  y: number;
  z: number;
  pz: number; // previous z, for the trail length
}

// Mostly white light; every fourth streak carries the accent.
const COLORS = ["245, 245, 245", "245, 245, 245", "245, 245, 245", "255, 107, 44"];

export function LightSpeed({
  speed = 2.4,
  particleCount = 420,
  className = "",
}: {
  speed?: number;
  particleCount?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let streaks: Streak[] = [];
    const maxZ = 1200;

    const spawn = (s: Streak) => {
      s.x = (Math.random() - 0.5) * width * 1.6;
      s.y = (Math.random() - 0.5) * height * 1.6;
      s.z = maxZ;
      s.pz = maxZ;
    };

    const seed = () => {
      streaks = Array.from({ length: particleCount }, () => {
        const s: Streak = { x: 0, y: 0, z: 0, pz: 0 };
        spawn(s);
        s.z = Math.random() * maxZ; // stagger initial depth so it doesn't pulse in unison
        s.pz = s.z;
        return s;
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const drawFrame = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.32)"; // trail fade, not a hard clear — motion blur
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        s.pz = s.z;
        s.z -= speed * 6;
        if (s.z < 1) spawn(s);

        const sx = cx + (s.x / s.z) * width;
        const sy = cy + (s.y / s.z) * width;
        const px = cx + (s.x / s.pz) * width;
        const py = cy + (s.y / s.pz) * width;

        if (sx < -50 || sx > width + 50 || sy < -50 || sy > height + 50) continue;

        const depth = 1 - s.z / maxZ; // 0 far, 1 near
        const color = COLORS[i % COLORS.length];
        ctx.strokeStyle = `rgba(${color}, ${0.15 + depth * 0.65})`;
        ctx.lineWidth = Math.max(0.6, depth * 2.2);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    };

    let animId = 0;
    const loop = () => {
      drawFrame();
      animId = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    if (reduceMotion) {
      drawFrame();
    } else {
      animId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [speed, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}
