import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

import { Scrollbar, Navigation } from "swiper/modules";
import SmallSizeOfProductcard from "../ProductCard/SmallSizeOfProductcard";
import ArrowLeft from "@/public/assets/jsxIcons/ArrowLeft";

export default function CategoryCarouselHomePage({ carouselData }) {
  const { locale } = useRouter();
  const isRTL = locale === "ar";
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <div className="p-2 relative my-5" dir={isRTL ? "rtl" : "ltr"}>
      <div className="items-center mb-5 justify-end gap-10 hidden lg:flex">
        <button onClick={handlePrev} className=" text-black text-2xl">
          <ArrowLeft className="w-2.5 rtl:rotate-180" />
        </button>
        <button onClick={handleNext} className=" text-black text-2xl">
          <ArrowLeft className="w-2.5 rotate-180 rtl:rotate-0" />
        </button>
      </div>
      <Swiper
        ref={sliderRef}
        key={locale}
        dir={isRTL ? "rtl" : "ltr"}
        scrollbar={{
          hide: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Scrollbar]}
        className="mySwiper no-scrollbar bg-transparent gap-5"
        slidesPerView={3.2}
        spaceBetween={8}
        breakpoints={{
          576: {
            slidesPerView: 3.2,
          },
          768: {
            slidesPerView: 6.2,
          },
          992: {
            slidesPerView: 3.2,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
        }}
      >
        {carouselData?.map((item) => (
          <SwiperSlide key={item?.Id}>
            <SmallSizeOfProductcard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
