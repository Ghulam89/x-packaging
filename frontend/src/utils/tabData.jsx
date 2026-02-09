import React from 'react';
import { insert1, insert2, insert3, insert4, insert5 } from '../assets';
import { 
  baseMaterialsSlides, 
  wrappingsSlides, 
  printingsSlides, 
  coatingsSlides, 
  finishesSlides, 
  addonsSlides
} from '../constants/slideData';
import { 
  materialsCards, 
  printingOptionsCards, 
  inksCards, 
  finishingCards, 
  shapesAddonsCards 
} from '../constants/cardData';

// Helper function to create chunks
export const createChunks = (slides, chunkSize = 4) => {
  const chunks = [];
  for (let i = 0; i < slides.length; i += chunkSize) {
    chunks.push(slides.slice(i, i + chunkSize));
  }
  return chunks;
};

// Generate tab data for first tabs section
export const generateTabsData = (insertsSlides) => {
  const baseMaterialChunks = createChunks(baseMaterialsSlides);
  const wrappingsChunks = createChunks(wrappingsSlides);
  const printingsChunks = createChunks(printingsSlides);
  const coatingsChunks = createChunks(coatingsSlides);
  const finishesChunks = createChunks(finishesSlides);
  const insertsChunks = createChunks(insertsSlides);
  const addonsChunks = createChunks(addonsSlides);

  return {
    baseMaterialChunks,
    wrappingsChunks,
    printingsChunks,
    coatingsChunks,
    finishesChunks,
    insertsChunks,
    addonsChunks
  };
};

// Generate tab content component
export const generateTabContent = (slides) => (
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-full"></div>
          </div>
          <div className='px-2 pb-2'>
            <h6 className="font-semibold group-hover:text-[#EE334B] transition-colors duration-300">{addon.title}</h6>
            <p className="text-xs text-gray-600 mt-1">{addon.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Generate inserts tab content
export const generateInsertsTabContent = () => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {[
        { img: insert1, title: 'Foam Inserts' },
        { img: insert2, title: 'Cardboard Inserts' },
        { img: insert3, title: 'Clamshell Inserts' },
        { img: insert4, title: 'Corrugated Inserts' },
        { img: insert4, title: 'Corrugated Inserts' },
        { img: insert5, title: 'Eva Foam Inserts' }
      ].map((item, index) => (
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-full"></div>
          </div>
          <div className='px-2 pb-2'>
            <h6 className="font-semibold group-hover:text-[#EE334B] transition-colors duration-300">{item.title}</h6>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Generate card tab content
export const generateCardTabContent = (cards) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={card.id || index}
          className="bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col"
        >
          {card.image && (
            <div className="relative w-full h-48 overflow-hidden bg-gray-50">
              <img
                src={card.image}
                alt={card.title || 'Card image'}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#EE334B] transition-colors duration-300">
              {card.title}
            </h3>
            {card.description && (
              <p className="text-sm text-gray-600 leading-relaxed">
                {card.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Generate tabsData
export const generateTabsData1 = (insertsSlides) => [
  {
    title: "Base Materials",
    content: generateTabContent(addonsSlides),
  },
  {
    title: "Wrappings",
    content: generateTabContent(addonsSlides),
  },
  {
    title: "Printings",
    content: generateTabContent(addonsSlides),
  },
  {
    title: "Coatings",
    content: generateTabContent(addonsSlides),
  },
  {
    title: "Finishes",
    content: generateTabContent(addonsSlides),
  },
  {
    title: "Inserts",
    content: generateInsertsTabContent(),
  },
  {
    title: "Add-ons",
    content: generateTabContent(addonsSlides),
  }
];

// Generate tabsData2
export const generateTabsData2 = () => [
  {
    title: "Materials",
    content: generateCardTabContent(materialsCards),
  },
  {
    title: "Printing Options",
    content: generateCardTabContent(printingOptionsCards),
  },
  {
    title: "Inks",
    content: generateCardTabContent(inksCards),
  },
  {
    title: "Finishing",
    content: generateCardTabContent(finishingCards),
  },
  {
    title: "Shapes & Add-Ons",
    content: generateCardTabContent(shapesAddonsCards),
  }
];
