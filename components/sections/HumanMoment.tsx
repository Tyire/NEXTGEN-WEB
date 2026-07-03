import { Container, Eyebrow } from "@/components/ui";
import { PeopleImage } from "@/components/PeopleImage";
import { imagery } from "@/data/imagery";

/**
 * Twoet-style human moment: a candid lifestyle photo paired with copy.
 * Image shows a gradient placeholder until `npm run fetch-images` populates the slot.
 */
export function HumanMoment({
  slot,
  eyebrow,
  title,
  body,
  side = "right",
  tone = "ink",
}: {
  slot: keyof typeof imagery;
  eyebrow: string;
  title: string;
  body: string;
  side?: "left" | "right";
  tone?: "ink" | "void";
}) {
  const bg = tone === "void" ? "bg-[var(--color-void)] border-y border-[var(--color-hairline)]" : "bg-[var(--color-ink)]";
  return (
    <section className={`py-20 ${bg}`}>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className={side === "left" ? "lg:order-2" : ""}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="display mt-4 text-3xl font-semibold text-[var(--color-fg)] md:text-4xl">{title}</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--color-fg-muted)]">{body}</p>
          </div>
          <div className={`relative overflow-hidden aspect-[4/3] rounded-[calc(var(--radius)+4px)] border border-[var(--color-hairline)] ${side === "left" ? "lg:order-1" : ""}`}>
            <PeopleImage slot={slot} className="h-full w-full object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </Container>
    </section>
  );
}
