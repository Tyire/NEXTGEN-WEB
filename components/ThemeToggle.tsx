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
      // 32px tall / 58px wide — a comfortable tap target on touch, tidy on desktop.
      className="relative inline-flex h-8 w-[58px] shrink-0 cursor-pointer items-center rounded-full border border-[var(--color-hairline)] bg-[var(--color-surface-2)] px-1 transition-colors"
    >
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[var(--color-brand-amber)] shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-transform duration-300 ${
          dark ? "translate-x-[26px]" : "translate-x-0"
        }`}
      >
        {dark ? (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" strokeLinecap="round" />
          </svg>
        )}
      </span>
    </button>
  );
}
