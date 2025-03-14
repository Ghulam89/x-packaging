import React from 'react'
import CardSlider from '../CardSlider/CardSlider';
import CategoryCard from '../common/CategoryCard';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import StoriesCard from '../common/StoriesCard';

const InspiringStories = () => {
    const Data = [
        {
          id: 1,
          title: "Luxury Treats wrapped in Custom Packaging with love from Half Price Packaging For Bonbon NYC!",
          image:
            "https://www.halfpricepackaging.com/_ipx/f_webp&s_420x245/https://www.halfpricepackaging.com/storage/post_images/bonbon-nyc-custom-packaging-solutions.webp",
          desc:"The Candy-lovers' Paradise, BonBon - A Swedish Candy Company , was founded in 2018. Three close pals, Robert Persson, Leonard Schaltz, and Selim Adira sprinkled magic to ignite a candy revolution in the USA, driven by love for their homeland and its sweet delectable."
        },
        {
            id:2,
            title: "Microdays Gets Sustainable Packaging Boxes With High Functionality",
            image:
              "https://www.halfpricepackaging.com/_ipx/f_webp&s_420x245/https://www.halfpricepackaging.com/storage/post_images/sustainable-packaging-for-mircodays.webp",
            desc:"Magic Mushrooms! Microdays have regiments of microdose mushroom products, including truffles, chocolate bars, and capsules. After using the items, you will feel the weight of your anxiety and depression has been lifted from your shoulders. It will help to restore positivity, motivation, focus, creativity, and resilience. Also, your coping capacity, knowledge of self, and cognitive function will skyrocket."
          },
          {
            id:2,
            title: "Microdays Gets Sustainable Packaging Boxes With High Functionality",
            image:
              "https://www.halfpricepackaging.com/_ipx/f_webp&s_420x245/https://www.halfpricepackaging.com/storage/post_images/sustainable-packaging-for-mircodays.webp",
            desc:"Magic Mushrooms! Microdays have regiments of microdose mushroom products, including truffles, chocolate bars, and capsules. After using the items, you will feel the weight of your anxiety and depression has been lifted from your shoulders. It will help to restore positivity, motivation, focus, creativity, and resilience. Also, your coping capacity, knowledge of self, and cognitive function will skyrocket."
          },
          {
            id:2,
            title: "Microdays Gets Sustainable Packaging Boxes With High Functionality",
            image:
              "https://www.halfpricepackaging.com/_ipx/f_webp&s_420x245/https://www.halfpricepackaging.com/storage/post_images/sustainable-packaging-for-mircodays.webp",
            desc:"Magic Mushrooms! Microdays have regiments of microdose mushroom products, including truffles, chocolate bars, and capsules. After using the items, you will feel the weight of your anxiety and depression has been lifted from your shoulders. It will help to restore positivity, motivation, focus, creativity, and resilience. Also, your coping capacity, knowledge of self, and cognitive function will skyrocket."
          },
          {
            id:2,
            title: "Microdays Gets Sustainable Packaging Boxes With High Functionality",
            image:
              "https://www.halfpricepackaging.com/_ipx/f_webp&s_420x245/https://www.halfpricepackaging.com/storage/post_images/sustainable-packaging-for-mircodays.webp",
            desc:"Magic Mushrooms! Microdays have regiments of microdose mushroom products, including truffles, chocolate bars, and capsules. After using the items, you will feel the weight of your anxiety and depression has been lifted from your shoulders. It will help to restore positivity, motivation, focus, creativity, and resilience. Also, your coping capacity, knowledge of self, and cognitive function will skyrocket."
          },
          {
            id:2,
            title: "Microdays Gets Sustainable Packaging Boxes With High Functionality",
            image:
              "https://www.halfpricepackaging.com/_ipx/f_webp&s_420x245/https://www.halfpricepackaging.com/storage/post_images/sustainable-packaging-for-mircodays.webp",
            desc:"Magic Mushrooms! Microdays have regiments of microdose mushroom products, including truffles, chocolate bars, and capsules. After using the items, you will feel the weight of your anxiety and depression has been lifted from your shoulders. It will help to restore positivity, motivation, focus, creativity, and resilience. Also, your coping capacity, knowledge of self, and cognitive function will skyrocket."
          },
          {
            id:2,
            title: "Microdays Gets Sustainable Packaging Boxes With High Functionality",
            image:
              "https://www.halfpricepackaging.com/_ipx/f_webp&s_420x245/https://www.halfpricepackaging.com/storage/post_images/sustainable-packaging-for-mircodays.webp",
            desc:"Magic Mushrooms! Microdays have regiments of microdose mushroom products, including truffles, chocolate bars, and capsules. After using the items, you will feel the weight of your anxiety and depression has been lifted from your shoulders. It will help to restore positivity, motivation, focus, creativity, and resilience. Also, your coping capacity, knowledge of self, and cognitive function will skyrocket."
          },

      ];

  return (
    <div className=' mb-12'>
        <div className=' max-w-7xl mx-auto'>
        <div className=' mb-5 flex  sm:flex-row  flex-col items-center gap-2.5'>
        <h2  className=' text-left'>Inspiring Client Success Stories</h2>
       
        <p className=' border-l  border-gray-300 pl-3 '>
        Unwrap our Brand Stories and read insights from industry experts </p>
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
                      <StoriesCard data={item} />
                    </div>
                  </>
                );
              })}
            />
        </div>
        
    </div>
  )
}

export default InspiringStories