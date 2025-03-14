import React from 'react'
import CardSlider from '../CardSlider/CardSlider';
import CategoryCard from '../common/CategoryCard';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';

const FeaturesPackaging = () => {
    const Data = [
        {
          id: 1,
          title: "Apparel and Fashion Boxes",
          image:
            "https://umbrellapackaging.com/wp-content/uploads/2024/09/Custom-Apparel-And-Fashion-Boxes-250x179.webp",
        },
        {
          id: 2,
          title: "Bakery boxes",
          image:
            "https://umbrellapackaging.com/wp-content/uploads/2024/04/Custom-Bakery-Boxes-2-250x179.webp",
        },
        {
          id: 3,
          title: "Candle Boxes",
          image:
            "https://umbrellapackaging.com/wp-content/uploads/2024/04/Candle-Boxes-250x179.webp",
        },
        {
          id: 4,
          title: "Cardboard Boxes",
          image:
            "https://umbrellapackaging.com/wp-content/uploads/2024/05/Cardboard-Boxes-250x179.webp",
        },
        {
          id: 5,
          title: "CBD Boxes",
          image:
            "https://umbrellapackaging.com/wp-content/uploads/2024/04/cbd-boxes--250x179.webp",
        },
        {
          id: 6,
          title: " Chocolate Boxes",
          image:
            "https://umbrellapackaging.com/wp-content/uploads/2024/04/cbd-boxes--250x179.webp",
        },
        {
            id: 6,
            title: " Chocolate Boxes",
            image:
              "https://umbrellapackaging.com/wp-content/uploads/2024/04/cbd-boxes--250x179.webp",
          },
          {
            id: 6,
            title: " Chocolate Boxes",
            image:
              "https://umbrellapackaging.com/wp-content/uploads/2024/04/cbd-boxes--250x179.webp",
          },
          {
            id: 6,
            title: " Chocolate Boxes",
            image:
              "https://umbrellapackaging.com/wp-content/uploads/2024/04/cbd-boxes--250x179.webp",
          },
      ];

  return (
    <div className=' my-12'>
        <div className=' max-w-7xl mx-auto'>
        <div className=' mb-5 flex  sm:flex-row  flex-col items-center gap-2.5'>
        <h2  className=' text-left'>Featured Product Packaging</h2>
       
        <p className=' border-l  border-gray-300 pl-3 '>
        Discover packaging tailored for your products. Can’t find what you need?</p>
         <Link to=""  className=" uppercase">
          <p className=' font-bold  text-[#EE334B] flex items-center'>View all  <FaAngleRight className="ml-1" size={15} />  </p>
         </Link>
        </div>
<CardSlider
              top={20}
              items={Data?.map((item, index) => {
                
                return (
                  <>
                    <div className="">
                      <CategoryCard data={item} />
                    </div>
                  </>
                );
              })}
            />
        </div>
        
    </div>
  )
}

export default FeaturesPackaging