import React from 'react'
import sample from '../../assets/images/box-sample-kit.webp';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

const SampleKit = () => {
  return (
    <div className="bg-[#F9F9F9] py-8">
      <div className="sm:max-w-8xl mx-auto w-[95%] flex sm:flex-row flex-col justify-between gap-8">
        <div className="sm:w-6/12 w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#213554]">
            Order a Sample Kit
          </h2>
          <p className="text-[#213554] pt-2 text-sm sm:text-base">
            Get free consultation and order your sample kit to feel more confident 
            choosing Half Price Packaging as your product packaging partner.
          </p>

          <div className="pt-5">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                star="*"
                placeholder="Full Name"
              />
              <Input
                label="Email"
                star="*"
                placeholder="Email"
                type="email"
              />
              <Input
                label="Phone"
                star="*"
                placeholder="Phone"
              />
              <Input
                label="Company Name"
                star="*"
                placeholder="Company Name"
              />
              <Input
                label="Website"
                star="*"
                placeholder="Website"
              />
              <Input
                label="Physical Address"
                star="*"
                placeholder="Physical Address"
              />
              <Input
                label="Quantity"
                star="*"
                placeholder="Quantity"
              />
              <Select
                label="Select Industry"
                name="industry"
                star="*"
                placeholder="Select Industry"
              >
                <option>Select Industry</option>
                <option>Automotive</option>
                <option>Electronics</option>
                <option>Bakery</option>
              </Select>

              <div className="w-full md:col-span-2 pt-2">
                <Button
                  label="Order Now"
                  className="w-full sm:w-auto"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="sm:w-4/12 w-full flex justify-center">
          <img src={sample} alt="Sample Kit" className="w-full max-w-md  object-cover" />
        </div>
      </div>
    </div>
  )
}

export default SampleKit