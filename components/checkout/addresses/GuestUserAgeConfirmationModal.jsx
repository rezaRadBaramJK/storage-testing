import React, { useContext } from "react";
import ModalBase from "@/components/Modal/ModalBase";
import LoginContext from "@/store/AuthContext";
import { useTranslations } from "next-intl";
import * as Yup from "yup";
import { useFormik } from "formik";
import DateInput from "@/components/Inputs/DateInput";
import { guestCheckoutAgeConfirmation } from "@/localStorage/auth";
import { toast } from "react-toastify";

const GuestUserAgeConfirmationModal = ({ show, setShow }) => {
  const authCtx = useContext(LoginContext);
  const t = useTranslations("index");

  const inputValidation = Yup.object().shape({
    birth_day: Yup.string().required("Please enter your birth date"),
  });

  const formik = useFormik({
    initialValues: {
      birth_day: "",
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
        toast.error("Your age is under 21", {
          position: "top-center",
        });
        guestCheckoutAgeConfirmation.set(false);
        authCtx?.guestCheckoutAgeConfirmationSetter();
        return;
      }
      guestCheckoutAgeConfirmation.set(true);
      authCtx?.guestCheckoutAgeConfirmationSetter();
      setShow(false);
    },
    validationSchema: inputValidation,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <ModalBase show={show} setShow={setShow} stayOpen={true}>
      <form
        onSubmit={formik.handleSubmit}
        className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2  w-full lg:w-[430px] bg-root-backgroung flex flex-col items-center gap-5 rounded-xl px-1 py-5"
      >
        <p className="text-xl font-bold text-primary">
          {t("modal-title-please-confirm-your-age")}
        </p>
        <div className="w-3/4">
          <DateInput
            name={"birth_day"}
            id={"birth_day"}
            error={formik.errors.birth_day}
            handleChange={formik.handleChange}
            label={t("date_of_birth")}
          />
        </div>
        <button
          className="bg-primary rounded-xl px-7 h-11 hover:bg-yellow-color transition-all duration-300"
          type="submit"
        >
          {t("button-check")}
        </button>
      </form>
    </ModalBase>
  );
};

export default GuestUserAgeConfirmationModal;
