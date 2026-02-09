import React from "react";
import Image from "next/image";
export default function OrderItemCard({ data, className }) {
  return (
    <div className={`bg-productCard-bg rounded-[10px] ${className}`}>
      <div className="flex gap-2 p-2">
        <div className="w-[40%]">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className="w-[150px] h-[150px] rounded-[5px] transition-opacity opacity-0 duration-[.5s]"
            src={data?.picture?.image_url}
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
        </div>
        <div className="w-[60%] relative">
          <p>{data?.product_name}</p>
          {data?.product_attributes
            ? data?.product_attributes?.slice(0, 3).map((item) => (
                <p key={item?.product_attribute_id} className="mt-2">
                  {item?.product_attribute_name} :{" "}
                  {item?.selected_value_names[0]}
                </p>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
