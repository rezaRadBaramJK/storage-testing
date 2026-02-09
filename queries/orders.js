import QUERY_KEYS from "@/data/queryKeys";
import { getLatestOrder } from "@/services/http/orders/getLastOrder";
import { useQuery } from "@tanstack/react-query";

export function useLatestOrdersQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS.LATEST],
    queryFn: getLatestOrder,
  });
}
