module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/api.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiBase",
    ()=>apiBase,
    "apiGet",
    ()=>apiGet,
    "getBannerAll",
    ()=>getBannerAll,
    "getBlogBySlug",
    ()=>getBlogBySlug,
    "getBlogsAll",
    ()=>getBlogsAll,
    "getBrandBySlug",
    ()=>getBrandBySlug,
    "getBrandsAll",
    ()=>getBrandsAll,
    "getCategoriesAll",
    ()=>getCategoriesAll,
    "getCategoriesByBrandId",
    ()=>getCategoriesByBrandId,
    "getCategoryBySlug",
    ()=>getCategoryBySlug,
    "getCategoryProducts",
    ()=>getCategoryProducts,
    "getFaqAll",
    ()=>getFaqAll,
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProductsAll",
    ()=>getProductsAll
]);
const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "https://xcustompackaging.com";
async function fetchJson(path, opts) {
    const url = `${apiBase}${path.startsWith("/") ? "" : "/"}${path}`;
    const init = typeof opts?.revalidate === "number" ? {
        next: {
            revalidate: opts.revalidate
        }
    } : {
        cache: "no-store"
    };
    const res = await fetch(url, init);
    if (!res.ok) return null;
    try {
        return await res.json();
    } catch  {
        return null;
    }
}
async function apiGet(path, opts) {
    return fetchJson(path, opts);
}
async function getBrandsAll(revalidate = 3600) {
    const r = await fetchJson("/brands/getAll", {
        revalidate
    });
    return Array.isArray(r?.data) ? r.data : [];
}
async function getBrandBySlug(slug, revalidate = 600) {
    const r = await fetchJson(`/brands/get?slug=${slug}`, {
        revalidate
    });
    return r?.data || null;
}
async function getCategoriesAll(revalidate = 3600) {
    const r = await fetchJson("/category/getAll", {
        revalidate
    });
    return Array.isArray(r?.data) ? r.data : [];
}
async function getCategoriesByBrandId(brandId, page = 1, perPage = 100, revalidate = 600) {
    if (!brandId) return [];
    const r = await fetchJson(`/category/getAll?page=${page}&perPage=${perPage}&brandId=${brandId}`, {
        revalidate
    });
    if (Array.isArray(r?.data)) return r.data;
    if (Array.isArray(r?.data?.data)) return r.data.data;
    return [];
}
async function getCategoryBySlug(slug, revalidate = 600) {
    const r = await fetchJson(`/category/get?slug=${slug}`, {
        revalidate
    });
    return r?.data || null;
}
async function getCategoryProducts(categoryId, page, revalidate = 600) {
    const qp = page ? `?page=${page}` : "";
    const r = await fetchJson(`/products/categoryProducts/${categoryId}${qp}`, {
        revalidate
    });
    return Array.isArray(r?.data) ? r.data : [];
}
async function getProductsAll(page = 1, perPage = 20, revalidate = 600) {
    const r = await fetchJson(`/products/getAll?page=${page}&perPage=${perPage}`, {
        revalidate
    });
    return Array.isArray(r?.data) ? r.data : [];
}
async function getProductBySlug(slug, revalidate = 600) {
    const r = await fetchJson(`/products/get?slug=${slug}`, {
        revalidate
    });
    return r?.data || null;
}
async function getBlogsAll(revalidate = 3600) {
    const r = await fetchJson("/blog/getAll", {
        revalidate
    });
    return Array.isArray(r?.data) ? r.data : [];
}
async function getBlogBySlug(slug, revalidate = 600) {
    const r = await fetchJson(`/blog/get?slug=${slug}`, {
        revalidate
    });
    return r?.data || null;
}
async function getBannerAll(revalidate = 600) {
    const r = await fetchJson("/banner/getAll", {
        revalidate
    });
    return Array.isArray(r?.data) ? r.data : [];
}
async function getFaqAll(revalidate = 3600) {
    const r = await fetchJson("/faq/getAll", {
        revalidate
    });
    return Array.isArray(r?.data) ? r.data : [];
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/home/Hero'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/BottomHero'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/CategoryBoxes'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/OfferCard'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/Category'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/PackagingBanner'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/BannerContent'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/FAQ'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/CustomPackagingProduced'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/GetPriceQuote'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/AddonsAndInserts'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/CustomPackagingApart'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/CustomBoxMaterial'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/WeFulfil'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/InspirationPackaging'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/PersonalTestimonial'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/home/Blog'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
async function loadHome() {
    const [products, faqs, bannerList, brands] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductsAll"])(1, 8, 600),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFaqAll"])(3600),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBannerAll"])(600),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBrandsAll"])(3600)
    ]);
    const banner = Array.isArray(bannerList) && bannerList[0] ? bannerList[0] : null;
    return {
        topProducts: products,
        faqs,
        banner,
        brands
    };
}
async function Home() {
    const data = await loadHome();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Hero, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(BottomHero, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryBoxes, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(OfferCard, {
                discount: "Get 40%",
                title: "Saving on Buying the Bulk",
                subTitle: "Limited time offer"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Category, {
                serverData: data.topProducts
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomBoxMaterial, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomPackagingProduced, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(GetPriceQuote, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(AddonsAndInserts, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomPackagingApart, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(PackagingBanner, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(WeFulfil, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(InspirationPackaging, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(PersonalTestimonial, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(BannerContent, {
                banner: data.banner
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(FAQ, {
                items: data.faqs
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Blog, {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
async function generateMetadata() {
    return {
        title: "Affordable, High-Quality Custom Packaging Boxes – Wholesale",
        description: "Get high-quality custom packaging boxes at wholesale prices. Affordable packaging for all sizes. Bulk discounts, free design support, and fast shipping.",
        keywords: [
            "x custom packaging",
            "wholesale boxes",
            "packaging solutions",
            "custom boxes",
            "eco-friendly packaging"
        ],
        robots: {
            index: false,
            follow: false
        },
        alternates: {
            canonical: "https://xcustompackaging.com"
        },
        openGraph: {
            type: "website",
            url: "https://xcustompackaging.com",
            title: "Affordable, High-Quality Custom Packaging Boxes – Wholesale",
            description: "Get high-quality custom packaging boxes at wholesale prices. Affordable packaging for all sizes. Bulk discounts, free design support, and fast shipping."
        },
        twitter: {
            card: "summary_large_image",
            title: "Affordable, High-Quality Custom Packaging Boxes – Wholesale",
            description: "Get high-quality custom packaging boxes at wholesale prices. Affordable packaging for all sizes. Bulk discounts, free design support, and fast shipping."
        }
    };
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cb13a68f._.js.map