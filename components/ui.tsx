/* Shared primitives — server components, plain anchors (static-export MPA).
   Internal links use <a> everywhere so navigation NEVER depends on hydration. */

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 8h12M9 3l5 5-5 5" />
    </svg>
  );
}

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "white";
  className?: string;
  external?: boolean;
};

/** Pill CTA. `solid` = sunset gradient, `ghost` = outlined, `white` = for gradient bands. */
export function Button({ href, children, variant = "solid", className = "", external }: BtnProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-[transform,box-shadow,background-color,border-color] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 active:scale-[0.97]";
  const look =
    variant === "solid"
      ? "grad-sunset text-white shadow-[0_12px_32px_-12px_rgba(255,60,44,0.6)] hover:shadow-[0_18px_40px_-12px_rgba(255,31,77,0.7)]"
      : variant === "white"
        ? "bg-white text-[#20100a] shadow-[0_12px_32px_-14px_rgba(0,0,0,0.5)]"
        : "border-2 border-[var(--color-hairline)] text-[var(--color-fg)] hover:border-[var(--color-brand-orange)]";
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a href={href} {...ext} className={`${base} ${look} ${className}`}>
      {children}
    </a>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 md:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`eyebrow mb-4 flex items-center gap-2.5 ${className}`}>
      <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full grad-sunset" />
      {children}
    </p>
  );
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
      <h2 className="display text-4xl font-extrabold sm:text-5xl md:text-6xl">{title}</h2>
      {lede && <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">{lede}</p>}
    </div>
  );
}
