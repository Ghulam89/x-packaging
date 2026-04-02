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
      <div className="sm:max-w-8xl max-w-[95%] mx-auto px-3 sm:px-4 w-full min-w-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 w-full min-w-0">
          {/* Left Section - Heading */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <h2 className="font-bold leading-tight flex flex-wrap gap-2 justify-center md:justify-start items-center">
              <span className="text-gray-900 text-lg md:text-xl lg:text-2xl">
                Customers Trust Us for their
              </span>
              <span className="text-[#EE334B] text-lg md:text-xl lg:text-2xl">
                {categoryName}
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-6 md:gap-10 w-full md:w-auto min-w-0">
            <div className="flex flex-col items-center gap-3 min-w-0 w-full sm:w-auto md:flex-row md:items-center md:gap-4">
              <p className="text-sm md:text-base font-medium text-gray-600 text-center md:text-left text-balance sm:whitespace-nowrap">
                Serving 5000+ Happy Customers!
              </p>
              <div className="flex items-center justify-center gap-3 shrink-0">
                <div className="relative w-32 h-10 shrink-0">
                  <Image
                    src="/assets/images/footer/trust.png"
                    alt="Trustpilot"
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-gray-900">4.9/5</span>
              </div>
            </div>

            <Button
              label="Write a Review"
              className="w-full sm:w-auto bg-[#213554] hover:bg-[#EE334B] text-white font-bold px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap transform hover:-translate-y-0.5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
