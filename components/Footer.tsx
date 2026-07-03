import Link from "next/link";
import { Logo } from "./Logo";
import { site, nav, services } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-hairline)] bg-[var(--color-void)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + NAP (schema-friendly) */}
          <div>
            <Link href="/" aria-label="NextGen Telcoms home">
              <Logo className="h-9 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {site.description}
            </p>
            <address className="mt-6 not-italic text-sm text-[var(--color-fg-faint)]">
              <div>{[site.address.street, site.address.city, site.address.region].filter(Boolean).join(", ")}, Nigeria</div>
              <a href={`tel:${site.phoneHref}`} className="mt-1 block hover:text-[var(--color-brand-amber)]">
                {site.phoneDisplay}
              </a>
              <a href={`tel:${site.phoneHrefAlt}`} className="block hover:text-[var(--color-brand-amber)]">
                {site.phoneDisplayAlt}
              </a>
              <a href={`mailto:${site.email}`} className="block hover:text-[var(--color-brand-amber)]">
                {site.email}
              </a>
            </address>
          </div>

          <FooterCol title="Services" links={services.map((s) => ({ label: s.name, href: s.href }))} />
          <FooterCol
            title="Company"
            links={[...nav, { label: "Customer Login", href: site.selfcare.login }]}
          />
          <div>
            <h2 className="eyebrow mb-4">Connect</h2>
            <div className="flex items-center gap-3">
              <IconLink label="LinkedIn" href={site.social.linkedin}>
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0z" />
              </IconLink>
              <IconLink label="Instagram" href={site.social.instagram}>
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
              </IconLink>
              <IconLink label="WhatsApp" href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}>
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.512 5.26l-.999 3.648 3.65-.957zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </IconLink>
              <IconLink label="Email sales" href={`mailto:${site.email}`}>
                <path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm10 7.4L3.4 6H20.6L12 11.4zM3 8.3V18h18V8.3l-8.4 5.3a1 1 0 0 1-1.2 0L3 8.3z" />
              </IconLink>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--color-hairline)] pt-8 text-xs text-[var(--color-fg-faint)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p className="font-mono tracking-wide">GPON Fiber · VoIP · Metro Ethernet — Lagos, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}

function IconLink({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-fg-muted)] transition-[transform,color,border-color] duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--color-brand-orange)] hover:text-[var(--color-brand-amber)] active:scale-[0.95]"
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}

function FooterCol({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="eyebrow mb-4">{title}</h2>
      <ul className="space-y-2.5">
        {links.map((l) => {
          const external = l.href.startsWith("http") || l.href.startsWith("mailto:");
          return (
            <li key={l.href + l.label}>
              {external ? (
                <a href={l.href} className="text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]">
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} className="text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]">
                  {l.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
