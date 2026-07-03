"use client";

import { useEffect, useRef } from "react";

// Fibre-data hero clip (Pexels 3130284, see public/videos/ATTRIBUTION.md).
// Autoplays muted/looping; pauses for users who prefer reduced motion.
export function HeroVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
    } else {
      v.play().catch(() => {});
    }
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      // GPU-composited filter — lifts the clip so it reads clear/vibrant (esp. on
      // mobile) without touching the file, so playback stays smooth.
      style={{ backgroundColor: "#0a0d0c", filter: "brightness(1.08) contrast(1.07) saturate(1.18)" }}
    >
      <source src="/videos/hero-video.webm" type="video/webm" />
      <source src="/videos/hero-video.mp4" type="video/mp4" />
    </video>
  );
}
