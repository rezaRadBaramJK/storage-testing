import MainLayout from "@/layout/MainLayout";
import React, { useState, useContext, useEffect } from "react";
import CustomSlider from "@/components/product/CustomSlider";
import ProductAtt from "@/components/product/ProductAtt";
import { additemWithAttributeToCart } from "@/services/http/cart/addItemWithAttributetocart";
import { toast } from "react-toastify";
import ModalAddToCart from "@/components/product/ModalAddToCart";
import CustombottomDoc from "@/components/product/CustombottomDoc";
import { basketDataLs } from "@/localStorage/auth";
import BasketContext from "@/store/BasketContext";
import { useLocale, useTranslations } from "next-intl";
import { Minus, Plus } from "lucide-react";
import LgHeader from "@/components/header/lg-header";
import LoginContext from "@/store/AuthContext";
import { removeFromFavioriets } from "@/services/http/products/removeFromFave";
import { addtoFavioriets } from "@/services/http/products/productAddToFav";
import LoginModal from "../../components/Modal/LoginModal";
import RemoveConfirmation from "../../components/Modal/RemoveConfirmation";
import DesktopProductView from "@/components/product/DesktopProductView";
import * as cookie from "cookie";
import Head from "next/head";

export default function Productdetails({ productData }) {
  const t = useTranslations("index");
  const basketCtx = useContext(BasketContext);
  const authCtx = useContext(LoginContext);
  const locale = useLocale();

  const initialUnitPrice =
    productData?.productPrice?.priceValue === 0 ?
      getInitialUnitPriceFromAttributes(productData) :
      productData?.productPrice?.priceValue;

  const [count, setCount] = useState(1);
  const [attObj, setAttObj] = useState(productData?.productPrice?.priceValue === 0 ? getInitialAttObjFromAttributes(productData) : {});
  const [unitPrice, setUnitPrice] = useState(initialUnitPrice);
  const [shownPrice, setShownPrice] = useState(initialUnitPrice * 1);
  const [isFave, setIsFave] = useState(productData?.isFavorite ?? false);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [showRemoveFromFaveModal, setShowRemoveFromFaveModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const autoSelectedPriceAdjustment = getMinimumAttributePriceAdjustment(productData);


  function getMinimumAttributePriceAdjustment(product) {
    if (product?.productPrice?.priceValue === 0) {
      let minimum = Infinity;
      let attributeInfo = null;
      product?.productAttributes?.forEach((attribute) => {
        attribute?.values?.forEach((value) => {
          const priceAdjustment = value?.priceAdjustmentValue;
          if (priceAdjustment < minimum) {
            minimum = priceAdjustment;
            attributeInfo = {
              attId: attribute?.id,
              attType: attribute?.attributeControlType,
              value: value
            };
          }
        });
      });
      return attributeInfo;
    }
    return null;
  }

  function getInitialUnitPriceFromAttributes(product) {
    const attr = getMinimumAttributePriceAdjustment(product);
    if (attr && [1, 40, 2, 3]?.includes(attr?.attType)) {
      return attr?.value?.priceAdjustmentValue ?? 0;
    }
    return null;
  }

  function getInitialAttObjFromAttributes(product) {
    const attr = getMinimumAttributePriceAdjustment(product);
    if (attr && [1, 40, 2, 3]?.includes(attr?.attType)) {
      return {
        [`product_attribute_${attr?.attId}`]: [`${attr?.value?.id}`]
      };
    }
    return null;
  }

  const handleSwitchFave = async () => {
    if (authCtx?.isLogin) {
      if (isFave) {
        setShowRemoveFromFaveModal(true);
      } else {
        const response = await addtoFavioriets(productData?.id);
        if (response?.success) {
          setIsFave(true);
        } else {
          toast.error(response?.error);
        }
      }
    } else {
      setShowLoginModal(true);
    }
  };

  const handleRemoveFromFave = async () => {
    const response = await removeFromFavioriets(productData?.id);
    if (response?.success) {
      setIsFave(false);
      setShowRemoveFromFaveModal(false);
    } else {
      setIsFave(true);
      toast.error(response?.error);
    }
  };

  const addToCart = async () => {
    const attFormatedForServer = {};
    Object.entries(attObj).map((item) => {
      Object.assign(attFormatedForServer, { [`${item[0]}`]: `${item[1][0]}` });
    });
    const response = await additemWithAttributeToCart(
      productData?.id,
      count,
      attFormatedForServer
    );
    if (response?.success) {
      setShowAddToCartModal(true);
      basketDataLs?.set(JSON.stringify(response?.data?.model?.items));
      basketCtx.setBasket();
    } else {
      toast.error(response?.errors, {
        position: "top-center"
      });
    }
  };

  useEffect(() => {
    setShownPrice(unitPrice * count);
  }, [unitPrice]);

  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
    setShownPrice(unitPrice * newCount);
  };
  const handleDecrease = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      setShownPrice(unitPrice * newCount);
    }
  };


  return (
    <>
      <Head>
        <title>{productData?.metaTitle || productData?.name}</title>
        <meta
          name="description"
          content={
            productData?.metaDescription ||
            productData?.shortDescription ||
            ""
          }
        />
        <meta
          property="og:title"
          content={productData?.metaTitle || productData?.name}
        />
        <meta
          property="og:description"
          content={
            productData?.metaDescription ||
            productData?.shortDescription ||
            ""
          }
        />
        <meta
          property="og:image"
          content={productData?.pictureModels?.[0]?.imageUrl || ""}
        />
      </Head>
      <MainLayout>
        <div className="hidden lg:flex ">
          <LgHeader />
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block">
          <DesktopProductView
            attObj={attObj}
            setAttObj={setAttObj}
            productData={productData}
            count={count}
            handleIncries={handleIncrease}
            handleDeireas={handleDecrease}
            addToCart={addToCart}
            isFave={isFave}
            handleSwitchFave={handleSwitchFave}
            unitPrice={unitPrice}
            shownPrice={shownPrice}
            setUnitPrice={setUnitPrice}
            autoSelectedPriceAdjustment={autoSelectedPriceAdjustment}
          />
        </div>

        {/* Mobile View */}
        <div className="min-h-screen lg:hidden">
          <div className={`overflow-x-hidden pb-[140px]`}>
            <CustomSlider
              isFave={isFave}
              setIsFave={setIsFave}
              data={productData}
              handleSwitchFave={handleSwitchFave}
            />
            <div className="p-2 rounded-[10px]">
              <div>
                <div className="flex justify-between">
                  <p className="text-[16px] font-bold">
                    {productData?.name}
                  </p>
                  <p className="text-[16px] font-bold">
                    {unitPrice?.toFixed(3)}&nbsp;
                    {locale === "en" ? "KWD" : "ک.د"}
                  </p>
                </div>
                <div
                  className="h-[35px] bg-[#FCF9F7] flex justify-between items-center ml-auto max-w-[100px] mt-1 rounded-[10px]">
                  <button onClick={handleDecrease}>
                    <Minus className="w-[28px] text-primary" />
                  </button>
                  <p className="text-primary font-bold">{count}</p>
                  <button onClick={handleIncrease}>
                    <Plus className="w-[28px] text-white bg-primary rounded-[10px]" />
                  </button>
                </div>
                <div className="mt-6 mb-2">
                  <h2 className="text-center text-[18px] font-bold mb-2">
                    {t("title-product-details")}
                  </h2>
                  <div className="text-[14px] text-gray-700 leading-relaxed text-justify whitespace-pre-line">
                    {productData?.description}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:hidden">
              <ProductAtt
                setAttObj={setAttObj}
                attObj={attObj}
                AttList={productData?.productAttributes}
                setUnitPrice={setUnitPrice}
                autoSelectedPriceAdjustment={autoSelectedPriceAdjustment}
              />
            </div>
          </div>
          <CustombottomDoc
            price={productData?.productPrice}
            addToCart={addToCart}
            count={count}
            shownPrice={shownPrice}
          />
        </div>

        <ModalAddToCart
          setShowModal={setShowAddToCartModal}
          showModal={showAddToCartModal}
          title={productData?.name}
          text={`${t("product-add-to-cart")}`}
        />

        <LoginModal
          title={"This Action needs Authentication"}
          showModal={showLoginModal}
          setShowModal={setShowLoginModal}
        />
        <RemoveConfirmation
          title={"Remove Favorite?"}
          text={"Are you sure you want to remove this item?"}
          action={handleRemoveFromFave}
          showModal={showRemoveFromFaveModal}
          setShowModal={setShowRemoveFromFaveModal}
        />
      </MainLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { locale, params, req } = context;
  const seName = params.seName;

  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.Authorization;

  try {
    const messages = (
      await import(`../../Internationaliz/${locale}.json`)
    ).default;

    const productRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/jarra/Product/SeName/${seName}`,
      {
        headers: token ? {
            Authorization: `Bearer ${token}`,
            "Accept-Language": locale === "ar" ? "ar-kw" : "en-us",
          }
          :
          {
            "Accept-Language": locale === "ar" ? "ar-kw" : "en-us",
          }
      }
    );

    if (!productRes.ok) {
      throw new Error("Failed to fetch product data");
    }

    const productData = await productRes.json();

    return {
      props: {
        messages,
        productData: productData?.Data?.productDetailsModel || null
      }
    };
  } catch (error) {
    console.error("SSR Error:", error);
    return {
      notFound: true
    };
  }
}
