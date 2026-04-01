import { getProductsAll, getFaqAll, getBannerAll, getBrandsAll } from "@/lib/api";
import type { Product } from "@/types";
import Hero from "@/components/widgets/home/Hero";
import BottomHero from "@/components/widgets/home/BottomHero";
import CategoryBoxes from "@/components/widgets/home/CategoryBoxes";
import OfferCard from "@/components/widgets/home/OfferCard";
import Category from "@/components/widgets/home/Category";
import CategoryGrid from "@/components/widgets/home/CategoryGrid";
import PackagingBanner from "@/components/widgets/home/PackagingBanner";
import BannerContent from "@/components/widgets/home/BannerContent";
import FAQ from "@/components/widgets/home/FAQ";
import CustomPackagingProduced from "@/components/widgets/home/CustomPackagingProduced";
import GetPriceQuote from "@/components/features/quote/ui/GetPriceQuote";
import AddonsAndInserts from "@/components/widgets/home/AddonsAndInserts";
import CustomPackagingApart from "@/components/widgets/home/CustomPackagingApart";
import CustomBoxMaterial from "@/components/widgets/home/CustomBoxMaterial";
import WeFulfil from "@/components/widgets/home/WeFulfil";
import InspirationPackaging from "@/components/widgets/home/InspirationPackaging";
import PersonalTestimonial from "@/components/widgets/home/PersonalTestimonial";
import Blog from "@/components/widgets/home/Blog";
import type { Metadata } from "next";

type HomePayload = {
  topProducts: Product[];
  faqs: any[];
  banner: any;
  brands: any[] | null;
};

async function loadHome(): Promise<HomePayload> {
  const [products, faqs, bannerList, brands] = await Promise.all([
    getProductsAll(1, 8, 600),
    getFaqAll(3600),
    getBannerAll(600),
    getBrandsAll(3600),
  ]);
  const banner = Array.isArray(bannerList) && bannerList[0] ? bannerList[0] : null;
  return { topProducts: products, faqs, banner, brands };
}

export default async function Home() {
  const data = await loadHome();
  return (
    <main className="min-h-screen">
      <Hero />
      <BottomHero />
      <CategoryBoxes />
      <OfferCard discount={"Get 40%"} title={"Saving on Buying the Bulk"} subTitle={"Limited time offer"} />
      <Category serverData={data.topProducts as Product[]} />
      <CustomBoxMaterial />
      <CustomPackagingProduced />
      <GetPriceQuote />
      <AddonsAndInserts />
      <CustomPackagingApart />
      <PackagingBanner />
      <WeFulfil />
      <InspirationPackaging />
      <PersonalTestimonial />
      <BannerContent banner={data.banner} />
      <FAQ items={data.faqs} />
      <Blog />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Affordable, High-Quality Custom Packaging Boxes – Wholesale",
    description:
      "Get high-quality custom packaging boxes at wholesale prices. Affordable packaging for all sizes. Bulk discounts, free design support, and fast shipping.",
    keywords: [
      "x custom packaging",
      "wholesale boxes",
      "packaging solutions",
      "custom boxes",
      "eco-friendly packaging"
    ],
    robots: {
      index: false,
      follow: false
    },
    alternates: {
      canonical: "https://xcustompackaging.com"
    },
    openGraph: {
      type: "website",
      url: "https://xcustompackaging.com",
      title: "Affordable, High-Quality Custom Packaging Boxes – Wholesale",
      description:
        "Get high-quality custom packaging boxes at wholesale prices. Affordable packaging for all sizes. Bulk discounts, free design support, and fast shipping."
    },
    twitter: {
      card: "summary_large_image",
      title: "Affordable, High-Quality Custom Packaging Boxes – Wholesale",
      description:
        "Get high-quality custom packaging boxes at wholesale prices. Affordable packaging for all sizes. Bulk discounts, free design support, and fast shipping."
    }
  };
}
