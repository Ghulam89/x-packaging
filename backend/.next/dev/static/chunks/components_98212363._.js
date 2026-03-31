(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/entities/product/ui/ProductCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
;
;
const ProductCard = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = function ProductCard({ href, title, imageSrc, imageAlt, variant = "grid", className = "", cardClassName = "", subtitle, priority = false }) {
    const isCarousel = variant === "carousel";
    const isCompact = variant === "compact";
    const imageHeightClass = isCarousel ? "h-[230px]" : isCompact ? "h-32" : "h-40";
    const outerRadiusClass = isCarousel ? "rounded-2xl sm:rounded-3xl" : "rounded-2xl";
    const imageRadiusClass = isCarousel ? "rounded-xl sm:rounded-2xl" : "rounded-xl";
    const paddingClass = isCarousel ? "p-2 sm:p-3 md:p-4" : "p-3";
    const wrapperClass = isCarousel ? `text-gray-700 bg-[#F9F9F9] hover:bg-white ${outerRadiusClass} flex font-bold flex-col gap-0.5 items-center transition-all duration-300 border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transform hover:-translate-y-1 w-full group` : `group border ${outerRadiusClass} ${paddingClass} hover:shadow-lg bg-white transition-all duration-300`;
    const titleClass = isCarousel ? "text-xs sm:text-sm pb-2 sm:pb-3 font-bold group-hover:text-[#EE334B] transition-colors duration-300 text-center px-2 line-clamp-2" : "mt-2 font-semibold text-sm text-[#213554] text-center group-hover:text-[#EE334B] transition-colors duration-300";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: `block h-full w-full ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${wrapperClass} ${cardClassName}`,
            children: [
                isCarousel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${paddingClass} relative overflow-hidden ${outerRadiusClass} w-full`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `relative w-full ${imageHeightClass} ${imageRadiusClass} overflow-hidden`,
                        children: [
                            imageSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: imageSrc,
                                alt: imageAlt || title,
                                fill: true,
                                sizes: "(max-width: 640px) 85vw, 285px",
                                className: `object-cover transition-transform duration-700 group-hover:scale-110 ${imageRadiusClass}`,
                                priority: priority
                            }, void 0, false, {
                                fileName: "[project]/components/entities/product/ui/ProductCard.tsx",
                                lineNumber: 55,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-full h-full bg-gradient-to-br from-[#213554]/10 to-[#EE334B]/10 ${imageRadiusClass}`
                            }, void 0, false, {
                                fileName: "[project]/components/entities/product/ui/ProductCard.tsx",
                                lineNumber: 64,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${imageRadiusClass}`
                            }, void 0, false, {
                                fileName: "[project]/components/entities/product/ui/ProductCard.tsx",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none ${imageRadiusClass}`
                            }, void 0, false, {
                                fileName: "[project]/components/entities/product/ui/ProductCard.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/entities/product/ui/ProductCard.tsx",
                        lineNumber: 53,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/entities/product/ui/ProductCard.tsx",
                    lineNumber: 52,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `relative w-full ${imageHeightClass} ${imageRadiusClass} bg-gray-50 overflow-hidden`,
                    children: imageSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: imageSrc,
                        alt: imageAlt || title,
                        fill: true,
                        sizes: isCompact ? "128px" : "(max-width: 768px) 50vw, 25vw",
                        className: "object-contain",
                        priority: priority
                    }, void 0, false, {
                        fileName: "[project]/components/entities/product/ui/ProductCard.tsx",
                        lineNumber: 79,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full bg-gray-100"
                    }, void 0, false, {
                        fileName: "[project]/components/entities/product/ui/ProductCard.tsx",
                        lineNumber: 88,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/entities/product/ui/ProductCard.tsx",
                    lineNumber: 77,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: titleClass,
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/components/entities/product/ui/ProductCard.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        !isCarousel && subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-gray-500 text-center",
                            children: subtitle
                        }, void 0, false, {
                            fileName: "[project]/components/entities/product/ui/ProductCard.tsx",
                            lineNumber: 95,
                            columnNumber: 38
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/entities/product/ui/ProductCard.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/entities/product/ui/ProductCard.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/entities/product/ui/ProductCard.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
});
_c1 = ProductCard;
const __TURBOPACK__default__export__ = ProductCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "ProductCard$memo");
__turbopack_context__.k.register(_c1, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/widgets/home/BottomHero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const BottomHero = ()=>{
    _s();
    const brands = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BottomHero.useMemo[brands]": ()=>[
                {
                    id: 1,
                    image: "/assets/images/brand/1.png",
                    alt: "Adidas"
                },
                {
                    id: 2,
                    image: "/assets/images/brand/2.png",
                    alt: "Good Vibe CBD"
                },
                {
                    id: 3,
                    image: "/assets/images/brand/3.png",
                    alt: "Nike"
                },
                {
                    id: 4,
                    image: "/assets/images/brand/4.png",
                    alt: "The Frankie Shop"
                },
                {
                    id: 5,
                    image: "/assets/images/brand/5.png",
                    alt: "Channel"
                },
                {
                    id: 6,
                    image: "/assets/images/brand/6.png",
                    alt: "Brand 1"
                },
                {
                    id: 7,
                    image: "/assets/images/brand/7.png",
                    alt: "Brand 2"
                },
                {
                    id: 8,
                    image: "/assets/images/brand/8.png",
                    alt: "Brand 3"
                },
                {
                    id: 9,
                    image: "/assets/images/brand/9.png",
                    alt: "Brand 4"
                },
                {
                    id: 10,
                    image: "/assets/images/brand/10.png",
                    alt: "Brand 5"
                },
                {
                    id: 11,
                    image: "/assets/images/brand/11.png",
                    alt: "Brand 6"
                },
                {
                    id: 12,
                    image: "/assets/images/brand/12.png",
                    alt: "Brand 7"
                },
                {
                    id: 13,
                    image: "/assets/images/brand/13.png",
                    alt: "Brand 8"
                },
                {
                    id: 14,
                    image: "/assets/images/brand/14.png",
                    alt: "Brand 9"
                },
                {
                    id: 15,
                    image: "/assets/images/brand/15.png",
                    alt: "Brand 10"
                }
            ]
    }["BottomHero.useMemo[brands]"], []);
    const duplicatedBrands = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BottomHero.useMemo[duplicatedBrands]": ()=>{
            return [
                ...brands,
                ...brands,
                ...brands
            ];
        }
    }["BottomHero.useMemo[duplicatedBrands]"], [
        brands
    ]);
    const animationDuration = brands.length * 3;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-3.5 bg-[#F7F7F7]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sm:max-w-7xl w-[95%] mx-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative overflow-hidden w-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex whitespace-nowrap gap-8 items-center",
                        style: {
                            animation: `scroll-brands ${animationDuration}s linear infinite`
                        },
                        children: duplicatedBrands.map((brand, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center justify-center flex-shrink-0 h-[40px] w-[140px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: brand.image,
                                    alt: brand.alt,
                                    loading: "lazy",
                                    width: 140,
                                    height: 40,
                                    className: "max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                                }, void 0, false, {
                                    fileName: "[project]/components/widgets/home/BottomHero.tsx",
                                    lineNumber: 49,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, `${brand.id}-${index}`, false, {
                                fileName: "[project]/components/widgets/home/BottomHero.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/components/widgets/home/BottomHero.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/widgets/home/BottomHero.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/widgets/home/BottomHero.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
          @keyframes scroll-brands {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
        `
            }, void 0, false, {
                fileName: "[project]/components/widgets/home/BottomHero.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/widgets/home/BottomHero.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(BottomHero, "u6k63SAh9kd3d6PykAYlI9TtNcQ=");
_c = BottomHero;
const __TURBOPACK__default__export__ = /*#__PURE__*/ _c1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(BottomHero);
var _c, _c1;
__turbopack_context__.k.register(_c, "BottomHero");
__turbopack_context__.k.register(_c1, "%default%");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/shared/ui/Accordion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Accordion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/io/index.mjs [app-client] (ecmascript)");
"use client";
;
;
function Accordion({ id, title, data, isOpen, toggleAccordion }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-b-2 border-gray-200 hover:border-[#213554]/30 px-5 transition-all duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "w-full items-center bg-transparent py-3 flex text-[15px] justify-between text-left transition duration-300 group",
                onClick: toggleAccordion,
                "aria-expanded": isOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cursor-pointer transform transition-transform duration-300 group-hover:scale-110",
                            children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IoIosArrowDown"], {
                                className: "text-[#EE334B]",
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/components/shared/ui/Accordion.tsx",
                                lineNumber: 21,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IoIosArrowUp"], {
                                className: "text-[#EE334B]",
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/components/shared/ui/Accordion.tsx",
                                lineNumber: 23,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/shared/ui/Accordion.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold m-0 text-[#213554] group-hover:text-[#EE334B] transition-colors duration-300",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/components/shared/ui/Accordion.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shared/ui/Accordion.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/ui/Accordion.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[16px] text-gray-700 leading-relaxed pt-2 pb-3 border-t border-gray-100 mt-2",
                children: data
            }, void 0, false, {
                fileName: "[project]/components/shared/ui/Accordion.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shared/ui/Accordion.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = Accordion;
var _c;
__turbopack_context__.k.register(_c, "Accordion");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/widgets/home/FAQ.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FAQ
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/assets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$ui$2f$Accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/ui/Accordion.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function FAQ({ items = [], imageUrl, imageAlt }) {
    _s();
    const finalImageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FAQ.useMemo[finalImageUrl]": ()=>{
            if (!imageUrl) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSETS"].home.faq;
            if (imageUrl.startsWith("http")) return imageUrl;
            return `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiBase"]}/${imageUrl.replace(/^\//, "")}`;
        }
    }["FAQ.useMemo[finalImageUrl]"], [
        imageUrl
    ]);
    const faqs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FAQ.useMemo[faqs]": ()=>{
            if (!Array.isArray(items)) return [];
            return items.map({
                "FAQ.useMemo[faqs]": (f, i)=>({
                        key: i,
                        id: String(i + 1).padStart(2, "0"),
                        title: f.question,
                        data: stripHtml(f.answer),
                        isOpen: false
                    })
            }["FAQ.useMemo[faqs]"]);
        }
    }["FAQ.useMemo[faqs]"], [
        items
    ]);
    const [accordions, setAccordions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(faqs);
    const toggleAccordion = (key)=>{
        setAccordions((prev)=>prev.map((a)=>a.key === key ? {
                    ...a,
                    isOpen: !a.isOpen
                } : {
                    ...a,
                    isOpen: false
                }));
    };
    if (!accordions.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sm:max-w-8xl max-w-[95%] mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "pt-7 text-[35px] font-[600] text-[#333333] relative inline-block",
                                children: [
                                    "Frequently Asked Question",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute bottom-0 left-0 w-full h-1 bg-[#EE334B]"
                                    }, void 0, false, {
                                        fileName: "[project]/components/widgets/home/FAQ.tsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/widgets/home/FAQ.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    label: "View All FAQs",
                                    variant: "red",
                                    size: "md",
                                    className: "uppercase text-white",
                                    rIcons: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `transform transition-transform duration-200 inline-block`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaArrowRight"], {
                                            color: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/components/widgets/home/FAQ.tsx",
                                            lineNumber: 56,
                                            columnNumber: 21
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/components/widgets/home/FAQ.tsx",
                                        lineNumber: 55,
                                        columnNumber: 19
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/components/widgets/home/FAQ.tsx",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/FAQ.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/widgets/home/FAQ.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex sm:flex-row pb-5 flex-col justify-between sm:gap-8 gap-6 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sm:w-5/12 mx-auto w-full hidden md:flex justify-center items-center relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-full pt-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: finalImageUrl,
                                        alt: imageAlt || "FAQ",
                                        width: 600,
                                        height: 400,
                                        className: "w-full h-auto object-contain",
                                        unoptimized: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/widgets/home/FAQ.tsx",
                                        lineNumber: 65,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/widgets/home/FAQ.tsx",
                                    lineNumber: 64,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/FAQ.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sm:w-6/12 w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-0",
                                    children: accordions.map((a, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$ui$2f$Accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            id: a.id,
                                            title: a.title,
                                            data: a.data,
                                            isOpen: !!a.isOpen,
                                            toggleAccordion: ()=>toggleAccordion(a.key)
                                        }, a.key, false, {
                                            fileName: "[project]/components/widgets/home/FAQ.tsx",
                                            lineNumber: 78,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/widgets/home/FAQ.tsx",
                                    lineNumber: 76,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/FAQ.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/widgets/home/FAQ.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/widgets/home/FAQ.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/widgets/home/FAQ.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/widgets/home/FAQ.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(FAQ, "UsMtj8Bi6nbTElRS41buPT6wC1M=");
_c = FAQ;
function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}
var _c;
__turbopack_context__.k.register(_c, "FAQ");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/widgets/home/CustomPackagingApart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomPackagingApart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/assets.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function CustomPackagingApart() {
    _s();
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CustomPackagingApart.useMemo[items]": ()=>[
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSETS"].icons.noDiePlateCharge,
                    title: "No Die & Plate Charges",
                    description: "Benefit from zero setup fees for dies and plates on your custom packaging project."
                },
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSETS"].icons.noMinimumOrderQty,
                    title: "No limit on MOQ",
                    description: "Order exactly what you need, from small orders to large runs."
                },
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSETS"].icons.freeDesignPng,
                    title: "Free Design Support",
                    description: "In-house design department works for free, bringing your packaging vision to life."
                },
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSETS"].icons.quickTurnaroundPng,
                    title: "Quickest Turnaround",
                    description: "Fast production and delivery for your custom packaging project."
                },
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSETS"].icons.cheapestPrice,
                    title: "Economical Prices",
                    description: "Lowest possible prices with heavy discounts on bulk purchases."
                },
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSETS"].icons.freeDeliveryAlt,
                    title: "Free Shipping",
                    description: "Free shipping across the USA for orders of any size."
                }
            ]
    }["CustomPackagingApart.useMemo[items]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-10 bg-cover bg-center bg-no-repeat",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[95%] sm:max-w-8xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "sm:text-[35px] text-[25px] pb-3 font-sans font-[600] text-[#333333] text-center",
                    children: "What Makes X Custom Packaging Different Amongst All"
                }, void 0, false, {
                    fileName: "[project]/components/widgets/home/CustomPackagingApart.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "sm:text-[18px] text-[16px] text-[#666666] max-w-4xl mx-auto mb-8 px-4 text-center",
                    children: "Your packaging is more than just a container—it's a canvas for your brand. Our custom-printed boxes are designed to bring your vision to life with rich colors, precision detailing, and premium finishes, ensuring that every package reflects your brand identity with unmatched clarity and impact."
                }, void 0, false, {
                    fileName: "[project]/components/widgets/home/CustomPackagingApart.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8",
                    children: items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center px-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: item.icon,
                                    alt: item.title,
                                    width: 80,
                                    height: 80,
                                    className: "mx-auto"
                                }, void 0, false, {
                                    fileName: "[project]/components/widgets/home/CustomPackagingApart.tsx",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    className: "font-[600] text-[#111111] block mt-2 text-[18px]",
                                    children: item.title
                                }, void 0, false, {
                                    fileName: "[project]/components/widgets/home/CustomPackagingApart.tsx",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "m-0 text-[16px] mt-1 text-[#666666]",
                                    children: item.description
                                }, void 0, false, {
                                    fileName: "[project]/components/widgets/home/CustomPackagingApart.tsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, idx, true, {
                            fileName: "[project]/components/widgets/home/CustomPackagingApart.tsx",
                            lineNumber: 33,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/widgets/home/CustomPackagingApart.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/widgets/home/CustomPackagingApart.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/widgets/home/CustomPackagingApart.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(CustomPackagingApart, "JuH2Tip3cwnoihIGVm6QoIvsF5k=");
_c = CustomPackagingApart;
var _c;
__turbopack_context__.k.register(_c, "CustomPackagingApart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/widgets/home/AddonsAndInserts.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddonsAndInserts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/assets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$lia$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/lia/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AddonsAndInserts() {
    _s();
    const addons = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AddonsAndInserts.useMemo[addons]": ()=>[
                {
                    img: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSETS"].inserts.foam,
                    title: "Foam Inserts",
                    desc: "Foam inserts cushion and secure delicate products, providing protection and a polished unboxing presentation. We make them in any color you want."
                },
                {
                    img: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSETS"].inserts.cardboard,
                    title: "Cardboard Inserts",
                    desc: "Cardboard inserts provide structured protection and organization inside your box. These are economical and for lightweight items. We can customize them in any color."
                },
                {
                    img: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSETS"].inserts.clamshell,
                    title: "Clamshell Inserts",
                    desc: "Clamshell inserts surround and securely display your product, perfect for a clear, retail-ready presentation. These are the best suited for bulk usage."
                },
                {
                    img: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSETS"].inserts.corrugated,
                    title: "Corrugated Inserts",
                    desc: "Corrugated inserts are the most durable inserts that we offer in any custom design. You can trust them to fit heavy and light-weight items both."
                },
                {
                    img: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSETS"].inserts.evaFoam,
                    title: "Eva Foam Inserts",
                    desc: "It is a type of premium foam insert that gives an ultra feel to the customers. We recommend this for expensive products. It comes in natural white and black colors."
                }
            ]
    }["AddonsAndInserts.useMemo[addons]"], []);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollByCard = (dir)=>{
        const el = scrollRef.current;
        if (!el) return;
        const firstChildWidth = el.firstChild?.clientWidth || 200;
        el.scrollTo({
            left: el.scrollLeft + (dir === "left" ? -firstChildWidth : firstChildWidth),
            behavior: "smooth"
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-10 bg-[#f7f7f7]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sm:max-w-8xl max-w-[95%] mx-auto px-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-3xl font-bold text-center mb-5",
                    children: "Get the Inserts Your Product Needs"
                }, void 0, false, {
                    fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-gray-600 mb-12",
                    children: "Secure your product inside the box with the insert best fit for it. We customize a wide range of inserts, including luxury foam, economical cardboard, durable corrugated, and premium clamshell and EVA foam inserts."
                }, void 0, false, {
                    fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: scrollRef,
                            className: "sm:pl-0 pl-4 pr-4 sm:pr-0 items-start gap-3 sm:gap-4 flex overflow-x-auto overflow-y-hidden whitespace-nowrap py-2 snap-x snap-mandatory min-h-[280px] sm:min-h-[380px] md:min-h-[400px]",
                            style: {
                                scrollbarWidth: "none",
                                msOverflowStyle: "none"
                            },
                            children: addons.map((addon, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-[85vw] sm:w-[352px] flex-shrink-0 px-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-xl overflow-hidden text-center border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-full flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: addon.img,
                                                        alt: addon.title,
                                                        className: "w-full object-cover transition-transform duration-700"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                                                        lineNumber: 46,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                                                        lineNumber: 47,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-lg"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                                                        lineNumber: 48,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                                                lineNumber: 45,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-5 pb-5 flex-1 flex flex-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-semibold text-lg mb-2 group-hover:text-[#EE334B] transition-colors duration-300",
                                                        children: addon.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                                                        lineNumber: 51,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-300 whitespace-normal break-words leading-relaxed flex-1",
                                                        children: addon.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                                                        lineNumber: 52,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                                                lineNumber: 50,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                                        lineNumber: 44,
                                        columnNumber: 17
                                    }, this)
                                }, index, false, {
                                    fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                                    lineNumber: 43,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:block hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "absolute left-2 rounded-full flex justify-center items-center bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:shadow-xl w-12 h-12 hover:text-white",
                                    style: {
                                        top: "50%",
                                        transform: "translateY(-50%)"
                                    },
                                    onClick: ()=>scrollByCard("left"),
                                    "aria-label": "Scroll left",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$lia$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiaAngleLeftSolid"], {
                                        size: 24,
                                        className: "text-[#213554]"
                                    }, void 0, false, {
                                        fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "absolute right-2 rounded-full flex justify-center items-center bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:shadow-xl w-12 h-12 hover:text-white",
                                    style: {
                                        top: "50%",
                                        transform: "translateY(-50%)"
                                    },
                                    onClick: ()=>scrollByCard("right"),
                                    "aria-label": "Scroll right",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$lia$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiaAngleRightSolid"], {
                                        size: 24,
                                        className: "text-[#213554]"
                                    }, void 0, false, {
                                        fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/widgets/home/AddonsAndInserts.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(AddonsAndInserts, "kTEsFeWC/YuLKrOkZZH/3QxJkOQ=");
_c = AddonsAndInserts;
var _c;
__turbopack_context__.k.register(_c, "AddonsAndInserts");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/shared/ui/Tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Tabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Tabs({ tabs, defaultTab, className }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultTab);
    const [prevTab, setPrevTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [direction, setDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("right");
    const [showLeftArrow, setShowLeftArrow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showRightArrow, setShowRightArrow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const scrollContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInitialMount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tabs.useEffect": ()=>{
            if (typeof document !== "undefined" && !document.getElementById("tabs-animations")) {
                const style = document.createElement("style");
                style.id = "tabs-animations";
                style.textContent = `
        @keyframes slideInRight { 0% { transform: translateX(20px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        @keyframes slideInLeft { 0% { transform: translateX(-20px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        @keyframes fadeInUp { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .animate-slideInRight { animation: slideInRight 0.4s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.4s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.4s ease-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `;
                document.head.appendChild(style);
            }
        }
    }["Tabs.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tabs.useEffect": ()=>{
            if (prevTab !== null && prevTab !== activeTab) {
                const prevIndex = tabs.findIndex({
                    "Tabs.useEffect.prevIndex": (t)=>t.title === prevTab
                }["Tabs.useEffect.prevIndex"]);
                const currentIndex = tabs.findIndex({
                    "Tabs.useEffect.currentIndex": (t)=>t.title === activeTab
                }["Tabs.useEffect.currentIndex"]);
                setDirection(currentIndex > prevIndex ? "right" : "left");
            }
            setPrevTab(activeTab);
        }
    }["Tabs.useEffect"], [
        activeTab,
        prevTab,
        tabs
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tabs.useEffect": ()=>{
            const checkScrollPosition = {
                "Tabs.useEffect.checkScrollPosition": ()=>{
                    const el = scrollContainerRef.current;
                    if (!el) return;
                    const { scrollLeft, scrollWidth, clientWidth } = el;
                    setShowLeftArrow(scrollLeft > 0);
                    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
                }
            }["Tabs.useEffect.checkScrollPosition"];
            checkScrollPosition();
            const container = scrollContainerRef.current;
            if (!container) return;
            container.addEventListener("scroll", checkScrollPosition);
            window.addEventListener("resize", checkScrollPosition);
            return ({
                "Tabs.useEffect": ()=>{
                    container.removeEventListener("scroll", checkScrollPosition);
                    window.removeEventListener("resize", checkScrollPosition);
                }
            })["Tabs.useEffect"];
        }
    }["Tabs.useEffect"], [
        tabs
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tabs.useEffect": ()=>{
            if (isInitialMount.current) {
                isInitialMount.current = false;
                return;
            }
            const container = scrollContainerRef.current;
            if (!container) return;
            const activeButton = container.querySelector(`[data-tab="${activeTab}"]`);
            if (!activeButton) return;
            const buttonRect = activeButton.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const currentScrollLeft = container.scrollLeft;
            const targetLeft = currentScrollLeft + (buttonRect.left - containerRect.left) - container.clientWidth / 2 + buttonRect.width / 2;
            container.scrollTo({
                left: Math.max(0, targetLeft),
                behavior: "smooth"
            });
        }
    }["Tabs.useEffect"], [
        activeTab
    ]);
    const handleTabChange = (tabTitle)=>setActiveTab(tabTitle);
    const scrollLeft = ()=>scrollContainerRef.current?.scrollBy({
            left: -200,
            behavior: "smooth"
        });
    const scrollRight = ()=>scrollContainerRef.current?.scrollBy({
            left: 200,
            behavior: "smooth"
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full",
                children: [
                    showLeftArrow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: scrollLeft,
                        className: "md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm border border-gray-300 shadow-lg rounded-full w-8 h-8 flex items-center justify-center text-[#213554] hover:bg-[#213554] hover:text-white transition-all duration-300 active:scale-95",
                        "aria-label": "Scroll left",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaChevronLeft"], {
                            size: 14
                        }, void 0, false, {
                            fileName: "[project]/components/shared/ui/Tabs.tsx",
                            lineNumber: 104,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/shared/ui/Tabs.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this),
                    showRightArrow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: scrollRight,
                        className: "md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm border border-gray-300 shadow-lg rounded-full w-8 h-8 flex items-center justify-center text-[#213554] hover:bg-[#213554] hover:text-white transition-all duration-300 active:scale-95",
                        "aria-label": "Scroll right",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaChevronRight"], {
                            size: 14
                        }, void 0, false, {
                            fileName: "[project]/components/shared/ui/Tabs.tsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/shared/ui/Tabs.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: scrollContainerRef,
                        className: "flex gap-2 bg-gradient-to-r from-gray-50 to-gray-100 p-1.5 rounded-2xl overflow-x-auto overflow-y-hidden whitespace-nowrap border border-gray-200 md:justify-between scrollbar-hide w-full min-w-0",
                        style: {
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            WebkitOverflowScrolling: "touch"
                        },
                        children: tabs.map((tab)=>{
                            const isActive = activeTab === tab.title;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                "data-tab": tab.title,
                                className: `relative px-4 sm:px-6 py-3 sm:py-3.5 cursor-pointer transition-all duration-300 ease-in-out rounded-xl text-xs sm:text-sm font-semibold overflow-hidden group flex-shrink-0 md:flex-1 ${isActive ? "bg-gradient-to-r from-[#213554] to-[#213554]/90 shadow-lg" : `hover:bg-white/80 hover:text-[#213554] text-gray-600 hover:shadow-md hover:scale-105 ${className || ""}`}`,
                                onClick: ()=>handleTabChange(tab.title),
                                style: isActive ? {
                                    color: "#ffffff"
                                } : {},
                                children: [
                                    isActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/ui/Tabs.tsx",
                                        lineNumber: 136,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute inset-0 bg-gradient-to-r from-transparent via-[#213554]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/ui/Tabs.tsx",
                                        lineNumber: 138,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative z-10 whitespace-nowrap",
                                        style: isActive ? {
                                            color: "#ffffff"
                                        } : {},
                                        children: tab.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/ui/Tabs.tsx",
                                        lineNumber: 140,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, tab.title, true, {
                                fileName: "[project]/components/shared/ui/Tabs.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/shared/ui/Tabs.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/ui/Tabs.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 relative w-full min-w-0",
                children: tabs.map((tab)=>{
                    const isActive = activeTab === tab.title;
                    if (!isActive) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-full min-w-0 ${direction === "right" ? "animate-slideInRight" : "animate-slideInLeft"}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-fadeInUp w-full min-w-0",
                            children: tab.content
                        }, void 0, false, {
                            fileName: "[project]/components/shared/ui/Tabs.tsx",
                            lineNumber: 154,
                            columnNumber: 15
                        }, this)
                    }, tab.title, false, {
                        fileName: "[project]/components/shared/ui/Tabs.tsx",
                        lineNumber: 153,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/shared/ui/Tabs.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shared/ui/Tabs.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_s(Tabs, "rPjrWDSftziG1Ypue2yuwyLPsdg=");
_c = Tabs;
var _c;
__turbopack_context__.k.register(_c, "Tabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/entities/product/ui/ProducedCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProducedCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
"use client";
;
;
function ProducedCard({ data }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-transparent rounded-md p-2 sm:p-4 w-full min-w-0",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid sm:grid-cols-3 grid-cols-1 gap-4 sm:gap-6 items-stretch w-full",
            children: data.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-1 bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 min-h-[220px] sm:min-h-[240px] hover:-translate-y-2 hover:shadow-xl transform transition-all duration-300 ease-in-out group relative overflow-hidden min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-gradient-to-br from-[#213554]/5 via-transparent to-[#EE334B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        }, void 0, false, {
                            fileName: "[project]/components/entities/product/ui/ProducedCard.tsx",
                            lineNumber: 23,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#213554] to-[#213554]/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#ffffff"
                                },
                                className: "text-white font-bold text-sm sm:text-base",
                                children: index + 1
                            }, void 0, false, {
                                fileName: "[project]/components/entities/product/ui/ProducedCard.tsx",
                                lineNumber: 25,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/entities/product/ui/ProducedCard.tsx",
                            lineNumber: 24,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative z-10 flex flex-col h-full pt-8 sm:pt-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4 flex justify-center sm:justify-start",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#EE334B] to-[#EE334B]/80 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaCheckCircle"], {
                                            className: "text-white text-lg sm:text-xl"
                                        }, void 0, false, {
                                            fileName: "[project]/components/entities/product/ui/ProducedCard.tsx",
                                            lineNumber: 32,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/entities/product/ui/ProducedCard.tsx",
                                        lineNumber: 31,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/entities/product/ui/ProducedCard.tsx",
                                    lineNumber: 30,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg sm:text-xl font-bold text-[#213554] mb-3 sm:mb-4 text-center sm:text-left group-hover:text-[#EE334B] transition-colors duration-300 leading-tight break-words",
                                    children: item.title
                                }, void 0, false, {
                                    fileName: "[project]/components/entities/product/ui/ProducedCard.tsx",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm sm:text-base text-gray-600 leading-relaxed flex-grow text-center sm:text-left group-hover:text-gray-700 transition-colors duration-300 break-words",
                                    children: item.desc
                                }, void 0, false, {
                                    fileName: "[project]/components/entities/product/ui/ProducedCard.tsx",
                                    lineNumber: 38,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/entities/product/ui/ProducedCard.tsx",
                            lineNumber: 29,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#213554] via-[#EE334B] to-[#213554] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                        }, void 0, false, {
                            fileName: "[project]/components/entities/product/ui/ProducedCard.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this)
                    ]
                }, item.title, true, {
                    fileName: "[project]/components/entities/product/ui/ProducedCard.tsx",
                    lineNumber: 19,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/entities/product/ui/ProducedCard.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/entities/product/ui/ProducedCard.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = ProducedCard;
var _c;
__turbopack_context__.k.register(_c, "ProducedCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/widgets/home/CustomPackagingProduced.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomPackagingProduced
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$ui$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/ui/Tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$entities$2f$product$2f$ui$2f$ProducedCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/entities/product/ui/ProducedCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function CustomPackagingProduced() {
    _s();
    const customBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CustomPackagingProduced.useMemo[customBox]": ()=>[
                {
                    id: 1,
                    title: "Price Quote",
                    data: [
                        {
                            title: "Instant Price Quote",
                            desc: "Get an instant price quote for your customized packaging project within 20 minutes. You can submit a form, email, or call us."
                        },
                        {
                            title: "Price Matching",
                            desc: "Match the price with your budget and let us know about it. We will try our best to give you the economical price quote."
                        },
                        {
                            title: "Price Approval",
                            desc: "Give us approval on the prices so that we can proceed with the order. You will find us the best in the custom packaging line."
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Design Approval",
                    data: [
                        {
                            title: "Mockup Designing",
                            desc: "Send us your artwork so that we can design a 3D digital mockup of the box. If you have/are a designer, then you can ask for a dieline as well."
                        },
                        {
                            title: "Artwork Revisions",
                            desc: "If you find any mistakes or have any suggestions, ask for the revisions until satisfied."
                        },
                        {
                            title: "Mockup Approval",
                            desc: "After receiving the 3D digital mockup of the box, please give us approval on the mockup if everything looks good to you."
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Payment",
                    data: [
                        {
                            title: "Credit/Debit Card",
                            desc: "Make the payment by requesting a payment link from your representative using your debit or credit card via a secure merchant."
                        },
                        {
                            title: "Wire/ACH Transfer",
                            desc: "Make the payment through ACH or Wire Transfer to our bank if best suited. Request our bank account details."
                        },
                        {
                            title: "PayPal / Google Pay",
                            desc: "Transfer the amount by requesting a PayPal invoice or use Google Pay."
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Production",
                    data: [
                        {
                            title: "Final Approval",
                            desc: "We send a final specification sheet with all necessary details of your project for final approval."
                        },
                        {
                            title: "Prototyping/Sampling",
                            desc: "We do a sample run if requested or needed to make the best version of the final products. Approval required."
                        },
                        {
                            title: "The Production",
                            desc: "We start production after final approval or sample approval. The order is produced as per the committed time."
                        }
                    ]
                },
                {
                    id: 5,
                    title: "Shipping",
                    data: [
                        {
                            title: "QC Analysis",
                            desc: "After production, our quality control department operates the QC analysis to ensure quality."
                        },
                        {
                            title: "Shipping",
                            desc: "The order is shipped after QC. Tracking ID is provided with updates until delivery."
                        },
                        {
                            title: "Customer’s Feedback",
                            desc: "We urge customers to give feedback on the project delivered."
                        }
                    ]
                },
                {
                    id: 6,
                    title: "Recorders",
                    data: [
                        {
                            title: "Dedicated Support Person",
                            desc: "We appoint a dedicated support person to your upcoming projects to keep you in the loop."
                        },
                        {
                            title: "Heavy Discounts",
                            desc: "We inform you of bulk order, month-end, and occasional discounts to save big."
                        },
                        {
                            title: "Ultimate Business Partnership",
                            desc: "We provide the best to take this business relationship to new heights."
                        }
                    ]
                }
            ]
    }["CustomPackagingProduced.useMemo[customBox]"], []);
    const tabs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CustomPackagingProduced.useMemo[tabs]": ()=>customBox.map({
                "CustomPackagingProduced.useMemo[tabs]": (box)=>({
                        title: box.title,
                        content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$entities$2f$product$2f$ui$2f$ProducedCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            data: box.data
                        }, void 0, false, {
                            fileName: "[project]/components/widgets/home/CustomPackagingProduced.tsx",
                            lineNumber: 71,
                            columnNumber: 18
                        }, this)
                    })
            }["CustomPackagingProduced.useMemo[tabs]"])
    }["CustomPackagingProduced.useMemo[tabs]"], [
        customBox
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-[#F7F7F7] py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-[95%] sm:max-w-8xl sm:p-4 rounded-xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center pb-3 px-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "sm:text-[35px] text-[25px] font-sans font-[600] text-[#333333]",
                            children: "5 Simple Steps to Get Your Custom Packaging"
                        }, void 0, false, {
                            fileName: "[project]/components/widgets/home/CustomPackagingProduced.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "py-3 text-gray-600",
                            children: "X Custom Packaging is a one-stop shop where you can meet your every packaging demand. We made order placement as easy as child’s play."
                        }, void 0, false, {
                            fileName: "[project]/components/widgets/home/CustomPackagingProduced.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/widgets/home/CustomPackagingProduced.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$ui$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        defaultTab: "Price Quote",
                        className: "bg-white",
                        tabs: tabs
                    }, void 0, false, {
                        fileName: "[project]/components/widgets/home/CustomPackagingProduced.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/widgets/home/CustomPackagingProduced.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/widgets/home/CustomPackagingProduced.tsx",
            lineNumber: 78,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/widgets/home/CustomPackagingProduced.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(CustomPackagingProduced, "SMJw9JZJwwFOPRW/W/BzDb2FPzU=");
_c = CustomPackagingProduced;
var _c;
__turbopack_context__.k.register(_c, "CustomPackagingProduced");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/widgets/home/PackagingJourney.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/swiper/swiper-react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/swiper/modules/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$navigation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_context__.i("[project]/node_modules/swiper/modules/navigation.mjs [app-client] (ecmascript) <export default as Navigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$autoplay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Autoplay$3e$__ = __turbopack_context__.i("[project]/node_modules/swiper/modules/autoplay.mjs [app-client] (ecmascript) <export default as Autoplay>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/assets.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const PackagingJourney = ()=>{
    _s();
    const journeyItems = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "PackagingJourney.useMemo[journeyItems]": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSETS"].videos.gallery.map({
                "PackagingJourney.useMemo[journeyItems]": (video, index)=>({
                        _id: `static-video-${index}`,
                        video,
                        isStatic: true
                    })
            }["PackagingJourney.useMemo[journeyItems]"]);
        }
    }["PackagingJourney.useMemo[journeyItems]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "pt-10 pb-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sm:max-w-8xl max-w-[95%] mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-block mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-1 bg-gradient-to-r from-[#EE334B] to-[#213554] mx-auto rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                                lineNumber: 23,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl sm:text-4xl font-bold text-[#213554] mb-4",
                            children: "Your Packaging Journey Starts Here!"
                        }, void 0, false, {
                            fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 text-base sm:text-lg max-w-4xl mx-auto",
                            children: "Discover how quality packaging makes all the difference! Experience real client experiences, expert tips, and innovative packaging solutions that enhance brands. From custom designs to seamless functionality, see how we bring packaging visions to life."
                        }, void 0, false, {
                            fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Swiper"], {
                            modules: [
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$navigation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"],
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$autoplay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Autoplay$3e$__["Autoplay"]
                            ],
                            spaceBetween: 20,
                            slidesPerView: "auto",
                            navigation: {
                                prevEl: ".journey-prev",
                                nextEl: ".journey-next"
                            },
                            autoplay: {
                                delay: 3000,
                                disableOnInteraction: false
                            },
                            loop: journeyItems.length > 4,
                            className: "journey-swiper !pb-10",
                            children: journeyItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwiperSlide"], {
                                    className: "!w-[280px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 group/card",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                            src: item.video,
                                            autoPlay: true,
                                            loop: true,
                                            muted: true,
                                            playsInline: true,
                                            className: "w-full h-full object-cover",
                                            children: "Your browser does not support the video tag."
                                        }, void 0, false, {
                                            fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                                            lineNumber: 55,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                                        lineNumber: 54,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, item._id || index, false, {
                                    fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "journey-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-[#213554] hover:bg-[#EE334B] hover:text-white transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-0 hidden lg:flex",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M15 19l-7-7 7-7"
                                }, void 0, false, {
                                    fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "journey-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-[#213554] hover:bg-[#EE334B] hover:text-white transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-0 hidden lg:flex",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M9 5l7 7-7 7"
                                }, void 0, false, {
                                    fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                                    lineNumber: 93,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/widgets/home/PackagingJourney.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PackagingJourney, "NdSR55UKpMdvyFmV2QREDm6g3Yg=");
_c = PackagingJourney;
const __TURBOPACK__default__export__ = /*#__PURE__*/ _c1 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(PackagingJourney);
var _c, _c1;
__turbopack_context__.k.register(_c, "PackagingJourney");
__turbopack_context__.k.register(_c1, "%default%");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/widgets/home/CreativeGallery.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const CreativeGallery = ({ products = [], title, description })=>{
    _s();
    const images = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CreativeGallery.useMemo[images]": ()=>{
            if (products && products.length > 0) {
                return products.slice(0, 5).map({
                    "CreativeGallery.useMemo[images]": (product, index)=>({
                            id: product._id || String(index),
                            url: product?.images?.[0]?.url ? `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiBase"]}/${product.images[0].url.replace(/^\//, "")}` : "/assets/images/placeholder.jpg",
                            title: product?.name || `Product ${index + 1}`,
                            slug: product?.slug
                        })
                }["CreativeGallery.useMemo[images]"]);
            }
            return [];
        }
    }["CreativeGallery.useMemo[images]"], [
        products
    ]);
    const [activeImage, setActiveImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreativeGallery.useEffect": ()=>{
            if (images.length > 0 && !activeImage) {
                setActiveImage(images[0].url);
            }
        }
    }["CreativeGallery.useEffect"], [
        images,
        activeImage
    ]);
    if (!products || products.length === 0 || images.length === 0) {
        return null;
    }
    const currentItem = images.find((img)=>img.url === activeImage) || images[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "jsx-eaf28608dce953c6" + " " + "bg-white py-10 px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-eaf28608dce953c6" + " " + "sm:max-w-8xl max-w-[95%] mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-eaf28608dce953c6" + " " + "text-center mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-eaf28608dce953c6" + " " + "inline-block mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-eaf28608dce953c6" + " " + "w-20 h-1 bg-gradient-to-r from-[#EE334B] to-[#213554] mx-auto rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "jsx-eaf28608dce953c6" + " " + "text-3xl sm:text-4xl font-bold text-[#213554] mb-2 uppercase tracking-tight",
                                children: title || "Your Packaging Journey Starts Here!"
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-eaf28608dce953c6" + " " + "text-gray-600 text-lg max-w-4xl mx-auto",
                                children: description || "Discover how quality packaging makes all the difference! Experience real client experiences, expert tips, and innovative packaging solutions that enhance brands."
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-eaf28608dce953c6" + " " + "grid grid-cols-1 md:grid-cols-12 gap-6 mb-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-eaf28608dce953c6" + " " + "md:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-xl shadow-slate-200/50 border border-gray-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-eaf28608dce953c6" + " " + "overflow-hidden rounded-[2rem] h-[400px] sm:h-[450px] md:h-[500px] relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: activeImage || images[0].url,
                                            alt: currentItem?.title || "Featured Packaging",
                                            fill: true,
                                            className: "object-cover transition-transform duration-700 group-hover:scale-105",
                                            priority: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        currentItem?.slug && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/product/${currentItem.slug}`,
                                            className: "absolute inset-0 z-10"
                                        }, void 0, false, {
                                            fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                            lineNumber: 71,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-eaf28608dce953c6" + " " + "md:col-span-4 flex flex-col gap-4 sm:gap-6",
                                children: [
                                    images[1] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-eaf28608dce953c6" + " " + "h-[180px] sm:h-[220px] md:h-[240px] group relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-lg border border-gray-100 relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: images[1].url,
                                                alt: images[1].title || "Detail",
                                                fill: true,
                                                className: "object-cover rounded-[1.5rem] p-3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                                lineNumber: 83,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            images[1].slug && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/product/${images[1].slug}`,
                                                className: "absolute inset-0 z-10"
                                            }, void 0, false, {
                                                fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                                lineNumber: 90,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-eaf28608dce953c6" + " " + "grid grid-cols-2 gap-3 sm:gap-4 flex-1",
                                        children: [
                                            images[2] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-eaf28608dce953c6" + " " + "h-full min-h-[180px] rounded-[1.5rem] overflow-hidden border-2 border-gray-100 p-1 bg-white relative group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: images[2].url,
                                                        alt: images[2].title || "Detail 2",
                                                        fill: true,
                                                        className: "object-cover rounded-[1.2rem] p-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    images[2].slug && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/product/${images[2].slug}`,
                                                        className: "absolute inset-0 z-10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                                        lineNumber: 107,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                                lineNumber: 99,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            images[3] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-eaf28608dce953c6" + " " + "h-full min-h-[180px] rounded-[1.5rem] overflow-hidden border-2 border-gray-100 p-1 bg-white relative group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: images[3].url,
                                                        alt: images[3].title || "Detail 3",
                                                        fill: true,
                                                        className: "object-cover rounded-[1.2rem] p-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                                        lineNumber: 116,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    images[3].slug && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/product/${images[3].slug}`,
                                                        className: "absolute inset-0 z-10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                                lineNumber: 115,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-eaf28608dce953c6" + " " + "relative group",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-eaf28608dce953c6" + " " + "flex items-center gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar",
                            children: images.map((img)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveImage(img.url),
                                    className: "jsx-eaf28608dce953c6" + " " + `flex-shrink-0 w-32 h-20 rounded-2xl overflow-hidden border-4 transition-all duration-300 relative ${activeImage === img.url ? "border-[#EE334B] scale-105 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: img.url,
                                        fill: true,
                                        className: "object-cover",
                                        alt: img.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                        lineNumber: 147,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, img.id, false, {
                                    fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "eaf28608dce953c6",
                children: ".no-scrollbar.jsx-eaf28608dce953c6::-webkit-scrollbar{display:none}.no-scrollbar.jsx-eaf28608dce953c6{-ms-overflow-style:none;scrollbar-width:none}"
            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/widgets/home/CreativeGallery.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CreativeGallery, "l+p1j7/WLtNKePS5g90KWebH0/w=");
_c = CreativeGallery;
const __TURBOPACK__default__export__ = CreativeGallery;
var _c;
__turbopack_context__.k.register(_c, "CreativeGallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/shared/marketing/TrustBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/ui/Button.tsx [app-client] (ecmascript)");
"use client";
;
;
;
const TrustBanner = ({ categoryName = "Apparel Packaging" })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-[#F7F7F7] py-4 border-y border-gray-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sm:max-w-8xl max-w-[95%] mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 text-center md:text-left",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-bold leading-tight flex flex-wrap gap-2 justify-center md:justify-start items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-900 text-lg md:text-xl lg:text-2xl",
                                    children: "Customers Trust Us for their"
                                }, void 0, false, {
                                    fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
                                    lineNumber: 18,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#EE334B] text-lg md:text-xl lg:text-2xl",
                                    children: categoryName
                                }, void 0, false, {
                                    fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
                                    lineNumber: 21,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
                            lineNumber: 17,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
                        lineNumber: 16,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row items-center gap-6 md:gap-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm md:text-base font-medium text-gray-600 whitespace-nowrap",
                                        children: "Serving 5000+ Happy Customers!"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
                                        lineNumber: 29,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative w-32 h-10",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "/assets/images/footer/trust.png",
                                                    alt: "Trustpilot",
                                                    fill: true,
                                                    className: "object-contain"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
                                                    lineNumber: 34,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
                                                lineNumber: 33,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-bold text-gray-900",
                                                children: "4.9/5"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
                                                lineNumber: 41,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
                                        lineNumber: 32,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                label: "Write a Review",
                                className: "bg-[#213554] hover:bg-[#EE334B] text-white font-bold px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap transform hover:-translate-y-0.5"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
                lineNumber: 14,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/shared/marketing/TrustBanner.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = TrustBanner;
const __TURBOPACK__default__export__ = TrustBanner;
var _c;
__turbopack_context__.k.register(_c, "TrustBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/entities/product/ui/ServiceSelectionCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
"use client";
;
;
;
const ServiceSelectionCard = ({ items = [] })=>{
    if (!items || items.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#F7F7F7] border-b border-gray-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sm:max-w-8xl max-w-[95%] mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap justify-center items-stretch",
                children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 py-6 px-4 flex-1 min-w-[200px] justify-center md:justify-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-shrink-0",
                                        children: item.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-12 flex items-center justify-center relative",
                                            children: typeof item.icon === "string" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: item.icon,
                                                alt: item.title,
                                                width: 48,
                                                height: 48,
                                                className: "opacity-90 object-contain",
                                                style: {
                                                    filter: "saturate(100%) invert(0%)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/entities/product/ui/ServiceSelectionCard.tsx",
                                                lineNumber: 30,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)) : item.icon
                                        }, void 0, false, {
                                            fileName: "[project]/components/entities/product/ui/ServiceSelectionCard.tsx",
                                            lineNumber: 28,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/entities/product/ui/ServiceSelectionCard.tsx",
                                        lineNumber: 26,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                                className: "text-sm font-bold text-[#213554] uppercase tracking-wider leading-tight",
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/components/entities/product/ui/ServiceSelectionCard.tsx",
                                                lineNumber: 46,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] md:text-xs text-gray-500 mt-1 font-medium",
                                                children: item.description
                                            }, void 0, false, {
                                                fileName: "[project]/components/entities/product/ui/ServiceSelectionCard.tsx",
                                                lineNumber: 50,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/entities/product/ui/ServiceSelectionCard.tsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/entities/product/ui/ServiceSelectionCard.tsx",
                                lineNumber: 25,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            index < items.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px bg-gray-200 self-stretch my-6 hidden md:block"
                            }, void 0, false, {
                                fileName: "[project]/components/entities/product/ui/ServiceSelectionCard.tsx",
                                lineNumber: 58,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, item.id || index, true, {
                        fileName: "[project]/components/entities/product/ui/ServiceSelectionCard.tsx",
                        lineNumber: 24,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/components/entities/product/ui/ServiceSelectionCard.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/entities/product/ui/ServiceSelectionCard.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/entities/product/ui/ServiceSelectionCard.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ServiceSelectionCard;
const __TURBOPACK__default__export__ = ServiceSelectionCard;
var _c;
__turbopack_context__.k.register(_c, "ServiceSelectionCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/widgets/home/CategoryTestimonials.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/swiper/swiper-react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/swiper/modules/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$autoplay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Autoplay$3e$__ = __turbopack_context__.i("[project]/node_modules/swiper/modules/autoplay.mjs [app-client] (ecmascript) <export default as Autoplay>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const CategoryTestimonials = ()=>{
    _s();
    const [ratings, setRatings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedIndex, setSelectedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const swiperRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryTestimonials.useEffect": ()=>{
            const fetchRatings = {
                "CategoryTestimonials.useEffect.fetchRatings": async ()=>{
                    try {
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGet"])("/rating/getAll");
                        const data = Array.isArray(response?.data) ? response.data : [];
                        setRatings(data);
                        if (data.length > 0) {
                            setSelectedIndex(0);
                        }
                    } catch (error) {
                        console.error("Error fetching ratings:", error);
                    } finally{
                        setLoading(false);
                    }
                }
            }["CategoryTestimonials.useEffect.fetchRatings"];
            fetchRatings();
        }
    }["CategoryTestimonials.useEffect"], []);
    const handleProfileClick = (index)=>{
        setSelectedIndex(index);
        if (swiperRef.current && swiperRef.current.swiper) {
            const swiper = swiperRef.current.swiper;
            if (ratings.length > 1 && swiper.params.loop) {
                swiper.slideToLoop(index);
            } else {
                swiper.slideTo(index);
            }
        }
    };
    const handleSlideChange = (swiper)=>{
        let realIndex = swiper.activeIndex;
        if (ratings.length > 1 && swiper.params.loop) {
            realIndex = swiper.realIndex;
        }
        setSelectedIndex(realIndex);
    };
    const getInitials = (name)=>{
        if (!name) return "AN";
        const names = name.trim().split(" ");
        if (names.length >= 2) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };
    const getAvatarColor = (name)=>{
        const colors = [
            "bg-gradient-to-br from-[#EE334B] to-[#EE334B]/80",
            "bg-gradient-to-br from-[#213554] to-[#213554]/80",
            "bg-gradient-to-br from-[#2D5016] to-[#2D5016]/80",
            "bg-gradient-to-br from-purple-500 to-purple-600",
            "bg-gradient-to-br from-blue-500 to-blue-600",
            "bg-gradient-to-br from-green-500 to-green-600"
        ];
        if (!name) return colors[0];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };
    if (loading) return null;
    if (ratings.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-white pt-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sm:max-w-8xl mx-auto w-[95%]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex sm:flex-row flex-col items-center gap-8 lg:gap-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sm:w-6/12 w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl sm:text-4xl font-bold text-[#333333] mb-2 uppercase tracking-tight",
                                children: "CLIENT TESTIMONIAL"
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[#333333] text-sm sm:text-base mb-6 font-medium",
                                children: "GET TO KNOW ALL ABOUT OUR SERVICE THROUGH VARIOUS BUSINESS CLIENTS."
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[#FFD700] text-6xl sm:text-7xl font-serif leading-none mb-2",
                                children: '"'
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Swiper"], {
                                    ref: swiperRef,
                                    modules: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$autoplay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Autoplay$3e$__["Autoplay"]
                                    ],
                                    autoplay: {
                                        delay: 4000,
                                        disableOnInteraction: false,
                                        pauseOnMouseEnter: true
                                    },
                                    onSlideChange: handleSlideChange,
                                    loop: ratings.length > 1,
                                    className: "testimonial-swiper",
                                    children: ratings.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwiperSlide"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pr-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 mb-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ${getAvatarColor(item.name)}`,
                                                                children: getInitials(item.name)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                                                lineNumber: 119,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "font-bold text-[#333333] text-base leading-tight",
                                                                        children: item.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                                                        lineNumber: 127,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-[#666666] font-medium mt-0.5",
                                                                        children: "Verified Customer"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                                                        lineNumber: 130,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                                                lineNumber: 126,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[#333333] text-base sm:text-lg italic mb-6 leading-relaxed",
                                                        children: item.comment
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            ...Array(5)
                                                        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaStar"], {
                                                                size: 18,
                                                                className: i < (item.rating || 0) ? "text-[#FFD700]" : "text-gray-200"
                                                            }, i, false, {
                                                                fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                                                lineNumber: 142,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                                lineNumber: 117,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, item._id, false, {
                                            fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                            lineNumber: 116,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                    lineNumber: 103,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sm:w-5/12 w-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative aspect-[4/3] w-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/assets/images/category-review.webp",
                                alt: "Category Review",
                                fill: true,
                                className: "object-contain",
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                                lineNumber: 163,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
                lineNumber: 86,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/widgets/home/CategoryTestimonials.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CategoryTestimonials, "xxwhTg+2QBWOlEJXyVohX9ouVEU=");
_c = CategoryTestimonials;
const __TURBOPACK__default__export__ = /*#__PURE__*/ _c1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(CategoryTestimonials);
var _c, _c1;
__turbopack_context__.k.register(_c, "CategoryTestimonials");
__turbopack_context__.k.register(_c1, "%default%");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_98212363._.js.map