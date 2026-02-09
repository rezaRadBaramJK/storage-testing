// import { errorResponse } from "@/dto/errorDto";
// import { httpRequest } from "../httpBase";
// import { successDto } from "@/dto/successDto";
// import Cookies from "js-cookie";
// export const loginWithEmail = async (phone,pass) => {
//   try {
//     const response = await httpRequest.post("/otp/authenticate/gettoken", {
//       phone_number: phone,
//       password: pass,
//     });
//     const data = await response.data.Data;
//     Cookies.set("Authorization", data?.token);
//     return successDto(data);
//   } catch (error) {
//     return errorResponse(error?.response?.data?.Message);
//   }
// };
import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";
import Cookies from "js-cookie";
export const loginWithEmail = async (value) => {
  try {
    const response = await httpRequest.post("/Authenticate/GetToken", {
      ...value,
      IsGuest: false,
    });
    const data = await response.data.Data;
    Cookies.set("Authorization", data?.token);
    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
