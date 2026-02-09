import SelectBox from "../Inputs/SelectBox";
import Input from "../Inputs/Input";
import CustoomBottomDoc from "@/components/dashboard/addresses/CustoomBottomDoc";
import { useTranslations } from "next-intl";
import TextArea from "../Inputs/TextArea";
import { useAreasQuery, useCountriesQuery } from "@/queries/addresses";

export default function AddressWithTypeOffice({ formik, pending }) {
  const t = useTranslations("index");
  const { countries } = useCountriesQuery();
  const { areas } = useAreasQuery();

  const { handleChange, values, setFieldValue, handleSubmit, errors } =
    formik || {};

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4 relative"
    >
      <div>
        <SelectBox
          error={errors?.Governorate}
          name={"Governorate"}
          value={values?.Governorate}
          label={`${t("governate")}*`}
          placeholder={t("select_governate")}
          setFieldValue={setFieldValue}
          options={countries}
        />
      </div>
      <div>
        <SelectBox
          error={errors?.Area}
          value={values?.Area}
          setFieldValue={setFieldValue}
          name={"Area"}
          name2={"AreaName"}
          options={areas}
          label={`${t("area")}*`}
          placeholder={t("select_area")}
        />
      </div>
      <div>
        <Input
          handleChange={handleChange}
          id={"Block"}
          name={"Block"}
          error={errors?.Block}
          value={values?.Block}
          label={`${t("block")}*`}
          placeholder={`${t("enter")} ${t("block")}`}
        />
      </div>
      <div>
        <Input
          handleChange={handleChange}
          id={"Street"}
          name={"Street"}
          error={errors?.Street}
          value={values?.Street}
          label={`${t("street")}*`}
          placeholder={`${t("enter")} ${t("street")}`}
        />
      </div>
      <div>
        <Input
          handleChange={handleChange}
          id={"Avenue"}
          name={"Avenue"}
          error={errors?.Avenue}
          value={values?.Avenue}
          label={`${t("Avenue")} ${t("optional")}`}
          placeholder={`${t("enter")} ${t("Avenue")} `}
        />
      </div>
      <div>
        <Input
          handleChange={handleChange}
          id={"OfficeNumber"}
          name={"OfficeNumber"}
          error={errors?.OfficeNumber}
          value={values?.OfficeNumber}
          label={`${t("office_number")}*`}
          placeholder={`${t("enter")} ${t("office_number")}`}
        />
      </div>
      <div>
        <Input
          handleChange={handleChange}
          id={"Floor"}
          name={"Floor"}
          error={errors?.Floor}
          value={values?.Floor}
          label={`${t("floor")} ${t("optional")}`}
          placeholder={`${t("enter")} ${t("floor")} `}
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
          label={`${t("notes")} ${t("optional")}`}
          placeholder={`${t("enter")} ${t("notes")} `}
        />
      </div>
      <div className="lg:hidden">
        <CustoomBottomDoc>
          <button
            onClick={handleSubmit}
            className="bg-primary w-full py-3 m-auto font-bold text-white rounded-full"
          >
            {t("save")}
          </button>
        </CustoomBottomDoc>
      </div>

      <div className="w-full lg:flex hidden justify-center items-center absolute lg:static bottom-[-100px] left-0 right-0 lg:pb-4 lg:pt-8">
        <button
          onClick={handleSubmit}
          className="bg-primary w-full py-3 m-auto font-bold text-white rounded-full max-w-[400px]"
          disabled={pending}
        >
          {t("save")}
        </button>
      </div>
    </form>
  );
}
