import React, { useContext } from "react";
import ModalBase from "./ModalBase";
import Image from "next/image";
import Link from "next/link";
import { reOrder } from "@/services/http/cart/reOrder";
import { toast } from "react-toastify";
import LoginContext from "@/store/AuthContext";
import { orderModal } from "@/localStorage/auth";
import { useTranslations } from "next-intl";
export default function OrderModal({ showModal, setShowModal, data }) {
  const authCtx = useContext(LoginContext);
  const t = useTranslations("index");
  const handlereOrder = async () => {
    const response = await reOrder(data?.id);
    if (response?.success) {
      toast.success("Order Items Added To Your Cart Successfully", {
        position: "top-center",
      });
      setShowModal(false);
      orderModal.set(true);
      authCtx.reOrderPopupSetter();
    } else {
      toast?.error(response?.errors, { position: "top-center" });
      orderModal.set(true);
      authCtx.reOrderPopupSetter();
    }
  };
  return (
    <ModalBase
      show={showModal}
      setShow={setShowModal}
      onCloseCallback={() =>{
        setShowModal(false);
        orderModal.set(true);
        authCtx.reOrderPopupSetter();
      }}
    >
      <div className=" w-full lg:w-[430px] bg-root-backgroung">
        <div className=" w-full  m-auto">
          <div className=" w-full bg-root-backgroung absolute bottom-0 p-5 rounded-t-[30px] max-h-[70dvh] overflow-hidden ">
            <div>
              <p className="text-14px text-root-text font-medium my-2">
                {t("orderStatus")} {data?.order_status}
              </p>
              <p className="text-14px text-root-text font-medium my-2">
                {t("orderDate")} {data?.created_on}
              </p>
              <div className="mt-5 max-h-[40dvh] overflow-y-scroll no-scrollbar">
                {data?.items?.map((item) => (
                  <div key={item?.id} className=" rounded-[10px]">
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
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <Link
                  className="text-[16px] border-b-[1px] border-black"
                  href={`/orderDetails/${data?.id}`}
                >
                  {t("orderDetails")}
                </Link>
                <div className="flex justify-between items-center font-bold">
                  <p>{t("total")} : </p>
                  <p>{data?.order_total}</p>
                </div>
              </div>
              <div className="flex flex-col gap-5 mt-4">
                <button
                  onClick={handlereOrder}
                  className="bg-primary text-white rounded-[10px] font-medium py-3"
                >
                  {t("reOrder")}
                </button>
                <button
                  onClick={() => {
                    orderModal.set(true);
                    authCtx.reOrderPopupSetter();
                    setShowModal(false);
                  }}
                  className="w-fit m-auto"
                >
                  {t("may-be-later")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
