import React, { useContext } from "react"
import { useRouter } from "next/router"
import LoginContext from "@/store/AuthContext"
import { useTranslations } from "next-intl"
import {Check} from "lucide-react"
export default function AddressesCard({ data, activeAddress, setActiveAddress }) {
  const t = useTranslations("index")
  const router = useRouter()
  const authCtx = useContext(LoginContext)
  const handleChangeAddressRoute = () => {
    if (authCtx?.isLogin) {
      router?.push(`/dashboard/addresses/${data?.id}`)
    } else {
      router.push(`/checkout/addresses/AddressToCheckoutAsGuest/${data?.id}`)
    }
  }
  const handleCheck = (e) => {
    if (e.target?.checked) {
      setActiveAddress(data)
    }
  }
  return (
    <div className="bg-productCard-bg p-5 rounded-[10px] shadow-sm">
      <p className="font-medium">{t("delivery_address")}</p>
      <div className="flex justify-between">
        <div className="flex flex-col gap-3 mt-6">
          <p className="font-medium">{`${data?.country_name} ${data?.state_province_name}`}</p>
          <p className="font-medium">
            {t("block")} :{" "}
            {`${data?.custom_address_attributes?.filter((item) => item?.id === 5)[0]?.default_value} , ${t("street")} : ${
              data?.custom_address_attributes?.filter((item) => item?.id === 6)[0]?.default_value
            }`}
          </p>
        </div>
        <div class="inline-flex items-center">
          <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={data?.id}>
            <input
              onChange={handleCheck}
              checked={activeAddress?.id === data?.id}
              type="checkbox"
              class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border-[2px] border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-black checked:bg-transparent checked:before:bg-black "
              id={data?.id}
            />
            <span class="absolute text-black transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <Check className='w-[15px] text-white' />
            </span>
          </label>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <button onClick={handleChangeAddressRoute} className="py-2 px-5 border-[1px] border-black font-medium rounded-full">
          {t("edit_address")}
        </button>
      </div>
    </div>
  )
}
