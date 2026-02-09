import React from "react";

export default function SubCategoryLoading() {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="w-[90px] h-[90px] bg-loading-base-50 rounded-full"></div>
      <p className="text-nowrap text-[12px] font-bold w-[80px] h-3 bg-loading-base-50 rounded-[2px] "></p>
    </div>
  );
}
