import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar, Autoplay } from "swiper/modules";
import Link from "next/link";
import ProductCard from "../ProductCard";
import ProductCardLoading from "../Plaseholders/ProductCardLoading";
import { useTranslations } from "next-intl";
export default function Index({
  carouselData,
  fromProductDetails,
  loading,
  fromDetails,
}) {
  const t = useTranslations("index");
  const router = useRouter();
  const { locale } = router;
  return (
    <div className="relative mt-2 mb-5">
      <div className="flex items-center justify-between px-2">
        <p className="text-[18px] font-semibold text-root-text">
          {/* {fromDetails ? fromDetails : data?.Title} */}
          {!fromProductDetails
            ? carouselData?.Name
            : carouselData?.length
            ? "Related Products"
            : ""}
        </p>
        {!fromProductDetails && (
          <Link
            href={`/${locale}/carousel/${carouselData?.Id}`}
            className="text-root-text text-[14px] font-bold"
          >
            {t("view_all")}
          </Link>
        )}
      </div>

      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar, Autoplay]}
        className="mySwiper no-scrollbar gap-5 bg-transparent"
        slidesPerView={2.2}
        spaceBetween={8}
        breakpoints={{
          576: {
            slidesPerView: 2.2,
          },
          768: {
            slidesPerView: 4.2,
          },
          992: {
            slidesPerView: 2.2,
          },
        }}
      >
        {loading ? (
          <>
            <SwiperSlide>
              <ProductCardLoading />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCardLoading />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCardLoading />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCardLoading />
            </SwiperSlide>
          </>
        ) : !fromProductDetails ? (
          carouselData?.Products?.map((item) => (
            <SwiperSlide key={item?.Id}>
              <ProductCard data={item} />
            </SwiperSlide>
          ))
        ) : (
          carouselData?.map((item) => (
            <SwiperSlide key={item?.Id}>
              <ProductCard data={item} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}
