import { Logo } from "./Logo";
import { Container } from "./ui";
import { site, nav, services, coverageZones } from "@/lib/site";

const year = new Date().getFullYear();

/** Server component, plain anchors — renders complete without any JS. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-hairline)] bg-[var(--color-void)]">
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
              <Logo className="h-8 w-auto" />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {site.tagline} GPON fiber, business voice and Metro Ethernet across Lagos and Nigeria.
            </p>
            <div className="mt-6 flex gap-3">
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
          </p>
          <a href="#top" className="font-semibold text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">
            Back to top ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}
