import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar } from "swiper/modules";
import Link from "next/link";
import ProductCard from "../ProductCard";

export default function CarouselInProductDetails({ carouselData }) {
  return (
    <div className="p-2 relative my-5">
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper no-scrollbar bg-transparent gap-5"
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
        {carouselData?.map((item) => (
          <SwiperSlide key={item?.Id}>
            <ProductCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
