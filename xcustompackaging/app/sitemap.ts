import type { MetadataRoute } from "next";
import { getBrandsAll, getCategoriesAll, getProductsAll, getBlogsAll } from "@/lib/api";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://xcustompackaging.com";
  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1.0 },
  ];
  try {
    const brands = await getBrandsAll(3600);
    if (Array.isArray(brands)) {
      for (const b of brands) {
        if (b?.slug) urls.push({ url: `${base}/${b.slug}`, changeFrequency: "weekly", priority: 0.8 });
      }
    }
  } catch {}
  try {
    const categories = await getCategoriesAll(3600);
    if (Array.isArray(categories)) {
      for (const c of categories) {
        if (c?.slug) urls.push({ url: `${base}/category/${c.slug}`, changeFrequency: "weekly", priority: 0.8 });
      }
    }
  } catch {}
  try {
    const products = await getProductsAll(1, 1000, 3600);
    if (Array.isArray(products)) {
      for (const p of products) {
        if (p?.slug) urls.push({ url: `${base}/product/${p.slug}`, changeFrequency: "weekly", priority: 0.7 });
      }
    }
  } catch {}
  try {
    const blogs = await getBlogsAll(3600);
    if (Array.isArray(blogs)) {
      for (const b of blogs) {
        if (b?.slug) urls.push({ url: `${base}/blog/${b.slug}`, changeFrequency: "weekly", priority: 0.6 });
      }
    }
  } catch {}
  return urls;
}
