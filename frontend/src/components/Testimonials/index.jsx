
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Testimonials = () => {
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsAutoPlay(scrollPosition <= 100);
  };

  // Function to format date to "X months ago" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return "Today";
    if (diffDays < 30) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    if (diffMonths < 12) return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
  };

  // Function to get user initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://xcustompackaging.com/rating/getAllGoogleReviews");
        const result = await response.json();
        
        if (result.status === "success" && result.data) {
          // Map API data to component structure
          const mappedTestimonials = result.data.reviews.map((item) => ({
            id: item._id,
            name: item.name,
            location: formatDate(item.date),
            rating: item.rating,
            review: item.review,
            email: item.email,
            date: item.date,
          }));
          setTestimonials(mappedTestimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-500 opacity-50" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }
    return stars;
  };

  // Skeleton loader component
  const SkeletonLoader = () => {
    return (
      <div className="pt-12">
        <div className="sm:max-w-8xl max-w-[95%] mx-auto text-center">
          <div className="w-full mx-auto">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={false}
              loop={false}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              spaceBetween={30}
              slidesPerView="auto"
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {[1, 2, 3].map((item) => (
                <SwiperSlide key={item}>
                  <div className="p-6 bg-[#F6F6F6] h-64 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex">
                        {/* Avatar skeleton */}
                        <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse flex-shrink-0"></div>
                        <div className="ml-4 flex-1">
                          {/* Name skeleton */}
                          <div className="h-5 bg-gray-300 rounded w-32 mb-2 animate-pulse"></div>
                          {/* Date skeleton */}
                          <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
                          {/* Stars skeleton */}
                          <div className="flex items-center gap-1 py-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <div
                                key={star}
                                className="w-4 h-4 bg-gray-300 rounded animate-pulse"
                              ></div>
                            ))}
                          </div>
                          {/* Review skeleton */}
                          <div className="mt-2 space-y-2">
                            <div className="h-3 bg-gray-300 rounded w-full animate-pulse"></div>
                            <div className="h-3 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                            <div className="h-3 bg-gray-300 rounded w-4/6 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex justify-center gap-3 items-center mt-8">
              <button className="custom-prev w-12 h-12 bg-[#F6F6F6] hover:bg-[#EE334B] hover:text-white rounded-full flex items-center justify-center">
                <IoIosArrowBack size={25} />
              </button>
              <button className="custom-next w-12 h-12 bg-[#F6F6F6] hover:bg-[#EE334B] rounded-full hover:text-white flex items-center justify-center">
                <IoIosArrowForward size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  if (testimonials.length === 0) {
    return (
      <div className="py-12">
        <div className="sm:max-w-8xl max-w-[95%] mx-auto text-center">
          <p className="text-gray-500">No testimonials available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className=" sm:max-w-8xl max-w-[95%] mx-auto  text-center">
     
        <div className="w-full  mx-auto">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={
              isAutoPlay ? { delay: 3000, disableOnInteraction: false } : false
            }
            loop={testimonials.length > 1}
            // pagination={{ clickable: true }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            spaceBetween={30}
           slidesPerView="auto"
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="p-6 bg-[#F6F6F6]  h-64 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                 
                    <div className="flex">
                      <div className="w-12 h-12 rounded-full bg-[#EE334B] text-white flex items-center justify-center font-semibold text-sm border-gray-300 flex-shrink-0">
                        {getInitials(testimonial.name)}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg text-left font-medium">
                          {testimonial.name}
                        </h4>
                        <p className=" text-left text-gray-500">
                          {testimonial.location}
                        </p>
                        <div className="flex items-center gap-1 py-2">
                          {renderStars(testimonial.rating)}
                        </div>
                        <p className=" text-left">{testimonial.review}</p>
                      </div>
                    </div>
                  </div>

               
               
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          
          <div className="flex  justify-center gap-3 items-center mt-8">
            <button className="custom-prev w-12 h-12 bg-[#F6F6F6]  hover:bg-[#EE334B] hover:text-white  rounded-full flex items-center justify-center">
              <IoIosArrowBack  size={25}  />
            </button>
            <button className="custom-next w-12 h-12 bg-[#F6F6F6] hover:bg-[#EE334B] rounded-full hover:text-white flex items-center justify-center">
              <IoIosArrowForward size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
