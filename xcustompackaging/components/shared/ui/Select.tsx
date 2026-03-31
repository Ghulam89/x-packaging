"use client";
import React, { memo } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  label?: string;
  name: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  value?: string | number;
  required?: boolean;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  star?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
  placeholder?: string;
  id?: string;
  suppressHydrationWarning?: boolean;
};

const Select = memo(({
  label,
  name,
  className = "",
  onChange,
  value,
  required,
  onBlur,
  star,
  disabled = false,
  children,
  placeholder,
  id,
  suppressHydrationWarning,
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
        <select
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          name={name}
          id={id || name}
          required={required}
          disabled={disabled}
          suppressHydrationWarning={suppressHydrationWarning}
          className={`w-full border-2 border-gray-200 rounded-lg bg-white text-sm text-[#213554] px-4 py-2.5 outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300 shadow-sm hover:border-[#213554]/50 hover:shadow-md disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:border-gray-200 disabled:hover:shadow-sm appearance-none cursor-pointer group pr-10 ${className}`}
          style={{
            WebkitAppearance: "none",
            MozAppearance: "none",
          } as React.CSSProperties}
        >
        {placeholder && (
          <option value="" disabled style={{ color: '#9ca3af' }}>
            {placeholder}
          </option>
        )}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const c = child as React.ReactElement<any>;
            const prevStyle = (c.props?.style ?? {}) as React.CSSProperties;
            return React.cloneElement(c, {
              style: {
                ...prevStyle,
                color: '#213554',
                backgroundColor: '#ffffff',
                padding: '0.5rem',
              },
            });
          }
          return child as any;
        })}
      </select>
        {/* Custom arrow */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#213554]">
          <IoIosArrowDown size={20} />
        </span>
        {/* Hover indicator */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#213554]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
});

Select.displayName = 'Select';
export default Select;

