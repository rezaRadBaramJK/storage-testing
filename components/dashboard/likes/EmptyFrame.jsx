import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "use-intl";
import { Heartempty } from "@/public/assets/jsxIcons";
export default function EmptyFrame() {
  const t = useTranslations("index");
  return (
    <div className=" flex h-[80vh]  justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <Heartempty className="w-[128px] h-[128px]"/>
        <p className="font-bold text-[22px] text-center">
          {t("your_favorite_is_empty")}
        </p>
        <p className="font-medium text-center">{t("check_out_best_products")}</p>
        <Link
          className="bg-primary px-10 py-3 text-center text-white rounded-full"
          href={"/"}
        >
          {t("back_to_home")}
        </Link>
      </div>
    </div>
  );
}
