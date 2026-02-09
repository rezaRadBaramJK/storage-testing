import React from "react";

export default function Input({
  label,
  placeholder,
  value,
  id,
  fromModal,
  name,
  handleChange,
  disabled,
  error,
}) {
  return (
    <>
      <label
        className={`text-root-text font-medium block mx-2 text-[14px]`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        autoComplete="false"
        disabled={disabled}
        name={name}
        value={value}
        onChange={handleChange}
        className="h-12 w-full rounded-[10px] px-2 outline-none bg-white border-[2px] border-gray-Primary text-[14px]"
        type="text"
        placeholder={placeholder}
        id={name}
      />
      <p className="text-red-600 text-[12px] mx-2">{error}</p>
    </>
  );
}
