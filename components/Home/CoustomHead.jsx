import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import SelectCurrency from "./SelectCurrency";
import { changeLanguage } from "@/services/http/setting/changeLanguage";
import { localLang } from "@/localStorage/auth";
import { Arabic, English } from "@/public/assets/jsxIcons";
import { Search } from "lucide-react";
import { useAvailableCurrencyQuery } from "@/queries/setting";

/*
Spin Feature
const Spinning = dynamic(() => import("../Spinning"), { ssr: false });
const PrizeModal = dynamic(
  () => import("../Spinning/PrizeModal").then((mod) => mod.default),
  {
    ssr: false,
  }
);
*/

export default function CoustomHead({ setResendChangeCurrencyRequest }) {
  const availableCurrencyQuery = useAvailableCurrencyQuery();
  const router = useRouter();

  /* Spin Feature
    const [showPrize, setShowPrize] = useState(false);
    const [priz, setPrize] = useState({ Name: "" });
    const [showSpin, setShowSpin] = useState(false);
    */

  const { locale, locales } = router;
  const currencies =
    availableCurrencyQuery.data?.data?.map((item) => ({
      label: item.Name,
      value: item.Id,
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
    <div
      style={{ direction: "ltr" }}
      className="bg-productCard-bg sticky top-14 z-20 flex items-center justify-between w-full p-2"
    >
      <div className="flex items-center gap-2">
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
        <SelectCurrency
          setResendChangeCurrencyRequest={setResendChangeCurrencyRequest}
          options={currencies}
        />
      </div>
      <div className="flex gap-5">
        {/* Spin Feature */}
        {/* <button onClick={() => setShowSpin(true)}>
          <Image
            width={26}
            height={26}
            src="/assets/icons/spin.svg"
            alt="Spin"
          />
        </button> */}

        <Link href="/search">
          <Search className="w-[24px]" />
        </Link>
      </div>

      {/* Spin Feature */}
      {/* <Spinning
        setShowPrize={setShowPrize}
        setPrize={setPrize}
        showSpin={showSpin}
        setShowSpin={setShowSpin}
      />

      <PrizeModal
        priz={priz}
        setShowPrize={setShowPrize}
        showPrize={showPrize}
      /> */}
    </div>
  );
}
