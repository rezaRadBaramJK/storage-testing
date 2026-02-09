import React from "react";

export default function ProductCardIncheckoutLoading() {
  return (
    <div className="bg-productCard-bg rounded-[10px] animate-pulse">
      <div className="flex gap-2 p-2">
        <div className="w-[40%] h-[140px] bg-loading-base-50 rounded-[5px]"></div>
        <div className="w-[60%] relative">
          <p className="w-[140px] h-2 bg-loading-base-50 my-3"></p>
          <p className="mt-2 w-[160px] h-2 bg-loading-base-50 my-3"></p>
          <p className="mt-2 w-[130px] h-2 bg-loading-base-50 my-3"></p>
          <p className="mt-2 w-[160px] h-2 bg-loading-base-50 my-3"></p>
        </div>
      </div>
    </div>
  );
}
