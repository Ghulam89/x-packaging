import React, { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./App.css";
const serverData = window.__SERVER_DATA__ || null;
const categoryProducts = window.__CATEGORY_PRODUCTS__ || null;

// Home page cache: prefer SSR data, fall back to cached if SSR absent
let homePageData = window.__HOME_PAGE_DATA__ || null;
try {
  const CACHE_KEY = "HOME_PAGE_CACHE";
  const TS_KEY = "HOME_PAGE_CACHE_TS";
  const TTL = 10 * 60 * 1000; // 10 minutes
  const now = Date.now();
  const cachedStr = localStorage.getItem(CACHE_KEY);
  const tsStr = localStorage.getItem(TS_KEY);
  const cached = cachedStr ? JSON.parse(cachedStr) : null;
  const ts = tsStr ? parseInt(tsStr, 10) : 0;
  const fresh = ts && now - ts < TTL;
  const hasSSR =
    homePageData &&
    (Array.isArray(homePageData.topProducts) ||
      Array.isArray(homePageData.faqs) ||
      homePageData.banner);
  if (!hasSSR && cached && fresh) {
    homePageData = cached;
  }
  // Persist SSR data into cache for future navigations
  if (hasSSR) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(homePageData));
    localStorage.setItem(TS_KEY, String(now));
  }
} catch {}

const rootElement = document.getElementById("root");

const app = (
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App serverData={serverData} CategoryProducts={categoryProducts} homePageData={homePageData} />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);

if (rootElement && rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else if (rootElement) {
  createRoot(rootElement).render(app);
}
