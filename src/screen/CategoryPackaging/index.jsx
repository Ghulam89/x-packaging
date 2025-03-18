import React, { useState } from 'react'
import BottomHero from '../../components/common/BottomHero'
import Navbar from '../../components/Header/Navbar'
import Footer from '../../components/footer/Footer'
import SampleKit from '../../components/SampleKit'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { Link } from 'react-router-dom'
import { FaAngleRight, FaBed } from 'react-icons/fa'
import ProductCard from '../../components/common/ProductCard'
import { MdOutdoorGrill } from 'react-icons/md'
import { TbToolsKitchen3 } from 'react-icons/tb'
import TopNav from '../../components/Header/TopNav'
import Capabilities from '../../components/Capabilities'

const CategoryPackaging = () => {
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
      <section className=' bg-[#F9FAFB]  py-5'>
      <div className=" sm:max-w-7xl max-w-[95%] mx-auto">
      <div className=' flex sm:flex-row flex-col justify-between'>
            <div className=' w-6/12'>

              <h2>Cosmetic Packaging</h2>

              <p className=' pt-1.5'>Luxurious and stunning high-quality cosmetic packaging to influence and indulge potential customers instantly. Stand out from the competition by using packaging with sturdy construction and eye-catching designs.
</p>
<img  src='https://www.halfpricepackaging.com/storage/cat_uploads/custom-cosmetic-boxes.webp'   alt='' />
            </div>

            <div className=' sm:w-5/12 w-full'> 
           <h2>Get an Instant Quote</h2>

           <div className=' pt-4'>
            <form className=' grid grid-cols-2 gap-3'>
                <div className=' w-full'>
                <Input
                    label="Full Name"
                    star={"*"}
                    placeholder="Full Name"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=' w-full'>
                <Input
                    label="Email"
                    star={"*"}
                    placeholder="Email"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=' w-full'>
                <Input
                    label="Phone"
                    star={"*"}
                    placeholder="Phone"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=' w-full'>
                <Input
                    label="Quantity"
                    star={"*"}
                    placeholder="Quantity (min: 200)*"
                    className={
                      " w-full border  border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
               
               
                <div className='  col-span-2'>
                <label
        htmlFor="first_name"
        className="  pb-1.5 flex  text-[#333333] text-sm font-medium   text-textColor"
      >
        Select Industry
        <p className=" text-red-600 m-0 pl-1">*</p>
      </label>
                <select
                    
                    placeholder="Quantity"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg outline-none bg-lightGray  text-textColor placeholder:text-gray-500 "
                    }
                  >
                    <option>Select Industry</option>
                    <option>Automotive</option>
                    <option>Electonics</option>
                    <option>Bakery</option>
                  </select>
                </div>
                <div className='  col-span-2'>
                <label
        htmlFor="first_name"
        className="  pb-1.5 flex  text-[#333333] text-sm font-medium   text-textColor"
      >
        Description
        <p className=" text-red-600 m-0 pl-1">*</p>
      </label>
                <textarea
                      rows={5}
                    placeholder="Description"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg outline-none bg-lightGray  text-textColor placeholder:text-gray-500 "
                    }
                  />
                </div>
                <div className=' w-full'>
                  <Button label={'Get a Quote'}   className="bg-[#213554] text-white" />
                </div>
            </form>
           </div>
         </div>
        </div>
      </div>

       
      </section>
      <BottomHero/>
      <section className=' py-8'>
      <div className=" sm:max-w-7xl max-w-[95%] mx-auto">
      <div className=' mb-5 flex  sm:flex-row  flex-col items-center gap-2.5'>

        <h2  className=' text-left'>Cosmetic Packaging Products</h2>
        <p className=' border-l  border-gray-300 pl-3 '>
        We cover all your packaging needs. Can't find yours?</p>
         <Link to=""  className=" uppercase">
          <p className=' font-bold  text-[#EE334B] flex items-center'>View all  <FaAngleRight className="ml-1" size={15} />  </p>
         </Link>
        </div>
      </div>
     
      

  
      </section>

      
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

      <section className=' py-8'>
      <div className=" sm:max-w-7xl  justify-between gap-5 items-center max-w-[95%]  flex sm:flex-row flex-col  mx-auto">
        
        <div className=' sm:w-6/12 w-full'>
        <h2>Key Features of Our Custom Retail Boxes:
        </h2>
        <p className=' py-2'>Our custom retail boxes are the perfect choice if you want to boost your product's presentation in the market. You get some amazing features, including:

</p>

<ul className=' list-disc mt-1.5 m-0'>
  <li>
  <strong>Sturdy Construction:</strong> durable material options that promise protection along with a premium look.
  </li>
  <li>
  <strong>Attractive Presentation:</strong> Attractive Presentation: offer a sleek and catchy presentation to get your products noticed.
  </li>
  <li>
  <strong>Consistent Branding:</strong> a printable surface that allows you to add your logo and branding elements
  </li>
  <li>
  <strong>Versatile Packaging:</strong> customize the shape and size to perfectly fit your product.
  </li>
  <li>
  <strong>Eco-Friendly:</strong> sustainable materials and inks to improve your brand identity
  </li>
  <li>
  <strong>Amazing Unboxing:</strong> impressive locking styles to improve the unboxing experience
  </li>
</ul>

<div className=' mt-3.5'>
<Button
                  className="bg-[#213554] text-white"
                  label={"Get Custom Quote"}
                />
</div>

        </div>

        <div className=' sm:w-5/12 w-full
        '>
          <img src='https://www.halfpricepackaging.com/_ipx/f_webp&fit_cover&s_556x363/https://www.halfpricepackaging.com/storage/cat_uploads/cosmetic-shipping-packaging.webp' className='  shadow-2xl w-full rounded-2xl' alt='' />
        </div>
         
      </div>
        </section>


        <section className=' mb-6'>
        <div className=" sm:max-w-7xl  bg-[#F6F6F6] rounded-xl p-6 justify-between gap-5 items-center max-w-[95%]   mx-auto">
        

            <h2 className=' text-center'>Learn More About Custom Bakery Boxes</h2>

            <h3  className=' pt-2.5'>Keep Your Baked Goods Fresh & Preserved with Durable Custom Bakery Boxes
            </h3>

            <p>Use our 100% food-safe and expertly designed custom bakery boxes to make your sweets more enticing for your customers. We offer exciting customization options for a variety of packaging boxes for various items. This includes cakes, pies, cupcakes, and donuts. We ensure the protection and better presentation of your bakery items. We do this by offering high-end material options. This includes kraft, cardboard, corrugated cardboard, and rigid paperboard.

</p>

<p>We provide all of the boxes and packaging options at competitive prices. Whether you’re looking for:

</p>


<ul className='  mt-1.5 m-0'>
  <li>
  <strong>Sturdy Construction:</strong> durable material options that promise protection along with a premium look.
  </li>
  <li>
  <strong>Attractive Presentation:</strong> Attractive Presentation: offer a sleek and catchy presentation to get your products noticed.
  </li>
  <li>
  <strong>Consistent Branding:</strong> a printable surface that allows you to add your logo and branding elements
  </li>
  <li>
  <strong>Versatile Packaging:</strong> customize the shape and size to perfectly fit your product.
  </li>
  <li>
  <strong>Eco-Friendly:</strong> sustainable materials and inks to improve your brand identity
  </li>
  <li>
  <strong>Amazing Unboxing:</strong> impressive locking styles to improve the unboxing experience
  </li>
</ul>




          </div>
        </section>

        <Capabilities/>




     <SampleKit/>
     <Footer/> 
    </>
  )
}

export default CategoryPackaging