import React, { useState } from 'react'
import BottomHero from '../../components/common/BottomHero'
import Navbar from '../../components/Header/Navbar'
import Footer from '../../components/footer/Footer'
import SampleKit from '../../components/SampleKit'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { Link } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa'
import ProductCard from '../../components/common/ProductCard'

const CategoryPackaging = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };
  
  return (
    <>
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

      
      <section className=' pb-9'>
      <div className=" sm:max-w-7xl max-w-[95%] mx-auto">
      <div className=" bg-white  z-40 sticky top-0 flex justify-between items-center">
      <div className=" flex  pt-4 w-full gap-12">

         <div className={` sm:w-3/12 w-8/12   bg-white ${isMenuOpen
                  ? "block  fixed  text-center lg:p-5 p-0 top-0 right-0  z-50 left-0 w-[60%] h-full bg-white"
                  : "w-[20%] hidden lg:block  bg-white"
                }`}>
          
          <h3  className=' border-b border-gray-300  pb-1.5'>Industries</h3>  

          <ul className=' pt-2.5'>
            <li>
              <p  className=''>Cosmetic Packaging</p>
            </li>
          </ul>
          </div>
          <div className="grid mt-3 gap-4 grid-cols-2 md:grid-cols-4  lg:grid-cols-4">
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
      </div>
      </section>



     <SampleKit/>
     <Footer/> 
    </>
  )
}

export default CategoryPackaging