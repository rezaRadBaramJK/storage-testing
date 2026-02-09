import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const editAddressForm = async (value, id) => {
  try {
    const response = await httpRequest.put(`/Customer/addressedit/${id}`, {
      model: {
        address: {
          ...value?.model?.address,
          id: id,
        },
      },
      form: {
        ...value?.form,
      },
    });

    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
