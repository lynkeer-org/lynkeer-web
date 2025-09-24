import { useQuery } from "@tanstack/react-query";

import { getPassTemplateList } from "@/app/(dashboard)/passes/actions/getPassTemplateList";

/**
 * React Query hook to fetch pass template list
 * Provides pass template data with loading and error states
 * Implements caching and refetch strategies
 *
 * @returns {Object} Query result object containing:
 * - data: The pass template list when available
 * - isLoading: Loading state
 * - error: Error object if request fails
 */
export function useGetPassTemplateList() {
  return useQuery({
    queryKey: ["get-pass-template-list"],
    queryFn: async () => {
      const response = await getPassTemplateList();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache is kept for 10 minutes after unmount
    refetchOnWindowFocus: false, // Don't refetch when window gains focus
    refetchOnMount: false, // Don't refetch when component mounts
    retry: 1,
  });
}
