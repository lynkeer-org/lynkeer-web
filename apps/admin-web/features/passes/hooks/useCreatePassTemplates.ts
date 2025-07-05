import { useMutation } from "@tanstack/react-query";

import { createLoyaltyPassTemplates } from "@/app/(dashboard)/passes/actions/createLoyaltyPassTemplates";

export function useCreatePassTemplates() {
  return useMutation({ mutationKey: ["create-pass-templates"], mutationFn: createLoyaltyPassTemplates });
}
