import React from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import Button from './Button'

const OfferCard = ({discount,title,subTitle}) => {
  return (
    <div className='bg-gradient-to-r from-[#EE334B] to-[#EE334B]/90 py-6 shadow-lg'>
      <div className='sm:max-w-8xl mx-auto w-[95%] flex sm:flex-row flex-col gap-4 justify-between items-center'>
        <div>
          <h3 className='font-bold text-white flex gap-2 flex-wrap items-center text-lg sm:text-xl'> 
            {subTitle} 
            <span className='text-3xl sm:text-4xl font-extrabold text-[#213554] bg-white px-3 py-1 rounded-lg shadow-md'> 
              {discount}
            </span> 
            {title}
          </h3>
        </div>
        <div>
          <Button 
            label={'Order Now'} 
            rIcons={<RiShoppingCartLine size={18} />} 
            className='bg-[#213554] hover:bg-[#213554]/90 text-white font-semibold shadow-lg hover:shadow-xl' 
          />
        </div>
      </div>
    </div>
  )
}

export default OfferCard