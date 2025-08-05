import { useQuery } from "@tanstack/react-query";

import { getPassTypes } from "@/app/(dashboard)/passes/actions/getPassTypes";

/**
 * Hook to fetch pass types using React Query
 * Returns pass types data with loading and error states
 */
export function useGetPassTypes() {
  return useQuery({
    queryKey: ["get-pass-types"],
    queryFn: async () => {
      const response = await getPassTypes();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });
}
