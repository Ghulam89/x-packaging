const SiteUrl = import.meta.env.VITE_SITE_BASE_URL || "https://xcustompackaging.com";
export const BaseUrl = SiteUrl;
export const ApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || `${SiteUrl}`;
