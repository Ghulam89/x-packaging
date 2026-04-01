import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typedRoutes: true,
  serverExternalPackages: ["mongoose", "bcrypt"],
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  images: {
    // Dev: allow optimizing images served from same machine (localhost / Express `/images`).
    // Disabled in production — prod should use public CDN URLs (e.g. xcustompackaging.com).
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    // Avoid Next image optimizer on missing/404 upstreams in dev (prevents stream/transform crashes).
    unoptimized: process.env.NODE_ENV !== "production",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xcustompackaging.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9090",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "9090",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
