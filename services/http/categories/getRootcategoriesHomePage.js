import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

/**
 * @param {Object} [variables={}]
 * @param {number} [variables.productCount]
 */
export const getRootCategoriesHomePage = async (payload = {}) => {
  try {
    const response = await httpRequest.get(`/Catalog/gethomepagecategories`, {
      params: {
        productCount: payload.productCount || 10,
      },
    });
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
