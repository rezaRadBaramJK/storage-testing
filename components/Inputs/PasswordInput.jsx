import React, { useState } from "react";
import {Eye, EyeOff} from "lucide-react";

export default function PasswordInput({
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
  const [showPass, setShowPass] = useState(false);
  return (
    <>
      <label className={`text-root-text font-medium block mx-2 text-[14px]`}>
        {label}
      </label>
      <div dir="ltr" className="relative ">
        <input
          autoComplete="false"
          disabled={disabled}
          name={name}
          value={value}
          onChange={handleChange}
          className="h-12 w-full rounded-[10px] px-2 outline-none bg-white border-[2px] border-gray-Primary text-[14px]"
          type={showPass ? "text" : "password"}
          placeholder={placeholder}
          id={name}
        />

        <div
          onClick={() => setShowPass((prev) => !prev)}
          className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
        >
          {showPass ? (
            <Eye className="w-5 stroke-current text-[#292d32]" />
          ) : (
            <EyeOff className="w-5 stroke-current text-[#292d32]" />
          )}
        </div>
      </div>
      <p className="text-red-600 text-[12px] mx-2">{error}</p>
    </>
  );
}
