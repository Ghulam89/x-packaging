import React from "react";
import Input from "../common/Input";
import Button from "../common/Button";

const GetPriceQuote = () => {
  return (
    <>
    <div className="bg-[#FEF7E7]">
      <div className="   sm:max-w-7xl max-w-[95%] mx-auto">
        <div className="   my-7 p-4 rounded-md w-full">
          <h1 className=" text-[#333333] text-center font-semibold">
            Get price Quote
          </h1>
          <div className="pt-3.5">
            <h6>Product Specification</h6>
            <from>
              <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4">
                <div className=" w-full">
                  <Input
                    label="Box Style"
                    star={"*"}
                    placeholder="Box Style"
                    className={
                      " w-full border border-[#333333] bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Size (Length)"
                    star={"*"}
                    placeholder="Length"
                    className={
                      " w-full border border-[#333333] bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Size (Width)"
                    star={"*"}
                    placeholder="width"
                    className={
                      " w-full border border-[#333333] bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Size (Depth)"
                    star={"*"}
                    placeholder="Depth"
                    className={
                      " w-full border border-[#333333] bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Unit"
                    star={"*"}
                    placeholder="Inches"
                    className={
                      " w-full border border-[#333333] bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Stock"
                    star={"*"}
                    placeholder="Stock"
                    className={
                      " w-full border border-[#333333] bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Colors"
                    star={"*"}
                    placeholder="Colors"
                    className={
                      " w-full border border-[#333333] bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Printing Sides"
                    star={"*"}
                    placeholder="Inside"
                    className={
                      " w-full border border-[#333333] bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Quantity"
                    star={"*"}
                    placeholder="Quantity"
                    className={
                      " w-full border border-[#333333] bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" w-full">
                  <Input
                    label="Add-Ons"
                    star={"*"}
                    placeholder=""
                    className={
                      " w-full border border-[#333333] bg-white  text-xs p-2.5 rounded-lg"
                    }
                  />
                </div>
                <div className=" sm:col-span-2 col-span-1">
                <label
                    htmlFor="first_name"
                    className="  pb-1.5   text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Upload Your Design, Max Size 5MB
                    <p className=" flex gap-0.5   text-xs m-0 pl-1">Allowed File Types:<p className=" font-semibold text-xs"> png, pdf, jpg, jpeg, webp</p></p>
                  </label>
                  <input placeholder=""  className=" p-2.5 bg-white rounded-lg text-sm mt-2" type="file" />
                </div>
                <div className=" sm:col-span-3 col-span-1">
                  <label
                    htmlFor="first_name"
                    className="  pb-1.5 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Description
                    <p className=" text-red-600 m-0 pl-1">*</p>
                  </label>
                  <textarea
                    className=" w-full border border-[#333333] bg-white  text-xs p-2.5 rounded-lg"
                    placeholder="Tell us the size / dimensions, material, finising, add-ons, and design preferences."
                  ></textarea>
                </div>
                
              </div>
              <div>
              <div className=" w-full  flex justify-end mt-7">
                <Button
                label="Next"
                className="bg-[#213554]    w-40 text-white"
              />
                </div>
              </div>
            </from>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default GetPriceQuote;
