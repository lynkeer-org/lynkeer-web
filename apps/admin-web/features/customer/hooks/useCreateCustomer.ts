import { useMutation } from "@tanstack/react-query";

import { createCustomer } from "@/app/customer/actions/createCustomer";

export function useCreateCustomer() {
  return useMutation({
    mutationKey: ["create-customer"],
    mutationFn: createCustomer,
  });
}
