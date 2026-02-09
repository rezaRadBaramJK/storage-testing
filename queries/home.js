import QUERY_KEYS from "@/data/queryKeys";
import { getRootCategoriesHomePage } from "@/services/http/categories/getRootcategoriesHomePage";
import { useQuery } from "@tanstack/react-query";

/**
 * @param {Object} [variables={}]
 * @param {number} [variables.productCount]
 * @param {Object} [config]
 */
export function useHomeRootCategoriesQuery(variables = {}, config) {
  return useQuery(
    {
      queryKey: [QUERY_KEYS.HOME.HOME_ROOT_CATEGORIES],
      queryFn: getRootCategoriesHomePage.bind(null, variables),
    },
    config
  );
}
