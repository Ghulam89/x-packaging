"use client";
import React, { memo } from "react";

type Props = {
  label?: string;
  placeholder?: string;
  name: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value?: string | number;
  required?: boolean;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  star?: React.ReactNode;
  rows?: number;
  disabled?: boolean;
  id?: string;
  suppressHydrationWarning?: boolean;
};

const Textarea = memo(({
  label,
  placeholder,
  name,
  className = "",
  onChange,
  value,
  required,
  onBlur,
  star,
  rows = 4,
  disabled = false,
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
      <textarea
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        id={id || name}
        rows={rows}
        required={required}
        disabled={disabled}
        suppressHydrationWarning={suppressHydrationWarning}
        className={`w-full border-2 border-gray-200 rounded-lg bg-white text-sm text-[#213554] placeholder:text-gray-400 px-4 py-3 outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300 shadow-sm hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500 resize-none ${className}`}
      />
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;

