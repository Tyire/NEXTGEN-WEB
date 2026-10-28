"use client";

import { useEffect, useRef } from "react";

/**
 * Giant split-letter wordmark that rises letter by letter when the footer is
 * 35% in view (animations library #21, after moafrique.com's footer).
 * Hidden state is keyed on html.js in CSS, so no-JS shows it in place.
 */
export function FooterWordmark({ word = "NEXTGEN" }: { word?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      aria-label={word}
      className="footer-word select-none text-[22vw] font-bold tracking-[-0.06em] text-white md:text-[15.5vw]"
    >
      {word.split("").map((ch, i) => (
        <span key={i} aria-hidden="true" style={{ "--i": i } as React.CSSProperties}>
          {ch}
        </span>
      ))}
    </p>
  );
}
