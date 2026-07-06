/* eslint-disable @next/next/no-img-element */
import { site } from "@/lib/site";

/** Isolated icon mark (transparent, works on any surface). */
export function LogoIcon({ className = "h-9 w-9" }: { className?: string }) {
  return <img src="/brand/logo-icon.png" alt={site.name} width={286} height={280} className={className} />;
}

/**
 * Real NextGen Telcoms logo, theme-aware. Black wordmark on light, white on dark —
 * both rendered, CSS swaps them via the `dark:` variant so there's no JS flash.
 * `showWordmark={false}` renders the icon mark alone.
 */
export function Logo({
  className = "h-8 w-auto",
  showWordmark = true,
  forceWhite = false,
}: {
  className?: string;
  showWordmark?: boolean;
  forceWhite?: boolean;
}) {
  if (!showWordmark) return <LogoIcon className={className} />;
  // Both wordmarks are ALWAYS rendered and toggled via CSS (never conditionally
  // mounted), so both are preloaded — swapping on scroll can't flash a blank/
  // half-loaded image. `forceWhite` (over the dark hero) shows white regardless of
  // theme; otherwise black on light, white on dark.
  return (
    <>
      {/* black wordmark — light theme, only when not forcing white */}
      <img
        src="/brand/logo-full.png"
        alt={`${site.name} logo`}
        width={1119}
        height={280}
        className={`${className} ${forceWhite ? "hidden" : "block dark:hidden"}`}
      />
      {/* white wordmark — dark theme, or when forcing white over the hero */}
      <img
        src="/brand/logo-full-dark.png"
        alt={`${site.name} logo`}
        width={1119}
        height={280}
        className={`${className} ${forceWhite ? "block" : "hidden dark:block"}`}
      />
    </>
  );
}
