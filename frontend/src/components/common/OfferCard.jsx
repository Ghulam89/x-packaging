import React from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import Button from './Button'

const OfferCard = ({discount,title,subTitle}) => {
  return (
    <div className=' bg-[#EE334B] py-4'>

    <div className=' sm:max-w-7xl mx-auto w-[95%] flex sm:flex-row flex-col gap-3 justify-between items-center'>
    <div>
        <h3 className=' font-bold text-white  flex gap-1.5   flex-wrap  items-center'> {subTitle} <h5 className=' text-2xl  text-[#213554]'> {discount}</h5> {title}</h3>
     </div>
     <div>
        <Button label={'Order Now'} rIcons={<RiShoppingCartLine color='white' size={15} />} className='  bg-[#213554]   hover:border-white hover:border text-white font-semibold' />
     </div>
    </div>
    </div>
  )
}

export default OfferCard