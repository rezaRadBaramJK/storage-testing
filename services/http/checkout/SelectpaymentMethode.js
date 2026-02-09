import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const selectPaymentMethode = async (paymentName) => {
  try {
    const response = await httpRequest.post(
      `/Checkout/SelectPaymentMethod?paymentMethod=${paymentName}`,
      {
        UseRewardPoints: false,
      }
    );
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Data?.errors[0]);
  }
};
