import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const getAddressesById = async (id) => {
  try {
    const response = await httpRequest.get(`/Customer/addressedit/${id}`);
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Data?.errors[0]);
  }
};
