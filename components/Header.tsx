"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// ponytail: close mobile menu via onClick on links, not a pathname effect (lint: no setState-in-effect).
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button, Arrow } from "./ui";
import { nav, site } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Detect "scrolled" via a sentinel at the very top of the page — robust across
    // native scroll, wheel, touch AND smooth-scroll libraries (some mobile browsers
    // don't fire window 'scroll' reliably under Lenis, which left the header stuck
    // transparent and the logo/hamburger blending). The scroll listener is a backup.
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

  // Transparent over the hero on EVERY page (all page heroes are dark banners);
  // background/blur activates once scrolled. White text/logo forced while at top.
  const overHero = !scrolled;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        overHero
          ? "bg-transparent"
          : `border-b border-[var(--color-hairline)] backdrop-blur-xl ${
              scrolled
                ? "bg-[color-mix(in_srgb,var(--color-ink)_88%,transparent)] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)]"
                : "bg-[color-mix(in_srgb,var(--color-ink)_72%,transparent)]"
            }`
      }`}
    >
      {/* White text/logo tokens scoped to the BAR only — the mobile dropdown keeps
          normal theme colors so its links stay visible in light mode. */}
      <div
        style={overHero ? ({ "--color-fg": "#ffffff", "--color-fg-muted": "rgba(255,255,255,0.85)" } as React.CSSProperties) : undefined}
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:h-20 md:px-10"
      >
        <Link href="/" aria-label="NextGen Telcoms home" className="shrink-0">
          <Logo forceWhite={overHero} className="h-7 w-auto md:h-8" />
        </Link>

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
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-full brand-gradient rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

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
          {/* Check Coverage stays rightmost as the primary action */}
          <Button href={site.selfcare.onboard} className="px-5 py-2.5">
            Check Coverage <Arrow />
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-hairline)] text-[var(--color-fg)]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-all ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden bg-[var(--color-ink)] transition-[max-height] duration-300 ${
          open ? "max-h-96 border-t border-[var(--color-hairline)]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-[var(--color-fg-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)]"
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
          <Button
            href={site.selfcare.onboard}
            onClick={() => setOpen(false)}
            className="mt-3 w-fit self-start px-5 py-2.5"
          >
            Check Coverage <Arrow />
          </Button>
        </nav>
      </div>
    </header>
  );
}
