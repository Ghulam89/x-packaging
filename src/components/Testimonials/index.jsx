
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Testimonials = () => {
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsAutoPlay(scrollPosition <= 100);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Viech Robert",
      location: "5 months ago",
      rating: 4.5,
      review:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best.",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&s_50x50/images/google-reviews-users/lisa-nelson.png",
    },
    {
      id: 2,
      name: "Yessica Christy",
      location: "5 months ago",
      rating: 4.5,
      review:
        "I like it because I like to travel far and still can connect with high speed.",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&s_50x50/images/google-reviews-users/samuel-palmer.png",
    },
    {
      id: 3,
      name: "Kim Young Jou",
      location: "5 months ago",
      rating: 4.5,
      review:
        "This is very unusual for my business that currently requires a virtual private network that has high security.",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&s_50x50/images/google-reviews-users/tod-barnett.png",
    },
    {
      id: 5,
      name: "Maria Garcia",
      location: "5 months ago",
      rating: 4.7,
      review:
        "Easy to use and incredibly reliable. Highly recommended for everyone!",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&s_50x50/images/google-reviews-users/lindsey-stone.png",
    },
  ];

  return (
    <div className="py-12">
      <div className=" sm:max-w-7xl max-w-[95%] mx-auto  text-center">
     
        <div className="w-full  mx-auto">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={
              isAutoPlay ? { delay: 3000, disableOnInteraction: false } : false
            }
            loop={true}
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
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full border-gray-300"
                      />
                      <div className="ml-4">
                        <h4 className="text-lg text-left font-medium">
                          {testimonial.name}
                        </h4>
                        <p className=" text-left text-gray-500">
                          {testimonial.location}
                        </p>
                        <div className="flex items-center gap-1 py-2 text-yellow-500">
                     
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
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
