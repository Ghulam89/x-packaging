import React, { useState, useEffect } from 'react'
import Button from '../../components/common/Button'
import ProductCard, { ProductSelectionProvider } from '../../components/common/ProductCard'
import { Link, useParams } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa'
import { IoHomeOutline } from 'react-icons/io5'
import { LiaAngleRightSolid } from 'react-icons/lia'
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import { prefetchProductsBatch, prefetchSubCategory, getCachedSubCategory } from '../../utils/prefetchUtils';
import PageMetadata from '../../components/common/PageMetadata';
import InstantQuoteModal from '../../components/common/InstantQuoteModal';
import { insert1, insert2, insert3, insert4, insert5 } from '../../assets';
import FAQ from '../../components/FAQ/FAQ'
import TrustBanner from '../../components/common/TrustBanner'
import BoxesBrands from '../../components/BoxesBrands';
import CreativeGallery from '../../components/CreativeBanner/CreativeGallery';
import PackagingFeatures from '../../components/CustomPackagingApart/PackagingFeatures';
import Tabs from '../../components/common/Tabs';
import { RiPhoneLine } from 'react-icons/ri';
import PackagingJourney from '../../components/PackagingJourney';
import CategoryBanner from '../../components/CategoryBanner';
import OfferCard from '../../components/common/OfferCard';
import ServiceSelectionCard from '../../components/common/ServiceSelectionCard';
import CategoryTestimonials from '../../components/CategoryTestimonials';
import BottomHero from '../../components/Hero/BottomHero';
import { getInsertsSlides } from '../../constants/slideData';
import { serviceSelectionData } from '../../utils/serviceData';
import { galleryVideo } from '../../utils/galleryData';
import { generateTabsData, generateTabsData1, generateTabsData2 } from '../../utils/tabData';
const SubCategory = ({ serverData, CategoryProducts }) => {
  const { slug } = useParams();
  const [categoryData, setCategoryData] = useState(serverData || null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allProducts, setAllProducts] = useState(CategoryProducts || []);
  const [loading, setLoading] = useState(!serverData && !CategoryProducts)
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProduct = async (page = 1) => {

    if (page === 1) {
      setLoading(true);
      setLoadingProducts(Array(8).fill(null));
    } else {

      setLoadingMore(true);
    }

    try {
      const response = await axios.get(`${BaseUrl}/category/get?slug=${slug}`);

      setCategoryData(response?.data?.data);

      const response2 = await axios.get(
        `${BaseUrl}/products/categoryProducts/${response?.data?.data?._id}?page=${page}`
      );
      if (page === 1) {
        setAllProducts(response2?.data?.data);
        setLoadingProducts([]);
      } else {

        setAllProducts(prev => {
          const existingIds = new Set(prev.map(p => p._id));
          const newProducts = response2?.data?.data.filter(p => !existingIds.has(p._id));
          return [...prev, ...newProducts];
        });
      }
      setCurrentPage(response2?.data?.currentPage);
      setTotalPages(response2?.data?.totalPages);

    } catch (err) {
      if (page === 1) {
        setLoadingProducts([]);
      }
    } finally {
      if (page === 1) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }

  };

  // Scroll to top on component mount and route change (helps with lazy-load timing)
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    if (slug) {

      const cachedData = getCachedSubCategory(slug);
      if (cachedData) {
        setCategoryData(cachedData);
      }


      prefetchSubCategory(slug, true);


      if (CategoryProducts && CategoryProducts.length > 0) {
        setAllProducts(CategoryProducts);
        setCurrentPage(1);
        setTotalPages(1);
      } else {
        setAllProducts([]);
        setCurrentPage(1);
        setTotalPages(1);
        fetchProduct();
      }
    }
  }, [slug, CategoryProducts]);


  useEffect(() => {
    if (allProducts && allProducts.length > 0) {

      prefetchProductsBatch(allProducts, {
        batchSize: 5,
        delayBetweenBatches: 50,
        priority: true
      });
    }
  }, [allProducts]);

  const loadMoreProducts = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages && !loadingMore && !loading) {
      fetchProduct(nextPage);
    }
  };


  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BaseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryData?.brandId?.name || serverData?.brandId?.name,
        "item": `${BaseUrl}/category/${categoryData?.brandId?.slug || serverData?.brandId?.slug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryData?.title || serverData?.title,
        "item": `${BaseUrl}/sub-category/${slug}`
      }
    ]
  };


  const productItems = (allProducts || CategoryProducts)?.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 3,
    "name": item?.name,
    "item": `${BaseUrl}/${item?.slug}`,
    "image": item?.images?.[0]?.url ? `${BaseUrl}/${item.images[0].url}` : undefined
  })) || [];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BaseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryData?.title || serverData?.title,
        "item": `${BaseUrl}/sub-category/${slug}`
      },
      ...productItems
    ]
  };


  const insertsSlides = getInsertsSlides(insert1, insert2, insert3, insert4, insert5);

  const {

  } = generateTabsData(insertsSlides);


  const tabsData = generateTabsData1(insertsSlides);
  const tabsData2 = generateTabsData2();
  return (
    <>
      {(categoryData || serverData) ? (
        <PageMetadata
          title={categoryData?.metaTitle || serverData?.metaTitle}
          description={categoryData?.metaDescription || serverData?.metaDescription || ""}
          keywords={categoryData?.keywords || serverData?.keywords || ""}
          ogUrl={`${BaseUrl}/sub-category/${slug}`}
          ogImage={`${BaseUrl}/${categoryData?.image || serverData?.image}`}
          ogImageWidth="1200"
          ogImageHeight="630"
          canonicalUrl={`${BaseUrl}/sub-category/${slug}`}
          breadcrumbSchema={breadcrumbSchema}
          // robots={categoryData?.robots || serverData?.robots}
          itemListSchema={itemListSchema}
        />
      ) : null}


      <section className='py-5 sm:h-[70vh] h-auto' style={{ backgroundColor: categoryData?.bannerBgColor || serverData?.bannerBgColor }}>
        <div className="sm:max-w-8xl max-w-[95%] mx-auto">

          <div className='flex gap-2 pb-4 items-center'>
            <IoHomeOutline size={20} className="text-gray-600" />
            <LiaAngleRightSolid className="text-gray-500" />
            <h6 className='flex items-center gap-2'>
              <Link to={'/'} className='text-[#213554] hover:text-[#EE334B] transition-colors duration-200'>
                Home
              </Link>
              {(categoryData?.brandId?.name || serverData?.brandId?.name) && (
                <>
                  <LiaAngleRightSolid className="text-gray-500" />
                  <Link
                    to={`/${categoryData?.brandId?.slug || serverData?.brandId?.slug}`}
                    className='text-[#213554] hover:text-[#EE334B] transition-colors duration-200 capitalize'
                  >
                    {categoryData?.brandId?.name || serverData?.brandId?.name}
                  </Link>
                </>
              )}
              {(categoryData?.title || serverData?.title) && (
                <>
                  <LiaAngleRightSolid className="text-gray-500" />
                  <span className='text-gray-600 capitalize'>
                    {categoryData?.title || serverData?.title}
                  </span>
                </>
              )}
            </h6>
          </div>
          <div className='flex sm:flex-row items-center flex-col gap-8 lg:gap-12'>
            {/* Left Side - Text Content */}
            <div className='sm:w-1/2 w-full'>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {categoryData?.subTitle || serverData?.subTitle || 'Bespoke Packaging Solutions for Car Parts, Tools, and Accessories'}
              </h1>
              <p dangerouslySetInnerHTML={{ __html: categoryData?.description }} className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">

              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  label="Get an Instant Quote"
                  className="bg-[#2D5016] hover:bg-[#3A6B1F] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                />
                <Link to="/dielines">
                  <Button
                    label="Explore Shapes & Styles"
                    className="bg-[#2D5016] hover:bg-[#3A6B1F] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  />
                </Link>
              </div>
            </div>

            {/* Right Side - Product Display */}
            <div className='sm:w-1/2 w-full'>
              {categoryData?.image || serverData?.image ? (
                <div className="relative">
                  <img
                    src={`${BaseUrl}/${categoryData?.image || serverData?.image}`}
                    alt={categoryData?.imageAltText || serverData?.imageAltText || categoryData?.title || serverData?.title}
                    className=" mx-auto rounded-xl object-cover"
                    loading="eager"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>


      {(categoryData?.showBottomHero || serverData?.showBottomHero) && (
        <BottomHero />
      )}


      {(categoryData?.showTrustBanner || serverData?.showTrustBanner) && (
        <TrustBanner
          categoryName={categoryData?.title || serverData?.title}
        />
      )}


      {(categoryData?.showServiceSelectionCard || serverData?.showServiceSelectionCard) && (
        <ServiceSelectionCard items={serviceSelectionData} />
      )}

      <CategoryTestimonials />


      {((categoryData?.brands && categoryData.brands.length > 0) || (serverData?.brands && serverData.brands.length > 0)) && (
        <BoxesBrands
          title={`X Custom Packaging X Top ${categoryData?.title || serverData?.title || ''} Brands`}
          description="We don't just make packaging, we build brand moments! We have helped brands thrive in the market. Read their success stories below!"
          brands={categoryData?.brands || serverData?.brands || []}
        />
      )}

      <section className='py-8 bg-white'>
        <div className="sm:max-w-8xl max-w-[95%] mx-auto">
          <div className=' flex sm:flex-row flex-col items-center justify-between gap-4'>
            <div className="flex items-center gap-4">
              <div className="w-1 h-12 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
              <div>
                <h2 className='text-3xl sm:text-4xl font-bold text-[#213554] text-left'>
                  {categoryData?.title || serverData?.title || 'Products'}
                </h2>
                <p className='text-gray-600 mt-1'>
                  We cover all your packaging needs. Can't find yours?
                </p>
              </div>
            </div>
            <Link to="" className="group">
              <p className='font-bold text-[#EE334B] flex items-center hover:text-[#213554] transition-colors duration-300 uppercase text-sm'>
                View all <FaAngleRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={15} />
              </p>
            </Link>
          </div>
        </div>
      </section>


      <div className=" sm:max-w-8xl w-[95%] md:px-5 px-3 mx-auto pb-10">

        <div className="flex  sm:flex-row flex-col pt-4 gap-12">



          <div className=" sm:max-w-8xl w-full mx-auto">
            <ProductSelectionProvider>
              <div className="grid  gap-6 grid-cols-5">

                {loading && loadingProducts.length > 0 && loadingProducts.map((_, index) => (
                  <div className=' w-full' key={`loading-${index}`}>
                    <div className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg w-full sm:h-62 h-48 mb-2"></div>
                      <div className="bg-gray-200 rounded h-4 w-3/4 mx-auto mb-2"></div>
                      <div className="bg-gray-200 rounded h-3 w-1/2 mx-auto"></div>
                    </div>
                  </div>
                ))}


                {allProducts?.map((item, index) => {
                  return (
                    <ProductCard
                      key={item._id || index}
                      data={item}
                      disableSelection={false}
                    />
                  );
                })}

              </div>
            </ProductSelectionProvider>
            {currentPage < totalPages && (
              <div className="flex justify-center mt-8">
                <Button
                  label={loadingMore ? "Loading..." : "Explore More"}
                  className="bg-gradient-to-r from-[#213554] to-[#213554]/90 hover:from-[#EE334B] hover:to-[#EE334B]/90 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={loadMoreProducts}
                  disabled={loadingMore || loading}
                />
              </div>
            )}
          </div>
        </div>
      </div>


      <CategoryBanner
        title={categoryData?.bannerTitleFirst || serverData?.bannerTitleFirst}
        content={categoryData?.bannerContentFirst || serverData?.bannerContentFirst}
        image={categoryData?.bannerImageFirst || serverData?.bannerImageFirst}
        imageAltText={categoryData?.bannerImageFirstAltText || serverData?.bannerImageFirstAltText}
        buttonLabel="Get Custom Quote"
        onButtonClick={() => setIsModalOpen(true)}
      />


      <OfferCard
        title={'Looking For Other Custom Boxes And packaging?'}
        subTitle={'Chat live with our packaging experts now for a free consultation and insert price quote.'}
        buttonText={'Contact Us'}
        buttonIcon={<RiPhoneLine size={18} />}
      />


      <PackagingFeatures />
      <div className="bg-white sm:max-w-8xl pt-8 max-w-[95%] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-5 text-[#213554]">
          Get the Inserts Your Product Needs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { img: insert1, title: 'Foam Inserts' },
            { img: insert2, title: 'Cardboard Inserts' },
            { img: insert3, title: 'Clamshell Inserts' },
            { img: insert4, title: 'Corrugated Inserts' },
            { img: insert4, title: 'Corrugated Inserts' },
            { img: insert5, title: 'Eva Foam Inserts' }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl text-center border border-gray-100 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col items-center p-4 overflow-hidden"
            >
              <div className="relative mb-4 w-40 h-40 mx-auto aspect-square">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#EE334B]/30 transition-all duration-300">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover aspect-square transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Hover Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"></div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-full"></div>
              </div>
              <div className='px-2 pb-2'>
                <h6 className="font-semibold group-hover:text-[#EE334B] transition-colors duration-300">{item.title}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className='py-10'>
        <CreativeGallery
          products={allProducts && allProducts.length > 0 ? allProducts : []}
          title={`${categoryData?.title || serverData?.title || 'Custom'} Gallery`}
          description="Explore our premium collection of custom packaging solutions"
        />
      </section>


      <section className='mb-8'>
        <div className="sm:max-w-8xl bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-12 shadow-md max-w-[95%] mx-auto border border-gray-100">
          <div className="text-center mb-8">

            <h2 className='text-3xl sm:text-4xl font-bold text-[#213554] mb-4'>
              Learn More About Custom Bakery Boxes
            </h2>
            <h3 className='text-xl sm:text-2xl font-semibold text-[#213554]/80 pt-2'>
              Keep Your Baked Goods Fresh & Preserved with Durable Custom Bakery Boxes
            </h3>
          </div>

          <div
            className='prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed'
            dangerouslySetInnerHTML={{ __html: categoryData?.description || serverData?.description }}
            style={{
              lineHeight: '1.75'
            }}
          ></div>

        </div>
      </section>






      {(categoryData?.showTabsSection1 || serverData?.showTabsSection1) && (
        <section className='sm:max-w-8xl max-w-[95%] mx-auto'>
          <div className="mt-10">
            <Tabs className={' bg-white'} defaultTab={"Base Materials"} tabs={tabsData} />
          </div>
        </section>
      )}

      {(categoryData?.showTabsSection2 || serverData?.showTabsSection2) && (
        <section className='sm:max-w-8xl max-w-[95%] mx-auto'>
          <div className="mt-10">
            <Tabs className={' bg-white'} defaultTab={"Materials"} tabs={tabsData2} />
          </div>
        </section>
      )}
      {((categoryData?.qna && categoryData.qna.length > 0) || (serverData?.qna && serverData.qna.length > 0)) && (
        <FAQ
          serverData={categoryData?.qna || serverData?.qna}
          faqImageUrl={categoryData?.faqImage || serverData?.faqImage}
          faqImageAltText={categoryData?.faqImageAltText || serverData?.faqImageAltText}
        />
      )}


      <PackagingJourney products={galleryVideo} />
      <InstantQuoteModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        categoryData={categoryData || serverData}
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #EE334B 0%, #213554 100%);
          border-radius: 10px;
          border: none;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #EE334B 0%, #213554 100%);
          opacity: 0.9;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #EE334B #f1f1f1;
        }
      `}</style>

    </>
  )
}

export default SubCategory;