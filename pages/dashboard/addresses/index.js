import MainLayout from "@/layout/MainLayout";
import React from "react";
import Addresscard from "../../../components/dashboard/addresses/Addresscard";
import Link from "next/link";
import AddressCardLoading from "@/components/Plaseholders/AddressCardLoading";
import CustoomBottomDoc from "../../../components/dashboard/addresses/CustoomBottomDoc";
import Header from "@/components/header";
import { useTranslations } from "next-intl";
import EmptyFrame from "../../../components/dashboard/addresses/EmptyFrame";
import LgHeader from "@/components/header/lg-header";
import { useAddressesQuery } from "@/queries/addresses";
export default function index() {
  const t = useTranslations("index");

  const addressesQuery = useAddressesQuery();
  const addressList = addressesQuery.data?.data?.addresses;

  return (
    <MainLayout>
      <div className="bg-root-backgroung min-h-screen pb-[85px] flex flex-col">
        <div className="lg:hidden">
          <Header title={t("addresses")} />
        </div>
        <div className="hidden lg:flex ">
          <LgHeader />
        </div>
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {addressesQuery.isLoading ? (
            <>
              <AddressCardLoading />
              <AddressCardLoading />
              <AddressCardLoading />
            </>
          ) : addressList?.length > 0 ? (
            addressList?.map((item) => (
              <Addresscard
                setResendRequest={addressesQuery.refetch}
                key={item?.id}
                data={item}
              />
            ))
          ) : (
            <div className="lg:hidden">
              <EmptyFrame />
            </div>
          )}

          <div className="lg:hidden">
            <CustoomBottomDoc>
              <button className="w-full py-3 text-white bg-primary rounded-full m-auto">
                <Link
                  className="w-full h-full "
                  href={"/dashboard/addresses/addNew"}
                >
                  {t("add_address")}
                </Link>
              </button>
            </CustoomBottomDoc>
          </div>
        </div>
        {!addressesQuery.isLoading && (
          <div className="hidden w-full lg:flex flex-col gap-4  justify-center items-center h-full flex-1">
            {addressList?.length > 0 ? null : <EmptyFrame className="h-auto" />}
            <button className="w-full py-3 text-white bg-primary rounded-full mx-auto max-w-[430px]">
              <Link
                className="w-full h-full "
                href={"/dashboard/addresses/addNew"}
              >
                {t("add_address")}
              </Link>
            </button>
          </div>
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
  };
}
