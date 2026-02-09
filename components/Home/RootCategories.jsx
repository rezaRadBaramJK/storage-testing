import React from "react";
import { useTranslations } from 'next-intl';

export default function RootCategories({
  setRootCategorySelected,
  rootCategorySelected,
  rootCategories,
}) {
  const t = useTranslations('index');

  return (
    <div className="mt-3 p-2 border-[1px] border-[#f1f1f1] rounded-[5px] relative">
      <div className="flex gap-5 px-5">
        <div className="flex justify-center items-center w-fit">
          <p className="text-black border-b-[2px] border-primary w-fit pb-1 font-medium">
            {t('filter-all')}
          </p>
        </div>
        <div className="flex gap-5 overflow-scroll no-scrollbar">
          {rootCategories?.map((item) => (
            <div key={item.id} className="flex justify-center items-center w-fit">
              <p className="text-black whitespace-nowrap border-b-[2px] border-transparent w-fit pb-1 font-medium">
                {item?.Name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
