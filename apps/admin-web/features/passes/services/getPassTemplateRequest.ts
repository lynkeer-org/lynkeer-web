import { errorTypes } from "@/features/passes/lib/errorTypes";
import type { GetPassTemplateResponse } from "@/features/passes/types/loyaltyPassSchema";
import { privateApi } from "@/lib/axios/privateApi";
import { redirectToSignOut } from "@/lib/axios/requestValidation";

async function getPassTemplateRequest(passUuid: string) {
  try {
    const response = await privateApi.get<GetPassTemplateResponse>(`/v1/pass-template/${passUuid}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    redirectToSignOut(error);
    return {
      error: {
        code: errorTypes.GET_PASS_TEMPLATE_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: GetPassTemplate",
      },
    };
  }
}

export { getPassTemplateRequest };
