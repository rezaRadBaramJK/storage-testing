import QUERY_KEYS from "@/data/queryKeys";
import { getAddressesById } from "@/services/http/addresses/getAddressDetrails";
import { getAddressesList } from "@/services/http/addresses/getAddresses";
import { getCountries } from "@/services/http/addresses/getCountries";
import { getStatesByCountryId } from "@/services/http/addresses/getStatesByCountryId";
import { useQuery } from "@tanstack/react-query";

export function useAddressesQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.ADDRESSES.LIST],
    queryFn: getAddressesList,
  });
}

export function useDetailAddressQuery(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.ADDRESSES.ITEM, id],
    queryFn: getAddressesById.bind(null, id),
  });
}

export function useAreasQuery(governorate) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.ADDRESSES.AREAS],
    queryFn: getStatesByCountryId.bind(null, governorate),
    enabled: Boolean(governorate),
  });
  const areas =
    query.data?.data?.map((area) => ({
      value: area?.id,
      label: area?.name,
    })) || [];

  return { ...query, areas };
}

export function useCountriesQuery() {
  const query = useQuery({
    queryKey: [QUERY_KEYS.ADDRESSES.COUNTRIES],
    queryFn: getCountries,
  });
  const countries =
    query.data?.data?.map((item) => ({
      value: item?.Id,
      label: item?.Name,
    })) || [];

  return {
    ...query,
    countries,
  };
}
