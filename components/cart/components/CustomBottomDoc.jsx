import React, { useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import BasketContext from "@/store/BasketContext"
import { useTranslations } from "next-intl"

//TODO refactor this :D

export default function CustomBottomDoc({ handleChangeRouteBasedOnUserAuthStatus }) {
  const basketCtx = useContext(BasketContext)
  const t = useTranslations("index")
  const router = useRouter()
  const docItem = [
    {
      id: 1,
      title: t("home"),
      link: "/",
      icon: "/assets/icons/homedeActive.svg",
      activeIcon: "/assets/icons/homeActive.svg",
    },
    {
      id: 2,
      title: t("categories"),
      link: "/categories",
      icon: "/assets/icons/categoriesdeactive.svg",
      activeIcon: "/assets/icons/categoriesActive.svg",
    },
    {
      id: 3,
      title: t("basket"),
      link: "/cart",
      icon: "/assets/icons/cartdeActive.svg",
      activeIcon: "/assets/icons/cartActive.svg",
    },
    {
      id: 4,
      title: t("profile"),
      link: "/dashboard",
      icon: "/assets/icons/profiledeActive.svg",
      activeIcon: "/assets/icons/profileActive.svg",
    },
  ]
  return (
    <div
      style={{ direction: "ltr" }}
      className="fixed left-[50%] translate-x-[-50%]  w-full z-[1000]   px-5  gap-5 lg:w-[430px] bottom-0  bg-white py-3 border-t-[1px] border-[#f1f1f1] rounded-t-[15px]"
    >
      <div className="w-full ">
        <button onClick={handleChangeRouteBasedOnUserAuthStatus} className="w-full py-3 mb-5 bg-primary text-white font-bold rounded-full m-auto">
          {t("proceed_check_out")}
        </button>
      </div>
      <div className="items-center flex justify-between">
        {docItem?.map((item) => (
          <Link className="w-[25%]" href={item?.link}>
            <div className="flex flex-col justify-center items-center gap-1">
              <Image width={24} height={24} src={router?.asPath === item?.link ? item?.activeIcon : item?.icon} />
              <p className={`text-[12px] ${item?.link === router?.asPath ? "text-primary" : "text-gray-text"}`}>{item?.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
