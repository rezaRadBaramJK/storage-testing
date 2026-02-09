import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const updateQuantityofiteminCart = async (id, quantity) => {
  try {
    const response = await httpRequest.post(
      `/ShoppingCart/UpdateQuantity?id=${id}&quantity=${quantity}`
    );
    const data = await response.data.Data;
    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Data?.[0]);
  }
};
