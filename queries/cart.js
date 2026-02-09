import QUERY_KEYS from "@/data/queryKeys";
import { getbasketSummery } from "@/services/http/cart/getBasketSummery";
import { getShoppingCartData } from "@/services/http/cart/getCartData";
import { getShippingMethodes } from "@/services/http/checkout/getShippingMethodes";
import { useQuery } from "@tanstack/react-query";

export function useCartQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.CART.ITEMS],
    queryFn: getShoppingCartData,
    refetchOnMount: true,
  });
}

export function useCartPaymentSummaryQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.CART.SUMMARY],
    queryFn: getbasketSummery,
  });
}

export function useShippingMethodsQuery(enabled) {
  return useQuery({
    queryKey: [QUERY_KEYS.CART.SHIPPING_METHODS],
    queryFn: getShippingMethodes,
    enabled,
  });
}
