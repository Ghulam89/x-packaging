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
      <div className="flex min-h-0 flex-col items-stretch gap-0 overflow-hidden rounded-3xl border border-gray-100 shadow-md lg:min-h-[500px] lg:flex-row lg:items-center">
        {/* Left Side - Image & CTA */}
        <div className="relative w-full lg:w-1/2">
          <Image
            src="/assets/images/product-specification.webp"
            alt="Product Specification"
            width={753}
            height={597}
            className="h-auto w-full object-contain"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center sm:p-8">
            <Link href="/contact-us">
              <Button label="Contact Our Experts" className="bg-white text-[#213554] hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg" />
            </Link>
          </div>
        </div>

        {/* Right Side - Table */}
        <div className="w-full p-6 sm:p-10 lg:w-1/2">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-10 bg-linear-to-b from-[#EE334B] to-[#213554] rounded-full" />
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
