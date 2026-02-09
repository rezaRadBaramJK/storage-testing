"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useLocationPickerContext } from "@/components/LocationPicker/context";

const DynamicLocationPicker = dynamic(
  () => import("@/components/LocationPicker"),
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
);
const Maps_API_KEY = process.env.NEXT_PUBLIC_Maps_API_KEY;

const AddressPickerOnMap = ({ lat, lng }) => {
  const t = useTranslations("index");
  const isValidLat = Boolean(lat) && !Number.isNaN(+lat);
  const isValidLng = Boolean(lng) && !Number.isNaN(+lng);
  const kuwaitCityCenter = [
    isValidLat ? +lat : 29.3759,
    isValidLng ? +lng : 47.9774,
  ];
  const { address, loading, setPosition } = useLocationPickerContext();

  useEffect(() => {
    if (isValidLat && isValidLng) {
      setPosition({ lat: +lat, lng: +lng });
    }
  }, [lat, lng]);

  return (
    <div className="w-full my-8 bg-gray-100 p-7 rounded-xl shadow-lg border relative">
      <h1 className="mb-4 text-xl italic">
        {loading
          ? t("wait")
          : address?.fullAddress
          ? address?.fullAddress
          : t("select_desired_location")}
      </h1>

      <div>
        <DynamicLocationPicker
          center={kuwaitCityCenter}
          googleMapsApiKey={Maps_API_KEY}
        />
      </div>

      {loading && (
        <div className="absolute left-0 top-0 w-full h-full bg-gray-200 z-10 rounded-xl opacity-60 animate-pulse blur-xl"></div>
      )}
    </div>
  );
};

export default AddressPickerOnMap;
