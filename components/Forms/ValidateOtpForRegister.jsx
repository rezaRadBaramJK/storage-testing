import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import VerificationInput from "react-verification-input";
import { useState, useEffect, useContext } from "react";

import {
  accessTokenLs,
  isLogin,
  refreshTokenLS,
  userData,
} from "@/localStorage/auth";
import LoginContext from "@/store/AuthContext";
// import { validateOtp } from "@/services/http/auth/Post_validateOtp";
import { useRouter } from "next/router";
import { useTranslations } from 'next-intl';

import Image from "next/image";
import Input from "../Inputs/Input";
import PhoneNumberInput from "../Inputs/PhoneNumberInput";
import { sendOtp } from "@/services/http/auth/sendOtp";
import PasswordInput from "../Inputs/PasswordInput";
import { validateOtp } from "@/services/http/auth/validateOtp";

export default function ValidateOtpForRegister({ fromForgot }) {
  const t = useTranslations('index');
  const router = useRouter();
  const [contDown, seCountDown] = useState(60);
  const [otpCode, setOtpCode] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const authCtx = useContext(LoginContext);
  useEffect(() => {
    const interval = setInterval(() => {
      if (contDown > 0) {
        seCountDown(contDown - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [contDown]);
  const inputValidation = Yup.object().shape({
    password: Yup.string().required(t("password-required")),
    confirm_password: Yup.string().required(t("confirm-password-required")),
    otp: Yup.string().required(t("otp-required")),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      phoneNumber: router?.query?.phone,
      password: "",
      confirm_password: "",
      otp: "",
    },
    onSubmit: async (value) => {
      if (value?.password.trim() === value?.confirm_password?.trim()) {
        setLoading(true);
        const response = await validateOtp(
          `+965${value.phoneNumber}`,
          fromForgot ? "2" : "0",
          value?.password,
          value?.otp
        );
        if (response?.success) {
          refreshTokenLS.set(response?.data?.refresh_token);
          if (fromForgot) {
            router?.push("/auth/login");
          } else {
            router.push(`/auth/signup/completeRegistration`);
          }
          setDisableButton(true);
        } else {
          toast.error(response?.errors, { position: "top-center" });
          setLoading(false);
        }
      } else {
        toast.error(t("password-mismatch"), {
          position: "top-center",
        });
      }
    },
    validationSchema: inputValidation,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleValoidateOtp = (e) => {
    if (e?.length === 6) {
      formik?.setFieldValue("otp", e);
    }
  };

  const handleResend = async () => {
    if (contDown == 0 && router?.query?.phone) {
      const response = await sendOtp(`+965${router?.query?.phone}`, "0");
      if (response?.success) {
        toast.success(t("request-success"), {
          position: "top-center",
        });
        seCountDown(60);
      }
    }
  };

  return (
    <div className={`w-full ${loading ? "animate-pulse" : ""}`}>
      <form
        onSubmit={formik.handleSubmit}
        className="h-full lg:h-[70%]   flex flex-col justify-center items-center gap-5 mt-4  w-full"
      >
        <div className="w-full">
          <PhoneNumberInput
            label={t("phone_number_title")}
            placeholder={t("phone_number")}
            id={"phoneNumber"}
            name={"phoneNumber"}
            disabled={true}
            value={router?.query?.phone}
          />
        </div>

        <div className="w-full flex flex-col gap-5">
          <div className=" w-full ">
            <div className="flex justify-between">
              <p className="text-[13px] font-bold text-[#2E2D2F]">
                {t("enterConfirmationCode")}
              </p>
              {showError && (
                <p className="text-[13px] text-error">{t('error-wrong-code')}</p>
              )}
            </div>
            <div style={{ direction: "ltr" }}>
              <VerificationInput
                classNames={{
                  container: "flex justify-center w-full gap-4 mt-2 mx-auto",
                  character:
                    "rounded-[10px]  outline-none bg-white text-[14px] border-[2px] border-gray-Primary",
                  characterInactive: "character--inactive",
                  characterSelected: "character--selected",
                  characterFilled: "character--filled",
                }}
                type="tel"
                length={6}
                onComplete={handleValoidateOtp}
                placeholder=""
                validChars="0-9"
              />
            </div>
            <p
              style={{ direction: "ltr" }}
              onClick={handleResend}
              className="text-[13px] text-[#2E2D2F] mt-2 cursor-pointer"
            >
              (00:{contDown}) {t("resendOTP")}
            </p>
          </div>
          <div>
            <PasswordInput
              placeholder={t("enter-password")}
              name={"password"}
              id={"password"}
              error={formik.errors.password}
              handleChange={formik.handleChange}
              label={t("password")}
            />
          </div>
          <div>
            <PasswordInput
              placeholder={t("enter-confirm-password")}
              name={"confirm_password"}
              id={"confirm_password"}
              error={formik.errors.confirm_password}
              handleChange={formik.handleChange}
              label={t("confirm_password")}
            />
          </div>
        </div>

        <button
          onClick={formik?.handleSubmit}
          className="bg-primary border-[1px] border-primary max-w-[70%] rounded-full py-3 w-full text-white"
        >
          {fromForgot ? t("forget_password_main") : t("sign_up")}
        </button>
      </form>
    </div>
  );
}
