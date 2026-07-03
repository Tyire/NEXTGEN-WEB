// PLAN DATA — mirrors the live self-care onboarding portal, confirmed 2026-07-02
// from the estate/plan data embedded in https://selfcare.nextgen.ng/onboard
// (obAllPlans / obEstatePlanMap). Price = net unitprice + tax (gross ₦).
//
// This SUPERSEDES the old WooCommerce shop-now lineup (1–5 Mbps), which is
// deprecated. Every plan links customers to the onboarding portal, where they
// pick their estate + plan and pay. Do not invent prices — re-check the portal.

export type Plan = {
  id: string;
  name: string;
  speed: string;
  priceNgn: number | null; // null = quote-based → UI shows "Contact for pricing"
  cycle: "day" | "month" | "year";
  featured?: boolean;
  highlights: string[];
  checkoutUrl: string;
};

export const plansUpdatedNote =
  "Live prices from the NextGen onboarding portal, confirmed 2 Jul 2026";

// Selecting a plan sends the customer to onboarding to choose their estate & pay.
const ONBOARD = "https://selfcare.nextgen.ng/onboard";

export const plans: Plan[] = [
  {
    id: "daily-40",
    name: "Daily Unlimited",
    speed: "40 Mbps",
    priceNgn: 1500,
    cycle: "day",
    highlights: ["Unlimited data, pay by the day", "Great for short stays & top-ups", "No monthly commitment"],
    checkoutUrl: ONBOARD,
  },
  {
    id: "prepaid-25",
    name: "25 Mbps Unlimited",
    speed: "25 Mbps",
    priceNgn: 15000,
    cycle: "month",
    highlights: ["Unlimited data, no caps", "HD streaming & video calls", "Prepaid — no contract"],
    checkoutUrl: ONBOARD,
  },
  {
    id: "prepaid-35",
    name: "35 Mbps Unlimited",
    speed: "35 Mbps",
    priceNgn: 20500,
    cycle: "month",
    featured: true,
    highlights: ["Unlimited data, no caps", "Busy household, work-from-home", "Prepaid — no contract"],
    checkoutUrl: ONBOARD,
  },
  {
    id: "prepaid-50",
    name: "50 Mbps Unlimited",
    speed: "50 Mbps",
    priceNgn: 25750,
    cycle: "month",
    highlights: ["Unlimited data, no caps", "4K streaming & heavy use", "Prepaid — no contract"],
    checkoutUrl: ONBOARD,
  },
  {
    id: "business",
    name: "Business & Dedicated",
    speed: "Dedicated / SLA",
    priceNgn: null, // quote-based — dedicated & office plans, not self-serve residential
    cycle: "month",
    highlights: ["Dedicated symmetrical fibre", "Office & 30 Mbps dedicated tiers", "SLA-backed, priority support"],
    checkoutUrl: "/contact",
  },
];

/** ₦ formatter — returns a "Contact for pricing" sentinel when price is unknown. */
export function formatNaira(value: number | null): string {
  if (value == null) return "Contact for pricing";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}
