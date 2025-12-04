// import React, { useEffect, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Button from "../../components/common/Button";
// import Container from "../../components/common/Container";
// import { BaseUrl } from "../../utils/BaseUrl";
// import CardSlider from "../../components/common/CardSlider";
// import CustomPackagingProduced from "../../components/CustomPackagingProduced";
// import PageMetadata from "../../components/common/PageMetadata";
// import InstantQuoteModal from "../../components/common/InstantQuoteModal";
// import { prefetchProduct, prefetchProductsBatch, prefetchSubCategory } from "../../utils/prefetchUtils";
// import { ProductSelectionProvider } from "../../components/common/ProductCard";

// const Category = ({ serverData }) => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [categoryProduct, setCategoryProduct] = useState([]);
//   const [categoryData, setCategoryData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const FetchCategory = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${BaseUrl}/brands/get?slug=${slug}`);
//       if (!response?.data?.data) {
//         navigate('/404')
//         return
//       }
//       setCategoryData(response?.data?.data);

//       const response2 = await axios.get(
//         `${BaseUrl}/products/categoryProducts/${response?.data?.data._id}/products-by-category`
//       );
//       setCategoryProduct(response2?.data?.data?.categories || []);
//     } catch (err) {
//       console.error("Error fetching category:", err);
//       // navigate('/404')
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     FetchCategory();
//   }, [slug]); // Remove categoryData from dependencies to avoid infinite loop

//   useEffect(() => {
//     return () => {
//       setCategoryData(null);
//       setCategoryProduct([]);
//     };
//   }, [slug]);

//   // Prefetch products when they load
//   useEffect(() => {
//     if (categoryProduct && categoryProduct.length > 0) {
//       const allProducts = categoryProduct.flatMap((category) => category?.products || []);
//       if (allProducts.length > 0) {
//         prefetchProductsBatch(allProducts, {
//           batchSize: 5,
//           delayBetweenBatches: 50,
//           priority: true
//         });
//       }
//     }
//   }, [categoryProduct]);

//   const breadcrumbSchema = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     "itemListElement": [
//       {
//         "@type": "ListItem",
//         "position": 1,
//         "name": "Home",
//         "item": BaseUrl
//       },
//       {
//         "@type": "ListItem",
//         "position": 2,
//         "name": categoryData?.name || serverData?.name,
//         "item": `${BaseUrl}/category/${slug}`
//       }
//     ]
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <>
//       <ProductSelectionProvider>
//         {(categoryData || serverData) ? (
//           <PageMetadata
//             title={categoryData?.metaTitle || serverData?.metaTitle}
//             description={categoryData?.metaDescription || serverData?.metaDescription}
//             keywords={categoryData?.keywords || serverData?.keywords}
//             ogUrl={`${BaseUrl}/category/${slug}`}
//             ogImage={`${BaseUrl}/${serverData?.bannerImage}`}
//             ogImageWidth="1200"
//             ogImageHeight="630"
//             canonicalUrl={`${BaseUrl}/category/${slug}`}
//             breadcrumbSchema={breadcrumbSchema}
//             robots={categoryData?.robots || serverData?.robots}
//           />
//         ) : null}

//         <Container>
//           <div style={{ backgroundColor: categoryData?.bgColor }} className="flex sm:max-w-6xl max-w-[95%] gap-4 mx-auto sm:flex-row items-center flex-col my-3.5 sm:p-8 p-4 rounded-md w-full">
//             <div className="sm:w-7/12 w-full">
//               <strong className="sm:text-[38px] text-[20px] m-0 text-[#333333] font-medium font-sans">Umbrella Custom Packaging</strong>
//               <h1
//                 style={{ color: "#4440E6" }}
//                 className="font-sans sm:text-4xl text-xl opacity-90 font-medium capitalize text-[#4440E6]"
//               >
//                 {categoryData?.name}
//               </h1>
//               <div className="flex mt-4 gap-2 flex-wrap items-center">
//                 <Link to={'/category/box-by-industry'} className="">
//                   <Button
//                     label={"Industry"}
//                     className="bg-[#4440E6] opacity-90 border border-[#4440E6] sm:w-32 w-28 text-white hover:bg-[#4440E6] hover:text-white"
//                   />
//                 </Link>
//                 <Link to={'/category/shapes-styles'}>
//                   <Button
//                     label={"Style"}
//                     className="bg-white border border-[#4440E6] sm:w-32 w-28 text-[#4440E6] hover:bg-[#4440E6] hover:text-white"
//                   />
//                 </Link>
//                 <Link to={'/category/boxes-by-material'}>
//                   <Button
//                     label={"Material"}
//                     className="bg-white border border-[#4440E6] sm:w-32 w-28 text-[#4440E6] hover:bg-[#4440E6] hover:text-white"
//                   />
//                 </Link>
//               </div>
//               <div className="sm:mt-7 mt-4">
//                 <Link to={'/shop'}>
//                   <Button
//                     label={"Our Catalogue"}
//                     className="bg-white border border-[#4440E6] text-[#4440E6] hover:bg-[#4440E6] hover:text-white sm:w-80 w-60"
//                   />
//                 </Link>
//               </div>
//             </div>
//             <div className="sm:w-5/12 w-full">
//               {categoryData?.bannerImage ? 
//                 <img
//                   src={`${BaseUrl}/${categoryData?.bannerImage}`}
//                   className="w-full"
//                   alt={categoryData?.bannerAltText}
//                 /> : null
//               }
//             </div>
//           </div>

//           <div className="bg-[#F7F7F7] rounded-xl sm:max-w-6xl max-w-[95%] mx-auto py-8 px-5 my-8">
//             <h2 className="sm:text-[35px] text-[25px] text-center font-sans font-[600] text-[#333333]">
//               Discover Our Custom Packaging Variety
//             </h2>
//             <p className="text-center pt-5">
//               Check out all the different types of boxes we have at Umbrella
//               Custom Packaging! We have special categories for boxes that you can
//               customize just the way you like. You get to choose whether it's the
//               size, the material, or how it looks. So, have a look and pick the
//               perfect box for you!
//             </p>
//           </div>
//         </Container>

//         {/* MAIN CONTENT - EITHER SKELETON OR ACTUAL DATA */}
//         {loading ? (
//           // Loading Skeletons
//           <>
//             {[1, 2, 3].map((skeletonIndex) => (
//               <div key={skeletonIndex} className="bg-[#EFF4FE] py-4">
//                 <Container fullWidth={false} className="sm:max-w-6xl max-w-[95%] mx-auto">
//                   <div className="flex sm:flex-row flex-col gap-3 py-9 justify-between items-center">
//                     <div className="animate-pulse">
//                       <div className="bg-gray-300 rounded h-8 w-64 mb-2"></div>
//                     </div>
//                     <div className="animate-pulse">
//                       <div className="bg-gray-300 rounded h-10 w-48"></div>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
//                     {[1, 2, 3, 4].map((productIndex) => (
//                       <div key={productIndex} className="bg-[#f7f7f7] p-2 rounded-xl">
//                         <div className="animate-pulse">
//                           <div className="bg-gray-200 rounded-lg w-full h-48 mb-2"></div>
//                           <div className="bg-gray-200 rounded h-4 w-3/4 mx-auto mb-2"></div>
//                           <div className="bg-gray-200 rounded h-3 w-1/2 mx-auto"></div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </Container>
//               </div>
//             ))}
//           </>
//         ) : (
//           // Actual Category Products
//           categoryProduct?.map((item, index) => {
//             return (
//               <div key={item?._id || index} className="bg-[#EFF4FE] py-4">
//                 <Container fullWidth={false} className="sm:max-w-6xl max-w-[95%] mx-auto">
//                   <div className="flex sm:flex-row flex-col gap-3 py-9 justify-between items-center">
//                     <div>
//                       <h2 className="sm:text-[35px] text-[25px] font-sans font-[600] text-[#333333]">{item?.categoryName}</h2>
//                     </div>
//                     <div>
//                       <Link 
//                         to={`/sub-category/${item?.categorySlug}`} 
//                         className=""
//                         onMouseEnter={() => {
//                           if (item?.categorySlug) {
//                             prefetchSubCategory(item.categorySlug);
//                           }
//                         }}
//                         onMouseDown={() => {
//                           if (item?.categorySlug) {
//                             prefetchSubCategory(item.categorySlug, true);
//                           }
//                         }}
//                       >
//                         <Button
//                           label={`View All ${item?.categoryName}`}
//                           className="bg-white border border-[#4440E6] text-[#4440E6] hover:bg-[#4440E6] hover:text-white sm:w-80 w-72"
//                         />
//                       </Link>
//                     </div>
//                   </div>
//                   <CardSlider item={item?.products} index={index} />
//                 </Container>
//               </div>
//             )
//           })
//         )}

//         {/* Why Choose Us Section - Only show when not loading */}
//         {!loading && categoryData && (
//           <div className='sm:max-w-6xl max-w-[95%] mx-auto'>
//             <div className="flex flex-col px-4 py-6 rounded-lg lg:flex-row gap-8 items-center">
//               <div className="w-full lg:w-1/2">
//                 <img
//                   src={`${BaseUrl}/${categoryData?.image}`}
//                   alt={categoryData?.imageAltText}
//                   className="w-full h-auto rounded-xl shadow-md object-cover"
//                   loading="lazy"
//                 />
//               </div>
//               <div className='w-full lg:w-1/2'>
//                 <div className="pt-3">
//                   <h2 className="sm:text-[38px] text-[25px] font-sans font-[600] text-[#333333]">
//                     Why Choose US?
//                   </h2>
//                   <div className='overflow-y-auto h-56'>
//                     <p dangerouslySetInnerHTML={{
//                       __html: (categoryData?.content)
//                     }} className="text-sm leading-6 mb-6" />
//                   </div>
//                 </div>
//                 <div className="flex flex-wrap mt-7 gap-2.5 items-center">
//                   <Button
//                     onClick={() => setIsModalOpen(true)}
//                     label={"Get Instant Quote"}
//                     className="bg-[#4440E6] text-white"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {!loading && (
//           <>
//             <div className="mb-8">
//               <CustomPackagingProduced />
//             </div>
//             <InstantQuoteModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
//           </>
//         )}
//       </ProductSelectionProvider>
//     </>
//   );
// };

// export default Category;
import React from 'react'
import { FaBed } from 'react-icons/fa'
import { MdOutdoorGrill } from 'react-icons/md'
import { TbToolsKitchen3 } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import SampleKit from '../../components/SampleKit'
import InspirationPackaging from '../../components/InspirationPackaging'
import { IoHomeOutline } from 'react-icons/io5'
import { LiaAngleRightSolid } from 'react-icons/lia'

const Category = () => {

     const categories = [
        {
            title: "Cosmetics",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/cosmetics.png",
          },
          {
            title: "Candle",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/candle.png",
          },
          {
            title: "Bakery",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/bakery.png",
          },
          {
            title: "CBD",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/cbd.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
      ];
  return (
    <>
 
    <section className=' max-w-7xl mx-auto'>
      <div className=' flex gap-2 pt-3 items-center'>
             <IoHomeOutline /> <LiaAngleRightSolid />
                  <h6 className=''> 
                    Box By industry
                  </h6>
              </div>
        <div className='  text-center max-w-5xl mx-auto py-7'>
            <h2>Custom packaging solutions for every industry.
            </h2>
            <p className=' pt-2'>Half Price Packaging possesses extensive expertise in delivering personalized packaging solutions to over 3000 businesses across the globe. Below, you will find a carefully curated selection of packaging solutions designed to cater to various industries.

</p>
        </div>
        <div className=' grid grid-cols-5 gap-6 '>
        {categories.map((submenu, index) => (
                  <Link
                    key={index}
                    to={`/category/${submenu.title}`}
                    className="text-gray-700 bg-[#F9F9F9]  rounded-3xl flex font-bold flex-col gap-0.5 items-center transition-colors"
                  >
                    <div className="  w-56 h-56">
                      <img
                        src={submenu?.icon}
                        alt=""
                        className="w-full h-full object-contain rounded-3xl"
                      />
                    </div>
                    <p className=" pb-3 font-bold">{submenu.title}</p>
                  </Link>
                ))}
        </div>
    </section>
    <div className=' pt-10'>
    <InspirationPackaging/>
    </div>
   
    </>
  )
}

export default Category