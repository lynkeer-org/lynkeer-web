"use server";

import { createCustomerRequest } from "@/features/customer/services/createCustomerRequest";
import { customerSchema } from "@/features/customer/types/customer";
import type { CreateCustomerRequest } from "@/features/customer/types/customer";
import { startClient } from "@/mocks/startClient";
import { HttpStatusCode } from "axios";

async function createCustomer(form: CreateCustomerRequest) {
  startClient();
  const validatedFields = customerSchema.omit({ deviceType: true, registrationMethod: true }).safeParse(form);

  if (!validatedFields.success) {
    throw new Error("Invalid customer data", { cause: validatedFields.error });
  }

  const data = validatedFields.data;

  try {
    const customerData: CreateCustomerRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      birthDate: data.birthDate,
    };

    const response = await createCustomerRequest(customerData);

    if (response.error) {
      throw new Error(response.error.message, { cause: response.error });
    }

    return {
      success: response.status === HttpStatusCode.Created,
      data: response.data,
    };
  } catch (error) {
    throw new Error("Failed to create customer. Please try again.", { cause: error });
  }
}

export { createCustomer };
