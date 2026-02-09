import React, { useState } from "react";
import Link from "next/link";
import RemoveConfirmation from "@/components/Modal/RemoveConfirmation";
import { deletAddressById } from "@/services/http/addresses/deleteAddress";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
export default function Addresscard({ data, setResendRequest }) {
  const t = useTranslations("index");
  const [showModal, setShowModal] = useState(false);
  const handleDeletAddress = async () => {
    const response = await deletAddressById(data?.id);
    if (response?.success) {
      toast?.success("address deleted successfully", {
        position: "top-center",
      });
      setShowModal(false);
      setResendRequest((prev) => !prev);
    }
  };
  return (
    <>
      <div className=" bg-white flex flex-col gap-2 rounded-[10px] p-4">
        <div className="flex items-center gap-1 font-bold">
          <p>{t("governate")}: </p>
          <p className="font-normal">{data?.country_name}</p>
        </div>
        <div className="flex items-center gap-1 font-bold">
          <p>{t("area")}: </p>
          <p className="font-normal">{data?.state_province_name}</p>
        </div>
        <div className="flex items-center gap-1 font-bold">
          <p>{t("block")}: </p>
          <p className="font-normal">
            {
              data?.custom_address_attributes?.filter(
                (item) => item?.id === 7
              )[0]?.default_value
            }
          </p>
        </div>
        <div className="flex items-center gap-1 font-bold">
          <p>{t("floor")}: </p>
          <p className="font-normal">
            {
              data?.custom_address_attributes?.filter(
                (item) => item?.id === 3
              )[0]?.default_value
            }
          </p>
        </div>
        <div className="flex items-center gap-1 font-bold">
          <p>{t("street")}: </p>
          <p className="font-normal">
            {
              data?.custom_address_attributes?.filter(
                (item) => item?.id === 8
              )[0]?.default_value
            }
          </p>
        </div>
        <div className="flex justify-center gap-8 mt-5">
          <button className="w-[40%] py-2 text-primary border-[2px] border-primary rounded-full">
            <Link
              className="w-full h-full"
              href={`/dashboard/addresses/${data?.id}`}
            >
              {t("edit_address")}
            </Link>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="w-[40%] py-2 text-white  bg-red-600 rounded-full"
          >
            {t("delete")}
          </button>
        </div>
      </div>
      <RemoveConfirmation
        action={handleDeletAddress}
        setShowModal={setShowModal}
        showModal={showModal}
        title={"Remove Address"}
        text={"Are You Sure About Remove this Address"}
      />
    </>
  );
}
