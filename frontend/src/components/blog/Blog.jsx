import React, { useEffect, useState, useCallback, useMemo, lazy, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BaseUrl } from "../../utils/BaseUrl";
import axios from "axios";
import { useIntersectionObserver } from "../../utils/useIntersectionObserver";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import CardSlider from "../common/CardSlider";

// Lazy load the BlogCard component
const BlogCard = lazy(() => import("../common/BlogCard"));

// Skeleton loader for blog cards
const BlogCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const Blog = () => {

  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoadingBlogs(true);
      try {
        const response = await axios.get(`${BaseUrl}/blog/getAll?page=1&perPage=6`);
        if (response?.data?.status === 'success' && response?.data?.data) {
          setBlogs(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);


  return (
     <section className='mt-12'>
     <div className='sm:max-w-8xl w-[95%] mx-auto'>
       <div className='mb-5 flex sm:flex-row flex-col items-center gap-2.5'>
         <h2 className='text-left'>Blogs & News</h2>
         <p className='border-l border-gray-300 pl-3'>
           Stay updated with the latest packaging trends and insights.
         </p>
         <Link to="/blogs" className="uppercase">
           <p className='font-bold text-[#e71d38] flex items-center'>
             View all <FaAngleRight className="ml-1" size={15} />
           </p>
         </Link>
       </div>
       {loadingBlogs ? (
         <div className="text-center py-8">Loading blogs...</div>
       ) : blogs.length > 0 ? (
         <div className="py-2">
           <CardSlider
             top={40}
             items={blogs?.map((item, index) => {
               return (
                 <div key={item._id || index} className="w-[390px] flex-shrink-0 px-2">
                   <BlogCard data={item} />
                 </div>
               );
             })}
           />
         </div>
       ) : null}
     </div>
   </section>
  );
};

export default React.memo(Blog);