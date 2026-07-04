"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero clip. Served as `.vid` (not `.mp4`) and fetched as a blob so IDM
 * (Internet Download Manager — very common in Nigeria) can't hijack the
 * request with a download popup: it only intercepts recognised media
 * extensions. Bytes are re-wrapped as `video/mp4` for <video>.
 *
 * Progressive by design: the hero looks finished WITHOUT this component —
 * a designed gradient backdrop sits behind it (see page hero markup). The
 * video fades in over it only once it's actually playing. If JS is dead or
 * the network is slow, nothing is missing — the gradient hero stands alone.
 */
export function HeroVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

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

  // Start the loop at 0:04 — the file has a baked-in crossfade so native
  // forward `loop` is seamless from there. Seek once metadata gives duration.
  function startAtFour() {
    const v = ref.current;
    if (!v) return;
    try {
      if (v.duration && v.currentTime < 0.1) v.currentTime = Math.min(4, v.duration - 0.1);
    } catch {}
    v.play().catch(() => {});
  }

  useEffect(() => {
    if (ref.current && src) startAtFour();
  }, [src]);

  return (
    <video
      ref={ref}
      className={`${className} transition-opacity duration-1000 ease-out ${playing ? "opacity-100" : "opacity-0"}`}
      src={src ?? undefined}
      onLoadedMetadata={startAtFour}
      onPlaying={() => setPlaying(true)}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      style={{ filter: "brightness(0.85) contrast(1.06) saturate(1.15)" }}
    />
  );
}
