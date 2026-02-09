import Link from "next/link";
import { Profile } from "@/public/assets/jsxIcons";
import { useRouter } from "next/router";
import {useContext, memo } from "react";
import { Arabic, English } from "@/public/assets/jsxIcons";
import { Search, ShoppingCart } from "lucide-react";
import SelectCurrency from "../Home/SelectCurrency";
import { changeLanguage } from "@/services/http/setting/changeLanguage";
import BasketContext from "@/store/BasketContext";
import { useTranslations } from "next-intl";
import { useAvailableCurrencyQuery } from "@/queries/setting";
import Image from "next/image";

const HeaderLinks = [
  {
    label: "home",
    href: "/"
  },
  {
    label: "aboutUs",
    href: "/aboutUs",
  },
  // {
  //   label: "about_us",
  //   href: "https://jdi-website.vercel.app/en",
  // },
];

const LgHeader = ({ setResendChangeCurrencyRequest }) => {
  const availableCurrencyQuery = useAvailableCurrencyQuery();
  const t = useTranslations("index");
  const router = useRouter();
  const { locale} = router;

  const currencies =
    availableCurrencyQuery.data?.data.map((item) => ({
      label: item.Name,
      value: item.Id
    })) || [];

  const handleChangeLang = async () => {
    const response = await changeLanguage(locale === "ar" ? 1 : 2);
    if (response.success) {
      await router.replace(router.asPath, undefined, { locale: locale === "ar" ? "en" : "ar" });
      setResendChangeCurrencyRequest?.((prev) => !prev);
      window.location.reload();
    }
  };

  return (
    <div className="flex justify-between sticky bg-root-backgroung w-full items-center  py-6 border-b border-gray-200">
      <div className="flex items-center gap-16">
        <Link href="/">
          <Image src={"/assets/icons/baramjikLogo.svg"} alt={""} width={128} height={24} />
        </Link>
        <div className="flex items-center gap-7">
          {HeaderLinks.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className={`${
                router.pathname === link.href ? "text-primary" : ""
              }`}
            >
              {t(link.label)}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {router.pathname === "/" && (
          <SelectCurrency
            setResendChangeCurrencyRequest={setResendChangeCurrencyRequest}
            options={currencies}
          />
        )}
        <Link href="/search">
          <Search className="w-[24px]" />
        </Link>
        <Link href="/dashboard">
          <Profile className="w-[24px]" />
        </Link>
        <CartLink />
        <button
          onClick={handleChangeLang}
          className="bg-primary text-white w-[25px] h-[25px] flex justify-center items-center rounded-[5px]"
        >
          {locale === "en" ? (
            <Arabic className="w-6 fill-current" />
          ) : (
            <English className="w-6 fill-current" />
          )}
        </button>
      </div>
    </div>
  );
};

const CartLink = memo(() => {
  const basketCtx = useContext(BasketContext);
  return (
    <Link href="/cart" className="flex items-center gap-2">
      <ShoppingCart className="w-[24px]" />
      {basketCtx.basketData?.length > 0 && (
        <p className="text-sm font-bold">{basketCtx.basketData?.length}</p>
      )}
    </Link>
  );
});

CartLink.displayName = "CartLink";

export default LgHeader;
