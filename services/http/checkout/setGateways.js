import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const setGateway = async (val) => {
  try {
    const response = await httpRequest.post(`/Checkout/EnterPaymentInfo`, {
      PaymentMethodId: val,
    });
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
