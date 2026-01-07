import React, { useState, useEffect, useCallback } from "react";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import { gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9 } from "../../assets";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
    const [hoveredImageIndex, setHoveredImageIndex] = useState(0); // Track hovered image
    const [isFirstLoad, setIsFirstLoad] = useState(true); // Track first load
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

    // Show hover effect on first image on initial load
    useEffect(() => {
        if (isFirstLoad) {
            const timer = setTimeout(() => {
                setIsFirstLoad(false);
            }, 2000); // Show hover effect for 2 seconds on first load
            return () => clearTimeout(timer);
        }
    }, [isFirstLoad]);

    return (
        <div className="sm:max-w-8xl bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 my-8 py-8 rounded-2xl max-w-[95%] mx-auto  border border-gray-100">
            <div className="pb-8 text-center">
                <h2 className="sm:text-[35px] text-[25px] font-bold text-[#213554] mb-3">
                    Easy to Design & Professional Results
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-4  max-w-6xl mx-auto">
                   Start creating your custom boxes effortlessly with our extensive library, featuring fully customizable layouts for promotional, mailer, and dispaly boxes, plus industry-specific styles for cosmetics, hotels, apparel, and more. Need expert guidance? Our professional designers are to ready to assist-so you can design with Confidence and package your produts in a box that stands out.
                </p>
               
            </div>
            
            {/* Gallery Grid */}
            <div className="columns-2 sm:columns-3 md:columns-4 gap-2">
                {images.map((img, index) => {
                    const isHovered = hoveredImageIndex === index || (isFirstLoad && index === 0);
                    return (
                        <div 
                            key={index} 
                            className="mt-2 cursor-pointer break-inside-avoid group"
                            onClick={() => openImageViewer(index)}
                            onMouseEnter={() => setHoveredImageIndex(index)}
                            onMouseLeave={() => setHoveredImageIndex(-1)}
                        >
                            <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className={`w-full rounded-xl transition-transform duration-500 ${
                                        isHovered ? 'scale-110' : 'scale-100'
                                    }`}
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                                {/* Hover Overlay Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent transition-opacity duration-300 ${
                                    isHovered ? 'opacity-100' : 'opacity-0'
                                }`}></div>
                                {/* Shine Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out ${
                                    isHovered ? 'translate-x-full' : '-translate-x-full'
                                }`}></div>
                            </div>
                        </div>
                    );
                })}
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