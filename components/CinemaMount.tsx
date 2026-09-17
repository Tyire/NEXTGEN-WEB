"use client";

import dynamic from "next/dynamic";

/**
 * Code-split the GSAP + ScrollTrigger + Lenis bundle (~200KB) out of the
 * initial page JS. The Cinema layer is pure enhancement — the site works
 * without it — so we let it stream in AFTER the page has painted.
 */
const Cinema = dynamic(() => import("./Cinema").then((m) => ({ default: m.Cinema })), {
  ssr: false,
});

export default function CinemaMount() {
  return <Cinema />;
}
