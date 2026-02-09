import MainLayout from "@/layout/MainLayout";
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import ProductCardLoading from "../../components/Plaseholders/ProductCardLoading";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { getCaroselById } from "@/services/http/carousel/getCaroselById";
import ProductCardForCarousel from "../../components/ProductCard/ProductCardForCarousel";
import CustomBottomDoc from "../../components/BottomDoc";
import LgHeader from "../../components/header/lg-header";
export default function CarouselDetails() {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastElem, setLastElem] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const router = useRouter();
  const t = useTranslations("index");
  const { id } = router.query;

  useEffect(() => {
    const getProducts = async () => {
      const response = await getCaroselById(id);
      if (response?.success) {
        setProducts(response?.data[0]?.Products);
        setLoadingProducts(false);
      }
    };
    if (id) getProducts();
  }, [id]);

  return (
    <MainLayout>
      <div className="hidden lg:flex ">
        <LgHeader />
      </div>
      <div className="lg:hidden">
        <Header search title={"Products"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2 p-2">
        {loadingProducts ? (
          <>
            <ProductCardLoading />
            <ProductCardLoading />
            <ProductCardLoading />
            <ProductCardLoading />
          </>
        ) : (
          products?.map((item) => (
            <div key={item?.id}>
              <ProductCardForCarousel data={item} />
            </div>
          ))
        )}
      </div>
      <CustomBottomDoc />
    </MainLayout>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../Internationaliz/${locale}.json`)).default,
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
