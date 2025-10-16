import { errorTypes } from "@/features/customer/lib/errorTypes";
import type { CreateCustomerPassRequest, CustomerPassResponse } from "@/features/customer/types/customerPass";
import { serviceApi } from "@/lib/axios/serviceApi";
import { isAxiosError } from "axios";

async function createCustomerPassRequest(data: CreateCustomerPassRequest) {
  try {
    const response = await serviceApi.post<CustomerPassResponse>("/v1/customer-passes", data);
    return { status: response.status, data: response.data };
  } catch (error) {
    // Log error with essential context only
    if (isAxiosError(error)) {
      const status = error?.response?.status;
      const apiMessage = error?.response?.data?.message;
      const apiDetail = error?.response?.data?.detail;

      console.error(`[createCustomerPassRequest] API Error ${status}:`, {
        message: apiMessage,
        detail: apiDetail,
        status,
        endpoint: "/v1/customer-passes",
        requestId: data.customerId, // Assuming customerId exists for tracing
        data, // Include request data to replicate the case
      });
    } else {
      console.error("[createCustomerPassRequest] Unexpected error:", {
        message: error instanceof Error ? error.message : "Unknown error",
        type: error instanceof Error ? error.constructor.name : typeof error,
        data,
      });
    }

    return {
      error: {
        code: errorTypes.CREATE_CUSTOMER_PASS_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: CreateCustomerPass",
      },
    };
  }
}

export { createCustomerPassRequest };
