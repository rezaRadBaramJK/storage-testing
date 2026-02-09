import {
  accessTokenLs,
  isLogin,
  refreshTokenLS,
  userData,
} from "@/localStorage/auth";
import axios from "axios";
import Cookies from "js-cookie";


let appLocale = "en";

export const setAppLocale = (locale) => {
  appLocale = locale;
};

export const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  timeout: "REQUEST_TIMEOUT",
});

httpRequest.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("Authorization");

    config.headers["Accept-Language"] =
      appLocale === "ar" ? "ar-kw" : "en-us";

    if (accessToken && config.headers) {
      config.headers["authorization"] = `Bearer ${accessToken}`;
    } else if (!accessToken) {
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_TOKEN_URL,
          { is_guest: true }
        );
        Cookies.set("Authorization", response?.data?.Data?.token);
        refreshTokenLS.set(response?.data?.Data?.refresh_token);
      } catch (error) {
        if (error?.response?.status == 401) {
          console.log(error);
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
httpRequest.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    const originalReq = error.config;
    if (error.response?.status == 401 && !originalReq._retry) {
      originalReq._retry = true;
      const refreshToken = refreshTokenLS.get();
      axios.defaults.withCredentials = true;
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_REFRESH_TOKEN_URL,
          { refresh_token: refreshToken }
        );
        refreshTokenLS.set(response.data.Data.refresh_token);
        Cookies.set("Authorization", response?.data?.Data?.token);
        axios.defaults.withCredentials = true;
        return httpRequest(originalReq);
      } catch (error) {
        Cookies?.remove("Authorization");
        refreshTokenLS.remove();
        userData.remove();
        accessTokenLs.remove();
        isLogin.remove();
        window.location.href = "https://morgap-v2.vercel.app/auth/login";
      }
    }
    return Promise.reject(error);
  }
);
