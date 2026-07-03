import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>{children}</div>;
}

export function Section({
  id,
  className = "",
  tone = "ink",
  children,
}: {
  id?: string;
  className?: string;
  tone?: "ink" | "void" | "paper";
  children: ReactNode;
}) {
  const bg =
    tone === "paper"
      ? "bg-[var(--color-paper)] text-[var(--color-fg-ink)]"
      : tone === "void"
        ? "bg-[var(--color-void)]"
        : "bg-[var(--color-ink)]";
  return (
    <section id={id} className={`relative py-20 md:py-28 ${bg} ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow inline-flex items-center gap-2 ${className}`}>
      <span className="inline-block h-1.5 w-1.5 rounded-full brand-gradient" />
      {children}
    </p>
  );
}

type ButtonProps = {
  href: string;
  variant?: "primary" | "ghost" | "outline" | "solid";
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

export function Button({ href, variant = "primary", className = "", children, ...rest }: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-[transform,box-shadow,border-color,color] duration-200 ease-[var(--ease-out)] will-change-transform active:scale-[0.97]";
  const styles = {
    primary:
      "brand-gradient text-[#180a04] shadow-[0_8px_30px_-8px_rgba(255,90,44,0.6)] hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-10px_rgba(255,90,44,0.75)]",
    outline:
      "border border-[var(--color-hairline)] text-[var(--color-fg)] hover:border-[var(--color-brand-orange)] hover:text-[var(--color-brand-amber)]",
    ghost: "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
    solid:
      "brand-gradient text-white shadow-[0_8px_30px_-8px_rgba(255,90,44,0.6)] hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-10px_rgba(255,90,44,0.75)]",
  }[variant];
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  if (external) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
