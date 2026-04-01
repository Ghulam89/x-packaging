 "use client";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
type Props = {
  id?: string;
  title: string;
  data: string;
  isOpen: boolean;
  toggleAccordion: () => void;
};
export default function Accordion({ id, title, data, isOpen, toggleAccordion }: Props) {
  return (
    <div className="border-b-2 border-gray-200 hover:border-[#213554]/30 px-5 transition-all duration-300">
      <button
        className="w-full items-center bg-transparent py-3 flex text-[15px] justify-between text-left transition duration-300 group"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="cursor-pointer transform transition-transform duration-300 group-hover:scale-110">
            {isOpen ? (
              <IoIosArrowDown className="text-[#EE334B]" size={24} />
            ) : (
              <IoIosArrowUp className="text-[#EE334B]" size={24} />
            )}
          </div>
          <p className="font-semibold m-0 text-[#213554] group-hover:text-[#EE334B] transition-colors duration-300">
            {title}
          </p>
        </div>
      </button>
      {isOpen && (
        <div className="text-[16px] text-gray-700 leading-relaxed pt-2 pb-3 border-t border-gray-100 mt-2">
          {data}
        </div>
      )}
    </div>
  );
}
