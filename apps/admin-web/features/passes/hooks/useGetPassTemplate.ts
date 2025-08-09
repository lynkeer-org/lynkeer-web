import { useQuery } from "@tanstack/react-query";

import { getPassTemplate } from "@/app/(dashboard)/passes/actions/getPassTemplate";

export function useGetPassTemplate(passUuid: string) {
  return useQuery({
    queryKey: ["get-pass-template", passUuid],
    queryFn: async () => {
      const response = await getPassTemplate(passUuid);
      return response.data;
    },
    retry: 1,
  });
}
