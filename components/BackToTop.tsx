"use client";

import { useEffect, useState } from "react";

/**
 * A single arrow, bottom-right (site-wide, all devices), that leads back to the
 * top once the user has scrolled past a screenful. Native smooth scroll.
 */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-hairline)] bg-[color-mix(in_srgb,var(--color-ink)_80%,transparent)] text-[var(--color-fg)] shadow-[0_6px_20px_-8px_rgba(0,0,0,0.4)] backdrop-blur-md transition-[opacity,transform] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--color-brand-orange)] hover:text-[var(--color-brand-amber)] active:scale-[0.95] ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
