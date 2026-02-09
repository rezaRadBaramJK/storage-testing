import React, { useState } from "react";
import Input from "../Inputs/Input";
import PasswordInput from "../Inputs/PasswordInput";
import SelectBox from "../Inputs/SelectBox";
import DateInput from "../Inputs/DateInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { edituserinfo } from "@/services/http/user/edituserinfo";
import { useTranslations } from "next-intl";
import LogoutModal from "../Modal/LogoutModal";

export default function ProfileDetailsForm({ data }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const t = useTranslations("index");

  const inputValidation = Yup.object().shape({
    first_name: Yup.string().required(t("firstNameRequired")),
    last_name: Yup.string().required(t("lastNameRequired")),
    email: Yup.string().required(t("emailRequired")),
    phone: Yup.string().required(t("phoneRequired")),
    birth_day: Yup.string(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
      phone: data?.phone,
      birth_day: `${data?.date_of_birth_year}-${data?.date_of_birth_month}-${data?.date_of_birth_day}`,
    },
    onSubmit: async (value) => {
      const response = await edituserinfo(value);
      if (response?.success) {
        toast.success(t("accountUpdatedSuccess"), {
          position: "top-center",
        });
      }
    },
    validationSchema: inputValidation,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div className="min-h-[80vh]">
      <form onSubmit={formik?.handleSubmit}>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 p-2 mt-5">
          <div>
            <Input
              value={formik?.values?.first_name}
              name={"first_name"}
              id={"first_name"}
              handleChange={formik?.handleChange}
              placeholder={t("enterFirstName")}
              label={t("firstName")}
            />
          </div>
          <div>
            <Input
              value={formik?.values?.last_name}
              name={"last_name"}
              id={"last_name"}
              handleChange={formik?.handleChange}
              placeholder={t("enterLastName")}
              label={t("lastName")}
            />
          </div>
          <div>
            <Input
              value={formik?.values?.email}
              name={"email"}
              id={"email"}
              handleChange={formik?.handleChange}
              label={t("email")}
              placeholder={t("enterEmail")}
            />
          </div>
          <div>
            <Input
              value={formik?.values?.phone}
              name={"phone"}
              id={"phone"}
              handleChange={formik?.handleChange}
              label={t("phoneNumber")}
              placeholder={t("enterPhoneNumber")}
            />
          </div>
          <div>
            <DateInput
              value={formik?.values?.birth_day}
              name={"birth_day"}
              id={"birth_day"}
              handleChange={formik?.handleChange}
              label={t("dateOfBirth")}
            />
          </div>
        </div>
        <div className="flex items-center justify-center  mt-10">
          <button
            onClick={formik?.handleSubmit}
            className="bg-primary text-white text-bold py-3 w-[50%] lg:max-w-[400px] rounded-full"
          >
            {t("save")}
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center justify-center gap-5 mt-5">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="border-primary border-[1px] text-primary text-bold py-3 w-[50%] lg:max-w-[400px] rounded-full"
        >
          {t("signOut")}
        </button>
      </div>
      <LogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
      />
    </div>
  );
}
