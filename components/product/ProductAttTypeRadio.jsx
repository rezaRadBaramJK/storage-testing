import React, { useState } from "react";
import { Check } from "lucide-react";

export default function ProductAttTypeRadio({ data, setAttObj, attObj, setUnitPrice, autoSelectedPriceAdjustment }) {
  const [checkedPrice, setCheckedPrice] = useState(autoSelectedPriceAdjustment ? autoSelectedPriceAdjustment?.value?.priceAdjustmentValue : 0);

  const handleCheck = (e) => {
    setAttObj((prev) => {
      return {
        ...prev,
        [`product_attribute_${data?.id}`]: [`${e}`]
      };
    });
  };

  return (
    <div className=" px-2 rounded-[10px] mt-1 ">
      <p className="font-bold text-[16px]">{data?.name}</p>
      <div className="flex flex-col gap-3 my-3">
        {data?.values?.map((item, index) => (
          <div key={index} className="inline-flex gap-3 items-center">
            <label
              className="relative flex items-center  rounded-full cursor-pointer"
              htmlFor={item?.id}
            >
              <input
                onChange={() => {
                  handleCheck(item?.id);
                  setUnitPrice(prev => prev - (checkedPrice || 0) + item?.priceAdjustmentValue);
                  setCheckedPrice(item?.priceAdjustmentValue || 0);
                }}
                checked={
                  attObj[`product_attribute_${data?.id}`] &&
                  attObj[`product_attribute_${data?.id}`][0] == item?.id
                    ? true
                    : false
                }
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border-[2px] border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-black checked:bg-transparent checked:before:bg-black "
                id={item?.id}
              />
              <span
                className="absolute text-black  transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <Check className="w-[15px] text-black" />
              </span>
            </label>
            <label htmlFor={item?.id} className="text-[14px]">
              {(item?.priceAdjustmentValue && item?.priceAdjustmentValue > 0) &&
                <span>[{item?.priceAdjustment}]</span>
              }&nbsp;
              {item?.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
