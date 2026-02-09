import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const cahngeCurrency = async (value) => {
  try {
    const response = await httpRequest.post(
      `/Common/SetCurrency/${value}?returnUrl=/`,
      {}
    );
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
