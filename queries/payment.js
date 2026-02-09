import QUERY_KEYS from "@/data/queryKeys";
import { getPaymentyMethode } from "@/services/http/checkout/getPaymentyMethode";
import { useQuery } from "@tanstack/react-query";

export function usePaymentMethodsQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.PAYMENT.METHODS],
    queryFn: getPaymentyMethode,
  });
}
