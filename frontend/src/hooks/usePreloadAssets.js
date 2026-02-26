import { useEffect, useState } from "react";
import { BaseUrl } from "../utils/BaseUrl";
import logo from "../assets/images/brand/logo.png";

const CRITICAL_IMAGES = [logo];
const CRITICAL_VIDEOS = [];

function toAbsoluteUrl(pathOrUrl) {
  if (!pathOrUrl || typeof pathOrUrl !== "string") return null;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  return `${BaseUrl}/${pathOrUrl.replace(/^\//, "")}`;
}

function collectBackendImageUrls(serverData, CategoryProducts, homePageData) {
  const out = [];
  const add = (value) => {
    const url = toAbsoluteUrl(value);
    if (url) out.push(url);
  };

  if (homePageData?.banner) {
    add(homePageData.banner.bannerImage);
    add(homePageData.banner.image);
  }

  const firstProduct =
    (Array.isArray(homePageData?.topProducts) && homePageData.topProducts[0]) ||
    (Array.isArray(CategoryProducts) && CategoryProducts[0]) ||
    null;

  if (firstProduct) {
    add(firstProduct.bannerImage);
    add(firstProduct.image);
    if (Array.isArray(firstProduct.images) && firstProduct.images[0]?.url) {
      add(firstProduct.images[0].url);
    }
  }

  if (serverData) {
    add(serverData.bannerImage);
    add(serverData.image);
    if (Array.isArray(serverData.images) && serverData.images[0]?.url) {
      add(serverData.images[0].url);
    }
  }

  return Array.from(new Set(out)).slice(0, 4);
}

function scheduleIdle(fn) {
  if (typeof window === "undefined") return;
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => fn(), { timeout: 2000 });
    return;
  }
  setTimeout(() => fn(), 1500);
}

export function usePreloadAssets(serverData, CategoryProducts, homePageData) {
  const [assetsReady, setAssetsReady] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const backendUrls = collectBackendImageUrls(serverData, CategoryProducts, homePageData);
    const imageUrls = Array.from(new Set([...CRITICAL_IMAGES, ...backendUrls])).filter(Boolean);

    scheduleIdle(() => {
      imageUrls.forEach((src) => {
        const img = new Image();
        img.decoding = "async";
        img.loading = "eager";
        img.src = src;
      });

      setAssetsReady(true);
    });
  }, [serverData, CategoryProducts, homePageData]);

  return { assetsReady };
}

export { CRITICAL_VIDEOS };
