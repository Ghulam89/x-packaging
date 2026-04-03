import { getBrandBySlug, getCategoriesByBrandId, getFaqAll, siteOrigin } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FAQ from "@/components/widgets/home/FAQ";
import type { Category } from "@/types";
import JsonLd from "@/components/shared/seo/JsonLd";
import { brandBreadcrumbSchema } from "@/lib/structured-data";

const resolveImageUrl = (value?: string) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return encodeURI(value);
  }
  return encodeURI(`${siteOrigin}/${value.replace(/^\//, "")}`);
};

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug, 3600);
  if (!brand) notFound();
  const allCategories: Category[] = await getCategoriesByBrandId(brand._id, 1, 100, 600);
  const faqs = await getFaqAll(600);


  const breadcrumbLd = brandBreadcrumbSchema(siteOrigin, slug, brand.name || brand.title);

  return (
    <main>
      <JsonLd schemas={[breadcrumbLd]} />
      <div className="h-48 bg-linear-to-r from-[#213554]/5 via-white to-[#EE334B]/5 flex items-center border-b border-gray-100">
        <div className="px-6 sm:px-12 w-full">
          <div className="flex gap-2 items-center text-sm mb-2">
            <Link href="/" aria-label="Home" className="text-[#213554]">Home</Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-600">{brand.name || brand.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#213554]">
            {brand.name || brand.title}
          </h2>
        </div>
      </div>

      <section className="sm:max-w-8xl w-[95%] mx-auto">
        <div className="text-center max-w-5xl mx-auto py-7">
          <h2 className=" sm:text-4xl text-2xl font-semibold pb-2">Custom packaging solutions for every industry.</h2>
          <p className="pt-2 text-gray-800">
            X Custom Packaging possesses extensive expertise in delivering personalized packaging solutions to over 3000 businesses across the globe. Below, you will find a carefully curated selection of packaging solutions designed to cater to various industries.
          </p>
        </div>

        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {allCategories.map((category) => {
              return (
                <Link
                  key={category._id}
                  href={`/category/${category.slug}`}
                  className="group text-gray-700 bg-[#F9F9F9] hover:bg-white rounded-2xl sm:rounded-3xl flex font-bold flex-col gap-0.5 items-stretch min-h-0 transition-all duration-300 border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transform hover:-translate-y-0.5 sm:hover:-translate-y-1"
                >
                  <div className="p-2 sm:p-3 md:p-4 relative overflow-hidden rounded-2xl sm:rounded-3xl w-full min-w-0">
                    <div className="relative w-full aspect-4/3 sm:aspect-5/4 md:aspect-4/3 lg:h-52 lg:aspect-auto xl:h-56 rounded-xl sm:rounded-2xl overflow-hidden">
                      {(category as any).icon ? (
                        <Image
                          src={`${siteOrigin}/${(category as any).icon}`}
                          alt={(category as any).imageAltText || category.title || "Category"}
                          fill
                          sizes="(max-width: 640px) 46vw, (max-width: 768px) 46vw, (max-width: 1280px) 31vw, 23vw"
                          className="object-cover rounded-xl sm:rounded-2xl"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 bg-linear-to-br from-[#213554]/10 to-[#EE334B]/10 flex items-center justify-center rounded-xl sm:rounded-2xl">
                          <span className="text-2xl sm:text-4xl font-bold text-[#213554]/30">
                            {category.title?.charAt(0) || "C"}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl sm:rounded-2xl"></div>
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-xl sm:rounded-2xl"></div>
                    </div>
                  </div>
                  <p className="px-1.5 sm:px-2 pb-2 sm:pb-3 pt-0 text-center text-[11px] leading-snug sm:text-sm md:text-base font-bold group-hover:text-[#EE334B] transition-colors duration-300 line-clamp-2 wrap-break-word">
                    {category.title}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <FAQ imageUrl={brand.faqImage} imageAlt={brand.faqImageAltText} />
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug, 600);
  if (!brand) {
    return {
      title: "Page Not Found",
      description:
        "The page you are looking for does not exist or may have been moved. Return to X Custom Packaging to browse custom boxes and packaging.",
      robots: { index: false, follow: true },
    };
  }
  const title = brand.metaTitle || brand.name || brand.title || "Brand";
  const description = brand.metaDescription || "";
  const kw = brand.keywords || "";
  const keywords = kw ? kw.split(",").map((k) => k.trim()).filter(Boolean) : undefined;
  const url = `https://xcustompackaging.com/${slug}`;
  const img =
    brand.bannerImage
      ? `https://xcustompackaging.com/${brand.bannerImage}`
      : brand.image
        ? `https://xcustompackaging.com/${brand.image}`
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

function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}
