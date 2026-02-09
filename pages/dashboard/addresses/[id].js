import MainLayout from "@/layout/MainLayout";
import { useRouter } from "next/router";
import AddressTypeCards from "../../../components/dashboard/addresses/AddressTypeCards";
import { useTranslations } from "next-intl";
import {
  AddresshomeActive,
  AddresshomedeActive,
  AddressofficeActive,
  AddressofficedeActive,
  AddressotherdeActive,
  AddressothersActive,
} from "@/public/assets/jsxIcons";
import Header from "@/components/header";
import LgHeader from "@/components/header/lg-header";
import AddressForm, { ADDRESS_TYPES } from "@/components/Forms/AddressForm";
import AddressPickerOnMap from "../../../components/dashboard/addresses/AddressPickerOnMap";
import LocationPickerProvider from "@/components/LocationPicker/context";
import { useDetailAddressQuery } from "@/queries/addresses";

export const getAddressTypes = (t) => [
  {
    id: 1,
    type: ADDRESS_TYPES.HOME,
    name: t("home"),
    icon: (
      <AddresshomedeActive className="w-10 stroke-current text-[#6a6a6a]" />
    ),
    activeIcon: (
      <AddresshomeActive className="w-10 fill-current text-primary" />
    ),
  },
  {
    id: 2,
    type: ADDRESS_TYPES.OFFICE,
    name: "Office",
    icon: (
      <AddressofficedeActive className="w-10 stroke-current text-[#6a6a6a]" />
    ),
    activeIcon: (
      <AddressofficeActive className="w-10 fill-current text-primary" />
    ),
  },
  {
    id: 3,
    type: ADDRESS_TYPES.OTHER,
    name: "Other",
    icon: <AddressotherdeActive className="w-10 fill-current text-[#6a6a6a]" />,
    activeIcon: (
      <AddressothersActive className="w-10 fill-current text-primary" />
    ),
  },
];

export default function AddressEdit() {
  const router = useRouter();
  const t = useTranslations("index");
  const addressTypes = getAddressTypes(t);
  const { id } = router?.query;

  const detailAddressQuery = useDetailAddressQuery(id);
  const data = detailAddressQuery.data?.data?.address;
  const attrs = data?.custom_address_attributes || [];
  const lat = attrs.find((attr) => attr?.id === 20)?.default_value;
  const lng = attrs.find((attr) => attr?.id === 21)?.default_value;
  const addressTypeAttr = attrs?.find((item) => item?.id === 4)?.default_value;

  const activeAddressType = addressTypes.find(
    (a) => a.type === addressTypeAttr
  );
  const activeAddressTypeId = activeAddressType?.id;

  return (
    <MainLayout>
      <div className="lg:hidden">
        <Header title={t("add_address")} />
      </div>
      <div className="hidden lg:flex ">
        <LgHeader />
      </div>

      <div className="p-2 bg-root-backgroung min-h-screen">
        <AddressTypeCards
          fromEdit={true}
          activeAddressTypeId={activeAddressTypeId}
          addressTypes={addressTypes}
        />

        {!detailAddressQuery.isLoading && (
          <LocationPickerProvider>
            <AddressPickerOnMap lat={lat} lng={lng} />

            <AddressForm
              type={
                activeAddressTypeId === 1
                  ? ADDRESS_TYPES.HOME
                  : activeAddressTypeId === 2
                  ? ADDRESS_TYPES.OFFICE
                  : ADDRESS_TYPES.OTHER
              }
              fromEdit={true}
              data={data}
              id={id}
            />
          </LocationPickerProvider>
        )}
      </div>
    </MainLayout>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../../Internationaliz/${locale}.json`))
        .default,
    },
    revalidate: 1,
  };
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
