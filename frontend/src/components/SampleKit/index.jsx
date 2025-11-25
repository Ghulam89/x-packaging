import React from 'react'
import sample from '../../assets/images/box-sample-kit.webp';
import Input from '../common/Input';
import Button from '../common/Button';
const SampleKit = () => {
  return (
    <div className=' bg-[#F9F9F9]  py-8'>
       <div className=' sm:max-w-7xl mx-auto w-[95%] flex sm:flex-row flex-col justify-between'>
         <div className=' sm:w-6/12 w-full'> 
           <h2>Order a Sample Kit</h2>
           <p className=' text-[#213554] pt-1.5'>Get Free Consultation and Order Your Sample Kit to feel More Confident for Choosing Half Price Packaging as your product packaging partner.</p>

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
                    label="Company  Name"
                    star={"*"}
                    placeholder="Company  Name"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=' w-full'>
                <Input
                    label="Website"
                    star={"*"}
                    placeholder="Website"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=' w-full'>
                <Input
                    label="Physical Address"
                    star={"*"}
                    placeholder="Physical Address"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=' w-full'>
                <Input
                    label="Quantity"
                    star={"*"}
                    placeholder="Quantity"
                    className={
                      " w-full border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=' w-full'>
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
                      " w-full  border border-gray-300 shadow bg-white  text-xs p-2.5 rounded-lg outline-none bg-lightGray  text-textColor placeholder:text-gray-500 "
                    }
                  >
                    <option>Select Industry</option>
                    <option>Automotive</option>
                    <option>Electonics</option>
                    <option>Bakery</option>
                  </select>
                </div>
                <div className=' w-full'>
                  <Button label={'Order Now'}   className="bg-[#213554] text-white" />
                </div>
            </form>
           </div>
         </div>
         <div className=' sm:w-4/12 w-full'>
            <img src={sample} alt='' />
         </div>
        </div> 

    </div>
  )
}

export default SampleKit