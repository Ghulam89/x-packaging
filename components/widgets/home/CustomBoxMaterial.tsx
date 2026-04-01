"use client";
import React, { useEffect, useMemo, useState } from "react";
import NextImage from "next/image";
import Button from "@/components/shared/ui/Button";
import GetQuoteModal from "@/components/features/quote/ui/GetQuoteModal";
import { ASSETS } from "@/lib/assets";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type BoxItem = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  image: string;
};

export default function CustomBoxMaterial() {
  const boxes: BoxItem[] = useMemo(
    () => [
      {
        id: 1,
        title: "Rigid Boxes",
        subTitle: "Premium Feel & Protection with Rigid Boxes",
        description:
          "For special, luxury, and unique products that deserve exceptional presentation, rigid boxes are the ideal choice. X Custom Packaging made rigid boxes offer superior durability, a luxury feel, and unmatched shelf presence.",
        image: ASSETS.boxMaterial.rigid,
      },
      {
        id: 2,
        title: "Corrugated Boxes",
        subTitle: "The Reliable Strength of Corrugated Boxes",
        description:
          "Corrugated boxes are safe and reliable to ship products even across the oceans due to their layered structure and construction. We use corrugated materials that ensure your products arrive securely, every time.",
        image: ASSETS.boxMaterial.corrugatedMailer,
      },
      {
        id: 3,
        title: "Kraft Boxes",
        subTitle: "100% Recycled Packaging with Kraft Boxes",
        description:
          "Go for natural and sustainable kraft boxes, bags, and cups for a look that’s both rustic and responsible. Strong, biodegradable, and perfect for eco-committed brands.",
        image: ASSETS.boxMaterial.kraft,
      },
      {
        id: 4,
        title: "Cardboard Boxes",
        subTitle: "Economical & The Only Choice for Retail",
        description:
          "Cardboard boxes are economical, print-friendly, and adaptable to many shapes — ideal for retail packaging and displays. Transform plain cardboard into powerful brand statements.",
        image: ASSETS.boxMaterial.cardboard,
      },
    ],
    []
  );

  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.Image !== "undefined") {
      boxes.forEach((b) => {
        const img = new window.Image();
        img.src = b.image;
      });
    }
  }, [boxes]);

  useEffect(() => {
    const t = window.setTimeout(() => setImagesLoaded(true), 100);
    return () => window.clearTimeout(t);
  }, []);

  const visible = useMemo(() => {
    const out: BoxItem[] = [];
    for (let i = 0; i < 4; i++) {
      out.push(boxes[(current + i) % boxes.length]);
    }
    return out;
  }, [current, boxes]);

  const goPrev = () => setCurrent((p) => (p === 0 ? boxes.length - 1 : p - 1));
  const goNext = () => setCurrent((p) => (p === boxes.length - 1 ? 0 : p + 1));

  return (
    <section className="mx-auto w-[95%] sm:max-w-8xl py-10">
      <style jsx global>{`
        @keyframes fadeInUp {
          0% {
            transform: translateY(10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out;
        }
      `}</style>
      <div className="text-center mb-6">
        <h2 className="sm:text-[35px] text-[25px] font-sans font-[600] text-[#333333]">
          Choose the Perfect Material for Your Custom Box
        </h2>
        <p className="pt-3 pb-6 text-sm max-w-7xl mx-auto text-gray-700">
          We help you choose the right material for your packaging as it is key to balancing protection, presentation, and cost.{" "}
          <b>This guide breaks down your options</b>, from durable corrugated mailers to luxury rigid boxes and from eco-friendly kraft boxes and bags to budget-friendly retail cardboard boxes, helping you make the smartest choice for your product.{" "}
          <b>box your packaging with X Custom Packaging!</b>
        </p>
      </div>
      {!imagesLoaded ? (
        <div className="my-10 min-h-[400px] flex items-center justify-center">
          <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full max-h-[400px]" />
        </div>
      ) : null}
      <div className="grid lg:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <div className="grid grid-cols-2 gap-4 relative z-10">
            {visible.map((b, i) => {
              const idx = boxes.findIndex((x) => x.id === b.id);
              const active = idx === current;
              return (
                <button
                  key={b.id}
                  onClick={() => setCurrent(idx)}
                  className={`relative group rounded-lg overflow-hidden border-[2px] transition-all duration-300 transform ${
                    active
                      ? "border-[#EE334B] shadow-lg"
                      : "border-gray-200 hover:border-[#EE334B]/50 hover:shadow-md"
                  }`}
                >
                  <div className="relative w-full sm:h-64 h-auto aspect-square overflow-hidden">
                    <NextImage
                      src={b.image}
                      alt={b.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${active ? "" : ""} group-hover:scale-110`}
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent transition-opacity duration-300 ${
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                    <p className="text-white font-semibold text-sm text-center">{b.title}</p>
                  </div>
                  {active ? (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#EE334B] rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
        <div className="relative">
          <div className="relative">
            <div className="z-10 animate-fadeInUp md:pr-20 pr-0">
              <div className="p-2 rounded-md w-full min-w-0">
                <div className="flex w-full sm:flex-row justify-between flex-col items-center">
                  <div className="sm:w-12/12 w-full min-w-0">
                    <div className="sm:p-5 p-3">
                      <h2 className="sm:text-[35px] text-[25px] font-sans font-[600] text-[#333333] break-words">
                        {boxes[current].title}
                      </h2>
                      <h3 className="pt-4 sm:text-2xl text-xl break-words">
                        <strong>{boxes[current].subTitle}</strong>
                      </h3>
                      <p className="pt-2.5 break-words text-gray-600">{boxes[current].description}</p>
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        label={"Get Quote"}
                        className="bg-[#4440E6] text-white mt-2 opacity-90"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <button
                      onClick={goPrev}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-[#EE334B] text-[#EE334B] hover:bg-[#EE334B] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                      aria-label="Previous box"
                    >
                      <FaAngleLeft size={14} />
                    </button>
                    <div className="flex items-center justify-center gap-2 sm:gap-3 px-2">
                      {boxes.slice(0, 4).map((b, index) => {
                        const active = index === current;
                        return (
                          <button
                            key={b.id}
                            onClick={() => setCurrent(index)}
                            className={`relative group transition-all duration-300 ${
                              active ? "scale-110" : "hover:scale-105"
                            }`}
                            aria-label={`Go to ${b.title}`}
                          >
                            <div
                              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 shadow-md ${
                                active
                                  ? "border-[#EE334B] shadow-lg ring-2 ring-[#EE334B]/30"
                                  : "border-gray-200 hover:border-[#EE334B]/50"
                              }`}
                            >
                              <NextImage src={b.image} alt={b.title} fill className="object-cover" sizes="80px" />
                              {active ? <div className="absolute inset-0 bg-[#EE334B]/20" /> : null}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={goNext}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-[#EE334B] text-[#EE334B] hover:bg-[#EE334B] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                      aria-label="Next box"
                    >
                      <FaAngleRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex absolute z-30 -bottom-18 right-0 items-center justify-start pointer-events-none">
              <h6
                className="text-[40px] sm:text-[60px] lg:text-[77px] font-bold text-[#EE334B] opacity-10 select-none"
                style={{
                  fontFamily: "Arial, sans-serif",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(0deg)",
                  whiteSpace: "nowrap",
                }}
              >
                Custom{"\u00A0"}Material
              </h6>
            </div>
          </div>
        </div>
      </div>
      <GetQuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} category={null} />
    </section>
  );
}
