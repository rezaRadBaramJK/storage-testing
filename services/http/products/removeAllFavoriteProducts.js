import {httpRequest} from "@/services/http/httpBase";
import {successDto} from "@/dto/successDto";
import {errorResponse} from "@/dto/errorDto";

export async function removeAllFavoriteProducts() {
  try {
    const response = await httpRequest.delete(
      `/FavoriteProduct/DeleteAll`,
      {}
    );
    const data = await response.data.Data;

    return successDto(data);
  } catch (error) {
    return errorResponse(error?.response?.data?.Message);
  }
}