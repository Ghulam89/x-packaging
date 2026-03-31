"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/shared/ui/Button";

const specifications = [
  { label: "Box Style", value: "Rigid Boxes, Mailer Boxes, Custom Shapes" },
  { label: "Dimension (L + W + H)", value: "All Custom Sizes & Shapes" },
  { label: "Quantities", value: "No Minimum Order Required (MOQ: 1)" },
  { label: "Stock", value: "14pt, 16pt, 18pt, 24pt White SBS, Kraft, Corrugated, Rigid" },
  { label: "Printing", value: "Digital, Offset, CMYK, PMS Colors" },
  { label: "Finishing", value: "Gloss/Matte Lamination, Spot UV, Embossing, Foiling" },
  { label: "Included Options", value: "Die Cutting, Gluing, Scored, Perforation" },
  { label: "Proof", value: "Flat View, 3D Mock-up, Physical Sampling (On request)" },
  { label: "Turnaround Time", value: "8 – 10 Business Days (Standard), 4-6 Days (Rush)" },
];

const ProductSpecification = () => {
  return (
    <section className="sm:max-w-8xl max-w-[95%] mx-auto my-12">
      <div className="flex flex-col lg:flex-row gap-8 items-center rounded-3xl overflow-hidden border border-gray-100 shadow-md min-h-[500px]">
        {/* Left Side - Image & CTA */}
        <div className="relative w-full lg:w-12/6">
          <Image
            src="/assets/images/product-specification.webp"
            alt="Product Specification"
            width={ 753}
            height={597}
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 top-34 flex flex-col items-center justify-center p-8 text-center">
            <Link href="/contact-us">
              <Button label="Contact Our Experts" className="bg-white text-[#213554] hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg" />
            </Link>
          </div>
        </div>

        {/* Right Side - Table */}
        <div className="w-full lg:w-12/6 p-6 sm:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-10 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#213554]">Product Specifications</h2>
          </div>

          <div className="grid grid-cols-1 divide-y divide-gray-100">
            {specifications.map((spec, index) => (
              <div key={index} className="flex flex-col sm:flex-row py-4 gap-2 sm:gap-8">
                <div className="w-full sm:w-5/12 font-bold text-[#213554] text-sm sm:text-base uppercase tracking-wider flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#EE334B]" />
                  {spec.label}
                </div>
                <div className="w-full sm:w-7/12 text-gray-600 text-sm sm:text-base leading-relaxed">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecification;
