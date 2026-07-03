// Estate → plans + installation, mirrored from the selfcare onboarding portal
// (obEstatePlanMap + obInstallMap, confirmed 2026-07-02). Selecting an estate on
// /plans surfaces exactly what onboarding would: the plans available there, their
// prices, and the installation cost. Re-check the portal before launch.
import { plans, type Plan } from "./plans";

export type Estate = {
  id: number;
  name: string;
  area: string;
  label: string; // dropdown label, mirrors the portal
  planIds: string[]; // references data/plans.ts ids
  installFee: number; // ₦ — 0 means free installation
  firstMonthFree: boolean;
};

// All lit estates offer 25/35/50 Mbps; most also offer the daily plan.
const WITH_DAILY = ["prepaid-25", "prepaid-35", "prepaid-50", "daily-40"];
const NO_DAILY = ["prepaid-25", "prepaid-35", "prepaid-50"];

export const estates: Estate[] = [
  { id: 7, name: "Camberwell 5", area: "Ikate", label: "Camberwell 5 (veritasi) — Ikate", planIds: WITH_DAILY, installFee: 40000, firstMonthFree: false },
  { id: 10, name: "Eastline Shopping Complex", area: "Ajah", label: "Eastline Shopping Complex — Ajah", planIds: NO_DAILY, installFee: 40000, firstMonthFree: false },
  { id: 9, name: "Grandview Estate", area: "Ikate", label: "Grandview Estate — Ikate", planIds: WITH_DAILY, installFee: 40000, firstMonthFree: false },
  { id: 6, name: "Homestead Apartment", area: "Ilasan", label: "Homestead Apartment — Ilasan", planIds: WITH_DAILY, installFee: 0, firstMonthFree: true },
  { id: 5, name: "Janel Apartment", area: "Ilasan", label: "Janel Apartment — Ilasan", planIds: WITH_DAILY, installFee: 40000, firstMonthFree: false },
  { id: 2, name: "Lakeview Park II", area: "Orchid", label: "Lakeview Park II — Orchid", planIds: WITH_DAILY, installFee: 0, firstMonthFree: true },
  { id: 1, name: "Lekky County Homes", area: "Lekki", label: "Lekky County Homes — Lekki", planIds: WITH_DAILY, installFee: 0, firstMonthFree: true },
  { id: 3, name: "MUFASA", area: "Ikate", label: "MUFASA — Ikate", planIds: WITH_DAILY, installFee: 40000, firstMonthFree: false },
  { id: 8, name: "Olivia Court", area: "Ikate", label: "Olivia Court — Ikate", planIds: WITH_DAILY, installFee: 40000, firstMonthFree: false },
  { id: 4, name: "SUNSHINEVIEW", area: "Ilasan", label: "SUNSHINEVIEW — Ilasan", planIds: WITH_DAILY, installFee: 0, firstMonthFree: true },
];

/** Resolve an estate's plan ids to full Plan objects, in listed order. */
export function estatePlans(e: Estate): Plan[] {
  return e.planIds.map((id) => plans.find((p) => p.id === id)).filter((p): p is Plan => !!p);
}
