import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://xcustompackaging.com";
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
