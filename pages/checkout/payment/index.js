import MainLayout from "@/layout/MainLayout";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getGateways } from "@/services/http/checkout/getGateways";
import { selectPaymentMethode } from "@/services/http/checkout/SelectpaymentMethode";
import { submitOrder } from "@/services/http/checkout/submitOrder";
import CustomBottomDoc from "../../../components/checkout/payment/CustomBottomDoc";
import GateWayModal from "../../../components/checkout/payment/GateWayModal";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import Header from "@/components/header";
import { basketDataLs } from "@/localStorage/auth";
import LgHeader from "@/components/header/lg-header";
import CartHeader from "@/components/cart/cart-header";
import { useCartPaymentSummaryQuery } from "@/queries/cart";
import { usePaymentMethodsQuery } from "@/queries/payment";
import { toast } from "react-toastify";

export default function index() {
  const router = useRouter();
  const { locale } = router;
  const t = useTranslations("index");
  const [activePaymentMethod, setActivePaymentMethod] = useState(null);
  const [onlineGateways, setonlineGateways] = useState([]);
  const [showGatewaysModal, setShowGatewaysModal] = useState(false);
  const [loadingGateway, setLoadingGateway] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const cartSummary = useCartPaymentSummaryQuery();
  const paymentMethodsQuery = usePaymentMethodsQuery();

  const summery = cartSummary.data?.data?.TotalsModel;
  const paymentMethods =
    paymentMethodsQuery.data?.data?.model?.payment_methods || [];

  useEffect(() => {
    if (activePaymentMethod || paymentMethodsQuery.isLoading) return;
    if (!paymentMethods.length) return;

    setActivePaymentMethod(paymentMethods[0]);
  }, [paymentMethodsQuery.isLoading, activePaymentMethod]);

  useEffect(() => {
    const gateways = async () => {
      setLoadingGateway(true);
      setShowGatewaysModal(true);
      const response = await getGateways();
      if (response?.success) {
        setonlineGateways(response?.data);
        setLoadingGateway(false);
      }
    };
    const PaymentMethode = async () => {
      const response = await selectPaymentMethode(
        activePaymentMethod?.payment_method_system_name
      );
      if (
        response?.success &&
        activePaymentMethod?.payment_method_system_name ===
          "Payments.MyFatoorah"
      ) {
        gateways();
      }
    };
    if (activePaymentMethod?.payment_method_system_name) {
      PaymentMethode();
    }
  }, [activePaymentMethod]);

  const handleSubbmitOrder = async () => {
    setRedirecting(true);
    const response = await submitOrder();
    if (response?.success) {
      basketDataLs.remove();

      if (
        activePaymentMethod?.payment_method_system_name ===
          "Payments.MyFatoorah" ||
        activePaymentMethod?.payment_method_system_name === "Baramjk.Core.KNet"
      ) {
        window.location.href = response?.data?.url;
      } else {
        router.push(`/orderDetails/${response?.data?.id}`);
      }
    } else {
      toast.error(response?.errors, { position: "top-center" });
      setRedirecting(false);
    }
  };

  const handlePayment = async () => {
    const response = await selectPaymentMethode(
      activePaymentMethod?.payment_method_system_name
    );
    if (response?.success) {
      handleSubbmitOrder();
    }
  };

  return (
    <MainLayout>
      <div className="hidden lg:flex ">
        <LgHeader />
      </div>
      <div className="min-h-screen lg:flex lg:flex-col w-full lg:pt-20 lg:bg-root-backgroung pb-[140px] relative">
        {redirecting && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className=" px-6 py-4 ">
              <Image
                width={55}
                height={55}
                src={"/assets/loading/infinitScroolLoading.svg"}
              />
            </div>
          </div>
        )}
        <div className="lg:hidden">
          <Header title={t("payment")} />
        </div>
        <div className="hidden pb-4 lg:flex justify-center items-center w-full">
          <CartHeader title={t("payment")} />
        </div>
        <div className="p-4 lg:max-w-[600px] lg:border lg:w-full lg:rounded-[10px] lg:mx-auto lg:bg-transparent bg-root-backgroung flex flex-col justify-between">
          <div>
            <p className="font-bold mt-3">{t("order_summary")}</p>
            <div className="flex flex-col gap-5 mt-5">
              <div className="flex justify-between border-b-[1px] border-black py-2">
                <p>{t("sub_total")}</p>
                <p>{summery?.SubTotal}</p>
              </div>
              <div className="flex justify-between border-b-[1px] border-black py-2">
                <p>{t("delivery")}</p>
                <p>{summery?.Shipping}</p>
              </div>
              <div className="flex justify-between border-b-[1px] border-black py-2">
                <p>{t("discount")}</p>
                <p>{summery?.OrderTotalDiscount}</p>
              </div>
              <div className="flex justify-between pb-3">
                <p>{t("total")}</p>
                <p>{summery?.OrderTotal}</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col justify-center items-center gap-10">
              {paymentMethods?.map((item) => (
                <div
                  key={item.name}
                  onClick={() => setActivePaymentMethod(item)}
                  className={` border-[1px] w-full flex items-center rounded-[15px] gap-5 cursor-pointer `}
                >
                  <div
                    className={`${
                      activePaymentMethod?.name === item?.name
                        ? "bg-primary"
                        : "bg-gray-Primary "
                    } w-[20px] ${
                      locale === "en" ? "rounded-l-[15px]" : "rounded-r-[15px]"
                    } h-[60px]`}
                  ></div>
                  <Image
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-[80px] h-[60px] rounded-[5px] p-2 transition-opacity opacity-0 duration-[.5s]"
                    src={item?.logo_url}
                    onLoadingComplete={(image) =>
                      image.classList.remove("opacity-0")
                    }
                  />
                  <p>{item?.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:hidden">
            <CustomBottomDoc handlePayment={handlePayment} />
          </div>
          <GateWayModal
            loadingGateway={loadingGateway}
            handleSubbmitOrder={handleSubbmitOrder}
            onlineGateways={onlineGateways}
            setShowGatewaysModal={setShowGatewaysModal}
            showGatewaysModal={showGatewaysModal}
          />
        </div>
        <div className="hidden lg:flex justify-center items-center pt-10 w-full">
          <div className="flex justify-center items-center w-full max-w-[600px] mx-auto">
            <button
              onClick={handlePayment}
              className="w-full py-3 bg-primary rounded-full  font-bold text-white"
            >
              {t("payment")}
            </button>
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
