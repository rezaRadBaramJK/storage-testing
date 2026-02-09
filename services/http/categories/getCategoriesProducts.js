import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const getCategoriesProducts = async (pageNum) => {
  try {
    const response = await httpRequest.get(
      `/Catalog/GetCategoriesProducts?pageNumber=${1}&pageSize=20&productLimit=10&prepareProductAttributes=true`
    );
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
