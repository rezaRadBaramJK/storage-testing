import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { additemWithoutAttributeToCart } from "@/services/http/cart/additemWithoutAttributeToCart";
import BasketContext from "@/store/BasketContext";
import { basketDataLs } from "@/localStorage/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import { updateQuantityofiteminCart } from "@/services/http/cart/updateQuantityofiteminCart";
import {Minus, Plus} from "lucide-react"
export default function ProductCardForCarousel({ data }) {
  const basketCtx = useContext(BasketContext);
  const [quantityLoading, setQuantityLoading] = useState(false);
  const [countOfProduct, setCountOfProduct] = useState(
    basketCtx?.basketData?.filter(
      (basketItem) => basketItem?.product_id === data?.id
    )[0]?.quantity
      ? basketCtx?.basketData?.filter(
          (basketItem) => basketItem?.product_id === data?.id
        )[0]?.quantity
      : 1
  );
  const handleItemAddToCart = async () => {
    if (data?.HasRequiredAttribute) {
      toast.error("this product has required attribute", {
        position: "top-center",
      });
      return;
    }
    
    setQuantityLoading(true);
    const response = await additemWithoutAttributeToCart(data?.id, 1);
    if (response?.success) {
      basketDataLs.set(JSON.stringify(response?.data?.model?.items));
      basketCtx.setBasket();
      toast.success("Item Added To cart Successfuly", {
        position: "top-center",
      });
    } else {
      toast.error(response.errors, { position: "top-center" });
    }
    setQuantityLoading(false);
  };

  const handleUpdateQuantity = async () => {
    if (
      basketCtx?.basketData?.filter(
        (basketItem) => basketItem?.product_id === data?.id
      )[0]?.quantity
    ) {
      setQuantityLoading(true);
      let newQuantity = basketCtx?.basketData?.filter(
        (basketItem) => basketItem?.product_id === data?.id
      )[0]?.quantity
        ? basketCtx?.basketData?.filter(
            (basketItem) => basketItem?.product_id === data?.id
          )[0]?.quantity
        : 1;
      const response = await updateQuantityofiteminCart(
        basketCtx?.basketData?.filter(
          (basketItem) => basketItem?.product_id === data?.id
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
      (basketItem) => basketItem?.product_id === data?.id
    )[0];
    setCountOfProduct(hasbasket?.quantity ? hasbasket?.quantity : 1);
  }, [basketCtx.basketData]);

  return (
    <div
      className={` rounded-[10px] flex flex-col justify-between   w-full relative`}
    >
      <div>
        <div className="relative">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className="w-[400px] h-[190px] rounded-[5px] transition-opacity opacity-0 duration-[.5s] border-[1px] border-gray-Primary"
            src={data?.defaultPictureModel?.ImageUrl}
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
          {!data?.hasRequiredAttribute && (
            <div
              style={{ direction: "ltr" }}
              className={` absolute bottom-5 right-4 z-10 overflow-hidden hoverEffect hover:bg-primary-light hover:text-primary w-[30px] hover:w-[100px] transition-all  flex justify-center items-center gap-3  rounded-[5px]  ${
                basketCtx?.basketData?.filter(
                  (basketItem) => basketItem?.product_id === data?.id
                )[0]?.quantity
                  ? "bg-primary text-white"
                  : "bg-primary-light"
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
                    <Minus className="w-7 text-primary" />
                  </button>
                  <p
                    className={`font-bold text-[20px] 
                    ${
                      basketCtx.basketData?.filter(
                        (basketItem) => basketItem?.product_id === data?.id
                      )[0]?.quantity
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    {basketCtx?.basketData?.filter(
                      (basketItem) => basketItem?.product_id === data?.id
                    )[0]?.quantity
                      ? basketCtx?.basketData?.filter(
                          (basketItem) => basketItem?.product_id === data?.id
                        )[0]?.quantity
                      : 1}
                  </p>
                  <button
                    onClick={handleItemAddToCart}
                    className={`bg-transparent w-[30px] h-[30px] ${
                      basketCtx.basketData?.filter(
                        (basketItem) => basketItem?.product_id === data?.id
                      )[0]?.quantity
                        ? "hidden"
                        : "block"
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
          <p className="text-[14px] p-2 h-[50px]">
            {data?.name?.length > 40
              ? `${data?.name.slice(0, 40)}...`
              : data?.name}
          </p>
        </div>
      </div>
      <p className="  text-[16px] font-bold px-2">
        {data?.productPrice?.Price}
      </p>
      <Link
        className="absolute w-full h-full z-1"
        href={`/product/${data?.id}`}
      ></Link>
    </div>
  );
}
