import React, { useState } from 'react';
import { MdClose, MdOutdoorGrill } from 'react-icons/md';
import Button from '../../components/common/Button';
import Navbar from '../../components/Header/Navbar';
import Footer from '../../components/footer/Footer';
import TopNav from '../../components/Header/TopNav';
import ProductCard from '../../components/common/ProductCard';
import Input from '../../components/common/Input';
import { FaBed } from 'react-icons/fa';
import { TbToolsKitchen3 } from 'react-icons/tb';
import Banner from '../../components/common/Banner';
const Catalogue = () => {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

    const categories = [
      {
        category: "Box by industry",
        icon: <FaBed />,
        menu: [
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
        ],
      },
      {
        category: "Shapes & styles",
        icon: <MdOutdoorGrill />,
        menu: [
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
        ],
      },
      {
        category: "Materials",
        icon: <TbToolsKitchen3 />,
        menu: [
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
        ],
      },
      {
        category: "Sticker labels & others",
        icon: <TbToolsKitchen3 />,
        menu: [
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
        ],
      },
    ];

  return (
    <>
   <TopNav/>
    <Navbar/>

    <Banner title={'Catalogue'} subTitle={'Catalogue'} />
   
      <div className="container md:px-5 px-3 mx-auto pb-10 pt-10">
       
        <div className="flex  sm:flex-row flex-col pt-4 gap-12">
         
          <div
           
          >
          
            
            <div className="h-full">

              {categories?.map((item,index)=>{
                return (
                  <>
                   <h4 className=" border-b  border-gray-200 pb-2.5">{item?.category}</h4>
              <ul className=' my-3.5'>
                {item?.menu?.map((item,index)=>{
                    return (
                        <li  className=' flex gap-1.5 items-center'>
                        <Input type={'checkbox'} className={' w-4 h-4'} />
                        <h6>{item?.title}</h6>
                      </li>
                    )
                })}
               
              
              </ul>
                  </>
                )
              })}   
           

            </div>
          </div>

          
          <div className="w-full sm:w-9/12 mx-auto">
          <div className="grid  gap-6 grid-cols-2 md:grid-cols-4  lg:grid-cols-4">
          <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>

          </div>
          
          </div>
        </div>

        {/* Pagination Section */}
        <div className="flex justify-end gap-2 items-center p-4">
          <button className="px-4 py-2 text-black  bg-gray-200 rounded disabled:opacity-50">
            Previous
          </button>
          <div className="flex items-center gap-4">
            <p className="font-medium">Page 1 of 12</p>
          </div>
          <button className="px-4 py-2 text-black bg-gray-200 rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
  

    <Footer/>
    </>
    
  );
};

export default Catalogue;