import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const removeItemFromCart = async (id) => {
  try {
    const response = await httpRequest.delete(
      `/ShoppingCart/DeleteShoppingCartItem/${id}`
    );
    const data = await response.data.Data;
    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Data?.[0]);
  }
};
