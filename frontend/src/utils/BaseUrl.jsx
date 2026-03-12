const isBrowser = typeof window !== "undefined";
const isDev = !import.meta.env.PROD;
const SiteUrl = isBrowser
  ? (isDev
      ? (import.meta.env.VITE_SITE_BASE_URL || "https://xcustompackaging.com")
      : window.location.origin)
  : (import.meta.env.VITE_SITE_BASE_URL || "https://xcustompackaging.com");
export const BaseUrl = SiteUrl;
export const ApiBaseUrl = SiteUrl;
export const SsrApiBaseUrl = import.meta.env.VITE_SSR_API_BASE_URL || "https://xcustompackaging.com";
