import React, { useMemo, useState } from "react";
import MainLayout from "../layout/MainLayout";
import CustomBottomDoc from "../components/BottomDoc";
import Slider from "../components/Home/Slider";
import LgHeader from "../components/header/lg-header";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useCategoriesQuery, useSubCategoriesQuery } from "@/queries/categories";
import { useCategoryProductsQuery } from "@/queries/products";
import { useTranslations } from "next-intl";
import Header from "@/components/header";
import CategorieisCaroselCategoriesPage from "@/components/categories/CategorieisCaroselCategoriesPage";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import ProductCardLoading from "@/components/Plaseholders/ProductCardLoading";
import CoustomHead from "../components/Home/CoustomHead";
// import CategoryCarouselHomePage from "../components/OwlCarousel/CategoryCarouselHomePage";
// import OrderModal from "../components/Modal/OrderModal";
// import { useHomeRootCategoriesQuery } from "@/queries/home";
// import { useLatestOrdersQuery } from "@/queries/orders";
// import { useHomePageBannersQuery } from "@/queries/homePageBanners";
// import BannerSlider from "@/components/Home/BannerSlider";

export default function Home() {
  // const homeCategoriesQuery = useHomeRootCategoriesQuery();
  // const homePageBannersQuery = useHomePageBannersQuery("HomePageSlider");

  // const orderQuery = useLatestOrdersQuery();

  // const [showOrderModal, setShowOrderModal] = useState(false);
  const [resendChangeCurrencyRequest, setResendChangeCurrencyRequest] =
    useState(false);
  //
  // const rootCategories = homeCategoriesQuery.data?.data || [];
  // const homePageBanner = homePageBannersQuery.data?.data || [];

  // const lastOrder = orderQuery.data?.data?.orders?.[0];

  // ------------------------------from category page--------------------------------------------------
  const router = useRouter();
  const queryParams = useSearchParams();
  const categoriesQuery = useCategoriesQuery();
  const categories = categoriesQuery.data?.data || [];
  const categoryIdParam = queryParams.get("Categoryid");
  const activeCategoryId = categoryIdParam || categories?.[0]?.Id;

  const subCategoriesQuery = useSubCategoriesQuery(activeCategoryId);
  const subCategoriesList = subCategoriesQuery.data?.data || [];
  const subCategoryIdParam = queryParams.get("subCategoryid");
  const activeSubCategoryId = subCategoryIdParam || subCategoriesList?.[0]?.Id;

  const {
    products,
    ref: lastProductRef,
    ...productsQuery
  } = useCategoryProductsQuery(activeCategoryId, activeSubCategoryId);

  const t = useTranslations("index");

  const selectedCategories = useMemo(() => {
    return categories.find((cat) => cat.Id == activeCategoryId);
  }, [categories, activeCategoryId]);

  const selectedSubCategories = useMemo(() => {
    return subCategoriesList.find((sub) => sub.Id == activeSubCategoryId);
  }, [subCategoriesList, activeSubCategoryId]);


  return (
    // <MainLayout>
    // 	<div className="bg-root-backgroung min-h-screen pb-[140px]">
    // 		<div className="lg:hidden">
    // 			<CoustomHead
    // 				setResendChangeCurrencyRequest={setResendChangeCurrencyRequest}
    // 			/>
    // 		</div>
    //
    // 		<div className="hidden lg:flex ">
    // 			<LgHeader
    // 				setResendChangeCurrencyRequest={setResendChangeCurrencyRequest}
    // 			/>
    // 		</div>
    // 		<BannerSlider
    // 			loading={homeCategoriesQuery?.isPending}
    // 			banners={homePageBanner}
    // 		/>
    // 		{rootCategories?.map((item) => {
    // 			if (item?.Products?.length) {
    // 				return (
    // 					<div
    // 						key={item.Id}
    // 						className="relative pb-32 lg:pb-4 lg:px-10 lg:pt-7 min-h-[350px]"
    // 					>
    // 						{/*<Slider rootCategorySelected={item}/>*/}
    //
    // 						<div className="absolute lg:relative bottom-[-15px] w-full">
    // 							<CategoryCarouselHomePage carouselData={item?.Products}/>
    // 						</div>
    // 					</div>
    // 				)
    // 			}
    // 		})}
    //
    // 		<div className="lg:hidden">
    // 			<CustomBottomDoc/>
    // 			<OrderModal
    // 				data={lastOrder}
    // 				setShowModal={setShowOrderModal}
    // 				showModal={showOrderModal}
    // 			/>
    // 		</div>
    // 	</div>
    // </MainLayout>

    // 	------------------------------------from category page-----------------------------------

    <MainLayout>
      <div className="lg:hidden">
        <CoustomHead
          setResendChangeCurrencyRequest={setResendChangeCurrencyRequest}
        />
      </div>

      <div className="hidden lg:flex ">
        <LgHeader
          setResendChangeCurrencyRequest={setResendChangeCurrencyRequest}
        />
      </div>
      <div
        className={`relative min-h-[350px] h-auto ${
          (subCategoriesList?.length || subCategoriesQuery.isLoading) > 0
            ? "pb-[320px]"
            : "pb-[55px]"
        } lg:pb-0`}
      >
        <Slider rootCategorySelected={selectedCategories} />
        <div className="absolute lg:hidden top-[40%] w-full">
          <CategorieisCaroselCategoriesPage
            loadingCategories={categoriesQuery.isLoading}
            loadingSubCategories={subCategoriesQuery.isLoading}
            setSelectedSubCategories={() => {
            }}
            subCategoryCarouselData={subCategoriesList}
            selectedSubCategories={selectedSubCategories}
            carouselData={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={() => {
            }}
          />
        </div>

        {/* Main Categories Grid */}
        <div className="hidden lg:grid grid-cols-6 grid-flow-row gap-8 p-4">
          {categoriesQuery.isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="relative border-[1px] rounded-[10px] bg-gray-300 min-h-[120px]" />
                <p className="text-[12px] p-1 text-center font-bold h-4 bg-gray-300 rounded" />
              </div>
            ))
            : categories.map((cat) => (
              <div
                key={cat.Id}
                onClick={() => {
                  router.replace(
                    {
                      pathname: router.pathname,
                      query: { Categoryid: cat.Id }
                    },
                    undefined,
                    { shallow: true }
                  );
                }}
                className={`flex flex-col cursor-pointer ${
                  selectedCategories?.Id === cat.Id
                    ? "border-2 border-primary"
                    : "border border-gray-Primary"
                } rounded-[10px] overflow-hidden hover:shadow-lg transition-all duration-200`}
              >
                <div className="relative aspect-square">
                  <Image
                    fill
                    className="object-cover transition-opacity opacity-0 duration-[.5s]"
                    src={cat.PictureModel?.ImageUrl}
                    onLoadingComplete={(image) =>
                      image.classList.remove("opacity-0")
                    }
                    alt={cat.Name}
                  />
                </div>
                <p className="text-[14px] p-2 text-center font-bold truncate">
                  {cat.Name}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Products section with optional sidebar */}
      <div className="flex flex-col lg:flex-row gap-4 p-2 pb-20">
        {/* Sidebar for subcategories on desktop */}
        {(subCategoriesList?.length > 0 || subCategoriesQuery.isLoading) && (
          <div className="hidden lg:block w-64 flex-shrink-0">
            <h3 className="text-lg font-bold mb-4">
              {selectedCategories?.Name}
            </h3>
            <div className="flex flex-col gap-2">
              {subCategoriesQuery.isLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-12 bg-gray-300 rounded animate-pulse flex items-center gap-2"
                  >
                    <div className="w-10 h-10 bg-gray-400 rounded-lg flex-shrink-0" />
                    <div className="h-4 bg-gray-400 rounded flex-grow" />
                  </div>
                ))
                : subCategoriesList.map((sub) => (
                  <button
                    key={sub.Id}
                    onClick={() => {
                      router.replace(
                        {
                          pathname: router.pathname,
                          query: { ...router.query, subCategoryid: sub.Id }
                        },
                        undefined,
                        { shallow: true }
                      );
                    }}
                    className={`p-2 text-left rounded-lg transition-all duration-200 hover:bg-gray-100 flex items-center gap-3 ${
                      selectedSubCategories?.Id === sub.Id
                        ? "bg-primary/10 text-primary font-bold"
                        : "bg-white"
                    }`}
                  >
                    {sub.PictureModel?.ImageUrl && (
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          fill
                          src={sub.PictureModel.ImageUrl}
                          alt={sub.Name}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <p className="flex-grow truncate text-start">{sub.Name}</p>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Products grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ${
            subCategoriesList?.length > 0 || subCategoriesQuery.isLoading
              ? "lg:grid-cols-3"
              : "lg:grid-cols-4"
          } gap-4 flex-grow`}
        >
          {products.map((item, index) => {
            const isLast = index === products.length - 1;

            return (
              <div
                key={item?.id || item?.Id || index}
                ref={isLast ? lastProductRef : null}
              >
                <ProductCard data={item} />
              </div>
            );
          })}
          {productsQuery.isFetching &&
            [...Array(4)].map((_, idx) => <ProductCardLoading key={idx} />)}
        </div>
      </div>
      <div className="lg:hidden">
        <CustomBottomDoc />
      </div>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../Internationaliz/${locale}.json`)).default
    }
  };
}
