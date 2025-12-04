import React from 'react'
import { IoHomeOutline } from 'react-icons/io5'
import { LiaAngleRightSolid } from 'react-icons/lia'

const Banner = ({title,subTitle}) => {
  return (
    <div className='  h-40 bg-[#F9FAFB] flex items-center'>
       <div className=' px-9'>
       <div className=' flex gap-2 items-center'>
       <IoHomeOutline /> <LiaAngleRightSolid />
            <p> 
            {subTitle}</p>
        </div>
      <h2>{title}</h2> 
       </div>
    </div>
  )
}

export default Banner