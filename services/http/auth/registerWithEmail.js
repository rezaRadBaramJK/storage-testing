import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";
import Cookies from "js-cookie";
export const registerWithEmail = async (values) => {
  try {
    const response = await httpRequest.post(
      "/Customer/Register?returnUrl=elit",
      {
        model: {
          first_name: values?.first_name,
          last_name: values?.last_name,
          date_of_birth_day: values?.birth_day?.split("-")[2],
          date_of_birth_month: values?.birth_day?.split("-")[1],
          date_of_birth_year: values?.birth_day?.split("-")[0],
          Phone: `${values?.phone ? `965${values?.phone}` : ""}`,
          email: values?.email,
          password: values?.password,
          // confirm_password: values?.confirm_password,
        },
        Form: {},
      }
    );
    const data = await response.data.Data;
    Cookies.set("Authorization", data?.token);
    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
};
