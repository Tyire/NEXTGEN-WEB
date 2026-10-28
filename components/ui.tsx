/* Shared primitives — server components, plain anchors (static-export MPA).
   Internal links use <a> everywhere so navigation NEVER depends on hydration. */

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 8h12M9 3l5 5-5 5" />
    </svg>
  );
}

/** Pill base for anchors that need the button look but handle their own href (e.g. wa.me). */
export const waLinkButtonClass = "group btn";

type BtnProps = {
  href: string;
  children: React.ReactNode;
  /**
   * `accent` — THE conversion action (orange, black text). One per view.
   * `solid`  — calm inverse-ink pill (default).
   * `ghost`  — hairline pill.
   * `white` / `ghost-light` — for always-dark heroes and bands.
   */
  variant?: "accent" | "solid" | "ghost" | "white" | "ghost-light";
  className?: string;
  external?: boolean;
  /** Leans toward the cursor (GSAP, mouse only). Reserve for primary CTAs. */
  magnetic?: boolean;
};

const variantClass: Record<NonNullable<BtnProps["variant"]>, string> = {
  accent: "btn-accent",
  solid: "btn-ink",
  ghost: "btn-ghost",
  white: "btn-white",
  "ghost-light": "btn-ghost-light",
};

export function Button({ href, children, variant = "solid", className = "", external, magnetic }: BtnProps) {
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const mag = magnetic ? { "data-magnetic": "" } : {};
  return (
    <a href={href} {...ext} {...mag} className={`group btn ${variantClass[variant]} ${className}`}>
      {children}
    </a>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 md:px-10 ${className}`}>{children}</div>;
}

/** Section eyebrow — tracked caps preceded by the short accent rule. */
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow eyebrow-rule mb-5 ${className}`}>{children}</p>;
}

/** Section heading pair used across all pages. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  className?: string;
}) {
  return (
    <div className={`sr max-w-3xl ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="display text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl">{title}</h2>
      {lede && <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">{lede}</p>}
    </div>
  );
}
