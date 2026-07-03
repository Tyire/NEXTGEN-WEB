import { site, services } from "@/lib/site";
import { plans } from "@/data/plans";

function Json({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": ["Organization", "InternetServiceProvider", "LocalBusiness"],
        "@id": `${site.url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: `${site.url}/brand/nextgen-logo-full.svg`,
        image: `${site.url}/og.png`,
        description: site.description,
        email: site.email,
        telephone: site.phoneDisplay,
        areaServed: { "@type": "Country", name: "Nigeria" },
        address: {
          "@type": "PostalAddress",
          ...(site.address.street ? { streetAddress: site.address.street } : {}),
          ...(site.address.city ? { addressLocality: site.address.city } : {}),
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
        sameAs: [site.social.linkedin, `https://twitter.com/${site.social.twitter.replace("@", "")}`],
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${site.url}/plans?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function ServiceJsonLd({ slug }: { slug: string }) {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${s.name} — ${s.eyebrow}`,
        serviceType: s.eyebrow,
        description: s.short,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: { "@type": "Country", name: "Nigeria" },
        url: `${site.url}${s.href}`,
      }}
    />
  );
}

export function PlansJsonLd() {
  // Only emit Offers for plans with a confirmed price (no invented prices).
  const priced = plans.filter((p) => p.priceNgn != null);
  if (priced.length === 0) return null;
  return (
    <>
      {priced.map((p) => (
        <Json
          key={p.id}
          data={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${site.shortName} ${p.name}`,
            description: `${p.speed} fiber broadband. ${p.highlights.join(". ")}.`,
            brand: { "@type": "Brand", name: site.name },
            offers: {
              "@type": "Offer",
              price: p.priceNgn,
              priceCurrency: "NGN",
              url: p.checkoutUrl,
              availability: "https://schema.org/InStock",
              seller: { "@id": `${site.url}/#organization` },
            },
          }}
        />
      ))}
    </>
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${site.url}${it.href}`,
        })),
      }}
    />
  );
}
