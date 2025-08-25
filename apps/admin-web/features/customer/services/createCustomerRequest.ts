import { errorTypes } from "@/features/customer/lib/errorTypes";
import type { CreateCustomerRequest, CreateCustomerResponse } from "@/features/customer/types/customer";
import { privateApi } from "@/lib/axios/privateApi";
import { redirectToSignOut } from "@/lib/axios/requestValidation";

async function createCustomerRequest(data: CreateCustomerRequest) {
  try {
    const response = await privateApi.post<CreateCustomerResponse>("/v1/customer", data);
    return { status: response.status, data: response.data };
  } catch (error) {
    redirectToSignOut(error);
    return {
      error: {
        code: errorTypes.CREATE_CUSTOMER_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: CreateCustomer",
      },
    };
  }
}

export { createCustomerRequest };
