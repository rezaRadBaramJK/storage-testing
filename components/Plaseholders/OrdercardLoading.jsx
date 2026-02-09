import React from "react";

export default function OrdercardLoading() {
  return (
    <div className="bg-productCard-bg p-4 rounded-[10px]">
      <div className="flex justify-center items-center gap-1 font-bold border-b-[1px] border-black pb-5">
        <p className="h-2 w-[30%] bg-loading-base-50"></p>
        <p className="h-2 w-[20%] bg-loading-base-50"></p>
      </div>
      <div className="text-center flex flex-col gap-6 mt-6">
        <div className="flex items-center gap-1 font-bold justify-center">
          <p className="h-2 w-[30%] bg-loading-base-50"></p>
          <p className="h-2 w-[50%] bg-loading-base-50"></p>
        </div>
        <div className="flex items-center gap-1 font-bold justify-center">
          <p className="h-2 w-[60%] bg-loading-base-50"></p>
          <p className="h-2 w-[50%] bg-loading-base-50"></p>
        </div>
        <div className="flex justify-center gap-5">
          <button
            className="w-[40%] py-5  bg-loading-base-50
           rounded-full"
          ></button>
          <button
            className="w-[40%] py-5  bg-loading-base-50
           rounded-full"
          ></button>
        </div>
      </div>
    </div>
  );
}
