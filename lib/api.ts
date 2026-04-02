import type { ApiResponse, Blog, Brand, Category, FaqItem, Product } from "@/types";
import { getServerApiBase } from "@/lib/resolve-api-base";

/** Public site origin (no `/api`). Used for image/static paths. Same env as before: `http://localhost:9090` or prod domain. */
const rawPublic = (process.env.NEXT_PUBLIC_API_BASE_URL || "").trim().replace(/\/+$/, "");
export const siteOrigin = rawPublic.endsWith("/api") ? rawPublic.slice(0, -4) : rawPublic;
/** REST API prefix: `{siteOrigin}/api` — Express routes live under `/api/...`. */
export const apiBase = rawPublic.endsWith("/api") ? rawPublic : `${rawPublic}/api`;

type FetchOpts = {
  revalidate?: number | false;
};

const FETCH_TIMEOUT_MS = 20_000;

async function fetchJson<T>(path: string, opts?: FetchOpts): Promise<T | null> {
  const base = typeof window === "undefined" ? getServerApiBase() : apiBase;
  const url = `${base}${path.startsWith("/") ? "" : "/"}${path}`;
  const signal =
    typeof AbortSignal !== "undefined" && "timeout" in AbortSignal
      ? AbortSignal.timeout(FETCH_TIMEOUT_MS)
      : undefined;
  const init: RequestInit = {
    ...(typeof opts?.revalidate === "number"
      ? { next: { revalidate: opts.revalidate } }
      : { cache: "no-store" as const }),
    ...(signal ? { signal } : {}),
  };
  try {
    const res = await fetch(url, init);
    if (!res.ok) return null;
    try {
      return (await res.json()) as T;
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}

export type { Blog, Brand, Category, FaqItem, Product };

export async function apiGet<T = unknown>(path: string, opts?: FetchOpts): Promise<ApiResponse<T> | null> {
  return fetchJson<ApiResponse<T>>(path, opts);
}

export async function getBrandsAll(
  revalidate: number = 3600
): Promise<Brand[]> {
  const r = await fetchJson<ApiResponse<Brand[]>>("/brands/getAll", { revalidate });
  return Array.isArray(r?.data) ? r.data : [];
}

export async function getBrandBySlug(
  slug: string,
  revalidate: number = 600
): Promise<Brand | null> {
  const r = await fetchJson<ApiResponse<Brand>>(`/brands/get?slug=${slug}`, { revalidate });
  return r?.data || null;
}

export async function getCategoriesAll(
  revalidate: number = 3600
): Promise<Category[]> {
  const r = await fetchJson<ApiResponse<Category[]>>("/category/getAll", { revalidate });
  return Array.isArray(r?.data) ? r.data : [];
}

export async function getCategoriesByBrandId(
  brandId: string,
  page: number = 1,
  perPage: number = 100,
  revalidate: number = 600
): Promise<Category[]> {
  if (!brandId) return [];
  const r = await fetchJson<ApiResponse<Category[] | { data?: Category[] }>>(
    `/category/getAll?page=${page}&perPage=${perPage}&brandId=${brandId}`,
    { revalidate }
  );
  if (Array.isArray(r?.data)) return r.data;
  if (r?.data && typeof r.data === "object" && Array.isArray((r.data as any).data)) return (r.data as any).data as Category[];
  return [];
}

export async function getCategoryBySlug(
  slug: string,
  revalidate: number = 600
): Promise<Category | null> {
  const r = await fetchJson<ApiResponse<Category>>(`/category/get?slug=${slug}`, { revalidate });
  return r?.data || null;
}

export async function getCategoryProducts(
  categoryId: string,
  page?: number,
  revalidate: number = 600
): Promise<Product[]> {
  const qp = page ? `?page=${page}` : "";
  const r = await fetchJson<ApiResponse<Product[]>>(`/products/categoryProducts/${categoryId}${qp}`, {
    revalidate,
  });
  return Array.isArray(r?.data) ? r.data : [];
}

export async function getProductsAll(
  page: number = 1,
  perPage: number = 20,
  revalidate: number = 600
): Promise<Product[]> {
  const r = await fetchJson<ApiResponse<Product[]>>(
    `/products/getAll?page=${page}&perPage=${perPage}`,
    { revalidate }
  );
  return Array.isArray(r?.data) ? r.data : [];
}

export async function getProductBySlug(
  slug: string,
  revalidate: number = 600
): Promise<Product | null> {
  const r = await fetchJson<ApiResponse<Product>>(`/products/get?slug=${slug}`, { revalidate });
  return r?.data || null;
}

export async function getBlogsAll(
  revalidate: number = 3600
): Promise<Blog[]> {
  const r = await fetchJson<ApiResponse<Blog[]>>("/blog/getAll", { revalidate });
  return Array.isArray(r?.data) ? r.data : [];
}

/** Home carousel: bounded page size, ISR-friendly. Uses `limit` (backend also accepts `perPage`). */
export async function getBlogsForHome(
  limit: number = 6,
  revalidate: number = 600
): Promise<Blog[]> {
  const r = await fetchJson<ApiResponse<Blog[]>>(
    `/blog/getAll?page=1&limit=${limit}`,
    { revalidate }
  );
  return Array.isArray(r?.data) ? r.data : [];
}

export async function getBlogBySlug(
  slug: string,
  revalidate: number = 600
): Promise<Blog | null> {
  const r = await fetchJson<ApiResponse<Blog>>(`/blog/get?slug=${slug}`, { revalidate });
  return r?.data || null;
}

export async function getBannerAll(
  revalidate: number = 600
): Promise<any[]> {
  const r = await fetchJson<ApiResponse<any[]>>("/banner/getAll", { revalidate });
  return Array.isArray(r?.data) ? r.data : [];
}

export async function getFaqAll(revalidate: number = 3600): Promise<FaqItem[]> {
  const r = await fetchJson<ApiResponse<FaqItem[]>>("/faq/getAll", { revalidate });
  return Array.isArray(r?.data) ? r.data : [];
}
