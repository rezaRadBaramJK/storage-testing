import { createContext, useContext, useState } from "react";

const context = createContext(null);

/**
 * @returns {{
 *   loading: boolean,
 *   setLoading: React.Dispatch<React.SetStateAction<boolean>>,
 *   address: {
 *     fullAddress: string,
 *     area: string,
 *     block: string,
 *     street: string,
 *     country: string
 *   },
 *   setAddress: React.Dispatch<React.SetStateAction<{
 *     fullAddress: string,
 *     area: string,
 *     block: string,
 *     street: string,
 *     country: string,
 *   }>>
 *   handleResetLocation: React.Dispatch
 *   position: {
 *     lat: number,
 *     lng: number,
 *   } | null
 *   setPosition: (position: {lat: number,lng: number}) => void
 * }}
 */
export function useLocationPickerContext() {
  const c = useContext(context);

  if (!c) {
    throw new Error(
      "You should wrap this component into LocationPickerProvider"
    );
  }

  return c;
}

const initialAddress = {
  fullAddress: "",
  area: "",
  block: "",
  street: "",
};

export default function LocationPickerProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const [position, setPosition] = useState(null);

  function handleResetLocation() {
    setAddress({ ...initialAddress });
  }

  return (
    <context.Provider
      value={{
        loading,
        setLoading,
        address,
        setAddress,
        handleResetLocation,
        setPosition,
        position,
      }}
    >
      {children}
    </context.Provider>
  );
}
