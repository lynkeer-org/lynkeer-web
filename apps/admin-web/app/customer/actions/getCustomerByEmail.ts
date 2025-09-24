"use server";

import { getCustomerByEmailRequest } from "@/features/customer/services/getCustomerByEmailRequest";
import { startClient } from "@/mocks/startClient";
import { HttpStatusCode } from "axios";

export async function getCustomerByEmail(email: string) {
  startClient();
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
