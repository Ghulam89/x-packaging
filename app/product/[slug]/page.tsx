import { apiBase, getProductBySlug, siteOrigin } from "@/lib/api";
import type { Product } from "@/types";
import Link from "next/link";
import type { Metadata } from "next";
import ProductLayout from "@/components/widgets/product-details/ProductLayout";
import ProductSpecification from "@/components/widgets/product-details/ProductSpecification";
import EnhancePackaging from "@/components/widgets/product-details/EnhancePackaging";
import ProductOrderSection from "@/components/widgets/product-details/ProductOrderSection";
import FAQ from "@/components/widgets/home/FAQ";
import Blog from "@/components/widgets/home/Blog";
import TrustBanner from "@/components/shared/marketing/TrustBanner";
import BottomHero from "@/components/widgets/home/BottomHero";
import { ASSETS } from "@/lib/assets";
import Image from "next/image";
import OfferCard from "@/components/widgets/home/OfferCard";
import ProductCard from "@/components/entities/product/ui/ProductCard";

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

  if (!product) {
    return (
      <main className="mx-auto w-[95%] sm:max-w-8xl py-20 text-center">
        <h1 className="text-4xl font-bold text-[#213554] mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you are looking for does not exist or has been moved.</p>
        <Link href="/" className="bg-[#EE334B] text-white px-8 py-3 rounded-full font-bold hover:bg-[#EE334B]/90 transition-all">
          Back to Home
        </Link>
      </main>
    );
  }

  const images = (product.images || []).map((img: any) =>
    img?.url ? `${siteOrigin}/${img.url.replace(/^\//, "")}` : ""
  ).filter(Boolean);

  if (images.length === 0) {
    images.push("https://placehold.co/600x600?text=No+Image+Available");
  }

  return (
    <main className="bg-white min-h-screen">
     
      <ProductLayout product={product} images={images} />
      <TrustBanner/>
      <section className=" py-10">
                <div className="sm:max-w-8xl w-[95%] gap-3 flex flex-row items-center justify-between mx-auto">
                    <div className=' w-6/12 mx-auto'>
                    <div className='flex items-center mb-4 gap-2'>
                    <div className="w-1 h-12 bg-linear-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#213554] ">
                        {product?.name}
                    </h2>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base max-w-6xl mx-auto  overflow-y-auto h-28 custom-scrollbar">
                        Let magnetic closure box packaging speak volumes about your products and brand with its luxurious
                        appeal and elegance. The built-in magnet in the rigid stock ensures the boxes close and open easily
                        without using tape or adhesive. You can pack all kinds of solid products in magnetic closure boxes,
                        be they gifts or retail items. Customize them with sleek finishes to improve customers’ tactile and
                        gifting experience!
                    </p>
                    <p className="my-5 font-semibold text-[#213554] text-xs sm:text-sm  tracking-wide">
                        More Than +5000 Satisfied Clients Worldwide
                    </p>
                    <BottomHero/>

                   <div  className=''>
                   <img src={ASSETS.satisfiedClients} alt="Satisfied Clients" className=' w-24' />
                   </div>
                  <div>

                  </div>
                    </div>
                    <div className=' w-4/12 mx-auto'>
                    
                        <div className=' w-full'>
                            <Image src={`${siteOrigin}/${(product as any).bannerImage}`} alt={product?.name || ''} width={500} height={500} className='  shadow-2xl w-full rounded-2xl' />
                        </div>
                    
                </div>
            </div>
        </section>

        <ProductSpecification />
        <OfferCard  title={"Looking For Other Custom Boxes And packaging?"} subTitle={"Chat live with our packaging experts now for a free consultation and insert price quote."} />

        {product?.description && (
                <section className='sm:max-w-8xl max-w-[95%] mx-auto py-8'>
                    <div className="bg-linear-to-br from-gray-50 via-white to-gray-50 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-1 h-12 bg-linear-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
                            <h2 className='text-2xl sm:text-3xl font-bold text-[#213554]'>
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
        <section className=" sm:max-w-8xl max-w-[95%] mx-auto">
          <div className="flex items-center gap-4 flex-1 mb-5">
            <div className="w-1 h-12 bg-linear-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#213554]">Related Products</h2>
              <p className="text-gray-600 text-sm mt-1">Discover packaging tailored for your products</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
  const title = product?.metaTitle || product?.name || "Product";
  const description = product?.metaDescription || "";
  const kw = product?.keywords || "";
  const keywords = kw ? kw.split(",").map((k) => k.trim()).filter(Boolean) : undefined;
  const url = `https://xcustompackaging.com/product/${slug}`;
  const img =
    product?.images && product.images[0]?.url
      ? `https://xcustompackaging.com/${product.images[0].url}`
      : undefined;
  const robotsStr = product?.robots || "";
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

