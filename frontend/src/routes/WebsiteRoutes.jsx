import React, { useMemo, lazy } from "react";
import { Home } from "../pages/home/Home";
const Cart = lazy(() => import("../pages/cart/Cart"));
const Checkout = lazy(() => import("../pages/checkout/Checkout"));
const Reviews = lazy(() => import("../pages/reviews"));
const ContactUs = lazy(() => import("../pages/contactUs/ContactUs"));
const TermsAndConditions = lazy(() => import("../pages/TermsAndConditions/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy/PrivacyPolicy"));
const SingleBlog = lazy(() => import("../pages/blogs/SingleBlog"));
const Shop = lazy(() => import("../pages/shop"));
const ProductDetails = lazy(() => import("../pages/productDetails"));
const SubCategory = lazy(() => import("../pages/subCategory/SubCategory"));
const Category = lazy(() => import("../pages/category/Category"));
const Blogs = lazy(() => import("../pages/blogs/Blogs"));
const About = lazy(() => import("../pages/about/About"));
const MyAccount = lazy(() => import("../pages/myAccount/MyAccount"));

export default function useWebsiteRoutes(serverData, CategoryProducts, homePageData) {
  const sharedServer = serverData?.serverData ?? serverData ?? null;

  const routes = useMemo(() => [
    { path: '/', element: <Home key="home" homePageData={homePageData} /> },
    { path: '/about-us', element: <About key="about" /> },
    { path: '/contact-us', element: <ContactUs key="contact" /> },
    { path: '/blogs', element: <Blogs key="blogs" /> },
    { path: '/shop', element: <Shop key="shop" /> },
    { path: '/cart', element: <Cart key="cart" /> },
    { path: '/checkout', element: <Checkout key="checkout" /> },
    { path: '/terms-and-conditions', element: <TermsAndConditions key="terms-and-conditions" /> },
    { path: '/privacy-policy', element: <PrivacyPolicy key="privacy-policy" /> },
    { path: '/reviews', element: <Reviews key="reviews" /> },
    { path: '/my-account', element: <MyAccount key="my-account" /> },
    { path: '/:slug', element: <Category key="category" serverData={sharedServer} /> },
    { path: '/blog/:slug', element: <SingleBlog key="blog" serverData={sharedServer} /> },
    { path: '/category/:slug', element: <SubCategory key="subcategory" serverData={sharedServer} CategoryProducts={CategoryProducts} /> },
    { path: '/product/:slug', element: <ProductDetails key="product" serverData={sharedServer} /> },
  ], [sharedServer, CategoryProducts, homePageData]);

  return routes;
}