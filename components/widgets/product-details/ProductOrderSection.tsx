"use client";
import React, { useState } from "react";
import Image from "next/image";
import { RiShoppingCartLine } from "react-icons/ri";
import Button from "@/components/shared/ui/Button";
import type { Product } from "@/types";

type Props = {
  product: Product;
  mainImage: string;
};

const ProductOrderSection = ({ product, mainImage }: Props) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="mx-auto my-12 max-w-[95%] rounded-3xl border border-gray-100 bg-gray-50 p-5 sm:my-16 sm:p-8 md:p-12 sm:max-w-8xl">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Product Preview */}
        <div className="w-full lg:w-1/3">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100 p-4">
            <Image
              src={mainImage}
              alt={product.name || "Product"}
              fill
              className="object-contain p-4"
            />
          </div>
        </div>

        {/* Content & Actions */}
        <div className="w-full lg:w-2/3 space-y-8">
          <div className="text-center lg:text-left space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#213554]">Ready to Order?</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
              This is our standard specification for {product.name}. If you need custom sizes, 
              materials, or special finishing, please request a custom quote above.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-bold text-[#213554]">Quantity:</span>
              <div className="flex items-center border-2 border-[#213554] rounded-xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-5 py-3 hover:bg-[#213554] hover:text-white transition-colors font-bold text-xl"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center font-bold text-xl text-[#EE334B] border-0 focus:ring-0"
                />
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-5 py-3 hover:bg-[#213554] hover:text-white transition-colors font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="flex-1 w-full sm:w-auto bg-[#EE334B] hover:bg-[#EE334B]/90 text-white font-bold py-4 px-10 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3">
              <RiShoppingCartLine size={24} />
              <span className="text-lg">Add to Cart</span>
            </button>
          </div>

          {/* Buy Now & Product Summary */}
          <div className="space-y-4">
            <button className="w-full bg-[#213554] hover:bg-[#213554]/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all">
              Buy Now
            </button>
            
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Product</p>
                <p className="font-bold text-[#213554] text-sm truncate">{product.name}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Lead Time</p>
                <p className="font-bold text-[#213554] text-sm">8-10 Days</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Shipping</p>
                <p className="text-sm font-bold text-[#EE334B]">FREE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductOrderSection;
