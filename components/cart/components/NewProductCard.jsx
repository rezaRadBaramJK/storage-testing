import React, { useContext, useState } from "react";
import Image from "next/image";
import { updateQuantityofiteminCart } from "@/services/http/cart/updateQuantityofiteminCart";
import { toast } from "react-toastify";
import RemoveConfirmation from "@/components/Modal/RemoveConfirmation";
import { removeItemFromCart } from "@/services/http/cart/removeItemFromCart";
import { useTranslations } from "next-intl";
import { Plus, Minus, Trash2 } from "lucide-react";
import BasketContext from "@/store/BasketContext";
import { basketDataLs } from "@/localStorage/auth";
export default function NewProductCard({
  data,
  setResendrequest,
  setResendCartItemsRequest,
  className,
}) {
  const basketCtx = useContext(BasketContext);

  const t = useTranslations("index");
  const [ProductQuantity, setProductQuantity] = useState(data?.quantity);
  const [maxCount, setMaxCount] = useState(600);
  const [quantityLoading, setQuantityLoading] = useState(false);
  const [showDeleteModal, setShowDeletModal] = useState(false);
  const handleDeriement = async () => {
    setQuantityLoading(true);
    if (ProductQuantity > 1) {
      const response = await updateQuantityofiteminCart(
        data?.id,
        ProductQuantity - 1
      );
      if (response.success) {
        setProductQuantity((prev) => prev - 1);

        setQuantityLoading(false);
        setResendrequest((prev) => !prev);
      } else {
        toast.error(response.errors, { position: "top-center" });
        setQuantityLoading(false);
      }
    } else {
      setShowDeletModal(true);
    }
  };
  const handleincriement = async () => {
    setQuantityLoading(true);
    if (ProductQuantity + 1 < maxCount) {
      const response = await updateQuantityofiteminCart(
        data?.id,
        ProductQuantity + 1
      );
      if (response.success) {
        setProductQuantity((prev) => prev + 1);

        setQuantityLoading(false);
        setResendrequest((prev) => !prev);
      } else {
        toast.error(response.errors, { position: "top-center" });
        setQuantityLoading(false);
      }
    }
  };
  const handleRemoveItem = async () => {
    const response = await removeItemFromCart(data?.id);
    if (response.success) {
      toast.success("item removed successfuly", { position: "top-center" });
      setResendrequest((prev) => !prev);
      setResendCartItemsRequest((prev) => !prev);

      basketDataLs.set(
        JSON.stringify(basketCtx.basketData.filter((b) => b.id !== data.id))
      );
      basketCtx.setBasket();
      setShowDeletModal(false);
    } else {
      toast.error(response.errors, { position: "top-center" });
      setShowDeletModal(false);
    }
  };

  return (
    <div className={`bg-productCard-bg rounded-[10px] ${className}`}>
      <div className="flex gap-2 p-2">
        <div className="w-[30%]">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className="w-[110px] h-[110px] rounded-[10px] transition-opacity opacity-0 duration-[.5s]"
            src={data?.picture?.image_url}
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
        </div>
        <div className="w-[70%] relative flex flex-col justify-between">
          <div>
            <p className={` font-medium text-[16px] mb-2`}>
              {data?.product_name}
            </p>
            <p className="text-[14px] text-primary text-end">
              {`${(
                parseFloat(data?.unit_price?.split(" ")[0]) * ProductQuantity
              ).toFixed(3)} ${data?.unit_price?.split(" ")[1]}`}
            </p>
            {data?.product_attributes
              ? data?.product_attributes?.slice(0, 3).map((item) => (
                  <p key={item?.product_attribute_id} className=" text-[13px]">
                    {item?.product_attribute_name} :{" "}
                    {item?.selected_value_names[0]}
                  </p>
                ))
              : null}
          </div>
          <div className="flex items-center justify-between w-full mt-3">
            <div className=" flex items-center justify-center gap-2">
              <button
                onClick={handleDeriement}
                className="bg-primary rounded-[5px]  flex justify-center items-center"
              >
                <Minus className=" text-white w-[25px]" />
              </button>
              {quantityLoading ? (
                <div className=" flex border-[1px] border-primary rounded-[5px]  w-[45px] justify-center items-center  ">
                  {/* //TODO svg to jsx */}
                  <Image
                    width={23}
                    height={25}
                    src={"/assets/loading/infinitScroolLoading.svg"}
                  />
                </div>
              ) : (
                <p className="text-primary w-[45px] border-[1px] border-primary rounded-[5px] h-[25px] font-bold  text-center">
                  {ProductQuantity}
                </p>
              )}
              <button
                onClick={handleincriement}
                className="bg-primary rounded-[5px]  flex justify-center items-center"
              >
                <Plus className=" text-white w-[25px]" />
              </button>
            </div>
            <button
              className="p-1 rounded-[5px]"
              onClick={() => setShowDeletModal(true)}
            >
              <Trash2 className="w-6 text-[#F67373]" />
            </button>
          </div>
        </div>
      </div>
      <RemoveConfirmation
        action={handleRemoveItem}
        setShowModal={setShowDeletModal}
        showModal={showDeleteModal}
        title={t("removeItemTitle")}
        text={t("removeItemConfirmation")}
      />
    </div>
  );
}
