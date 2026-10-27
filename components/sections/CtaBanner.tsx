import { Container, Button, Arrow } from "@/components/ui";
import { site, waLink } from "@/lib/site";

/**
 * Closing CTA — deep ink-navy band, giant type, orange accent line.
 * Defaults are the fiber/connectivity CTA; pass the override props for a
 * different product (e.g. NextGen Cloud) without touching existing callers.
 */
export function CtaBanner({
  title = (
    <>
      Ready when
      <br />
      you are.
    </>
  ),
  lede = "Check your estate, pick a plan, and be streaming in 3 days.",
  ghost = "CONNECT",
  primaryHref = site.selfcare.onboard,
  primaryLabel = "Check Coverage",
  primaryExternal = true,
  whatsappText = "Hi NextGen, I'd like to get connected.",
}: {
  title?: React.ReactNode;
  lede?: string;
  ghost?: string;
  primaryHref?: string;
  primaryLabel?: React.ReactNode;
  primaryExternal?: boolean;
  whatsappText?: string;
}) {
  return (
    <section data-theme="dark" className="relative isolate overflow-hidden bg-[var(--color-void)]">
      <div aria-hidden="true" className="grain absolute inset-0" />
      <span aria-hidden="true" className="ghost absolute -bottom-8 left-0 text-[24vw] md:text-[14rem]" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.12)" }}>
        {ghost}
      </span>
      <Container className="relative py-20 text-center md:py-28">
        <h2 className="display sr mx-auto max-w-3xl text-[2.9rem] leading-[1] text-white sm:text-6xl md:text-[5.5rem]">{title}</h2>
        <p className="sr mx-auto mt-6 max-w-md text-base text-white/75 md:text-lg">{lede}</p>
        <div className="sr cta-pair mx-auto mt-10 max-w-md justify-center sm:max-w-none">
          <Button href={primaryHref} external={primaryExternal} variant="accent" magnetic>
            {primaryLabel} <Arrow />
          </Button>
          <a href={waLink(whatsappText)} target="_blank" rel="noopener noreferrer" className="group btn btn-ghost-light">
            WhatsApp us <Arrow />
          </a>
        </div>
        <p className="display sr mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
          or call {site.phoneDisplay}
        </p>
      </Container>
    </section>
  );
}
