import React from "react";
import { Plus, Minus, Heart } from "lucide-react"; // Assuming you use lucide-react for icons
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import ProductAtt from "./ProductAtt";

const DesktopProductView = ({
                              productData,
                              count,
                              handleIncries,
                              handleDeireas,
                              addToCart,
                              isFave,
                              handleSwitchFave,
                              setAttObj,
                              attObj,
                              unitPrice,
                              shownPrice,
                              setUnitPrice,
                              autoSelectedPriceAdjustment
                            }) => {
  const image = productData?.defaultPictureModel?.imageUrl;
  const t = useTranslations("index");
  const locale = useLocale();
  return (
    <div className="container min-h-screen mx-auto p-8 bg-root-backgroung">
      <div className="flex gap-20">
        <div className="w-[500px] flex-1 relative h-[500px] rounded-md overflow-hidden">
          <Image src={image} alt="product" fill className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <p className="text-2xl font-bold">{productData?.name}</p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <p className="text-2xl font-bold">
                {unitPrice?.toFixed(3)}&nbsp;{locale === "en" ? "KWD" : "ک.د"}
              </p>
              <p className="text-2xl font-bold line-through">
                {productData?.productPrice?.oldPrice}
              </p>
            </div>
            <p className="text-lg text-gray-600">
              {t("label-total-kwd", {
                value: shownPrice.toFixed(3).toString()
              })}
            </p>
          </div>
          <ProductAtt
            setAttObj={setAttObj}
            attObj={attObj}
            AttList={productData?.productAttributes}
            setUnitPrice={setUnitPrice}
            autoSelectedPriceAdjustment={autoSelectedPriceAdjustment}
          />
          {/* Add to Cart, Quantity, and Wishlist Section */}
          <div className="flex items-center gap-4 mt-6">
            {/* Quantity Selector */}
            <div className="flex items-center bg-[#F5F5F5] rounded-full px-6 py-2 gap-6">
              <button
                onClick={handleDeireas}
                className="text-2xl font-bold text-black focus:outline-none"
              >
                <Minus />
              </button>
              <span className="text-xl font-medium w-4 text-center">
                {count}
              </span>
              <button
                onClick={handleIncries}
                className="text-2xl font-bold text-black focus:outline-none"
              >
                <Plus />
              </button>
            </div>
            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              className="bg-primary  text-white rounded-full px-10 py-3 text-base font-medium w-full transition-colors"
            >
              {t("button-add-to-cart")}
            </button>
          </div>
          <div className="mt-4 w-full">
            <button
              onClick={handleSwitchFave}
              className="flex items-center justify-center gap-2 w-full bg-[#F5F5F5] rounded-full px-8 py-3 text-black hover:text-primary transition-colors"
            >
              <Heart fill={isFave ? "black" : "none"} className="w-6 h-6" />
              <span className="text-base font-medium">
                {t("button-add-wishlist")}
              </span>
            </button>
          </div>
        </div>
      </div>
      {/*<ProductCarousel*/}
      {/*  products={productData?.customProperties?.RelatedProducts}*/}
      {/*  title={t("up_selling")}*/}
      {/*  containerClassName={"mt-10"}*/}
      {/*/>*/}
      {/*<ProductCarousel*/}
      {/*  products={productData?.customProperties?.CrossSellProducts}*/}
      {/*  title={t("cross_selling")}*/}
      {/*  containerClassName={"mt-12"}*/}
      {/*/>*/}
    </div>
  );
};

export default DesktopProductView;
