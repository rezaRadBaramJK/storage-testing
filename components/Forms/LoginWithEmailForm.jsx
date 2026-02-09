// import React, { useState, useContext } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import { accessTokenLs, refreshTokenLS, userData } from "@/localStorage/auth";
// import LoginContext from "@/store/AuthContext";
// import { basketDataLs } from "@/localStorage/auth";
// import { getShoppingCartData } from "@/services/http/cart/getCartData";
// import { loginWithEmail } from "@/services/http/auth/loginWithEmail";
// import Input from "../Inputs/Input";
// import PasswordInput from "../Inputs/PasswordInput";
// import BasketContext from "@/store/BasketContext";
// import { useRouter } from "next/router";
// import PhoneNumberInput from "../Inputs/PhoneNumberInput";
// import { useTranslations } from "next-intl";
// import Link from "next/link";
// export default function LoginWithEmailForm() {
//   const authCtx = useContext(LoginContext);
//   const basketCtx = useContext(BasketContext);
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const t = useTranslations("index");
//   const getShoppingCartOfUser = async () => {
//     const response = await getShoppingCartData();
//     if (response.success) {
//       basketDataLs.set(JSON.stringify(response?.data?.items));
//       basketCtx.setBasket();
//       setLoading(false);
//       toast.success("Login successful", {
//         position: "top-center",
//       });
//     }
//   };
//   const inputValidation = Yup.object().shape({
//     phoneNumber: Yup.string("Phone is not valid")
//       .test("len", "Must be exactly 8 characters", (val) => val.length === 8)
//       .required("phone is required"),
//     Password: Yup.string().required("password is required"),
//   });
//   const formik = useFormik({
//     initialValues: {
//       phoneNumber: "",
//       Password: "",
//     },
//     onSubmit: async (value) => {
//       setLoading(true);
//       const response = await loginWithEmail(
//         `+965${value?.phoneNumber}`,
//         value?.Password
//       );
//       if (response.success) {
//         userData.set(JSON.stringify(response?.data));
//         refreshTokenLS.set(response?.data?.refresh_token);
//         accessTokenLs.set(response?.data?.token);
//         authCtx.setUserinfo();
//         authCtx.toggleLogin(true);
//         getShoppingCartOfUser();
//         router.push("/");
//         setShowLoginModal(false);
//       } else {
//         toast.error(response?.errors, {
//           position: "top-center",
//         });
//         setLoading(false);
//       }
//     },
//     validationSchema: inputValidation,
//     validateOnMount: false,
//     validateOnChange: false,
//     validateOnBlur: false,
//   });
//   return (
//     <form
//       onSubmit={formik.handleSubmit}
//       className={` w-full  flex flex-col  animate-fade ${
//         loading ? "animate-pulse" : ""
//       }`}
//     >
//       <div className="my-3">
//         <PhoneNumberInput
//           label={t("phone_number_title")}
//           placeholder={`${t("phone_number")}`}
//           id={"phoneNumber"}
//           name={"phoneNumber"}
//           handleChange={formik.handleChange}
//           error={formik.errors?.phoneNumber}
//         />
//       </div>
//       <div className="my-3">
//         <PasswordInput
//           disabled={loading}
//           name={"Password"}
//           handleChange={formik?.handleChange}
//           fromModal={true}
//           label={t("password")}
//           placeholder={"Enter Your Password"}
//           error={formik?.errors?.Password}
//           id={"Password *"}
//         />
//       </div>
//       <div>
//         <Link
//           className="text-primary block text-[12px]"
//           href="/auth/forgotPass"
//         >
//           {t("forget_password")}
//         </Link>
//       </div>
//       <button
//         type="submit"
//         className="rounded-full bg-primary text-white m-auto w-[50%] py-3 mt-10"
//       >
//         {t("login")}
//       </button>
//     </form>
//   );
// }
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
import PasswordInput from "../Inputs/PasswordInput";
import BasketContext from "@/store/BasketContext";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Link from "next/link";
export default function LoginWithEmailForm() {
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
    Password: Yup.string().required("password is required"),
  });
  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    onSubmit: async (value) => {
      setLoading(true);
      const response = await loginWithEmail(value);
      if (response.success) {
        userData.set(JSON.stringify(response?.data));
        refreshTokenLS.set(response?.data?.refresh_token);
        accessTokenLs.set(response?.data?.token);
        authCtx.setUserinfo();
        authCtx.toggleLogin(true);
        getShoppingCartOfUser();
        router.push("/");
        setShowLoginModal(false);
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
      <div className="my-3">
        <PasswordInput
          disabled={loading}
          name={"Password"}
          handleChange={formik?.handleChange}
          fromModal={true}
          label={t("login-form.password")}
          placeholder={t("login-form.enterPassword")}
          error={formik?.errors?.Password}
          id={"Password *"}
        />
      </div>
      <div>
        <Link
          className="text-primary block text-[12px]"
          href="/auth/forgotPass"
        >
          {t("forget_password")}
        </Link>
      </div>
      <button
        type="submit"
        className="rounded-full bg-primary text-white m-auto w-[50%] py-3 mt-10"
      >
        {t("login")}
      </button>
    </form>
  );
}
