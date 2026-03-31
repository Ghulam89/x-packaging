"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import Accordion from "@/components/shared/ui/Accordion";
import Button from "@/components/shared/ui/Button";
import { FaArrowRight } from "react-icons/fa";
import { apiBase } from "@/lib/api";

type FAQItem = { question: string; answer: string };

export default function FAQ({ items = [] as FAQItem[], imageUrl, imageAlt }: { items?: FAQItem[]; imageUrl?: string; imageAlt?: string }) {
  const finalImageUrl = useMemo(() => {
    if (!imageUrl) return ASSETS.home.faq;
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${apiBase}/${imageUrl.replace(/^\//, "")}`;
  }, [imageUrl]);

  const faqs = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.map((f, i) => ({
      key: i,
      id: String(i + 1).padStart(2, "0"),
      title: f.question,
      data: stripHtml(f.answer),
      isOpen: false,
    }));
  }, [items]);

  const [accordions, setAccordions] = useState(faqs);

  const toggleAccordion = (key: number) => {
    setAccordions((prev) =>
      prev.map((a) => (a.key === key ? { ...a, isOpen: !a.isOpen } : { ...a, isOpen: false }))
    );
  };

  if (!accordions.length) return null;
  return (
    <section className="">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto">
        <div className="">
          <div className="text-center mb-8">
            <h2 className="pt-7 text-[35px] font-[600] text-[#333333] relative inline-block">
              Frequently Asked Question
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#EE334B]"></span>
            </h2>
            <div className="mt-5">
              <Button
                label={"View All FAQs"}
                variant="red"
                size="md"
                className="uppercase text-white"
                rIcons={
                  <span className={`transform transition-transform duration-200 inline-block`}>
                    <FaArrowRight color="white" />
                  </span>
                }
              />
            </div>
          </div>
          <div className="flex sm:flex-row pb-5 flex-col justify-between sm:gap-8 gap-6 items-center">
            <div className="sm:w-5/12 mx-auto w-full hidden md:flex justify-center items-center relative">
              <div className="relative w-full pt-3">
                <Image
                  src={finalImageUrl}
                  alt={imageAlt || "FAQ"}
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                  unoptimized
                />
              </div>
            </div>
            <div className="sm:w-6/12 w-full">
              <div className="mt-0">
                {accordions.map((a, idx) => (
                  <Accordion
                    key={a.key}
                    id={a.id}
                    title={a.title}
                    data={a.data}
                    isOpen={!!a.isOpen}
                    toggleAccordion={() => toggleAccordion(a.key)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}
