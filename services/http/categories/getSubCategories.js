import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const getSubCategory = async (id) => {
  try {
    const response = await httpRequest.get(`/Catalog/GetSubCategories`, {
      params: {
        categoryId: id,
      },
    });
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
