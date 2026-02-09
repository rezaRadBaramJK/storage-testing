import React from "react";

export default function CustoomBottomDoc({ children }) {
  return (
    <div className="fixed left-[50%] translate-x-[-50%]  w-full z-[1000] flex justify-between px-7 items-center gap-5 lg:w-[430px] bottom-0  bg-white py-3 border-t-[1px] border-[#f1f1f1] rounded-t-[15px]">
      {children}
    </div>
  );
}
