import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const getProductDetails = async (id) => {
  try {
    const response = await httpRequest.get(
      `/jarra/Product/${id}?getFavoriteCount=true`
    );
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
