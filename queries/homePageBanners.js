import QUERY_KEYS from "@/data/queryKeys";
import { useQuery } from "@tanstack/react-query";
import {getHomePageBanners} from "@/services/http/baner/getHomePageBanners";

/**
 * @param {Object} [variables={}]
 * @param {number} [variables.productCount]
 * @param {Object} [config]
 */
export function useHomePageBannersQuery(variables = {}, config) {
	return useQuery(
		{
			queryKey: [QUERY_KEYS.HOME.HOME_PAGE_BANNERS],
			queryFn: getHomePageBanners.bind(null, variables),
		},
		config
	);
}
