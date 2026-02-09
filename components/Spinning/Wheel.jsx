import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { spin } from "@/services/http/spinning/Spin";
import PrizeModal from "./PrizeModal";
const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

export default ({
  data,
  left,
  setShowSpin,
  showPrize,
  setShowPrize,
  setPrize,
}) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = async () => {
    if (!mustSpin) {
      const response = await spin();
      if (response?.success) {
        setPrizeNumber(
          data.findIndex((item) => item?.Id == response?.data?.GiftId)
        );
        setMustSpin(true);
        setPrize(response?.data);
      }
    }
  };
  const stopSpin = () => {
    setMustSpin(false);
    setShowSpin(false);
    setShowPrize(true);
  };
  return (
    <>
      <div className="relative text-center" dir={"ltr"}>
        <Wheel
          pointerProps={{
            style: {
              width: "13%",
              display: "none",
            },
          }}
          onStopSpinning={stopSpin}
          fontSize={18}
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          // outerBorderWidth={5}
          radiusLineColor="white"
          radiusLineWidth={4}
          outerBorderColor="white"
          innerBorderWidth={70}
          innerBorderColor="white"
          // onStopSpinning={() => {
          //   setMustSpin(false);
          // }}
        />
        <div className="w-[80px] h-[80px] rounded-full absolute bg-black top-[50%] left-[50%] z-10 translate-x-[-50%] translate-y-[-50%]">
          <Image
            className="m-auto absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"
            width={30}
            height={30}
            src={"/assets/icons/pointer.svg"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-center text-nowrap">
          Unlock The Free Puffs & Discount
        </p>
        <p className="text-center text-[14px]">Spin The Jdi Puffs Wheel</p>
        <p className="text-red-600 text-center text-[12px]">
          You Have {left} More Spin
        </p>
        <button
          className="text-white bg-[#58C278] w-[100px] py-3 m-auto rounded-[10px]"
          onClick={handleSpinClick}
        >
          SPIN
        </button>
      </div>
    </>
  );
};
