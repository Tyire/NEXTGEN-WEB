// NEXTGEN CLOUD — pre-launch service line (hosting, email, VPS, AI builder,
// SEO scan, "we build it", enterprise). Prices are PROPOSALS pending NextGen's
// own approval — see PRICING_STATUS. Do not invent figures beyond this file;
// every number here traces to the brief. No uptime %, no "cheapest", no
// customer counts, no competitor names, no certification claims anywhere.

/** Flip to "live" once NextGen confirms final prices and launch is public. */
export const PRICING_STATUS: "proposal" | "live" = "proposal";

export type CloudTier = {
  name: string;
  priceNgn: number | null; // null = custom quote → "Talk to sales"
  priceFrom?: boolean; // true → render "from ₦X"
  unit: string; // "/ month", "one-off", "/ 1U / month"
  includes: string[];
};

export type CloudProduct = {
  slug: string;
  href: string;
  eyebrow: string;
  name: string;
  short: string;
  benefit: string;
  comingSoon?: boolean;
  tiers: CloudTier[];
};

export const cloudProducts: CloudProduct[] = [
  {
    slug: "hosting",
    href: "/cloud/hosting",
    eyebrow: "Web hosting",
    name: "Hosting",
    short: "Fast NVMe hosting on NextGen's own Lagos network — set up for you in about 48 hours.",
    benefit: "Firewall, malware scanning and daily offsite backup on every plan, not as an upsell.",
    tiers: [
      {
        name: "Starter",
        priceNgn: 2500,
        unit: "/ month",
        includes: [
          "1 website",
          "10 GB NVMe storage",
          "5 mailboxes included",
          "Daily offsite backup",
          "Malware scanning",
          "Free .com.ng on annual plans",
        ],
      },
      {
        name: "Business",
        priceNgn: 5000,
        unit: "/ month",
        includes: [
          "5 websites",
          "30 GB NVMe storage",
          "15 mailboxes included",
          "Firewall",
          "Staging site",
          "Daily offsite backup",
        ],
      },
    ],
  },
  {
    slug: "email",
    href: "/cloud/email",
    eyebrow: "Business email",
    name: "Email",
    short: "Email that reaches the inbox — SPF, DKIM and DMARC set up automatically on every domain.",
    benefit: "Works in Outlook and on your phone. Free mailboxes come with any hosting plan.",
    tiers: [
      {
        name: "Per mailbox",
        priceNgn: 600,
        unit: "/ month",
        includes: [
          "10 GB per mailbox",
          "Works in Outlook, Mail and phone apps",
          "SPF, DKIM, DMARC configured for you",
          "5–15 mailboxes free with any hosting plan",
        ],
      },
    ],
  },
  {
    slug: "vps",
    href: "/cloud/vps",
    eyebrow: "Custom VPS",
    name: "VPS (Lagos)",
    short: "A Lagos virtual server billed in Naira — IXPN-peered, no dollar-card limits.",
    benefit: "Data stays in Nigeria. Add managed support when you don't want to run the box yourself.",
    tiers: [
      { name: "2 GB", priceNgn: 14000, unit: "/ month", includes: ["1 vCPU", "40 GB disk", "Lagos, IXPN-peered"] },
      { name: "4 GB", priceNgn: 26000, unit: "/ month", includes: ["2 vCPU", "80 GB disk", "Lagos, IXPN-peered"] },
      { name: "8 GB", priceNgn: 48000, unit: "/ month", includes: ["4 vCPU", "160 GB disk", "Lagos, IXPN-peered"] },
      { name: "16 GB", priceNgn: 92000, unit: "/ month", includes: ["8 vCPU", "320 GB disk", "Lagos, IXPN-peered"] },
      { name: "Managed add-on", priceNgn: 15000, unit: "/ month, any size", includes: ["We patch, monitor and respond so you don't have to"] },
    ],
  },
  {
    slug: "build",
    href: "/cloud/build",
    eyebrow: "We build it",
    name: "We Build It",
    short: "A site, store or portal built for you — then kept running with a monthly care plan.",
    benefit: "Done for you over WhatsApp, not a DIY builder you have to learn.",
    tiers: [
      { name: "Starter site", priceNgn: 250000, unit: "one-off", includes: ["Small business site, done for you"] },
      { name: "Corporate site", priceNgn: 450000, priceFrom: true, unit: "– ₦900,000 one-off", includes: ["Larger, multi-page corporate site"] },
      { name: "Online store", priceNgn: 800000, priceFrom: true, unit: "one-off", includes: ["Paystack checkout built in"] },
      { name: "Web / school portal app", priceNgn: 2500000, priceFrom: true, unit: "one-off", includes: ["Custom application, not a template"] },
      { name: "Care plan", priceNgn: 25000, unit: "/ month", includes: ["Updates, fixes and a monthly report"] },
    ],
  },
  {
    slug: "enterprise",
    href: "/cloud/enterprise",
    eyebrow: "Enterprise",
    name: "Enterprise Cloud",
    short: "Colocation, disaster recovery and private cloud on NextGen's own Lagos infrastructure.",
    benefit: "Data residency for fintechs, schools, hospitals and government suppliers — NDPA in mind.",
    tiers: [
      { name: "Colocation", priceNgn: 120000, priceFrom: true, unit: "/ 1U / month", includes: ["NextGen rack space, power and bandwidth"] },
      { name: "Disaster recovery", priceNgn: 250000, priceFrom: true, unit: "/ month", includes: ["Live backup copy held in Lagos"] },
      { name: "Private cloud", priceNgn: 150000, priceFrom: true, unit: "/ month", includes: ["Dedicated servers + a data agreement"] },
    ],
  },
  {
    slug: "ai-builder",
    href: "/cloud/ai-builder",
    eyebrow: "Coming soon",
    name: "AI Site Builder",
    short: "Answer a few questions on WhatsApp and get a site built for you — free to build, pay to publish.",
    benefit: "No drag-and-drop editor to learn. You talk, it builds.",
    comingSoon: true,
    tiers: [{ name: "Publish", priceNgn: 4000, unit: "one-off, includes hosting", includes: ["Free to build via WhatsApp questions", "Pay only when you publish"] }],
  },
  {
    slug: "seo-scan",
    href: "/cloud/seo-scan",
    eyebrow: "Coming soon",
    name: "SEO Analyzer",
    short: "A free scan of your site, plus a plain-English list of what to fix.",
    benefit: "No jargon — just what's wrong and what to do about it.",
    comingSoon: true,
    tiers: [
      { name: "Free scan", priceNgn: 0, unit: "", includes: ["One-off scan of your site"] },
      { name: "Pro", priceNgn: 7500, unit: "/ month", includes: ["3 sites", "Weekly checks", "Plain-English fix list"] },
    ],
  },
];

export const cloudProductsLive = cloudProducts.filter((p) => !p.comingSoon);
export const cloudProductsComingSoon = cloudProducts.filter((p) => p.comingSoon);

export const cloudReasons = [
  {
    t: "Done for you, not DIY.",
    d: "Setup happens over WhatsApp. Your site, email and Google Business Profile go live in about 48 hours.",
  },
  {
    t: "Hosted in Lagos, on our network.",
    d: "IXPN-peered, billed in Naira — no dollar-card limits, and your data stays in Nigeria.",
  },
  {
    t: "Security as standard.",
    d: "Firewall, malware scanning, daily offsite backups and 2FA on every plan, not an upsell.",
  },
  {
    t: "Email that reaches the inbox.",
    d: "SPF, DKIM and DMARC are set up automatically on every domain we host.",
  },
  {
    t: "One bill with your internet.",
    d: "Bundle NextGen Cloud with your existing NextGen business connectivity plan.",
  },
  {
    t: "Honest renewal pricing.",
    d: "No intro price that triples in year two. What you see is what you keep paying.",
  },
] as const;

export const cloudHowItWorks = [
  { t: "Tell us on WhatsApp", d: "Say what you need — a site, email, a server. No forms to fight through." },
  { t: "We set it up", d: "Our team configures hosting, email, DNS and security on our Lagos network." },
  { t: "You're online", d: "Live in about 48 hours, with a human to call if anything needs changing." },
] as const;

/** Add-ons that exist as a roadmap item only — never show a price or a date. */
export const cloudComingSoonAddOns = [
  ".ng domains (NiRA registrar)",
  "WhatsApp business chatbot",
  "Office backup",
  "School portal subscription",
  "Reseller programme",
] as const;

export function formatCloudPrice(t: CloudTier): string {
  if (t.priceNgn === 0) return "Free";
  if (t.priceNgn == null) return "Talk to sales";
  const amt = new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(t.priceNgn);
  return `${t.priceFrom ? "from " : ""}₦${amt}`;
}
