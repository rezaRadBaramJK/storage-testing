import React from "react"
import {Check} from "lucide-react";

export default function ShippingCard({ data, setActiveShippingMethode, activeShippingMethode, className }) {
  const handleCheck = (e) => {
    if (e.target?.checked) {
      setActiveShippingMethode(data)
    }
  }
  return (
    <div className={`shadow-sm p-5 rounded-[10px] ${data?.id === activeShippingMethode?.id ? "shadow-sm bg-primary text-white " : "bg-white text-black"} ${className}`}>
      <div className="flex justify-between items-center">
        <p className="font-bold">{data?.name}</p>
        <div class="inline-flex items-center">
          <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={data?.id}>
            <input
              onChange={handleCheck}
              checked={activeShippingMethode?.id === data?.id}
              type="checkbox"
              class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border-[2px] border-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-white checked:bg-transparent checked:before:bg-white "
              id={data?.id}
            />
            <span class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <Check className='w-[15px] text-white' />
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}
