import React from "react";

export default function ProductCardLoading() {
  return (
    <div className="p-2 rounded-[10px]  bg-productCard-bg w-full animate-pulse">
      <div className="relative">
        <div className="w-full h-[180px] bg-loading-base-50 rounded-[10px]"></div>
        <div className="absolute bottom-5 right-4 w-[30px] h-[30px]   bg-loading-base rounded-[5px]"></div>
      </div>
      <div className="mt-6 text-center m-auto">
        <p className="w-[100px] h-2 bg-loading-base-50 m-auto  rounded-[2px]"></p>
        <p className="w-[120px] h-2 bg-loading-base-50 mt-3 mx-auto rounded-[2px]"></p>
      </div>
      <p className="my-6 w-[80px] h-2 bg-loading-base-50 mx-auto rounded-[2px]"></p>
    </div>
  );
}
