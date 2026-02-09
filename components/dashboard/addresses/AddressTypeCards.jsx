import clsx from "clsx";
import React from "react";

export default function AddressTypeCards({
  addressTypes,
  activeAddressTypeId,
  setActiveAddressTypeId,
  fromEdit,
}) {
  const filteredAddressTypes = fromEdit
    ? addressTypes?.filter((item) => item.id === activeAddressTypeId)
    : addressTypes;

  return (
    <div className="flex justify-center items-center gap-6">
      {filteredAddressTypes?.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            if (!fromEdit) {
              setActiveAddressTypeId(item.id);
            }
          }}
          className={clsx(
            "bg-productCard-bg p-4 rounded-[10px] w-full flex flex-col justify-center items-center",
            !fromEdit && "cursor-pointer"
          )}
        >
          <p
            className={`text-[14px] text-nowrap font-normal ${
              item?.id === activeAddressTypeId
                ? "text-primary"
                : "text-[#6A6A6A]"
            }`}
          >
            {item?.name}
          </p>
          {item?.id === activeAddressTypeId ? item?.activeIcon : item?.icon}
        </div>
      ))}
    </div>
  );
}
