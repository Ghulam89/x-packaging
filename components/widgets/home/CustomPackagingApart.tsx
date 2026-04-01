 "use client";
import React, { useMemo } from "react";
import { ASSETS } from "@/lib/assets";

export default function CustomPackagingApart() {
  const items = useMemo(
    () => [
      { icon: ASSETS.icons.noDiePlateCharge, title: "No Die & Plate Charges", description: "Benefit from zero setup fees for dies and plates on your custom packaging project." },
      { icon: ASSETS.icons.noMinimumOrderQty, title: "No limit on MOQ", description: "Order exactly what you need, from small orders to large runs." },
      { icon: ASSETS.icons.freeDesignPng, title: "Free Design Support", description: "In-house design department works for free, bringing your packaging vision to life." },
      { icon: ASSETS.icons.quickTurnaroundPng, title: "Quickest Turnaround", description: "Fast production and delivery for your custom packaging project." },
      { icon: ASSETS.icons.cheapestPrice, title: "Economical Prices", description: "Lowest possible prices with heavy discounts on bulk purchases." },
      { icon: ASSETS.icons.freeDeliveryAlt, title: "Free Shipping", description: "Free shipping across the USA for orders of any size." },
    ],
    []
  );

  return (
    <section
      className="py-10 bg-cover bg-center bg-no-repeat"
      // style={{ backgroundImage: `url(${ASSETS.misc.industryStandard})` }}
    >
      <div className="max-w-[95%] sm:max-w-8xl mx-auto">
        <h2 className="sm:text-[35px] text-[25px] pb-3 font-sans font-[600] text-[#333333] text-center">
          What Makes X Custom Packaging Different Amongst All
        </h2>
        <p className="sm:text-[18px] text-[16px] text-[#666666] max-w-4xl mx-auto mb-8 px-4 text-center">
Your packaging is more than just a container—it's a canvas for your brand. Our custom-printed boxes are designed to bring your vision to life with rich colors, precision detailing, and premium finishes, ensuring that every package reflects your brand identity with unmatched clarity and impact.

        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="text-center px-2">
              <img src={item.icon} alt={item.title} width={80} height={80} className="mx-auto" />
              <strong className="font-[600] text-[#111111] block mt-2 text-[18px]">{item.title}</strong>
              <p className="m-0 text-[16px] mt-1 text-[#666666]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
