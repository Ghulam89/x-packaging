import React, { useEffect } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { BaseUrl } from '../../utils/BaseUrl'

const ImageViewer = ({ 
    isOpen, 
    selectedImage, 
    currentIndex, 
    images, 
    onClose, 
    onPrevious, 
    onNext,
    onSelectImage 
}) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft' && images?.length > 1) {
                onPrevious();
            } else if (e.key === 'ArrowRight' && images?.length > 1) {
                onNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, images, onClose, onPrevious, onNext]);

    if (!isOpen || !selectedImage) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            >
                <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Previous Button */}
            {images?.length > 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrevious();
                    }}
                    className="absolute left-6 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:scale-110 cursor-pointer hover:shadow-xl flex justify-center items-center transition-all duration-300 group"
                >
                    <FaAngleLeft className="text-xl group-hover:scale-110 transition-transform duration-300" />
                </button>
            )}

            {/* Image Container */}
            <div 
                className="max-w-6xl max-h-[90vh] overflow-auto rounded-2xl bg-white/5 backdrop-blur-sm p-4 custom-scrollbar"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={`${BaseUrl}/${selectedImage.url}`}
                    alt={selectedImage.altText || 'Product Image'}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-zoomIn"
                />
            </div>

            {/* Next Button */}
            {images?.length > 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    className="absolute right-6 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:scale-110 cursor-pointer hover:shadow-xl flex justify-center items-center transition-all duration-300 group"
                >
                    <FaAngleRight className="text-xl group-hover:scale-110 transition-transform duration-300" />
                </button>
            )}

            {/* Image Counter */}
            {images?.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg">
                    <span className="text-white/90">{currentIndex + 1}</span>
                    <span className="mx-2 text-white/50">/</span>
                    <span className="text-white/90">{images?.length || 0}</span>
                </div>
            )}

            {/* Thumbnail Strip */}
            {images?.length > 1 && images.length <= 10 && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 custom-scrollbar">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelectImage(img, idx);
                            }}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                currentIndex === idx
                                    ? 'border-[#EE334B] ring-2 ring-[#EE334B]/50 scale-110'
                                    : 'border-white/20 hover:border-white/40 hover:scale-105'
                            }`}
                        >
                            <img
                                src={`${BaseUrl}/${img.url}`}
                                alt={img.altText || `Thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageViewer;
