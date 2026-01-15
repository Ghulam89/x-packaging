import React from "react";
const SpecialCard = ({images}) => {
  return (
    <div className=" rounded-md  max-w-8xl mx-auto p-4">
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
  {images.map((image, index) => (
    <div
      key={index}
      className={`${
        index === 0 ? "sm:col-span-1 col-span-2" : "col-span-1"
      } hover:-translate-y-3 transform transition duration-300 ease-in-out`}
    >
      <img src={image} alt="" className="rounded-lg w-full" />
    </div>
  ))}
</div>
    </div>
  );
};

export default SpecialCard;
