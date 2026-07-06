import { Container } from "@/components/ui";

/** Shared frame for legal documents: plum title band + readable prose column. */
export function LegalShell({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* dark band so the transparent-at-top header stays readable */}
      <section data-theme="dark" className="bg-[var(--color-void)] pb-14 pt-32 text-[var(--color-fg)] md:pb-16 md:pt-40">
        <Container>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-3 text-4xl font-extrabold sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-[var(--color-fg-faint)]">Last updated: {updated}</p>
        </Container>
      </section>
      <section className="py-14 md:py-20">
        <Container>
          <div className="legal-prose max-w-3xl">{children}</div>
        </Container>
      </section>
    </>
  );
}
