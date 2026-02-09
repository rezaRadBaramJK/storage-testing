import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import BasketContext from "@/store/BasketContext";
import { useTranslations } from "next-intl";
import { House, Layers2, ShoppingCart, UserRound } from "lucide-react";
//TODO refactor this :D

export default function NewCustomBottomDoc({
  handleChangeRouteBasedOnUserAuthStatus,
  subTotal,
  cartItems,
}) {
  const basketCtx = useContext(BasketContext);
  const t = useTranslations("index");
  const router = useRouter();
  const docItem = [
    {
      id: 1,
      title: t("home"),
      href: "/",
      activeIcon: <House className="text-primary " />,
      icon: <House className="text-gray-text " />,
    },
    // {
    //   id: 2,
    //   title: t("categories"),
    //   href: "/categories",
    //   match: /^\/categories.*/,
    //   activeIcon: <Layers2 className="text-primary " />,
    //   icon: <Layers2 className="text-gray-text " />,
    // },
    {
      id: 3,
      title: t("basket"),
      href: "/cart",
      activeIcon: <ShoppingCart className="text-primary " />,
      icon: <ShoppingCart className="text-gray-text " />,
    },
    {
      id: 4,
      title: t("profile"),
      href: "/dashboard",
      activeIcon: <UserRound className="text-primary " />,
      icon: <UserRound className="text-gray-text " />,
    },
  ];
  return (
    <div
      className="fixed left-[50%] translate-x-[-50%] w-full z-[1000] py-3  bg-white  gap-5 lg:w-[430px] bottom-0  border-t-[1px] border-[#f1f1f1] rounded-t-[15px]  "
    >
      {cartItems?.length ? (
        <div className="w-full flex justify-between items-center px-3 mb-3">
          <div className="flex flex-col gap-1">
            <p className="font-bold ">{t("sub_total")} :</p>
            <p>{subTotal}</p>
          </div>
          <button
            onClick={handleChangeRouteBasedOnUserAuthStatus}
            className=" py-2 px-5  bg-primary text-white w-fit font-bold rounded-full "
          >
            {t("proceed_check_out")}
          </button>
        </div>
      ) : null}
      <div className={`items-center flex justify-between w-full px-5 ${cartItems?.length && "pt-3"}`}>
        {docItem?.map((item) => (
          <Link
            className="w-[25%] flex justify-center items-center text-gray-text data-[state=true]:text-primary"
            href={item?.href}
            data-state={item?.href == "/cart"}
          >
            <div className="flex flex-col justify-center items-center gap-1">
              {item?.href == "/cart" ? item?.activeIcon : item?.icon}
              <p className="min-[405px]:text-[12px] text-[10px] text-no">{item?.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
