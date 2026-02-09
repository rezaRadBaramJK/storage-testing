import React from "react";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

const LoginContext = React.createContext({
  isLogin: false,
  userData: {},
  toggleLogin: () => {},
  setUserinfo: () => {},
  ageConfirmationSetter: () => {},
  guestCheckoutAgeConfirmationSetter: () => {},
  reOrderPopupSetter: () => {},
  showOrderPopup: false,
  ageConfirmation: false,
  guestCheckoutAgeConfirmation: false,
});

//hf: context provider

export const LoginContextProvider = (props) => {
  const [isLogin, setIsLogin] = useLocalStorage(
    process.env.NEXT_PUBLIC_LS_IS_LOGIN_KEY,
    false
  );
  const [userData, setUserData] = useLocalStorage(
    process.env.NEXT_PUBLIC_LS_USER_DATA_KEY,
    {}
  );
  const [ageConfirmation, setAgeConfirmation] = useLocalStorage(
    process.env.NEXT_PUBLIC_LS_AGE_CONFIRMATION_KEY
  );

  const [guestCheckoutAgeConfirmation, setGuestCheckoutAgeConfirmation] = useLocalStorage(
    process.env.NEXT_PUBLIC_LS_GUEST_CHECKOUT_AGE_CONFIRMATION_KEY
  );

  const [showOrderPopup, setShowOrderPopup] = useSessionStorage(
    process.env.NEXT_PUBLIC_SS_ORDER_MODAL_KEY
  );
  function toggleLogin(state) {
    setIsLogin(state);
    setUserData(
      JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_LS_USER_DATA_KEY))
    );
  }
  function setUserinfo() {
    setUserData(
      JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_LS_USER_DATA_KEY))
    );
  }
  function ageConfirmationSetter() {
    setAgeConfirmation(
      JSON.parse(
        localStorage.getItem(process.env.NEXT_PUBLIC_LS_AGE_CONFIRMATION_KEY)
      )
    );
  }

  function guestCheckoutAgeConfirmationSetter() {
    setGuestCheckoutAgeConfirmation(
      JSON.parse(
        localStorage.getItem(process.env.NEXT_PUBLIC_LS_GUEST_CHECKOUT_AGE_CONFIRMATION_KEY)
      )
    );
  }

  function reOrderPopupSetter() {
    setShowOrderPopup(
      JSON.parse(
        sessionStorage.getItem(process.env.NEXT_PUBLIC_SS_ORDER_MODAL_KEY)
      )
    );
  }
  const loginValue = {
    isLogin: isLogin,
    userData: userData,
    toggleLogin: toggleLogin,
    setUserinfo: setUserinfo,
    ageConfirmationSetter: ageConfirmationSetter,
    guestCheckoutAgeConfirmationSetter: guestCheckoutAgeConfirmationSetter,
    ageConfirmation: ageConfirmation,
    guestCheckoutAgeConfirmation: guestCheckoutAgeConfirmation,
    reOrderPopupSetter: reOrderPopupSetter,
    showOrderPopup: showOrderPopup,
  };

  return (
    <LoginContext.Provider value={loginValue}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
