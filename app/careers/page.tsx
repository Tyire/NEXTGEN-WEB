import type { Metadata } from "next";
import { Container, SectionHead, Button, Arrow } from "@/components/ui";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers — Join NextGen Telcoms",
  description:
    "Help us build the best telecoms company in Nigeria. We're looking for engineers, support specialists, and ambitious people who want to change how Nigeria connects.",
  alternates: { canonical: "/careers" },
};

const perks = [
  { icon: "⚡", title: "Work on real infrastructure", body: "Not a reseller. Not a startup with a deck. We build and run the actual network — fiber in the ground, hardware in the field, engineers on the line." },
  { icon: "🇳🇬", title: "Built for Nigeria", body: "Every product decision, every hire, every expansion is about serving Nigerians better. You'll feel the impact of your work every single day." },
  { icon: "🌱", title: "Grow with us", body: "We're at an early stage of a big mission. The people who join now shape the culture, the systems, and the direction of the company." },
  { icon: "🛠️", title: "Solve real problems", body: "Power outages, terrain challenges, last-mile complexity — Nigerian telecoms is genuinely hard. We like it that way." },
];

const openRoles = [
  { title: "Field Fiber Technician", team: "Network Operations", location: "Lagos", type: "Full-time" },
  { title: "Customer Support Engineer", team: "Support", location: "Lagos", type: "Full-time" },
  { title: "Network Operations Engineer (NOC)", team: "Network Operations", location: "Lagos", type: "Full-time" },
  { title: "Sales & Business Development", team: "Sales", location: "Lagos", type: "Full-time" },
];

// Input/label shared styles
const inputCls =
  "w-full rounded-2xl border-2 border-[var(--color-hairline)] bg-[var(--color-ink)] px-4 py-3.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] focus-visible:border-[var(--color-brand-orange)] focus-visible:outline-none";
const labelCls = "eyebrow mb-2 block";

export default function CareersPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Careers", href: "/careers" }]} />

      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build something
            <br />
            <span className="text-flow">magnificent.</span>
          </>
        }
        lede="Do you want to come join us build the best telecoms company in Nigeria? We're looking for people who are obsessed with reliability, honest with customers, and ready to get their hands dirty."
        image="banner-connectivity"
        ghost="TEAM"
      >
        <Button href="#apply">
          See open roles <Arrow />
        </Button>
      </PageHero>

      {/* ── WHY NEXTGEN ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Why work here"
            title={
              <>
                We're building something{" "}
                <span className="text-[var(--color-brand-orange)]">that matters.</span>
              </>
            }
            lede="Reliable internet changes everything — how people work, study, build businesses and stay connected to each other. That's what we come in for."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16">
            {perks.map((p, i) => (
              <div
                key={p.title}
                className="sr-pop lift rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-8"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <span className="mb-4 block text-3xl" aria-hidden="true">{p.icon}</span>
                <h3 className="display text-xl font-bold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── OPEN ROLES ──────────────────────────────────────────── */}
      <section className="wash relative overflow-hidden py-20 md:py-28" id="apply">
        <span aria-hidden="true" className="ghost absolute -top-3 right-0 text-[18vw] opacity-40 md:text-[10rem]">
          ROLES
        </span>
        <Container className="relative">
          <SectionHead
            eyebrow="Open positions"
            title={
              <>
                Come{" "}
                <span className="text-[var(--color-brand-orange)]">join us.</span>
              </>
            }
            lede="We're always interested in talented people. If your role isn't listed, apply anyway — tell us what you'd bring."
          />
          <ul className="mt-12 grid gap-3 md:mt-16">
            {openRoles.map((role, i) => (
              <li
                key={role.title}
                className="sr flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-surface)] px-6 py-5"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div>
                  <p className="display font-bold">{role.title}</p>
                  <p className="mt-1 text-xs text-[var(--color-fg-faint)]">
                    {role.team} · {role.location}
                  </p>
                </div>
                <span className="rounded-full border border-[var(--color-hairline)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--color-fg-muted)]">
                  {role.type}
                </span>
              </li>
            ))}
          </ul>

          {/* ── APPLICATION FORM ─────────────────────────────── */}
          <div className="sr-pop mt-16 md:mt-20" id="application-form">
            <div className="grad-border rounded-[var(--radius)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-pop)] sm:p-8 md:p-10">
              <p className="eyebrow mb-2">Apply now</p>
              <h2 className="display mb-1 text-2xl font-bold md:text-3xl">Reach out to us</h2>
              <p className="mb-8 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                Tell us who you are and what role you're interested in. We read every application and
                respond to everyone who applies.
              </p>
              <form
                action={`mailto:${site.email}?subject=Career Application`}
                method="post"
                encType="text/plain"
                className="grid gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="car-name" className={labelCls}>
                      Full name <span className="text-[var(--color-brand-orange)]">*</span>
                    </label>
                    <input id="car-name" name="name" type="text" required autoComplete="name" placeholder="e.g. Ada Obi…" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="car-email" className={labelCls}>
                      Email <span className="text-[var(--color-brand-orange)]">*</span>
                    </label>
                    <input id="car-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com…" className={inputCls} />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="car-phone" className={labelCls}>
                      Phone <span className="text-[var(--color-brand-orange)]">*</span>
                    </label>
                    <input id="car-phone" name="phone" type="tel" required autoComplete="tel" placeholder="e.g. 0801 234 5678…" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="car-role" className={labelCls}>
                      Role interested in <span className="text-[var(--color-brand-orange)]">*</span>
                    </label>
                    <select id="car-role" name="role" required defaultValue="" className={inputCls} style={{ colorScheme: "inherit" }}>
                      <option value="" disabled>Select a role…</option>
                      {openRoles.map((r) => (
                        <option key={r.title}>{r.title}</option>
                      ))}
                      <option>Other / Not listed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="car-portfolio" className={labelCls}>
                    LinkedIn / Portfolio / CV link
                  </label>
                  <input
                    id="car-portfolio"
                    name="portfolio"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile…"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="car-message" className={labelCls}>
                    Tell us about yourself <span className="text-[var(--color-brand-orange)]">*</span>
                  </label>
                  <textarea
                    id="car-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="What do you bring to NextGen? What excites you about this role?…"
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    className="grad-sunset inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_-12px_rgba(255,60,44,0.6)] transition-transform duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 active:scale-[0.97]"
                  >
                    Send Application
                  </button>
                  <p className="text-xs text-[var(--color-fg-faint)]">
                    Or email us directly at{" "}
                    <a href={`mailto:${site.email}`} className="text-[var(--color-brand-orange)] hover:underline">
                      {site.email}
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner
        title={
          <>
            Ready to
            <br />
            join the mission?
          </>
        }
        lede="Apply above or email us. We're a small, fast team — you'll hear back quickly."
      />
    </>
  );
}
