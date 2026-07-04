"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Landing hero clip. Served as `.vid` (not `.mp4`) and fetched as a blob so IDM
 * (Internet Download Manager — very common in Nigeria) can't hijack the request
 * with a download popup: it only intercepts recognised media extensions. We
 * re-wrap the bytes as `video/mp4` and hand the object URL to <video>.
 * Autoplays muted/looping; skipped entirely under prefers-reduced-motion.
 */
export function HeroVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let url: string | null = null;
    let cancelled = false;
    fetch("/videos/hero-video.vid")
      .then((r) => r.blob())
      .then((b) => {
        if (cancelled) return;
        url = URL.createObjectURL(new Blob([b], { type: "video/mp4" }));
        setSrc(url);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  // Start the loop at 0:04 (per request) — then native forward `loop` carries it
  // round; the file has a baked-in crossfade so the seam is seamless (no "reverse"
  // snap-back). Seeking on loadedmetadata so the duration is known.
  function startAtFour() {
    const v = ref.current;
    if (!v) return;
    try {
      if (v.duration && v.currentTime < 0.1) v.currentTime = Math.min(4, v.duration - 0.1);
    } catch {}
    v.play().catch(() => {});
  }

  useEffect(() => {
    const v = ref.current;
    if (v && src) startAtFour();
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src ?? undefined}
      onLoadedMetadata={startAtFour}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      // Dark backing shows until the blob resolves (no flash), plus a gentle
      // grade so the clip sits calmly behind the copy.
      style={{ backgroundColor: "#0a0d0c", filter: "brightness(0.9) contrast(1.05) saturate(1.12)" }}
    />
  );
}
