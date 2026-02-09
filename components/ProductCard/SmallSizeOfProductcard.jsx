import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import BasketContext from "@/store/BasketContext";
import { basketDataLs } from "@/localStorage/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import { updateQuantityofiteminCart } from "@/services/http/cart/updateQuantityofiteminCart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { additemWithAttributeToCart } from "@/services/http/cart/addItemWithAttributetocart";
import { useTranslations } from "use-intl";

export default function SmallSizeOfProductcard({ data }) {
  const basketCtx = useContext(BasketContext);
  const [att, setAtt] = useState({});
  const t = useTranslations("index");
  const [quantityLoading, setQuantityLoading] = useState(false);
  const [countOfProduct, setCountOfProduct] = useState(
    basketCtx?.basketData?.filter(
      (basketItem) => basketItem?.product_id === data?.Id
    )[0]?.quantity
      ? basketCtx?.basketData?.filter(
          (basketItem) => basketItem?.product_id === data?.Id
        )[0]?.quantity
      : 0
  );
  const handleItemAddToCart = async () => {
    if (data?.HasRequiredAttribute) {
      toast.error("this product has required attribute", {
        position: "top-center",
      });
      return;
    }

    setQuantityLoading(true);
    const response = await additemWithAttributeToCart(data?.Id, 1, att);
    if (response?.success) {
      basketDataLs.set(JSON.stringify(response?.data?.model?.items));
      basketCtx.setBasket();
      toast.success("Item Added To cart Successfuly", {
        position: "top-center",
      });
    } else {
      toast?.error(response?.errors, { position: "top-center" });
    }
    setQuantityLoading(false);
  };

  const handleUpdateQuantity = async () => {
    if (
      basketCtx?.basketData?.filter(
        (basketItem) => basketItem?.product_id === data?.Id
      )[0]?.quantity
    ) {
      setQuantityLoading(true);
      let newQuantity = basketCtx?.basketData?.filter(
        (basketItem) => basketItem?.product_id === data?.Id
      )[0]?.quantity
        ? basketCtx?.basketData?.filter(
            (basketItem) => basketItem?.product_id === data?.Id
          )[0]?.quantity
        : 1;
      const response = await updateQuantityofiteminCart(
        basketCtx?.basketData?.filter(
          (basketItem) => basketItem?.product_id === data?.Id
        )[0]?.id,
        --newQuantity
      );
      if (response.success) {
        basketDataLs.set(JSON.stringify(response?.data?.items));
        basketCtx.setBasket();
        setCountOfProduct((prev) => --prev);
      } else {
        toast.error(response?.errors, { position: "top-center" });
      }
      setQuantityLoading(false);
    }
  };
  useEffect(() => {
    const hasbasket = basketCtx.basketData?.model?.items?.filter(
      (basketItem) => basketItem?.product_id === data?.Id
    )[0];
    setCountOfProduct(hasbasket?.quantity ? hasbasket?.quantity : 1);
  }, [basketCtx.basketData]);

  const basketCount = basketCtx?.basketData?.filter(
    (basketItem) => basketItem?.product_id === data?.Id
  )[0]?.quantity;

  function getMinimumProductAttPriceAdjustment() {
    let minimum = Infinity;
    let priceString = ""
    data?.ProductAttributes?.forEach((attribute) => {
      attribute?.values?.forEach((value) => {
        const priceAdjustment = value?.price_adjustment_value;
        if (priceAdjustment < minimum){
          minimum = priceAdjustment;
          priceString = value?.price_adjustment;
        }
      })
    });
    return priceString;
  }

  return (
    <div className={`  flex flex-col justify-between w-full `}>
      <div className="relative">
        {data?.IsOutOfStock && (
          <div className="absolute bg-primary top-0 left-0 p-1 rounded-br-[5px] rounded-tl-[5px] z-10 text-white text-[10px]">
            {t("out-of-stuck")}
          </div>
        )}

        <Link
          className="absolute w-full h-full z-1"
          href={`/product/${data?.SeName}`}
        ></Link>
        <div className="relative border-[1px] border-gray-Primary rounded-[10px] aspect-square overflow-hidden">
          <Link
            className="absolute w-full h-full z-10 top-0"
            href={`/product/${data?.SeName}`}
          ></Link>

          <Image
            fill
            className="object-cover rounded-[10px] transition-opacity opacity-0 duration-500"
            src={data?.DefaultPictureModel?.ImageUrl}
            alt={data?.Name || "product image"}
            onLoadingComplete={(img) => img.classList.remove("opacity-0")}
            sizes="(min-width: 768px) 200px, 100vw"
          />
          {!data?.HasRequiredAttribute && (
            <div
              style={{ direction: "ltr" }}
              className={` absolute bottom-5 right-4 z-10 overflow-hidden hoverEffect hover:text-primary hover:bg-primary-light  w-[25px] hover:w-[80px] transition-all  flex justify-center items-center gap-3  rounded-[5px]  ${
                basketCount ? "bg-primary text-white" : "bg-primary-light"
              }`}
            >
              {quantityLoading ? (
                <div className="flex border-[1px] border-primary rounded-[5px] w-[25px] justify-center items-center">
                  <Image
                    width={23}
                    height={25}
                    src={"/assets/loading/infinitScroolLoading.svg"}
                    alt="Loading"
                  />
                </div>
              ) : (
                <>
                  <button
                    onClick={handleUpdateQuantity}
                    className="bg-transparent w-[30px] h-[30px] hidden"
                    disabled={quantityLoading}
                  >
                    {!basketCount || basketCount <= 1 ? (
                      <Trash2
                        className={`w-6 text-[#F67373] ${
                          !basketCount && "opacity-50"
                        }`}
                      />
                    ) : (
                      <Minus className="w-6 text-primary" />
                    )}
                  </button>
                  <p
                    className={`text-[16px]  ${
                      basketCount ? "block" : "hidden"
                    }`}
                  >
                    {basketCount ? basketCount : 0}
                  </p>
                  <button
                    onClick={handleItemAddToCart}
                    className={`bg-transparent w-[30px] h-[30px] ${
                      basketCount ? "hidden" : "block"
                    }`}
                    disabled={quantityLoading}
                  >
                    <Plus className="w-6 text-primary" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <div className="">
          <p className="w-full text-[12px] p-2 h-[45px] line-clamp-2">
            {data?.Name}
          </p>
        </div>
      </div>
      <p className="  text-[14px] font-bold px-2">
        {data?.ProductPrice?.PriceValue === 0 ? getMinimumProductAttPriceAdjustment() : data?.ProductPrice?.Price}
      </p>
      {!data?.HasRequiredAttribute &&
        data?.ProductAttributes?.length === 1 &&
        data?.ProductAttributes[0]?.attribute_control_type === 2 && (
          <div className="flex justify-center gap-2 bg-primary-light rounded-[5px] p-1 text-[11px] w-fit">
            {data?.ProductAttributes[0].values?.map((item) => (
              <button
                className={`${
                  att[`product_attribute_${data?.ProductAttributes[0]?.id}`] ===
                  item?.id
                    ? " bg-primary px-1 rounded-[4px] text-white"
                    : ""
                }`}
                onClick={() => {
                  setAtt({
                    [`product_attribute_${data?.ProductAttributes[0]?.id}`]:
                      item?.id,
                  });
                }}
              >
                {item?.name}
              </button>
            ))}
          </div>
        )}
    </div>
  );
}
