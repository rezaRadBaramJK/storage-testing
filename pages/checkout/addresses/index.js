import MainLayout from "@/layout/MainLayout";
import { useState, useEffect, useContext } from "react";
import LoginContext from "@/store/AuthContext";
import Link from "next/link";
import OrderItemCard from "../../../components/checkout/addresses/OrderItemCard";
import ShippingCard from "../../../components/checkout/addresses/ShippingCard";
import AddressCardLoadingInCheckout from "@/components/Plaseholders/AddressCardLoadingInCheckout";
import ProductCardIncheckoutLoading from "@/components/Plaseholders/ProductCardIncheckoutLoading";
import ShippingMethodeCardLoading from "@/components/Plaseholders/ShippingMethodeCardLoading";
import { useRouter } from "next/router";
import { selectShippingMethode } from "@/services/http/checkout/SelectShippingMethode";
import CustomBottomDoc from "../../../components/checkout/addresses/CustomBottomDoc";
import { useTranslations } from "next-intl";
import NewAddressesCard from "../../../components/checkout/addresses/NewAddressesCard";
import { Plus } from "lucide-react";
import Header from "@/components/header";
import { toast } from "react-toastify";
import LgHeader from "@/components/header/lg-header";
import CartHeader from "@/components/cart/cart-header";
import { useCartQuery, useShippingMethodsQuery } from "@/queries/cart";
import { useAddressesQuery } from "@/queries/addresses";
import { SelectAddress } from "@/services/http/checkout/setAddresses";

export default function index() {
  const t = useTranslations("index");
  const router = useRouter();
  const authCtx = useContext(LoginContext);
  const [activeAddress, setActiveAddress] = useState(null);
  const [activeShippingMethod, setActiveShippingMethod] = useState(null);
  const cartQuery = useCartQuery();
  const addressesQuery = useAddressesQuery();
  const shippingMethodsQuery = useShippingMethodsQuery(false);

  const orderItems = cartQuery.data?.data?.items || [];
  const addresses = addressesQuery.data?.data?.addresses || [];
  const shippings =
    shippingMethodsQuery.data?.data?.model?.shipping_methods || [];

  useEffect(() => {
    if (activeAddress || addressesQuery.isLoading || !addresses.length) return;

    handleSelectNewAddress(addresses[0]);
  }, [addressesQuery.isLoading, activeAddress]);

  async function handleSelectNewAddress(address) {
    if (!address) return;
    const response = await SelectAddress(address?.id);

    if (response?.success) {
      setActiveAddress(address);
      const response = await shippingMethodsQuery.refetch();
      const data = response.data?.data?.model?.shipping_methods || [];

      if (!data.length) return;

      setActiveShippingMethod(data[0]);
    }
  }

  const handleCheckout = async () => {
    if (activeShippingMethod?.name) {
      const response = await selectShippingMethode(
        activeShippingMethod?.name,
        activeShippingMethod?.shipping_rate_computation_method_system_name
      );

      if (response?.success) {
        router.push("/checkout/payment");
      }
    } else {
      toast.error("Select Address And Shipping Methode", {
        position: "top-center",
      });
    }
  };

  return (
    <MainLayout>
      <div className="hidden lg:flex ">
        <LgHeader />
      </div>
      {/* Desktop layout */}
      <div className="lg:flex hidden flex-col py-4 gap-4">
        <CartHeader title={t("proceed_check_out")} />
        <div className="flex items-start relative pt-20 pb-10 justify-center w-full min-h-screen gap-6 flex-1">
          {/* Left column: Addresses and Shipping */}
          <div className="flex  sticky top-[9.5rem] flex-col basis-2/5 gap-4 p-4 border rounded-lg">
            <div className="flex flex-col gap-2">
              <p className="font-bold mb-2">{t("delivery_address")}</p>
              {addressesQuery.isLoading ? (
                <>
                  <AddressCardLoadingInCheckout />
                  <AddressCardLoadingInCheckout />
                  <AddressCardLoadingInCheckout />
                </>
              ) : (
                addresses?.map((item) => (
                  <NewAddressesCard
                    key={item?.id}
                    activeAddress={activeAddress}
                    setActiveAddress={handleSelectNewAddress}
                    data={item}
                  />
                ))
              )}

              <Link
                href={
                  authCtx?.isLogin
                    ? `/dashboard/addresses/addNew`
                    : `/checkout/addresses/AddressToCheckoutAsGuest/addNew`
                }
              >
                <div className="flex gap-3 mt-2">
                  <Plus className="w-6 text-primary" />
                  <p className="font-bold">{t("add_address")}</p>
                </div>
              </Link>
              <p className="font-bold my-2">{t("delivery")}</p>
              {shippingMethodsQuery.isFetching ? (
                <div className="flex flex-col gap-2">
                  <ShippingMethodeCardLoading />
                  <ShippingMethodeCardLoading />
                  <ShippingMethodeCardLoading />
                </div>
              ) : shippings?.length ? (
                shippings?.map((item) => (
                  <ShippingCard
                    key={item?.id}
                    activeShippingMethode={activeShippingMethod}
                    setActiveShippingMethode={setActiveShippingMethod}
                    data={item}
                  />
                ))
              ) : (
                <p>{t("add-address-first")}</p>
              )}
            </div>
          </div>
          {/* Right column: Order Items and Checkout */}
          <div className="flex flex-col basis-3/5 gap-4 p-4 border rounded-lg">
            <p className="font-bold mb-2">{t("order_summary")}</p>
            {cartQuery.isLoading ? (
              <>
                <ProductCardIncheckoutLoading />
                <ProductCardIncheckoutLoading />
              </>
            ) : (
              orderItems?.map((item) => (
                <OrderItemCard
                  className="bg-transparent"
                  key={item?.id}
                  data={item}
                />
              ))
            )}
            <button
              disabled={!activeShippingMethod?.name || !activeAddress?.id}
              onClick={handleCheckout}
              className="w-full py-3 bg-primary rounded-full  font-bold text-white disabled:bg-gray-300"
            >
              {t("proceed_check_out")}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile layout */}
      <div className="min-h-screen pb-[140px] lg:hidden">
        <Header title={t("proceed_check_out")} className="!top-0" />
        <div className="p-2 min-h-screen bg-root-backgroung">
          <div className="flex flex-col gap-2 mt-3">
            {shippingMethodsQuery.isLoading ? (
              <>
                <ProductCardIncheckoutLoading />
                <ProductCardIncheckoutLoading />
              </>
            ) : (
              orderItems?.map((item) => (
                <OrderItemCard key={item?.id} data={item} />
              ))
            )}
            <div>
              <div className="flex flex-col gap-2">
                {addressesQuery.isLoading ? (
                  <>
                    <AddressCardLoadingInCheckout />
                    <AddressCardLoadingInCheckout />
                    <AddressCardLoadingInCheckout />
                  </>
                ) : (
                  addresses?.map((item) => (
                    <NewAddressesCard
                      key={item?.id}
                      activeAddress={activeAddress}
                      setActiveAddress={handleSelectNewAddress}
                      data={item}
                    />
                  ))
                )}
                <Link
                  href={
                    authCtx?.isLogin
                      ? `/dashboard/addresses/addNew`
                      : `/checkout/addresses/AddressToCheckoutAsGuest/addNew`
                  }
                >
                  <div className="flex gap-3 mt-2">
                    <Plus className="w-6 text-primary" />
                    <p className="font-bold">{t("add_address")}</p>
                  </div>
                </Link>
              </div>
              <p className="font-bold my-2">{t("delivery")}</p>
              {shippingMethodsQuery.isFetching ? (
                <div className="flex flex-col gap-2">
                  <ShippingMethodeCardLoading />
                  <ShippingMethodeCardLoading />
                  <ShippingMethodeCardLoading />
                </div>
              ) : shippings?.length ? (
                shippings?.map((item) => (
                  <ShippingCard
                    key={item?.id}
                    activeShippingMethode={activeShippingMethod}
                    setActiveShippingMethode={setActiveShippingMethod}
                    data={item}
                  />
                ))
              ) : (
                <p>{t("add-address-first")}</p>
              )}
            </div>
          </div>
          <CustomBottomDoc
            handleCheckout={handleCheckout}
            activeAddress={activeAddress}
            activeShippingMethode={activeShippingMethod}
          />
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
