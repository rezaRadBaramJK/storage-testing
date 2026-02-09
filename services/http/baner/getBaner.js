import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const getHomePageBaner = async (catId) => {
  try {
    const response = await httpRequest.get(
      `/banner/list?entityName=Category&entityId=${catId}`
    );
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
