"use server";

import { createCustomerPassRequest } from "@/features/customer/services/createCustomerPassRequest";
import type { CreateCustomerPassRequest } from "@/features/customer/types/customerPass";
import { startClient } from "@/mocks/startClient";
import { HttpStatusCode } from "axios";

async function createCustomerPass(data: CreateCustomerPassRequest) {
  startClient();

  try {
    const response = await createCustomerPassRequest(data);

    if (response.error) {
      throw new Error(response.error.message, { cause: response.error });
    }

    return {
      success: response.status === HttpStatusCode.Created,
      data: response.data,
    };
  } catch (error) {
    throw new Error("Failed to create customer pass. Please try again.", { cause: error });
  }
}

export { createCustomerPass };
