import { Container, Eyebrow } from "@/components/ui";
import { BlobVideo } from "@/components/BlobVideo";

/**
 * Subpage hero: banner imagery + ghost word + sunset accents.
 * `image` is a public/images/people basename, e.g. "banner-voice".
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
  image: string;
  video?: string;
  ghost: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[45svh] items-end overflow-hidden pt-24 md:pt-28">
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
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(6,12,24,0.88)_20%,rgba(6,12,24,0.55)_60%,rgba(255,60,44,0.15))]" />

      <Container className="relative w-full pb-12 pt-10 md:pb-14">
        <span aria-hidden="true" className="ghost absolute -bottom-6 right-0 text-[20vw] opacity-25 md:text-[11rem]" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.35)" }}>
          {ghost}
        </span>
        <div className="max-w-3xl" style={{ "--color-fg-faint": "rgba(255,255,255,0.75)" } as React.CSSProperties}>
          <Eyebrow className="rise">{eyebrow}</Eyebrow>
          <h1 className="display rise hero-pop text-4xl font-extrabold text-white sm:text-5xl md:text-6xl" style={{ animationDelay: "0.08s" }}>
            {title}
          </h1>
          <p className="rise hero-pop mt-5 max-w-xl text-base leading-relaxed text-white/90 md:text-lg" style={{ animationDelay: "0.16s" }}>
            {lede}
          </p>
          {children && (
            <div className="rise mt-7 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.24s" }}>
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
