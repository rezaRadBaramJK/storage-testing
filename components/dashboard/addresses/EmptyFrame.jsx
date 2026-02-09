import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function EmptyFrame({ className }) {
  const t = useTranslations("index");

  return (
    <div className={" flex h-full justify-center items-center " + className}>
      <div className="flex flex-col items-center justify-center gap-5">
        <Image
          alt="not found"
          width={200}
          height={200}
          src={"/assets/staticImages/emptyaddress.png"}
        />
        <p className="font-bold text-[22px] text-center">
          {t("empty-state-no-saved-addresses")}
        </p>
        <p className="font-medium text-center">
          {t("empty-state-start-by-adding-address")}
        </p>
      </div>
    </div>
  );
}
