import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { BaseUrl } from "./utils/BaseUrl";
import { Provider } from "react-redux";
import { store } from "./store/store";
export async function render(url) {
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

  try {
    // Handle different routes - check in order of specificity
    if (baseUrl === "/") {
      // Handle home page - fetch multiple data sources
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
        console.error('Home page data fetch error:', homeErr.message);
      }

    } else if (baseUrl.startsWith("/blog/")) {
      // Handle blog route
      const slug = baseUrl.split("/")[2];
      const { data } = await axios.get(`${BaseUrl}/blog/get?slug=${slug}`);
      serverData = data?.data;

    } else if (baseUrl.startsWith("/category/")) {
      // Handle sub-category route
      const slug = baseUrl.split("/")[2];
      const { data } = await axios.get(`${BaseUrl}/redis/category/get?slug=${slug}`);
      serverData = data?.data;

      if (serverData?._id) {
        const { data: productData } = await axios.get(
          `${BaseUrl}/products/categoryProducts/${serverData._id}`
        );
        CategoryProducts = productData?.data;
      }

    } else if (baseUrl.startsWith("/product/")) {
      // Handle product route
      const slug = baseUrl.split("/")[2];
      const { data } = await axios.get(`${BaseUrl}/products/get?slug=${slug}`);
      serverData = data?.data;

    } else if (baseUrl !== "/" && baseUrl.split("/").length === 2) {
      // Handle category/brand route (e.g., /fashion-apparel-packaging-boxes)
      const slug = baseUrl.split("/")[1];
      const { data } = await axios.get(`${BaseUrl}/brands/get?slug=${slug}`);
      serverData = data?.data;
    }
  } catch (err) {
    // On error → noindex meta
    console.error('SSR data fetch error:', err.message);
    helmetContext.helmet = {
      meta: { toString: () => `<meta name="robots" content="noindex nofollow" />` },
    };
  }

  // Render app
  const appHtml = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <Provider store={store}>
          <StaticRouter location={normalizedUrl}>
            <App serverData={serverData} CategoryProducts={CategoryProducts} homePageData={homePageData} />
          </StaticRouter>
        </Provider>
      </HelmetProvider>
    </StrictMode>
  );

  const { helmet } = helmetContext;

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
