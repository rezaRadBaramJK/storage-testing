import ModalBase from "@/components/Modal/ModalBase";
import React from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import NewProductCard from "@/components/cart/components/NewProductCard";
import EmptyFrame from "@/components/cart/components/EmptyFrame";
import NewProductCardInCartPageLoading from "@/components/Plaseholders/NewProductCardInCartPageLoading";
import { getShoppingCartData } from "@/services/http/cart/getCartData";
import { getbasketSummery } from "@/services/http/cart/getBasketSummery";

function useIsLg() {
  // Simple media query hook for lg screens
  const [isLg, setIsLg] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsLg(mq.matches);
    const handler = (e) => setIsLg(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isLg;
}

export default function ModalAddToCart({
  showModal,
  setShowModal,
  text,
  title,
}) {
  const router = useRouter();
  const t = useTranslations("index");
  const isLg = useIsLg();

  // Cart state for Sheet
  const [cartItems, setCartItems] = React.useState([]);
  const [subtotal, setSubTotal] = React.useState("");
  const [loadingCartPage, setLoadingCartPage] = React.useState(true);
  const [resendRequest, setResendrequest] = React.useState(false);
  const [resendCartItemsRequest, setResendCartItemsRequest] =
    React.useState(false);

  React.useEffect(() => {
    if (!showModal || !isLg) return;
    setLoadingCartPage(true);
    const cartData = async () => {
      const response = await getShoppingCartData();
      if (response?.success) {
        setCartItems(response?.data?.items);
        setLoadingCartPage(false);
      }
    };
    cartData();
  }, [showModal, isLg, resendCartItemsRequest]);

  React.useEffect(() => {
    if (!showModal || !isLg) return;
    const getPaymentData = async () => {
      const response = await getbasketSummery();
      if (response?.success) {
        setSubTotal(response?.data?.TotalsModel);
      }
    };
    getPaymentData();
  }, [showModal, isLg, resendRequest]);

  console.log("isLg:", isLg, "showModal:", showModal);

  // Sheet for lg screens
  if (showModal && isLg) {
    return (
      <div
        className="fixed inset-0 z-50 flex justify-end bg-black/30"
        onClick={() => setShowModal(false)}
      >
        <div
          className="relative w-full max-w-[430px] h-full bg-root-backgroung shadow-xl transition-transform duration-300 translate-x-0 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black"
            onClick={() => setShowModal(false)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="p-5 flex-1 flex flex-col gap-3 overflow-y-auto">
            {loadingCartPage ? (
              <>
                <NewProductCardInCartPageLoading />
                <NewProductCardInCartPageLoading />
                <NewProductCardInCartPageLoading />
              </>
            ) : cartItems?.length ? (
              cartItems?.map((item) => (
                <NewProductCard
                  setResendCartItemsRequest={setResendCartItemsRequest}
                  setResendrequest={setResendrequest}
                  key={item?.id}
                  data={item}
                />
              ))
            ) : (
              <EmptyFrame />
            )}
          </div>
          {/* Sheet action buttons */}
          <div className="p-5 border-t mt-auto">
            <button
              className="w-full flex items-center justify-center gap-2 bg-[#F3921B] text-white font-bold rounded-full py-4 text-lg mb-2 transition hover:bg-[#d87e13]"
              onClick={() => router.push("/checkout/addresses")}
            >
              {t("goToCheckout")}
              <span className="ml-2">→</span>
            </button>
            <button
              className="w-full text-center text-black mt-2 text-base hover:underline"
              onClick={() => router.push("/cart")}
            >
              {t("viewCart")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Modal for mobile
  return (
    <ModalBase show={showModal} setShow={setShowModal}>
      <div className="w-full lg:w-[430px] bg-root-backgroung">
        <div className="w-full m-auto">
          <div className="w-full bg-root-backgroung absolute bottom-0 p-5 rounded-t-[30px] max-h-[60dvh] overflow-y-scroll no-scrollbar">
            <p className="text-[20px] text-main-color font-bold mt-5 text-center">
              {title}
            </p>
            <p className="text-main-color text-[14px] mt-4 text-center">
              {text}
            </p>
            <div className="flex justify-end gap-5 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  router.push("/");
                }}
                className="p-2 border-[1px] w-[50%] text-[14px] text-primary border-primary py-2 px-3 rounded-[10px] font-bold"
              >
                {t("continueShopping")}
              </button>
              <button
                onClick={() => {
                  router.push("/cart");
                }}
                className="text-white text-[14px] bg-primary py-2 px-3 w-[50%] rounded-[10px] font-bold"
              >
                {t("goToCart")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
