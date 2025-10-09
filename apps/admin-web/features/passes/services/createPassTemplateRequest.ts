import { errorTypes } from "@/features/passes/lib/errorTypes";
import type { CreatePassTemplateResponse, PassTemplateType } from "@/features/passes/types/loyaltyPassSchema";
import { privateApi } from "@/lib/axios/privateApi";
import { redirectToSignOut } from "@/lib/axios/requestValidation";

async function createPassTemplateRequest(data: PassTemplateType) {
  try {
    const response = await privateApi.post<CreatePassTemplateResponse>("/v1/pass-template", data);
    return { status: response.status, data: response.data };
  } catch (error) {
    redirectToSignOut(error);
    return {
      error: {
        code: errorTypes.CREATE_PASS_TEMPLATE_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: CreatePassTemplate",
      },
    };
  }
}

export { createPassTemplateRequest };
