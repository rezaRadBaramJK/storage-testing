import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";

const customStyles = {
  option: (provided, { isFocused }) => ({
    ...provided,
    borderColor: "red",
  }),
  control: (provided) => ({
    ...provided,
    minHeight: "42px",
    borderRadius: "10px",
    outline: "none",
    backgroundColor: "transparent",
    boxShadow: " 0 0 0 2px #EEEEEE",
    padding: "4px 0",
    outlineColor: "none",
    border: "none",
    fontSize: "14px",
    "&:focus": {},
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

export default function ProductAttTypeDropdownList({
  data,
  setAttObj,
  attObj,
  setUnitPrice,
  autoSelectedPriceAdjustment
}) {
  const [attOptions, setAttOptions] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(autoSelectedPriceAdjustment ? autoSelectedPriceAdjustment?.value?.priceAdjustmentValue : 0);

  useEffect(() => {
    const atts = [];
    data?.values?.map((item) => {
      atts.push({ value: item?.id, label: item?.name });
    });
    setAttOptions(atts);
  }, []);

  function getValuePrice(selectedId) {
    const foundedValue = data?.values?.find((item) => item.id == selectedId);
    if (foundedValue) {
      return foundedValue.priceAdjustmentValue
    }
    return 0;
  }

  return (
    <div className=" px-2 rounded-[10px] mt-1 ">
      <div>
        <label
          className={`text-root-text font-bold block  mb-3 text-[14px]`}
          htmlFor={data?.name}
        >
          {data?.name}
        </label>
        <Select
          menuPortalTarget={
            typeof window !== "undefined" && document?.querySelector("body")
          }
          placeholder={data?.name}
          name={data?.name}
          id={data?.name}
          styles={customStyles}
          onChange={(e) => {
            setAttObj((prev) => {
              return {
                ...prev,
                [`product_attribute_${data?.id}`]: [`${e.value}`],
              };
            });
            const priceAdjustment = getValuePrice(e?.value);
            setUnitPrice(prev => prev - (selectedPrice || 0) + priceAdjustment);
            setSelectedPrice(priceAdjustment);
          }}
          options={attOptions}
        />
      </div>
    </div>
  );
}
