import { spinningsLeft } from "@/services/http/spinning/SpingLeft";
import { spinningWheel } from "@/services/http/spinning/spinningWheel";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalBase from "../Modal/ModalBase";
import Wheel from "./Wheel";
import Image from "next/image";
import SpinnerLoading from "./SpinnerLoading";
import { useTranslations } from "next-intl";

export default function index({
  showSpin,
  setShowSpin,
  setPrize,
  setShowPrize,
}) {
  const [remainingSpin, setRemainingSpin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const t = useTranslations('index');

  useEffect(() => {
    const getData = async () => {
      const response = await spinningWheel();
      if (response?.success) {
        response?.data?.map((item) =>
          setData((prev) => [
            ...prev,
            {
              Id: item?.Id,
              option: item?.Name,
              style: {
                backgroundColor: item?.Color,
                textColor: "white",
                textAlign: "end",
              },
            },
          ])
        );
        setLoading(false);
      } else {
        toast.error(response?.error, { position: "top-center" });
      }
    };
    if (remainingSpin) {
      getData();
    }
  }, [remainingSpin]);
  useEffect(() => {
    const getSpinningLeft = async () => {
      const response = await spinningsLeft();
      if (response?.success) {
        setRemainingSpin(response?.data?.left);
      }
    };
    getSpinningLeft();
  }, []);

  return (
    <ModalBase setShow={setShowSpin} show={showSpin}>
      <div className=" w-full lg:w-[430px] bg-root-backgroung ">
        <div className=" w-full  m-auto ">
          <div className="   w-full bg-root-backgroung absolute bottom-0 p-5 px-10 rounded-t-[30px] max-h-[90dvh] overflow-y-scroll no-scrollbar">
            <div
              onClick={() => setShowSpin(false)}
              className="rotate-45 absolute right-5 top-2 text-[30px] font-bold cursor-pointer "
            >
              +
            </div>
            {loading ? (
              <SpinnerLoading />
            ) : remainingSpin > 0 ? (
              <div className="px-10 flex justify-center items-center gap-10 flex-col ">
                <Wheel
                  setPrize={setPrize}
                  setShowPrize={setShowPrize}
                  setShowSpin={setShowSpin}
                  left={remainingSpin}
                  data={data}
                />
              </div>
            ) : (
              <div className="p-5 bg-root-backgroung flex justify-center items-center flex-col gap-5">
                <Image
                  width={200}
                  height={150}
                  src={"/assets/staticImages/YouCanTryLater.svg"}
                />
                <div className="text-center flex flex-col gap-3">
                  <p className="font-bold text-[20px] text-wrap">Oh No !</p>
                  <p className="font-medium text-[14px] ">You Can Try Later</p>
                </div>
              </div>
            )}
            <p className="text-red-600 text-center text-[12px]">{t('spinning-attempts-left')}</p>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
