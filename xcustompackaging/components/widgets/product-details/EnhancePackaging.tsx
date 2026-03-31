"use client";
import React, { useMemo } from "react";
import Tabs from "@/components/shared/ui/Tabs";
import { ASSETS } from "@/lib/assets";
import FAQ from "@/components/widgets/home/FAQ";
import CustomPackagingApart from "@/components/widgets/home/CustomPackagingApart";
import Image from "next/image";

const EnhancePackaging = () => {
  const addons = [
    {
      img: ASSETS.specials.embossing,
      title: "Embossing",
      desc: "Embossing raises your logo or artwork for a premium, tactile experience.",
    },
    {
      img: ASSETS.specials.debossing,
      title: "Debossing",
      desc: "Debossing presses your design into the material for a subtle textured effect.",
    },
    {
      img: ASSETS.specials.foiling,
      title: "Custom Foiling",
      desc: "Adds metallic colored foil for instant luxury and a brilliant finish.",
    },
    {
      img: ASSETS.specials.spotUv,
      title: "Spot UV",
      desc: "Enhance your packaging with spot UV coating for a premium finish.",
    },
    {
      img: ASSETS.specials.pvcWindow,
      title: "PVC Window",
      desc: "Allows customers to see the product inside without opening it.",
    },
  ];

  const inserts = [
    {
      img: ASSETS.inserts.foam,
      title: "Foam Inserts",
      desc: "Cushion and secure delicate products for a polished presentation.",
    },
    {
      img: ASSETS.inserts.cardboard,
      title: "Cardboard Inserts",
      desc: "Structured protection and organization for lightweight items.",
    },
    {
      img: ASSETS.inserts.corrugated,
      title: "Corrugated Inserts",
      desc: "The most durable inserts for heavy and light items alike.",
    },
    {
      img: ASSETS.inserts.evaFoam,
      title: "Eva Foam",
      desc: "Premium foam that gives an ultra feel, ideal for luxury items.",
    },
  ];

  const infoTabsData = useMemo(
    () => [
      {
        title: "Add ons",
        content: (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {addons.map((addon, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-2xl p-4 border border-transparent hover:border-[#EE334B]/20 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                  <Image
                    src={addon.img}
                    alt={addon.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-bold text-[#213554] text-sm mb-1 group-hover:text-[#EE334B]">
                  {addon.title}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {addon.desc}
                </p>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "Inserts",
        content: (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {inserts.map((insert, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-2xl p-4 border border-transparent hover:border-[#EE334B]/20 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                  <Image
                    src={insert.img}
                    alt={insert.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-bold text-[#213554] text-sm mb-1 group-hover:text-[#EE334B]">
                  {insert.title}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {insert.desc}
                </p>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "Why Us",
        content: (
          <div className="p-4">
            <CustomPackagingApart />
          </div>
        ),
      },
      {
        title: "FAQs",
        content: (
          <div className="p-4">
            <FAQ />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <section className="sm:max-w-8xl max-w-[95%] mx-auto my-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#213554] mb-4">
          Enhance Your Packaging Experience
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from our premium add-ons and inserts to make your packaging
          stand out and protect your products.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <Tabs tabs={infoTabsData} defaultTab="Add ons" className="bg-white" />
      </div>
    </section>
  );
};

export default EnhancePackaging;
