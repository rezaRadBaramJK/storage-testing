import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import BasketContext from "@/store/BasketContext";
import { basketDataLs } from "@/localStorage/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import { updateQuantityofiteminCart } from "@/services/http/cart/updateQuantityofiteminCart";
import { additemWithAttributeToCart } from "@/services/http/cart/addItemWithAttributetocart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

export default function ProductCard({ data }) {
  const basketCtx = useContext(BasketContext);
  const router = useRouter();
  const t = useTranslations("index");
  const [att, setAtt] = useState({});
  const [countOfProduct, setCountOfProduct] = useState(0);
  const [quantityLoading, setQuantityLoading] = useState(false);

  const basketItem = basketCtx?.basketData?.find(
    (item) => item?.product_id === data?.Id
  );
  const basketCount = basketItem?.quantity ?? 0;

  useEffect(() => {
    setCountOfProduct(basketItem?.quantity ?? 0);
  }, [basketCtx.basketData]);

  const handleItemAddToCart = async (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (data?.HasRequiredAttribute) {
      toast.error(t("required-attribute-error"), { position: "top-center" });
      return;
    }

    setQuantityLoading(true);
    const response = await additemWithAttributeToCart(data?.Id, 1, att);
    if (response?.success) {
      basketDataLs.set(JSON.stringify(response?.data?.model?.items));
      basketCtx.setBasket();
      toast.success(t("item-added"), { position: "top-center" });
    } else {
      toast.error(response?.errors, { position: "top-center" });
    }
    setQuantityLoading(false);
  };

  const handleUpdateQuantity = async (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (!basketItem) return;

    setQuantityLoading(true);
    const current = basketItem.quantity ?? 1;
    const newQuantity = current - 1;
    const response = await updateQuantityofiteminCart(
      basketItem.id,
      newQuantity
    );
    if (response.success) {
      basketDataLs.set(JSON.stringify(response?.data?.items));
      basketCtx.setBasket();
      setCountOfProduct(newQuantity);
    } else {
      toast.error(response?.errors, { position: "top-center" });
    }
    setQuantityLoading(false);
  };

  const onCLick = () => {
    router.push(`/product/${data?.SeName}`);
  };

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
    <div
      onClick={onCLick}
      className="rounded-[10px] flex flex-col justify-between cursor-pointer w-full"
    >
      <div className="relative">
        {data?.IsOutOfStock && (
          <div className="absolute bg-primary top-0 left-0 p-1 rounded-br-[5px] rounded-tl-[5px] z-10 text-white text-[12px]">
            {t("out-of-stuck")}
          </div>
        )}
        <Link
          className="absolute w-full h-full z-1"
          href={`/product/${data?.SeName}`}
        ></Link>
        <div className="relative">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className="w-[400px] h-[190px] rounded-[5px] transition-opacity opacity-0 duration-[.5s] border-[1px] border-gray-Primary"
            src={data?.DefaultPictureModel?.ImageUrl}
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            alt={data?.Name}
          />
          {!data?.HasRequiredAttribute && (
            <div
              style={{ direction: "ltr" }}
              className={`absolute bottom-5 right-4 z-10 overflow-hidden hoverEffect hover:bg-primary-light hover:text-primary w-[30px] hover:w-[100px] transition-all flex justify-center items-center gap-3 rounded-[5px] ${
                basketCount ? "bg-primary text-white" : "bg-primary-light"
              }`}
            >
              {quantityLoading ? (
                <div className="flex border-[1px] border-primary rounded-[5px] w-[30px] justify-center items-center">
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
                    {basketCount <= 1 ? (
                      <Trash2
                        className={`w-7 text-[#F67373] ${
                          basketCount === 0 && "opacity-50"
                        }`}
                      />
                    ) : (
                      <Minus className="w-7 text-primary" />
                    )}
                  </button>
                  {basketCount > 0 && (
                    <p className="text-[20px]">{basketCount}</p>
                  )}
                  <button
                    onClick={handleItemAddToCart}
                    className={`bg-transparent w-[30px] h-[30px] ${
                      basketCount ? "hidden" : "block"
                    }`}
                    disabled={quantityLoading}
                  >
                    <Plus className="w-7 text-primary" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <div className="mt-2">
          <p className="w-full text-[14px] p-2 h-[50px] line-clamp-2">
            {data?.Name}
          </p>
        </div>
      </div>

      <p className="text-[16px] font-bold px-2">{data?.ProductPrice?.PriceValue === 0 ? getMinimumProductAttPriceAdjustment() : data?.ProductPrice?.Price}</p>
      {/* 
      {data?.ProductAttributes?.length === 1 &&
        data?.ProductAttributes[0]?.attribute_control_type === 2 && (
          <div className="flex justify-center gap-2 bg-primary-light rounded-[5px] p-1 text-[11px] w-fit mt-1">
            {data?.ProductAttributes[0].values?.map((item) => (
              <button
                key={item.id}
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
        )} */}
    </div>
  );
}
