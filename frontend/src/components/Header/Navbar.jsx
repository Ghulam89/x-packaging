import React, { useState } from "react";
import logo from "../../assets/images/brand/logo.png";
import Input from "../common/Input";
import Button from "../common/Button";
import BottomNav from "./BottomNav";
const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const OpenMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="">
      <div className="sm:max-w-7xl max-w-[95%] mx-auto">
        <div className="flex space-x-5 w-full justify-between h-16 items-center">
          <div>
            <img src={logo} alt="" className="sm:w-[200px] w-auto" />
          </div>
          <div className="w-lg">
            <Input
              placeholder={"Search..."}
              className={"rounded-full p-2 w-full border bg-white border-gray-300 shadow-xs"}
            />
          </div>
          <div className="sm:block hidden">
            <div className="flex items-center gap-2.5">
              <div className="lg:block hidden">
               <p className=" m-0 text-sm font-normal">Speak with a Packaging Expert</p>
               <h4 className="  m-0 font-semibold text-center text-[#213554]">(866) 225-2112</h4>    
            </div> 
            
              <div>
                <Button
                  className="bg-[#213554] text-white"
                  label={"Request A Quote"}
                />
              </div>
            </div>
          </div>

          <div className="block sm:hidden cursor-pointer   px-1.5 py-1.5 rounded-sm">
          
            <button  onClick={OpenMenu} class="text-right cursor-pointer" aria-label="Mobile Menu Toggle Button"><span class="block h-[3px] w-[32px] bg-[#555555] mb-[4px] ml-auto"></span><span class="block h-[3px] w-[24px] bg-[#555555] mb-[4px] ml-auto"></span><span class="block h-[3px] w-[16px] bg-[#555555] ml-auto"></span></button>
            
          </div>
        </div>

       
      </div>
      <BottomNav Menu={menu} OpenMenu={OpenMenu} />
    </div>
  );
};

export default Navbar;