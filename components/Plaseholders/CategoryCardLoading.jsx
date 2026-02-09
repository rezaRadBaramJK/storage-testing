import React from "react";

export default function CategoryCardLoading() {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      <div className="w-full h-[130px] rounded-[5px] bg-loading-base-50"></div>
      <p className="text-[12px] md:text-[14px] text-center h-3 bg-loading-base-50 w-[65%] mx-auto rounded-[2px]"></p>
    </div>
  );
}
