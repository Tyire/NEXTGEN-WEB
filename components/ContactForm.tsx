import { site } from "@/lib/site";

// ponytail: static-export site has no server. Form composes a mailto so the
// user's own mail client sends it. Now a SERVER component (uncontrolled
// inputs) — the form submits natively with zero JavaScript.
// Shared with other mailto-based forms (e.g. CloudWaitlistForm) so every form
// on the site looks and behaves the same way.
export const inputCls =
  "w-full rounded-2xl border-2 border-[var(--color-hairline)] bg-[var(--color-ink)] px-4 py-3.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] focus-visible:border-[var(--color-brand-orange)]";
export const labelCls = "eyebrow mb-2 block";

export function ContactForm() {
  return (
    <form action={`mailto:${site.email}`} method="post" encType="text/plain" className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" placeholder="e.g. Ada Obi…" />
        <Field label="Phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="e.g. 0801 234 5678…" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          placeholder="e.g. you@company.com…"
        />
        <div>
          <label htmlFor="cf-interest" className={labelCls}>
            I&rsquo;m interested in
          </label>
          <select id="cf-interest" name="interest" defaultValue="Fiber Internet" className={inputCls} style={{ colorScheme: "inherit" }}>
            <option>Fiber Internet</option>
            <option>Voice / VoIP</option>
            <option>Metro Ethernet / Enterprise</option>
            <option>Something else</option>
          </select>
        </div>
      </div>
      <Field label="Estate / address" name="address" autoComplete="street-address" placeholder="e.g. Lekki Phase 1, Lagos…" />
      <div>
        <label htmlFor="cf-message" className={labelCls}>
          Message
        </label>
        <textarea id="cf-message" name="message" rows={4} placeholder="Tell us what you need…" className={inputCls} />
      </div>
      <button
        type="submit"
        className="btn btn-accent mt-1 w-full sm:w-fit"
      >
        Send Enquiry
      </button>
      <p className="text-xs text-[var(--color-fg-faint)]">
        Prefer to talk? Call {site.phoneDisplay} or message us on WhatsApp.
      </p>
    </form>
  );
}

export function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
  inputMode,
  spellCheck,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "url" | "numeric";
  spellCheck?: boolean;
}) {
  const id = `cf-${name}`;
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span className="text-[var(--color-brand-orange)]"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        spellCheck={spellCheck}
        className={inputCls}
      />
    </div>
  );
}
