import {
  apiBase,
  getBrandBySlug,
  getCategoriesByBrandId,
  getFaqAll,
} from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import FAQ from "@/components/widgets/home/FAQ";
import type { Category } from "@/types";

const resolveImageUrl = (value?: string) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return encodeURI(value);
  }
  return encodeURI(`${apiBase}/${value.replace(/^\//, "")}`);
};

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug, 3600);
  if (!brand) {
    return (
      <main className="mx-auto w-[95%] sm:max-w-8xl py-12">
        <h1 className="text-2xl font-semibold text-[#213554]">Brand not found</h1>
        <Link className="text-[#EE334B]" href="/">Back to Home</Link>
      </main>
    );
  }
  const allCategories: Category[] = await getCategoriesByBrandId(brand._id, 1, 100, 600);
  const faqs = await getFaqAll(600);


  return (
    <main>
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
          <p className="pt-2">
            Half Price Packaging possesses extensive expertise in delivering personalized packaging solutions to over 3000 businesses across the globe. Below, you will find a carefully curated selection of packaging solutions designed to cater to various industries.
          </p>
        </div>

        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allCategories.map((category) => {
              return (
                <Link
                  key={category._id}
                  href={`/category/${category.slug}`}
                  className="group text-gray-700 bg-[#F9F9F9] hover:bg-white rounded-3xl flex font-bold flex-col gap-0.5 items-center transition-all duration-300 border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transform hover:-translate-y-1"
                >
                  <div className="p-4 relative overflow-hidden rounded-3xl">
                    <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                      {(category as any).icon ? (
                        <Image
                          src={`${apiBase}/${(category as any).icon}`}
                          alt={(category as any).imageAltText || category.title || "Category"}
                          width={400}
                          height={224}
                          className="object-cover rounded-2xl"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#213554]/10 to-[#EE334B]/10 flex items-center justify-center rounded-2xl">
                          <span className="text-4xl font-bold text-[#213554]/30">
                            {category.title?.charAt(0) || "C"}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-2xl"></div>
                    </div>
                  </div>
                  <p className="pb-3 font-bold group-hover:text-[#EE334B] transition-colors duration-300">
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
  const title = brand?.metaTitle || brand?.name || brand?.title || "Brand";
  const description = brand?.metaDescription || "";
  const kw = brand?.keywords || "";
  const keywords = kw ? kw.split(",").map((k) => k.trim()).filter(Boolean) : undefined;
  const url = `https://xcustompackaging.com/${slug}`;
  const img =
    brand?.bannerImage
      ? `https://xcustompackaging.com/${brand.bannerImage}`
      : brand?.image
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
