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


import HomaPageSliderLoading from "../Plaseholders/HomaPageSliderLoading";
import { getHomePageBaner } from "@/services/http/baner/getBaner";
import Link from "next/link";
import { useBannerQuery } from "@/queries/banner";

export default function Slider({ rootCategorySelected }) {
  const bannerQuery = useBannerQuery(
    rootCategorySelected?.id || rootCategorySelected?.Id
  );

  const BanerImages = bannerQuery.data?.data || [];

  return (
    <div className="relative">
      {bannerQuery.isLoading ? (
        <HomaPageSliderLoading />
      ) : (
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
          <div className="lg:max-w-[1350px] lg:mx-auto">
            {BanerImages.map((item, index) => (
              <SwiperSlide key={item?.Id ? item?.Id : item?.id}>
                <div className="flex items-center justify-center relative">
                  <Image
                    width={2100}
                    height={1500}
                    alt={""}
                    src={`https://morgap44.k-pack.online/FrontendApi/${item.FileUrl}`}
                    className="transition-opacity lg:bg-cover lg:object-cover lg:max-h-[475px] opacity-0 duration-[1s]"
                    onLoadingComplete={(image) =>
                      image.classList.remove("opacity-0")
                    }
                  />
                  <Link
                    className="absolute w-full h-full"
                    href={`/categories?Categoryid=${
                      rootCategorySelected?.ParentCategoryId
                        ? rootCategorySelected?.ParentCategoryId
                        : rootCategorySelected?.Id
                    }&subCategoryid=${
                      rootCategorySelected?.Id
                        ? rootCategorySelected?.Id
                        : rootCategorySelected?.id
                    }`}
                  ></Link>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      )}
    </div>
  );
}
