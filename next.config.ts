import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages / shared hosting
  output: "export",
  trailingSlash: true,
  images: {
    // static export has no image optimizer server; serve assets as-is
    unoptimized: true,
  },
  // DEV ONLY: Next 16's dev server silently refuses to hydrate requests from a
  // non-localhost origin. Testing on a phone hits the machine's LAN IP (a
  // non-localhost origin), so the page loads but client JS never boots — the
  // hero video/animations die and the site looks "broken" on mobile. List the
  // LAN IPs you serve the dev server on here. (No effect on the exported
  // production build, which has no such gate.) Add whatever IP `ipconfig`
  // shows for the interface your phone shares.
  allowedDevOrigins: ["10.128.17.181", "172.19.2.10"],
};

export default nextConfig;
