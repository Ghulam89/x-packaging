 "use client";
import React, { memo } from "react";

type Props = {
  label?: string;
  placeholder?: string;
  name: string;
  type?: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  Icon?: React.ReactNode;
  required?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  star?: React.ReactNode;
  disabled?: boolean;
  autoComplete?: string;
  suppressHydrationWarning?: boolean;
  id?: string;
  accept?: string;
};

const Input = memo(({
  label,
  placeholder,
  name,
  type = "text",
  className = "",
  onChange,
  value,
  Icon,
  required,
  onBlur,
  star,
  disabled = false,
  autoComplete,
  suppressHydrationWarning,
  id,
}: Props) => {
  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id || name}
          className="block pb-1.5 text-[#213554] text-sm font-semibold mb-1"
        >
          {label}
          {star && <span className="text-[#EE334B] ml-1">{star}</span>}
        </label>
      )}
      <div className="relative">
        <input
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          id={id || name}
          type={type}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          suppressHydrationWarning={
            suppressHydrationWarning ?? (type === "email" || type === "password")
          }
          className={`w-full border-2 border-gray-200  bg-white text-sm text-[#213554] placeholder:text-gray-400 px-4 py-2.5 outline-none   transition-all duration-300 shadow-sm  disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500 ${Icon ? "pr-10" : ""} ${className}`}
        />
        {Icon && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {Icon}
          </div>
        )}
      </div>
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
