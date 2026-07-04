import { Container, Button, Arrow } from "@/components/ui";
import { site } from "@/lib/site";

const wa = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi NextGen, I'd like to get connected."
)}`;

/** Closing CTA — full sunset band, giant type, white CTA. */
export function CtaBanner({
  title = (
    <>
      Ready when
      <br />
      you are.
    </>
  ),
  lede = "Check your estate, pick a plan, and be streaming in 3 days.",
}: {
  title?: React.ReactNode;
  lede?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden grad-sunset">
      <div aria-hidden="true" className="grain absolute inset-0" />
      <span aria-hidden="true" className="ghost absolute -bottom-8 left-0 text-[24vw] md:text-[14rem]" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.3)" }}>
        CONNECT
      </span>
      <Container className="relative py-20 text-center md:py-28">
        <h2 className="display sr mx-auto max-w-3xl text-5xl font-extrabold text-white sm:text-6xl md:text-7xl">{title}</h2>
        <p className="sr mx-auto mt-6 max-w-md text-base text-white/90 md:text-lg">{lede}</p>
        <div className="sr mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href={site.selfcare.onboard} external variant="white">
            Check Coverage <Arrow />
          </Button>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
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
