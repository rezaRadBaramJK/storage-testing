import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
// import required modules
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { useTranslations } from 'next-intl';

export default function Onboarding({ setShow }) {
  const t = useTranslations('index');

  return (
    <div className=" w-full flex bg-root-backgroung justify-center items-center">
      <div className="w-full  ">
        <div className="w-full relative">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            effect="fade"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            loop
            modules={[Autoplay, Pagination, EffectFade]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="flex justify-center items-center">
                <Image
                  width={900}
                  height={500}
                  src={`/assets/staticImages/banner 1.jpg`}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center">
                <Image
                  width={900}
                  height={500}
                  src={`/assets/staticImages/banner 2.jpg`}
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="flex flex-col justify-center gap-10 mt-10">
          <p className="text-primary text-center font-bold">{t('onboarding-tagline')}</p>
          <p className="text-red-600 text-center text-[12px]">{t('spinning-attempts-left')}</p>
          <button
            onClick={() => setShow(false)}
            className="bg-primary text-white py-3 w-[80%] rounded-full border-[1px] border-primary m-auto"
          >
            {t('button-shop-now')}
          </button>
        </div>
      </div>
    </div>
  );
}
