import MainLayout from "@/layout/MainLayout";
import React, { useState, useEffect } from "react";
import FavCard from "../../../components/dashboard/likes/FavCard";
import { getFaavioritesProduct } from "@/services/http/products/getFaavioritesProduct";
import ProductCardLoading from "@/components/Plaseholders/ProductCardLoading";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import Header from "@/components/header";
import { removeAllFavoriteProducts } from "@/services/http/products/removeAllFavoriteProducts";
import LgHeader from "@/components/header/lg-header";
import EmptyFrame from "../../../components/dashboard/likes/EmptyFrame";
export default function Like() {
  const t = useTranslations("index");
  const [faveItems, setFaveItems] = useState([]);
  const [resendRequest, setResendRequest] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const faves = async () => {
      const response = await getFaavioritesProduct(0);
      if (response?.success) {
        setFaveItems(response?.data);
        setLoading(false);
      }
    };
    faves();
  }, [resendRequest]);

  const handleRemoveAllFave = async () => {
    setLoading(true);
    const response = await removeAllFavoriteProducts();
    if (response?.success) {
      setFaveItems([]);
      setLoading(false);
    }
  };
  return (
    <MainLayout>
      <div className="min-h-screen bg-root-backgroung">
        <div className="lg:hidden">
          <Header title={t("favorites")} />
        </div>
        <div className="hidden lg:flex ">
          <LgHeader />
        </div>
        <div className="my-3 px-4 flex justify-between items-center">
          {faveItems.length > 0 ? (
            <>
              <p className="font-bold">
                {" "}
                {faveItems?.length} {t("product")}{" "}
              </p>
              <button
                onClick={handleRemoveAllFave}
                className="flex gap-3 cursor-pointer"
              >
                <Trash2 className="w-6 text-[#F67373]" />
                <p className="font-bold">{t("remova_all_items")}</p>
              </button>
            </>
          ) : null}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-5 gap-2 p-2 w-full">
          {loading ? (
            <>
              <ProductCardLoading />
              <ProductCardLoading />
              <ProductCardLoading />
              <ProductCardLoading />
              <ProductCardLoading />
              <ProductCardLoading />
            </>
          ) : (
            faveItems?.map((item) => (
              <FavCard setResendRequest={setResendRequest} data={item} />
            ))
          )}
        </div>
        {faveItems.length > 0 ? null : (
          <div className="flex justify-center items-center">
            <EmptyFrame />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../../Internationaliz/${locale}.json`))
        .default,
    },
  };
}
