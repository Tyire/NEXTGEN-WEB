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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    usedMobile.current = !!mobileSrc && window.matchMedia("(max-width: 767px)").matches;
    const chosen = usedMobile.current ? mobileSrc! : src;

    let objectUrl: string | null = null;
    let cancelled = false;
    fetch(chosen)
      .then((r) => r.blob())
      .then((b) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(new Blob([b], { type: "video/mp4" }));
        setUrl(objectUrl);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src, mobileSrc]);

  function begin() {
    const v = ref.current;
    if (!v) return;
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

  return (
    <video
      {...rest}
      ref={ref}
      className={`${className} transition-opacity duration-1000 ease-out ${playing ? "opacity-100" : "opacity-0"}`}
      src={url ?? undefined}
      onLoadedMetadata={begin}
      onPlaying={() => setPlaying(true)}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      style={grade ? { filter: "brightness(0.85) contrast(1.06) saturate(1.15)" } : undefined}
    />
  );
}
