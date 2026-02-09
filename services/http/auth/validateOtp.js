import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";
import Cookies from "js-cookie";
export const validateOtp = async (phone, otptype, passWord, otpCode) => {
  try {
    const response = await httpRequest.post("/otp/validate", {
      PhoneNumber: phone,
      OtpType: otptype,
      Otp: otpCode,
      Password: passWord,
    });
    const data = await response.data.data;
    Cookies.set("Authorization", data?.token);
    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.message);
  }
};
