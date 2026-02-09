import React from "react";

export default function ShippingMethodeCardLoading() {
  return (
    <div className="shadow-sm bg-white p-5 rounded-[10px]">
      <div className="flex justify-between items-center">
        <p className="font-bold w-[80%] h-2 bg-loading-base-50"></p>
        <div class="inline-flex items-center">
          <label class="relative flex items-center p-3  cursor-pointer w-5 h-5 bg-loading-base-50 rounded-full"></label>
        </div>
      </div>
    </div>
  );
}
