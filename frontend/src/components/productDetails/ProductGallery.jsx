import React from 'react'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'
import { IoSearch } from 'react-icons/io5'
import { shimmerStyle } from './styles'

const ProductGallery = ({
    images,
    curr,
    prev,
    next,
    goToSlide,
    openImageViewer,
    product,
    loadedImages,
    setLoadedImages,
    thumbnailLoadedImages,
    setThumbnailLoadedImages
}) => {
    return (
        <div className='w-full flex gap-7'>
            <div className="sm:block md:block hidden">
                <div className="flex flex-col items-center justify-center gap-3">
                    {images?.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => goToSlide(i)}
                            className={`
                                transition-all w-28 rounded-xl h-28 border-2 overflow-hidden bg-white relative cursor-pointer group
                                ${curr === i ? " w-20 h-20  border-[#F05367]  ring-2 ring-[#F05367]/30" : "bg-opacity-50 border-transparent hover:bg-opacity-100 hover:scale-105"}
                            `}
                        >
                            {!thumbnailLoadedImages.has(i) && (
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl overflow-hidden">
                                    <div className="absolute inset-0" style={shimmerStyle}></div>
                                </div>
                            )}
                            <img
                                src={_}
                                alt=""
                                className={`w-full h-full object-center transition-opacity duration-300 ${
                                    thumbnailLoadedImages.has(i) ? 'opacity-100' : 'opacity-0'
                                }`}
                                onLoad={() => setThumbnailLoadedImages(prev => new Set([...prev, i]))}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="overflow-hidden relative rounded-2xl group">
                <div
                    className="flex relative transition-transform ease-in-out duration-500 h-[67vh]"
                    style={{ transform: `translateX(-${curr * 100}%)` }}
                >
                    {images?.map((image, i) => {
                        const isFirstImage = i === 0;
                        const isCurrentSlide = i === curr;
                        const shouldShowSkeleton = !loadedImages.has(i) && !isFirstImage;
                        
                        return (
                            <div key={i} className="flex-none w-full h-full rounded-2xl overflow-hidden relative">
                                {shouldShowSkeleton && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 rounded-2xl overflow-hidden z-10">
                                        <div className="absolute inset-0" style={shimmerStyle}></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#213554] rounded-full animate-spin"></div>
                                        </div>
                                    </div>
                                )}
                                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                                    <img
                                        onClick={() => openImageViewer(product?.images?.[i] || { url: image }, i)}
                                        src={image}
                                        alt={product?.images?.[i]?.altText || ""}
                                        loading={isFirstImage ? "eager" : "lazy"}
                                        className={`w-full h-full cursor-pointer object-cover rounded-2xl transition-all duration-500 group-hover:scale-110 ${
                                            loadedImages.has(i) || isFirstImage ? 'opacity-100' : 'opacity-0'
                                        }`}
                                        onLoad={() => {
                                            setLoadedImages(prev => new Set([...prev, i]));
                                        }}
                                        onError={() => {
                                            setLoadedImages(prev => new Set([...prev, i]));
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {product?.images?.[curr] && (
                    <div onClick={() => openImageViewer(product.images[curr], curr)} className='flex justify-center items-center cursor-pointer w-10 h-10 bg-white rounded-full absolute top-3 right-3'>
                        <IoSearch size={25} />
                    </div>
                )}
                <button
                    onClick={prev}
                    className="w-12 h-12 shadow rounded-full cursor-pointer absolute left-5 top-56 flex justify-center items-center bg-white/80 text-gray-800 hover:bg-white"
                >
                    <TfiAngleLeft size={20} className="" />
                </button>
                <button
                    onClick={next}
                    className="w-12 h-12 rounded-full absolute cursor-pointer right-5 top-56 flex justify-center items-center shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <TfiAngleRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default ProductGallery;
