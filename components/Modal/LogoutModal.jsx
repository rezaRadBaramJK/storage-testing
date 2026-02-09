import React, { useContext, useState } from "react";
import BasketContext from "@/store/BasketContext";
import { guesttoken } from "@/services/http/auth/guestToken";
import {
  basketDataLs,
  deliveryAddressData,
  deliveryMethodeData,
  refreshTokenLS,
  userData,
} from "@/localStorage/auth";
import { useRouter } from "next/router";
import LoginContext from "@/store/AuthContext";
import { useTranslations } from "next-intl";
import ModalBase from "./ModalBase";
export default function LogoutModal({ showLogoutModal, setShowLogoutModal }) {
  const t = useTranslations("index");
  const authCtx = useContext(LoginContext);
  const [loading, setloading] = useState(false);
  const basketCtx = useContext(BasketContext);
  const router = useRouter();
  const handleLogout = async () => {
    setloading(true);
    const response = await guesttoken();
    if (response.success) {
      setloading(false);
      userData.set(JSON.stringify(response?.data));
      basketDataLs.remove();
      refreshTokenLS.remove();
      deliveryAddressData.remove();
      deliveryMethodeData.remove();
      basketCtx.setBasket();
      basketCtx.setAddressDelivery();
      basketCtx.setDeliveryMethode();
      authCtx.setUserinfo();
      authCtx.toggleLogin(false);
      setShowLogoutModal(false);
      router.push("/");
    }
  };
  return (
    <ModalBase show={showLogoutModal} setOpen={setShowLogoutModal}>
      <div className=" w-full lg:w-[430px] ">
        <div className=" w-full  m-auto">
          <div className=" w-full bg-root-backgroung absolute bottom-0 p-5  lg:rounded-b-[30px] lg:bottom-[50%] lg:translate-y-[50%] rounded-t-[30px] max-h-[60dvh] overflow-y-scroll no-scrollbar">
            <p className="text-[20px]  font-bold mt-5">{t("logout")}</p>
            <p className="text-[14px] mt-4">{t("log_out_subtitle")}</p>
            <div className="flex justify-end mt-6 gap-5">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-fit p-2 text-main-color py-2 px-3 rounded-[10px] font-bold"
              >
                {t("no")}
              </button>
              <button
                onClick={handleLogout}
                className="text-white bg-primary py-2 px-3 rounded-[10px] font-bold"
              >
                {t("yes")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
