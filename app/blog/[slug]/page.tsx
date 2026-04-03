import { getBlogBySlug, getBlogsAll, apiGet, siteOrigin } from "@/lib/api";
import type { Product } from "@/types";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import TableOfContent from "@/components/entities/blog/ui/TableOfContent";
import BlogCard from "@/components/entities/blog/ui/BlogCard";
import ProductCard from "@/components/entities/product/ui/ProductCard";
import { FaCalendarAlt, FaClock, FaChevronRight } from "react-icons/fa";
import BottomHero from "@/components/widgets/home/BottomHero";
import JsonLd from "@/components/shared/seo/JsonLd";
import { blogFaqPageSchema } from "@/lib/blog-faq-schema";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug, 3600);

  if (!blog) notFound();

  const allBlogs = await getBlogsAll(3600);
  const latestBlogs = allBlogs.filter((b) => b.slug !== slug).slice(0, 4);

  // Try to fetch related products for this blog
  const prodRes = await apiGet<Array<{ productId?: Product | null }>>(`/blog-product/blog/${blog._id}`, { revalidate: 600 });
  const blogProducts: Product[] = Array.isArray(prodRes?.data)
    ? prodRes.data.map((bp) => bp.productId).filter(Boolean) as Product[]
    : [];

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadTime = (content?: string) => {
    if (!content) return 5;
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).length;
    const readTime = Math.ceil(words / 200);
    return readTime || 5;
  };

  const blogImage = blog.image ? `${siteOrigin}/${blog.image.replace(/^\//, "")}` : "";
  const faqLd = blogFaqPageSchema(blog.qna);

  return (
    <main className="bg-white min-h-screen">
      {faqLd ? <JsonLd schemas={[faqLd]} /> : null}
      {/* Hero: mobile = auto height (no clipping); lg+ = min viewport-height hero */}
      <div className="bg-gray-50 border-b border-gray-100 relative z-0 max-lg:overflow-x-hidden lg:overflow-hidden  lg:flex lg:items-center py-6 sm:py-3 md:py-8">
        {/* Background blobs */}
        <div className="pointer-events-none absolute -bottom-20 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-[#EE334B]/5 to-transparent rounded-full blur-3xl z-0" />
        <div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-[#213554]/5 to-transparent rounded-full blur-3xl z-0" />

        <div className="relative z-10 w-full max-w-[95%] sm:max-w-8xl mx-auto px-1 sm:px-0">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-medium  overflow-x-auto whitespace-nowrap scrollbar-hide pb-1 -mx-1 px-1">
            <Link href="/" className="text-gray-400 hover:text-[#213554] transition-colors shrink-0">Home</Link>
            <FaChevronRight className="text-gray-300 text-[10px] shrink-0" />
            <Link href="/blog" className="text-gray-400 hover:text-[#213554] transition-colors shrink-0">Blog</Link>
            <FaChevronRight className="text-gray-300 text-[10px] shrink-0" />
            <span className="text-[#213554] bg-[#213554]/5 px-3 py-1 rounded-full max-w-[min(70vw,18rem)] sm:max-w-[min(40vw,28rem)] truncate" title={blog.title}>{blog.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 items-center">
            <div className="w-full lg:w-3/5 space-y-4 sm:space-y-6 text-center lg:text-left">
              <span className="inline-block font-bold text-white bg-[#EE334B] rounded-full shadow-lg px-5 sm:px-6 py-2 text-[10px] sm:text-xs uppercase tracking-widest">
                Knowledge Base
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#213554] leading-tight px-1 sm:px-0">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[#EE334B]" />
                  <span>{(blog as any).createdAt ? formatDate((blog as any).createdAt) : "Recent Post"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-[#EE334B]" />
                  <span>{calculateReadTime(blog.content)} min read</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/5 relative max-w-xl mx-auto lg:max-w-none lg:mx-0">
              {blogImage ? (
                <div className="relative aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl transform lg:hover:scale-[1.02] transition-transform duration-700">
                  <Image
                    src={blogImage}
                    alt={(blog as any).imageAltText || blog.title || ""}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/40 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-2xl lg:rounded-3xl bg-gray-100 flex items-center justify-center text-gray-300">
                  <span className="text-2xl sm:text-4xl font-bold">Blog Image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomHero/>

      <div className="sm:max-w-8xl max-w-[95%] mx-auto py-10 md:py-16 relative z-0">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Article Content */}
          <div className="w-full lg:w-2/3 relative z-0">
            <article className="blog_content bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100">
              <div
                className="text-gray-700 leading-relaxed text-lg 
                [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-bold [&_h1]:text-[#213554] [&_h1]:mt-10 [&_h1]:mb-6
                [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-[#213554] [&_h2]:mt-8 [&_h2]:mb-4
                [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-bold [&_h3]:text-[#213554] [&_h3]:mt-6 [&_h3]:mb-3
                [&_p]:mb-6 [&_p]:leading-8
                [&_a]:text-[#EE334B] [&_a]:font-bold [&_a]:no-underline [&_a:hover]:underline
                [&_strong]:text-[#213554] [&_strong]:font-bold
                [&_img]:rounded-3xl [&_img]:shadow-xl [&_img]:my-10 [&_img]:w-full [&_img]:h-auto
                [&_blockquote]:border-l-4 [&_blockquote]:border-[#EE334B] [&_blockquote]:pl-6 [&_blockquote]:pr-6 [&_blockquote]:py-4 [&_blockquote]:italic [&_blockquote]:bg-gray-50 [&_blockquote]:rounded-r-2xl [&_blockquote]:my-8
                [&_ul]:list-disc [&_ul]:ml-8 [&_ul]:mb-6 [&_ul]:space-y-3
                [&_ol]:list-decimal [&_ol]:ml-8 [&_ol]:mb-6 [&_ol]:space-y-3
                [&_li]:leading-8"
                dangerouslySetInnerHTML={{ __html: blog.content || "" }}
              />
            </article>

            {/* Related Products */}
            {blogProducts.length > 0 && (
              <div className="mt-16 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-10 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full" />
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#213554]">Related Products</h2>
                    <p className="text-gray-500 font-medium">Explore products related to this article</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogProducts.map((product) => {
                    const img = product.images?.[0]?.url ? `${siteOrigin}/${product.images[0].url.replace(/^\//, "")}` : "";
                    return (
                      <ProductCard
                        key={product._id}
                        href={`/product/${product.slug}`}
                        title={product.name || product.slug}
                        imageSrc={img}
                        imageAlt={product.name || product.slug}
                        variant="carousel"
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — higher z-index so sticky TOC stacks above article while scrolling */}
          <aside className="w-full lg:w-1/3 space-y-10 relative z-10">
            {blog.content && (
              <TableOfContent content={blog.content} />
            )}

            {latestBlogs.length > 0 && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-10 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full" />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#213554]">Latest Articles</h2>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">More insights & guides</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {latestBlogs.map((b) => (
                    <BlogCard key={b._id} blog={b} compact className="transform hover:-translate-y-1 shadow-none border-gray-50 hover:border-[#EE334B]/10 hover:shadow-xl" />
                  ))}
                </div>
              </div>
            )}

            {/* CTA Sidebar Card */}
            <div className="bg-[#213554] rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -z-10 transform group-hover:scale-150 transition-transform duration-700" />
              <h3 className="text-2xl font-bold mb-4">Need Custom Packaging?</h3>
              <p className="text-white/80 mb-8 leading-relaxed">Get a free consultation and instant price quote for your custom packaging needs.</p>
              <Link href="/contact-us" className="inline-block bg-[#EE334B] hover:bg-white hover:text-[#213554] text-white font-bold px-8 py-3 rounded-full transition-all shadow-xl">
                Get a Free Quote
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug, 600);
  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description:
        "No article matches this page. Read more on the X Custom Packaging blog.",
      robots: { index: false, follow: true },
    };
  }
  const title = blog.metaTitle || blog.title || "Blog";
  const description = blog.metaDescription || "";
  const kw = blog.keywords || "";
  const keywords = kw ? kw.split(",").map((k) => k.trim()).filter(Boolean) : undefined;
  const url = `https://xcustompackaging.com/blog/${slug}`;
  const img = blog.image ? `https://xcustompackaging.com/${blog.image.replace(/^\//, "")}` : undefined;
  const robotsStr = blog.robots || "";
  const robots = { index: true, follow: true };
  return {
    title,
    description,
    keywords,
    robots,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: img ? [img] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: img ? [img] : undefined,
    },
  };
}
