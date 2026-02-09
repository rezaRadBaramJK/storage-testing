import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const spinningWheel = async () => {
  try {
    const response = await httpRequest.get("/RewardSystem/SpinningWheel");
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
