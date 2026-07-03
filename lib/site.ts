// Central site config — single source of truth for NAP, nav, services, SEO.
// NOTE: phone/WhatsApp/Instagram confirmed 2026-07-02 from the selfcare portal.
// STILL PENDING: precise street address (current address is region-level only).

export const site = {
  name: "NextGen Telcoms",
  legalName: "NextGen Telcoms Ltd",
  shortName: "NextGen",
  domain: "nextgen.ng",
  url: "https://nextgen.ng",
  tagline: "Fiber that keeps up with you.",
  description:
    "GPON fiber broadband, business VoIP and Metro Ethernet for homes and enterprises across Lagos and Nigeria. Speeds from 2 Mbps to 2.5 Gbps, 99.9% uptime, 3-day install.",
  email: "info@nextgen.ng",
  phoneDisplay: "0201 640 0001",
  phoneDisplayAlt: "0201 640 0010",
  phoneHref: "+2342016400001", // 0201 640 0001, E.164
  phoneHrefAlt: "+2342016400010", // 0201 640 0010, E.164
  whatsapp: "+2349166405000", // +234 916 640 5000
  // Customer self-care: account login + estate/plan onboarding & checkout.
  selfcare: {
    login: "https://selfcare.nextgen.ng",
    onboard: "https://selfcare.nextgen.ng/onboard",
  },
  address: {
    street: "", // TODO: confirm precise street address (region-level only for now)
    city: "",
    region: "Lagos State",
    country: "NG",
  },
  geo: { lat: 6.5244, lng: 3.3792 }, // approx Lagos centroid — update when HQ street confirmed
  social: {
    twitter: "@nextgenng",
    linkedin: "https://www.linkedin.com/company/nextgen-ng",
    instagram: "https://www.instagram.com/nextgentelcom",
  },
} as const;

export const nav = [
  { label: "Fiber Internet", href: "/connectivity" },
  { label: "Voice", href: "/voice" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Plans", href: "/plans" },
  { label: "Contact", href: "/contact" },
] as const;

export type Service = {
  slug: string;
  href: string;
  eyebrow: string;
  name: string;
  short: string;
  benefit: string;
  stat: { value: string; label: string };
  audience: string[];
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "connectivity",
    href: "/connectivity",
    eyebrow: "GPON / FTTx",
    name: "Fiber Internet",
    short: "Dedicated fiber broadband built on GPON — symmetrical, low-latency, and steady at peak hours.",
    benefit: "True fiber to the home and premises, not shared cabinet copper.",
    stat: { value: "2.5 Gbps", label: "top tier (STM-16)" },
    audience: ["Homes", "Enterprise", "Education", "Carriers", "Cloud & content"],
    keywords: ["GPON internet Nigeria", "GPON fiber Lagos", "fiber broadband Lagos", "1Gbps internet Nigeria price"],
  },
  {
    slug: "voice",
    href: "/voice",
    eyebrow: "VoIP",
    name: "Voice",
    short: "Crystal-clear calling over fiber for home and business, on the 01-640xxxx Lagos number range.",
    benefit: "HD voice that rides your fiber line — no separate copper, no dropouts.",
    stat: { value: "01-640", label: "Lagos number range" },
    audience: ["Homes", "SMEs", "Call centers", "Corporate PBX"],
    keywords: ["business VoIP Nigeria", "VoIP Lagos", "hosted PBX Nigeria"],
  },
  {
    slug: "enterprise",
    href: "/enterprise",
    eyebrow: "Metro Ethernet",
    name: "Custom Network Solutions",
    short: "IP/MPLS Metro Ethernet for HQ-to-branch data transport and tailor-made enterprise connectivity.",
    benefit: "Carrier-grade transport with SLAs, engineered to your topology.",
    stat: { value: "99.9%", label: "uptime SLA" },
    audience: ["Multi-site enterprise", "Banks & fintech", "Government", "ISPs & carriers"],
    keywords: ["Metro Ethernet Nigeria", "IP MPLS Nigeria", "enterprise connectivity Lagos"],
  },
];

export const trustStats = [
  { value: "99.9%", label: "Network uptime" },
  { value: "2.5 Gbps", label: "Top fiber tier" },
  { value: "3-day", label: "Install after survey" },
] as const;

// Fiber speed tiers — 2 Mbps up to STM-16 (2.5 Gbps)
export const speedTiers = [
  { name: "Starter", speed: "2 – 10 Mbps", use: "Light browsing, email, single home", tier: "home" },
  { name: "Home Pro", speed: "25 – 100 Mbps", use: "Streaming, WFH, smart homes", tier: "home", featured: true },
  { name: "Gigabit", speed: "200 Mbps – 1 Gbps", use: "Creators, heavy households, small offices", tier: "home" },
  { name: "Business", speed: "100 Mbps – 1 Gbps", use: "Dedicated, symmetrical, SLA-backed", tier: "business" },
  { name: "Carrier STM", speed: "Up to 2.5 Gbps (STM-16)", use: "Carriers, data centers, large campuses", tier: "business" },
] as const;

// Real lit coverage — the estates/areas live on the selfcare onboarding portal
// (confirmed 2026-07-02). Broad areas first, then the specific estates.
export const coverageZones = [
  "Ikate", "Lekki", "Ajah", "Ilasan", "Orchid",
  "Lekky County Homes", "Lakeview Park II", "Grandview Estate",
  "Homestead Apartment", "Janel Apartment", "Olivia Court",
  "MUFASA", "Camberwell 5", "Eastline Shopping Complex", "SUNSHINEVIEW",
] as const;
