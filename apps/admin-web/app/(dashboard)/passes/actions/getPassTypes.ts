"use server";

import { getPassTypesRequest } from "@/features/passes/services/getPassTypesRequest";
import { HttpStatusCode } from "axios";

/**
 * Server Action to fetch pass types
 */
export async function getPassTypes() {
  const response = await getPassTypesRequest();

  if (response.error) {
    throw new Error(response.error.message, { cause: response.error });
  }

  return {
    success: response.status === HttpStatusCode.Ok,
    data: response.data,
  };
}
