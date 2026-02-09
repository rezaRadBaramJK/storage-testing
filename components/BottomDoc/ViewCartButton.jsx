import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BasketContext from "@/store/BasketContext";
import { useTranslations } from "next-intl";

const ViewCartButton = () => {
  const router = useRouter();
  const basketCtx = useContext(BasketContext);
  const t = useTranslations("index");
  if (router?.asPath === "/dashboard" || !basketCtx.basketData?.length)
    return null;

  return (
    <Link
      className="w-[95%] flex justify-between p-5 text-white bg-primary py-3 rounded-full fixed bottom-[80px] max-w-[420px] left-[50%] translate-x-[-50%] z-50"
      href={"/cart"}
    >
      <p className="font-">
        {basketCtx.basketData?.length} {t("itemsInYourCart")}
      </p>
      <p className="">{t("viewCart")}</p>
    </Link>
  );
};

export default ViewCartButton;
