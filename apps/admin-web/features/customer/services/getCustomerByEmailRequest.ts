import { errorTypes } from "@/features/customer/lib/errorTypes";
import type { CustomerResponse } from "@/features/customer/types/customer";
import { serviceApi } from "@/lib/axios/serviceApi";

async function getCustomerByEmailRequest(email: string) {
  try {
    const response = await serviceApi.get<CustomerResponse>(`/v1/customers/email/${email}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    return {
      error: {
        code: errorTypes.GET_CUSTOMER_BY_EMAIL_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: GetCustomerByEmail",
      },
    };
  }
}

export { getCustomerByEmailRequest };
