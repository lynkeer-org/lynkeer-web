import { errorTypes } from "@/features/passes/lib/errorTypes";
import type { CreatePassTemplateResponse, CreatePassTemplateType } from "@/features/passes/types/loyaltyPassSchema";
import { privateApi } from "@/lib/axios/privateApi";

async function createPassTemplateRequest(data: CreatePassTemplateType) {
  try {
    const response = await privateApi.post<CreatePassTemplateResponse>("/pass/template/create", data);
    return { status: response.status, data: response.data };
  } catch (error) {
    return {
      error: {
        code: errorTypes.CREATE_PASS_TEMPLATE_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: CreatePassTemplate",
      },
    };
  }
}

export { createPassTemplateRequest };
