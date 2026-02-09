import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getOrderDetails } from "@/services/http/orders/getorderDetails";
import MainLayout from "@/layout/MainLayout";
import { WalletError, WalletTick } from "@/public/assets/jsxIcons";
import Header from "../../components/header";
import OrderStatusLoading from "../../components/Plaseholders/OrderStatusLoading";
import { useTranslations } from "next-intl";
import LgHeader from "../../components/header/lg-header";
export default function OrderStatus() {
  const router = useRouter();
  const { id } = router?.query;
  const [orderDetails, setOrderDetails] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("index");
  const onBack = () => router.replace("/");

  useEffect(() => {
    const Order = async () => {
      const response = await getOrderDetails(id);
      console.log(response);
      if (response?.data?.payment_method_status.toLowerCase() === "paid")
        setOrderDetails(response?.data);
      else setError(`Your order ${id} has been unsuccessful.`);
      setLoading(false);
    };
    if (id) Order();
  }, []);

  return (
    <MainLayout>
      <div className="hidden lg:flex ">
        <LgHeader />
      </div>
      {loading ? (
        <OrderStatusLoading />
      ) : (
        <div className="min-h-screen flex flex-col pb-[140px]">
          <div className="lg:hidden">
            <Header
              onClickBack={onBack}
              back={error ? true : false}
              title={error ? "Order Failed" : "Order Complete"}
            />
          </div>
          <div className="flex flex-col justify-between flex-1 pb-6">
            <div className="flex items-center justify-center flex-1 py-20">
              {error ? (
                <WalletError className="w-36 text-slate-400 fill-current" />
              ) : (
                <WalletTick className="text-primary w-36 fill-current" />
              )}
            </div>
            <div className="flex flex-col justify-center flex-1 gap-8 px-6">
              <div className="flex flex-col lg:justify-center lg:items-center gap-1 text-[#000]">
                <h2
                  className={`font-bold text-[28px] leading-[33px] ${
                    error ? "text-red-600" : ""
                  }`}
                >
                  {error ? t("orderFailed") : t("orderComplete")}
                </h2>
                <p className="text-xl leading-6">
                  {error ? t("orderError", { id }) : t("orderSuccess", { id })}
                </p>
              </div>
              <div className="w-72 flex flex-col items-center justify-center gap-4 m-auto">
                <Link href={`/orderDetails/${id}`} className="w-full">
                  <button
                    className={`rounded-[32px] w-full py-4 text-center text-white ${
                      error ? "bg-red-600" : "bg-primary"
                    }`}
                  >
                    {t("orderDetails")}
                  </button>
                </Link>
                <Link href="/" className="w-full">
                  <button className="py-4 w-full text-center text-primary bg-white border border-primary rounded-[32px]">
                    {t("goToHomePage")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../Internationaliz/${locale}.json`)).default,
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
