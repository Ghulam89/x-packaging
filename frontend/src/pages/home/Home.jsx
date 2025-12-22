import Hero from '../../components/Hero'
import { BaseUrl } from '../../utils/BaseUrl'
import React, { lazy, Suspense, useEffect } from 'react'
import { prefetchSubCategory, prefetchProducts } from '../../utils/prefetchUtils'
import axios from 'axios'
import FAQ from '../../components/FAQ/FAQ'
import BottomHero from '../../components/Hero/BottomHero'
import OfferCard from '../../components/common/OfferCard'
import google from '../../assets/images/footer/google-reviws-logo.webp';
import SampleKit from '../../components/SampleKit'
import Capabilities from '../../components/Capabilities'
import InspirationPackaging from '../../components/InspirationPackaging'
import Testimonials from '../../components/Testimonials'
import FeaturesPackaging from '../../components/FeaturesPackaging'
import Category from '../../components/Category'
import Blogs from '../blogs/Blogs'
import GetPriceQuote from '../../components/GetPriceQuote/GetPriceQuote'
import Blog from '../../components/blog/Blog'
export const Home = React.memo(() => {
  useEffect(() => {
    const heroSubCategories = [
      'fashion-apparel-packaging-boxes',
      'food-packaging-boxes',
      'cbd-packaging-boxes',
      'custom-cardboard-boxes'
    ];

    heroSubCategories.forEach(slug => {
      prefetchSubCategory(slug, true);
    });

    prefetchSubCategory('kraft-packaging-boxes', true);

    // Prefetch popular products from first page (non-blocking, lower priority)
    // This helps when users navigate to product pages
    const prefetchPopularProducts = async () => {
      try {
        // Small delay to not block initial page render
        setTimeout(async () => {
          const response = await axios.get(`${BaseUrl}/products/getAll?page=1&perPage=10`, {
            timeout: 8000
          });
          const products = response?.data?.data || [];
          if (products.length > 0) {
            // Extract slugs and prefetch first 5 popular products
            const productSlugs = products
              .slice(0, 5)
              .filter(p => p?.slug)
              .map(p => p.slug);
            if (productSlugs.length > 0) {
              prefetchProducts(productSlugs, false); // false = lower priority
            }
          }
        }, 500); // Delay to not block initial render
      } catch (error) {
        // Silently fail - prefetch is optional
      }
    };

    prefetchPopularProducts();
  }, []); // Run only once on mount

  //   const metadata = {
  //     title: "Affordable, High-Quality Custom Packaging Boxes – Wholesale | Umbrella Custom Packaging",
  //     description: "Get high-quality custom packaging boxes at wholesale prices. We offer affordable packaging for businesses of all sizes. Enjoy bulk discounts, free design support, and fast shipping.",
  //     keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
  //     author: "Umbrella Custom Packaging",
  //     canonicalUrl: BaseUrl,
  //     robots:'index, follow',
  //     ogUrl: BaseUrl,
  //     ogImage: `${BaseUrl}${Hero1}`,
  //     ogImageWidth: "768",
  //     ogImageHeight: "499",
  //     ogImageType: "images/webp",
  //     modifiedTime: "2025-06-13T15:18:43+00:00",
  //     homeSchema : {
  //   "@context": "https://schema.org",
  //   "@type": "LocalBusiness",
  //   "name": "Umbrella Custom Packaging",
  //   "hasMap": "https://www.google.com/maps/place/Umbrella+Custom+Packaging+USA/@34.0304757,-118.4009978,17z/data=!3m2!4b1!5s0x80c2bbd3055d51a3:0x68496cbd465819b1!4m6!3m5!1s0x80c2bbbf80eec803:0x8425555061bf7fe8!8m2!3d34.0304757!4d-118.4009978!16s%2Fg%2F11smvg80n4?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D",
  //   "url": "https://xcustompackaging.com",
  //   "logo": `${BaseUrl}${logo}`,
  //   "image": `${BaseUrl}${Hero1}`,
  //   "telephone": "+1-747-247-0456",
  //   "description": "Get high-quality custom packaging boxes at wholesale prices. We offer affordable packaging for businesses of all sizes. Enjoy bulk discounts, free design support, and fast, reliable shipping. Order now for unmatched prices!",
  //   "founder": {
  //     "@type": "Person",
  //     "name": "Scott Ray"
  //   },
  //   "foundingDate": "2020-06-01",
  //   "address": {
  //     "@type": "PostalAddress",
  //     "streetAddress": "9854 National Blvd #1042",
  //     "addressLocality": "Los Angeles",
  //     "addressRegion": "CA",
  //     "postalCode": "90034",
  //     "addressCountry": "US"
  //   },
  //   "geo": {
  //     "@type": "GeoCoordinates",
  //     "latitude": 34.030563,
  //     "longitude": -118.40069
  //   },
  //   "priceRange": "$$",
  //   "additionalProperty": [
  //     {
  //       "@type": "PropertyValue",
  //       "name": "Eco-Friendly Materials",
  //       "value": "Yes"
  //     }
  //   ],
  //   "openingHoursSpecification": [
  //     {
  //       "@type": "OpeningHoursSpecification",
  //       "dayOfWeek": [
  //         "Monday",
  //         "Tuesday",
  //         "Wednesday",
  //         "Thursday",
  //         "Friday"
  //       ],
  //       "opens": "09:00",
  //       "closes": "18:00"
  //     }
  //   ],
  //   "contactPoint": [
  //     {
  //       "@type": "ContactPoint",
  //       "telephone": "+1-747-247-0456",
  //       "contactType": "sales",
  //       "contactOption": "TollFree",
  //       "areaServed": "US",
  //       "availableLanguage": "en",
  //       "email": "sales@umbrellapackaging.com"
  //     }
  //   ],
  //   "sameAs": [
  //     "https://www.upwork.com/umbrellapackaging",
  //     "https://www.facebook.com/umbrellapackaging",
  //     "https://www.instagram.com/umbrellacustompackaging/",
  //     "https://www.youtube.com/channel/UCkxeWyAJqxjFSzlbnSoIVLQ",
  //     "https://www.linkedin.com/company/umbrellacustompackaging/",
  //     "https://x.com/umbrellapack"
  //   ]
  // }

  //   };



  return (
    <>
      {/* <PageMetadata {...metadata} /> */}

      <main>
        {/* Above the fold - load immediately */}
        <Hero />
        <BottomHero />
        <Category />
        {/* <ShopByCategories /> */}
        <OfferCard discount={'Get 30%'} title={'Off Your First Order!'} />
        <FeaturesPackaging />
        <OfferCard discount={'Save 30%'} title={'on Bulk Orders'} subTitle={'Need more this year?'} />
        <div className="  mt-8  sm:max-w-8xl bg-[#F6F6F6] p-8 flex sm:flex-row flex-col gap-5 justify-between items-center rounded-xl max-w-[95%] mx-auto">
          <div>
            <img src={google} alt='' />
          </div>
          <div>
            <button className='px-6 py-2.5 rounded-lg flex bg-blue-500 text-white  hover:bg-[#EE334B] hover:text-white hover:border-[#EE334B] text-sm items-center justify-center gap-2 
      transition-all duration-300 ease-in-out transform 
      hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed'>Review us on Google</button>
          </div>
        </div>
        <Testimonials />
        <Blog/>
        <div className=' pt-5'>
        <GetPriceQuote />
        </div>
        
        {/* <Blogs /> */}

        <InspirationPackaging />

        <Capabilities />
        <SampleKit />
        <FAQ />
      </main>
    </>
  )
})