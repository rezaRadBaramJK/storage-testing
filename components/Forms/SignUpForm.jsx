// import React, { useState, useContext } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import { accessTokenLs, refreshTokenLS, userData } from "@/localStorage/auth";
// import LoginContext from "@/store/AuthContext";
// import Input from "../Inputs/Input";
// import PasswordInput from "../Inputs/PasswordInput";
// import BasketContext from "@/store/BasketContext";
// import DateInput from "../Inputs/DateInput";
// import { registerWithEmail } from "@/services/http/auth/registerWithEmail";
// import { useRouter } from "next/router";
// import { edituserinfo } from "@/services/http/user/edituserinfo";
// export default function SignUpForm() {
//   const authCtx = useContext(LoginContext);
//   const basketCtx = useContext(BasketContext);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const inputValidation = Yup.object().shape({
//     first_name: Yup.string().required("First Name is required"),
//     last_name: Yup.string().required("Last Name is required"),

//     birth_day: Yup.string(),
//   });
//   const formik = useFormik({
//     initialValues: {
//       first_name: "",
//       last_name: "",
//       email: "",

//       birth_day: "",
//     },
//     onSubmit: async (value) => {
//       setLoading(true);

//       const response = await edituserinfo(value);
//       if (response.success) {
//         userData.set(JSON.stringify(response?.data));
//         refreshTokenLS.set(response?.data?.refresh_token);
//         accessTokenLs.set(response?.data?.token);
//         authCtx.setUserinfo();
//         authCtx.toggleLogin(true);
//         setLoading(false);
//         toast.success("register successful", {
//           position: "top-center",
//         });
//         router.push("/");
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
//     <div className="w-full ">
//       <form onSubmit={formik.handleSubmit} className=" flex flex-col gap-5">
//         <div>
//           <Input
//             name={"first_name"}
//             id={"first_name"}
//             handleChange={formik.handleChange}
//             error={formik.errors.first_name}
//             placeholder={"Enter Your First Name"}
//             label={"First Name"}
//           />
//         </div>
//         <div>
//           <Input
//             name={"last_name"}
//             id={"last_name"}
//             handleChange={formik.handleChange}
//             error={formik.errors.last_name}
//             placeholder={"Enter Your Last Name"}
//             label={"Last Name"}
//           />
//         </div>
//         <div>
//           <Input
//             name={"email"}
//             id={"email"}
//             handleChange={formik.handleChange}
//             error={formik.errors.email}
//             label={"Email"}
//             placeholder={"Enter Your Email"}
//           />
//         </div>

//         <div>
//           <DateInput
//             name={"birth_day"}
//             id={"birth_day"}
//             error={formik.errors.birth_day}
//             handleChange={formik.handleChange}
//             label={"Date Of Birth"}
//           />
//         </div>

//         <div className="flex justify-center items-center mt-auto">
//           <button
//             onClick={formik.handleSubmit}
//             className="bg-primary text-white text-bold py-3 w-[50%] rounded-full"
//           >
//             Sign Up
//           </button>
//         </div>
//       </form>
//       <div className="w-full"></div>
//     </div>
//   );
// }
import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { accessTokenLs, refreshTokenLS, userData } from "@/localStorage/auth";
import LoginContext from "@/store/AuthContext";
import Input from "../Inputs/Input";
import PasswordInput from "../Inputs/PasswordInput";
import BasketContext from "@/store/BasketContext";
import DateInput from "../Inputs/DateInput";
import { registerWithEmail } from "@/services/http/auth/registerWithEmail";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import AgeConfirmationModal from "@/components/Modal/AgeConfirmationModal";

export default function SignUpForm() {
  const authCtx = useContext(LoginContext);
  const basketCtx = useContext(BasketContext);
  const [loading, setLoading] = useState(false);
  const [showModalAge, setShowModalAge] = useState(false);

  const router = useRouter();
  const t = useTranslations("index");

  const inputValidation = Yup.object().shape({
    first_name: Yup.string().required(t("first_name_required")),
    last_name: Yup.string().required(t("last_name_required")),
    email: Yup.string().required(t("email_required")),
    phone: Yup.string(),
    birth_day: Yup.string(),
    password: Yup.string().required(t("password_required")),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      birth_day: "",
      password: "",
    },
    onSubmit: async (value) => {
      const birthDate = new Date(value.birth_day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 21) {
        setShowModalAge(true);
        return;
      }

      setLoading(true);
      const response = await registerWithEmail(value);
      if (response.success) {
        userData.set(JSON.stringify(response?.data));
        refreshTokenLS.set(response?.data?.refresh_token);
        accessTokenLs.set(response?.data?.token);
        authCtx.setUserinfo();
        authCtx.toggleLogin(true);
        setLoading(false);
        toast.success(t("register_successful"), {
          position: "top-center",
        });
        router.push("/");
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
    <>
      <div className="w-full">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <div>
            <Input
              name={"first_name"}
              id={"first_name"}
              handleChange={formik.handleChange}
              error={formik.errors.first_name}
              placeholder={t("enter_your_first_name")}
              label={t("first_name")}
            />
          </div>
          <div>
            <Input
              name={"last_name"}
              id={"last_name"}
              handleChange={formik.handleChange}
              error={formik.errors.last_name}
              placeholder={t("enter_your_last_name")}
              label={t("last_name")}
            />
          </div>
          <div>
            <Input
              name={"email"}
              id={"email"}
              handleChange={formik.handleChange}
              error={formik.errors.email}
              label={t("email")}
              placeholder={t("enter_your_email")}
            />
          </div>
          <div>
            <Input
              name={"phone"}
              id={"phone"}
              handleChange={formik.handleChange}
              error={formik.errors.phone}
              label={t("phone_number")}
              placeholder={t("enter_your_phone_number")}
            />
          </div>
          <div>
            <DateInput
              name={"birth_day"}
              id={"birth_day"}
              error={formik.errors.birth_day}
              handleChange={formik.handleChange}
              label={t("date_of_birth")}
            />
          </div>
          <div>
            <PasswordInput
              placeholder={t("enter_your_password")}
              name={"password"}
              id={"password"}
              error={formik.errors.password}
              handleChange={formik.handleChange}
              label={t("password")}
            />
          </div>
          {/* <div>
          <PasswordInput
            placeholder={t("enter_your_confirm_password")}
            name={"confirm_password"}
            id={"confirm_password"}
            error={formik.errors.confirm_password}
            handleChange={formik.handleChange}
            label={t("confirm_password")}
          />
        </div> */}
          <div className="flex items-center justify-center mt-auto">
            <button
              onClick={formik.handleSubmit}
              className="bg-primary text-white text-bold py-3 w-[50%] rounded-full"
            >
              {t("sign_up")}
            </button>
          </div>
        </form>
        <div className="w-full"></div>
      </div>
      <AgeConfirmationModal
        showModal={showModalAge}
        setShowModal={setShowModalAge}
      />
    </>
  );
}
