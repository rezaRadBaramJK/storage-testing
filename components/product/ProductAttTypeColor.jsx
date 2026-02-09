import React, { useEffect, useState } from "react";
import { GreenMark } from "@/public/assets/jsxIcons";
export default function ProductAttTypeColor({ data, setAttObj, attObj, setUnitPrice, autoSelectedPriceAdjustment }) {
  const [selectedPrice, setSelectedPrice] = useState(autoSelectedPriceAdjustment ? autoSelectedPriceAdjustment?.value?.priceAdjustmentValue : 0);


  return (
    <div className=" px-2  rounded-[10px] ">
      <p className={`text-root-text font-bold block  text-[14px]`}>
        {data?.name}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {data?.values?.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => {
                setAttObj((prev) => {
                  return {
                    ...prev,
                    [`product_attribute_${data?.id}`]: [`${item?.id}`],
                  };
                });
                setUnitPrice(prev => prev - (selectedPrice || 0) + item?.priceAdjustmentValue);
                setSelectedPrice(item?.priceAdjustmentValue || 0);
              }}
              style={{ backgroundColor: item?.colorSquaresRgb }}
              className="w-10 h-10 border-[1px] mt-2 cursor-pointer rounded-[8px]"
            ></div>
            {attObj[`product_attribute_${data?.id}`]
              ? attObj[`product_attribute_${data?.id}`][0] == item?.id && (
                  <GreenMark className="fill-current text-[#3c9655] w-[15px]" />
                )
              : null}
          </div>
        ))}
      </div>
    </div>
  );
}
