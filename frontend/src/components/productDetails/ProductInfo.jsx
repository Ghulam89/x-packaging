import React, { memo, useCallback } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/productSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProductInfo = memo(({ product, images, curr, cartQuantity, setCartQuantity }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAddToCart = useCallback((quantity) => {
        if (product) {
            dispatch(addToCart({
                _id: product._id,
                name: product.name,
                price: product.actualPrice || 0,
                quantity: quantity,
                image: product.images?.[0]?.url || '',
                slug: product.slug
            }));
            toast.success(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart!`);
            setCartQuantity(1);
            navigate('/cart');
        }
    }, [product, dispatch, navigate, setCartQuantity]);

    const handleBuyNow = useCallback(() => {
        handleAddToCart(1);
    }, [handleAddToCart]);

    return (
        <section className='sm:max-w-8xl max-w-[95%] mt-10 mx-auto'>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                {/* Small Product Image Preview - Left Side */}
                {images && images.length > 0 && (
                    <div className="w-full sm:w-64 md:w-64 flex-shrink-0">
                        <div className="rounded-lg overflow-hidden border-2 border-[#213554]/20 shadow-md hover:shadow-lg transition-all duration-300">
                            <img
                                src={images[curr]}
                                alt={product?.images?.[curr]?.altText || product?.name || "Product Image"}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                )}
                
                {/* Right Side Content */}
                <div className="flex-1 w-full">
                    {/* Quantity Selector and Add to Cart Button */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-[#213554] hidden sm:block">Quantity:</label>
                            <div className="flex items-center border-2 border-[#213554] rounded-lg overflow-hidden bg-white">
                                <button
                                    type="button"
                                    onClick={() => setCartQuantity(prev => prev > 1 ? prev - 1 : 1)}
                                    className="px-3 py-2 text-[#213554] hover:bg-[#213554] hover:text-white transition-colors duration-200 font-semibold"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={cartQuantity}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value) || 1;
                                        setCartQuantity(value >= 1 ? value : 1);
                                    }}
                                    className="w-16 sm:w-20 px-3 py-2 text-center text-[#EE334B] font-bold text-lg border-0 focus:outline-none focus:ring-0"
                                    style={{ color: '#EE334B' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setCartQuantity(prev => prev + 1)}
                                    className="px-3 py-2 text-[#213554] hover:bg-[#213554] hover:text-white transition-colors duration-200 font-semibold"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        
                        {/* Add to Cart Button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart(cartQuantity);
                            }}
                            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#EE334B] hover:bg-[#EE334B]/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                            style={{ color: '#ffffff' }}
                        >
                            <RiShoppingCartLine size={20} className="text-white" style={{ color: '#ffffff' }} />
                            <span className="text-base sm:text-lg text-white font-semibold" style={{ color: '#ffffff' }}>
                                Add to Cart
                            </span>
                        </button>
                    </div>

                    {/* Buy Now Button and Product Information */}
                    <div className="mt-6">
                        {/* Buy Now Button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleBuyNow();
                            }}
                            className="w-full mb-4 bg-[#EE334B] hover:bg-[#EE334B]/90 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                            style={{ color: '#ffffff' }}
                        >
                            <RiShoppingCartLine size={24} className="text-white" style={{ color: '#ffffff' }} />
                            <span className="text-lg" style={{ color: '#ffffff' }}>Buy Now</span>
                        </button>

                        {/* Product Information Display */}
                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="flex flex-col">
                                    <div className="bg-[#213554] text-white font-semibold py-2.5 px-2 rounded-lg text-center text-xs mb-1">
                                        Product Name
                                    </div>
                                    <div className="text-black font-medium py-1 px-2 text-center text-xs sm:text-sm">
                                        {product?.name || "Custom Window Bakery Boxes"}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="bg-[#213554] text-white font-semibold py-2.5 px-2 rounded-lg text-center text-xs mb-1">
                                        Size
                                    </div>
                                    <div className="text-black font-medium py-1 px-2 text-center text-xs sm:text-sm">
                                        {product?.size || "8 x 6 x 4 inch"}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="bg-[#213554] text-white font-semibold py-2.5 px-2 rounded-lg text-center text-xs mb-1">
                                        Price
                                    </div>
                                    <div className="text-black font-medium py-1 px-2 text-center text-xs sm:text-sm">
                                        ${product?.actualPrice || "2.50"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

ProductInfo.displayName = 'ProductInfo';
export default ProductInfo;
