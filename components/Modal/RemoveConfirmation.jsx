import React from "react";
import ModalBase from "./ModalBase";
import { useTranslations } from "next-intl";

export default function RemoveConfirmation({
  showModal,
  setShowModal,
  text,
  action,
  title,
}) {
  const t = useTranslations("index");
  return (
    <ModalBase show={showModal} setShow={setShowModal}>
      <div className=" w-full lg:w-[430px] bg-root-backgroung">
        <div className=" w-full  m-auto">
          <div className=" w-full bg-root-backgroung absolute bottom-0 p-5 rounded-t-[30px] max-h-[60dvh] lg:rounded-b-[30px] lg:bottom-[50%] lg:translate-y-[50%] overflow-y-scroll no-scrollbar">
            <p className="text-[20px] text-main-color font-bold mt-5">
              {title}
            </p>
            <p className="text-main-color text-[14px] mt-4">{text}</p>
            <div className="flex justify-end mt-6 gap-5">
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="w-fit p-2 text-root-text py-2 px-3 rounded-[10px] font-bold"
              >
                {t("no")}
              </button>
              <button
                onClick={action}
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
