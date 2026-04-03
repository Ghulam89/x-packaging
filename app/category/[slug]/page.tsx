import { apiGet, getCategoryBySlug, siteOrigin } from "@/lib/api";
import type { Product } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/shared/ui/Button";
import ProductCard from "@/components/entities/product/ui/ProductCard";
import { IoHomeOutline } from "react-icons/io5";
import { LiaAngleRightSolid } from "react-icons/lia";
import BottomHero from "@/components/widgets/home/BottomHero";
import FAQ from "@/components/widgets/home/FAQ";
import OfferCard from "@/components/widgets/home/OfferCard";
import CustomPackagingApart from "@/components/widgets/home/CustomPackagingApart";
import AddonsAndInserts from "@/components/widgets/home/AddonsAndInserts";
import { RiPhoneLine } from "react-icons/ri";
import CustomPackagingProduced from "@/components/widgets/home/CustomPackagingProduced";
import PackagingJourney from "@/components/widgets/home/PackagingJourney";
import CreativeGallery from "@/components/widgets/home/CreativeGallery";
import TrustBanner from "@/components/shared/marketing/TrustBanner";
import ServiceSelectionCard from "@/components/entities/product/ui/ServiceSelectionCard";
import CategoryTestimonials from "@/components/widgets/home/CategoryTestimonials";
import CategoryTabsSections from "@/components/widgets/category/CategoryTabsSections";
import CategoryInstantQuoteButton from "@/components/widgets/category/CategoryInstantQuoteButton";
import { ASSETS } from "@/lib/assets";
import JsonLd from "@/components/shared/seo/JsonLd";
import { categoryBreadcrumbSchema, categoryItemListSchema } from "@/lib/structured-data";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug, 600);
  if (!category) notFound();
  const sp = (await searchParams) || {};
  const page = sp.page ? Number(sp.page) || 1 : 1;
  let products: Product[] = [];
  let currentPage = page;
  let totalPages = 1;
  if (category._id) {
    const r = await apiGet<Product[]>(
      `/products/categoryProducts/${category._id}${page ? `?page=${page}` : ""}`,
      { revalidate: 600 }
    );
    products = Array.isArray(r?.data) ? r.data : [];
    currentPage = typeof r?.currentPage === "number" ? r.currentPage : page;
    totalPages = typeof r?.totalPages === "number" ? r.totalPages : 1;
  }

  const serviceSelectionData = [
    {
      id: 1,
      icon: ASSETS.icons.freeShipping,
      title: "FREE SHIPPING",
      description: "Free shipping on all orders",
    },
    {
      id: 3,
      icon: ASSETS.icons.onlineSupport,
      title: "ONLINE SUPPORT 24/7",
      description: "24/7 Customer Support",
    },
    {
      id: 4,
      icon: ASSETS.icons.quickTurnaroundSvg,
      title: "Quickest Turnaround",
      description: "",
    },
    {
      id: 5,
      icon: ASSETS.icons.freeDesignSupport,
      title: "Free Design Support",
      description: "Professional design services",
    },
    {
      id: 6,
      icon: ASSETS.icons.noDiePlateCharge,
      title: "No Die & Plate Charges",
      description: "",
    },
  ];

  const breadcrumbLd = categoryBreadcrumbSchema(siteOrigin, slug, category);
  const itemListLd = categoryItemListSchema(siteOrigin, slug, category, products);

  return (
    <main className="min-w-0 overflow-x-hidden">
      <JsonLd schemas={[breadcrumbLd, itemListLd]} />
      <section
        className="py-5 sm:h-[70vh] h-auto flex flex-col justify-center"
        style={{ backgroundColor: category.bannerBgColor || "#f8f9fa" }}
      >
        <div className="sm:max-w-8xl max-w-[95%] mx-auto w-full">
          <div className="flex sm:flex-row flex-col gap-8 lg:gap-12">
            <div className="sm:w-1/2 w-full">
              <div className="flex gap-2 pb-12 items-center">
                <IoHomeOutline size={20} className="text-gray-600" />
                <LiaAngleRightSolid className="text-gray-500" />
                <div className="flex items-center flex-wrap gap-2">
                  <Link
                    href="/"
                    className="text-[#213554] whitespace-nowrap hover:text-[#EE334B] transition-colors duration-200"
                  >
                    Home
                  </Link>
                  {category?.brandId?.name && (
                    <>
                      <LiaAngleRightSolid className="text-gray-500" />
                      <Link
                        href={`/${category?.brandId?.slug || ""}`}
                        className="text-[#213554] whitespace-nowrap hover:text-[#EE334B] transition-colors duration-200 capitalize"
                      >
                        {category?.brandId?.name}
                      </Link>
                    </>
                  )}
                  {category?.title && (
                    <>
                      <LiaAngleRightSolid className="text-gray-500" />
                      <span className="text-gray-600 capitalize whitespace-nowrap">{category?.title}</span>
                    </>
                  )}
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {category.subTitle || "Bespoke Packaging Solutions for Car Parts, Tools, and Accessories"}
              </h1>
              <div
                className="text-gray-700 mb-6 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: category.description || "" }}
              />
              <div className="flex flex-wrap gap-4">
                <CategoryInstantQuoteButton
                  quoteCategory={{
                    _id: category._id,
                    title: category.title,
                    image: category.image,
                  }}
                />
                <Link href="/packaging-shapes-styles">
                  <Button className="bg-[#2D5016] hover:bg-[#3A6B1F] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Explore Shapes & Styles
                  </Button>
                </Link>
              </div>
            </div>
            <div className="sm:w-1/2 w-full">
              {category.image ? (
                <div className="relative">
                  <Image
                    src={`${siteOrigin}/${category.image}`}
                    alt={category.imageAltText || category.title || ""}
                    width={1200}
                    height={800}
                    className="w-full mx-auto rounded-xl object-cover"
                    priority
                    unoptimized
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {category.showBottomHero && <BottomHero />}

      {category.showTrustBanner && <TrustBanner categoryName={category.title} />}

      {category.showServiceSelectionCard && <ServiceSelectionCard items={serviceSelectionData} />}

      <CategoryTestimonials />

      <section className="py-6 sm:py-8 bg-white mt-6 sm:mt-10">
        <div className="sm:max-w-8xl w-full max-w-[95%] mx-auto px-3 sm:px-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-1 h-10 sm:h-12 shrink-0 bg-linear-to-b from-[#EE334B] to-[#213554] rounded-full" />
              <div className="min-w-0">
                <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl font-bold text-[#213554] text-left">
                  {category.title || "Products"}
                </h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base leading-snug">
                  We cover all your packaging needs. Can&apos;t find yours?
                </p>
              </div>
            </div>
            <Link href={`/category/${slug}`} className="group shrink-0 self-start sm:self-auto">
              <p className="font-bold text-[#213554] flex items-center hover:text-[#EE334B] transition-colors duration-300 uppercase text-xs sm:text-sm">
                View all
                <LiaAngleRightSolid
                  className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                  size={15}
                />
              </p>
            </Link>
          </div>
        </div>
      </section>

      <div className="sm:max-w-8xl w-full max-w-[95%] mx-auto px-3 sm:px-4 md:px-5 pb-8 sm:pb-10">
        <div className="pt-4 sm:pt-6">
          <div className="w-full mx-auto min-w-0">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((p) => {
                const img =
                  p.images && p.images[0]?.url ? `${siteOrigin}/${p.images[0].url.replace(/^\//, "")}` : "";
                return (
                  <ProductCard
                    key={p._id}
                    href={`/product/${p.slug}`}
                    title={p.name || p.slug}
                    imageSrc={img}
                    imageAlt={p.name || p.slug}
                    variant="carousel"
                  />
                );
              })}
            </div>
            {currentPage < totalPages && (
              <div className="flex justify-center mt-8 sm:mt-12 px-2">
                <Link
                  href={`/category/${slug}?page=${currentPage + 1}`}
                  className="w-full max-w-xs sm:w-auto sm:max-w-none text-center bg-linear-to-r from-[#213554] to-[#213554]/90 hover:from-[#EE334B] hover:to-[#EE334B]/90 text-white px-8 sm:px-10 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
                >
                  Explore More
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <OfferCard
        title="Looking For Other Custom Boxes And packaging?"
        subTitle="Chat live with our packaging experts now for a free consultation and insert price quote."
        buttonText="Contact Us"
        buttonIcon={<RiPhoneLine size={18} />}
      />
      <CustomPackagingApart />
      <AddonsAndInserts />
      <div className="py-6 sm:py-10">
        <CreativeGallery products={products} />
      </div>
      <CustomPackagingProduced />
      <CategoryTabsSections
        showTabsSection1={category.showTabsSection1}
        showTabsSection2={category.showTabsSection2}
      />
      <FAQ
        items={category.qna}
        imageUrl={category.faqImage}
        imageAlt={category.faqImageAltText}
      />
      <PackagingJourney />
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug, 600);
  if (!category) {
    return {
      title: "Category Not Found",
      description:
        "No category matches this page. Browse X Custom Packaging for custom boxes and wholesale packaging.",
      robots: { index: false, follow: true },
    };
  }
  const title = category.metaTitle || category.title || "Category";
  const description = category.metaDescription || "";
  const kw = category.keywords || "";
  const keywords = kw ? kw.split(",").map((k) => k.trim()).filter(Boolean) : undefined;
  const url = `https://xcustompackaging.com/category/${slug}`;
  const img = category.image ? `https://xcustompackaging.com/${category.image}` : undefined;
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
