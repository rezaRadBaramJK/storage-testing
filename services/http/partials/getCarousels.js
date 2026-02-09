import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const getHomePageCarousels = async () => {
  try {
    const response = await httpRequest.post("/JCarousel/GetAllCarousels", {
      Ids: [],
      IncludeProducts: true,
      NumberOfItems: 20,
      ProductType: 15,
      SoldOut: false,
      // "CurrentProductId": 0,
      // "CurrentCategoryId": 0,
      // "CurrentManufacturerId": 0
    });
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
