import { applyCoupon } from "@/services/http/cart/applyCoupon"
import React, { useState } from "react"
import { toast } from "react-toastify"
import Image from "next/image"
import { useTranslations } from "next-intl"
export default function DiscountCode({ setResendrequest }) {
  const t = useTranslations("index")
  const [disCountCode, setDescountCode] = useState("")
  const [loadingBtn, setLoadingBtn] = useState(false)
  const handleApplayCoupon = async () => {
    if (disCountCode) {
      setLoadingBtn(true)
      const response = await applyCoupon(disCountCode)
      if (response?.success) {
        toast.success(response.data?.Messages[0], {
          position: "top-center",
        })
        setLoadingBtn(false)
        setResendrequest((prev) => !prev)
      } else {
        toast.error(response?.errors, {
          position: "top-center",
        })
        setLoadingBtn(false)
      }
    } else {
      toast.error("coupon value shoul not be empty", {
        position: "top-center",
      })
    }
  }
  return (
    <div className="flex bg-white justify-between border-[2px] p-1 rounded-[10px]">
      <input
        onChange={(e) => setDescountCode(e.target.value)}
        placeholder={t("promo_code")}
        className="w-full pl-2 bg-transparent border-0 outline-none"
        type="text"
      />
      <button onClick={handleApplayCoupon} className="bg-primary text-white px-5 py-2 rounded-[10px] w-[20%]">
        {loadingBtn ? (
          // TODO replace it with jsx
          <Image width={23} height={23} src={"/assets/loading/fullWidthBtnLoading.svg"} />
        ) : (
          <p> {t("apply")}</p>
        )}
      </button>
    </div>
  )
}
