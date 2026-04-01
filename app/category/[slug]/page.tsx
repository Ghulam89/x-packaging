import { apiGet, getCategoryBySlug, siteOrigin } from "@/lib/api";
import type { Product } from "@/types";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/shared/ui/Button";
import ProductCard from "@/components/entities/product/ui/ProductCard";
import { IoHomeOutline } from "react-icons/io5";
import { LiaAngleRightSolid } from "react-icons/lia";
import BottomHero from "@/components/widgets/home/BottomHero";
import PersonalTestimonial from "@/components/widgets/home/PersonalTestimonial";
import FAQ from "@/components/widgets/home/FAQ";
import OfferCard from "@/components/widgets/home/OfferCard";
import CustomPackagingApart from "@/components/widgets/home/CustomPackagingApart";
import AddonsAndInserts from "@/components/widgets/home/AddonsAndInserts";
import { RiPhoneLine } from "react-icons/ri";
import InspirationPackaging from "@/components/widgets/home/InspirationPackaging";
import CustomPackagingProduced from "@/components/widgets/home/CustomPackagingProduced";
import PackagingJourney from "@/components/widgets/home/PackagingJourney";
import CreativeGallery from "@/components/widgets/home/CreativeGallery";
import TrustBanner from "@/components/shared/marketing/TrustBanner";
import ServiceSelectionCard from "@/components/entities/product/ui/ServiceSelectionCard";
import CategoryTestimonials from "@/components/widgets/home/CategoryTestimonials";
import { ASSETS } from "@/lib/assets";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug, 600);
  if (!category) {
    return (
      <main className="mx-auto w-[95%] sm:max-w-8xl py-12">
        <h1 className="text-2xl font-semibold text-[#213554]">Category not found</h1>
        <Link className="text-[#EE334B]" href="/">Back to Home</Link>
      </main>
    );
  }
  const sp = (await searchParams) || {};
  const page = sp.page ? Number(sp.page) || 1 : 1;
  let products: Product[] = [];
  let currentPage = page;
  let totalPages = 1;
  if (category._id) {
    const r = await apiGet<Product[]>(`/products/categoryProducts/${category._id}${page ? `?page=${page}` : ""}`, { revalidate: 600 });
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

  return (
    <main>
      <section className="py-5 sm:h-[70vh] h-auto flex flex-col justify-center" style={{ backgroundColor: (category as any)?.bannerBgColor || "#f8f9fa" }}>
        <div className="sm:max-w-8xl max-w-[95%] mx-auto w-full">
          <div className="flex gap-2 pt-3  items-center">
            <IoHomeOutline size={20} className="text-gray-600" />
            <LiaAngleRightSolid className="text-gray-500" />
            <div className="flex items-center flex-wrap gap-2">
              <Link href="/" className="text-[#213554] whitespace-nowrap hover:text-[#EE334B] transition-colors duration-200">
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
                  <span className="text-gray-600 capitalize whitespace-nowrap">
                    {category?.title}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex sm:flex-row items-center flex-col gap-8 lg:gap-12">
            <div className="sm:w-1/2 w-full">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {(category as any)?.subTitle || "Bespoke Packaging Solutions for Car Parts, Tools, and Accessories"}
              </h1>
              <div
                className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: (category as any)?.description || "" }}
              />
              <div className="flex flex-wrap gap-4">
                <Link href="/contact-us">
                  <Button className="bg-[#2D5016] hover:bg-[#3A6B1F] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Get an Instant Quote
                  </Button>
                </Link>
                <Link href="/dielines">
                  <Button className="bg-[#2D5016] hover:bg-[#3A6B1F] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Explore Shapes & Styles
                  </Button>
                </Link>
              </div>
            </div>
            <div className="sm:w-1/2 w-full">
              {(category as any)?.image ? (
                <div className="relative">
                  <Image
                    src={`${siteOrigin}/${(category as any)?.image}`}
                    alt={(category as any)?.imageAltText || category?.title || ""}
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

      <BottomHero />

      <TrustBanner categoryName={category.title} />

      <ServiceSelectionCard items={serviceSelectionData} />

      <CategoryTestimonials />

      <section className="py-8 bg-white mt-10">
        <div className="sm:max-w-8xl max-w-[95%] mx-auto">
          <div className="flex sm:flex-row flex-col items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-1 h-12 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#213554] text-left">
                  {category?.title || "Products"}
                </h2>
                <p className="text-gray-600 mt-1">
                  We cover all your packaging needs. Can't find yours?
                </p>
              </div>
            </div>
            <Link href={`/category/${slug}`} className="group">
              <p className="font-bold text-[#213554] flex items-center hover:text-[#EE334B] transition-colors duration-300 uppercase text-sm">
                View all
                <LiaAngleRightSolid className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={15} />
              </p>
            </Link>
          </div>
        </div>
      </section>
      <div className="sm:max-w-8xl w-[95%] md:px-5 px-3 mx-auto pb-10">
        <div className="flex sm:flex-row flex-col pt-4 gap-12">
          <div className="sm:max-w-8xl w-full mx-auto">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
              <div className="flex justify-center mt-12">
                <Link
                  href={`/category/${slug}?page=${currentPage + 1}`}
                  className="bg-gradient-to-r from-[#213554] to-[#213554]/90 hover:from-[#EE334B] hover:to-[#EE334B]/90 text-white px-10 py-3.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
      <div className="py-10">
        <CreativeGallery  products={products} />
      </div>
      <CustomPackagingProduced />
      <FAQ items={(category as any)?.qna} imageUrl={(category as any)?.faqImage} imageAlt={(category as any)?.faqImageAltText} />
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
  const title = category?.metaTitle || category?.title || "Category";
  const description = category?.metaDescription || "";
  const kw = category?.keywords || "";
  const keywords = kw ? kw.split(",").map((k) => k.trim()).filter(Boolean) : undefined;
  const url = `https://xcustompackaging.com/category/${slug}`;
  const img = category?.image ? `https://xcustompackaging.com/${category.image}` : undefined;
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
