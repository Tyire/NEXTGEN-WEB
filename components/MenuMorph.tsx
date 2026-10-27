"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav, site, waLink } from "@/lib/site";

/**
 * Phone menu — the "liquid morph": the small Menu pill grows out of its own
 * corner into a black card, and shrinks back into it on close.
 *
 * Motion choices (Emil Kowalski's rules):
 *  - The card is origin-aware: a clip-path that starts as exactly the pill's
 *    footprint in the top-right corner, so the menu visibly comes FROM the
 *    button rather than appearing from the centre.
 *  - Opening uses the iOS drawer curve over 420ms; closing is faster (240ms)
 *    — slow where the user is looking, snappy where the system is responding.
 *  - Links stagger 40ms apart, starting from y:14 + opacity 0 (never scale 0).
 *  - Reduced motion: a plain opacity fade, no clip or movement.
 *  - Escape closes, focus moves in and returns to the trigger, page scroll
 *    is locked while open.
 */

const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;
// The pill's footprint, measured from the card's top-right corner.
const PILL_W = 104;
const PILL_H = 44;

export function MenuMorph() {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState("/");
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    html.setAttribute("data-menu-open", "");
    const t = window.setTimeout(() => firstLinkRef.current?.focus({ preventScroll: true }), 120);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      html.removeAttribute("data-menu-open");
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  const closed = `inset(0px 0px calc(100% - ${PILL_H}px) calc(100% - ${PILL_W}px) round 22px)`;
  const opened = "inset(0px 0px 0px 0px round 28px)";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setPath(window.location.pathname.replace(/\/+$/, "") || "/");
          setOpen(true);
        }}
        aria-expanded={open}
        aria-controls="menu-morph"
        className="flex h-11 items-center gap-2.5 rounded-full border border-[var(--color-hairline)] pl-4 pr-3.5 text-[13px] font-medium text-[var(--color-fg)] transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97] lg:hidden"
      >
        Menu
        <span aria-hidden="true" className="flex w-4 flex-col gap-[4px]">
          <span className="block h-[1.5px] w-full rounded bg-current" />
          <span className="block h-[1.5px] w-2/3 self-end rounded bg-current" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              aria-hidden="true"
              className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-[3px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="card"
              id="menu-morph"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="on-dark fixed right-3 top-3 z-[80] flex max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-md flex-col overflow-y-auto rounded-[28px] border border-white/12 lg:hidden"
              initial={reduce ? { opacity: 0 } : { clipPath: closed }}
              animate={
                reduce
                  ? { opacity: 1, transition: { duration: 0.2 } }
                  : { clipPath: opened, transition: { duration: 0.42, ease: EASE_DRAWER } }
              }
              exit={
                reduce
                  ? { opacity: 0, transition: { duration: 0.15 } }
                  : { clipPath: closed, transition: { duration: 0.24, ease: [0.23, 1, 0.32, 1] } }
              }
            >
              {/* Close sits exactly where the Menu pill was — the morph reads as one object. */}
              <div className="flex items-center justify-between px-6 pt-6">
                <span className="eyebrow eyebrow-rule">Navigate</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="-mr-3 -mt-3 flex h-11 items-center gap-2.5 rounded-full border border-white/20 pl-4 pr-3.5 text-[13px] font-medium text-white transition-transform duration-150 active:scale-[0.97]"
                >
                  Close
                  <span aria-hidden="true" className="relative block h-3 w-3">
                    <span className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 rotate-45 rounded bg-current" />
                    <span className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 -rotate-45 rounded bg-current" />
                  </span>
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-4 flex flex-col px-6">
                {nav.map((item, i) => {
                  const active = path === item.href;
                  return (
                    <motion.a
                      key={item.href}
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`display flex items-baseline justify-between border-b border-white/10 py-3 text-[2.15rem] leading-none ${
                        active ? "text-[#ff6b2c] italic" : "text-white"
                      }`}
                      initial={reduce ? false : { opacity: 0, transform: "translateY(14px)" }}
                      animate={{ opacity: 1, transform: "translateY(0px)", transition: { delay: reduce ? 0 : 0.16 + i * 0.04, duration: 0.4, ease: [0.23, 1, 0.32, 1] } }}
                    >
                      {item.label}
                      <span className="font-sans text-[11px] not-italic tabular-nums text-white/40">0{i + 1}</span>
                    </motion.a>
                  );
                })}
              </nav>

              <motion.div
                className="mt-auto px-6 pb-6 pt-8"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: reduce ? 0 : 0.42, duration: 0.3 } }}
              >
                <div className="cta-pair">
                  <a href={site.selfcare.onboard} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                    Check coverage
                  </a>
                  <a href={waLink("Hi NextGen, I'd like to get connected.")} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                    WhatsApp
                  </a>
                </div>
                <div className="mt-5 flex items-center justify-between text-[13px] text-white/55">
                  <a href={site.selfcare.login} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    Customer login →
                  </a>
                  <a href={`tel:${site.phoneHref}`} className="tabular-nums hover:text-white">
                    {site.phoneDisplay}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
