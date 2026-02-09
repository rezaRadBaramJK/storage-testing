import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import LoginContext from "@/store/AuthContext";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import PhoneNumberInput from "../Inputs/PhoneNumberInput";
import { sendOtp } from "@/services/http/auth/sendOtp";
import Link from "next/link";

export default function RegisterWithOtpForm({ fromForgot }) {
  const t = useTranslations("index");
  const router = useRouter();
  const [showOtp, setShowOtp] = useState(false);
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
    phoneNumber: Yup.string("Phone is not valid")
      .test("len", "Must be exactly 8 characters", (val) => val.length === 8)
      .required("phone is required"),
  });
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    onSubmit: async (value) => {
      setLoading(true);
      const response = await sendOtp(
        `+965${value.phoneNumber}`,
        fromForgot ? "2" : "0"
      );
      if (response?.success) {
        router.push(
          `/auth/${fromForgot ? "forgotPass" : "signup"}/ValidateOtp/${
            value?.phoneNumber
          }`
        );
        setDisableButton(true);
      } else {
        toast.error(response?.errors, { position: "top-center" });
        setLoading(false);
      }
    },
    validationSchema: inputValidation,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div className={`w-full ${loading ? "animate-pulse" : ""} `}>
      <form
        onSubmit={formik.handleSubmit}
        className="h-full lg:h-[70%]   flex flex-col justify-center items-center gap-5 mt-4  w-full"
      >
        <div className="w-full">
          <PhoneNumberInput
            label={t("phone_number_title")}
            placeholder={`${t("phone_number")}`}
            error={formik?.errors?.phoneNumber}
            handleChange={formik.handleChange}
            id={"phoneNumber"}
            name={"phoneNumber"}
          />
        </div>

        <button
          onClick={formik?.handleSubmit}
          className="bg-primary border-[1px] border-primary max-w-[50%] rounded-full py-3 w-full text-white"
        >
          {fromForgot ? t("enter") : t("sign_up")}
        </button>
      </form>
    </div>
  );
}
