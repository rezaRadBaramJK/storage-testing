import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const submitOrder = async () => {
  try {
    const response = await httpRequest.get(
      `/Checkout/ConfirmOrder?processPayment=true`
    );
    const data = await response.data.Data;
    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
