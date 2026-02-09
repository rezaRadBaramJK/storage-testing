import React from "react";
import Link from "next/link";
import { reOrder } from "@/services/http/cart/reOrder";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export default function OrderCard({ data }) {
  const t = useTranslations("index");
  const handleReOrder = async () => {
    const response = await reOrder(data?.id);
    if (response?.success) {
      toast.success("Items Of this Order Add To your Cart Successfully", {
        position: "top-center",
      });
    } else {
      toast.error(response?.errors, { position: "top-center" });
    }
  };
  return (
    <div className="bg-productCard-bg p-4 rounded-[10px]">
      <p className="pb-3 border-b-[1px] text-[16px] text-root-text border-black text-center">
        {t("order_number")}: {data?.custom_order_number}
      </p>
      <div className="text-center flex flex-col gap-3 mt-4">
        <p className="text-14px text-root-text">
          {t("order_status")} : {data?.order_status}
        </p>
        <p className="text-14px text-root-text">
          {t("date")} : {data?.created_on}
        </p>
        <div className="flex justify-center gap-5">
          <button className="w-[40%] py-3 text-white bg-black rounded-full">
            <Link
              className="w-full h-full"
              href={`/dashboard/orders/${data?.id}`}
            >
              {t("details")}
            </Link>
          </button>
          <button
            onClick={handleReOrder}
            className="w-[40%] py-3 text-white bg-primary rounded-full"
          >
            {t('button-re-order')}
          </button>
        </div>
      </div>
    </div>
  );
}
