import React from "react";
import { Check } from "lucide-react";

export default function ProductAttTypeCheckbox({ data, setAttObj, attObj, setUnitPrice }) {

  const handleCheck = (item) => {
    let checkBoxTypeAtt = attObj[`product_attribute_${data?.id}`]
      ? attObj[`product_attribute_${data?.id}`]
      : [];
    if (item?.id) {
      checkBoxTypeAtt = [...checkBoxTypeAtt, item?.id];
      setAttObj((prev) => {
        return {
          ...prev,
          [`product_attribute_${data?.id}`]: [checkBoxTypeAtt.join(",")],
        };
      });
    }
    setUnitPrice(prev => prev + (item?.priceAdjustmentValue || 0))
  };

  const handleUnCheck = (item) => {
    let checkBoxTypeAtt = attObj[`product_attribute_${data?.id}`][0]
      ? attObj[`product_attribute_${data?.id}`][0].split(",")
      : [];

    const index = checkBoxTypeAtt.indexOf(item?.id);
    if (index > -1) {
      checkBoxTypeAtt.splice(index, 1);
    }
    setAttObj((prev) => {
      if (checkBoxTypeAtt.length > 0) {
        return {
          ...prev,
          [`product_attribute_${data?.id}`]: [checkBoxTypeAtt.join(",")],
        };
      } else {
        delete prev[`product_attribute_${data?.id}`];
        return {
          ...prev,
        };
      }
    });
    setUnitPrice(prev => prev - (item?.priceAdjustmentValue || 0))
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
                onChange={(e) => {
                  if (e.target.checked) {
                    handleCheck(item);
                  } else {
                    handleUnCheck(item);
                  }
                }}
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-[5px] border-[2px] border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-black checked:bg-transparent checked:before:bg-black "
                id={item?.id}
              />
              <span className="absolute text-black  transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <Check className="w-[15px] text-black" />
              </span>
            </label>
            <label htmlFor={item?.id} className="text-[14px]">
              {item?.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
