"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/**
 * Smart "Install app" button. Renders NOTHING until the browser says the PWA
 * is installable (`beforeinstallprompt` on Chrome/Edge/Android) or we're on
 * iOS Safari outside standalone mode (where it shows the add-to-home-screen
 * how-to instead). Pure enhancement — the page is complete without it.
 */
export function InstallPrompt({ className = "" }: { className?: string }) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // iOS Safari's non-standard flag
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    if (standalone) return; // already installed

    // async so the initial render commits untouched (react-hooks/set-state-in-effect)
    const raf = requestAnimationFrame(() => {
      if (/iphone|ipad|ipod/i.test(navigator.userAgent)) setIos(true);
    });

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("beforeinstallprompt", onPrompt);
    };
  }, []);

  if (!deferred && !ios) return null;

  async function install() {
    if (deferred) {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "accepted") setDeferred(null);
    } else {
      setShowIosHelp((v) => !v);
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={install}
        aria-expanded={ios ? showIosHelp : undefined}
        aria-controls={ios ? "ios-install-help" : undefined}
        className="group inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-hairline)] px-5 py-2.5 text-xs font-bold text-[var(--color-fg)] transition-colors hover:border-[var(--color-brand-orange)]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--color-brand-orange)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
        Install the NextGen app
      </button>
      {showIosHelp && (
        <p id="ios-install-help" className="mt-3 max-w-xs text-xs leading-relaxed text-[var(--color-fg-muted)]">
          On iPhone: tap the <strong>Share</strong> button in Safari, then{" "}
          <strong>&ldquo;Add to Home Screen&rdquo;</strong> — NextGen installs like a regular app.
        </p>
      )}
    </div>
  );
}
