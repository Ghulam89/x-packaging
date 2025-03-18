import React from 'react'
import TopNav from '../../components/Header/TopNav'
import Navbar from '../../components/Header/Navbar'
import Footer from '../../components/footer/Footer'
import { FaBed } from 'react-icons/fa'
import { MdOutdoorGrill } from 'react-icons/md'
import { TbToolsKitchen3 } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import SampleKit from '../../components/SampleKit'
import InspirationPackaging from '../../components/InspirationPackaging'

const Category = () => {

     const categories = [
        {
            title: "Cosmetics",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/cosmetics.png",
          },
          {
            title: "Candle",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/candle.png",
          },
          {
            title: "Bakery",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/bakery.png",
          },
          {
            title: "CBD",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/cbd.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
          {
            title: "Sustainable Packaging",
            icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
          },
      ];
  return (
    <>
    <TopNav/>
    <Navbar/>
    <section className=' max-w-7xl mx-auto'>
        <div className='  text-center max-w-5xl mx-auto py-7'>
            <h2>Custom packaging solutions for every industry.
            </h2>
            <p className=' pt-2'>Half Price Packaging possesses extensive expertise in delivering personalized packaging solutions to over 3000 businesses across the globe. Below, you will find a carefully curated selection of packaging solutions designed to cater to various industries.

</p>
        </div>
        <div className=' grid grid-cols-5 gap-6 '>
        {categories.map((submenu, index) => (
                  <Link
                    key={index}
                    to={`/category/${submenu.title}`}
                    className="text-gray-700 bg-[#F9F9F9]  rounded-3xl flex font-bold flex-col gap-0.5 items-center transition-colors"
                  >
                    <div className="  w-56 h-56">
                      <img
                        src={submenu?.icon}
                        alt=""
                        className="w-full h-full object-contain rounded-3xl"
                      />
                    </div>
                    <p className=" pb-3 font-bold">{submenu.title}</p>
                  </Link>
                ))}
        </div>
    </section>
    <div className=' pt-10'>
    <InspirationPackaging/>
    </div>
    <Footer/>    
    
    </>
  )
}

export default Category