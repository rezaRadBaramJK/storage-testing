const initLocalStorageApi = (key) => ({
  get: () =>
    typeof window !== "undefined" ? window.localStorage.getItem(key) : false,
  set: (newValue) =>
    typeof window !== "undefined"
      ? window.localStorage.setItem(key, newValue)
      : false,
  remove: () => localStorage.removeItem(key),
});
const initSessionStorageApi = (key) => ({
  get: () =>
    typeof window !== "undefined" ? window.sessionStorage.getItem(key) : false,
  set: (newValue) =>
    typeof window !== "undefined"
      ? window.sessionStorage.setItem(key, newValue)
      : false,
  remove: () => sessionStorage.removeItem(key),
});
const LS_PREFIX = process.env.NEXT_PUBLIC_LS_PREFIX;
const withPrefix = (key) => `${LS_PREFIX}${key}`;
export const refreshTokenLS = initLocalStorageApi(withPrefix("refreshToken"));
export const accessTokenLs = initLocalStorageApi(withPrefix("accessToken"));
export const userData = initLocalStorageApi(withPrefix("userData"));
export const isLogin = initLocalStorageApi(withPrefix("isLogin"));
export const basketDataLs = initLocalStorageApi(withPrefix("basketData"));
export const deliveryAddressData = initSessionStorageApi(
  withPrefix("DeliveryAddressData")
);
export const deliveryMethodeData = initSessionStorageApi(
  withPrefix("DeliveryMethodeData")
);
export const localLang = initLocalStorageApi("locallang");
export const Currency = initLocalStorageApi("Currency");
export const ageConfirmation = initLocalStorageApi(
  withPrefix("ageConfirmation")
);
export const guestCheckoutAgeConfirmation = initLocalStorageApi(withPrefix("guestCheckoutAgeConfirmation"));
export const orderModal = initSessionStorageApi(withPrefix("orderModal"));
