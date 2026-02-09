import MainLayout from "@/layout/MainLayout";
import React, { useState, useEffect } from "react";
import OrderCard from "@/components/dashboard/orders/OrderCard";
import { getordersList } from "@/services/http/orders/getorders";
import OrdercardLoading from "@/components/Plaseholders/OrdercardLoading";
import { useTranslations } from "next-intl";
import Header from "@/components/header";
import LgHeader from "@/components/header/lg-header";
import EmptyFrame from "@/components/dashboard/orders/EmptyFrame";
export default function index() {
  const t = useTranslations("index");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const orders = async () => {
      const response = await getordersList(1);
      if (response?.success) {
        console.log(orders);
        setOrders(response?.data?.orders);
        setLoading(false);
      }
    };
    orders();
  }, []);
  return (
    <MainLayout>
      <div className="bg-root-backgroung min-h-screen ">
        <div className="lg:hidden">
          <Header title={t("orders")} />
        </div>
        <div className="hidden lg:flex ">
          <LgHeader />
        </div>
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <>
              <OrdercardLoading />
              <OrdercardLoading />
              <OrdercardLoading />
              <OrdercardLoading />
            </>
          ) : (
            orders?.map((item) => <OrderCard data={item} />)
          )}
        </div>
        <div className="flex justify-center items-center h-screen">
          {orders.length > 0 ? null : <EmptyFrame />}
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
