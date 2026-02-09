import React, { useMemo, lazy } from "react";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import { Home } from "../pages/home/Home";
import Reviews from "../pages/reviews";
import ContactUs from "../pages/contactUs/ContactUs";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";

// Lazy load routes for better code splitting and initial bundle size
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
    { path: '/reviews', element: <Reviews key="reviews" /> },
    { path: '/my-account', element: <MyAccount key="my-account" /> },
    { path: '/:slug', element: <Category key="category" serverData={sharedServer} /> },
    { path: '/blog/:slug', element: <SingleBlog key="blog" serverData={sharedServer} /> },
    { path: '/category/:slug', element: <SubCategory key="subcategory" serverData={sharedServer} CategoryProducts={CategoryProducts} /> },
    { path: '/product/:slug', element: <ProductDetails key="product" serverData={sharedServer} /> },
  ], [sharedServer, CategoryProducts, homePageData]);

  return routes;
}