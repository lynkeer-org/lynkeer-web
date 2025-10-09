import { errorTypes } from "@/features/customer/lib/errorTypes";
import { serviceApi } from "@/lib/axios/serviceApi";
import type { CreateCustomerPassRequest, CustomerPassResponse } from "../types/customerPass";

async function createCustomerPassRequest(data: CreateCustomerPassRequest) {
  try {
    const response = await serviceApi.post<CustomerPassResponse>("/v1/customer-passes", data);
    return { status: response.status, data: response.data };
  } catch (error) {
    return {
      error: {
        code: errorTypes.CREATE_CUSTOMER_PASS_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: CreateCustomerPass",
      },
    };
  }
}

export { createCustomerPassRequest };
