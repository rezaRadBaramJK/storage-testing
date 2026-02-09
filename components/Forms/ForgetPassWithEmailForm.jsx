import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { accessTokenLs, refreshTokenLS, userData } from "@/localStorage/auth";
import LoginContext from "@/store/AuthContext";
import { basketDataLs } from "@/localStorage/auth";
import { getShoppingCartData } from "@/services/http/cart/getCartData";
import { loginWithEmail } from "@/services/http/auth/loginWithEmail";
import Input from "../Inputs/Input";

import BasketContext from "@/store/BasketContext";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { forgetpassWithEmail } from "@/services/http/auth/forgetpassWithEmail";
export default function ForgetPassWithEmailForm() {
  const t = useTranslations("index");
  const authCtx = useContext(LoginContext);
  const basketCtx = useContext(BasketContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const getShoppingCartOfUser = async () => {
    const response = await getShoppingCartData();
    if (response.success) {
      basketDataLs.set(JSON.stringify(response?.data?.items));
      basketCtx.setBasket();
      setLoading(false);
      toast.success(t("login-page.success"), {
        position: "top-center",
      });
    }
  };
  const inputValidation = Yup.object().shape({
    Email: Yup.string()
      .required("email is required")
      .email("email not valid")
      .matches(/^(?!.*@[^,]*,)/),
  });
  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    onSubmit: async (value) => {
      setLoading(true);
      const response = await forgetpassWithEmail(value);
      if (response.success) {
        toast.success("Check new password In your Mail", {
          position: "top-center",
        });
        router.replace("/auth/login");
      } else {
        toast.error(response?.errors, {
          position: "top-center",
        });
        setLoading(false);
      }
    },
    validationSchema: inputValidation,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={` w-full  flex flex-col  animate-fade ${
        loading ? "animate-pulse" : ""
      }`}
    >
      <div className="my-3">
        <Input
          disabled={loading}
          name={"Email"}
          handleChange={formik?.handleChange}
          value={formik.values?.Email}
          fromModal={true}
          label={t("login-form.email")}
          placeholder={t("login-form.enterEmail")}
          id={"E-mail"}
          error={formik?.errors?.Email}
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-primary text-white m-auto w-[50%] py-3 mt-10"
      >
        {t("submit")}
      </button>
    </form>
  );
}
