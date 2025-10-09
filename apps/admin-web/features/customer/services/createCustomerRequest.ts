import { errorTypes } from "@/features/customer/lib/errorTypes";
import type { CreateCustomerRequest, CustomerResponse } from "@/features/customer/types/customer";
import { serviceApi } from "@/lib/axios/serviceApi";

async function createCustomerRequest(data: CreateCustomerRequest) {
  try {
    const response = await serviceApi.post<CustomerResponse>("/v1/customers", data);
    return { status: response.status, data: response.data };
  } catch (error) {
    return {
      error: {
        code: errorTypes.CREATE_CUSTOMER_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: CreateCustomer",
      },
    };
  }
}

export { createCustomerRequest };
