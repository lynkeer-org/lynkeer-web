"use server";

import { getPassTemplateRequest } from "@/features/passes/services/getPassTemplateRequest";
import type { ApiType } from "@/lib/axios/types";
import { HttpStatusCode } from "axios";

export async function getPassTemplate(passUuid: string, apiType: ApiType = "private") {
  const response = await getPassTemplateRequest(passUuid, apiType);

  if (response.error) {
    throw new Error(response.error.message, { cause: response.error });
  }

  return {
    success: response.status === HttpStatusCode.Ok,
    data: response.data,
  };
}
