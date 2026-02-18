import QUERY_KEYS from "@/data/queryKeys";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getProductsWithCategoryids } from "@/services/http/products/getProductWithCategoryids";
import { searchproducts } from "@/services/http/products/searchAndFillterProducts";
import { isValidId } from "@/utils/validations";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getLocalizedProductDetailsBySeName } from "@/services/http/products/getLocalizedProductDetailsBySeName";

export function useCategoryProductsQuery(
  categoryId,
  subCategoryId,
  includePrice,
  includePicture,
  includeTag,
  includeCategories
) {
  const query = useInfiniteQuery({
    queryKey: [
      QUERY_KEYS.PRODUCTS.PRODUCT_CATEGORY,
      categoryId,
      subCategoryId,
      includePrice,
      includePicture,
      includeTag,
      includeCategories
    ],
    queryFn: ({ pageParam }) =>
      getProductsWithCategoryids(
        categoryId,
        subCategoryId,
        includePrice,
        includePicture,
        includeTag,
        includeCategories,
        pageParam
      ),
    initialPageParam: 1,
    getNextPageParam(_, __, lastPageParam) {
      return lastPageParam + 1;
    },
    enabled: isValidId(categoryId),

    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false
    // -----------------------
  });
  const lastPage = query?.data?.pages?.at(-1)?.data;
  const hasNextPage = lastPage?.HasNextPage;

  const ref = useInfiniteScroll(
    { hasNextPage, isLoading: query.isLoading },
    query.fetchNextPage
  );

  const products =
    query.data?.pages.flatMap((page) => page?.data?.Products) || [];

  return {
    ...query,
    products,
    hasNextPage,
    ref
  };
}

/**
 * @param {Object} [params]
 * @param {string} [params.search]
 * @param {string} [params.minPrice]
 * @param {string} [params.maxPrice]
 * @param {string} [params.categories]
 * @param {string} [params.sortBy]
 **/
export function useSearchProductsQuery(params) {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS.PRODUCTS_BY_SEARCH, params],
    queryFn: ({ pageParam }) =>
      searchproducts(
        params.search,
        pageParam,
        params.minPrice,
        params.maxPrice,
        params.categories,
        params.sortBy
      ),
    getNextPageParam(_, __, lastPageParam) {
      return lastPageParam + 1;
    }
  });
  const ref = useInfiniteScroll(
    { hasNextPage: query.hasNextPage, isLoading: query.isLoading },
    query.fetchNextPage
  );

  const lastPage = query.data?.pages?.at(-1)?.data;
  const hasNextPage = lastPage?.HasNextPage;

  const products =
    query.data?.pages.flatMap((page) => page?.data?.Products) || [];

  return {
    ...query,
    hasNextPage,
    products,
    ref
  };
}

export function useProductDetailsQuery(seName) {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS.PRODUCT_DETAILS, seName],
    queryFn: getLocalizedProductDetailsBySeName.bind(null, seName),
    enabled: Boolean(seName)
  });
}
