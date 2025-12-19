import { Link } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";
import Button from "./Button";

const stripHtml = (html) => {
  if (!html) return "";
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const BlogCard = ({ data }) => {
  const previewText = stripHtml(data?.content).slice(0, 150) + "...";

  return (
    <div className="group relative">
      <Link to={`/blog/${data?.slug}`}>
        <div className="rounded-[15px]  overflow-hidden h-96 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          {/* Blog Image */}
          <div className="w-full h-56 overflow-hidden">
            <img
              src={`${BaseUrl}/${data?.image}`}
              alt={data?.title}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Blog Content */}
          <div className="p-5 text-start">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-[#EE334B] bg-[#EE334B]/10 rounded-full mb-3">
              Knowledge Base
            </span>
            <h3 className="text-xl font-bold text-[#213554] line-clamp-2 mb-3 group-hover:text-[#EE334B] transition-colors duration-300">
              {data?.title?.slice(0, 70)}
            </h3>

            {/* <p className="text-gray-600 line-clamp-3 mb-4 text-sm">
              {previewText}
            </p> */}

            <div className="flex justify-start items-center w-full">
              <Button
                variant="ghost"
                className="text-[#213554] hover:text-[#EE334B] font-medium px-4 py-2 rounded-lg 
                             transition-colors duration-300 uppercase"
                label="Continue Reading"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};


export default BlogCard