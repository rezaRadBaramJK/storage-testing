import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { updateQuantityofiteminCart } from "@/services/http/cart/updateQuantityofiteminCart";
import { toast } from "react-toastify";
import RemoveConfirmation from "@/components/Modal/RemoveConfirmation";
import { removeItemFromCart } from "@/services/http/cart/removeItemFromCart";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProductCard({
  data,
  setResendrequest,
  setResendCartItemsRequest,
}) {
  const router = useRouter();
  const { locale } = router;
  const t = useTranslations("index");
  const [ProductQuantity, setProductQuantity] = useState(data?.quantity);
  const [maxCount, setMaxCount] = useState(6);
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
      setShowDeletModal(false);
    } else {
      toast.error(response.errors, { position: "top-center" });
      setShowDeletModal(false);
    }
  };
  return (
    <div className="bg-productCard-bg rounded-[10px]">
      <div className="flex gap-2 p-2">
        <div className="w-[40%]">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className="w-[150px] h-[150px] rounded-[5px] transition-opacity opacity-0 duration-[.5s]"
            src={data?.picture?.image_url}
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
        </div>
        <div className="w-[60%] relative">
          <p className={`${locale === "en" ? "mr-10" : "ml-10"}  font-medium`}>
            {data?.product_name}
          </p>
          {data?.product_attributes
            ? data?.product_attributes?.slice(0, 3).map((item) => (
                <p
                  key={item?.product_attribute_id}
                  className="mt-2 text-[14px]"
                >
                  {item?.product_attribute_name} :{" "}
                  {item?.selected_value_names[0]}
                </p>
              ))
            : null}

          <button
            onClick={() => setShowDeletModal(true)}
            className={`${
              locale === "en" ? " right-0" : "left-0"
            } absolute top-0`}
          >
            <Trash2 className="w-6 fill-current text-[#F67373]" />
          </button>
        </div>
      </div>
      <div className="w-full bg-gray-Primary py-2 flex justify-between px-4 rounded-b-[10px]">
        <div className="w-full flex flex-col gap-2">
          <p className="font-bold text-[16px] text-center">
            {t("label-per-qty-price")}
          </p>
          <p className="text-center">{data?.unit_price}</p>
        </div>
        <div className="w-full flex justify-center items-center gap-3 border-x-[2px] border-[#0b0909] ">
          <button
            onClick={handleDeriement}
            className="bg-primary rounded-full  flex justify-center items-center"
          >
            <Minus className="stroke-current text-white w-[25px]" />
          </button>
          {quantityLoading ? (
            <div className=" flex justify-center items-center  ">
              {/* //TODO svg to jsx */}
              <Image
                width={25}
                height={25}
                src={"/assets/loading/infinitScroolLoading.svg"}
              />
            </div>
          ) : (
            <p className="text-main-color w-[25px] h-[25px] font-bold  text-center">
              {ProductQuantity}
            </p>
          )}
          <button
            onClick={handleincriement}
            className="bg-primary rounded-full  flex justify-center items-center"
          >
            <Plus className="stroke-current text-white w-[25px]" />
          </button>
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="font-bold text-[16px] text-center">{t("price")}</p>
          <p className="text-center">{data?.sub_total}</p>
        </div>
      </div>
      <RemoveConfirmation
        action={handleRemoveItem}
        setShowModal={setShowDeletModal}
        showModal={showDeleteModal}
        title={"Remove item?"}
        text={"Are you sure want to remove this item?"}
      />
    </div>
  );
}
