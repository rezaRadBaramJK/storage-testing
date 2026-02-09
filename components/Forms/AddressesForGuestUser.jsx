import React, { useEffect, useState } from "react";
import SelectBox from "../Inputs/SelectBox";
import Input from "../Inputs/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getCountries } from "@/services/http/addresses/getCountries";
import { getStatesByCountryId } from "@/services/http/addresses/getStatesByCountryId";
import { addNewAddresses } from "@/services/http/addresses/AddNewAddress";
import { editAddressForm } from "@/services/http/addresses/editAddress";
import { useTranslations } from "next-intl";
import TextArea from "../Inputs/TextArea";
import { useAddressesQuery } from "@/queries/addresses";

export default function AddressesForGuestUser({ data, fromEdit, id }) {
  const t = useTranslations("index");

  const addressesQuery = useAddressesQuery();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [countries, setCouintries] = useState([]);
  const [area, setArea] = useState([]);

  const inputValidation = Yup.object().shape({
    FirstName: Yup.string().required(t("firstNameRequired")),
    LastName: Yup.string().required(t("lastNameRequired")),
    Email: Yup.string().optional(),
    Phone: Yup.string().required(t("phoneRequired")),
    Governorate: Yup.string().required(t("governorateRequired")),
    Area: Yup.string().required(t("areaRequired")),
    Block: Yup.string().required(t("blockRequired")),
    Street: Yup.string().required(t("streetRequired")),
    Avenue: Yup.string(),
    HomeNumber: Yup.string().required(t("homeNumberRequired")),
    Floor: Yup.string(),
    AreaName: Yup.string(),
  });
  const { handleChange, values, setFieldValue, handleSubmit, errors } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        FirstName: data?.first_name ? data?.first_name : "",
        LastName: data?.last_name ? data?.last_name : "",
        Email: data?.email ? data?.email : "",
        Phone: data?.phone_number ? data?.phone_number : "",
        Governorate: "143",
        Area: data?.state_province_id ? data?.state_province_id : "",
        AreaName: data?.state_province_name ? data?.state_province_name : "",
        Block: data?.custom_address_attributes?.filter(
          (item) => item?.id === 7
        )[0]?.default_value,
        Street: data?.custom_address_attributes?.filter(
          (item) => item?.id === 8
        )[0]?.default_value,
        Avenue: data?.custom_address_attributes?.filter(
          (item) => item?.id === 10
        )[0]?.default_value,
        HomeNumber: data?.custom_address_attributes?.filter(
          (item) => item?.id === 2
        )[0]?.default_value,
        Floor: data?.custom_address_attributes?.filter(
          (item) => item?.id === 3
        )[0]?.default_value,
        Apartment: data?.custom_address_attributes?.filter(
          (item) => item?.id === 4
        )[0]?.default_value,
        Notes: data?.custom_address_attributes?.filter(
          (item) => item?.id === 6
        )[0]?.default_value,
      },
      onSubmit: async (value) => {
        const dataForThisApi = {
          model: {
            address: {
              first_name: value?.FirstName,
              last_name: value?.LastName,
              email: value?.Email,
              phone_number: value?.Phone,
              country_id: value?.Governorate,
              state_province_id: value?.Area,
              city: value.AreaName,
            },
          },
          form: {
            address_attribute_1: "Home",
            address_attribute_7: value?.Block,
            address_attribute_8: value?.Street,
            address_attribute_2: value?.HomeNumber,
            address_attribute_10: value?.Avenue,
            address_attribute_3: value?.Floor,
            address_attribute_4: value?.Apartment,
            address_attribute_6: value?.Notes,
          },
        };
        if (fromEdit) {
          const response = await editAddressForm(dataForThisApi, id);
          if (response?.success) {
            await addressesQuery.refetch();
            toast.success(t("addressUpdatedSuccess"), {
              // Updated to use translation key
              position: "top-center",
            });
            router.back();
          }
        } else {
          const response = await addNewAddresses(dataForThisApi);
          if (response?.success) {
            await addressesQuery.refetch();
            toast.success(t("addressAddedSuccess"), {
              // Updated to use translation key
              position: "top-center",
            });
            router.back();
          }
        }
      },
      validationSchema: inputValidation,
      validateOnMount: false,
      validateOnChange: false,
      validateOnBlur: false,
    });
  // useEffect(() => {
  //   const countries = async () => {
  //     const response = await getCountries();
  //     if (response.success) {
  //       const replaceCountriesArray = [];
  //       response?.data?.map((item) => {
  //         replaceCountriesArray.push({
  //           value: item?.Id,
  //           label: item?.Name,
  //         });
  //       });
  //       setCouintries(replaceCountriesArray);
  //     }
  //   };
  //   countries();
  // }, []);

  useEffect(() => {
    const governorate = async () => {
      const response = await getStatesByCountryId(values?.Governorate);
      if (response?.success) {
        const replaceAreaArray = [];
        response?.data?.map((item) => {
          replaceAreaArray.push({
            value: item?.id,
            label: item?.name,
          });
        });
        setArea(replaceAreaArray);
      }
    };
    if (values?.Governorate) governorate();
  }, [values?.Governorate]);

  return (
    <form onSubmit={handleSubmit} className="lg:grid lg:max-w-5xl lg:mx-auto lg:grid-cols-2 flex flex-col gap-5 mt-4">
      <div>
        <Input
          handleChange={handleChange}
          id={"FirstName"}
          name={"FirstName"}
          error={errors?.FirstName}
          value={values?.FirstName}
          label={`${t("firstName")} *`}
          placeholder={t("enterFirstName")}
        />
      </div>
      <div>
        <Input
          handleChange={handleChange}
          id={"LastName"}
          name={"LastName"}
          error={errors?.LastName}
          value={values?.LastName}
          label={`${t("lastName")} `}
          placeholder={t("enterLastName")}
        />
      </div>
      <div>
        <Input
          handleChange={handleChange}
          id={"Phone"}
          name={"Phone"}
          error={errors?.Phone}
          value={values?.Phone}
          label={t("phoneNo")}
          placeholder={t("enterPhoneNo")}
        />
      </div>
      <div>
        <Input
          handleChange={handleChange}
          id={"Email"}
          name={"Email"}
          error={errors?.Email}
          value={values?.Email}
          label={t("emailId")}
          placeholder={t("enterEmailId")}
        />
      </div>
      {/* <div>
        <SelectBox
          error={errors?.Governorate}
          name={"Governorate"}
          value={values?.Governorate}
          label={t("governorate")}
          setFieldValue={setFieldValue}
          placeholder={t("enterGovernorate")}
          options={countries}
        />
      </div> */}
      <div>
        <SelectBox
          error={errors?.Area}
          value={values?.Area}
          setFieldValue={setFieldValue}
          name={"Area"}
          name2={"AreaName"}
          options={area}
          label={`${t("area")} *`}
          placeholder={t("enterArea")}
        />
      </div>
      <div>
        <Input
          handleChange={handleChange}
          id={"Block"}
          name={"Block"}
          error={errors?.Block}
          value={values?.Block}
          label={`${t("block")} *`}
          placeholder={t("enterBlock")}
        />
      </div>
      <div>
        <Input
          handleChange={handleChange}
          id={"Street"}
          name={"Street"}
          error={errors?.Street}
          value={values?.Street}
          label={`${t("street")} *`}
          placeholder={t("enterStreet")}
        />
      </div>
      <div>
        <Input
          handleChange={handleChange}
          id={"Avenue"}
          name={"Avenue"}
          error={errors?.Avenue}
          value={values?.Avenue}
          label={t("avenue")}
          placeholder={t("enterAvenue")}
        />
      </div>
      <div>
        <Input
          handleChange={handleChange}
          id={"HomeNumber"}
          name={"HomeNumber"}
          error={errors?.HomeNumber}
          value={values?.HomeNumber}
          label={t("homeNumber")}
          placeholder={t("enterHomeNumber")}
        />
      </div>
      <div>
        <Input
          handleChange={handleChange}
          id={"Floor"}
          name={"Floor"}
          error={errors?.Floor}
          value={values?.Floor}
          label={t("floor")}
          placeholder={t("enterFloor")}
        />
      </div>
      <div>
        <Input
          handleChange={handleChange}
          id={"Apartment"}
          name={"Apartment"}
          error={errors?.Apartment}
          value={values?.Apartment}
          label={t("apartment")}
          placeholder={t("enterApartment")}
        />
      </div>
      <div>
        <TextArea
          row={5}
          handleChange={handleChange}
          id={"Notes"}
          name={"Notes"}
          error={errors?.Notes}
          value={values?.Notes}
          label={t("notes")}
          placeholder={t("enterNotes")}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-[40%] lg:col-span-2 lg:mt-10 m-auto py-2 bg-primary rounded-full text-white font-bold"
      >
        {t("save")}
      </button>
    </form>
  );
}
