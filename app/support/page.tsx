import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redirecting to FAQ…",
  robots: { index: false, follow: false },
  other: {
    refresh: "0; url=/faq/",
  },
};

export default function SupportRedirect() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="text-[var(--color-fg-muted)]">
        Redirecting to{" "}
        <a href="/faq" className="text-[var(--color-brand-orange)] underline">
          FAQ
        </a>
        …
      </p>
    </div>
  );
}
