import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const getProductsWithCategoryids = async (
  rootCatId,
  subCatId,
  pageNumber
) => {
  try {

    const response = await httpRequest.post("/Product/GetProducts", {
      SubCategories: subCatId ? false : true,
      CategoriesIds: [subCatId ? subCatId : rootCatId],
      OrderBy: "0",
      PageNumber: pageNumber,
      PageSize: 10,
      IncludeAttributes: true,
    });
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
