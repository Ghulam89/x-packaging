
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa'
import axios from 'axios'
import { BaseUrl } from '../../utils/BaseUrl'
import Banner from '../../components/common/Banner'
import FAQ from '../../components/FAQ/FAQ'
import FeaturesPackaging from '../../components/FeaturesPackaging'
import CardSlider from '../../components/common/CardSlider'
import BlogCard from '../../components/common/BlogCard'
import Blog from '../../components/blog/Blog'
import PageMetadata from '../../components/common/PageMetadata'

const Category = ({ serverData }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoryData, setCategoryData] = useState(serverData || null);
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(!serverData);

  const FetchCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/brands/get?slug=${slug}`);
      if (!response?.data?.data) {
        navigate('/404')
        return
      }
      setCategoryData(response?.data?.data);

      const response2 = await axios.get(
        `${BaseUrl}/products/categoryProducts/${response?.data?.data._id}/products-by-category`
      );
      setCategoryProduct(response2?.data?.data?.categories || []);
    } catch (err) {
      console.error("Error fetching category:", err);
      // navigate('/404')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if serverData is not available or slug changed
    if (slug && (!serverData || serverData.slug !== slug)) {
      FetchCategory();
    } else if (serverData && serverData.slug === slug) {
      setCategoryData(serverData);
      setLoading(false);
    }
  }, [slug]); // Remove categoryData from dependencies to avoid infinite loop

  useEffect(() => {
    return () => {
      setCategoryData(null);
      setCategoryProduct([]);
    };
  }, [slug]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      // Only fetch if categoryData (brand) is available
      if (!categoryData?._id) {
        return;
      }

      setLoadingCategories(true);
      try {
        // Fetch categories filtered by brandId
        const response = await axios.get(`${BaseUrl}/category/getAll?page=1&perPage=100&brandId=${categoryData._id}`);
        
        if (response?.data?.status === 'success' && response?.data?.data) {
          // Filter categories by brandId on client side if API doesn't support it
          const filteredCategories = Array.isArray(response.data.data) 
            ? response.data.data.filter(category => category.brandId?._id === categoryData._id || category.brandId === categoryData._id)
            : [];
          setAllCategories(filteredCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchAllCategories();
  }, [categoryData?._id]);

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
        "name": categoryData?.name || categoryData?.title,
        "item": `${BaseUrl}/category/${slug}`
      }
    ]
  };

 
  return (
    <>
      {/* {categoryData && (
        <PageMetadata
          title={categoryData?.metaTitle || categoryData?.name || categoryData?.title}
          description={categoryData?.metaDescription || categoryData?.description}
          keywords={categoryData?.keywords}
          ogUrl={`${BaseUrl}/category/${slug}`}
          ogImage={categoryData?.bannerImage ? `${BaseUrl}/${categoryData?.bannerImage}` : categoryData?.image ? `${BaseUrl}/${categoryData?.image}` : ''}
          ogImageWidth="1200"
          ogImageHeight="630"
          canonicalUrl={`${BaseUrl}/category/${slug}`}
          breadcrumbSchema={breadcrumbSchema}
          robots={categoryData?.robots}
        />
      )} */}
  <Banner title={categoryData?.name} subTitle={categoryData?.name}  />
    <section className=' sm:max-w-8xl w-[95%] mx-auto'>
   
        <div className='  text-center max-w-5xl mx-auto py-7'>
            <h2>Custom packaging solutions for every industry.
            </h2>
            <p className=' pt-2'>Half Price Packaging possesses extensive expertise in delivering personalized packaging solutions to over 3000 businesses across the globe. Below, you will find a carefully curated selection of packaging solutions designed to cater to various industries.

</p>
        </div>

        {/* All Categories Section */}
        <div className='mb-12'>
          {loadingCategories ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(10).fill(null).map((_, index) => (
                <div 
                  key={index} 
                  className="group text-gray-700 bg-[#F9F9F9] rounded-3xl flex font-bold flex-col gap-0.5 items-center border border-gray-200 animate-pulse"
                >
                  <div className="p-4 relative overflow-hidden rounded-3xl w-full">
                    <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-gray-200"></div>
                  </div>
                  <div className="pb-3 w-3/4">
                    <div className="bg-gray-200 rounded h-4 w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allCategories.map((category) => (
                <Link
                  key={category._id}
                  to={`/category/${category.slug}`}
                  className="group text-gray-700 bg-[#F9F9F9] hover:bg-white rounded-3xl flex font-bold flex-col gap-0.5 items-center transition-all duration-300 border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transform hover:-translate-y-1"
                >
                  <div className="p-4 relative overflow-hidden rounded-3xl">
                    {category.image ? (
                      <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                        <img
                          src={`${BaseUrl}/${category.image}`}
                          alt={category.imageAltText || category.title}
                          className="w-full h-full  rounded-2xl"
                        />
                        {/* Gallery Hover Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                        {/* Gallery Shine Effect - Sweeps across on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-2xl"></div>
                      </div>
                    ) : category.icon ? (
                      <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                        <img
                          src={`${BaseUrl}/${category.icon}`}
                          alt={category.iconAltText || category.title}
                          className="w-full h-full object-contain rounded-2xl"
                        />
                        {/* Gallery Hover Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                        {/* Gallery Shine Effect - Sweeps across on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-2xl"></div>
                      </div>
                    ) : (
                      <div className="w-full h-56 bg-gradient-to-br from-[#213554]/10 to-[#EE334B]/10 flex items-center justify-center rounded-2xl relative overflow-hidden">
                        <span className="text-4xl font-bold text-[#213554]/30 relative z-10">
                          {category.title?.charAt(0) || 'C'}
                        </span>
                        {/* Gallery Hover Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                        {/* Gallery Shine Effect - Sweeps across on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-2xl"></div>
                      </div>
                    )}
                  </div>
                  <p className="pb-3 font-bold group-hover:text-[#EE334B] transition-colors duration-300">{category.title}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
    </section>

   

   

    <section className=' '>
      <FAQ/>
    </section>

     {/* Blogs Section */}
     <Blog/>
    
   
    </>
  )
}

export default Category