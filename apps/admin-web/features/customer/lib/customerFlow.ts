import { createCustomer } from "@/app/customer/actions/createCustomer";
import { getCustomerByEmail } from "@/app/customer/actions/getCustomerByEmail";
import type { CreateCustomerRequest, CustomerResponse } from "@/features/customer/types/customer";

/**
 * Handles the customer flow: validates if customer exists by email,
 * creates a new customer if not found, and returns the customer data
 */
export async function handleCustomerFlow(customerData: CreateCustomerRequest): Promise<CustomerResponse> {
  const existingCustomer = await getCustomerByEmail(customerData.email);

  if (existingCustomer?.data?.id) {
    return existingCustomer.data;
  }

  const { data: newCustomer } = await createCustomer(customerData);
  return newCustomer;
}
