"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useRouter } from "next/router";
import ProductCarouselCard from "./productCarouselCard";

const ProductCarousel = ({ products, title, containerClassName }) => {
  const { locale } = useRouter();
  const isRTL = locale === "ar";
  return (
    <div className={`w-full h-[250px] ${containerClassName}`}>
      <p className="mb-2 text-xl font-bold">{title}</p>
      <Swiper
        dir={isRTL ? "rtl" : "ltr"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper !w-full !h-full no-scrollbar bg-transparent gap-5"
        slidesPerView={2}
        spaceBetween={8}
        breakpoints={{
          420: {
            slidesPerView: 2.5,
          },
          576: {
            slidesPerView: 3.2,
          },
          768: {
            slidesPerView: 3.5,
          },
          860: {
            slidesPerView: 4.5,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
        }}
      >
        {products?.map((product) => (
          <SwiperSlide key={product?.id}>
            <ProductCarouselCard data={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
