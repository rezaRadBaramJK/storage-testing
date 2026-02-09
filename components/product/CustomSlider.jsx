import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Heart, ChevronLeft } from "lucide-react";
import CopyButton from "./CopyButton";
import { useTranslations } from "next-intl";

export default function CustomSlider({ data, isFave, handleSwitchFave }) {
  const [activePic, setActivePic] = useState("");
  const router = useRouter();
  const onBack = () => router.back();

  const t = useTranslations("index");

  return (
    <div className="relative w-full h-auto">
      <div
        dir="ltr"
        className="absolute flex justify-between w-full p-3 bg-transparent"
      >
        <button
          onClick={onBack}
          className="text-[#03053d] z-40 flex justify-center items-center bg-white w-[28px] h-[28px] rounded-[5px] "
        >
          <ChevronLeft className="w-5" />
        </button>
        <div className="text-[#03053d] flex justify-center items-center z-40 bg-white w-[28px] h-[28px] rounded-[5px] ">
          <CopyButton />
        </div>
      </div>
      <div className="relative w-full">
        <Image
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-[330px] rounded-[5px] transition-opacity opacity-0 duration-[.5s]"
          src={activePic ? activePic : data?.defaultPictureModel?.imageUrl}
          onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          alt="slider image"
        />
        <button
          onClick={handleSwitchFave}
          className="right-3 absolute bottom-0 flex items-center justify-center p-2 mb-3 bg-white rounded-full"
        >
          {isFave ? (
            <Heart className="text-yellow-color w-5 fill-current" />
          ) : (
            <Heart className="w-5 text-black" />
          )}
        </button>
        {data?.isOutOfStock && (
          <div className="absolute bg-[#F08718E6] top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 rounded-br-[5px] rounded-tl-[5px] z-10 text-white  text-2xl text-shadow-lg">
            {t("out-of-stuck")}
          </div>
        )}
      </div>
      <div className="flex">
        {data?.pictureModels?.length > 1 ? (
          <div className="mt-1 ml-1">
            <div className="w-fit no-scrollbar flex gap-2 overflow-scroll">
              {data?.pictureModels?.map((item) => (
                <div
                  key={item?.id}
                  onClick={() => setActivePic(item?.imageUrl)}
                  className="relative w-[120px] h-[90px] cursor-pointer"
                >
                  <Image
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-[120px] h-[90px] rounded-[5px] transition-opacity opacity-0 duration-[.5s]"
                    src={item?.imageUrl}
                    onLoadingComplete={(image) =>
                      image.classList.remove("opacity-0")
                    }
                    alt="picture model"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
