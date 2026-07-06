import type { MetadataRoute } from "next";
import { site, nav, footerLinks } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...nav.map((n) => n.href), ...footerLinks.map((n) => n.href)];
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
