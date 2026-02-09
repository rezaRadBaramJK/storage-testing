import React from "react";
import { useLocalStorage } from "usehooks-ts";

const LanguageContext = React.createContext({
  localLang: null,
  setLocalLang: () => {},
});

export const LanguageContextProvider = (props) => {
  const [localLang, setLocalLang] = useLocalStorage("localLang", null);

  const value = {
    localLang,
    setLocalLang
  };

  return (
    <LanguageContext.Provider value={value}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
