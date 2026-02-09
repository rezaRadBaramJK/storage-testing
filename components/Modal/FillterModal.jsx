import React from "react";
import ModalBase from "./ModalBase";
import FilterSelect from "@/components/search/FilterSelect";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useTranslations } from "next-intl";
export default function FillterModal({
  showFillterModal,
  setShowFillterModal,
  setCatSelected,
  catSelected,
  sortSelected,
  setSortSelected,
  sortOptions,
  cateGoriesOption,
  maxPrice,
  setmaxPrice,
  minPrice,
  setminPrice,
  setSendRequset,
}) {
  const t = useTranslations("index");
  return (
    <ModalBase
      direction={"right"}
      show={showFillterModal}
      setShow={setShowFillterModal}
    >
      <div className=" max-w-[330px] ">
        <div className=" w-[330px]  bg-white absolute bottom-0 right-0 p-2 h-screen  overflow-y-scroll no-scrollbar">
          <div className="flex justify-center items-center">
            <p className="font-bold">{t("filter")}</p>
            <div
              onClick={() => setShowFillterModal(false)}
              className="rotate-45 absolute left-3 text-[30px] font-medium cursor-pointer "
            >
              +
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-5">
            <FilterSelect
              value={catSelected}
              options={cateGoriesOption}
              setFieldValue={setCatSelected}
              label={t("categories")}
              // placeholder={"Select Category"}
              multi={true}
            />
            <FilterSelect
              value={sortSelected}
              options={sortOptions}
              setFieldValue={setSortSelected}
              label={t("sort")}
              // placeholder={"Select Sort"}
              // multi={false}
            />
          </div>
          <div className="mt-20">
            <div className="mb-5 font-medium">{t("price_range")}:</div>
            <div className="flex justify-between pb-4 px-2">
              <p className="font-medium ">
                {t("currency")} : {minPrice}
              </p>
              <p className="font-medium">
                {" "}
                {t("currency")} : {maxPrice}
              </p>
            </div>
            <RangeSlider
              onInput={(e) => {
                setminPrice(e[0]);
                setmaxPrice(e[1]);
              }}
              id="range-slider-custom"
              min={0}
              max={500}
              value={[minPrice, maxPrice]}
            />
          </div>
          <div className="mt-20 flex justify-end">
            <div className=" flex gap-5">
              <button
                onClick={() => {
                  setmaxPrice(500);
                  setminPrice(0);
                  setCatSelected([]);
                  setSortSelected("");
                }}
                className="p-2 min-w-[80px]  rounded-full font-medium"
              >
                {t("clear_all")}
              </button>
              <button
                onClick={() => setSendRequset((prev) => !prev)}
                className=" min-w-[80px] py-1 rounded-full font-medium bg-primary text-white"
              >
                {t("done")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
