"use client";

import { useState } from "react";
import { estates, estatePlans, type Estate } from "@/data/estates";
import { formatNaira, type Plan } from "@/data/plans";
import { site } from "@/lib/site";
import { Arrow } from "./ui";

/**
 * Pick your estate → exactly what the onboarding portal shows: the plans
 * available there as full price cards, plus the installation cost — with
 * install/promo hints right in the dropdown. JS *enhancement* only; the
 * page around it never depends on it and the WhatsApp fallback always renders.
 */

function estateHint(e: Estate) {
  const install = e.installFee === 0 ? "Free installation" : `${formatNaira(e.installFee)} install`;
  return `${e.label}  ·  ${install}${e.firstMonthFree ? " + 1st month free" : ""}`;
}

function amount(p: Plan) {
  return p.priceNgn == null ? null : new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(p.priceNgn);
}

function EstatePlanCard({ p }: { p: Plan }) {
  const amt = amount(p);
  return (
    <li className="flex flex-col rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink)] p-5">
      <p className="eyebrow">{p.speed}</p>
      <h4 className="display mt-1 text-base font-bold">{p.name}</h4>
      <p className="mt-3">
        {amt ? (
          <>
            <span className="display text-[var(--color-brand-orange)] align-top text-sm font-bold">₦</span>
            <span className="display text-[var(--color-brand-orange)] text-3xl font-extrabold tracking-tight">{amt}</span>
            <span className="ml-1 text-xs text-[var(--color-fg-faint)]">/{p.cycle}</span>
          </>
        ) : (
          <span className="display text-lg font-bold">{formatNaira(p.priceNgn)}</span>
        )}
      </p>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--color-fg-muted)]">{p.highlights[0]}</p>
      <a
        href={site.selfcare.onboard}
        target="_blank"
        rel="noopener noreferrer"
        className="group grad-sunset mt-4 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold text-white transition-transform duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 active:scale-[0.97]"
      >
        Subscribe <Arrow />
      </a>
    </li>
  );
}

export function CoverageChecker() {
  const [id, setId] = useState("");
  const estate = estates.find((e) => String(e.id) === id) ?? null;
  const plans = estate ? estatePlans(estate) : [];

  const waText = encodeURIComponent("Hi NextGen, I'd like to check fibre availability for my estate/area.");

  return (
    <div className="grad-border rounded-[var(--radius)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-pop)] sm:p-8 md:p-10">
      <label htmlFor="coverage-estate" className="eyebrow mb-3 block">
        Find your estate
      </label>
      <select
        id="coverage-estate"
        name="estate"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full rounded-2xl border-2 border-[var(--color-hairline)] bg-[var(--color-ink)] px-5 py-4 text-sm font-semibold text-[var(--color-fg)] focus-visible:border-[var(--color-brand-orange)]"
        style={{ colorScheme: "inherit" }}
      >
        <option value="">Select your estate or area…</option>
        {estates.map((e) => (
          <option key={e.id} value={e.id}>
            {estateHint(e)}
          </option>
        ))}
      </select>

      {/* Results appear on selection — mirrors the onboarding portal. */}
      <div aria-live="polite">
        {estate && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink)] px-5 py-4">
              <span className="font-bold text-[var(--color-success)]">
                Good news — we&rsquo;re live in {estate.name}!
              </span>
              <span className="text-sm text-[var(--color-fg-muted)]">
                Installation:{" "}
                <strong className="text-[var(--color-fg)]">
                  {estate.installFee === 0 ? "Free" : formatNaira(estate.installFee)}
                </strong>
              </span>
              {estate.firstMonthFree && (
                <span className="display rounded-full grad-sunset px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white">
                  1st month free
                </span>
              )}
            </div>

            <p className="eyebrow mt-6 mb-3">Plans available at {estate.name}</p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {plans.map((p) => (
                <EstatePlanCard key={p.id} p={p} />
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-[var(--color-fg-faint)]">
        Don&rsquo;t see your estate?{" "}
        <a
          href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[var(--color-brand-orange)] underline underline-offset-2 hover:text-[var(--color-brand-red)]"
        >
          message us on WhatsApp
        </a>{" "}
        — chances are the fibre is already on your street, and we&rsquo;ll check for you in minutes.
      </p>
    </div>
  );
}
