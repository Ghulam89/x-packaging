import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import usa from "../../assets/images/flag/us.svg";
import uk from "../../assets/images/flag/uk.svg";
import canada from "../../assets/images/flag/canada.svg";
const TopNav = () => {
  return (
    <div className="">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto">
        <div className="flex sm:justify-between justify-center flex-wrap items-center px-6 sm:py-2 py-1.5 border-b border-gray-200 text-sm text-gray-700">
          {/* Left Side: Country Flags */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center  space-x-1.5">
              <img src={usa} alt="USA" className="w-8 h-8" />
              <span>USA</span>
            </div>
            <div className="flex items-center space-x-1">
              <img src={uk} alt="UK" className="w-8 h-8" />
              <span>UK</span>
            </div>
            <div className="flex items-center space-x-1">
              <img src={canada} alt="Canada" className="w-8 h-8" />
              <span>Canada</span>
            </div>
          </div>

          {/* Right Side: Account & Social Media */}
          <div className="flex flex-wrap  justify-center items-center space-x-4 space-y-1">
            <div className="flex items-center space-x-2">
              <MdEmail size={15} />
              <span>sales@xpackaging.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiPhone size={15} />
              <span>747-247-0456</span>
            </div>
            <Link to="/my-account" className="flex items-center space-x-2 hover:text-[#EE334B] transition-colors cursor-pointer">
              <AiOutlineUser size={18} />
              <span>My Account</span>
            </Link>
            <div className="flex space-x-3 text-gray-600">
              <FaFacebookF />
              <FaTwitter size={15} />
              <FaYoutube size={15} />
              <FaInstagram size={15} />
              <FaLinkedinIn size={15} />
              <FaWhatsapp size={15} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
