import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const getProductsWithCategoryids = async (
  rootCatId,
  subCatId,
  includePrice = true,
  includePicture= true,
  includeTag = false,
  includeCategories = false,
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
      IncludePrice : includePrice,
      IncludePicture: includePicture,
      IncludeTag : includeTag,
      IncludeCategories : includeCategories,
    });
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
