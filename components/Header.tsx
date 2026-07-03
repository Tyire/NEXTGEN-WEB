"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button, Arrow } from "./ui";
import { nav, site } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Scroll detection via a top sentinel — robust across native/touch scroll on
    // all mobile browsers (a plain window 'scroll' listener is a backup).
    const setFromScroll = () =>
      setScrolled((window.scrollY || document.documentElement.scrollTop || 0) > 12);
    setFromScroll();

    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:14px;pointer-events:none;";
    document.body.appendChild(sentinel);
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), { threshold: 0 });
    io.observe(sentinel);

    window.addEventListener("scroll", setFromScroll, { passive: true });
    return () => {
      io.disconnect();
      sentinel.remove();
      window.removeEventListener("scroll", setFromScroll);
    };
  }, []);

  // Solid bar when scrolled OR the mobile menu is open; transparent (white text
  // over the dark hero) otherwise.
  const solid = scrolled || open;
  const overHero = !solid;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-[var(--color-hairline)] bg-[color-mix(in_srgb,var(--color-ink)_90%,transparent)] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div
        style={
          overHero
            ? ({ "--color-fg": "#ffffff", "--color-fg-muted": "rgba(255,255,255,0.85)" } as React.CSSProperties)
            : undefined
        }
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:h-20 md:px-10"
      >
        <Link href="/" aria-label="NextGen Telcoms home" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo forceWhite={overHero} className="h-7 w-auto md:h-8" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors ${
                  active ? "text-[var(--color-fg)]" : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                {item.label}
                {active && <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full brand-gradient" />}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href={site.selfcare.login}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Customer login"
            title="Customer login"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5 0-9 2.5-9 6v1h18v-1c0-3.5-4-6-9-6Z" />
            </svg>
          </a>
          <Button href={site.selfcare.onboard} className="px-5 py-2.5">
            Check Coverage <Arrow />
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--color-hairline)] text-[var(--color-fg)]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu — caps to the viewport and scrolls, so it can NEVER clip the CTA. */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-[var(--color-hairline)] bg-[var(--color-ink)] transition-[max-height] duration-300 ease-out md:hidden ${
          open ? "max-h-[calc(100dvh-4rem)] border-t" : "max-h-0"
        }`}
      >
        <nav className="flex max-h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto px-6 py-4" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-3 text-base font-medium ${
                pathname === item.href
                  ? "bg-[var(--color-surface)] text-[var(--color-fg)]"
                  : "text-[var(--color-fg-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.selfcare.login}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-3 text-base font-medium text-[var(--color-fg-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)]"
          >
            Customer Login
          </a>
          <Button href={site.selfcare.onboard} onClick={() => setOpen(false)} className="mt-3 w-full px-5 py-3">
            Check Coverage <Arrow />
          </Button>
        </nav>
      </div>
    </header>
  );
}
