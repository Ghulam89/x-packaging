 "use client";
import React, { useMemo, useRef } from "react";
import { ASSETS } from "@/lib/assets";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

export default function AddonsAndInserts() {
  const addons = useMemo(
    () => [
      { img: ASSETS.inserts.foam, title: "Foam Inserts", desc: "Foam inserts cushion and secure delicate products, providing protection and a polished unboxing presentation. We make them in any color you want." },
      { img: ASSETS.inserts.cardboard, title: "Cardboard Inserts", desc: "Cardboard inserts provide structured protection and organization inside your box. These are economical and for lightweight items. We can customize them in any color." },
      { img: ASSETS.inserts.clamshell, title: "Clamshell Inserts", desc: "Clamshell inserts surround and securely display your product, perfect for a clear, retail-ready presentation. These are the best suited for bulk usage." },
      { img: ASSETS.inserts.corrugated, title: "Corrugated Inserts", desc: "Corrugated inserts are the most durable inserts that we offer in any custom design. You can trust them to fit heavy and light-weight items both." },
      { img: ASSETS.inserts.evaFoam, title: "Eva Foam Inserts", desc: "It is a type of premium foam insert that gives an ultra feel to the customers. We recommend this for expensive products. It comes in natural white and black colors." },
    ],
    []
  );

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollByCard = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstChildWidth = (el.firstChild as HTMLElement | null)?.clientWidth || 200;
    el.scrollTo({
      left: el.scrollLeft + (dir === "left" ? -firstChildWidth : firstChildWidth),
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 bg-[#f7f7f7]">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-5">Get the Inserts Your Product Needs</h2>
        <p className="text-center text-gray-600 mb-12">
          Secure your product inside the box with the insert best fit for it. We customize a wide range of inserts, including luxury foam, economical cardboard, durable corrugated, and premium clamshell and EVA foam inserts.
        </p>
        <div className="relative">
          <div
            ref={scrollRef}
            className="sm:pl-0 pl-4 pr-4 sm:pr-0 items-start gap-3 sm:gap-4 flex overflow-x-auto overflow-y-hidden whitespace-nowrap py-2 snap-x snap-mandatory min-h-[280px] sm:min-h-[380px] md:min-h-[400px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {addons.map((addon, index) => (
              <div key={index} className="w-[85vw] sm:w-[352px] flex-shrink-0 px-2">
                <div className="bg-white rounded-xl overflow-hidden text-center border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-full flex flex-col">
                  <div className="relative mb-4">
                    <img src={addon.img} alt={addon.title} className="w-full object-cover transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-lg" />
                  </div>
                  <div className="px-5 pb-5 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-[#EE334B] transition-colors duration-300">{addon.title}</h3>
                    <p className="text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-300 whitespace-normal break-words leading-relaxed flex-1">{addon.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:block hidden">
            <button
              className="absolute left-2 rounded-full flex justify-center items-center bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:shadow-xl w-12 h-12 hover:text-white"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              onClick={() => scrollByCard("left")}
              aria-label="Scroll left"
            >
              <LiaAngleLeftSolid size={24} className="text-[#213554]" />
            </button>
            <button
              className="absolute right-2 rounded-full flex justify-center items-center bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:shadow-xl w-12 h-12 hover:text-white"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              onClick={() => scrollByCard("right")}
              aria-label="Scroll right"
            >
              <LiaAngleRightSolid size={24} className="text-[#213554]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
