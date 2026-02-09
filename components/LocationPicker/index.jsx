"use client";

import { useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap, // Import useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { useLocationPickerContext } from "./context";
import { localLang } from "@/localStorage/auth";

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center.length === 2) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

function LocationMarker({ googleMapsApiKey }) {
  const {
    setAddress,
    setLoading,
    handleResetLocation,
    address,
    setPosition,
    position,
  } = useLocationPickerContext();

  function findAddressComponent(addressComponents, componentName) {
    return (
      addressComponents.find((a) => {
        return a.types, a.types.includes(componentName);
      })?.long_name || ""
    );
  }

  async function handleFindLocation(lat, lng) {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}&language=${localLang.get()}`
      );

      if (response.data.results?.length > 0) {
        const fetchedAddress = response.data.results[0];
        const country = findAddressComponent(
          fetchedAddress.address_components,
          "country"
        );
        const area1 = findAddressComponent(
          fetchedAddress.address_components,
          "sublocality_level_1"
        );
        const area2 = findAddressComponent(
          fetchedAddress.address_components,
          "locality"
        );
        const block = findAddressComponent(
          fetchedAddress.address_components,
          "sublocality"
        );
        const street = findAddressComponent(
          fetchedAddress.address_components,
          "route"
        );

        setAddress({
          fullAddress: fetchedAddress.formatted_address,
          area: area1 !== "" ? area1 : area2,
          block,
          street,
          country,
        });
      } else {
        handleResetLocation();
        setAddress("Address not found for this location.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      handleResetLocation();
      setAddress("Error fetching address.");
    } finally {
      setLoading(false);
    }
  }

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });

      // handleFindLocation(lat, lng);
    },
  });

  useEffect(() => {
    if (position?.lat != null && position?.lng != null) {
      handleFindLocation(position.lat, position.lng);
    }
  }, [position]);


  return position === null ? null : (
    <Marker position={position} icon={L.icon({ iconUrl: "/marker-icon.png" })}>
      {<Popup>{address?.fullAddress}</Popup>}
    </Marker>
  );
}

export default function LocationPicker({
                                         onLocationPicked,
                                         center,
                                         googleMapsApiKey,
                                       }) {
  const { position, setPosition } = useLocationPickerContext();
  const initialCenter = useMemo(
    () => center || [51.505, -0.09],
    [center]
  );

  useEffect(() => {
    if (center && center.length === 2 && !position) {
      setPosition({ lat: center[0], lng: center[1] });
    }
  }, [center, position, setPosition]);


  useEffect(() => {
    if (typeof window !== "undefined") {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "leaflet/images/marker-icon-2x.png",
        iconUrl: "leaflet/images/marker-icon.png",
        shadowUrl: "leaflet/images/marker-shadow.png",
      });
    }
  }, []);

  return (
    <MapContainer
      center={initialCenter}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%", zIndex: 10 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        onLocationPick={onLocationPicked}
        googleMapsApiKey={googleMapsApiKey}
      />
      <ChangeView center={position ? [position.lat, position.lng] : initialCenter} zoom={18} />
    </MapContainer>
  );
}