import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const edituserinfo = async (values) => {
  try {
    const response = await httpRequest.post("/Customer/Info", {
      model: {
        first_name: values?.first_name,
        last_name: values?.last_name,
        date_of_birth_day: values?.birth_day?.split("-")[2],
        date_of_birth_month: values?.birth_day?.split("-")[1],
        date_of_birth_year: values?.birth_day?.split("-")[0],
        email: values?.email,
        phone: values?.phone,
      },
      form: {},
    });
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
