import ModalBase from "@/components/Modal/ModalBase";
import React, { useContext } from "react";
import { ageConfirmation } from "../../localStorage/auth";
import LoginContext from "@/store/AuthContext";
import { useTranslations } from "next-intl";

export default function AgeConfirmationModal({ showModal, setShowModal }) {
  const authCtx = useContext(LoginContext);
  const t = useTranslations("index");

  return (
    <ModalBase show={showModal} setShow={setShowModal} stayOpen={true}>
      <div className=" w-full lg:w-[430px] bg-root-backgroung">
        <div className=" w-full  m-auto">
          <div className=" w-[90%] max-w-[400px] bg-root-backgroung px-6 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-5 rounded-[10px] max-h-[60dvh] overflow-y-scroll no-scrollbar">
            <p className="text-[22px] font-bold text-center">
              {t("modal-title-age-confirmation")}
            </p>
            <p className="text-[#6c6c6c] text-center mt-3">
              {t("modal-description-age-confirmation")}
            </p>
            <div className="flex justify-end mt-6 gap-5">
              <button
                onClick={() => {
                  ageConfirmation.set(true);
                  authCtx.ageConfirmationSetter();
                  setShowModal(false);
                }}
                className="text-white bg-primary py-2 px-3 w-[50%] rounded-[10px] font-bold"
              >
                {t("button-age-confirm-over-21")}
              </button>
              <button className="p-2 border-[1px] w-[50%] text-primary border-primary py-2 px-3 rounded-[10px]">
                {t("button-age-confirm-under-21")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
