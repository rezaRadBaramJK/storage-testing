import ViewCartButton from "./ViewCartButton";
import { useTranslations } from "next-intl";
import RouteButton from "./RouteButton";
import { House, Layers2, ShoppingCart, UserRound } from "lucide-react";
export default function CustomBottomDoc() {
  const t = useTranslations("index");

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
    <>
      <ViewCartButton />
      <div className="fixed left-[50%] translate-x-[-50%]  w-full z-[1000] flex justify-between px-5 items-center min-[405px]:gap-3 gap-1 lg:w-[430px] bottom-0  bg-white py-3 border-t-[1px] border-[#f1f1f1] rounded-t-[15px]">
        {docItem?.map((item) => (
          <RouteButton key={item.id} {...{ item }} />
        ))}
      </div>
    </>
  );
}
