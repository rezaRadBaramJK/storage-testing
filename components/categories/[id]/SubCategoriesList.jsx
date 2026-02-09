import React from "react";
import Image from "next/image";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
// import required modules
import { Scrollbar } from "swiper/modules";
import SubCategoryLoading from "@/components/Plaseholders/SubCategoryLoading";

export default function SubCategoriesList({ categories, loading, rootcatId }) {
  return (
    <div className="p-2 py-4 shadow-sm rounded-[10px] ">
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper no-scrollbar bg-transparent gap-5 w-full"
        slidesPerView={3}
        spaceBetween={8}
        breakpoints={{
          576: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 3,
          },
        }}
      >
        {loading ? (
          <>
            <SwiperSlide>
              <SubCategoryLoading />
            </SwiperSlide>
            <SwiperSlide>
              <SubCategoryLoading />
            </SwiperSlide>
            <SwiperSlide>
              <SubCategoryLoading />
            </SwiperSlide>
            <SwiperSlide>
              <SubCategoryLoading />
            </SwiperSlide>
          </>
        ) : (
          categories?.map((item) => (
            <SwiperSlide key={item?.Id}>
              <div className="flex flex-col justify-center items-center gap-3 relative">
                <Image
                  width={100}
                  height={100}
                  className="rounded-full"
                  src={item?.PictureModel?.ImageUrl}
                />
                <p className="text-nowrap text-[12px] font-bold">
                  {item?.Name}
                </p>
                <Link
                  className="absolute w-full h-full"
                  href={`/categories/subCategory/${item?.Id}`}
                ></Link>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}
