import React from "react";
import ModalBase from "./ModalBase";
import Link from "next/link";
import { Instagram, Tiktok } from "@/public/assets/jsxIcons";
export default function FollowUsModal({
  showSocialMediasModal,
  setShowSocialMediasModal,
}) {
  const SocialMedias = [
    {
      name: "Instagram",
      id: "@morgap.official",
      icon: <Instagram className="w-[34px] fill-current text-primary" />,
      link: "https://www.instagram.com/morgap.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    },
    // {
    //   name: "Tiktok",
    //   id: "@baramjk",
    //   icon: <Tiktok className="w-[34px] fill-current text-primary" />,
    //   link: "https://www.tiktok.com/",
    // },
  ];
  return (
    <ModalBase setShow={setShowSocialMediasModal} show={showSocialMediasModal}>
      <div className=" w-full lg:w-[430px] ">
        <div className=" w-full  m-auto"></div>{" "}
        <div className=" w-full  absolute bottom-0 p-5 rounded-t-[30px] max-h-[60dvh] overflow-y-scroll no-scrollbar lg:bottom-[50%] lg:translate-y-[50%] ">
          <div className="flex flex-col items-center gap-5 mb-10">
            {SocialMedias?.map((item) => (
              <div
                key={item?.name}
                className="flex gap-5 bg-productCard-bg rounded-[10px] p-2 w-[80%] relative"
              >
                <div className="w-[50px] h-[50px] bg-[#F4F4F4] rounded-[10px] flex justify-center items-center">
                  {item?.icon}
                </div>
                <div>
                  <p className="font-bold text-[16px]">{item?.name}</p>
                  <p className="text-[14px]">{item?.id}</p>
                </div>
                <Link
                  href={item?.link}
                  className="absolute top-0 w-full h-full"
                ></Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
