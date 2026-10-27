import { Logo } from "./Logo";
import { Arrow } from "./ui";
import { MenuMorph } from "./MenuMorph";
import { nav, site } from "@/lib/site";

/**
 * Floating pill header — a server component; only the phone menu
 * (<MenuMorph>) is a client island.
 *  - Links are plain <a> — every navigation is a full page load.
 *  - Theme toggle buttons are wired by a tiny inline script in layout.tsx.
 *  - Over the dark hero (html[data-at-top]) the pill turns dark glass with
 *    white foreground; once scrolled it's canvas glass with ink foreground.
 */

function ThemeButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`theme-toggle flex shrink-0 items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-fg)] transition-colors hover:border-[var(--color-fg-muted)] ${className}`}
      aria-label="Switch between light and dark theme"
    >
      <svg viewBox="0 0 24 24" className="icon-moon h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      <svg viewBox="0 0 24 24" className="icon-sun h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <div className="nav-bar site-pill mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 rounded-full pl-5 pr-1.5 md:h-[62px] md:pl-6 md:pr-2">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- plain <a> by design: nav must work without hydration */}
        <a href="/" aria-label="NextGen Telecoms home" className="shrink-0">
          <Logo className="h-[22px] w-auto md:h-6" />
        </a>

        <nav data-nav="" className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              suppressHydrationWarning
              className="nav-link text-[14px] font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] data-[active]:text-[var(--color-fg)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeButton className="h-10 w-10" />
          <a
            href={site.selfcare.login}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 text-[14px] font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
          >
            Login
          </a>
          <a href={site.selfcare.onboard} target="_blank" rel="noopener noreferrer" data-magnetic="" className="group btn btn-ghost !min-h-[2.75rem] !px-5 !text-[14px]">
            Check coverage <Arrow />
          </a>
        </div>

        <div className="flex items-center gap-1.5 lg:hidden">
          <ThemeButton className="h-11 w-11" />
          <MenuMorph />
        </div>
      </div>
    </header>
  );
}
