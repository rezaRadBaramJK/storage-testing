import React from "react";
import { useRouter } from "next/router";
export default function ProductCardInCartPageLoading() {
  const router = useRouter();
  const { locale } = router;
  return (
    <div className="bg-productCard-bg rounded-[10px] animate-pulse">
      <div className="flex gap-2 p-2">
        <div className="w-[40%] h-[140px] bg-loading-base-50 rounded-[5px]"></div>
        <div className="w-[60%] relative">
          <p className="w-[140px] h-2 bg-loading-base-50 my-3"></p>
          <p className="mt-2 w-[160px] h-2 bg-loading-base-50 my-3"></p>
          <p className="mt-2 w-[130px] h-2 bg-loading-base-50 my-3"></p>
          <p className="mt-2 w-[160px] h-2 bg-loading-base-50 my-3"></p>
          <button
            className={`${
              locale === "en" ? " right-0" : "left-0"
            } absolute top-0  h-8 w-8 bg-loading-base-50`}
          ></button>
        </div>
      </div>
      <div className="w-full bg-gray-Primary py-2 flex justify-between px-4 rounded-b-[10px]">
        <div className="w-full h-14 flex flex-col gap-2">
          <p className="font-bold text-[16px] text-center"></p>
          <p className="text-center"></p>
        </div>
        <div className="w-full flex justify-center items-center gap-3 border-x-[2px] border-[#0b0909] ">
          <button className="bg-primary rounded-full  flex justify-center items-center"></button>
          <p className="font-bold text-[18px]"></p>
          <button className="bg-primary rounded-full  flex justify-center items-center"></button>
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="font-bold text-[16px] text-center"></p>
          <p className="text-center"></p>
        </div>
      </div>
    </div>
  );
}
