import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const getordersList = async (pageNumber) => {
  try {
    const response = await httpRequest.get(
      `/Order/CustomerOrders?withFirstProductPicture=false`
    );
    const data = await response.data.Data;
    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
