import { Currency } from "@/localStorage/auth";
import { cahngeCurrency } from "@/services/http/setting/cahngeCurrency";
import React, { useState } from "react";
import Select from "react-select";

const customStyles = {
  option: (provided, { isFocused }) => ({
    ...provided,
    borderColor: "red",
  }),
  control: (provided) => ({
    ...provided,
    height: "20px",
    minWidth: "110px",
    borderRadius: "2px",
    outline: "none",
    backgroundColor: "",
    boxShadow: "none",
    padding: "0",
    outlineColor: "none",
    border: "none",
    fontSize: "10px",
    "&:focus": {},
    fontWeight: "bold",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 10000,
    // position: "sticky",
    padding: "0",
    fontSize: "12px",
    border: "none",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      padding: "3px",
    };
  },
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

export default function SelectCurrency({
  label,
  setResendChangeCurrencyRequest,
  name,
  options,
  setFieldValue,
  value,
  name2,
  error,
  placeholder,
}) {
  const handleChangeCurrency = async (val) => {
    const response = await cahngeCurrency(val?.value);
    if (response?.success) {
      setResendChangeCurrencyRequest((prev) => !prev);
      Currency.set(val?.value);
    }
  };
  return (
    <div>
      <Select
        menuPortalTarget={
          typeof window !== "undefined" && document?.querySelector("body")
        }
        menuPosition="fixed"
        name={name}
        id={name}
        styles={customStyles}
        // value={value ? options?.filter((item) => item.value === value) : null}

        value={
          Currency.get()
            ? options?.filter((item) => item.value == Currency.get())[0]
            : ""
        }
        components={{
          IndicatorSeparator: () => null,
        }}
        onChange={(e) => {
          handleChangeCurrency(e);
        }}
        options={options}
      />
      <p className="text-red-600 text-[12px] mx-2">{error}</p>
    </div>
  );
}
