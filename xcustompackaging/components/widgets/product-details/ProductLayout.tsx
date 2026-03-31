"use client";
import React, { useState, useCallback } from "react";
import ProductGallery from "./ProductGallery";
import QuoteForm from "./QuoteForm";
import ImageViewer from "./ImageViewer";
import type { Product } from "@/types";
import { IoCheckmarkCircleOutline, IoHomeOutline } from "react-icons/io5";
import { RiTruckLine, RiFlashlightLine, RiCustomerService2Line } from "react-icons/ri";
import { LiaAngleRightSolid } from "react-icons/lia";
import Link from "next/link";

type Props = {
  product: Product;
  images: string[];
};

const ProductLayout = ({ product, images }: Props) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const openViewer = useCallback((index: number) => {
    setViewerIndex(index);
    setIsViewerOpen(true);
  }, []);

  const closeViewer = useCallback(() => setIsViewerOpen(false), []);
  const nextImage = useCallback(() => setViewerIndex((prev) => (prev + 1) % images.length), [images.length]);
  const prevImage = useCallback(() => setViewerIndex((prev) => (prev - 1 + images.length) % images.length), [images.length]);

  return (
    <>
      <section className="sm:max-w-8xl max-w-[95%] mx-auto my-5">



        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Side - Gallery */}
          <div className="w-full lg:w-12/6">
            <div className="sm:max-w-8xl pb-4 max-w-[95%] mx-auto flex items-center gap-3 text-sm font-medium">
              <Link href="/" className="text-gray-400 hover:text-[#213554] transition-colors flex items-center gap-1">
                <IoHomeOutline size={16} /> Home
              </Link>
              <LiaAngleRightSolid className="text-gray-300" />
              {product.brandId?.name && (
                <>
                  <Link
                  style={{fontSize:'13px'}}
                    href={`/${product.brandId.slug}`}
                    className="text-gray-400  hover:text-[#213554] transition-colors capitalize"
                  >
                    {product.brandId.name}
                  </Link>
                  <LiaAngleRightSolid className="text-gray-300" />
                </>
              )}

              {product.categoryId?.title && (
                <>
                  <Link
                   style={{fontSize:'13px'}}
                    href={`/category/${product.categoryId.slug}`}
                    className="text-gray-400 hover:text-[#213554] transition-colors capitalize"
                  >
                    {product.categoryId.title}
                  </Link>
                  <LiaAngleRightSolid className="text-gray-300" />
                </>
              )}
              <span className="text-[#213554] truncate">{product.name}</span>
            </div>
            <ProductGallery
              images={images}
              productName={product.name || "Product"}
              onImageClick={openViewer}
            />

          </div>

          {/* Right Side - Quote Form & Info */}
          <div className="w-full lg:w-12/5 space-y-8">

            <div className='flex flex-row items-center justify-between gap-4 mb-4'>
              <div className='flex gap-2 items-center flex-1 min-w-0'>
                <div className="w-1 h-11 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full flex-shrink-0"></div>
                <h2 className='pb-2 text-xl sm:text-3xl font-bold text-[#213554] truncate'>{product?.name || "Tuck Top Mailer Boxes"}</h2>
              </div>
              <Link
                href="/contact-us"
                className="flex-shrink-0 flex items-center gap-2 px-4 from-[#F7F7F7] to-[#F7F7F7] py-2 bg-[#F7F7F7] hover:bg-red-100 border border-gray-200/60 rounded-lg transition-colors duration-200 group"
              >
                {/* <img src={chat} alt="chat" className=' w-8 h-8' /> */}
                <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">  <h6 className='text-[10px]'> Chat with </h6>  Packaging Expert</span>
              </Link>
            </div>
            <div className="bg-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#EE334B]/5 to-transparent rounded-bl-full -z-10" />

              <QuoteForm product={product} />
            </div>
          </div>
        </div>
      </section>
      

      <ImageViewer
        isOpen={isViewerOpen}
        onClose={closeViewer}
        images={images}
        currentIndex={viewerIndex}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
};

export default ProductLayout;
