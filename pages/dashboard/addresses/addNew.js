import MainLayout from "@/layout/MainLayout";
import { useState } from "react";
import AddressTypeCards from "../../../components/dashboard/addresses/AddressTypeCards";
import { useTranslations } from "next-intl";
import Header from "@/components/header";
import LgHeader from "@/components/header/lg-header";
import AddressPickerOnMap from "../../../components/dashboard/addresses/AddressPickerOnMap";
import LocationPickerProvider from "@/components/LocationPicker/context";
import AddressForm, { ADDRESS_TYPES } from "@/components/Forms/AddressForm";
import { getAddressTypes } from "./[id]";
import LocationDetector from "@/components/dashboard/addresses/LocationDetector";

export default function AddNew() {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const t = useTranslations("index");
  const addressTypes = getAddressTypes(t) || [];
  const [activeAddressTypeId, setActiveAddressTypeId] = useState(
    addressTypes[0].id
  );

  function onLocationAccess (lat, lng){
    setLat(lat);
    setLng(lng);
  }

  return (
    <MainLayout>
      <LocationDetector onLocationAccess={onLocationAccess}/>
      <div className="min-h-screen pb-[218px]">
        <div className="lg:hidden">
          <Header title={t("add_address")} />
        </div>
        <div className="hidden lg:flex sticky top-14 z-[100]">
          <LgHeader />
        </div>
        <div className="p-2 bg-root-backgroung lg;mt-10">
          <AddressTypeCards
            activeAddressTypeId={activeAddressTypeId}
            addressTypes={addressTypes}
            setActiveAddressTypeId={setActiveAddressTypeId}
          />

          <LocationPickerProvider>
            <AddressPickerOnMap lat={lat ?? undefined} lng={lng ?? undefined}/>

            <AddressForm
              type={
                activeAddressTypeId === 1
                  ? ADDRESS_TYPES.HOME
                  : activeAddressTypeId === 2
                  ? ADDRESS_TYPES.OFFICE
                  : ADDRESS_TYPES.OTHER
              }
            />
          </LocationPickerProvider>
        </div>
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
  };
}
