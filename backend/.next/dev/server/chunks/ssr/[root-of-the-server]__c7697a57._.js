module.exports = [
"[next]/internal/font/google/inter_7b064e0d.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "inter_7b064e0d-module__MOT0tq__className",
  "variable": "inter_7b064e0d-module__MOT0tq__variable",
});
}),
"[next]/internal/font/google/inter_7b064e0d.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_7b064e0d$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_7b064e0d.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_7b064e0d$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Inter', 'Inter Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_7b064e0d$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_7b064e0d$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/geist_mono_8d43a2aa.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geist_mono_8d43a2aa-module__8Li5zG__className",
  "variable": "geist_mono_8d43a2aa-module__8Li5zG__variable",
});
}),
"[next]/internal/font/google/geist_mono_8d43a2aa.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_mono_8d43a2aa.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Geist Mono', 'Geist Mono Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
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
    if (r?.data && typeof r.data === "object" && Array.isArray(r.data.data)) return r.data.data;
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
"[project]/components/widgets/header/HeaderClient.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/widgets/header/HeaderClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/widgets/header/HeaderClient.tsx <module evaluation>", "default");
}),
"[project]/components/widgets/header/HeaderClient.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/widgets/header/HeaderClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/widgets/header/HeaderClient.tsx", "default");
}),
"[project]/components/widgets/header/HeaderClient.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$widgets$2f$header$2f$HeaderClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/widgets/header/HeaderClient.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$widgets$2f$header$2f$HeaderClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/widgets/header/HeaderClient.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$widgets$2f$header$2f$HeaderClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/widgets/header/Header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$widgets$2f$header$2f$HeaderClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/widgets/header/HeaderClient.tsx [app-rsc] (ecmascript)");
;
;
;
async function Header() {
    const brands = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBrandsAll"])(300);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$widgets$2f$header$2f$HeaderClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        initialBrands: Array.isArray(brands) ? brands : []
    }, void 0, false, {
        fileName: "[project]/components/widgets/header/Header.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/widgets/footer/Footer.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/widgets/footer/Footer.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/widgets/footer/Footer.tsx <module evaluation>", "default");
}),
"[project]/components/widgets/footer/Footer.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/widgets/footer/Footer.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/widgets/footer/Footer.tsx", "default");
}),
"[project]/components/widgets/footer/Footer.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$widgets$2f$footer$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/widgets/footer/Footer.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$widgets$2f$footer$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/widgets/footer/Footer.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$widgets$2f$footer$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata,
    "viewport",
    ()=>viewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_7b064e0d$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_7b064e0d.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_mono_8d43a2aa.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$widgets$2f$header$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/widgets/header/Header.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$widgets$2f$footer$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/widgets/footer/Footer.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
const viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover"
};
const metadata = {
    title: {
        default: "X Custom Packaging | Wholesale Custom Boxes",
        template: "%s | X Custom Packaging"
    },
    description: "Get high-quality custom packaging boxes at wholesale prices. Bulk discounts, free design support, and fast shipping across the US.",
    keywords: [
        "x custom packaging",
        "custom boxes",
        "wholesale boxes",
        "eco-friendly packaging",
        "packaging design"
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
        siteName: "X Custom Packaging",
        title: "X Custom Packaging | Wholesale Custom Boxes",
        description: "High-quality custom packaging boxes at wholesale prices. Free design support and fast shipping."
    },
    twitter: {
        card: "summary_large_image",
        title: "X Custom Packaging | Wholesale Custom Boxes",
        description: "High-quality custom packaging boxes at wholesale prices. Free design support and fast shipping."
    }
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            suppressHydrationWarning: true,
            className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_7b064e0d$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable} ${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable} antialiased`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$widgets$2f$header$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this),
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$widgets$2f$footer$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/layout.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c7697a57._.js.map