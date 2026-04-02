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
import { ASSETS } from "@/lib/assets";

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



        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Gallery */}
          <div className="w-full min-w-0 lg:w-3/7">
            <div className="mx-auto flex max-w-[95%] flex-wrap items-center gap-x-2 gap-y-1 pb-4 text-xs font-medium sm:max-w-8xl sm:gap-3 sm:text-sm">
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
              <span className="max-w-[min(100%,12rem)] truncate text-[#213554] sm:max-w-none">{product.name}</span>
            </div>
            <ProductGallery
              images={images}
              productName={product.name || "Product"}
              onImageClick={openViewer}
            />

          </div>

          {/* Right Side - Quote Form & Info */}
          <div className="w-full min-w-0 space-y-6 lg:w-2/4 ml-auto lg:space-y-8">

            <div className="mb-2 flex flex-col gap-3 sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="h-9 w-1 shrink-0 rounded-full bg-linear-to-b from-[#EE334B] to-[#213554] sm:h-11" />
                <h2 className="pb-0 text-lg font-bold leading-tight text-[#213554] sm:pb-2 sm:text-2xl md:text-3xl">
                  {product?.name}
                </h2>
              </div>
              <Link
                href="/contact-us"
                className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-200/60 bg-[#F7F7F7] px-3 py-2.5 transition-colors duration-200 hover:bg-red-100 sm:w-auto sm:justify-start sm:px-4"
              >
                <img src={ASSETS.icons.chat} alt="chat" className="w-7 h-7" />
                <span className="text-left text-sm font-semibold text-gray-800">
                  <span className="block text-[10px] font-normal leading-tight text-gray-600">Chat with</span>
                  Packaging Expert
                </span>
              </Link>
            </div>
            <div className="bg-white  relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#EE334B]/5 to-transparent rounded-bl-full -z-10" />

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
