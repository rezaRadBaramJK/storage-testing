import React from "react";

export default function AddressCardLoading() {
  return (
    <div className=" bg-white flex flex-col gap-5 rounded-[10px] animate-pulse p-4">
      <div className="flex items-center gap-1 font-bold">
        <p className="h-2 w-[30%] bg-loading-base-50"></p>
        <p className="h-2 w-[20%] bg-loading-base-50"></p>
      </div>
      <div className="flex items-center gap-1 font-bold">
        <p className="h-2 w-[30%] bg-loading-base-50"></p>
        <p className="h-2 w-[60%] bg-loading-base-50"></p>
      </div>
      <div className="flex items-center gap-1 font-bold">
        <p className="h-2 w-[50%] bg-loading-base-50"></p>
        <p className="h-2 w-[40%] bg-loading-base-50"></p>
      </div>
      <div className="flex items-center gap-1 font-bold">
        <p className="h-2 w-[20%] bg-loading-base-50"></p>
        <p className="h-2 w-[30%] bg-loading-base-50"></p>
      </div>
      <div className="flex items-center gap-1 font-bold">
        <p className="h-2 w-[40%] bg-loading-base-50"></p>
        <p className="h-2 w-[30%] bg-loading-base-50"></p>
      </div>
      <div className="flex justify-center gap-8 mt-5">
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
  );
}
