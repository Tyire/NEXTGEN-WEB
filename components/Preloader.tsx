/* eslint-disable @next/next/no-img-element */

/**
 * "Speed burst" entrance curtain — a SERVER component with a 100% CSS
 * lifecycle (see globals.css). The inline <head> script sets
 * html[data-boot] on the FIRST page view of the session only; CSS shows the
 * curtain, charges the fiber beam, and lifts it after ~1.7s with a fixed
 * animation delay. No JavaScript runs it, so it can never get stuck —
 * the exact failure mode the old preloader had on mobile.
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <img src="/brand/logo-icon.png" alt="" width={76} height={76} className="pl-logo" draggable={false} />
      <span className="pl-beam" />
      <span className="pl-tag">Fiber &middot; Lagos</span>
    </div>
  );
}
