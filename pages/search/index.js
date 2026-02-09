import MainLayout from "@/layout/MainLayout";
import React, { useState } from "react";
import FilterSelect from "../../components/search/FilterSelect";
import ProductCard from "@/components/ProductCard";
import CustomBottomDoc from "../../components/BottomDoc";
import FillterModal from "../../components/Modal/FillterModal";
import { debounce } from "lodash";
import ProductCardLoading from "../../components/Plaseholders/ProductCardLoading";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import Header from "../../components/header";
import FilterButton from "../../components/search/FilterButton";
import LgHeader from "../../components/header/lg-header";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useCategoriesQuery } from "@/queries/categories";
import { SORT_OPTIONS } from "@/data/sortOptions";
import { useSearchProductsQuery } from "@/queries/products";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function index() {
  const [showFillterModal, setShowFillterModal] = useState(false);
  const t = useTranslations("index");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const keywordParam = searchParams.get("keyword") || "";
  const sortByParam = parseInt(
    searchParams.get("sort") || SORT_OPTIONS[0].value
  );
  const categoriesParam = searchParams.get("categories") || [];
  const maxPriceParam = parseInt(searchParams.get("max-price") || "500");
  const minPriceParam = parseInt(searchParams.get("min-price") || "0");

  const [minPrice, setMinPrice] = useState(minPriceParam);
  const [maxPrice, setMaxPrice] = useState(maxPriceParam);
  const [categories, setCategories] = useState(categoriesParam);
  const [sort, setSort] = useState(sortByParam);

  const categoriesQuery = useCategoriesQuery();
  const {
    ref: lastProductRef,
    products,
    ...productsQuery
  } = useSearchProductsQuery({
    search: keywordParam.trim(),
    sortBy: sort,
    categories: categoriesParam,
    maxPrice: maxPriceParam,
    minPrice: minPriceParam,
  });

  const performSearch = debounce((keyword) => {
    const params = new URLSearchParams(searchParams);
    params.set("keyword", keyword.trim());

    router.push(`${pathname}?${params.toString()}`);
  }, 800);

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.set("min-price", minPrice);
    params.set("max-price", maxPrice);
    params.set(
      "categories",
      categories.map((c) => c.value)
    );
    params.set("sort", sort?.value);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("min-price");
    params.delete("max-price");
    params.delete("categories");
    params.delete("sort");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <MainLayout>
      <div className="hidden lg:flex flex-col gap-4 ">
        <LgHeader />
      </div>
      <div className="lg:hidden">
        <Header
          rightComponents={
            <FilterButton setShowFillterModal={setShowFillterModal} />
          }
        />
      </div>
      <div className="p-2 pb-[140px] min-h-[90vh] bg-root-backgroung">
        <div className="flex justify-between bg-gray-Primary p-1 rounded-[10px] mb-4">
          <input
            onChange={(e) => performSearch(e?.target?.value)}
            placeholder={`${t("search")}`}
            className="w-full outline-none border-0 bg-transparent p-2"
            type="text"
          />
          <button className="px-5 py-2 text-[#03053d] rounded-[10px]">
            <Search className="w-6" />
          </button>
        </div>

        {/* Desktop layout with sidebar */}
        <div className="hidden lg:flex gap-4">
          {/* Filter sidebar for desktop */}
          <div className="w-80 flex-shrink-0 p-4">
            <h3 className="text-lg font-bold mb-4">{t("filter")}</h3>

            <div className="flex flex-col gap-5">
              <FilterSelect
                value={categories}
                options={categoriesQuery.categories}
                setFieldValue={setCategories}
                label={t("categories")}
                multi={true}
              />
              <FilterSelect
                value={sort}
                options={SORT_OPTIONS}
                setFieldValue={setSort}
                label={t("sort")}
              />

              <div className="mt-5">
                <div className="mb-3 font-medium">{t("price_range")}:</div>
                <div className="flex justify-between mb-5 px-2 text-sm">
                  <p className="font-medium">
                    {t("currency")} : {minPrice}
                  </p>
                  <p className="font-medium">
                    {t("currency")} : {maxPrice}
                  </p>
                </div>
                <RangeSlider
                  onInput={(e) => {
                    setMinPrice(e[0]);
                    setMaxPrice(e[1]);
                  }}
                  id="range-slider-yellow"
                  min={0}
                  max={500}
                  value={[minPrice, maxPrice]}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <button
                onClick={handleApplyFilters}
                className="py-2 px-4 rounded-full font-medium bg-primary text-white w-full"
              >
                {t("apply")}
              </button>
              <button
                onClick={handleClearFilters}
                className="py-2 px-4 rounded-full font-medium border border-gray-300 w-full"
              >
                {t("clear_all")}
              </button>
            </div>
          </div>

          {/* Product grid for desktop */}
          <div className="flex-grow">
            <div className="grid grid-cols-4 lg:grid-cols-4 gap-4">
              {productsQuery.isLoading ? (
                <>
                  <ProductCardLoading />
                  <ProductCardLoading />
                  <ProductCardLoading />
                </>
              ) : (
                products?.map((item) => (
                  <div key={item?.id} ref={lastProductRef}>
                    <ProductCard data={item} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Mobile product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-2 lg:hidden">
          {productsQuery.isLoading ? (
            <>
              <ProductCardLoading />
              <ProductCardLoading />
              <ProductCardLoading />
              <ProductCardLoading />
            </>
          ) : (
            products?.map((item) => (
              <div key={item?.id} ref={lastProductRef}>
                <ProductCard data={item} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="lg:hidden">
        <CustomBottomDoc />
      </div>

      <FillterModal
        setSendRequset={() => {
          alert("test");
        }}
        maxPrice={maxPrice}
        setmaxPrice={setMaxPrice}
        minPrice={minPrice}
        setminPrice={setMinPrice}
        setCatSelected={categories}
        catSelected={setCategories}
        sortSelected={sort}
        setSortSelected={setSort}
        sortOptions={SORT_OPTIONS}
        cateGoriesOption={categoriesQuery.categories}
        showFillterModal={showFillterModal}
        setShowFillterModal={setShowFillterModal}
      />
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
