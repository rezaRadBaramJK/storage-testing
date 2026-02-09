import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const additemWithoutAttributeToCart = async (id, count) => {
  const key = `addtocart_${id}.EnteredQuantity`;
  try {
    const response = await httpRequest.post(
      `/ShoppingCart/AddProductToCartFromDetails/${id}?shoppingCartType=ShoppingCart`,
      {
        [key]: count,
      }
    );
    const data = await response.data.Data;
    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Data?.message);
  }
};
