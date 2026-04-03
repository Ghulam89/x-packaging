import { apiGet } from "@/lib/api";
import type { Blog } from "@/types";

// const Banner = dynamic(() => import("@/components/shared/marketing/Banner").then(mod => mod.default || mod.Banner), {
//   ssr: true,
// });
import BlogCard from "@/components/entities/blog/ui/BlogCard";
import Link from "next/link";

export default async function BlogListPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const sp = (await searchParams) || {};
  const page = sp.page ? Number(sp.page) || 1 : 1;

  const r = await apiGet<Blog[]>(`/blog/getAll?page=${page}&perPage=12`, { revalidate: 600 });
  const blogs: Blog[] = Array.isArray(r?.data) ? r.data : [];
  const totalPages = Number(r?.pagination?.totalPages || r?.totalPages || 1) || 1;

  return (
    <main>
      {/* <Banner title="Blogs" subTitle="Blogs" /> */}

      <div className="sm:max-w-8xl max-w-[95%] mx-auto py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#213554]">
            Read inspiring stories about our journey.
          </h2>
          <p className="pt-3 text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
            Find a variety of informative and engaging blogs, articles, and other resources to help you stay up-to-date on the latest industry trends and insights.
          </p>
        </div>

        {blogs.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
              {blogs.map((b, i) => (
                <BlogCard key={b.slug || b._id || i} blog={b} />
              ))}
            </div>

            {page < totalPages ? (
              <div className="flex justify-center mt-16">
                <Link
                  href={`/blog?page=${page + 1}`}
                  className="bg-[#213554] hover:bg-[#EE334B] text-white px-12 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Load More Articles
                </Link>
              </div>
            ) : null}
          </>
        ) : (
          <div className="text-center text-gray-500 py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-xl font-medium">No articles found in this category.</p>
            <Link href="/" className="text-[#EE334B] font-bold mt-4 inline-block hover:underline">Back to home</Link>
          </div>
        )}
      </div>
    </main>
  );
}

