// import React, { useEffect, useState } from 'react'
// import BlogCard from '../../components/common/BlogCard'
// import CustomPackagingProduced from '../../components/CustomPackagingProduced';
// import { BaseUrl } from '../../utils/BaseUrl';
// import axios from 'axios';
// import { Helmet } from 'react-helmet-async';
// import PageMetadata from '../../components/common/PageMetadata';

// const Blogs = () => {
//     const [blog, setBlog] = useState([])
//     const [page, setPage] = useState(1)
//     const [totalPages, setTotalPages] = useState(1)
//     const [loading, setLoading] = useState(false)

//     const fetchBlogs = async () => {
//         setLoading(true)
//         try {
//             const response = await axios.get(`${BaseUrl}/blog/getAll?page=${page}`)
//             if (page === 1) {
//                 setBlog(response?.data?.data)
//             } else {
//                 setBlog(prev => [...prev, ...response?.data?.data])
//             }
//             setTotalPages(response?.data?.pagination?.totalPages)
//         } catch (error) {
//             console.error("Error fetching blogs:", error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const loadMore = () => {
//         if (page < totalPages) {
//             setPage(prev => prev + 1)
//         }
//     }

//     useEffect(() => {
//         fetchBlogs()
//     }, [page])
//  const metadata = {
//                 title: "Blog - Umbrella Custom Packaging",
//                 description: "Our Blogs Simple Steps to get the Custom Packaging Produced Following are few steps which provide the complete Guide. Price Quote Payment Design Approval Production Shipping Reorders Get Price Quote Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes. [&hellip;]",
//                 keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
//                 author: "Umbrella Custom Packaging",
//                 ogUrl: `${BaseUrl}/blogs`,
//                 canonicalUrl: `${BaseUrl}/blogs`,
//                 ogTitle: "Blog - Umbrella Custom Packaging",
//                 ogDescription: "Our Blogs Simple Steps to get the Custom Packaging Produced Following are few steps which provide the complete Guide. Price Quote Payment Design Approval Production Shipping Reorders Get Price Quote Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes. [&hellip;]",
//                 modifiedTime: "2025-06-13T15:18:43+00:00",
//                 twitterTitle: "Blog - Umbrella Custom Packaging",
//                 twitterDescription: "Our Blogs Simple Steps to get the Custom Packaging Produced Following are few steps which provide the complete Guide. Price Quote Payment Design Approval Production Shipping Reorders Get Price Quote Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes. [&hellip;]",
//                 robots: "index, follow"
//               };
//     return (
//         <>
//  {/* <PageMetadata {...metadata} /> */}
            
             
//             <div className="sm:max-w-6xl max-w-[95%] mx-auto py-8">
//                 <div className='bg-[#2E2D2D] rounded-[8px] p-5 h-[230px] flex flex-col justify-center items-center space-y-5 mb-5'>
//                     <h1 style={{color:'white'}} className=' flex gap-2 items-center text-[40px]  font-semibold leading-10 text-center'>Our
//                         <h1 style={{color:'#ff931e'}} className='md:text-[43px] text-[40px] text-[#ff931e]'> Blogs</h1></h1>
//                 </div>

//                 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5 gap-5'>
//                     {blog?.map((item, index) => (
//                         <BlogCard key={index} data={item} />
//                     ))}
//                 </div>

//                 {page < totalPages && (
//                     <div className="flex justify-center mt-8">
//                         <button
//                             onClick={loadMore}
//                             disabled={loading}
//                             className=" bg-[#5652E8] hover:bg-[#e68317] text-white font-medium py-2 px-6 rounded-md transition duration-300"
//                         >
//                             {loading ? 'Loading...' : 'Load More'}
//                         </button>
//                     </div>
//                 )}
//             </div>

//             <div className='mb-4'>
//                 <CustomPackagingProduced />
//             </div>
//         </>
//     )
// }

// export default React.memo(Blogs);


import React from 'react'
import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CardSlider from '../../components/common/CardSlider';
import CategoryCard from '../../components/common/CategoryCard';

const Blogs = () => {
   const Data = [
    {
      id: 1,
      title: "Apparel and Fashion Boxes",
      image:
        "https://umbrellapackaging.com/images/Personalized-Two-piece-Apparel-Boxes.webp",
    },
    {
      id: 2,
      title: "Bakery boxes",
      image:
        "https://umbrellapackaging.com/images/Custom-Luxury-Candle-Packaging.webp",
    },
    {
      id: 3,
      title: "Candle Boxes",
      image:
        "https://umbrellapackaging.com/images/Personalized-Two-piece-Apparel-Boxes.webp",
    },
    {
      id: 4,
      title: "Cardboard Boxes",
      image:
        "https://umbrellapackaging.com/images/Custom-Luxury-Candle-Packaging.webp",
    },
    {
      id: 5,
      title: "CBD Boxes",
      image:
        "https://umbrellapackaging.com/images/Personalized-Two-piece-Apparel-Boxes.webp",
    },
    {
      id: 6,
      title: " Chocolate Boxes",
      image:
        "https://umbrellapackaging.com/wp-content/uploads/2024/04/cbd-boxes--250x179.webp",
    },
    {
      id: 6,
      title: " Chocolate Boxes",
      image:
        "https://umbrellapackaging.com/images/Personalized-Two-piece-Apparel-Boxes.webp",
    },
    {
      id: 6,
      title: " Chocolate Boxes",
      image:
        "https://umbrellapackaging.com/images/Personalized-Two-piece-Apparel-Boxes.webp",
    },
    {
      id: 6,
      title: " Chocolate Boxes",
      image:
        "https://umbrellapackaging.com/images/Personalized-Two-piece-Apparel-Boxes.webp",
    },
  ];
  return (
     <div className=' my-12'>
            <div className=' max-w-7xl mx-auto'>
            <div className=' mb-5 flex  sm:flex-row  flex-col items-center gap-2.5'>
            <h2  className=' text-left'>Inspiring Client Success Stories</h2>
           
            <p className=' border-l  border-gray-300 pl-3 '>
            Unwrap our Brand Stories and read insights from industry experts </p>
             <Link to=""  className=" uppercase">
              <p className=' font-bold  text-[#EE334B] flex items-center'>View all  <FaAngleRight className="ml-1" size={15} />  </p>
             </Link>
            </div>
    <CardSlider
                  top={20}
                  items={Data?.map((item, index) => {
                    
                    return (
                      <>
                        <div className="">
                          <CategoryCard data={item} />
                        </div>
                      </>
                    );
                  })}
                />
            </div>
            
        </div>
  )
}

export default Blogs