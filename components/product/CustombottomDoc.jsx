import React from "react";
import { useLocale, useTranslations } from "next-intl";

export default function CustombottomDoc({ price, addToCart, count, shownPrice }) {
  const t = useTranslations("index");
  const currencyCode = price && price.currency_code ? price.currency_code : "";

  return (
    <div className="fixed left-[50%] text-white translate-x-[-50%] w-full z-[1000] flex justify-between px-7 items-center gap-5 lg:w-[430px] bottom-0 bg-white py-3 border-t-[1px] border-[#f1f1f1] rounded-t-[15px] p-5">
      <button
        onClick={addToCart}
        className="bg-primary p-1 h-[50px] flex gap-2 items-center px-5 justify-between w-full rounded-[15px]"
      >
        <p className="text-[14px]">{t("add_to_cart")}</p>
        <p className="text-[16px]">{shownPrice.toFixed(3)}&nbsp;{currencyCode}</p>
      </button>
    </div>
  );
}
