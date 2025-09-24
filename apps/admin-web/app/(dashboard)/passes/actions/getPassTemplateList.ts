"use server";

import { getPassTemplateListRequest } from "@/features/passes/services/getPassTemplateListRequest";
import { HttpStatusCode } from "axios";

/**
 * Server Action to fetch pass template list
 * Handles the response from the service layer and formats the output
 * Throws an error if the request fails
 * @returns Object containing success status and pass template data
 */
export async function getPassTemplateList() {
  const response = await getPassTemplateListRequest();

  if (response.error) {
    throw new Error(response.error.message, { cause: response.error });
  }

  return {
    success: response.status === HttpStatusCode.Ok,
    data: response.data,
  };
}
