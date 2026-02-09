import ModalBase from "@/components/Modal/ModalBase";
import React from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

export default function LoginModal({ showModal, setShowModal, title }) {
  const router = useRouter();
  const t = useTranslations("index");

  return (
    <ModalBase show={showModal} setShow={setShowModal}>
      <div className=" w-full lg:w-[430px] bg-root-backgroung">
        <div className=" w-full  m-auto">
          <div className=" w-full bg-root-backgroung absolute bottom-0 p-5 rounded-t-[30px] max-h-[60dvh] overflow-y-scroll no-scrollbar">
            <p className="text-[20px] text-main-color font-bold mt-5 text-center">
              {title}
            </p>

            <div className="flex justify-end mt-6 gap-5">
              <button
                onClick={() => {
                  router.push("/auth/login");
                }}
                className=" p-2 border-[1px] w-[50%] text-primary border-primary  py-2 px-3 rounded-[10px] font-bold"
              >
                {t("button-login")}
              </button>
              <button
                onClick={() => {
                  router.push("/auth/signup");
                }}
                className="text-white bg-primary py-2 px-3 w-[50%] rounded-[10px] font-bold"
              >
                {t("button-sign-up")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
