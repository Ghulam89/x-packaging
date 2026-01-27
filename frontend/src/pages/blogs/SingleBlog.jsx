import React, { useEffect, useState } from 'react';
import TableOfContent from './TableOfContent';
import Button from '../../components/common/Button';
import { BaseUrl } from '../../utils/BaseUrl';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import PageMetadata from '../../components/common/PageMetadata';
import GetQuoteModal from '../../components/common/GetQuoteModal';
import BlogCard from '../../components/common/BlogCard';
import ProductCard from '../../components/common/ProductCard';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

function SingleBlog({ serverData }) {


    console.log(serverData);

   
    const { slug } = useParams();
    const navigate = useNavigate();
    const [singleBlog, setSingleBlog] = useState(serverData || null);
    const [blogs, setBlogs] = useState([]);
    const [blogProducts, setBlogProducts] = useState([]);


     console.log(singleBlog);
    
    
    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/blog/get?slug=${slug}`);
            if (!response?.data?.data) {
                // Blog not found, redirect to 404
                navigate('/404')
                return
            }
            setSingleBlog(response?.data?.data);
            // Fetch blog products after blog is loaded
            if (response?.data?.data?._id) {
                fetchBlogProducts(response.data.data._id);
            }
        } catch (error) {
            // If there's an error or blog not found, redirect to 404
            navigate('/404')
        }
    };

    const fetchBlogProducts = async (blogId) => {
        try {
            const response = await axios.get(`${BaseUrl}/blog-product/blog/${blogId}`);
            if (response?.data?.data) {
                // Extract products from blog products array
                const products = response.data.data
                    .map(bp => bp.productId)
                    .filter(product => product !== null && product !== undefined);
                setBlogProducts(products);
            }
        } catch (error) {
            console.error("Error fetching blog products:", error);
        }
    };

    const fetchAllBlogs = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/blog/getAll`);
            setBlogs(response?.data?.data);
        } catch (error) {

        }
    };

    useEffect(() => {
        fetchBlogs();
        fetchAllBlogs();
    }, [slug]);

// ✅ Add this block here
useEffect(() => {
  // Add IDs to the headings in the rendered blog content
  const contentElement = document.querySelector('.blog_content');
  if (contentElement) {
    const headingElements = Array.from(
      contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
    );
    headingElements.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `section-${index}-${heading.textContent
          .toLowerCase()
          .replace(/[^\w\s]/g, '')
          .replace(/\s+/g, '-')}`;
      }
    });
  }
}, [singleBlog]);

    const faqItemSchema = serverData?.qna?.map((item, index) => {
        return {
            "@context": "https://schema.org",
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        };
    });

     // Generate FAQ schema only if there are Q&A items
    const generateFaqSchema = () => {
        const qna = singleBlog?.qna || serverData?.qna || [];
        
        if (!qna.length) return null;
        
        const faqItemSchema = qna.map((item, index) => {
            return {
                "@context": "https://schema.org",
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            };
        });

        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItemSchema
        };
    };

    
    const faqSchema = generateFaqSchema();

    console.log(singleBlog);

    const [IsModalOpen,setIsModalOpen] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const calculateReadTime = (content) => {
        if (!content) return 5;
        const text = content.replace(/<[^>]*>/g, '');
        const words = text.split(/\s+/).length;
        const readTime = Math.ceil(words / 200);
        return readTime || 5;
    };

    return (
        <>
            {/* Only render Helmet meta tags when singleBlog is available */}
            {/* <PageMetadata
                title={singleBlog?.metaTitle || serverData?.metaTitle || "Custom Packaging Solutions"}
                description={singleBlog?.metaDescription || serverData?.metaDescription || ""}
                keywords={singleBlog?.keywords || serverData?.keywords || ""}
                ogUrl={`${BaseUrl}/blog/${slug}`}
                ogImage={`${BaseUrl}/${singleBlog?.image}`}
                ogImageWidth="1200"
                ogImageHeight="630"
                canonicalUrl={`${BaseUrl}/blog/${slug}`}
                faqItemSchema={faqSchema}
                robots={singleBlog?.robots || serverData?.robots}
              
            /> */}

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
                <div className='flex gap-8 flex-col'>
                    {/* Header Card - Modernized */}
                    <div className='w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row gap-6 md:gap-8'>
                        <div className='w-full md:w-6/12 flex flex-col justify-between'>
                            <div>
                                {/* Badge - Modernized */}
                                <span className='inline-block px-4 py-2 bg-gradient-to-r from-[#EE334B] to-[#EE334B]/90 text-white text-xs font-bold rounded-full shadow-md mb-4'>
                                    Knowledge Base
                                </span>
                                
                                {/* Title - Modernized */}
                                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-[#213554] mb-4 leading-tight'>
                                    {singleBlog?.title}
                                </h1>
                                
                                {/* Meta Info - Modernized */}
                                <div className='flex flex-wrap items-center gap-4 md:gap-6 text-gray-600'>
                                    {singleBlog?.createdAt && (
                                        <div className='flex items-center gap-2'>
                                            <FaCalendarAlt className='text-[#EE334B] text-sm' />
                                            <span className='text-sm font-medium'>{formatDate(singleBlog.createdAt)}</span>
                                        </div>
                                    )}
                                    <div className='flex items-center gap-2'>
                                        <FaClock className='text-[#EE334B] text-sm' />
                                        <span className='text-sm font-medium'>{calculateReadTime(singleBlog?.content)} min read</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Image - Modernized */}
                        <div className='w-full md:w-6/12'>
                            {singleBlog?.image && (
                                <div className='relative rounded-2xl overflow-hidden shadow-xl group'>
                                    <img
                                        src={`${BaseUrl}/${singleBlog.image}`}
                                        className='w-full h-auto max-h-[400px] md:max-h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700'
                                        alt={singleBlog?.imageAltText || singleBlog?.title}
                                    />
                                    {/* Gradient Overlay on Hover */}
                                    <div className='absolute inset-0 bg-gradient-to-t from-[#213554]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Blog Content - Modernized */}
                    <div className='w-full'>
                        <article className='blog_content bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10'>
                            <div
                                className="text-gray-700 leading-relaxed text-base md:text-lg [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-bold [&_h1]:text-[#213554] [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-[#213554] [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-semibold [&_h3]:text-[#213554] [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-7 [&_a]:text-[#EE334B] [&_a]:font-medium [&_a]:no-underline [&_a:hover]:underline [&_strong]:text-[#213554] [&_strong]:font-semibold [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:my-6 [&_img]:w-full [&_img]:h-auto [&_blockquote]:border-l-4 [&_blockquote]:border-[#EE334B] [&_blockquote]:pl-4 [&_blockquote]:pr-4 [&_blockquote]:py-2 [&_blockquote]:italic [&_blockquote]:bg-gray-50 [&_blockquote]:my-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_ol]:space-y-2 [&_li]:leading-7"
                                dangerouslySetInnerHTML={{ __html: singleBlog?.content }}
                            />
                        </article>
                    </div>

                    {/* Blog Products Section - Modernized */}
                    {blogProducts && blogProducts.length > 0 && (
                        <div className='w-full mt-8'>
                            <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8'>
                                <div className='mb-6'>
                                    <h2 className='text-2xl md:text-3xl font-bold text-[#213554] mb-2'>Related Products</h2>
                                    <p className='text-gray-600 text-sm md:text-base'>Explore products related to this article</p>
                                </div>
                                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
                                    {blogProducts.map((product, index) => (
                                        <ProductCard
                                            key={product._id || index}
                                            data={product}
                                            disableSelection={true}
                                            size="compact"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Latest Articles Section - Modernized */}
                    <div className='w-full mt-8'>
                        <div className='bg-white'>
                            <div className='mb-6'>
                                <h2 className='text-2xl md:text-3xl font-bold text-[#213554] mb-2'>Latest Articles</h2>
                                <p className='text-gray-600 text-sm md:text-base'>Explore more insights and guides</p>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {blogs?.map((item, index) => {
                                    return (
                                        <BlogCard key={index} data={item} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                  <GetQuoteModal setIsModalOpen={setIsModalOpen} isModalOpen={IsModalOpen} />

        </>

    );
}

export default SingleBlog;


