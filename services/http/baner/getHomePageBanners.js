import { errorResponse } from "@/dto/errorDto";
import { httpRequest } from "../httpBase";
import { successDto } from "@/dto/successDto";

export const getHomePageBanners = async (tagName) => {
	const query = new URLSearchParams();
	if (tagName && tagName !== ""){
		query.set("tag", tagName);
	}

	try {
		const response = await httpRequest.get(
			`/banner/list?${query.toString()}`,
		);
		const data = await response.data.Data;

		return successDto(data);
	} catch (error) {
		return errorResponse(error?.response?.data?.Message);
	}
};