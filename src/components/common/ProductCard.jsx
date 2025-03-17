import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({image,title,unit,delivery}) => {
  return (
    <Link className=' w-54'>
      <div className=''>
        <img src='https://www.halfpricepackaging.com/_ipx/f_webp&fit_cover&s_336x336/https://www.halfpricepackaging.com/storage/product_uploads/makeup-boxes.jpg'  className=' rounded-3xl'  alt='' />
        <span  className=' text-xs'>Min. 200 units . Delivery: 4 weeks</span>
        <h5 className=''>Makeup Boxes</h5>

      </div>
    </Link>
  )
}

export default ProductCard