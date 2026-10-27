import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { MagneticFX } from "@/components/MagneticFX";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/JsonLd";
import { RegisterSW } from "@/components/RegisterSW";
import { Preloader } from "@/components/Preloader";
import CinemaMount from "@/components/CinemaMount";

// DM Sans for everything — Hostinger's face, and Modish's.
const dmSans = DM_Sans({
  variable: "--font-dm",
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
  // NOTE: theme-color is intentionally NOT declared here. The site theme is a
  // manual toggle (light default), so a media-query <meta> would be wrong, and
  // — more importantly — a React-owned meta whose `content` the pre-paint
  // script rewrites for stored-dark users triggers a hydration mismatch. We
  // create the theme-color meta imperatively in the <head> script below, so
  // React never reconciles it. syncMeta() (layout enhance script) keeps it in
  // step with the toggle.
  colorScheme: "light dark",
};

/* Tiny vanilla enhancements (ES5, no React dependency — they run even if
   hydration never happens): theme toggle + active nav marking. */
const enhance = `(function(){
  function syncMeta(){
    var d=document.documentElement.getAttribute('data-theme')==='dark';
    var m=document.querySelectorAll('meta[name="theme-color"]');
    for(var k=0;k<m.length;k++){m[k].setAttribute('content',d?'#000000':'#ffffff');}
  }
  syncMeta();
  /* Header: transparent over the banner, glass once scrolled; tucks away
     while scrolling down past 420px and returns on any scroll up (Mo'Afrique #10). */
  var lastY=window.scrollY;
  function atTop(){
    var y=window.scrollY,h=document.documentElement;
    if(y<24){h.setAttribute('data-at-top','');}else{h.removeAttribute('data-at-top');}
    if(y>420&&y>lastY+6){h.setAttribute('data-header-tucked','');}
    else if(y<lastY-6||y<=420){h.removeAttribute('data-header-tucked');}
    lastY=y;
  }
  atTop();
  window.addEventListener('scroll',atTop,{passive:true});
  var root=document.documentElement;
  function setTheme(dark){
    if(dark){root.setAttribute('data-theme','dark');}else{root.removeAttribute('data-theme');}
    try{localStorage.setItem('theme',dark?'dark':'light');}catch(e){}
    syncMeta();
  }
  /* Theme switch = a curtain (Modish #4, the owner's reference): night falls
     from the top, day rises from the bottom, via the View Transitions API.
     Instant swap without support or under reduced motion. */
  var btns=document.querySelectorAll('.theme-toggle');
  for(var i=0;i<btns.length;i++){btns[i].addEventListener('click',function(){
    var toDark=root.getAttribute('data-theme')!=='dark';
    var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!document.startViewTransition||reduce){setTheme(toDark);return;}
    root.setAttribute('data-theme-switching','');
    var t=document.startViewTransition(function(){setTheme(toDark);});
    t.ready.then(function(){
      root.animate({clipPath:[toDark?'inset(0 0 100% 0)':'inset(100% 0 0 0)','inset(0 0 0 0)']},
        {duration:700,easing:'cubic-bezier(0.77, 0, 0.175, 1)',pseudoElement:'::view-transition-new(root)'});
    });
    t.finished.then(function(){root.removeAttribute('data-theme-switching');},function(){root.removeAttribute('data-theme-switching');});
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
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} h-full`}>
      <head>
        {/* Pre-paint: apply stored dark choice (light default) + arm the
            entrance curtain on the FIRST view of the session only. The
            curtain's whole lifecycle is CSS (globals.css) — this just gates it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');
try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}
try{var d=document.documentElement.getAttribute('data-theme')==='dark';var mc=document.createElement('meta');mc.setAttribute('name','theme-color');mc.setAttribute('content',d?'#000000':'#ffffff');document.head.appendChild(mc);}catch(e){}
try{if(!localStorage.getItem('ng-visited')){document.documentElement.setAttribute('data-boot','1');localStorage.setItem('ng-visited','1');}}catch(e){}`,
          }}
        />
      </head>
      {/* suppressHydrationWarning: browser extensions mutate <body> before React
          hydrates — harmless. */}
      <body id="top" className="has-action-bar flex min-h-full flex-col" suppressHydrationWarning>
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
        <MobileActionBar />
        <MagneticFX />
        <CinemaMount />
        <script dangerouslySetInnerHTML={{ __html: enhance }} />
      </body>
    </html>
  );
}
