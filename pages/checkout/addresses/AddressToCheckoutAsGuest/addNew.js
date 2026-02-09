import MainLayout from "@/layout/MainLayout";
import AddressesForGuestUser from "@/components/Forms/AddressesForGuestUser";
import React from "react";
import Header from "@/components/header";
import LgHeader from "@/components/header/lg-header";
export default function AddAddressToCheckoutAsGuest() {
  return (
    <MainLayout>
      <div className="hidden lg:flex ">
        <LgHeader />
      </div>
      <div className="lg:hidden">
        <Header title="Add Address To Submit Order" />
      </div>
      <div className="p-2 lg:min-h-screen">
        <AddressesForGuestUser fromEdit={false} />
      </div>
    </MainLayout>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../../../Internationaliz/${locale}.json`))
        .default,
    },
  };
}
