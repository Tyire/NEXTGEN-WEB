import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redirecting to FAQ…",
  robots: { index: false, follow: false },
};

/**
 * /support → /faq redirect. Static-export safe: uses meta http-equiv refresh
 * which works on any host without server-side redirect support.
 */
export default function SupportRedirect() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0; url=/faq/" />
        <link rel="canonical" href="/faq/" />
      </head>
      <body>
        <p style={{ fontFamily: "sans-serif", padding: "2rem" }}>
          Redirecting to <a href="/faq/">FAQ</a>…
        </p>
      </body>
    </html>
  );
}
