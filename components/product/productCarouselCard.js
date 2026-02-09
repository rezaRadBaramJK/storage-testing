'use client'
import React from 'react';
import Link from "next/link";
import Image from "next/image";

const ProductCarouselCard = ({data}) => {

  return (
    <Link
      href={`/product/${(data?.SeName || data?.id)}`}
      className={`flex flex-col justify-between w-full`}
    >
      <div className="relative flex flex-col">
        {(data?.IsOutOfStock || data?.isOutOfStock) && (
          <div
            className="absolute bg-primary top-0 left-0 p-1 rounded-br-[5px] rounded-tl-[5px] z-10 text-white text-[10px]">
            {t("out-of-stuck")}
          </div>
        )}
        <div className="w-[165px] h-[165px] relative border-[1px] border-gray-Primary rounded-[10px] overflow-hidden">
          <Image
            src={data?.DefaultPictureModel?.ImageUrl || data?.defaultPictureModel?.ImageUrl}
            alt={""}
            fill
            className="transition-opacity opacity-0 duration-[.5s]"
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
        </div>
        <div className="">
          <p className="max-w-[165px] w-full text-[12px] p-2 h-[45px] line-clamp-2">
            {data?.Name || data?.name}
          </p>
        </div>
      </div>
      <p className="  text-[14px] font-bold px-2">
        {data?.ProductPrice?.Price || data?.productPrice?.Price}
      </p>
    </Link>
  );
};

export default ProductCarouselCard;