"use client";
import React, { Suspense, useState, useEffect } from "react";
import { MdClose, MdFilterList } from "react-icons/md";
import Banner from "@/components/shared/marketing/Banner";
import ProductCard from "@/components/entities/product/ui/ProductCard";
import Button from "@/components/shared/ui/Button";
import { useSearchParams, useRouter } from "next/navigation";
import { siteOrigin } from "@/lib/api";

/** Same-origin `/api/*` routes (Next catch-all → Express). Avoids browser CORS / unreachable `apiBase` hosts. */
const API = "/api";

async function readJsonBody<T>(res: Response): Promise<T | null> {
  try {
    const text = await res.text();
    if (!text.trim()) return null;
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

const ShopContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(12);

  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [productsError, setProductsError] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const selectedBrandId = searchParams.get("brandId");
  const selectedCategoryId = searchParams.get("categoryId");

  // Update URL params (Next.js way)
  const updateParams = (paramsObj: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.keys(paramsObj).forEach((key) => {
      if (paramsObj[key]) {
        params.set(key, paramsObj[key]);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`);
  };

  // Fetch Brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(`${API}/brands/getAll?all=true`, { cache: "no-store" });
        const data = await readJsonBody<{ status?: string; data?: unknown }>(res);
        if (data?.status === "success" && Array.isArray(data.data)) {
          setBrands(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBrands();
  }, []);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API}/category/getAll?page=1&perPage=100`, { cache: "no-store" });
        const data = await readJsonBody<{ status?: string; data?: unknown }>(res);
        if (data?.status === "success" && Array.isArray(data.data)) {
          setCategories(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingFilters(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Products
  const fetchProducts = async (page = 1, loadMore = false) => {
    if (page === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      let url = `${API}/products/getAll?page=${page}&perPage=${perPage}`;

      if (selectedBrandId) url += `&brandId=${selectedBrandId}`;
      if (selectedCategoryId) url += `&categoryId=${selectedCategoryId}`;

      const response = await fetch(url, { cache: "no-store" });
      const data = await readJsonBody<{
        status?: string;
        data?: unknown;
        pagination?: { page?: number; totalPages?: number };
      }>(response);

      if (data?.status === "success") {
        const list = Array.isArray(data.data) ? data.data : [];
        if (loadMore) {
          setProducts((prev) => [...prev, ...list]);
        } else {
          setProducts(list);
        }

        setCurrentPage(data?.pagination?.page ?? page);
        setTotalPages(data?.pagination?.totalPages ?? 1);
        setProductsError(false);
      } else {
        setProductsError(true);
      }
    } catch (err) {
      console.error(err);
      setProductsError(true);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    fetchProducts(1);
  }, [selectedBrandId, selectedCategoryId]);

  const activeFilterCount =
    (selectedBrandId ? 1 : 0) + (selectedCategoryId ? 1 : 0);

  useEffect(() => {
    if (!filtersOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [filtersOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setFiltersOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Filters
  const closeFilters = () => setFiltersOpen(false);

  const handleBrandChange = (id: string) => {
    updateParams({
      brandId: id === selectedBrandId ? null : id,
    });
    closeFilters();
  };

  const handleCategoryChange = (id: string) => {
    updateParams({
      categoryId: id === selectedCategoryId ? null : id,
    });
    closeFilters();
  };

  const clearFilters = () => {
    router.push("?");
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1, true);
    }
  };

  const filterPanel = (
    <>
      <div className="flex items-center justify-between gap-2 lg:mb-4">
        <h3 className="flex items-center gap-2 font-semibold text-black">
          <MdFilterList className="shrink-0 text-[#EE334B]" size={20} aria-hidden />
          Filters
        </h3>
        <button
          type="button"
          onClick={closeFilters}
          className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-black lg:hidden"
          aria-label="Close filters"
        >
          <MdClose size={22} />
        </button>
      </div>

      <div className="mb-6">
        <h4 className="mb-2 font-medium text-black">Brands</h4>
        <div className="max-h-[40vh] space-y-1 overflow-y-auto pr-1 lg:max-h-none">
          {brands.map((b) => (
            <label
              key={(b as any)._id}
              className="flex cursor-pointer gap-2 py-1 text-sm text-gray-800 sm:text-base"
            >
              <input
                type="radio"
                className="mt-1 shrink-0 accent-[#EE334B]"
                checked={selectedBrandId === (b as any)._id}
                onChange={() => handleBrandChange((b as any)._id)}
              />
              <span className="min-w-0 wrap-break-word">{(b as any).name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 font-medium text-black">Categories</h4>
        <div className="max-h-[40vh] space-y-1 overflow-y-auto pr-1 lg:max-h-none">
          {categories.map((c) => (
            <label
              key={(c as any)._id}
              className="flex cursor-pointer gap-2 py-1 text-sm text-gray-800 sm:text-base"
            >
              <input
                type="radio"
                className="mt-1 shrink-0 accent-[#EE334B]"
                checked={selectedCategoryId === (c as any)._id}
                onChange={() => handleCategoryChange((c as any)._id)}
              />
              <span className="min-w-0 wrap-break-word">{(c as any).title || (c as any).name}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          clearFilters();
          closeFilters();
        }}
        className="mt-4 text-sm font-medium text-[#EE334B] hover:underline"
      >
        Clear filters
      </button>
    </>
  );

  return (
    <>
      <Banner title="Catalogue" subTitle="Catalogue" />

      <div className="container mx-auto px-3 py-6 sm:px-4 md:py-10">
        {/* Mobile / tablet: filter trigger */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-black shadow-sm"
          >
            <MdFilterList className="text-[#EE334B]" size={20} aria-hidden />
            Filters
            {activeFilterCount > 0 ? (
              <span className="rounded-full bg-[#EE334B] px-2 py-0.5 text-xs font-semibold text-white">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
          {activeFilterCount > 0 ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-[#EE334B] hover:underline"
            >
              Clear all
            </button>
          ) : null}
        </div>

        {filtersOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            aria-label="Close filters"
            onClick={closeFilters}
          />
        ) : null}

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <aside
            className={[
              "fixed inset-y-0 left-0 z-50 flex w-[min(100vw,20rem)] max-w-[85vw] flex-col overflow-y-auto border-r border-gray-100 bg-white p-4 shadow-xl transition-transform duration-200 ease-out lg:static lg:z-auto lg:h-auto lg:max-h-[calc(100vh-2rem)] lg:w-72 lg:max-w-none lg:shrink-0 lg:translate-x-0 lg:overflow-y-auto lg:rounded-lg lg:border lg:border-gray-100 lg:p-5 lg:shadow-md",
              filtersOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            ].join(" ")}
          >
            {filterPanel}
          </aside>

          <section className="min-w-0 flex-1">
            <div className="mb-4 hidden items-baseline justify-between gap-4 lg:flex">
              <p className="text-sm text-gray-600">
                {loading
                  ? "Loading products…"
                  : productsError
                    ? ""
                    : `${products.length} product${products.length === 1 ? "" : "s"} on this page`}
              </p>
              {loadingFilters ? (
                <span className="text-xs text-gray-400">Loading filters…</span>
              ) : null}
            </div>

            {loading ? (
              <p className="text-gray-600">Loading…</p>
            ) : productsError ? (
              <p className="text-red-600">
                Could not load products. Please refresh or try again later.
              </p>
            ) : products.length === 0 ? (
              <p className="text-gray-600">No products match the current filters.</p>
            ) : (
              <div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((p: any) => {
                    const raw = p?.images?.[0]?.url;
                    const img = raw
                      ? `${siteOrigin}/${String(raw).replace(/^\//, "")}`
                      : "";
                    return (
                      <ProductCard
                        key={p._id}
                        href={`/product/${p.slug}`}
                        title={p.name || p.slug}
                        imageSrc={img}
                        imageAlt={p.name || p.slug}
                        variant="carousel"
                      />
                    );
                  })}
                </div>

                {currentPage < totalPages ? (
                  <div className="mt-6 text-center sm:mt-8">
                    <Button
                      label={loadingMore ? "Loading…" : "Load more"}
                      onClick={handleLoadMore}
                    />
                  </div>
                ) : null}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-10">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
};

export default Page;
