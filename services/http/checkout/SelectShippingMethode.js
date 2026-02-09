import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const selectShippingMethode = async (
  shippingName,
  shippingMethodeName
) => {
  try {
    const response = await httpRequest.post(
      `/Checkout/SelectShippingMethod?shippingOption=${shippingName}&shippingMethodSystemName=${shippingMethodeName}`,
      {
        PickupInStore: false,
      }
    );
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Data?.errors[0]);
  }
};
