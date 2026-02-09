import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "use-intl";
export default function EmptyFrame() {
  const t = useTranslations("index");
  return (
    <div className=" flex h-[80vh]  justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <Image
          alt="not found"
          width={200}
          height={200}
          src={"/assets/staticImages/emptycart.svg"}
        />
        <p className="font-bold text-[22px] text-center">
          {t("cartEmptyMessage")}
        </p>
        <p className="font-medium text-center">{t("cartEmptyDescription")}</p>
        <Link
          className="bg-primary px-10 py-3 text-center text-white rounded-full"
          href={"/"}
        >
          {t("startShopping")}
        </Link>
      </div>
    </div>
  );
}
