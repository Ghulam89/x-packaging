// Accordion.js

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Accordion(props) {
    return (
      <>
        <div className="   border border-gray-200 shadow-sm bg-[#F9FAFB] rounded-xl py-1.5 px-4 mb-5">
          <button
            className="w-full text-black items-center   bg-transparent py-2  flex text-[15px] justify-between  text-left
                              transition duration-300"
            onClick={props.toggleAccordion}
          >
            <div className=" flex  items-center gap-3">
              <div className="">
                <h2 className=" text-[#EE334B] font-semibold">{props.id}</h2>
              </div>
              <p className=" font-semibold m-0">
                {" "}
                {props.title}
              </p>
            </div>
            <p className=" cursor-pointer">
              {props.isOpen ? (
                <>
                <IoIosArrowDown color="#EE334B" size={25} />
                </>
              ) : (
                <IoIosArrowUp  color="#EE334B" size={25} />
              )}
            </p>
          </button>
          {props.isOpen && (
            <div className="       text-[16px]">
              {props.data}
            </div>
          )}
        </div>
      </>
    );
  }