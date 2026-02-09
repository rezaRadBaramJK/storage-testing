import React from "react";

export default function CategoryLoading() {
  return (
    <div className=" py-4 border-[1px] border-[#f1f1f1] rounded-[5px] relative animate-pulse">
      <div className="flex gap-5 px-5">
        <div className="flex gap-3 overflow-scroll w-fit no-scrollbar ">
          <div className="flex justify-center items-center  cursor-pointer w-[100px] h-3 rounded-[3px] bg-loading-base-50"></div>
          <div className="flex justify-center items-center  cursor-pointer w-[120px] h-3 rounded-[3px] bg-loading-base-50"></div>
          <div className="flex justify-center items-center  cursor-pointer w-[90px] h-3 rounded-[3px] bg-loading-base-50"></div>
          <div className="flex justify-center items-center  cursor-pointer w-[130px] h-3 rounded-[3px] bg-loading-base-50"></div>
          <div className="flex justify-center items-center  cursor-pointer w-[80px] h-3 rounded-[3px] bg-loading-base-50"></div>
        </div>
      </div>
    </div>
  );
}
