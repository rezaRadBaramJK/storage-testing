import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import Image from "next/image";

export default function CategoriesCarousel({
  carouselData,
  selectedCategories,
  setSelectedCategories,
  loadingCategories,
  loadingSubCategories,
  setSelectedSubCategories,
  subCategoryCarouselData,
  selectedSubCategories,
}) {
  const router = useRouter();

  // Sync selectedCategories and selectedSubCategories with URL query
  useEffect(() => {
    if (router?.query?.Categoryid) {
      const cat = carouselData?.find(
        (cat) => cat.Id == router.query.Categoryid
      );
      if (cat) setSelectedCategories(cat);
    }
    if (router?.query?.subCategoryid) {
      const subCat = subCategoryCarouselData?.find(
        (sub) => sub.Id == router.query.subCategoryid
      );
      if (subCat) setSelectedSubCategories(subCat);
    }
  }, [router.query, carouselData, subCategoryCarouselData]);

  const updateQuery = (catId, subCatId = null) => {
    const query = { ...router.query };
    query.Categoryid = catId;
    if (subCatId !== null) query.subCategoryid = subCatId;
    else if (catId !== query?.Categoryid) delete query.subCategoryid;
    router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });
  };

  const renderCategorySlide = (data, isSelected, onClick, isSub = false) => (
    <SwiperSlide key={data?.Id}>
      <div
        onClick={() => {
          onClick(data);
          if (isSub) updateQuery(selectedCategories?.Id, data?.Id);
          else updateQuery(data?.Id);
        }}
        className="flex flex-col w-full relative"
      >
        <div
          className={`relative border-[1px] rounded-[10px] ${
            isSelected ? "border-primary" : "border-gray-Primary"
          }`}
        >
          <Image
            width={400}
            height={170}
            className="rounded-[10px] transition-opacity opacity-0 duration-[.5s]"
            src={data?.PictureModel?.ImageUrl}
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            alt={data?.Name}
          />
        </div>
        <p className="text-[12px] p-2 h-[45px] text-center font-bold">
          {data?.Name?.length > 25
            ? `${data?.Name.slice(0, 25)}...`
            : data?.Name}
        </p>
      </div>
    </SwiperSlide>
  );

  const renderSkeleton = (count, width, height) =>
    Array.from({ length: count }).map((_, index) => (
      <SwiperSlide key={index}>
        <div className="flex flex-col gap-3">
          <div
            className={`relative border-[1px] rounded-[10px] bg-gray-300`}
            style={{
              minWidth: `${width}`,
              minHeight: `${height}`,
            }}
          />
          <p className="text-[12px] p-1 text-center font-bold h-1 bg-gray-300" />
        </div>
      </SwiperSlide>
    ));

  return (
    <div className="p-2 relative my-5">
      {/* Root Categories Carousel */}
      <Swiper
        scrollbar={{ hide: true }}
        modules={[Scrollbar]}
        className="mySwiper no-scrollbar bg-transparent gap-5"
        slidesPerView={3.2}
        spaceBetween={8}
        breakpoints={{
          576: { slidesPerView: 3.2 },
          768: { slidesPerView: 6.2 },
          992: { slidesPerView: 3.2 },
        }}
      >
        {loadingCategories
          ? renderSkeleton(4, "120px", "120px")
          : carouselData?.map((cat) =>
              renderCategorySlide(
                cat,
                selectedCategories?.Id === cat?.Id,
                setSelectedCategories
              )
            )}
      </Swiper>

      {/* Sub Categories Carousel */}
      <Swiper
        scrollbar={{ hide: true }}
        modules={[Scrollbar]}
        className="mySwiper no-scrollbar bg-transparent gap-5 mt-4"
        slidesPerView={4.8}
        spaceBetween={8}
        breakpoints={{
          576: { slidesPerView: 4.5 },
          768: { slidesPerView: 8.5 },
          992: { slidesPerView: 4.5 },
        }}
      >
        {loadingSubCategories
          ? renderSkeleton(4, "80px", "80px")
          : subCategoryCarouselData?.map((sub) =>
              renderCategorySlide(
                sub,
                selectedSubCategories?.Id === sub?.Id,
                setSelectedSubCategories,
                true
              )
            )}
      </Swiper>
    </div>
  );
}
