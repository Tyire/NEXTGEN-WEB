import { site, waLink } from "@/lib/site";
import { cloudProducts } from "@/data/cloud-plans";
import { Field, inputCls, labelCls } from "@/components/ContactForm";
import { Arrow } from "@/components/ui";

// INTERIM lead capture: static-export site has no server yet, so — same as
// ContactForm — this composes a mailto the visitor's own mail client sends.
// A real backend (server endpoint + email notification) is a follow-up phase
// once the site moves off static hosting; see docs/CONTEXT.md.
//
// `product` pre-selects one checkbox when the form is embedded on a specific
// /cloud/* page (e.g. "vps"); omit it on the /cloud hub for a blank picker.
export function CloudWaitlistForm({ product }: { product?: string }) {
  return (
    <form action={`mailto:${site.email}`} method="post" encType="text/plain" className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" placeholder="e.g. Ada Obi…" />
        <Field label="Business name" name="business" autoComplete="organization" placeholder="e.g. Ada Fashion House…" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="WhatsApp number" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="e.g. 0801 234 5678…" />
        <Field label="Email" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} required placeholder="e.g. you@company.com…" />
      </div>

      <fieldset>
        <legend className={labelCls}>I&rsquo;m interested in</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {cloudProducts.map((p) => (
            <label
              key={p.slug}
              className="flex items-center gap-2.5 rounded-2xl border-2 border-[var(--color-hairline)] bg-[var(--color-ink)] px-4 py-3 text-sm text-[var(--color-fg)] has-[:checked]:border-[var(--color-brand-orange)]"
            >
              <input type="checkbox" name="interest" value={p.name} defaultChecked={product === p.slug} className="h-4 w-4 accent-[var(--color-brand-orange)]" />
              {p.name}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelCls}>Existing NextGen customer?</legend>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 rounded-full border-2 border-[var(--color-hairline)] bg-[var(--color-ink)] px-5 py-2.5 text-sm has-[:checked]:border-[var(--color-brand-orange)]">
            <input type="radio" name="existing_customer" value="Yes" className="h-4 w-4 accent-[var(--color-brand-orange)]" />
            Yes
          </label>
          <label className="flex items-center gap-2 rounded-full border-2 border-[var(--color-hairline)] bg-[var(--color-ink)] px-5 py-2.5 text-sm has-[:checked]:border-[var(--color-brand-orange)]">
            <input type="radio" name="existing_customer" value="No" defaultChecked className="h-4 w-4 accent-[var(--color-brand-orange)]" />
            No
          </label>
        </div>
      </fieldset>

      <div>
        <label htmlFor="cwf-message" className={labelCls}>
          Anything else we should know?
        </label>
        <textarea id="cwf-message" name="message" rows={4} placeholder="Optional…" className={inputCls} />
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="btn btn-accent"
        >
          Join the waitlist
        </button>
        <a
          href={waLink(`Hi NextGen, I'm interested in NextGen Cloud${product ? `: ${product}` : ""}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="group btn btn-ghost"
        >
          WhatsApp us instead <Arrow />
        </a>
      </div>
      <p className="text-xs text-[var(--color-fg-faint)]">
        We&rsquo;ll reply on WhatsApp or email — NextGen Cloud is pre-launch, with a small pilot group onboarding first.
      </p>
    </form>
  );
}
