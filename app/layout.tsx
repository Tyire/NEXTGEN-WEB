import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/JsonLd";
import { RegisterSW } from "@/components/RegisterSW";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { BackToTop } from "@/components/BackToTop";
import { SmoothScroll } from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — GPON Fiber, VoIP & Metro Ethernet in Lagos`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: site.name },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — Fiber that keeps up with you`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    site: site.social.twitter,
    title: `${site.name} — GPON Fiber, VoIP & Metro Ethernet`,
    description: site.description,
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1211" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
    >
      <head>
        {/* No-flash theme: light is default; apply stored dark choice before paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}`,
          }}
        />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. WOT injects
          `wotdisconnected`) mutate <body> before React hydrates — harmless. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border focus:border-[var(--color-brand-orange)] focus:bg-[var(--color-surface)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--color-fg)]"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <RegisterSW />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <BackToTop />
      </body>
    </html>
  );
}
