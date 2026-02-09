import { useEffect, useContext } from "react";
import { Currency } from "@/localStorage/auth";
import { getUserContext } from "@/services/http/setting/getContext";
import AuthContext from "@/store/AuthContext";

const LanguageSyncer = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getUserContext();
        if (response?.success) {
          const serverLang = response.data.Language.Id === 2 ? "ar" : "en";

          Currency.set(response.data.CurrencyId);
          document.body.setAttribute("dir", serverLang === "ar" ? "rtl" : "ltr");

        }
      } catch (error) {
        console.error("Failed to fetch user context", error);
      }
    };

    init();
  }, [authCtx?.isLogin]);

  return null;
};

export default LanguageSyncer;