import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const searchproducts = async (
  searchValue,
  pageNumber,
  minPrice,
  maxPrice,
  categories,
  sort
) => {
  try {
    const response = await httpRequest.post("/Product/GetProducts", {
      Price: {
        From: minPrice,
        To: maxPrice,
      },
      KeyWord: searchValue,
      PageNumber: pageNumber,
      PageSize: 10,
      CategoriesIds: [...categories],
      OrderBy: sort,
    });
    const data = await response.data.Data;
    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
