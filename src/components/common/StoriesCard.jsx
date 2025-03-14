import React from "react";
import { Link } from "react-router-dom";

const StoriesCard = ({data}) => {
  return (
    <>
    <div className=" w-72">
    <Link to={data?.id} className="">
        <div className="">
          <div className="  sm:h-72 h-44">
          <img src={data?.image} alt="" className=" w-full h-full object-center object-cover rounded-3xl" />
          </div>
          <h6 className="  font-bold text-black   text-lg  whitespace-pre-wrap pt-3">{data?.title?.slice(0,70)}</h6>
          <p className="  whitespace-pre-line">{data?.desc?.slice(0,120)}</p>
        </div>
      </Link>
    </div>
      
    </>
  );
};

export default StoriesCard;
