"use client";

import { useMemo } from "react";
import Tabs from "@/components/shared/ui/Tabs";
import { ASSETS } from "@/lib/assets";
import {
  addonsSlides,
  type SlideItem,
} from "@/lib/category/slideData";
import {
  materialsCards,
  printingOptionsCards,
  inksCards,
  finishingCards,
  shapesAddonsCards,
  type CardItem,
} from "@/lib/category/cardData";

function TabGridContent({ slides }: { slides: SlideItem[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {slides.map((addon, index) => (
          <div
            key={index}
            className="bg-white rounded-xl text-center border border-gray-100 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col items-center p-4 overflow-hidden"
          >
            <div className="relative mb-4 w-40 h-40 mx-auto aspect-square">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#EE334B]/30 transition-all duration-300">
                <img
                  src={addon.image}
                  alt={addon.title}
                  className="w-full h-full object-cover aspect-square transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full" />
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-full" />
            </div>
            <div className="px-2 pb-2">
              <h6 className="font-semibold group-hover:text-[#EE334B] transition-colors duration-300">{addon.title}</h6>
              <p className="text-xs text-gray-600 mt-1">{addon.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsertsTabContent() {
  const items = [
    { img: ASSETS.inserts.foam, title: "Foam Inserts" },
    { img: ASSETS.inserts.cardboard, title: "Cardboard Inserts" },
    { img: ASSETS.inserts.clamshell, title: "Clamshell Inserts" },
    { img: ASSETS.inserts.corrugated, title: "Corrugated Inserts" },
    { img: ASSETS.inserts.corrugated, title: "Corrugated Inserts" },
    { img: ASSETS.inserts.evaFoam, title: "Eva Foam Inserts" },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl text-center border border-gray-100 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col items-center p-4 overflow-hidden"
          >
            <div className="relative mb-4 w-40 h-40 mx-auto aspect-square">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#EE334B]/30 transition-all duration-300">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover aspect-square transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full" />
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-full" />
            </div>
            <div className="px-2 pb-2">
              <h6 className="font-semibold group-hover:text-[#EE334B] transition-colors duration-300">{item.title}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardTabContent({ cards }: { cards: CardItem[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={card.id || index}
            className="bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col"
          >
            {card.image ? (
              <div className="relative w-full h-48 overflow-hidden bg-gray-50">
                <img
                  src={card.image}
                  alt={card.title || "Card image"}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ) : null}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#EE334B] transition-colors duration-300">
                {card.title}
              </h3>
              {card.description ? (
                <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mirrors CRA `generateTabsData1`: same slides per tab as legacy SubCategory (addons grid + Inserts). */
function buildTabsData1() {
  return [
    { title: "Base Materials", content: <TabGridContent slides={addonsSlides} /> },
    { title: "Wrappings", content: <TabGridContent slides={addonsSlides} /> },
    { title: "Printings", content: <TabGridContent slides={addonsSlides} /> },
    { title: "Coatings", content: <TabGridContent slides={addonsSlides} /> },
    { title: "Finishes", content: <TabGridContent slides={addonsSlides} /> },
    { title: "Inserts", content: <InsertsTabContent /> },
    { title: "Add-ons", content: <TabGridContent slides={addonsSlides} /> },
  ];
}

function buildTabsData2() {
  return [
    { title: "Materials", content: <CardTabContent cards={materialsCards} /> },
    { title: "Printing Options", content: <CardTabContent cards={printingOptionsCards} /> },
    { title: "Inks", content: <CardTabContent cards={inksCards} /> },
    { title: "Finishing", content: <CardTabContent cards={finishingCards} /> },
    { title: "Shapes & Add-Ons", content: <CardTabContent cards={shapesAddonsCards} /> },
  ];
}

export type CategoryTabsSectionsProps = {
  showTabsSection1?: boolean;
  showTabsSection2?: boolean;
};

export default function CategoryTabsSections({ showTabsSection1, showTabsSection2 }: CategoryTabsSectionsProps) {
  const tabsData1 = useMemo(() => buildTabsData1(), []);
  const tabsData2 = useMemo(() => buildTabsData2(), []);

  return (
    <>
      {showTabsSection1 ? (
        <section className="sm:max-w-8xl max-w-[95%] mx-auto px-3 sm:px-4">
          <div className="mt-10">
            <Tabs className="bg-white" defaultTab="Base Materials" tabs={tabsData1} />
          </div>
        </section>
      ) : null}

      {showTabsSection2 ? (
        <section className="sm:max-w-8xl max-w-[95%] mx-auto px-3 sm:px-4">
          <div className="mt-10">
            <Tabs className="bg-white" defaultTab="Materials" tabs={tabsData2} />
          </div>
        </section>
      ) : null}
    </>
  );
}
