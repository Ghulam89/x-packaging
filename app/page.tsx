import {
  getProductsAll,
  getFaqAll,
  getBannerAll,
  getBrandsAll,
  getBlogsForHome,
  getCategoriesForHome,
} from "@/lib/api";
import type {
  Blog as BlogPost,
  Category as CategoryEntity,
  Product,
} from "@/types";
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

const homeLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "X Custom Packaging",
  hasMap:
    "https://www.google.com/maps/place/X+Custom+Packaging+USA/@34.0304757,-118.4009978,17z/data=!3m2!4b1!5s0x80c2bbd3055d51a3:0x68496cbd465819b1!4m6!3m5!1s0x80c2bbbf80eec803:0x8425555061bf7fe8!8m2!3d34.0304757!4d-118.4009978!16s%2Fg%2F11smvg80n4?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D",
  url: "https://xcustompackaging.com",
  telephone: "+1-747-247-0456",
  description:
    "Get high-quality custom packaging boxes at wholesale prices. We offer affordable packaging for businesses of all sizes. Enjoy bulk discounts, free design support, and fast, reliable shipping. Order now for unmatched prices!",
  founder: {
    "@type": "Person",
    name: "Scott Ray",
  },
  foundingDate: "2020-06-01",
  address: {
    "@type": "PostalAddress",
    streetAddress: "9854 National Blvd #1042",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    postalCode: "90034",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.030563,
    longitude: -118.40069,
  },
  priceRange: "$$",
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Eco-Friendly Materials",
      value: "Yes",
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-747-247-0456",
      contactType: "sales",
      contactOption: "TollFree",
      areaServed: "US",
      availableLanguage: "en",
      email: "sales@xcustompackaging.com",
    },
  ],
  sameAs: [
    "https://www.upwork.com/xcustompackaging",
    "https://www.facebook.com/xcustompackaging",
    "https://www.instagram.com/xcustompackaging/",
    "https://www.youtube.com/channel/UCkxeWyAJqxjFSzlbnSoIVLQ",
    "https://www.linkedin.com/company/xcustompackaging/",
    "https://x.com/xcustompackaging",
  ],
};

export const dynamic = "force-dynamic";

type HomePayload = {
  topProducts: Product[];
  faqs: any[];
  banner: any;
  brands: any[] | null;
  homeBlogs: BlogPost[];
  homeCategoryBoxes: CategoryEntity[];
};

async function loadHome(): Promise<HomePayload> {
  const [products, faqs, bannerList, brands, homeBlogs, homeCategoryBoxes] =
    await Promise.all([
      getProductsAll(1, 8, 600),
      getFaqAll(3600),
      getBannerAll(600),
      getBrandsAll(3600),
      getBlogsForHome(6, 600),
      getCategoriesForHome(5, 600),
    ]);
  const banner =
    Array.isArray(bannerList) && bannerList[0] ? bannerList[0] : null;
  return {
    topProducts: products,
    faqs,
    banner,
    brands,
    homeBlogs,
    homeCategoryBoxes,
  };
}

export default async function Home() {
  const data = await loadHome();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeLocalBusinessSchema),
        }}
      />
      <main className="min-h-screen">
        <Hero />
        <BottomHero />
        <CategoryBoxes initialCategories={data.homeCategoryBoxes} />
        <OfferCard
          discount={"Get 40%"}
          title={"Saving on Buying the Bulk"}
          subTitle={"Limited time offer"}
        />
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
        <Blog initialBlogs={data.homeBlogs} />
      </main>
    </>
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
      "eco-friendly packaging",
    ],
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: "https://xcustompackaging.com",
    },
    openGraph: {
      type: "website",
      url: "https://xcustompackaging.com",
      title: "Affordable, High-Quality Custom Packaging Boxes – Wholesale",
      description:
        "Get high-quality custom packaging boxes at wholesale prices. Affordable packaging for all sizes. Bulk discounts, free design support, and fast shipping.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Affordable, High-Quality Custom Packaging Boxes – Wholesale",
      description:
        "Get high-quality custom packaging boxes at wholesale prices. Affordable packaging for all sizes. Bulk discounts, free design support, and fast shipping.",
    },
  };
}
