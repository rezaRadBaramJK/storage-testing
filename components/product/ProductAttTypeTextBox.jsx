import React, { useState } from "react";

export default function ProductAttTypeTextBox({ data, setAttObj, attObj }) {


  return (
    <div className=" px-2  rounded-[10px] ">
      <>
        <label
          className={`text-root-text  block font-bold text-[14px]`}
          htmlFor={data?.name}
        >
          {data?.name}
        </label>
        <input
          autoComplete="false"
          //   disabled={disabled}
          name={data?.name}
          //   value={value}
          onChange={(e) => {
            // if (!attObj.hasOwnProperty(`product_Attribute_${data?.id}`)) {
            setAttObj((prev) => {
              return {
                ...prev,
                [`product_attribute_${data?.id}`]: [`${e.target.value}`],
              };
            });
          }}
          className="h-[46px] w-full rounded-[10px] px-2 outline-none bg-transparent border-[2px] mt-2 border-gray-Primary text-[14px]"
          type="text"
          placeholder={data?.name}
          id={data?.name}
        />
      </>
    </div>
  );
}
