"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IDM-proof looping video. Files ship as `.vid` (not `.mp4`) and are fetched
 * as blobs so Internet Download Manager can't hijack the request — it only
 * intercepts recognised media extensions. Bytes are re-wrapped as video/mp4.
 *
 * Progressive by design: whatever sits UNDER this component (gradient
 * backdrop, <picture> banner) is the finished no-JS/slow-network experience;
 * the video fades in over it only once it's actually playing.
 *
 * `mobileSrc` swaps in a lighter portrait encode below 768px (checked once
 * at mount — orientation changes don't refetch megabytes).
 */
export function BlobVideo({
  src,
  mobileSrc,
  className = "",
  startAt = 0,
  grade = true,
  ...rest
}: {
  src: string;
  mobileSrc?: string;
  className?: string;
  /** seek offset for the DESKTOP encode only (mobile encodes loop from 0) */
  startAt?: number;
  grade?: boolean;
} & React.VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const usedMobile = useRef(false);
  const objectUrl = useRef<string | null>(null);
  const onScreen = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    usedMobile.current = !!mobileSrc && window.matchMedia("(max-width: 767px)").matches;
    const chosen = usedMobile.current ? mobileSrc! : src;

    let cancelled = false;
    // Defer the multi-MB blob fetch until the browser has finished first paint.
    // Otherwise the hero video download races page render on slow phones and
    // the whole site feels heavy. Falls back to setTimeout on Safari.
    const idle = (cb: () => void) => {
      const w = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
      if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout: 1200 });
      else setTimeout(cb, 250);
    };
    idle(() => {
      if (cancelled) return;
      fetch(chosen)
        .then((r) => r.blob())
        .then((b) => {
          if (cancelled) return;
          // b is already a Blob; retype it in place instead of copying the bytes
          // into a second Blob (that copy briefly doubled hero memory).
          const typed = b.type === "video/mp4" ? b : b.slice(0, b.size, "video/mp4");
          objectUrl.current = URL.createObjectURL(typed);
          setUrl(objectUrl.current);
        })
        .catch(() => {});
    });

    return () => {
      cancelled = true;
      if (objectUrl.current) {
        URL.revokeObjectURL(objectUrl.current);
        objectUrl.current = null;
      }
    };
  }, [src, mobileSrc]);

  function begin() {
    const v = ref.current;
    if (!v || !onScreen.current) return;
    try {
      if (startAt && !usedMobile.current && v.duration && v.currentTime < 0.1)
        v.currentTime = Math.min(startAt, v.duration - 0.1);
    } catch {}
    v.play().catch(() => {});
  }

  useEffect(() => {
    if (ref.current && url) begin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  // Once the clip is fully buffered the media element owns its own copy, so we
  // can revoke the blob URL and let the ~MB JS Blob be garbage-collected —
  // looping keeps working off the buffered resource. Halves steady-state hero
  // memory (was: JS Blob + decoded video kept alive together).
  function releaseBlob() {
    if (objectUrl.current) {
      URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = null;
    }
  }

  // Pause decoding when the hero scrolls out of view; resume on return. A
  // full-screen video that keeps decoding off-screen is pure wasted CPU/GPU/mem.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen.current = e.isIntersecting;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.01 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      {...rest}
      ref={ref}
      className={`${className} transition-opacity duration-1000 ease-out ${playing ? "opacity-100" : "opacity-0"}`}
      src={url ?? undefined}
      onLoadedMetadata={begin}
      onPlaying={() => setPlaying(true)}
      onCanPlayThrough={releaseBlob}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      style={grade ? { filter: "brightness(0.85) contrast(1.06) saturate(1.15)" } : undefined}
    />
  );
}
