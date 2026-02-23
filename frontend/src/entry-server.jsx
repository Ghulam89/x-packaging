import React, { StrictMode, Suspense } from "react";
import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

/** Collect ReadableStream into a single HTML string (for SSR with Suspense/lazy) */
async function streamToHtml(stream) {
  const reader = stream.getReader();
  const chunks = [];
  while (true) {
    const { value, done } = await reader.read();
    if (value) chunks.push(value);
    if (done) break;
  }
  return Buffer.concat(chunks).toString("utf-8");
}
import App from "./App";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Static routes that are not brand/category slugs - skip brand API fetch for these
const STATIC_ROUTES = new Set([
  "/about-us", "/contact-us", "/shop", "/cart", "/checkout", "/blogs", "/reviews",
  "/my-account", "/terms-and-conditions", "/privacy-policy", "/portfolio", "/dielines",
  "/returns-refunds", "/shipping-policy", "/get-custom-quote", "/target-price"
]);

export async function render(url) {
  // SSR runs in Node: use absolute API URL (backend sets __API_ORIGIN__ before calling render)
  const apiOrigin = typeof globalThis !== "undefined" && globalThis.__API_ORIGIN__
    ? String(globalThis.__API_ORIGIN__).replace(/\/$/, "")
    : `http://localhost:${typeof process !== "undefined" && process.env?.PORT ? process.env.PORT : 9090}`;
  const BaseUrl = `${apiOrigin}/api`;

  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;
  const cleanUrl = normalizedUrl.endsWith("/")
    ? normalizedUrl.slice(0, -1)
    : normalizedUrl;

  // Remove query parameters
  const baseUrl = cleanUrl.split("?")[0];

  const helmetContext = {};
  let serverData = null;
  let CategoryProducts = null;
  let homePageData = null; // For home page: products, FAQ, banner
  let isHomePage = false;

  try {
    // Handle different routes - check in order of specificity
    isHomePage = baseUrl === "/" || baseUrl === "" || normalizedUrl === "/" || url === "/";

    if (isHomePage) {
      try {
        const [productsRes, faqRes, bannerRes] = await Promise.allSettled([
          axios.get(`${BaseUrl}/products/getAll?page=1&perPage=8`),
          axios.get(`${BaseUrl}/faq/getAll`),
          axios.get(`${BaseUrl}/banner/getAll`)
        ]);

        homePageData = {
          topProducts: productsRes.status === 'fulfilled' && productsRes.value?.data?.status === 'success'
            ? productsRes.value.data.data
            : [],
          faqs: faqRes.status === 'fulfilled' && faqRes.value?.data?.status === 'success'
            ? faqRes.value.data.data
            : [],
          banner: bannerRes.status === 'fulfilled' && bannerRes.value?.data?.data?.[0]
            ? bannerRes.value.data.data[0]
            : null
        };
      } catch (homeErr) {
        console.error('SSR: Home page data fetch error:', homeErr.message, homeErr.stack);
      }

    } else if (baseUrl.startsWith("/blog/")) {
      // Handle blog route
      const slug = baseUrl.split("/")[2];
      try {
        const { data } = await axios.get(`${BaseUrl}/blog/get?slug=${slug}`);
        serverData = data?.data;
      } catch (blogErr) {
        console.error('SSR: Blog fetch error:', blogErr.message);
      }

    } else if (baseUrl.startsWith("/category/")) {
      const slug = baseUrl.split("/")[2];
      try {
        const { data } = await axios.get(`${BaseUrl}/category/get?slug=${slug}`);
        serverData = data?.data;

        if (serverData?._id) {
          try {
            const { data: productData } = await axios.get(
              `${BaseUrl}/products/categoryProducts/${serverData._id}`
            );
            CategoryProducts = productData?.data;
          } catch (productErr) {
            console.error('SSR: Category products fetch error:', productErr.message);
          }
        }
      } catch (categoryErr) {
        console.error('SSR: Category fetch error:', categoryErr.message);
      }

    } else if (baseUrl.startsWith("/product/")) {
      const slug = baseUrl.split("/")[2];
      try {
        const { data } = await axios.get(`${BaseUrl}/products/get?slug=${slug}`);
        serverData = data?.data;
      } catch (productErr) {
        console.error('SSR: Product fetch error:', productErr.message);
      }

    } else if (
      baseUrl !== "/" && baseUrl !== "" &&
      baseUrl.split("/").length === 2 &&
      !STATIC_ROUTES.has(baseUrl)
    ) {
      const slug = baseUrl.split("/")[1];
      try {
        const { data } = await axios.get(`${BaseUrl}/brands/get?slug=${slug}`);
        serverData = data?.data;
      } catch (brandErr) {
        console.error('SSR: Brand fetch error:', brandErr.message);
      }
    }
  } catch (err) {
    console.error('SSR data fetch error:', err.message);
  }

  let appHtml = '';
  try {
    const stream = await renderToReadableStream(
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <Provider store={store}>
            <StaticRouter location={normalizedUrl}>
              <Suspense fallback={<div id="app" />}>
                <App serverData={serverData} CategoryProducts={CategoryProducts} homePageData={homePageData} />
              </Suspense>
            </StaticRouter>
          </Provider>
        </HelmetProvider>
      </StrictMode>
    );
    appHtml = await streamToHtml(stream);
  } catch (renderError) {
    console.error('SSR render error:', renderError.message);
    appHtml = '<div id="app"></div>';
    helmetContext.helmet = {
      meta: { toString: () => `<meta name="robots" content="noindex nofollow" />` },
    };
  }

  const { helmet } = helmetContext;

  if (isHomePage && !homePageData) {
    homePageData = { topProducts: [], faqs: [], banner: null };
  }

  return {
    html: appHtml,
    helmet: {
      title: helmet?.title?.toString() || "",
      meta: helmet?.meta?.toString() || "",
      link: helmet?.link?.toString() || "",
      script: helmet?.script?.toString() || "",
    },
    serverData: serverData || null,
    CategoryProducts: CategoryProducts || null,
    homePageData: homePageData || null,
  };
}
