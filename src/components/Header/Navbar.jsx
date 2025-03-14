import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
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
              <div className="">
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

          <div className="block sm:hidden cursor-pointer  px-1.5 py-1.5 rounded-sm">
            {menu ? (
              <svg
              onClick={OpenMenu}
              width={25}
              aria-hidden="true"
              role="presentation"
              className="elementor-menu-toggle__icon--close e-font-icon-svg e-eicon-close"
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z"></path>
            </svg>
            ) : (
              
              
            <button  onClick={OpenMenu} class="text-right" aria-label="Mobile Menu Toggle Button"><span class="block h-[3px] w-[32px] bg-[#555555] mb-[4px] ml-auto"></span><span class="block h-[3px] w-[24px] bg-[#555555] mb-[4px] ml-auto"></span><span class="block h-[3px] w-[16px] bg-[#555555] ml-auto"></span></button>
            )}
          </div>
        </div>

       
      </div>
      <BottomNav Menu={menu} OpenMenu={OpenMenu} />
    </div>
  );
};

export default Navbar;