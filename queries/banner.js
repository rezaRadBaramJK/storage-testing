import QUERY_KEYS from "@/data/queryKeys";
import { getHomePageBaner } from "@/services/http/baner/getBaner";
import { isValidId } from "@/utils/validations";
import { useQuery } from "@tanstack/react-query";

export function useBannerQuery(entityId) {
  return useQuery({
    queryKey: [QUERY_KEYS.BANNERS.BANNER, entityId],
    queryFn: getHomePageBaner.bind(null, entityId),
    enabled: isValidId(entityId),
  });
}
