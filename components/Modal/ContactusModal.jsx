import React from "react";
import ModalBase from "./ModalBase";
import { Call, Email } from "@/public/assets/jsxIcons";

export default function ContactusModal({
  showContactModal,
  setShowContactModal,
}) {
  const contact = [
    // {
    //   name: "Send Email",
    //   id: "*******@baramgk.com",
    //   icon: <Email className="w-[44px]" />,
    // },
    {
      name: "Call Us",
      id: "+965-65841184",
      icon: <Call className="w-[44px] text-primary" />,
    },
    // {
    //   name: "Call Us",
    //   id: "98031030",
    //   icon: <Call className="w-[44px] text-primary" />,
    // },
  ];
  return (
    <ModalBase setShow={setShowContactModal} show={showContactModal}>
      <div className=" w-full lg:w-[430px] ">
        <div className=" w-full m-auto"></div>{" "}
        <div className=" w-full  absolute bottom-0 lg:bottom-[50%] lg:translate-y-[50%]  p-5 rounded-t-[30px] max-h-[60dvh] overflow-y-scroll no-scrollbar">
          <div className="flex flex-col items-center gap-5 mb-10">
            {contact?.map((item) => (
              <div
                key={item?.name}
                className="flex gap-5 bg-productCard-bg rounded-[10px] p-2 w-[80%]"
              >
                <div className="w-[50px] text-primary h-[50px] bg-[#F4F4F4] rounded-[10px] flex justify-center items-center">
                  {item?.icon}
                </div>
                <div>
                  <p className="font-bold text-[16px]">{item?.name}</p>
                  <p className="text-[14px]">{item?.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
