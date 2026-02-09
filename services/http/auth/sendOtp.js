import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";
import Cookies from "js-cookie";
export const sendOtp = async (phone, otptype) => {
  try {
    const response = await httpRequest.post("/otp/send", {
      PhoneNumber: phone,
      OtpType: otptype,
    });
    const data = await response.data.Data;
    Cookies.set("Authorization", data?.token);
    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
