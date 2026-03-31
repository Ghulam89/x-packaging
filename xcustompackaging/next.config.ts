import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  typedRoutes: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xcustompackaging.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
