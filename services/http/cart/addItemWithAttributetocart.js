import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const additemWithAttributeToCart = async (id, count, Att) => {
  const key = `addtocart_${id}.EnteredQuantity`;
  try {
    const response = await httpRequest.post(
      `/ShoppingCart/AddProductToCartFromDetails/${id}?shoppingCartType=ShoppingCart`,
      { ...Att, [key]: count }
    );
    const data = await response.data.Data;
    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Data?.errors[0]);
  }
};
