import { httpRequest } from "@/services/http/httpBase";
import { successDto } from "@/dto/successDto";
import { errorResponse } from "@/dto/errorDto";

export const getLocalizedProductDetailsBySeName = async (seName) => {
  try {
    const response = await httpRequest.get(
      `/product/GetLocalizedProductDetailsBySeName?seName=${seName}`,
    );
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
