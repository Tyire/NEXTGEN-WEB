"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav, site, waLink } from "@/lib/site";

/**
 * Phone menu — the owner-approved pattern from Modish (#3) + Mo'Afrique (#5):
 *  - Two bars (w-5 / w-3.5) fold into an X; the button stays ON TOP of the
 *    sheet (the header is z-50, the sheet z-[45]) so the same control closes it.
 *  - A true-black sheet opens as a circle from the button (600ms), closes
 *    faster; numbered links rise in (delay 0.18 + i·0.05, y 24 → 0).
 *  - A second Close sits at the bottom with the contacts as 46px icon circles
 *    ("users shouldn't stretch to the top").
 *  - Portalled to <body>: the header's backdrop-filter would otherwise trap a
 *    fixed child inside the pill.
 *  - Escape closes, html scroll locked, focus moves in and returns.
 */

const EASE = [0.65, 0, 0.35, 1] as const;

export function MenuMorph() {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState("/");
  const [origin, setOrigin] = useState("calc(100% - 46px) 46px");
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    html.setAttribute("data-menu-open", "");
    const t = window.setTimeout(() => firstLinkRef.current?.focus({ preventScroll: true }), 260);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      html.removeAttribute("data-menu-open");
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  const toggle = () => {
    if (!open) {
      const r = triggerRef.current?.getBoundingClientRect();
      if (r) setOrigin(`${r.left + r.width / 2}px ${r.top + r.height / 2}px`);
      setPath(window.location.pathname.replace(/\/+$/, "") || "/");
    }
    setOpen((v) => !v);
  };

  const close = () => setOpen(false);

  const sheet = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu-sheet"
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="on-dark fixed inset-0 z-[45] flex flex-col overflow-y-auto px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-24 lg:hidden"
          initial={reduce ? { opacity: 0 } : { clipPath: `circle(0% at ${origin})` }}
          animate={reduce ? { opacity: 1, transition: { duration: 0.2 } } : { clipPath: `circle(150% at ${origin})`, transition: { duration: 0.6, ease: EASE } }}
          exit={reduce ? { opacity: 0, transition: { duration: 0.15 } } : { clipPath: `circle(0% at ${origin})`, transition: { duration: 0.38, ease: EASE } }}
        >
          <div aria-hidden="true" className="rising-glow" />

          <nav aria-label="Mobile" className="relative flex flex-col">
            {nav.map((item, i) => {
              const active = path === item.href;
              return (
                <motion.a
                  key={item.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group flex items-baseline gap-4 border-b border-white/10 py-3.5"
                  initial={reduce ? false : { opacity: 0, transform: "translateY(24px)" }}
                  animate={{
                    opacity: 1,
                    transform: "translateY(0px)",
                    transition: { delay: reduce ? 0 : 0.18 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  }}
                >
                  <span className="w-6 text-[11px] font-medium tabular-nums text-white/40">0{i + 1}</span>
                  <span className={`text-[1.9rem] font-semibold leading-none tracking-[-0.03em] ${active ? "text-[#ff6b2c]" : "text-white"}`}>
                    {item.label}
                  </span>
                </motion.a>
              );
            })}
          </nav>

          <motion.div
            className="relative mt-auto pt-10"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: reduce ? 0 : 0.5, duration: 0.3 } }}
          >
            <a href={site.selfcare.onboard} target="_blank" rel="noopener noreferrer" className="btn btn-accent w-full">
              Check coverage
            </a>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2.5">
                <a href={`tel:${site.phoneHref}`} aria-label={`Call ${site.phoneDisplay}`} className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-white/20 text-white">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" /></svg>
                </a>
                <a href={waLink("Hi NextGen, I'd like to get connected.")} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-white/20 text-white">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.512 5.26l-.999 3.648 3.65-.957z" /></svg>
                </a>
                <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`} className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-white/20 text-white">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
                </a>
                <a href={site.selfcare.login} target="_blank" rel="noopener noreferrer" aria-label="Customer login" className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-white/20 text-white">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
                </a>
              </div>
              <button type="button" onClick={close} className="flex h-[46px] items-center gap-2 rounded-full border border-white/20 px-4 text-[13px] font-medium text-white active:scale-[0.97]">
                Close
                <span aria-hidden="true" className="relative block h-3 w-3">
                  <span className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 rotate-45 rounded bg-current" />
                  <span className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 -rotate-45 rounded bg-current" />
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-fg)] transition-transform duration-150 active:scale-[0.97] lg:hidden"
      >
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className="absolute right-0 top-0 block h-[1.5px] w-5 rounded bg-current transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ transform: open ? "translateY(5.25px) rotate(45deg)" : "none" }}
          />
          <span
            className="absolute bottom-0 right-0 block h-[1.5px] rounded bg-current transition-[transform,width] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ width: open ? "1.25rem" : "0.875rem", transform: open ? "translateY(-5.25px) rotate(-45deg)" : "none" }}
          />
        </span>
      </button>
      {mounted && createPortal(sheet, document.body)}
    </>
  );
}
