import type { Metadata } from "next";
import { CloudProductPage } from "@/components/sections/CloudProductPage";

export const metadata: Metadata = {
  title: "Business Email Nigeria — Inbox-Ready on NextGen Cloud",
  description:
    "Business email on your own domain, with SPF, DKIM and DMARC configured automatically so it reaches the inbox. Works in Outlook and on your phone.",
  alternates: { canonical: "/cloud/email" },
};

export default function CloudEmailPage() {
  return (
    <CloudProductPage
      slug="email"
      heroGhost="EMAIL"
      heroTitle={
        <>
          Email that actually
          <br />
          <span className="text-flow">reaches the inbox.</span>
        </>
      }
      benefitTitle={<>Set up <span className="text-[var(--color-brand-orange)]">properly.</span></>}
      whoFor={["Small businesses", "Professional services", "Schools", "Freelancers"]}
      detail="A @yourbusiness.com address looks more serious than a free inbox — but only if it lands where it's supposed to. Every mailbox we set up comes with SPF, DKIM and DMARC configured for you, so your invoices and newsletters stop landing in spam."
      faqs={[
        { q: "Will this work with Outlook and my phone?", a: "Yes — standard IMAP/SMTP, so it works in Outlook, Apple Mail, Gmail's app, and anything else that speaks email." },
        { q: "Do I need hosting to get email?", a: "No, email on its own is available per mailbox. 5–15 mailboxes are included free with any hosting plan." },
        { q: "What's SPF/DKIM/DMARC and why does it matter?", a: "They're the checks mail providers use to decide if your email is really from you. Set up wrong (or not at all), your mail gets marked as spam — we configure all three on every domain." },
      ]}
      ctaTitle={
        <>
          Stop landing
          <br />
          in spam.
        </>
      }
      ctaLede="Join the waitlist and we'll set up your business email properly."
    />
  );
}
