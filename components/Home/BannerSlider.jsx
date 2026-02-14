import React from "react";
import HomaPageSliderLoading from "@/components/Plaseholders/HomaPageSliderLoading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

const BannerSlider = ({ loading, banners }) => {
  return (
    <div className="relative">
      {loading ? (
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
            {banners.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center relative">
                  <Image
                    width={2100}
                    height={1500}
                    src={`https://storage.k-pack.online/FrontendApi/${item.FileUrl}`}
                    alt={""}
                    className="transition-opacity lg:bg-cover lg:object-cover lg:max-h-[475px] opacity-0 duration-[1s]"
                    onLoadingComplete={(image) =>
                      image.classList.remove("opacity-0")
                    }
                  />
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      )}
    </div>
  );
};

export default BannerSlider;
