"use client";

import { useState } from "react";
import { estates, estatePlans } from "@/data/estates";
import { formatNaira } from "@/data/plans";
import { site } from "@/lib/site";
import { Arrow } from "./ui";

/**
 * Pick your estate → see exactly what onboarding would show: available plans
 * with prices, plus the installation cost. This is a JS *enhancement* — the
 * page around it never depends on it, and the WhatsApp fallback line below is
 * plain HTML that always renders.
 */
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
        className="w-full rounded-2xl border-2 border-[var(--color-hairline)] bg-[var(--color-ink)] px-5 py-4 text-sm font-semibold text-[var(--color-fg)] focus-visible:border-[var(--color-brand-orange)] sm:max-w-md"
        style={{ colorScheme: "inherit" }}
      >
        <option value="">Select your estate or area…</option>
        {estates.map((e) => (
          <option key={e.id} value={e.id}>
            {e.label}
          </option>
        ))}
      </select>

      {/* Results appear on selection — mirrors the onboarding portal. */}
      <div aria-live="polite">
        {estate && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink)] px-5 py-4">
              <span className="font-bold text-[var(--color-success)]">We&rsquo;re live in {estate.name}.</span>
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

            <p className="eyebrow mt-6 mb-3">Plans available here</p>
            <ul className="grid gap-3">
              {plans.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink)] px-5 py-4"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-[var(--color-fg)]">{p.name}</span>
                    <span className="display ml-2 text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--color-fg-faint)]">
                      {p.speed}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="display tabular-nums font-bold text-[var(--color-fg)]">
                      {formatNaira(p.priceNgn)}
                      <span className="text-xs font-normal text-[var(--color-fg-faint)]">/{p.cycle}</span>
                    </span>
                    <a
                      href={site.selfcare.onboard}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grad-sunset inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white transition-transform duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 active:scale-[0.97]"
                    >
                      Choose <Arrow />
                    </a>
                  </div>
                </li>
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
          Message us on WhatsApp
        </a>{" "}
        and we&rsquo;ll check the nearest fibre for you.
      </p>
    </div>
  );
}
