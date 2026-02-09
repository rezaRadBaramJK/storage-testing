import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const changeLanguage = async (value) => {
  try {
    const response = await httpRequest.post(
      `/Common/SetLanguage/${value}?returnUrl=/elit`,
      {}
    );
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
