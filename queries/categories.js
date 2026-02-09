import QUERY_KEYS from "@/data/queryKeys";
import { getRootCategory } from "@/services/http/categories/getRootCategories";
import { getSubCategory } from "@/services/http/categories/getSubCategories";
import { isValidId } from "@/utils/validations";
import { useQuery } from "@tanstack/react-query";

export function useCategoriesQuery() {
  const query = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES.ROOT],
    queryFn: getRootCategory,
  });

  const categories =
    query.data?.data?.map((item) => ({
      value: item?.Id,
      label: item?.Name,
    })) || [];

  return {
    ...query,
    categories,
  };
}

/**
 * @param {string} categoryId
 **/
export function useSubCategoriesQuery(categoryId) {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES.SUB_CATEGORIES, categoryId],
    queryFn: getSubCategory.bind(null, categoryId),
    enabled: isValidId(categoryId),
  });
}
