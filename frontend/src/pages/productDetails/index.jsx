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
import TrustBanner from '../../components/common/TrustBanner'
import OfferCard from '../../components/common/OfferCard'
import { RiPhoneLine } from 'react-icons/ri'
import AddonsAndInserts from '../../components/AddonsAndInserts'
import { insert1, insert2, insert3, insert4, insert5, special1, special2, special3, special4, special5, special6, special7 } from '../../assets'
import FAQ from '../../components/FAQ/FAQ'
import PackagingFeatures from '../../components/CustomPackagingApart/PackagingFeatures'
import fedexLogo from '../../assets/images/footer/fedex.png'
import dhlLogo from '../../assets/images/footer/dhl.png'
import uspsLogo from '../../assets/images/footer/United_States_Postal_Service.png'
import sky from '../../assets/images/footer/sky.svg'
import ups from '../../assets/images/footer/ups.svg'
import chat from '../../assets/images/icon/chat.png'
import CustomPackagingProduced from '../../components/CustomPackagingProduced'

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

    // Ensure page always starts at the top when opening/changing product
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

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

    const data = getTabsData(materialChunks, materialCurr, prevMaterial, nextMaterial);

    // Info tabs data for Add ons, Inserts, FAQs, Why Us, Delivery


    const addons = [
        { img: special1, title: 'Embossing', desc: 'Embossing raises your logo or artwork for a premium, tactile experience that customers can see and feel.' },
        { img: special2, title: 'Debossing', desc: 'Debossing presses your design into the material for a subtle, sophisticated, and timeless textured effect on the box.' },
        { img: special3, title: 'Custom Foiling', desc: 'Custom foiling adds metallic colored foil on the box for instant luxury that creates a brilliant and premium finish.' },
        { img: special6, title: 'Spot UV', desc: 'A PVC window adds a practical display, allowing customers to see the product inside the packaging without opening it.' },
        { img: special4, title: 'Metallic Printing', desc: 'Metallized printing uses special inks and paper to create a vibrant, shimmering metallic effect across your packaging design.' },
        { img: special5, title: 'PVC Window', desc: 'Enhance your packaging with spot UV coating for premium finish and visual appeal.' },
        { img: special7, title: 'Custom Ribbons', desc: 'Custom printed ribbons add a final touch of elegance and color, perfect for gift and luxury packaging presentations.' },
    ];

    // Inserts data
    const inserts = [
        { img: insert1, title: 'Foam Inserts', desc: 'Foam inserts cushion and secure delicate products, providing protection and a polished unboxing presentation. We make them in any color you want.' },
        { img: insert2, title: 'Cardboard Inserts', desc: 'Cardboard inserts provide structured protection and organization inside your box. These are economical and for lightweight items. We can customize them in any color.' },
        { img: insert3, title: 'Clamshell Inserts', desc: 'Clamshell inserts surround and securely display your product, perfect for a clear, retail-ready presentation. These are the best suited for bulk usage.' },
        { img: insert4, title: 'Corrugated Inserts', desc: 'Corrugated inserts are the most durable inserts that we offer in any custom design. You can trust them to fit heavy and light-weight items both.' },
        { img: insert5, title: 'Eva Foam Inserts', desc: 'It is a type of premium foam insert that gives an ultra feel to the customers. We recommend this for expensive products. It comes in natural white and black colors.' },
    ];

    const infoTabsData = [
        {
            title: "Add ons",
            content: (
                <div className="">
                    <CardSlider
                        top={40}
                        items={addons.map((addon, index) => (
                            <div
                                key={index}
                                className="w-[85vw] sm:w-[352px] flex-shrink-0 px-2 sm:px-2"
                            >
                                <div
                                    className="bg-[#f7f7f7] rounded-xl overflow-hidden text-center border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-full flex flex-col"
                                >
                                    <div className="relative mb-4">
                                        <img
                                            src={addon.img}
                                            alt={addon.title}
                                            className="w-full object-cover transform transition-transform duration-700"
                                        />
                                        {/* Hover Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
                                        {/* Shine Effect - Sweeps across on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-lg"></div>
                                    </div>
                                    <div className='px-5 pb-5 flex-1 flex flex-col'>
                                        <h3 className="font-semibold text-lg mb-2 group-hover:text-[#EE334B] transition-colors duration-300">{addon.title}</h3>
                                        <p className="text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-300 whitespace-normal break-words leading-relaxed flex-1">{addon.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    />
                </div>
            ),
        },
        {
            title: "Inserts",
            content: (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                    <CardSlider
                        top={40}
                        items={inserts.map((insert, index) => (
                            <div
                                key={index}
                                className="w-[85vw] sm:w-[352px] flex-shrink-0 px-2 sm:px-2"
                            >
                                <div
                                    className="bg-white rounded-xl overflow-hidden text-center border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-full flex flex-col"
                                >
                                    <div className="relative mb-4">
                                        <img
                                            src={insert.img}
                                            alt={insert.title}
                                            className="w-full object-cover transform transition-transform duration-700"
                                        />
                                        {/* Hover Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
                                        {/* Shine Effect - Sweeps across on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-lg"></div>
                                    </div>
                                    <div className='px-5 pb-5 flex-1 flex flex-col'>
                                        <h3 className="font-semibold text-lg mb-2 group-hover:text-[#EE334B] transition-colors duration-300">{insert.title}</h3>
                                        <p className="text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-300 whitespace-normal break-words leading-relaxed flex-1">{insert.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    />
                </div>
            ),
        },
        {
            title: "Faqs",
            content: (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                    <FAQ />
                </div>
            ),
        },
        {
            title: "Why us",
            content: (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                    <PackagingFeatures />
                </div>
            ),
        },
        {
            title: "Delivery",
            content: (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                    <h3 className="font-semibold text-[#213554] mb-2 text-sm sm:text-base">
                        Experience fastest free delivery

                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                        We prioritize our customers’ convenience above all at X Custom Packaging. That’s why we’re happy to offer a wide range of payment options to suit your preferences. So, feel confident knowing that when you choose Umbrella Custom Packaging, paying for your orders is as effortless as possible.

                    </p>
                    <div className="mt-4  justify-around items-center flex pt-4">
                        {[
                            { img: fedexLogo, alt: 'FedEx' },
                            { img: dhlLogo, alt: 'DHL' },
                            { img: uspsLogo, alt: 'USPS' },
                            { img: sky, alt: 'sky express' },
                            { img: ups, alt: 'ups' },
                        ].map((partner, index) => (
                            <div
                                key={index}
                                className=" flex-shrink-0 px-2 w-1/6"
                            >
                                <div className="bg-white  transition-all duration-300 flex items-center justify-center py-3 px-4">
                                    <img
                                        src={partner.img}
                                        alt={partner.alt}
                                        className="max-h-12 sm:max-h-16 w-auto object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            ),
        },
    ];

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

            <section className=' py-8'>
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
                        <div className='flex flex-row items-center justify-between gap-4 mb-4'>
                            <div className='flex gap-2 items-center flex-1 min-w-0'>
                                <div className="w-1 h-11 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full flex-shrink-0"></div>
                                <h3 className='pb-2 text-xl sm:text-2xl font-bold text-[#213554] truncate'>{product?.name || "Tuck Top Mailer Boxes"}</h3>
                            </div>
                            <Link
                                to="/contact-us"
                                className="flex-shrink-0 flex items-center gap-2 px-4 from-[#EE334B] to-[#213554] py-2 bg-red-50 hover:bg-red-100 border border-red-200/60 rounded-lg transition-colors duration-200 group"
                            >
                              <img src={chat} alt="chat" className=' w-8 h-8' />
                                <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">  <h6 className='text-[10px]'> Chat with </h6>  Packaging Expert</span>
                            </Link>
                        </div>
                        <QuoteForm product={product} />
                    </div>
                </div>
            </section>
            <TrustBanner categoryName={product?.name || serverData?.name} />

            <section className=" py-10">
                <div className="sm:max-w-8xl w-[95%] gap-3 flex flex-row items-center justify-between mx-auto">
                    <div className=' w-6/12 mx-auto'>
                    <div className='flex items-center mb-4 gap-2'>
                    <div className="w-1 h-12 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#213554] ">
                        {product?.name}
                    </h2>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base max-w-6xl mx-auto  overflow-y-auto h-28 custom-scrollbar">
                        Let magnetic closure box packaging speak volumes about your products and brand with its luxurious
                        appeal and elegance. The built-in magnet in the rigid stock ensures the boxes close and open easily
                        without using tape or adhesive. You can pack all kinds of solid products in magnetic closure boxes,
                        be they gifts or retail items. Customize them with sleek finishes to improve customers’ tactile and
                        gifting experience!
                    </p>
                    <p className="my-6 font-semibold text-[#213554] text-xs sm:text-sm  tracking-wide">
                        More Than +5000 Satisfied Clients Worldwide
                    </p>
                    <BottomHero />
                  <div>

                  </div>
                    </div>
                    <div className=' w-6/12 mx-auto'>
                    {product?.bannerImage && (
                        <div className=' w-full'>
                            <img 
                                src={`${BaseUrl}/${product.bannerImage}`}
                                className='  shadow-2xl w-full rounded-2xl' 
                                alt={product?.name || ''} 
                            />
                        </div>
                    )}
                    </div>
                </div>
                
            </section>
            <CustomPackagingProduced/>
            <OfferCard
                title={'Looking For Other Custom Boxes And packaging?'}
                subTitle={'Chat live with our packaging experts now for a free consultation and insert price quote.'}
                buttonText={'Contact Us'}
                buttonIcon={<RiPhoneLine size={18} />}
            />
           

            <section className="sm:max-w-8xl max-w-[95%] mx-auto mt-10 mb-4">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    <div className="px-5 sm:px-6 py-4 border-b border-gray-100 bg-gray-50/80">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-8 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#213554]">
                                Product Specification
                            </h2>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/3 bg-gray-50/50 border-b sm:border-b-0 sm:border-r border-gray-100">
                            <div className="divide-y divide-gray-100">
                                {['Box Style', 'Dimension (L + W + H)', 'Quantities', 'Stock', 'Printing', 'Finishing', 'Included Options', 'Additional Options', 'Proof', 'Turnaround'].map((label) => (
                                    <div key={label} className="px-5 sm:px-6 py-3.5">
                                        <p className="font-semibold text-sm sm:text-base text-[#213554]">
                                            {label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="sm:w-2/3 bg-white">
                            <div className="divide-y divide-gray-100">
                                {['Rigid Boxes', 'All Custom Sizes & Shapes', 'No Minimum Order Required', '14 pt, 16 pt, 18 pt, 24 pt and more', 'Digital (Standard and HD Print), Lithography, CMYK, CMYK + 1 PMS color, CMYK + 2 PMS colors', 'Gloss Lamination, Matte Lamination, Gloss AQ, Gloss UV, Matte UV, Spot UV, Embossing, Debossing, Foiling', 'Die Cutting, Gluing, Scored, Perforation', 'Eco-Friendly, Recycled Boxes, Biodegradable', 'Flat View, 3D Mock-up, Physical Sampling (On request)', '4 – 8 Business Days, RUSH'].map((value, idx) => (
                                    <div key={idx} className="px-5 sm:px-6 py-3.5">
                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                            {value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Learn More About Section */}
            {product?.description && (
                <section className='sm:max-w-8xl max-w-[95%] mx-auto py-8'>
                    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-1 h-12 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
                            <h2 className='text-2xl sm:text-3xl font-bold text-[#213554]'>
                                Learn More About {product?.name}
                            </h2>
                        </div>
                        <div className='pt-2'>
                            <div
                                className=' text-gray-700  banner-content-wrapper leading-relaxed'
                                dangerouslySetInnerHTML={{ __html: product?.description }}
                                style={{
                                    lineHeight: '1.75'
                                }}
                            ></div>
                        </div>
                    </div>
                </section>
            )}





            <section className='sm:max-w-8xl max-w-[95%] mx-auto'>

                <div className='text-center mb-8'>
                    <h2 className="sm:text-[35px] text-[25px] leading-9 font-sans font-[600] text-[#333333] break-words">
                        Enhance Your Packaging Experience
                    </h2>
                </div>

                <div className="mt-10">
                    <Tabs
                        defaultTab={infoTabsData[0]?.title}
                        tabs={infoTabsData}
                        className={'bg-white'}
                    />
                </div>
            </section>

            <ProductInfo
                product={product}
                images={images}
                curr={curr}
                cartQuantity={cartQuantity}
                setCartQuantity={setCartQuantity}
            />

            {/* <section className=' pt-12 pb-5'>
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
            </section> */}




            <section className="pt-8 sm:max-w-8xl max-w-[95%] mx-auto">
                <div className=' flex sm:flex-row flex-col items-center justify-between gap-4'>
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

