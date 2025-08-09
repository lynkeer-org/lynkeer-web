"use server";

import { getPassTemplateRequest } from "@/features/passes/services/getPassTemplateRequest";
import { HttpStatusCode } from "axios";

export async function getPassTemplate(passUuid: string) {
  const response = await getPassTemplateRequest(passUuid);

  if (response.error) {
    throw new Error(response.error.message, { cause: response.error });
  }

  return {
    success: response.status === HttpStatusCode.Ok,
    data: response.data,
  };
}
