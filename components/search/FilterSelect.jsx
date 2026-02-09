import React, { useState } from "react";
import Select from "react-select";

const customStyles = {
  option: (provided, { isFocused }) => ({
    ...provided,
    borderColor: "red",
  }),
  control: (provided) => ({
    ...provided,
    minHeight: "48px",
    borderRadius: "10px",
    outline: "none",
    backgroundColor: "#fff",
    boxShadow: " 0 0 0 2px #EEEEEE",
    padding: "6px 0",
    outlineColor: "none",
    border: "none",

    fontSize: "14px",
    "&:focus": {},
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 10000,
    // position: "sticky",
    border: "none",
  }),
};

export default function FilterSelect({
  label,
  name,
  options,
  setFieldValue,
  value,
  name2,
  error,
  placeholder,
  multi,
}) {
  return (
    <div>
      <label
        className={`text-root-text font-medium mb-1 block mx-2 text-[14px]`}
        htmlFor={name}
      >
        {label}
      </label>
      <Select
        isMulti={multi}
        placeholder={placeholder}
        name={name}
        id={name}
        styles={customStyles}
        value={value}
        defaultValue={value}
        onChange={(e) => setFieldValue(e)}
        options={options}
      />
      <p className="text-red-600 text-[12px] mx-2">{error}</p>
    </div>
  );
}
