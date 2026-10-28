import { Container, Eyebrow } from "@/components/ui";
import { BlobVideo } from "@/components/BlobVideo";
import { KineticFabric } from "@/components/sections/KineticFabric";

/**
 * Subpage hero: banner imagery + ghost word + sunset accents.
 * `image` is a public/images/people basename, e.g. "banner-voice". Omit it
 * (no photography fetched for this page yet) to fall back to a dark
 * grain/gradient panel instead of a broken <picture> — same layout, same
 * copy treatment, no photo dependency.
 * `video` (a /videos/*.vid path) fades in OVER the image when it plays —
 * the image stays as the instant/no-JS experience.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  video,
  ghost,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  image?: string;
  video?: string;
  ghost: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="on-dark relative isolate flex min-h-[62svh] items-end overflow-hidden pt-28 md:min-h-[58svh] md:pt-32">
      {image ? (
        <>
          {/* Banner image — <picture> with avif/webp at 3 widths, eager (it IS the LCP). */}
          <picture>
            <source
              type="image/avif"
              srcSet={`/images/people/${image}-640.avif 640w, /images/people/${image}-1024.avif 1024w, /images/people/${image}-1600.avif 1600w`}
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet={`/images/people/${image}-640.webp 640w, /images/people/${image}-1024.webp 1024w, /images/people/${image}-1600.webp 1600w`}
              sizes="100vw"
            />
            <img
              src={`/images/people/${image}-1024.webp`}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
          </picture>
          {video && <BlobVideo src={video} className="absolute inset-0 -z-20 h-full w-full object-cover" />}
          {/* Scrim so type always reads. */}
          {/* Monochrome grade: photos go near-greyscale so the page stays black/white
              and the only colour is the accent word. Scrim bottom-up on phones. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/35 mix-blend-saturation" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#000_10%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.25))] md:bg-[linear-gradient(100deg,rgba(0,0,0,0.9)_15%,rgba(0,0,0,0.5)_60%,rgba(0,0,0,0.2))]" />
        </>
      ) : (
        <>
          {/* No photography yet for this page — animated mesh-fabric panel
              instead (paints its own fixed-dark background, matching the
              photo-scrim variant's always-dark treatment regardless of the
              page's light/dark theme). Pointer-interactive on desktop; a
              static single frame under prefers-reduced-motion. */}
          <KineticFabric className="absolute inset-0 -z-20 h-full w-full" />
          <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-10" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,#000_5%,transparent_60%)]" />
        </>
      )}

      <Container className="relative w-full pb-12 pt-10 md:pb-14">
        <span aria-hidden="true" className="ghost absolute -bottom-6 right-0 text-[22vw] md:text-[12rem]" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.14)" }}>
          {ghost}
        </span>
        <div className="max-w-3xl">
          <Eyebrow className="rise !text-white/65">{eyebrow}</Eyebrow>
          <h1 className="display rise-slide text-[2.9rem] leading-[0.98] text-white sm:text-6xl md:text-[5.2rem]" style={{ animationDelay: "0.08s" }}>
            {title}
          </h1>
          <p className="rise mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg" style={{ animationDelay: "0.16s" }}>
            {lede}
          </p>
          {children && (
            <div className="rise cta-pair mt-8 max-w-md sm:max-w-none" style={{ animationDelay: "0.24s" }}>
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
