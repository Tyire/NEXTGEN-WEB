import type { Metadata } from "next";
import { CloudProductPage } from "@/components/sections/CloudProductPage";

export const metadata: Metadata = {
  title: "AI Site Builder — Coming Soon on NextGen Cloud",
  description:
    "Describe your business on WhatsApp and get a site built for you — free to build, pay only when you publish. Coming soon; join the waitlist.",
  alternates: { canonical: "/cloud/ai-builder" },
};

export default function CloudAiBuilderPage() {
  return (
    <CloudProductPage
      slug="ai-builder"
      heroGhost="AI BUILD"
      heroTitle={
        <>
          You talk.
          <br />
          <span className="text-flow">It builds.</span>
        </>
      }
      benefitTitle={<>No editor <span className="text-[var(--color-brand-orange)]">to learn.</span></>}
      whoFor={["Small businesses", "First-time site owners", "Side hustles"]}
      detail="Answer a few questions on WhatsApp about your business and get a site built for you — no drag-and-drop editor, no blank-page panic. It's free to build; you only pay when you publish, and publishing includes hosting."
      faqs={[
        { q: "When does this launch?", a: "It's not live yet. Join the waitlist and we'll let you know as soon as the pilot opens." },
        { q: "Do I need to know anything technical?", a: "No — the whole point is that you describe your business in plain language and the site gets built for you." },
      ]}
      ctaTitle={
        <>
          Be first to
          <br />
          try it.
        </>
      }
      ctaLede="Join the waitlist and we'll reach out when the pilot opens."
    />
  );
}
