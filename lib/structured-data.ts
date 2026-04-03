import type { Category, Product } from "@/types";

export const SITE_ORG_NAME = "X Custom Packaging";

type ListItem = {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
  image?: string;
};

function abs(siteOrigin: string, path: string) {
  const base = siteOrigin.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function brandBreadcrumbSchema(
  siteOrigin: string,
  slug: string,
  name?: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteOrigin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: name || slug,
        item: abs(siteOrigin, `/${slug}`),
      },
    ],
  };
}

export function categoryBreadcrumbSchema(
  siteOrigin: string,
  slug: string,
  category: Category
): Record<string, unknown> {
  const brandName = category.brandId?.name;
  const brandSlug = category.brandId?.slug;
  const items: ListItem[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteOrigin,
    },
  ];
  let pos = 2;
  if (brandName && brandSlug) {
    items.push({
      "@type": "ListItem",
      position: pos++,
      name: brandName,
      item: abs(siteOrigin, `/${brandSlug}`),
    });
  }
  items.push({
    "@type": "ListItem",
    position: pos,
    name: category.title || slug,
    item: abs(siteOrigin, `/category/${slug}`),
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/** Mirrors legacy ItemList: landing context + product URLs. */
export function categoryItemListSchema(
  siteOrigin: string,
  slug: string,
  category: Category,
  products: Product[]
): Record<string, unknown> {
  const title = category.title || slug;
  const productItems: ListItem[] = products.map((item, index) => {
    const img = item.images?.[0]?.url
      ? abs(siteOrigin, `/${item.images[0].url.replace(/^\//, "")}`)
      : undefined;
    const entry: ListItem = {
      "@type": "ListItem",
      position: index + 3,
      name: item.name || item.slug,
      item: abs(siteOrigin, `/product/${item.slug}`),
    };
    if (img) entry.image = img;
    return entry;
  });
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteOrigin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: abs(siteOrigin, `/category/${slug}`),
      },
      ...productItems,
    ],
  };
}

export function productBreadcrumbSchema(
  siteOrigin: string,
  productSlug: string,
  product: Product
): Record<string, unknown> {
  const items: ListItem[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteOrigin,
    },
  ];
  let pos = 2;
  if (product.brandId?.name && product.brandId?.slug) {
    items.push({
      "@type": "ListItem",
      position: pos++,
      name: product.brandId.name,
      item: abs(siteOrigin, `/${product.brandId.slug}`),
    });
  }
  if (product.categoryId?.title && product.categoryId?.slug) {
    items.push({
      "@type": "ListItem",
      position: pos++,
      name: product.categoryId.title,
      item: abs(siteOrigin, `/category/${product.categoryId.slug}`),
    });
  }
  items.push({
    "@type": "ListItem",
    position: pos,
    name: product.name || "Product",
    item: abs(siteOrigin, `/product/${productSlug}`),
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

type ProductWithCommerce = Product & {
  actualPrice?: string | number;
  createdAt?: string;
  sku?: string;
};

export function productDetailSchema(
  siteOrigin: string,
  productSlug: string,
  product: ProductWithCommerce
): Record<string, unknown> {
  const first = product.images?.[0]?.url;
  const image = first
    ? abs(siteOrigin, `/${String(first).replace(/^\//, "")}`)
    : undefined;
  const price = product.actualPrice;
  const priceStr =
    price !== undefined && price !== null && price !== ""
      ? String(price).replace(/[^\d.]/g, "") || undefined
      : undefined;
  const offerUrl = abs(siteOrigin, `/product/${productSlug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    ...(image ? { image } : {}),
    description: product.metaDescription || undefined,
    sku: product.sku || product._id || "12345",
    brand: {
      "@type": "Brand",
      name: SITE_ORG_NAME,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "42",
    },
    offers: {
      "@type": "Offer",
      url: offerUrl,
      priceCurrency: "USD",
      ...(priceStr ? { price: priceStr } : {}),
      priceValidUntil: product.createdAt,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: SITE_ORG_NAME,
      },
    },
  };
}
