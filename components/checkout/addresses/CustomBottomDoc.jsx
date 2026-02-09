import React from "react";
import { useTranslations } from "next-intl";
export default function CustomBottomDoc({
  handleCheckout,
  activeAddress,
  activeShippingMethode,
}) {
  const t = useTranslations("index");
  return (
    <div className="fixed left-[50%] translate-x-[-50%]  w-full z-[1000]   px-7  gap-5 lg:w-[430px] bottom-0  bg-white py-3 border-t-[1px] border-[#f1f1f1] rounded-t-[15px]">
      <div className="flex justify-center items-center">
        <button
          disabled={!activeShippingMethode?.name || !activeAddress?.id}
          onClick={handleCheckout}
          className="w-full py-3 bg-primary rounded-full  font-bold text-white disabled:bg-gray-300"
        >
          {t("proceed_check_out")}
        </button>
      </div>
    </div>
  );
}
