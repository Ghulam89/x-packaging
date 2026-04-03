import { apiBase, getProductBySlug, siteOrigin } from "@/lib/api";
import type { Product } from "@/types";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductLayout from "@/components/widgets/product-details/ProductLayout";
import ProductSpecification from "@/components/widgets/product-details/ProductSpecification";
import EnhancePackaging from "@/components/widgets/product-details/EnhancePackaging";
import ProductOrderSection from "@/components/widgets/product-details/ProductOrderSection";
import TrustBanner from "@/components/shared/marketing/TrustBanner";
import BottomHero from "@/components/widgets/home/BottomHero";
import { ASSETS } from "@/lib/assets";
import Image from "next/image";
import OfferCard from "@/components/widgets/home/OfferCard";
import ProductCard from "@/components/entities/product/ui/ProductCard";
import JsonLd from "@/components/shared/seo/JsonLd";
import { productBreadcrumbSchema, productDetailSchema } from "@/lib/structured-data";

async function getRelatedProductsBySlug(slug: string): Promise<Product[]> {
  try {
    const res = await fetch(`${apiBase}/products/related-products?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const json = await res.json().catch(() => null);
    const data = json?.data;
    if (Array.isArray(data)) return data as Product[];
    if (Array.isArray(data?.relatedProducts)) return data.relatedProducts as Product[];
    return [];
  } catch {
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug, 3600);
  const relatedProducts = await getRelatedProductsBySlug(slug);

  if (!product) notFound();

  const images = (product.images || []).map((img: any) =>
    img?.url ? `${siteOrigin}/${img.url.replace(/^\//, "")}` : ""
  ).filter(Boolean);

  if (images.length === 0) {
    images.push("https://placehold.co/600x600?text=No+Image+Available");
  }

  const rawBanner = (product as { bannerImage?: string }).bannerImage;
  const bannerSrc = rawBanner
    ? `${siteOrigin}/${rawBanner.replace(/^\//, "")}`
    : images[0];

  const breadcrumbLd = productBreadcrumbSchema(siteOrigin, slug, product);
  const productLd = productDetailSchema(siteOrigin, slug, product);

  return (
    <main className="bg-white min-h-screen">
      <JsonLd schemas={[breadcrumbLd, productLd]} />

      <ProductLayout product={product} images={images} />
      <TrustBanner />
      <section className="py-8 sm:py-10">
        <div className="mx-auto flex w-[95%] max-w-[95%] flex-col gap-8 lg:max-w-8xl lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="w-full min-w-0 lg:flex-1">
            <div className="mb-4 flex items-start gap-2 sm:items-center">
              <div className="mt-1 h-10 w-1 shrink-0 rounded-full bg-linear-to-b from-[#EE334B] to-[#213554] sm:mt-0 sm:h-12" />
              <h2 className="text-xl font-bold text-[#213554] sm:text-2xl md:text-3xl">
                {product?.name}
              </h2>
            </div>
            <p className="mx-auto max-w-6xl text-sm leading-relaxed text-gray-600 sm:text-base sm:leading-relaxed lg:max-h-32 lg:overflow-y-auto lg:custom-scrollbar">
              Let magnetic closure box packaging speak volumes about your products and brand with its luxurious
              appeal and elegance. The built-in magnet in the rigid stock ensures the boxes close and open easily
              without using tape or adhesive. You can pack all kinds of solid products in magnetic closure boxes,
              be they gifts or retail items. Customize them with sleek finishes to improve customers’ tactile and
              gifting experience!
            </p>
            <p className="my-4 font-semibold tracking-wide text-[#213554] text-xs sm:my-5 sm:text-sm">
              More Than +5000 Satisfied Clients Worldwide
            </p>
            <BottomHero />

            <div className="mt-2">
              <img src={ASSETS.satisfiedClients} alt="Satisfied Clients" className="h-auto w-20 sm:w-24" />
            </div>
          </div>
          <div className="w-full shrink-0 lg:max-w-md xl:max-w-lg">
            <div className="relative mx-auto aspect-4/3 w-full max-w-lg overflow-hidden rounded-2xl bg-gray-100 shadow-2xl sm:aspect-square lg:mx-0 lg:max-w-none">
              <Image
                src={bannerSrc}
                alt={product?.name || "Product"}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>

      <ProductSpecification />
      <OfferCard title={"Looking For Other Custom Boxes And packaging?"} subTitle={"Chat live with our packaging experts now for a free consultation and insert price quote."} />

      {product?.description && (
        <section className="mx-auto max-w-[95%] py-8 sm:max-w-8xl">
          <div className="rounded-2xl border border-gray-100 bg-linear-to-br from-gray-50 via-white to-gray-50 p-2 shadow-sm sm:p-5">
            <div className="mb-6 flex items-start gap-3 sm:items-center sm:gap-4">
              <div className="mt-0.5 h-10 w-1 shrink-0 rounded-full bg-linear-to-b from-[#EE334B] to-[#213554] sm:h-12" />
              <h2 className="wrap-break-word text-xl font-bold text-[#213554] sm:text-2xl md:text-3xl">
                Learn More About {product?.name}
              </h2>
            </div>
            <div className='pt-2'>
              <div
                className=' text-gray-700  banner-content-wrapper leading-relaxed'
                dangerouslySetInnerHTML={{ __html: product?.description }}
                style={{
                  lineHeight: '1.75'
                }}
              ></div>
            </div>
          </div>
        </section>
      )}

      <EnhancePackaging />

      <ProductOrderSection product={product} mainImage={images[0]} />
      {relatedProducts.length > 0 ? (
        <section className="mx-auto max-w-[95%] px-0 py-10 sm:max-w-8xl sm:py-12">
          <div className="mb-6 flex flex-1 items-start gap-3 sm:items-center sm:gap-4">
            <div className="mt-0.5 h-10 w-1 shrink-0 rounded-full bg-linear-to-b from-[#EE334B] to-[#213554] sm:h-12" />
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-[#213554] sm:text-2xl md:text-3xl">Related Products</h2>
              <p className="mt-1 text-sm text-gray-600">Discover packaging tailored for your products</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((item, index) => {
              const firstImage = item?.images?.[0]?.url
                ? `${siteOrigin}/${item.images[0].url.replace(/^\//, "")}`
                : undefined;
              return (
                <ProductCard
                  key={item._id || `${item.slug}-${index}`}
                  href={`/product/${item.slug}`}
                  title={item.name || "Product"}
                  imageSrc={firstImage}
                  imageAlt={item.name || "Product"}
                  variant="carousel"
                />
              );
            })}
          </div>
        </section>
      ) : null}
      {/* <FAQ items={(product as any).qna || []} /> */}

    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug, 600);
  if (!product) {
    return {
      title: "Product Not Found",
      description:
        "No product matches this page. Browse X Custom Packaging for custom boxes and wholesale packaging.",
      robots: { index: false, follow: true },
    };
  }
  const title = product.metaTitle || product.name || "Product";
  const description = product.metaDescription || "";
  const kw = product.keywords || "";
  const keywords = kw ? kw.split(",").map((k) => k.trim()).filter(Boolean) : undefined;
  const url = `https://xcustompackaging.com/product/${slug}`;
  const img =
    product.images && product.images[0]?.url
      ? `https://xcustompackaging.com/${product.images[0].url}`
      : undefined;
  const robots = { index: false, follow: false };
  return {
    title,
    description,
    keywords,
    robots,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: img ? [img] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: img ? [img] : undefined,
    },
  };
}
