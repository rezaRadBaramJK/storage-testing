import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { additemWithoutAttributeToCart } from "@/services/http/cart/additemWithoutAttributeToCart";
import BasketContext from "@/store/BasketContext";
import { basketDataLs } from "@/localStorage/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import {Minus, Plus} from "lucide-react";

export default function ProductCardInProductDetails({ data }) {
  const basketCtx = useContext(BasketContext);
  const [countOfProduct, setCountOfProduct] = useState(1);
  const [quantityLoading, setQuantityLoading] = useState(false);
  const [isInBasket, setisInBasket] = useState(
    basketCtx.basketData?.model?.items?.filter(
      (basketItem) => basketItem?.product_id === data?.Id
    )[0]?.quantity
      ? true
      : false
  );
  const handleItemAddToCart = async () => {
    if (data?.HasRequiredAttribute) {
      toast.error("this product has required attribute", {
        position: "top-center",
      });
      return;
    }
    
    setQuantityLoading(true);
    const response = await additemWithoutAttributeToCart(data?.Id, 1);
    if (response?.success) {
      basketDataLs.set(JSON.stringify(response?.data));
      basketCtx.setBasket();
      toast.error("Item Added To cart Successfuly", {
        position: "top-center",
      });
    }
    setQuantityLoading(false);
  };
  useEffect(() => {
    const hasbasket = basketCtx.basketData?.model?.items?.filter(
      (basketItem) => basketItem?.product_id === data?.Id
    )[0];
    setCountOfProduct(hasbasket?.quantity ? hasbasket?.quantity : 1);
    // setId(hasbasket?.id);
  }, [basketCtx.basketData]);
  return (
    <div
      className={`p-2 rounded-[10px] flex flex-col justify-between   w-full relative`}
    >
      <div className="bg-productCard-bg">
        <div className="relative">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className="w-[400px] h-[190px] rounded-[5px] transition-opacity opacity-0 duration-[.5s]"
            src={data?.DefaultPictureModel?.ImageUrl}
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
          <div
            className={` absolute bottom-5 right-4 z-10 overflow-hidden hoverEffect hover:bg-productCard-bg hover:text-black w-[30px] hover:w-[100px] transition-all  flex justify-center items-center gap-3  rounded-[5px]  ${
              isInBasket ? "bg-primary text-white" : "bg-productCard-bg"
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
                <button className="bg-transparent w-[30px] h-[30px] hidden" disabled={quantityLoading}>
                  <Minus className="w-7 text-[#000]" />
                </button>
                <p
                  className={`font-bold text-[20px]  ${
                    isInBasket ? "block" : "hidden"
                  }`}
                >
                  {countOfProduct}
                </p>
                <button
                  onClick={handleItemAddToCart}
                  className={`bg-transparent w-[30px] h-[30px] ${
                    isInBasket ? "hidden" : "block"
                  }`}
                  disabled={quantityLoading}
                >
                  <Plus className="w-7 text-[#000]" />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="mt-2 text-center">
          <p className="text-[14px] p-2 h-[50px]">
            {data?.Name?.length > 40
              ? `${data?.Name.slice(0, 40)}...`
              : data?.Name}
          </p>
        </div>
      </div>
      <p className="my-3 text-center text-[16px] font-bold">
        {data?.ProductPrice?.Price}
      </p>
      <Link
        className="absolute w-full h-full z-1"
        href={`/product/${data?.SeName}`}
      ></Link>
    </div>
  );
}
