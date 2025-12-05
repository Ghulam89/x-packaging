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

function SingleBlog({ serverData }) {


    console.log(serverData);

   
    const { slug } = useParams();
    const navigate = useNavigate();
    const [singleBlog, setSingleBlog] = useState(serverData || {});
    const [blogs, setBlogs] = useState([])


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
        } catch (error) {
            // If there's an error or blog not found, redirect to 404
            navigate('/404')
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

            <div className='max-w-6xl mx-auto px-3 sm:px-0 py-6'>
                <div className='flex gap-8  flex-col'>
                    <div className='w-full  shadow p-4  rounded-lg flex space-y-6'>
                        <div className=' w-6/12'>
                        <button className='  bg-gray-50 border border-gray-200 rounded-md  px-3 py-1'>Knowlodge Base</button>
                          <h2 className='text-2xl font-bold text-gray-800 pt-2'>{singleBlog?.title}</h2>
                        <p>{singleBlog?.createdAt}</p>
                        </div>
                        <div className=' w-6/12'>
                          {singleBlog?.image && (
                            <img
                                src={`${BaseUrl}/${singleBlog.image}`}
                                className='rounded-3xl w-full h-auto max-h-96 object-cover'
                                alt={singleBlog?.imageAltText}
                            />
                        )}
                        </div>

                       

                      
                    </div>
                     {/* <div className='flex justify-end'>
                            <Button
                              onClick={()=>setIsModalOpen(true)}
                                label={"Get A Quote"}
                                className="bg-[#4440E6] text-white w-64 px-6 py-2 rounded-md hover:bg-[#3935c7] transition-colors"
                            />
                        </div> */}
  <div
                            className="text-gray-700 blog_content leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: singleBlog?.content }}
                        />
                    <div className=' w-full'>
                        {/* <TableOfContent content={singleBlog?.content} /> */}

                        <div className='mt-8 bg-white'>
                            <h3 className='text-lg font-semibold mb-4'>Latest Articles</h3>
                            <ul className='space-y-3  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {
                                    blogs?.map((item, index) => {
                                        return (
                                            <BlogCard key={index} data={item} />
                                        )
                                    })
                                }
                                {/* <Button
                                 onClick={()=>setIsModalOpen(true)}
                                    label={"Get A Quote"}
                                    className="bg-[#4440E6] text-white  w-full px-6 py-2 rounded-md hover:bg-[#3935c7] transition-colors"
                                /> */}

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

                  <GetQuoteModal setIsModalOpen={setIsModalOpen} isModalOpen={IsModalOpen} />

        </>

    );
}

export default SingleBlog;


