import { Logo } from "./Logo";
import { Arrow } from "./ui";
import { nav, site } from "@/lib/site";

/**
 * Bulletproof header — a SERVER component with zero hydration dependency:
 *  - Mobile menu is a pure-CSS checkbox toggle (works with JS disabled/dead).
 *  - Links are plain <a> — every navigation is a full page load, so the menu
 *    resets and the theme pre-paint script re-runs. Nothing can go stale.
 *  - Theme toggle buttons are wired by a tiny inline script in layout.tsx.
 *  - Always-solid glass background: no scroll listener to break.
 */

function ThemeButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`theme-toggle flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-hairline)] bg-[var(--color-surface)] text-[var(--color-fg)] transition-colors hover:border-[var(--color-brand-orange)] ${className}`}
      aria-label="Switch between light and dark theme"
    >
      {/* moon shows in light (tap → dark); sun shows in dark (tap → light) */}
      <svg viewBox="0 0 24 24" className="icon-moon h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      <svg viewBox="0 0 24 24" className="icon-sun h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-hairline)] bg-[var(--color-ink-glass)] backdrop-blur-md">
      {/* Checkbox FIRST so `#nav-open:checked ~ …` reaches the bar and panel. */}
      <input type="checkbox" id="nav-open" className="peer sr-only" aria-hidden="true" tabIndex={-1} />

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-5 md:h-20 md:px-10">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- plain <a> by design: nav must work without hydration */}
        <a href="/" aria-label="NextGen Telcoms home" className="shrink-0">
          <Logo className="h-7 w-auto md:h-8" />
        </a>

        {/* Desktop nav */}
        <nav data-nav="" className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              suppressHydrationWarning
              className="text-sm font-semibold text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] data-[active]:text-[var(--color-fg)] data-[active]:underline data-[active]:decoration-[var(--color-brand-orange)] data-[active]:decoration-2 data-[active]:underline-offset-8"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeButton className="h-10 w-10" />
          <a
            href={site.selfcare.login}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
          >
            Login
          </a>
          <a
            href={site.selfcare.onboard}
            target="_blank"
            rel="noopener noreferrer"
            className="group grad-sunset inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_28px_-12px_rgba(255,60,44,0.7)] transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 active:scale-[0.97]"
          >
            Check Coverage <Arrow />
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeButton />
          <label
            htmlFor="nav-open"
            className="burger flex h-11 w-11 cursor-pointer flex-col items-center justify-center rounded-full border border-[var(--color-hairline)] bg-[var(--color-surface)] text-[var(--color-fg)]"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden="true"><span className="bl l1" /><span className="bl l2" /><span className="bl l3" /></span>
          </label>
        </div>
      </div>

      {/* Mobile panel — grid-rows trick: animates open, content auto-sizes and
          scrolls if taller than the viewport. Cannot clip the CTA. */}
      <div className="nav-panel border-[var(--color-hairline)] bg-[var(--color-ink)] lg:hidden">
        <div>
          <nav
            data-nav=""
            className="flex max-h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto border-t border-[var(--color-hairline)] px-5 py-4"
            aria-label="Mobile"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                suppressHydrationWarning
                className="rounded-xl px-4 py-3.5 text-base font-semibold text-[var(--color-fg-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)] data-[active]:bg-[var(--color-surface)] data-[active]:text-[var(--color-fg)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.selfcare.login}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-4 py-3.5 text-base font-semibold text-[var(--color-fg-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)]"
            >
              Customer Login
            </a>
            <a
              href={site.selfcare.onboard}
              target="_blank"
              rel="noopener noreferrer"
              className="group grad-sunset mt-3 mb-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-white"
            >
              Check Coverage <Arrow />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
