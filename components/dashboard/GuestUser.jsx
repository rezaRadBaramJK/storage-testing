import Link from "next/link"
import { useTranslations } from "next-intl"
import Image from "next/image";
import {BaramjikLogo} from "@/public/assets/jsxIcons";
import React from "react";

const GuestUser = () => {
  const t = useTranslations("index")
  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="flex flex-col gap-5">
        <Image src={'/assets/icons/baramjikLogo.svg'} alt={''} width={160} height={200} />
        <p>{t("you_have_no_account")}</p>
        <Link href={"/auth/signup"} className="px-5 py-3 bg-yellow-color rounded-[10px] text-center text-[20px] text-white font-medium">
          {t("sign_up")}
        </Link>
        <Link href={"/auth/login"} className="px-5 py-3 bg-primary rounded-[10px] text-center text-[20px] text-white font-medium">
          {t("login")}
        </Link>
      </div>
    </div>
  )
}

export default GuestUser
