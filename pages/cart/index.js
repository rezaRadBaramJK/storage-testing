import MainLayout from "@/layout/MainLayout";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Header from "@/components/header";
import DiscountCode from "@/components/cart/components/DiscountCode";
import NewProductCardInCartPageLoading from "@/components/Plaseholders/NewProductCardInCartPageLoading";
import LoginContext from "@/store/AuthContext";
import EmptyFrame from "@/components/cart/components/EmptyFrame";
import { useTranslations } from "next-intl";
import NewProductCard from "@/components/cart/components/NewProductCard";
import NewCustomBottomDoc from "@/components/cart/components/NewCustomBottomDoc";
import LgHeader from "@/components/header/lg-header";
import CartHeader from "@/components/cart/cart-header";
import { useCartPaymentSummaryQuery, useCartQuery } from "@/queries/cart";

export default function index() {
  const t = useTranslations("index");
  const router = useRouter();
  const authCtx = useContext(LoginContext);

  const cartQuery = useCartQuery();
  const cartSummaryQuery = useCartPaymentSummaryQuery();

  const cartItems = cartQuery.data?.data?.items || [];
  const subTotal = cartSummaryQuery.data?.data?.TotalsModel;

  const handleChangeRouteBasedOnUserAuthStatus = () => {
    if (authCtx?.isLogin) {
      router.push("/checkout/addresses");
    } else {
      router.push("/auth/login?fromCheckout=true");
    }
  };

  if (cartQuery.isLoading) {
    return (
      <MainLayout>
        <div className="hidden lg:flex ">
          <LgHeader />
        </div>
        <div className="flex flex-col basis-3/5 gap-4 p-4 rounded-lg min-h-screen">
          <NewProductCardInCartPageLoading />
          <NewProductCardInCartPageLoading />
          <NewProductCardInCartPageLoading />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="hidden lg:flex ">
        <LgHeader />
      </div>

      {cartItems?.length ? (
        <div className="lg:flex hidden flex-col py-4 gap-4">
          <CartHeader title={t("basket")} />

          <div className="flex items-start relative justify-center w-full min-h-screen gap-6 flex-1">
            <div className="flex flex-col basis-3/5 gap-4 p-4 border rounded-lg">
              {cartItems?.length &&
                cartItems?.map((item) => (
                  <NewProductCard
                    className="bg-transparent"
                    setResendCartItemsRequest={cartQuery.refetch}
                    setResendrequest={cartSummaryQuery.refetch}
                    key={item?.id}
                    data={item}
                  />
                ))}
            </div>

            <div className="flex sticky top-[9.5rem] flex-col basis-2/5 gap-4 p-4 border rounded-lg">
              {cartItems?.length && !cartQuery.isLoading ? (
                <>
                  <div className="p-4 flex flex-col gap-3 rounded-[10px] mt-4">
                    <div className="flex justify-between">
                      <p className="font-bold ">{t("discount")} :</p>
                      <p className="text-red-500">
                        {subTotal?.SubTotalDiscount}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold ">{t("sub_total")} :</p>
                      <p>{subTotal?.SubTotal}</p>
                    </div>
                  </div>
                  <DiscountCode setResendrequest={cartSummaryQuery.refetch} />
                  <button
                    onClick={handleChangeRouteBasedOnUserAuthStatus}
                    className="mt-6 py-4 w-full bg-primary text-white font-bold rounded-full text-lg flex items-center justify-center gap-2"
                  >
                    {t("proceed_check_out")}
                    <span className="ml-2">→</span>
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:flex hidden h-screen w-full justify-center items-center">
          <EmptyFrame />
        </div>
      )}

      <div className="pb-[160px] lg:hidden bg-root-backgroung">
        <Header title={t("basket")}  className="!top-0"/>
        <div className="p-2 flex flex-col gap-3">
          {cartItems?.length ? (
            cartItems?.map((item) => (
              <NewProductCard
                setResendCartItemsRequest={cartQuery.refetch}
                setResendrequest={cartSummaryQuery.refetch}
                key={item?.id}
                data={item}
              />
            ))
          ) : (
            <EmptyFrame />
          )}

          {cartItems?.length ? (
            <DiscountCode setResendrequest={cartSummaryQuery.refetch} />
          ) : null}
        </div>

        <NewCustomBottomDoc
          cartItems={cartItems}
          subTotal={subTotal?.SubTotal}
          handleChangeRouteBasedOnUserAuthStatus={
            handleChangeRouteBasedOnUserAuthStatus
          }
        />
      </div>
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
