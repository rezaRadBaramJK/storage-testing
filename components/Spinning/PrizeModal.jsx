import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import ModalBase from "../Modal/ModalBase";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function PrizeModal({ showPrize, setShowPrize, priz }) {
  const animationRef = useRef(null);
  const t = useTranslations("index");
  useEffect(() => {
    if (showPrize && animationRef.current) {
      animationRef?.current?.play();
    }
  }, [showPrize]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!");
      return true;
    } catch (err) {
      toast.error("Failed to copy:", err);
      return false;
    }
  };

  async function handleCopyDiscountCode() {
    if (priz) {
      await copyToClipboard(priz?.GiftValue);
    }
  }

  return (
    <ModalBase setShow={setShowPrize} show={showPrize}>
      <div className=" w-full lg:w-[430px] bg-root-backgroung ">
        <div className=" w-full  m-auto ">
          <div className="   w-full bg-root-backgroung absolute bottom-0 p-5 px-10 rounded-t-[30px] max-h-[90dvh] overflow-y-scroll no-scrollbar">
            {/* Close Button */}
            <button
              onClick={() => setShowPrize(false)}
              className="absolute right-5 top-2 text-[30px] font-bold cursor-pointer rotate-45"
              aria-label="Close modal"
            >
              +
            </button>

            {/* Modal Content */}
            <div className="flex flex-col justify-center mt-5 items-center gap-5 text-center">
              <p className="font-bold text-[20px]">
                You Just Won{" "}
                <span className="text-primary">{priz?.Name || "..."}</span>
              </p>

              <Player
                loop
                autoplay
                ref={animationRef}
                src="/assets/Animation.json"
                className="w-[300px] h-[200px]"
              />
              {priz?.GiftType === "Reward" && (
                <p className="w-full py-5 font-bold bg-gray-200 text-primary rounded-[10px]">
                  {priz?.Name || ""}
                </p>
              )}

              {priz?.GiftType === "Discount" && (
                <div className="w-full flex items-center gap-4">
                  <p className="w-full h-11 text-sm font-bold flex items-center justify-center bg-gray-200 text-primary rounded-[10px]">
                    {priz?.GiftValue || ""}
                  </p>
                  <button
                    className="w-full h-11 text-sm font-bold bg-primary text-white rounded-[10px]"
                    onClick={handleCopyDiscountCode}
                  >
                    {t("copy_coupon_code")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
