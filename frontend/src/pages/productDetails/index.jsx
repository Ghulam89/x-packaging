import React, { useEffect, useState } from 'react'
import Tabs from '../../components/common/Tabs'
import { IoHomeOutline } from 'react-icons/io5'
import { LiaAngleRightSolid } from 'react-icons/lia'
import BottomHero from '../../components/Hero/BottomHero'
import axios from 'axios'
import { BaseUrl } from '../../utils/BaseUrl'
import { Link, useParams } from 'react-router-dom'
import { prefetchProductsBatch, getCachedProduct } from '../../utils/prefetchUtils'
import CardSlider from '../../components/common/CardSlider'
import ProductCard from '../../components/common/ProductCard'
import { FaAngleRight } from 'react-icons/fa'
import ImageViewer from '../../components/productDetails/ImageViewer'
import QuoteForm from '../../components/productDetails/QuoteForm'
import ProductInfo from '../../components/productDetails/ProductInfo'
import ProductGallery from '../../components/productDetails/ProductGallery'
import MaterialSlider from '../../components/productDetails/MaterialSlider'
import { materialSlides, getTabsData } from '../../components/productDetails/constants'
import '../../components/productDetails/styles'

const ProductDetails = ({
    serverData,
    children: slides,
    autoSlide = false,
    autoSlideInterval = 3000,
}) => {
    const { slug } = useParams()
    const [product, setProduct] = useState(serverData || null);
    const [relatedProduct, setRelatedProduct] = useState([])
    const [loading, setLoading] = useState(!serverData);
    const [curr, setCurr] = useState(0);
    const [materialCurr, setMaterialCurr] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [loadedImages, setLoadedImages] = useState(new Set());
    const [thumbnailLoadedImages, setThumbnailLoadedImages] = useState(new Set());
    const [cartQuantity, setCartQuantity] = useState(1);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Check cache first for instant loading
            const cachedProduct = getCachedProduct(slug);
            if (cachedProduct) {
                setProduct(cachedProduct);
                setCurr(0);
                setSelectedImage(null);
                setCurrentIndex(0);
                // Preload first image immediately for instant display
                if (cachedProduct?.images && cachedProduct.images.length > 0) {
                    const firstImage = new Image();
                    firstImage.src = `${BaseUrl}/${cachedProduct.images[0].url}`;
                    firstImage.onload = () => {
                        setLoadedImages(prev => new Set([...prev, 0]));
                    };
                    firstImage.onerror = () => {
                        setLoadedImages(prev => new Set([...prev, 0]));
                    };
                }
                setLoading(false);
                return;
            }

            const response = await axios.get(`${BaseUrl}/products/get?slug=${slug}`)
            const productData = response?.data?.data;
            setProduct(productData);
            setCurr(0);
            setSelectedImage(null);
            setCurrentIndex(0);
            
            // Preload first image immediately for instant display
            if (productData?.images && productData.images.length > 0) {
                const firstImage = new Image();
                firstImage.src = `${BaseUrl}/${productData.images[0].url}`;
                firstImage.onload = () => {
                    setLoadedImages(prev => new Set([...prev, 0]));
                };
                firstImage.onerror = () => {
                    setLoadedImages(prev => new Set([...prev, 0]));
                };
            }
        } catch (err) {
            console.error('Error fetching product:', err);
        } finally {
            setLoading(false);
        }
    }

    const fetchRelatedProducts = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/products/related-products?slug=${slug}`)
            setRelatedProduct(response?.data?.data)
            
            // Prefetch related products immediately for fast navigation
            if (response?.data?.data?.relatedProducts && response.data.data.relatedProducts.length > 0) {
                prefetchProductsBatch(response.data.data.relatedProducts, {
                    batchSize: 5,
                    delayBetweenBatches: 50,
                    priority: true
                });
            }
        } catch (err) {
            console.error('Error fetching related products:', err);
        }
    }

    useEffect(() => {
        // Reset states when slug changes
        setProduct(null);
        setRelatedProduct([]);
        setCurr(0);
        setSelectedImage(null);
        setCurrentIndex(0);
        setLoadedImages(new Set());
        setThumbnailLoadedImages(new Set());
        
        // If serverData is provided and matches current slug, use it first
        if (serverData && serverData.slug === slug) {
            setProduct(serverData);
            // Preload first image immediately
            if (serverData.images && serverData.images.length > 0) {
                const firstImage = new Image();
                firstImage.src = `${BaseUrl}/${serverData.images[0].url}`;
                firstImage.onload = () => {
                    setLoadedImages(prev => new Set([...prev, 0]));
                };
                firstImage.onerror = () => {
                    setLoadedImages(prev => new Set([...prev, 0]));
                };
            }
            fetchRelatedProducts();
        }
        
        // Always fetch fresh data to ensure we have the latest
        fetchProducts();
        fetchRelatedProducts();
    }, [slug])

    // Use product images from API only (no default fallback images)
    const images = product?.images?.length
        ? product.images.map(img => `${BaseUrl}/${img.url}`)
        : [];

    const prev = () =>
        setCurr((curr) =>
            curr === 0
                ? images.length - 1
                : curr - 1
        );

    const next = () =>
        setCurr((curr) =>
            curr === images.length - 1
                ? 0
                : curr + 1
        );

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [images]);

    const goToSlide = (index) => {
        setCurr(index);
    };

    const openImageViewer = (image, index) => {
        if (product?.images?.[index]) {
            setSelectedImage(product.images[index]);
            setCurrentIndex(index);
            setIsViewerOpen(true);
            document.body.style.overflow = 'hidden';
        }
    };

    const closeImageViewer = () => {
        setIsViewerOpen(false);
        document.body.style.overflow = 'auto';
    };

    const goToPrevious = () => {
        if (product?.images?.length) {
            const newIndex = (currentIndex - 1 + product.images.length) % product.images.length;
            setSelectedImage(product.images[newIndex]);
            setCurrentIndex(newIndex);
        }
    };

    const goToNext = () => {
        if (product?.images?.length) {
            const newIndex = (currentIndex + 1) % product.images.length;
            setSelectedImage(product.images[newIndex]);
            setCurrentIndex(newIndex);
        }
    };

    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);


    
    const materialChunks = [];
    for (let i = 0; i < materialSlides.length; i += 4) {
        materialChunks.push(materialSlides.slice(i, i + 4));
    }

    const prevMaterial = () => {
        setMaterialCurr((prevIndex) =>
            prevIndex === 0 ? materialChunks.length - 1 : prevIndex - 1
        );
    };

    const nextMaterial = () => {
        setMaterialCurr((prevIndex) =>
            prevIndex === materialChunks.length - 1 ? 0 : prevIndex + 1
        );
    };

    const data = getTabsData(materialChunks, materialCurr, prevMaterial, nextMaterial)

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": BaseUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": product?.brandId?.name || "Category",
                "item": `${BaseUrl}/${product?.brandId?.slug || ''}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": product?.name || "Product",
                "item": `${BaseUrl}/category/${slug || ''}`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": product?.name || "Product",
                "item": `${BaseUrl}/${slug || ''}`
            }
        ]
    };

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product?.name || serverData?.name,
        "image": product?.images?.[0]?.url ? `${BaseUrl}/${product.images[0].url}` : `${BaseUrl}/${serverData?.images?.[0]?.url}`,
        "description": product?.metaDescription || serverData?.metaDescription,
        "sku": "12345",
        "brand": {
            "@type": "Brand",
            "name": "Umbrella Custom Packaging"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "42",
        },
        "offers": {
            "@type": "Offer",
            "url": `https://umbrellapackaging.com/${product?.slug || serverData?.slug}`,
            "priceCurrency": "USD",
            "price": product?.actualPrice || serverData?.actualPrice,
            "priceValidUntil": product?.createdAt || serverData?.createdAt,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
                "@type": "Organization",
                "name": "Umbrella Custom Packaging"
            }
        }
    };

    return (
        <>
            {/* {product ? (
                <PageMetadata
                    title={product?.metaTitle}
                    description={product?.metaDescription || ""}
                    keywords={product?.keywords || ""}
                    ogUrl={`${BaseUrl}/category/${slug}`}
                    ogImage={`${BaseUrl}/${product?.images?.[0]?.url || serverData?.images?.[0]?.url || ""}`}
                    ogImageWidth="1200"
                    ogImageHeight="630"
                    canonicalUrl={`${BaseUrl}/${slug}`}
                    breadcrumbSchema={breadcrumbSchema}
                    productSchema={productSchema}
                    robots={product?.robots || serverData?.robots}
                />
            ) : null} */}

            <section className=' bg-[#F4F4F4] py-8'>
                <div className=' lg:max-w-8xl max-w-[95%]   flex lg:flex-row flex-col gap-4 mx-auto'>
                    <div className='  lg:w-6/12 '>
                        <div className=' flex gap-2 pb-5 items-center'>
                            <IoHomeOutline size={20} /> <LiaAngleRightSolid />
                            <h6 className=' flex items-center '>
                                <Link to={'/'} className='text-[#213554]'>Home</Link>
                                {product?.brandId?.name && (
                                    <>
                                        <LiaAngleRightSolid />
                                        <Link to={`/category/${product.brandId.slug}`} className='text-[#213554] capitalize'>
                                            {product.brandId.name}
                                        </Link>
                                    </>
                                )}
                                {product?.categoryId?.title && (
                                    <>
                                        <LiaAngleRightSolid />
                                        <Link to={`/category/${product.categoryId.slug}`} className='text-[#213554] capitalize'>
                                            {product.categoryId.title}
                                        </Link>
                                    </>
                                )}
                                {product?.name && (
                                    <>
                                        <LiaAngleRightSolid />
                                        <span>{product.name}</span>
                                    </>
                                )}
                            </h6>
                        </div>
                        <ProductGallery
                            images={images}
                            curr={curr}
                            prev={prev}
                            next={next}
                            goToSlide={goToSlide}
                            openImageViewer={openImageViewer}
                            product={product}
                            loadedImages={loadedImages}
                            setLoadedImages={setLoadedImages}
                            thumbnailLoadedImages={thumbnailLoadedImages}
                            setThumbnailLoadedImages={setThumbnailLoadedImages}
                        />
                    </div>

                    <div className="lg:w-6/12 w-full">
                        <div className='flex gap-2 items-center mb-4'>
                            <div className="w-1 h-11 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
                            <h3 className='pb-2 text-xl sm:text-2xl font-bold text-[#213554]'>{product?.name || "Tuck Top Mailer Boxes"}</h3>
                        </div>
                        <QuoteForm product={product} />
                    </div>
                </div>
            </section>
            <BottomHero />
            
            {/* Product Info Section */}
            <ProductInfo 
                product={product} 
                images={images} 
                curr={curr} 
                cartQuantity={cartQuantity} 
                setCartQuantity={setCartQuantity} 
            />

            {/* Learn More About Section */}
            {product?.description && (
                <section className='sm:max-w-8xl max-w-[95%] mx-auto pt-8'>
                    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-1 h-12 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
                            <h2 className='text-2xl sm:text-3xl font-bold text-[#213554]'>
                                Learn More About {product?.name}
                            </h2>
                        </div>
                        <div className='pt-2'>
                            <div 
                                className='prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed'
                                dangerouslySetInnerHTML={{ __html: product?.description}}
                                style={{
                                    lineHeight: '1.75'
                                }}
                            ></div>
                        </div>
                    </div>
                </section>
            )}

            <section className='sm:max-w-8xl max-w-[95%] mx-auto'>
                <div className="mt-10">
                    <Tabs defaultTab={"MATERIALS"} tabs={data} />
                </div>
            </section>
            <section className=' pt-12 pb-5'>
                <div className=" sm:max-w-8xl  justify-between gap-5  max-w-[95%]  flex sm:flex-row flex-col  mx-auto">
                    <div className=' sm:w-6/12 w-full'>
                        <h2 className=' py-2'>{product?.bannerTitle}</h2>
                        <p className=' py-2' dangerouslySetInnerHTML={{ __html: product?.bannerContent}}></p>
                    </div>
                    {product?.bannerImage && (
                        <div className=' sm:w-5/12 w-full'>
                            <img 
                                src={`${BaseUrl}/${product.bannerImage}`}
                                className='  shadow-2xl w-full rounded-2xl' 
                                alt={product?.name || ''} 
                            />
                        </div>
                    )}
                </div>
            </section>
          


          
                <section className="py-8 sm:max-w-8xl max-w-[95%] mx-auto">
                    <div className='mb-8 flex sm:flex-row flex-col items-center justify-between gap-4'>
                        <div className="flex items-center gap-4">
                            <div className="w-1 h-12 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
                            <div>
                                <h2 className='text-2xl sm:text-3xl font-bold text-[#213554]'>Related Products</h2>
                                <p className='text-gray-600 text-sm mt-1'>Discover packaging tailored for your products</p>
                            </div>
                        </div>
                        <Link to="" className="group">
                            <div className='font-bold text-[#EE334B] flex items-center hover:text-[#213554] transition-colors duration-300 uppercase text-sm px-4 py-2 rounded-lg hover:bg-[#EE334B]/10'>
                                View all <FaAngleRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={15} />
                            </div>
                        </Link>
                    </div>
                    
                    {relatedProduct?.relatedProducts && relatedProduct.relatedProducts.length > 0 && (
                        <div className="relative border-gray-100">
                            <CardSlider
                                top={40}
                                items={relatedProduct.relatedProducts.map((item, index) => (
                                    <div key={item?._id || index} className="w-[280px] flex-shrink-0 h-full">
                                        <ProductCard data={item} disableSelection={true} />
                                    </div>
                                ))}
                            />
                        </div>
                    )}
                </section>
            <ImageViewer
                isOpen={isViewerOpen}
                selectedImage={selectedImage}
                currentIndex={currentIndex}
                images={product?.images}
                onClose={closeImageViewer}
                onPrevious={goToPrevious}
                onNext={goToNext}
                onSelectImage={(img, idx) => {
                    setSelectedImage(img);
                    setCurrentIndex(idx);
                }}
            />
        </>
    )
}

export default ProductDetails

