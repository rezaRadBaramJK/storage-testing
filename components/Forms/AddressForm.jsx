import { useFormik } from "formik";
import AddressWithTypeHomeForm from "./AddressWithTypeHomeForm";
import AddressWithTypeOffice from "./AddressWithTypeOffice";
import AddressWithTypeOtherForm from "./AddressWithTypeOtherForm";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { editAddressForm } from "@/services/http/addresses/editAddress";
import {
  useAddressesQuery,
  useAreasQuery,
  useCountriesQuery,
} from "@/queries/addresses";
import { addNewAddresses } from "@/services/http/addresses/AddNewAddress";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useLocationPickerContext } from "../LocationPicker/context";

export const ADDRESS_TYPES = {
  HOME: "Home",
  OFFICE: "Office",
  OTHER: "other",
};

export default function AddressForm({ type, data, fromEdit, id }) {
  const isHome = type === ADDRESS_TYPES.HOME;
  const isOffice = type === ADDRESS_TYPES.OFFICE;
  const isOther = type === ADDRESS_TYPES.OTHER;

  const t = useTranslations("index");
  const addressesQuery = useAddressesQuery();
  const router = useRouter();
  const { address, position } = useLocationPickerContext();
  const [pending, setPending] = useState(false);
  const { countries } = useCountriesQuery();

  const inputValidation = Yup.object().shape({
    Governorate: Yup.string().required(t("governorate_required")),
    Area: Yup.string().required(t("area_required")),
    Block: Yup.string().required(t("block_required")),
    Street: Yup.string().required(t("street_required")),
    Avenue: Yup.string(),
    HomeNumber: isHome
      ? Yup.string().required(t("home_number_required"))
      : undefined,
    Floor: Yup.string(),
    Apartment: Yup.string(),
    AreaName: Yup.string(),
    OfficeNumber: isOffice
      ? Yup.string().required(t("office_number_required"))
      : undefined,
    FullAddress: isOther
      ? Yup.string().required(t("full_address_required"))
      : undefined,
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: inputValidation,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
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
      Floor: data?.custom_address_attributes?.filter(
        (item) => item?.id === 3
      )[0]?.default_value,
      Notes: data?.custom_address_attributes?.filter(
        (item) => item?.id === 6
      )[0]?.default_value,
      HomeNumber: data?.custom_address_attributes?.filter(
        (item) => item?.id === 2
      )[0]?.default_value,
      Apartment: data?.custom_address_attributes?.filter(
        (item) => item?.id === 4
      )[0]?.default_value,
      OfficeNumber: data?.custom_address_attributes?.filter(
        (item) => item?.id === 5
      )[0]?.default_value,
      // FullAddress: data?.address1 ? data?.address1 : "",
    },
    onSubmit: async (value) => {
      const dataForThisApi = {
        model: {
          address: {
            country_id: value?.Governorate,
            state_province_id: value?.Area,
            city: value.AreaName,
            address1: value?.FullAddress,
          },
        },
        form: {
          address_attribute_1: type,
          address_attribute_7: value?.Block,
          address_attribute_8: value?.Street,
          address_attribute_10: value?.Avenue,
          address_attribute_3: value?.Floor,
          address_attribute_6: value?.Notes,
          address_attribute_2: value?.HomeNumber,
          address_attribute_5: value?.OfficeNumber,
          address_attribute_4: value?.Apartment,
          address_attribute_20: position?.lat,
          address_attribute_21: position?.lng,
        },
      };

      setPending(true);

      if (fromEdit) {
        const response = await editAddressForm(dataForThisApi, id);

        if (response?.success) {
          await addressesQuery.refetch();
          toast.success(t("address_updated_successfully"), {
            position: "top-center",
          });

          if (window.history.length > 2) {
            router.back();
          } else {
            router.push("/dashboard/addresses");
          }
        }
      } else {
        const response = await addNewAddresses(dataForThisApi);

        if (response?.success) {
          await addressesQuery.refetch();
          toast.success(t("address_added_successfully"), {
            position: "top-center",
          });

          if (window.history.length > 2) {
            router.back();
          } else {
            router.push("/dashboard/addresses");
          }
        }
      }

      setPending(false);
    },
  });
  const { setFieldValue, values } = formik;
  const { areas } = useAreasQuery(values.Governorate);

  useEffect(() => {
    if (!position || address === null) return;

    const selectedArea = areas.find(
      (a) =>
        a?.label?.toLocaleLowerCase()?.indexOf(address?.area?.toLowerCase()) !==
        -1
    );
    const selectedCountry = countries.find(
      (a) =>
        a?.label
          ?.toLocaleLowerCase()
          ?.indexOf(address?.country?.toLowerCase()) !== -1
    );

    setFieldValue("Governorate", selectedCountry?.value);
    setFieldValue("Area", selectedArea?.value || "");
    setFieldValue("AreaName", selectedArea?.label || "");
    setFieldValue("Street", address.street);
    setFieldValue("Block", address.block);
  }, [address, position]);

  useEffect(() => {
    console.log("Formik Errors:", formik.errors);
  }, [formik.errors]);

  switch (type) {
    case ADDRESS_TYPES.HOME:
      return <AddressWithTypeHomeForm formik={formik} pending={pending} />;

    case ADDRESS_TYPES.OFFICE:
      return <AddressWithTypeOffice formik={formik} pending={pending} />;

    case ADDRESS_TYPES.OTHER:
      return <AddressWithTypeOtherForm formik={formik} pending={pending} />;

    default:
      return null;
  }
}
