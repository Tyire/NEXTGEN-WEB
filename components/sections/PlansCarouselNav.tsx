"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mobile-only "1 of N" counter + dot pagination for the plans carousel.
 * Watches the .plans-carousel siblings via IntersectionObserver and updates
 * the active index as the user swipes. Never renders on desktop (parent
 * wrapper is `md:hidden`) — desktop uses the pinned GSAP sweep instead.
 * Dead JS = the counter never mounts, native swipe still works.
 */
export function PlansCarouselNav({ total }: { total: number }) {
  const [active, setActive] = useState(0);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = document.querySelector<HTMLElement>(".plans-carousel");
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (!cards.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the card with the largest visible ratio
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) {
          const i = cards.indexOf(best.target as HTMLElement);
          if (i >= 0) setActive(i);
        }
      },
      { root: track, threshold: [0.55, 0.75] }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  function jumpTo(i: number) {
    const track = document.querySelector<HTMLElement>(".plans-carousel");
    const card = track?.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  return (
    <div className="mt-6 flex items-center justify-between gap-4 px-1">
      <p className="display text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
        {active + 1} <span className="text-[var(--color-fg-faint)]">of</span> {total}
      </p>
      <div ref={dotsRef} className="flex items-center gap-2" role="tablist" aria-label="Plan navigation">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to plan ${i + 1}`}
            onClick={() => jumpTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ease-out ${
              i === active
                ? "w-6 bg-[var(--color-brand-orange)]"
                : "w-2 bg-[var(--color-hairline)] hover:bg-[var(--color-fg-faint)]"
            }`}
          />
        ))}
      </div>
      <p className="display text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-faint)]">
        Swipe →
      </p>
    </div>
  );
}
