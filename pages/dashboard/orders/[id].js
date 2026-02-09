import MainLayout from "@/layout/MainLayout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { getOrderDetails } from "@/services/http/orders/getorderDetails";
import CustoomBottomDoc from "../../../components/dashboard/orders/CustomBottomDoc";
import Header from "@/components/header";
import { useTranslations } from "next-intl";
import LgHeader from "@/components/header/lg-header";

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router?.query;
  const [orderDetails, setOrderDetails] = useState({});
  const t = useTranslations("index");

  useEffect(() => {
    const Order = async () => {
      const response = await getOrderDetails(id);
      if (response?.success) {
        setOrderDetails(response?.data);
      }
    };
    if (id) Order();
  }, [router]);

  return (
    <MainLayout>
      <div className="min-h-screen pb-[80px]">
        <div className="lg:hidden">
          <Header title={t("order_details")} />
        </div>
        <div className="hidden lg:flex ">
          <LgHeader />
        </div>
        <div className="flex flex-col items-center justify-center gap-3 p-2">
          <div className="flex flex-col justify-center gap-2 mt-5 text-center">
            <p className="text-14px text-root-text">
              {t("order_status")}: {orderDetails?.order_status}
            </p>
            <p className="text-14px text-root-text">
              {t("orderDate")}: {orderDetails?.created_on}
            </p>
          </div>
          <div className="bg-productCard-bg flex flex-col gap-5 rounded-[10px] p-3 w-full">
            <div>
              <p className="text-14px text-root-text font-bold">
                {t("shippingMethod")}
              </p>
              <p className="text-14px text-root-text">
                {orderDetails?.shipping_method}
              </p>
            </div>
            <div>
              <p className="text-14px text-root-text font-bold">
                {t("payment_method")}
              </p>
              <p className="text-14px text-root-text">
                {orderDetails?.payment_method}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {orderDetails?.items?.map((item) => (
              <div key={item?.id} className="bg-productCard-bg rounded-[10px]">
                <div className="flex gap-2 p-2">
                  <div className="w-[40%]">
                    <Image
                      width={360}
                      height={150}
                      src={item?.picture?.ImageUrl}
                    />
                  </div>
                  <div className="w-[60%] relative">
                    <p>{item?.product_name}</p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.attribute_info,
                      }}
                      className="mt-2"
                    ></p>
                  </div>
                </div>
                <div className="w-full bg-gray-Primary py-2 px-4 flex justify-between rounded-b-[10px]">
                  <div className="flex items-center w-full gap-2">
                    <p className="font-bold text-[16px] text-center">
                      {t("qty")}: {item?.quantity}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-end w-full gap-2">
                    <div className="flex justify-end w-full gap-2">
                      <p className="font-bold text-[16px]">{t("price")}:</p>
                      <p>{item?.unit_price}</p>
                    </div>
                    <div className="flex justify-end w-full gap-2">
                      <p className="font-bold text-[16px]">{t("total")}:</p>
                      <p>{item?.sub_total}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-productCard-bg flex flex-col gap-5 rounded-[10px] p-3 w-full">
            <div className="flex items-center justify-between font-bold">
              <p>{t("subtotal")}:</p>
              <p>{orderDetails?.order_subtotal}</p>
            </div>
            <div className="flex items-center justify-between font-bold">
              <p>{t("basic_delivery")}:</p>
              <p>{orderDetails?.order_shipping}</p>
            </div>
            <div className="flex items-center justify-between font-bold">
              <p>{t("discount")}:</p>
              <p>{orderDetails?.order_sub_total_discount}</p>
            </div>
            <div className="flex items-center justify-between font-bold">
              <p>{t("total")}:</p>
              <p>{orderDetails?.order_total}</p>
            </div>
          </div>
          <div className="w-full  justify-center items-center gap-2 hidden lg:flex">
            <button className="bg-primary w-full py-3 font-bold text-white rounded-full max-w-[400px]">
              {t("re_order")}
            </button>
          </div>
          <div className="lg:hidden">
            <CustoomBottomDoc>
              <button className="bg-primary w-full py-3 font-bold text-white rounded-full">
                {t("re_order")}
              </button>
            </CustoomBottomDoc>
          </div>
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
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
