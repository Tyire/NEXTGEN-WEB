"use client";

import { useEffect, useRef } from "react";

// Bot protection for the mailto forms (security finding F2: trap field + page timer).
// - Trap: a field that people never see. A bot that fills every field fills it too.
//   It has no `name`, so it never appears in the visitor's email.
// - Timer: a submit faster than MIN_MS after the form appeared is refused.
// Without JavaScript the form still works (never block a real customer to stop a bot).
const MIN_MS = 3000;

export function BotTrap() {
  const trapRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const form = trapRef.current?.closest("form");
    if (!form) return;
    const shownAt = Date.now();
    const onSubmit = (e: SubmitEvent) => {
      const trapped = (trapRef.current?.value ?? "") !== "";
      const tooFast = Date.now() - shownAt < MIN_MS;
      if (trapped || tooFast) {
        e.preventDefault();
        if (tooFast && !trapped) {
          const status = form.querySelector<HTMLElement>("[data-bot-status]");
          if (status) status.textContent = "Please check your details, then press send again.";
        }
      }
    };
    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, []);

  return (
    <>
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Leave this field empty
          <input ref={trapRef} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <p data-bot-status role="status" aria-live="polite" className="text-xs text-[var(--color-fg-muted)] empty:hidden" />
    </>
  );
}
