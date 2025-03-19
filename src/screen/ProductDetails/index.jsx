import React, { useEffect, useState } from 'react'
import TopNav from '../../components/Header/TopNav'
import BottomNav from '../../components/Header/BottomNav'
import Footer from '../../components/footer/Footer'
import BottomHero from '../../components/common/BottomHero'
import SampleKit from '../../components/SampleKit'
import Tabs from '../../components/common/Tabs'
import ProductDetail from '../../components/common/ProductDetail'
import Navbar from '../../components/Header/Navbar'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { IoHomeOutline } from 'react-icons/io5'
import { LiaAngleRightSolid } from 'react-icons/lia'
const ProductDetails = ({
    children: slides,
    autoSlide = false,
    autoSlideInterval = 3000,
}) => {

    const images = [
        "https://www.halfpricepackaging.com/_ipx/f_webp&fit_cover&s_550x550/https://www.halfpricepackaging.com/storage/product_uploads/tuck-top-mailing-boxes.jpg",
        "https://www.halfpricepackaging.com/_ipx/f_webp&fit_cover&s_550x550/https://www.halfpricepackaging.com/storage/product_uploads/corrugated-tuck-top-box.jpg",
        "https://www.halfpricepackaging.com/_ipx/f_webp&fit_cover&s_550x550/https://www.halfpricepackaging.com/storage/product_uploads/tuck-top-mailer.jpg",
      ];

    const [curr, setCurr] = useState(0);
    const prev = () =>
      setCurr((curr) =>
        curr === 0
          ? [
              images?.[0],
              images?.[1],
              images?.[2],
              images?.[0],
            ].length - 1
          : curr - 1
      );
    const next = () =>
      setCurr((curr) =>
        curr ===
        [
            images?.[0],
            images?.[1],
            images?.[2],
            images?.[0],
        ]?.length -
          1
          ? 0
          : curr + 1
      );
  
    useEffect(() => {
      if (!autoSlide) return;
      const slideInterval = setInterval(next, autoSlideInterval);
      return () => clearInterval(slideInterval);
    }, []);

    const goToSlide = (index) => {
        setCurr(index);
      };

    const customBox = [
        {
          id: 1,
        
          title: "Description",
          subTitle: "Strong Boxes for Special Things: Rigid Boxes Explained!",
          description:
            "Rigid boxes are like super strong and unbreakable homes for extraordinary things. The manufacturers make these boxes using special materials to keep toys, makeup, and nice things protected. Additionally, people use printed rigid boxes to make things look extra special by painting them with cool colors and designs.",
          image:
            "https://umbrellapackaging.com/wp-content/uploads/2024/01/rigid-box.webp",
          buttonUrl: "#",
        },
        {
          id: 2,
          title: "Add-ons & Finishing",
          subTitle: "Super Boxes: How Corrugated Magic Keeps Things Safe!",
          description:
            "Corrugated boxes are special types of containers made from a material called corrugated cardboard. Essentially, these boxes consist of three layers. The inner layer, known as corrugation, adds strength and durability to the box. Perfect for mailing and shipping, they make sure your items reach their destination in great shape. Trust corrugated boxes for a safe and secure journey!",
          image:
            "https://umbrellapackaging.com/wp-content/uploads/2024/01/corrugated2.webp",
          buttonUrl: "#",
        },
        {
          id: 3,
          title: "Paper weight",
          subTitle: "Go Green with Kraft Boxes!",
          description:
            "Make a smart choice with Kraft boxes—good for your stuff and good for the environment! These boxes are strong containers for packing things, and they’re made from a special paper called kraft paper. These boxes are handy for packing lots of different things, showing that they work well for many uses.",
          image:
            "https://umbrellapackaging.com/wp-content/uploads/2024/01/kraft.webp",
          buttonUrl: "#",
        },
        {
          id: 4,
          title: "Shipping",
          subTitle:
            "Magic of Cardboard: Versatile Containers for Retail Packaging!",
          description:
            "Cardboard boxes are like strong, big containers made out of thick paper. They’re used for packing and carrying lots of different things. They come in all shapes and sizes, like small ones for holding toys or big ones. These boxes are perfect for packaging your items and making them look neat on the shelves. They keep your products safe and make your shop look great!",
          image:
            "https://umbrellapackaging.com/wp-content/uploads/2024/01/cardboard.webp",
          buttonUrl: "#",
        },
        {
          id: 4,
          title: "Materials",
          subTitle:
            "Fancy Boxes: Cool Black Linen Style!",
          description:
            "Get sleek Black Linen boxes for your special items! These boxes look cool and feel smooth. They come in black color. These boxes are eco-friendly helping to keep the Earth healthy. Perfect for keeping your things safe and looking fancy. You can choose black Linen boxes for a stylish way to store and protect your stuff!",
          image:
            "https://umbrellapackaging.com/wp-content/uploads/2024/01/blak-linen-boxes.webp",
          buttonUrl: "#",
        },
        {
            id: 4,
            title: "Faq's",
            subTitle:
              "Fancy Boxes: Cool Black Linen Style!",
            description:
              "Get sleek Black Linen boxes for your special items! These boxes look cool and feel smooth. They come in black color. These boxes are eco-friendly helping to keep the Earth healthy. Perfect for keeping your things safe and looking fancy. You can choose black Linen boxes for a stylish way to store and protect your stuff!",
            image:
              "https://umbrellapackaging.com/wp-content/uploads/2024/01/blak-linen-boxes.webp",
            buttonUrl: "#",
          }
      ];
    
      const data = customBox.map((box) => ({
        title: box.title,
        content: <ProductDetail {...box} />,
      }));


    
    
  return (
    <>
     <TopNav/>
     <Navbar/>
   
     <section className=' bg-[#F4F4F4] py-8'>
     <div className=' lg:max-w-7xl max-w-[95%]   flex lg:flex-row flex-col gap-4 mx-auto'>
        <div className='  lg:w-6/12 '>
            <div className=' flex gap-2 pb-5 items-center'>
                       <IoHomeOutline size={20} /> <LiaAngleRightSolid />
                            <h6 className=''> 
                              Box By industry
                            </h6>
                        </div>
        <div className='w-full flex gap-7'>
        <div className="  sm:block md:block hidden">
            <div className="flex flex-col items-center justify-center gap-2">
              {[
                images?.[0],
                images?.[1],
                images?.[2],
                images?.[0],
              ]?.map((_, i) => (
                <div
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`
              transition-all w-28 rounded-xl  h-28  overflow-hidden bg-white 
              ${curr === i ? " w-20 h-20 border-2 border-[#F05367] border-dashed" : "bg-opacity-50"}
            `}
                >
                  <img
                    src={_}
                    alt=""
                    className=" w-full h-full   object-center  "
                  />
                </div>
              ))}
            </div>
          </div>
        <div className="overflow-hidden relative">
            <div
              className="flex  relative transition-transform ease-out duration-500 h-[90vh]"
              style={{ transform: `translateX(-${curr * 100}%)` }}
            >
              {[
                images[0],
                images?.[1],
                images?.[2],
                images?.[0],
              ]?.map((image, i) => {
                console.log(image, "slider image============>>>>>>>>>>>>>>");
                return (
                  <div key={i} className="flex-none w-full  rounded-2xl overflow-hidden h-full">
                    <img
                    //   onClick={openSlider}
                      src={image}
                      alt=""
                      className="w-full cursor-pointer h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>

            <button
              onClick={prev}
              className=" w-12 h-12 shadow rounded-full cursor-pointer  absolute left-5 top-56 flex  justify-center items-center bg-white/80 text-gray-800 hover:bg-white"
            >
              <TfiAngleLeft size={20} className="" />
            </button>
            <button
              onClick={next}
              className=" w-12 h-12  rounded-full absolute cursor-pointer right-5 top-56 flex justify-center items-center shadow bg-white/80 text-gray-800 hover:bg-white"
            >
              <TfiAngleRight size={20} />
            </button>
            {/* </div> */}
          </div>
        </div>
      
          
        </div>

        <div className="pt-3.5 lg:w-6/12 w-full">
            <h3 className=' pb-2'>Tuck Top Mailer Boxes
            </h3>
            <from>
              <div className=' grid grid-cols-2 pb-2 gap-2'>
              <div className=" w-full">
                  <Input
                    label="Name"
                    star={"*"}
                    placeholder="Name"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Email"
                    star={"*"}
                    placeholder="Email"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Phone Number"
                    star={"*"}
                    placeholder="Phone Number"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Company Name"
                    star={"*"}
                    placeholder="Company Name"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
            </div>  
              <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2">
              
                <div className=" w-full">
                  <Input
                    label="Box Style"
                    star={"*"}
                    placeholder="Box Style"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Size (Length)"
                    star={"*"}
                    placeholder="Length"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Size (Width)"
                    star={"*"}
                    placeholder="width"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Size (Depth)"
                    star={"*"}
                    placeholder="Depth"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Unit"
                    star={"*"}
                    placeholder="Inches"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Stock"
                    star={"*"}
                    placeholder="Stock"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Colors"
                    star={"*"}
                    placeholder="Colors"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Printing Sides"
                    star={"*"}
                    placeholder="Inside"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Quantity"
                    star={"*"}
                    placeholder="Quantity"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Add-Ons"
                    star={"*"}
                    placeholder=""
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" col-span-5">
                <label
                    htmlFor="first_name"
                    className="  pb-1.5   text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Upload Your Design, Max Size 5MB
                    <p className=" flex gap-0.5   text-xs m-0 pl-1">Allowed File Types:<p className=" font-semibold text-xs"> png, pdf, jpg, jpeg, webp</p></p>
                  </label>
                  <input placeholder=""  className=" p-2.5 bg-white rounded-lg text-sm mt-2" type="file" />
                </div>
                <div className="col-span-5">
                  <label
                    htmlFor="first_name"
                    className="  pb-1.5 flex  text-sm font-medium   text-textColor"
                  >
                    Description
                    <p className=" text-red-600 m-0 pl-1">*</p>
                  </label>
                  <textarea
                  rows={4}
                    className=" w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    placeholder="Tell us the size / dimensions, material, finising, add-ons, and design preferences."
                  ></textarea>
                </div>
                
              </div>
              <div>
              <div className=" w-full  flex justify-end mt-2">
                <Button
                label="Request A Quote"
                className="bg-[#213554]    w-full text-white"
              />
                </div>
              </div>
            </from>
          </div>
     </div>
     </section>
     
     <BottomHero/>
     <section className=' py-8'>
      <div className=" sm:max-w-7xl  justify-between gap-5 items-center max-w-[95%]  flex sm:flex-row flex-col  mx-auto">
        
        <div className=' sm:w-6/12 w-full'>
        <h2>Product Overview

        </h2>
<p className=' py-2'>Every business owner and company looks for a unique and protective way to ship their products to their customers. Tuck top mailer boxes are elegant, reusable, and recyclable containers that are highly in demand in the market. You can get them customized according to your requirements, whether it is a size or artwork - you get exactly what you want.
</p>
<p className=' py-2'>At Half Price Packaging, we specialize in designing customized mailer boxes that align with your brand. Our world-class graphic design team understands your vision and presents it in the best possible way. From manufacturing tab lock tuck top box flaps to delivering jaw-dropping printing, we ensure perfection in every detail. These crates are constructed using high-quality cardboard material, ensuring the safe transportation of your items without any damage.




</p>

        </div>

        <div className=' sm:w-5/12 w-full
        '>
          <img src='https://www.halfpricepackaging.com/_ipx/f_webp&fit_cover&s_600x600/https://www.halfpricepackaging.com/storage/product_uploads/tuck-top-mailer-boxes.jpg' className='  shadow-2xl w-full rounded-2xl' alt='' />
        </div>
         
      </div>
        </section>
        <section className=' max-w-7xl mx-auto'>
        <div className="my-10">
        <Tabs defaultTab={"Rigid Boxes"} tabs={data} />
      </div>
        </section>
       
        <SampleKit/>
     <Footer/>   

    </>
  )
}

export default ProductDetails