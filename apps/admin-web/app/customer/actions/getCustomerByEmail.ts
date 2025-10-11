"use server";

import { getCustomerByEmailRequest } from "@/features/customer/services/getCustomerByEmailRequest";
import { HttpStatusCode } from "axios";

export async function getCustomerByEmail(email: string) {
  const response = await getCustomerByEmailRequest(email);

  if (response.error) {
    if (response.error.statusCode === HttpStatusCode.NotFound) {
      return {
        success: false,
        data: null,
      };
    }

    throw new Error(response.error.message, { cause: response.error });
  }

  return {
    success: response.status === HttpStatusCode.Ok,
    data: response.data,
  };
}
