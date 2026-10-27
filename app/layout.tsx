import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist } from "next/font/google";
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

// Editorial serif for display (one weight, roman + italic — the italic is the
// accent voice); Geist for everything else.
const serif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
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
  function atTop(){
    if(window.scrollY<24){document.documentElement.setAttribute('data-at-top','');}
    else{document.documentElement.removeAttribute('data-at-top');}
  }
  atTop();
  window.addEventListener('scroll',atTop,{passive:true});
  var root=document.documentElement;
  function setTheme(dark){
    if(dark){root.setAttribute('data-theme','dark');}else{root.removeAttribute('data-theme');}
    try{localStorage.setItem('theme',dark?'dark':'light');}catch(e){}
    syncMeta();
  }
  /* Theme switch = a circle of the new theme growing out of the toggle you
     pressed (View Transitions API). Rare, deliberate action, so it earns a
     600ms moment; ease-in-out because it moves across the screen. Falls back
     to an instant swap without support or under reduced motion. */
  var btns=document.querySelectorAll('.theme-toggle');
  for(var i=0;i<btns.length;i++){btns[i].addEventListener('click',function(ev){
    var toDark=root.getAttribute('data-theme')!=='dark';
    var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!document.startViewTransition||reduce){setTheme(toDark);return;}
    var r=ev.currentTarget.getBoundingClientRect();
    var x=r.left+r.width/2,y=r.top+r.height/2;
    var R=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
    root.setAttribute('data-theme-switching','');
    var t=document.startViewTransition(function(){setTheme(toDark);});
    t.ready.then(function(){
      root.animate({clipPath:['circle(0px at '+x+'px '+y+'px)','circle('+R+'px at '+x+'px '+y+'px)']},
        {duration:600,easing:'cubic-bezier(0.77, 0, 0.175, 1)',pseudoElement:'::view-transition-new(root)'});
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
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${geist.variable} h-full`}>
      <head>
        {/* Pre-paint: apply stored dark choice (light default) + arm the
            entrance curtain on the FIRST view of the session only. The
            curtain's whole lifecycle is CSS (globals.css) — this just gates it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}
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
