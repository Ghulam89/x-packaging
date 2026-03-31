"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { ASSETS } from "@/lib/assets";

const PackagingJourney = () => {
  const journeyItems = React.useMemo(() => {
    return ASSETS.videos.gallery.map((video, index) => ({
      _id: `static-video-${index}`,
      video,
      isStatic: true,
    }));
  }, []);

  return (
    <section className="pt-10 pb-16">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-[#EE334B] to-[#213554] mx-auto rounded-full"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#213554] mb-4">
            Your Packaging Journey Starts Here!
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-4xl mx-auto">
            Discover how quality packaging makes all the difference! Experience
            real client experiences, expert tips, and innovative packaging
            solutions that enhance brands. From custom designs to seamless
            functionality, see how we bring packaging visions to life.
          </p>
        </div>

        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={"auto"}
            navigation={{
              prevEl: ".journey-prev",
              nextEl: ".journey-next",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={journeyItems.length > 4}
            className="journey-swiper !pb-10"
          >
            {journeyItems.map((item: any, index) => (
              <SwiperSlide key={item._id || index} className="!w-[280px]">
                <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 group/card">
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="journey-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-[#213554] hover:bg-[#EE334B] hover:text-white transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-0 hidden lg:flex">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="journey-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-[#213554] hover:bg-[#EE334B] hover:text-white transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-0 hidden lg:flex">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(PackagingJourney);
