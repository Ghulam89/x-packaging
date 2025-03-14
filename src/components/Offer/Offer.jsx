import React from 'react'
import Button from '../common/Button'
import { RiShoppingCartLine } from 'react-icons/ri'

const Offer = () => {
  return (
    <div className=' bg-[#EE334B] py-4'>

    <div className=' sm:max-w-7xl mx-auto w-[95%] flex justify-between items-center'>
    <div>
        <h3 className=' font-bold text-white  flex gap-1.5  items-center'> <p className=' text-2xl  text-[#213554]'>Get 30%</p> Off Your First Order!</h3>
     </div>
     <div>
        <Button label={'Order Now'} rIcons={<RiShoppingCartLine color='white' size={15} />} className='  bg-[#213554]   hover:border-white hover:border text-white font-semibold' />
     </div>
    </div>
    </div>
    
  )
}

export default Offer