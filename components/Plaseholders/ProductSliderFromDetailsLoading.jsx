import React from "react";

export default function ProductSliderFromDetailsLoading() {
  return (
    <div className="w-full  ">
      <div className="w-full relative">
        <div className="w-full h-[330px] bg-loading-base-50 rounded-[5px]"></div>
      </div>

      <div className="w-fit mt-2">
        <div className="overflow-scroll flex  gap-2">
          <div className="relative w-[120px] h-[90px] bg-loading-base-50 cursor-pointer rounded-[5px]"></div>
          <div className="relative w-[120px] h-[90px] bg-loading-base-50 cursor-pointer rounded-[5px]"></div>
          <div className="relative w-[120px] h-[90px] bg-loading-base-50 cursor-pointer rounded-[5px]"></div>
          <div className="relative w-[120px] h-[90px] bg-loading-base-50 cursor-pointer rounded-[5px]"></div>
          <div className="relative w-[120px] h-[90px] bg-loading-base-50 cursor-pointer rounded-[5px]"></div>
          <div className="relative w-[120px] h-[90px] bg-loading-base-50 cursor-pointer rounded-[5px]"></div>
        </div>
      </div>
    </div>
  );
}
