import React from 'react'
import MaterialSlider from './MaterialSlider'

export const materialSlides = [
    {
        title: "White",
        image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
    },
    {
        title: "Card Stock",
        image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
    },
    {
        title: "Corrugated",
        image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
    },
    {
        title: "Foil",
        image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
    },
    {
        title: "Foil",
        image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
    },
    {
        title: "Foil",
        image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
    },
    {
        title: "Foil",
        image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
    },
    {
        title: "Foil",
        image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
    }
];

export const getTabsData = (materialChunks, materialCurr, prevMaterial, nextMaterial) => [
    {
        title: "MATERIALS",
        content: (
            <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="lg:w-6/12 w-full">
                    <h3 className="text-lg font-semibold text-[#213554]">
                        Discover our range of high-quality packaging materials
                    </h3>
                    <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                        Discover our range of high-quality packaging materials designed to
                        tailor your packaging order to perfection. From sturdy cardboard
                        boxes to eco-friendly options, we have the ideal materials for your
                        unique needs. Elevate your brand and protect your products with our
                        customizable packaging solutions.
                    </p>
                </div>
                <div className="lg:w-6/12 w-full">
                    <MaterialSlider 
                        materialChunks={materialChunks}
                        materialCurr={materialCurr}
                        prevMaterial={prevMaterial}
                        nextMaterial={nextMaterial}
                    />
                </div>
            </div>
        ),
    },
    {
        title: "ADD-ONS & FINISHING",
        content: (
            <div className="flex flex-col lg:flex-row gap-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8">
                <div className="lg:w-6/12 w-full">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-10 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#213554]">
                            Discover our range of high-quality packaging materials
                        </h3>
                    </div>
                    <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                        Discover our range of high-quality packaging materials designed to
                        tailor your packaging order to perfection. From sturdy cardboard
                        boxes to eco-friendly options, we have the ideal materials for your
                        unique needs. Elevate your brand and protect your products with our
                        customizable packaging solutions.
                    </p>
                </div>
                <div className="lg:w-6/12 w-full">
                    <MaterialSlider 
                        materialChunks={materialChunks}
                        materialCurr={materialCurr}
                        prevMaterial={prevMaterial}
                        nextMaterial={nextMaterial}
                    />
                </div>
            </div>
        ),
    },
    {
        title: "PAPER WEIGHT",
        content: <></>,
    },
    {
        title: "SHIPPING",
        content: <></>,
    }
];
