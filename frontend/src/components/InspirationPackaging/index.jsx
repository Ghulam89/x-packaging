import React, { useState, useEffect, useCallback } from "react";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import { gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9 } from "../../assets";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Navigation, Autoplay, Mousewheel, Keyboard, EffectCoverflow } from 'swiper/modules';

// Add animations to document head
if (typeof document !== 'undefined' && !document.getElementById('gallery-modal-animations')) {
    const style = document.createElement('style');
    style.id = 'gallery-modal-animations';
    style.textContent = `
        @keyframes zoomIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        .animate-zoomIn {
            animation: zoomIn 0.3s ease-out;
        }
        .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
}

const InspirationPackaging = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const imageDescriptions = [
        "Eco-friendly cosmetic packaging with botanical design",
        "Luxury wine bottle with embossed label",
        "Minimalist food packaging with clean typography",
        "Sustainable product box with recycled materials",
        "Colorful retail packaging with geometric patterns",
        "Elegent gift box with ribbon closure",
        "Modern tech product packaging with sleek design",
        "Vintage-inspired packaging with nostalgic elements",
        "Creative product container with unique shape"
    ];

    const images = [
        { src: gallery1, alt: imageDescriptions[0] },
        { src: gallery2, alt: imageDescriptions[1] },
        { src: gallery5, alt: imageDescriptions[2] },
        { src: gallery9, alt: imageDescriptions[3] },
        { src: gallery6, alt: imageDescriptions[4] },
        { src: gallery7, alt: imageDescriptions[5] },
        { src: gallery8, alt: imageDescriptions[6] },
        { src: gallery3, alt: imageDescriptions[7] },
        { src: gallery4, alt: imageDescriptions[8] }
    ];

    // Keyboard navigation for image viewer
    const handleKeyDown = useCallback((e) => {
        if (!isViewerOpen) return;
        
        switch(e.key) {
            case 'Escape':
                closeImageViewer();
                break;
            case 'ArrowLeft':
                goToPrevious();
                break;
            case 'ArrowRight':
                goToNext();
                break;
            default:
                break;
        }
    }, [isViewerOpen]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const openImageViewer = useCallback((index) => {
        setSelectedImage(images[index].src);
        setCurrentIndex(index);
        setIsViewerOpen(true);
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }, [images]);

    const closeImageViewer = useCallback(() => {
        setIsViewerOpen(false);
        setSelectedImage(null);
        // Re-enable body scrolling
        document.body.style.overflow = 'unset';
    }, []);

    const goToPrevious = useCallback(() => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[newIndex].src);
        setCurrentIndex(newIndex);
    }, [currentIndex, images]);

    const goToNext = useCallback(() => {
        const newIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[newIndex].src);
        setCurrentIndex(newIndex);
    }, [currentIndex, images]);

    // Preload images for better user experience
    useEffect(() => {
        images.forEach(image => {
            const img = new Image();
            img.src = image.src;
        });
    }, []);

    return (
        <div className="  mx-auto  ">
            <div className="py-8 text-center">
                <h2 className="sm:text-[35px] text-[25px] font-bold text-[#213554] mb-3">
                    Easy to Design & Professional Results
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-4  max-w-6xl mx-auto">
                   Start creating your custom boxes effortlessly with our extensive library, featuring fully customizable layouts for promotional, mailer, and dispaly boxes, plus industry-specific styles for cosmetics, hotels, apparel, and more. Need expert guidance? Our professional designers are to ready to assist-so you can design with Confidence and package your produts in a box that stands out.
                </p>
               
            </div>
            
            {/* Gallery Swiper Coverflow */}
            <div className='w-full mx-auto py-8'>
              <style>{`
                .gallery-center-swiper .swiper-slide {
                  transition: all 0.4s ease;
                  opacity: 0.5;
                  transform: scale(0.8);
                }
                .gallery-center-swiper .swiper-slide-active {
                  opacity: 1;
                  transform: scale(1.1);
                  z-index: 10;
                }
                .gallery-center-swiper .swiper-slide-prev,
                .gallery-center-swiper .swiper-slide-next {
                  opacity: 0.7;
                  transform: scale(0.9);
                }
                .gallery-center-swiper .swiper-button-next,
                .gallery-center-swiper .swiper-button-prev {
                  display: none !important;
                }
                .gallery-center-swiper .swiper-slide img {
                  transition: all 0.4s ease;
                }
                .gallery-center-swiper .swiper-slide-active img {
                  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                }
                @media (max-width: 640px) {
                  .gallery-center-swiper .swiper-slide {
                    transform: scale(0.9);
                  }
                  .gallery-center-swiper .swiper-slide-active {
                    transform: scale(1.05);
                  }
                }
              `}</style>
              <Swiper
                modules={[Navigation, Autoplay, Mousewheel, Keyboard, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2,
                  slideShadows: true,
                }}
                navigation={false}
                mousewheel={true}
                keyboard={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={images.length > 5}
                spaceBetween={30}
                className="gallery-center-swiper"
              >
                {images.map((img, index) => (
                  <SwiperSlide 
                    key={index}
                    style={{ width: 'auto', maxWidth: '500px' }}
                  >
                    <div 
                      className="block group relative mx-auto overflow-hidden rounded-[15px] cursor-pointer"
                      onClick={() => openImageViewer(index)}
                    >
                      <div className="relative overflow-hidden rounded-[15px] shadow-lg transition-all duration-300">
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="swiper-lazy rounded-[15px] w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-110"
                          loading={index < 3 ? "eager" : "lazy"}
                        />
                        {/* Hover Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[15px]"></div>
                        {/* Shine Effect - Sweeps across on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-[15px]"></div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Image Viewer Modal */}
            {isViewerOpen && selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={closeImageViewer}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeImageViewer}
                        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                    >
                        <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Previous Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrevious();
                        }}
                        className="absolute left-6 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:scale-110 cursor-pointer hover:shadow-xl flex justify-center items-center transition-all duration-300 group"
                    >
                        <FaAngleLeft className="text-xl group-hover:scale-110 transition-transform duration-300" />
                    </button>

                    {/* Image Container */}
                    <div 
                        className="max-w-6xl max-h-[90vh] overflow-auto rounded-2xl bg-white/5 backdrop-blur-sm p-4 custom-scrollbar"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt={imageDescriptions[currentIndex]}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-zoomIn"
                        />
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                        className="absolute right-6 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:scale-110 cursor-pointer hover:shadow-xl flex justify-center items-center transition-all duration-300 group"
                    >
                        <FaAngleRight className="text-xl group-hover:scale-110 transition-transform duration-300" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg">
                        <span className="text-white/90">{currentIndex + 1}</span>
                        <span className="mx-2 text-white/50">/</span>
                        <span className="text-white/90">{images.length}</span>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 custom-scrollbar">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(img.src);
                                    setCurrentIndex(idx);
                                }}
                                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                    currentIndex === idx
                                        ? 'border-[#EE334B] ring-2 ring-[#EE334B]/50 scale-110'
                                        : 'border-white/20 hover:border-white/40 hover:scale-105'
                                }`}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt || `Thumbnail ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(InspirationPackaging);