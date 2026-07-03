import { imagery } from "@/data/imagery";

const WIDTHS = [640, 1024, 1600];

/**
 * Renders a self-hosted responsive Pexels photo for a manifest slot.
 * Until `npm run fetch-images` populates the slot, `src` is null and this renders
 * a branded gradient placeholder (or null if `placeholder={false}`), so the build
 * never depends on the images existing.
 */
export function PeopleImage({
  slot,
  className = "",
  sizes = "100vw",
  placeholder = true,
  priority = false,
}: {
  slot: keyof typeof imagery;
  className?: string;
  sizes?: string;
  placeholder?: boolean;
  priority?: boolean;
}) {
  const s = imagery[slot];

  if (!s?.src) {
    if (!placeholder) return null;
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ background: `linear-gradient(135deg, ${s?.avgColor ?? "#1b2320"}, var(--color-surface-2))` }}
        aria-hidden="true"
      >
        <span className="pointer-events-none absolute inset-0 opacity-30 brand-gradient mix-blend-overlay" />
      </div>
    );
  }

  const avif = WIDTHS.map((w) => `${s.src}-${w}.avif ${w}w`).join(", ");
  const webp = WIDTHS.map((w) => `${s.src}-${w}.webp ${w}w`).join(", ");
  // Intrinsic dimensions per orientation → sets aspect ratio (prevents CLS).
  // Fill usages (`h-full w-full object-cover`) still size via CSS.
  const [w, h] =
    s.orientation === "portrait" ? [900, 1600] : s.orientation === "square" ? [1200, 1200] : [1600, 900];
  return (
    <picture>
      <source type="image/avif" srcSet={avif} sizes={sizes} />
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      <img
        src={`${s.src}-1024.webp`}
        alt={s.alt}
        width={w}
        height={h}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={{ backgroundColor: s.avgColor }}
      />
    </picture>
  );
}
