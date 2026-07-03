import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages / shared hosting
  output: "export",
  trailingSlash: true,
  images: {
    // static export has no image optimizer server; serve assets as-is
    unoptimized: true,
  },
};

export default nextConfig;
