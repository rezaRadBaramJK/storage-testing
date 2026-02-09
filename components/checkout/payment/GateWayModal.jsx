import ModalBase from "@/components/Modal/ModalBase";
import React, { useState } from "react";
import Image from "next/image";
import { setGateway } from "@/services/http/checkout/setGateways";
import { useTranslations } from "next-intl";
import GatewayCardLoading from "@/components/Plaseholders/GatewayCardLoading";
import { Check } from "lucide-react";

export default function GateWayModal({
  showGatewaysModal,
  setShowGatewaysModal,
  onlineGateways,
  handleSubbmitOrder,
  loadingGateway,
}) {
  const t = useTranslations("index");
  const [selectedGateway, setSelectedGateway] = useState({});
  const setGateways = async () => {
    const response = await setGateway(selectedGateway?.Id);
    if (response?.success) {
      handleSubbmitOrder();
    }
  };
  return (
    <ModalBase setShow={setShowGatewaysModal} show={showGatewaysModal}>
      <div className=" w-full lg:w-[430px] bg-root-backgroung ">
        <div className=" w-full m-auto">
          <div className=" w-full bg-root-backgroung absolute bottom-0 lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] p-5 lg:rounded-[30px] rounded-t-[30px] max-h-[60dvh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col gap-4 pb-[140px]">
              {loadingGateway ? (
                <GatewayCardLoading />
              ) : (
                onlineGateways?.map((item) => (
                  <label htmlFor={item?.Id} className="flex justify-between">
                    <div className="flex items-center gap-5" key={item?.Id}>
                      <Image width={65} height={20} src={item?.ImageUrl} />
                      <p className="font-medium">{item?.Name}</p>
                    </div>
                    <div class="inline-flex items-center">
                      <label
                        class="relative flex items-center p-3 rounded-full cursor-pointer"
                        //   htmlFor={data?.id}
                      >
                        <input
                          onChange={(e) => {
                            if (e.target?.checked) {
                              setSelectedGateway(item);
                            }
                          }}
                          checked={selectedGateway?.Id === item?.Id}
                          type="checkbox"
                          class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border-[2px] border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-black checked:bg-transparent checked:before:bg-black "
                          id={item?.Id}
                        />
                        <span class="absolute text-black transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <Check className="w-[15px]" />
                        </span>
                      </label>
                    </div>
                  </label>
                ))
              )}
            </div>
            <div className="w-full  lg:w-[430px] fixed p-5 bottom-0 left-[50%] translate-x-[-50%] bg-root-backgroung">
              <button
                onClick={setGateways}
                className="bg-primary w-full py-3 text-white rounded-full"
              >
                {t("submit")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
