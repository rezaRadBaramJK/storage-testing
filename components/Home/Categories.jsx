import React from "react";
import CategoryLoading from "../Plaseholders/CategoryLoading";
import { useTranslations } from "next-intl";
export default function Categories({
  setRootCategorySelected,
  rootCategorySelected,
  rootCategories,
  subCategories,
  subCategorySelected,
  setSubCategorySelected,
  loadingRootCategory,
  loadingSubCategory,
}) {
  const t = useTranslations("index");
  return (
    <div className="flex flex-col w-full gap-2 p-2 sticky top-[50px] z-20 bg-productCard-bg">
      {loadingRootCategory ? (
        <CategoryLoading />
      ) : (
        <div className=" p-2  shadow-lg rounded-[5px] relative">
          <div className="flex gap-5 px-1">
            <div className="no-scrollbar flex gap-5 overflow-scroll">
              {rootCategories?.map((item) => (
                <div
                  key={item?.Id}
                  onClick={() => setRootCategorySelected(item)}
                  className="w-fit flex items-center justify-center cursor-pointer"
                >
                  <p
                    className={`text-black whitespace-nowrap w-fit pb-1 font-medium ${
                      item?.Id === rootCategorySelected?.Id
                        ? "border-b-[2px] border-primary"
                        : "border-b-[2px] border-transparent"
                    }`}
                  >
                    {item?.Name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {loadingSubCategory ? (
        <CategoryLoading />
      ) : subCategories?.length ? (
        <div className=" p-2 border-[1px] border-[#f1f1f1] rounded-[5px] relative">
          <div className="flex gap-5 px-1">
            <div
              onClick={() =>
                setSubCategorySelected({
                  Id: 0,
                  Name: t("all"),
                })
              }
              className="w-fit flex items-center justify-center cursor-pointer"
            >
              <p
                className={`text-black whitespace-nowrap w-fit pb-1 font-medium ${
                  t("all") === subCategorySelected?.Name
                    ? "border-b-[2px] border-primary"
                    : "border-b-[2px] border-transparent"
                }`}
              >
                {t("all")}
              </p>
            </div>
            <div className="no-scrollbar flex gap-5 overflow-scroll">
              {subCategories?.map((item) => (
                <div
                  onClick={() => setSubCategorySelected(item)}
                  key={item?.Id}
                  className="w-fit flex items-center justify-center cursor-pointer"
                >
                  <p
                    className={`text-black whitespace-nowrap w-fit pb-1 font-medium ${
                      item?.Id === subCategorySelected?.Id
                        ? "border-b-[2px] border-primary"
                        : "border-b-[2px] border-transparent"
                    }`}
                  >
                    {item?.Name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
