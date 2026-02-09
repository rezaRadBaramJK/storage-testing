import QUERY_KEYS from "@/data/queryKeys";
import { getAvailableCurrency } from "@/services/http/setting/getAvailableCurrency";
import { useQuery } from "@tanstack/react-query";

export function useAvailableCurrencyQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.SETTING.AVAILABLE_CURRENCY],
    queryFn: getAvailableCurrency,
  });
}
