import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { removeFromFavioriets } from "@/services/http/products/removeFromFave";
import { toast } from "react-toastify";
import RemoveConfirmation from "@/components/Modal/RemoveConfirmation";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
export default function FavCard({ data, setResendRequest }) {
  const [showRemoveFromFaveModal, setShowRemoveFromFaveModal] = useState(false);
  const t = useTranslations("index");
  const handleRemoveFromFave = async () => {
    const response = await removeFromFavioriets(data?.Id);
    if (response?.success) {
      setResendRequest((prev) => !prev);
      setShowRemoveFromFaveModal(false);
    } else {
      toast.error(response?.error);
    }
  };
  return (
    <div className="relative">
      <div>
        <div className="p-1 rounded-[10px]  bg-productCard-bg w-full ">
          <div className="relative">
            {data?.IsOutOfStock && (
              <div className="absolute bg-primary top-0 left-0 p-1 rounded-br-[5px] rounded-tl-[5px] z-10 text-white text-[12px]">
                {t("out-of-stuck")}
              </div>
            )}
            <Image
              width="0"
              height="0"
              sizes="100vw"
              className="w-[400px] h-[190px] rounded-[5px] transition-opacity opacity-0 duration-[.5s]"
              src={data?.DefaultPictureModel?.ImageUrl}
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            />

            <button
              onClick={() => setShowRemoveFromFaveModal(true)}
              className="absolute bg-white rounded-full flex justify-center items-center  p-2  right-3 bottom-0 mb-3 "
            >
              <Heart className="w-5 fill-current text-yellow-color" />
            </button>
          </div>
          <div className="mt-2 text-center">
            <p className="text-[14px] p-2 h-[50px]">
              {data?.Name?.length > 40
                ? `${data?.Name.slice(0, 40)}...`
                : data?.Name}
            </p>
          </div>
          <p className="my-3 text-center text-[16px] font-bold">
            {data?.ProductPrice?.Price}
          </p>
        </div>
      </div>
      {/* <Link
        className="absolute top-0 w-full h-full z-1"
        href={`/product/${data?.Id}`}
      ></Link> */}
      <RemoveConfirmation
        title={t("removeFavTitle")}
        text={t('removeFavMessage')}
        action={handleRemoveFromFave}
        showModal={showRemoveFromFaveModal}
        setShowModal={setShowRemoveFromFaveModal}
      />
    </div>
  );
}
