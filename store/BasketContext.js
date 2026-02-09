import React, { useState } from "react";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

const BasketContext = React.createContext({
  // count: 0,
  basketData: [],
  deliveryMethodeData: {},
  deliveryAddressData: {},
  setBasket: () => {},
  setAddressDelivery: () => {},
  setDeliveryMethode: () => {},
});

//hf: context provider

export const BasketContextProvider = (props) => {
  const [basketData, setBasketData] = useLocalStorage(
    process.env.NEXT_PUBLIC_LS_BASKET_DATA_KEY,
    []
  );
  const [deliveryAddressData, setDeliveryAddressData] = useSessionStorage(
    process.env.NEXT_PUBLIC_SS_DELIVERY_ADDRESS_DATA_KEY,
    {}
  );
  const [deliveryMethodeData, setDeliveryMethodeData] = useSessionStorage(
    process.env.NEXT_PUBLIC_SS_DELIVERY_METHODE_DATA_KEY,
    {}
  );
  function setBasket() {
    setBasketData(
      JSON.parse(
        localStorage.getItem(process.env.NEXT_PUBLIC_LS_BASKET_DATA_KEY)
      )
    );
  }

  function setAddressDelivery() {
    setDeliveryAddressData(
      JSON.parse(
        sessionStorage.getItem(
          process.env.NEXT_PUBLIC_SS_DELIVERY_ADDRESS_DATA_KEY
        )
      )
    );
  }

  function setDeliveryMethode() {
    setDeliveryMethodeData(
      JSON.parse(
        sessionStorage.getItem(
          process.env.NEXT_PUBLIC_SS_DELIVERY_METHODE_DATA_KEY
        )
      )
    );
  }

  const basketValue = {
    basketData: basketData,
    setBasket: setBasket,
    setAddressDelivery: setAddressDelivery,
    setDeliveryMethode: setDeliveryMethode,
    deliveryAddressData: deliveryAddressData,
    deliveryMethodeData: deliveryMethodeData,
  };

  return (
    <BasketContext.Provider value={basketValue}>
      {props.children}
    </BasketContext.Provider>
  );
};

export default BasketContext;
