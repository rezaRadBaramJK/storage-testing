import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const getFaavioritesProduct = async (pageNumber) => {
  try {
    const response = await httpRequest.get(
      `/FavoriteProduct/GetFavoriteProducts?pageNumber=${pageNumber}&pageSize=10`
    );
    const data = await response.data.Data;
    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
