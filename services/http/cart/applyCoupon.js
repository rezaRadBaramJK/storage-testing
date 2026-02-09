import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const applyCoupon = async (value) => {
  try {
    const response = await httpRequest.post(
      `/ShoppingCart/ApplyDiscountCoupon?discountCouponCode=${value}`,
      {}
    );
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
