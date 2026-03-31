"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/shared/ui/Button";

type Props = {
  categoryName?: string;
};

const TrustBanner = ({ categoryName = "Apparel Packaging" }: Props) => {
  return (
    <section className="bg-[#F7F7F7] py-4 border-y border-gray-100">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left Section - Heading */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-bold leading-tight flex flex-wrap gap-2 justify-center md:justify-start items-center">
              <span className="text-gray-900 text-lg md:text-xl lg:text-2xl">
                Customers Trust Us for their
              </span>
              <span className="text-[#EE334B] text-lg md:text-xl lg:text-2xl">
                {categoryName}
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
            <div className="flex items-center gap-4">
              <p className="text-sm md:text-base font-medium text-gray-600 whitespace-nowrap">
                Serving 5000+ Happy Customers!
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-32 h-10">
                  <Image
                    src="/assets/images/footer/trust.png"
                    alt="Trustpilot"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-gray-900">4.9/5</span>
              </div>
            </div>

            <Button
              label="Write a Review"
              className="bg-[#213554] hover:bg-[#EE334B] text-white font-bold px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap transform hover:-translate-y-0.5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
