import { Logo } from "./Logo";
import { Container } from "./ui";
import { InstallPrompt } from "./InstallPrompt";
import { site, nav, footerLinks, services, coverageZones } from "@/lib/site";

const year = new Date().getFullYear();

/** Server component, plain anchors — renders complete without any JS. */
export function Footer() {
  return (
    // data-theme="dark" scopes the dark tokens: the footer is always ink navy
    <footer data-theme="dark" className="relative overflow-hidden bg-[var(--color-void)] text-[var(--color-fg)]">
      {/* sunset edge */}
      <div aria-hidden="true" className="grad-sunset h-1 w-full" />
      <Container className="relative py-14 md:py-20">
        <span aria-hidden="true" className="ghost absolute -top-4 left-0 text-[22vw] opacity-40 md:text-[13rem]">
          NEXTGEN
        </span>

        <div className="relative grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- plain <a> by design: nav must work without hydration */}
            <a href="/" aria-label="NextGen Telcoms home">
              <Logo className="h-11 w-auto" />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {site.tagline} And people who pick up when you call — GPON fiber, business voice and
              Metro Ethernet across Lagos and Nigeria.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi NextGen, I'd like to ask about fiber availability and plans.")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with NextGen on WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-fg-muted)] transition-colors hover:border-[#25D366] hover:text-[#25D366]"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.512 5.26l-.999 3.648 3.65-.957zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NextGen on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-brand-orange)] hover:text-[var(--color-fg)]"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NextGen on LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-brand-orange)] hover:text-[var(--color-fg)]"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                </svg>
              </a>
            </div>
          </div>

          <nav aria-label="Site">
            <p className="eyebrow mb-4">Explore</p>
            <ul className="grid gap-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={site.selfcare.login} target="_blank" rel="noopener noreferrer" className="text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]">
                  Customer Login
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Live in</p>
            <ul className="grid gap-2.5 text-sm text-[var(--color-fg-muted)]">
              {coverageZones.slice(0, 5).map((z) => (
                <li key={z}>{z}</li>
              ))}
              <li>
                <a href="/plans" className="font-semibold text-[var(--color-brand-orange)] hover:underline">
                  Check your estate →
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Talk to us</p>
            <ul className="grid gap-2.5 text-sm">
              <li>
                <a href={`tel:${site.phoneHref}`} className="font-semibold text-[var(--color-fg)] hover:text-[var(--color-brand-orange)]">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHrefAlt}`} className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">
                  {site.phoneDisplayAlt}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">
                  {site.email}
                </a>
              </li>
              <li className="text-[var(--color-fg-muted)]">{site.address.region}, Nigeria</li>
            </ul>
            <InstallPrompt className="mt-6" />
          </div>
        </div>

        <div className="relative mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-hairline)] pt-6 text-xs text-[var(--color-fg-faint)]">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            {services.map((s) => (
              <a key={s.slug} href={s.href} className="hover:text-[var(--color-fg)]">
                {s.eyebrow}
              </a>
            ))}
            {footerLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[var(--color-fg)]">
                {l.label}
              </a>
            ))}
          </p>
          <a href="#top" className="font-semibold text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">
            Back to top ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}
