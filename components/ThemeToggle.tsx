"use client";

import { useSyncExternalStore } from "react";

// Light is the default; dark only when chosen. The no-flash inline script in
// layout sets data-theme before paint; this subscribes to that attribute so the
// icon + aria-checked stay correct without setState-in-effect.
function getTheme() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}
function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getTheme, () => "light") === "dark";

  function toggle() {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-[var(--color-hairline)] bg-[var(--color-surface-2)] px-0.5 transition-colors md:h-5 md:w-[38px]"
    >
      {/* Sliding pill (Salient style): white knob carrying an amber sun (light) / moon (dark). */}
      <span
        className={`inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[var(--color-brand-amber)] shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-transform duration-300 md:h-4 md:w-4 ${
          dark ? "translate-x-[20px] md:translate-x-[18px]" : "translate-x-0"
        }`}
      >
        {dark ? (
          <svg viewBox="0 0 24 24" className="h-3 w-3 md:h-[11px] md:w-[11px]" fill="currentColor" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-3 w-3 md:h-[11px] md:w-[11px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" strokeLinecap="round" />
          </svg>
        )}
      </span>
    </button>
  );
}
