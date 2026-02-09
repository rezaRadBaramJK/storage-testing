import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations } from 'next-intl';

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar } from "swiper/modules";

export default function SubCategories({
  setSubCategorySelected,
  subCategorySelected,
}) {
  const t = useTranslations('index');

  return (
    <div className="mt-3 p-2 border-[1px] border-[#f1f1f1] rounded-[5px] relative">
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper no-scrollbar bg-transparent"
        slidesPerView={4}
        spaceBetween={15}
        breakpoints={{
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 4,
          },
        }}
      >
        <SwiperSlide>
          <div className="flex justify-center items-center cursor-pointer">
            <p className="text-black border-b-[2px] border-primary w-fit pb-1 font-medium ">
              {t('filter-all')}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center">
            <p className="text-black border-b-[2px] border-transparent w-fit pb-1 font-medium">
              {t('filter-m-category')}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center">
            <p className="text-black border-b-[2px] border-transparent w-fit pb-1 font-medium">
              {t('filter-m-category')}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center">
            <p className="text-black border-b-[2px] border-transparent w-fit pb-1 font-medium">
              {t('filter-m-category')}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center">
            <p className="text-black border-b-[2px] border-transparent w-fit pb-1 font-medium">
              {t('filter-m-category')}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center">
            <p className="text-black border-b-[2px] border-transparent w-fit pb-1 font-medium">
              {t('filter-m-category')}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center">
            <p className="text-black border-b-[2px] border-transparent w-fit pb-1 font-medium">
              {t('filter-m-category')}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center">
            <p className="text-black border-b-[2px] border-transparent w-fit pb-1 font-medium">
              {t('filter-m-category')}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center">
            <p className="text-black border-b-[2px] border-transparent w-fit pb-1 font-medium">
              {t('filter-m-category')}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center">
            <p className="text-black border-b-[2px] border-transparent w-fit pb-1 font-medium">
              {t('filter-m-category')}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center">
            <p className="text-black border-b-[2px] border-transparent w-fit pb-1 font-medium">
              {t('filter-m-category')}
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
