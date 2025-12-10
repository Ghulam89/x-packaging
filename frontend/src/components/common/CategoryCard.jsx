import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({data}) => {
  return (
    <>
    <div className=" w-[330px] mx-auto">
    <Link to={data?.id} className="">
        <div className="">
          <div className="  sm:h-80 h-56">
          <img src={data?.image} alt="" className=" w-full h-full  rounded-3xl" />
          </div>
          <h6 className="  font-bold text-black  text-center text-lg  pt-3">{data?.title}</h6>
        </div>
      </Link>
    </div>
      
    </>
  );
};

export default CategoryCard;
