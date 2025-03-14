import React from "react";

const Input = ({
  label,
  placeholder,
  name,
  type,
  className,
  onChange,
  value,
  Icon,
  required,
  star,
}) => {
  return (
    <div className=" relative  ">
      <label
        htmlFor="first_name"
        className="  pb-1.5 flex  text-[#333333] text-sm font-medium   text-textColor"
      >
        {label}
        <p className=" text-red-600 m-0 pl-1">{star}</p>
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        id={name}
        type={type}
        required={required}
        className={`  outline-none bg-lightGray text-sm  p-1.5  text-textColor placeholder:text-gray-500   ${className}`}
      />
      <div className=" absolute right-3 top-3">
        <i>{Icon}</i>
      </div>
    </div>
  );
};

export default Input;
