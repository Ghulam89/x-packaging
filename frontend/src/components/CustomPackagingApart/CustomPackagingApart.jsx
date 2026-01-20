import React, { useMemo } from 'react';
import abstractBg from '../../assets/images/custom packaging production.webp';
import { Icon10, Icon11, Icon12, Icon7, Icon8, Icon9 } from '../../assets';

const CustomPackagingApart = () => {

  const printingData = useMemo(() => [
    {
      id: 1,
      icon: Icon7,
      number: '10+',
      title: 'Finishes'
    },
    {
      id: 2,
      icon: Icon8,
      number: '12+',
      title: 'Embellishments'
    },
    {
      id: 3,
      icon: Icon9,
      number: '6+',
      title: 'Printing Techniques'
    },
    {
      id: 4,
      icon: Icon10,
      number: '6+',
      title: 'Premium Materials'
    }
  ], []);

  const oldData = useMemo(() => [
    {
      id: 1,
      icon: Icon7,
      title: 'No Die & Plate Charges',
      description: 'Enjoy the benefit of no additional costs for die and plate setups on your custom orders.'
    },
    {
      id: 2,
      icon: Icon8,
      title: 'No Minimum Order Qty',
      description: 'Order as few or as many items as you need without any minimum quantity restrictions.'
    },
    {
      id: 3,
      icon: Icon9,
      title: 'Free Design',
      description: 'Avail professional design services without any added fees, ensuring your vision comes to life.'
    },
    {
      id: 4,
      icon: Icon10,
      title: 'Quickest Turnaround',
      description: 'Get your orders processed and delivered promptly, ensuring the fastest turnaround time possible.'
    },
    {
      id: 5,
      icon: Icon11,
      title: 'Cheapest Prices',
      description: 'Benefit from our regular discounted rates and get the best custom packaging at the lowest prices.'
    },
    {
      id: 6,
      icon: Icon12,
      title: 'Free Shipping',
      description: 'Enjoy the added perk of free shipping on your orders, making it even more cost-effective for you.'
    }
  ], []);
 
  return (
    <div className=" mx-auto">
      <div className="text-center py-5">
        <h2 className="sm:text-[35px] text-[25px] pb-3 font-sans font-[600] text-[#333333]">
          Vivid Custom Printing – Precision, Personalization & Brand Elevation
        </h2>
        
        <p className="sm:text-[18px] text-[16px] text-[#666666] max-w-4xl mx-auto mb-8 px-4">
          Your packaging is more than just a container—it's a canvas for your brand. Our custom-printed boxes are designed to bring your vision to life with rich colors, precision detailing, and premium finishes, ensuring that every package reflects your brand identity with unmatched clarity and impact.
        </p>
        
       

        <div className="mt-8">
          
          
          <div 
            className=' p-6 sm:p-8  relative  bg-cover  bg-center bg-no-repeat '
            style={{ backgroundImage: `url(${abstractBg})` }}
          >
            <div className="grid grid-cols-1 max-w-[95%] sm:max-w-8xl mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {oldData.map((item) => (
                <div key={item.id} className="text-center px-2">
                  <img 
                    src={item.icon} 
                    alt={item.title}
                    width={80} 
                    height={80}
                    className='mx-auto'
                    loading="lazy"
                  />
                  <strong className="font-[600] text-[#111111] block mt-2 text-[18px]">
                    {item.title}
                  </strong>
                  <p className="m-0 text-[16px] mt-1 text-[#666666]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CustomPackagingApart);