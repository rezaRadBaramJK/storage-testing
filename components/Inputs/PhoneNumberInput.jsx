import { useRouter } from "next/router";
import React from "react";

export default function PhoneNumberInput({
  label,
  placeholder,
  value,
  id,
  fromModal,
  name,
  handleChange,
  disabled,
  error,
  color,
}) {
  const router = useRouter();
  const { locale } = router;
  return (
    <div className="w-full ">
      <label className={`text-black font-medium block mx-1 mb-1 text-[14px]`}>
        {label}
      </label>
      <div className="relative ">
        <input
          style={{ direction: "ltr" }}
          autoComplete="false"
          disabled={disabled}
          name={name}
          value={value}
          onChange={handleChange}
          className={`h-12 w-full rounded-[10px] px-3 outline-none bg-white border-[2px]  text-[14px] pl-12 border-gray-Primary`}
          type={"number"}
          placeholder={placeholder}
          id={name}
        />

        <div
          className={`absolute text-[14px] top-[50%] translate-y-[-50%] cursor-pointer left-3 `}
        >
          +965
        </div>
      </div>
      <p className="text-red-500 text-[12px] mx-2">{error}</p>
    </div>
  );
}
