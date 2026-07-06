import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/JsonLd";
import { RegisterSW } from "@/components/RegisterSW";
import { Preloader } from "@/components/Preloader";
import { Cinema } from "@/components/Cinema";

const archivo = Archivo({
  variable: "--font-archivo",
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
    { media: "(prefers-color-scheme: light)", color: "#f6f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1220" },
  ],
  colorScheme: "light dark",
};

/* Tiny vanilla enhancements (ES5, no React dependency — they run even if
   hydration never happens): theme toggle + active nav marking. */
const enhance = `(function(){
  var btns=document.querySelectorAll('.theme-toggle');
  for(var i=0;i<btns.length;i++){btns[i].addEventListener('click',function(){
    var d=document.documentElement.getAttribute('data-theme')==='dark';
    if(d){document.documentElement.removeAttribute('data-theme');}
    else{document.documentElement.setAttribute('data-theme','dark');}
    try{localStorage.setItem('theme',d?'light':'dark');}catch(e){}
  });}
  try{
    var p=location.pathname.replace(/\\/+$/,'')||'/';
    var links=document.querySelectorAll('[data-nav] a[href]');
    for(var j=0;j<links.length;j++){
      var h=(links[j].getAttribute('href')||'').replace(/\\/+$/,'')||'/';
      if(h===p){links[j].setAttribute('data-active','');links[j].setAttribute('aria-current','page');}
    }
  }catch(e){}
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${archivo.variable} ${inter.variable} h-full`}>
      <head>
        {/* Pre-paint: apply stored dark choice (light default) + arm the
            entrance curtain on the FIRST view of the session only. The
            curtain's whole lifecycle is CSS (globals.css) — this just gates it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}
try{if(!sessionStorage.getItem('ng-boot')){document.documentElement.setAttribute('data-boot','1');sessionStorage.setItem('ng-boot','1');}}catch(e){}`,
          }}
        />
      </head>
      {/* suppressHydrationWarning: browser extensions mutate <body> before React
          hydrates — harmless. */}
      <body id="top" className="flex min-h-full flex-col" suppressHydrationWarning>
        <Preloader />
        <div className="progress-beam" aria-hidden="true" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border focus:border-[var(--color-brand-orange)] focus:bg-[var(--color-surface)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--color-fg)]"
        >
          Skip to content
        </a>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <RegisterSW />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <Cinema />
        <script dangerouslySetInnerHTML={{ __html: enhance }} />
      </body>
    </html>
  );
}
