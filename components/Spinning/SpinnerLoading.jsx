import React from "react";

export default function SpinnerLoading() {
  return (
    <div className="w-full ">
      <div className="w-[230px] h-[230px] bg-gray-200 rounded-full"></div>
      <p className="h-2 w-full bg-gray-200 mt-8"></p>
      <p className="h-2 w-[80%] bg-gray-200 mt-4 m-auto"></p>
      <p className="h-2 w-[60%] bg-gray-200 mt-4 m-auto"></p>
      <div className="mt-6 w-[100px] h-[40px] rounded-[10px] bg-gray-200 m-auto"></div>
    </div>
  );
}
